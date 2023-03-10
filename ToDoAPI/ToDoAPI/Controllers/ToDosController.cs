using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoAPI.Data.Models;
using ToDoAPI.Services.ToDoService;

namespace ToDoAPI.Controllers
{
    [ApiController]
    [Route("api/todos")]
    public class ToDosController : ControllerBase
    {
        private readonly IToDoService _toDoService;  

        private readonly ILogger<ToDosController> _logger;

        public ToDosController(ILogger<ToDosController> logger, IToDoService toDoService)
        {
            _logger = logger;
            _toDoService = toDoService;
        }

        [HttpGet(Name = "GetAllToDos")]
        public async Task<List<ToDo>> Get([FromQuery] bool loadDone = false)
        {
            return await _toDoService.ListToDos(loadDone)
                .OrderBy(td => td.DueDate)
                .ToListAsync();
        }
    }
}