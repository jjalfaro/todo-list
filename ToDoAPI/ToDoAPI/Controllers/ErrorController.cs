using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Reflection.Metadata.Ecma335;

namespace ToDoAPI.Controllers
{
    [Route("errors")]
    [ApiController]
    public class ErrorController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public ErrorController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [Route("{statusCode}")]
        [HttpGet]
        public ObjectResult HandleStatus(HttpStatusCode statusCode)
        {
            APIResponse response = new()
            {
                StatusCode = statusCode,
                IsSuccess = false
            };

            switch (response.StatusCode)
            {
                case HttpStatusCode.InternalServerError:
                    response.Messages.Add("An unhandle error was trigger on the server");
                    if (this._env.IsDevelopment())
                    {
                        Exception? ex = HttpContext.Features.Get<IExceptionHandlerPathFeature>()?.Error;
                        if (ex != null)
                        {
                            response.Data = new
                            {
                                ex.Message,
                                ex.StackTrace,
                                InnerException = ex.InnerException?.Message,
                                ex.Source,
                                ex.HResult
                            };
                        }
                    }
                    break;
            }

            ObjectResult result = new(response)
            {
                StatusCode = (int)statusCode
            };

            return result;
        }
    }
}