using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using ToDoAPI.Data.Models;
using ToDoAPI.DataTransferObjects;
using ToDoAPI.Services.ToDoService;
using ToDoAPI.Validators.ToDoValidator;

namespace ToDoAPI.Controllers
{
    [ApiController]
    [Route("api/todos")]
    public class ToDoController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IToDoService _toDoService;  
        private readonly ILogger<ToDoController> _logger;
        private readonly IToDoValidator _toDoValidator;

        public ToDoController(ILogger<ToDoController> logger, IToDoService toDoService, IMapper mapper, IToDoValidator toDoValidator)
        {
            _logger = logger;
            _toDoService = toDoService;
            _mapper = mapper;
            _toDoValidator = toDoValidator;
        }

        [HttpGet(Name = "GetAllToDos")]
        public async Task<ActionResult<APIResponse>> GetToDo([FromQuery] bool loadDone = false)
        {
            List<ToDo> list =  await _toDoService.ListToDos(loadDone)
                .OrderBy(td => td.DueDate)
                .ToListAsync();

            APIResponse response = new()
            {
                Data = list.Select(td => this._mapper.Map<ToDo,GetToDoDTO>(td))
            };

            return response;
        }

        [HttpPost(Name = "AddToDo")]
        public async Task<ActionResult<APIResponse>> AddToDo(InsertUpdateToDoDTO data)
        {
            APIResponse response = new();
            response.IsSuccess = this._toDoValidator.ValidateInsert(data, response.Messages);

            if (response.IsSuccess)
            {
                ToDo toDo = this._mapper.Map<InsertUpdateToDoDTO, ToDo>(data);
                await this._toDoService.InsertToDo(toDo);
                response.Data = data;
                response.Messages.Add("ToDo added correctly");
            }
            return response;
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult<APIResponse>> UpdateToDo(int id, InsertUpdateToDoDTO data)
        {
            ToDo? toDo = await this._toDoService.FindToDo(id);
            if (toDo == null)
            {
                return HttpErrors.NotFound("ToDo not found");
            }

            APIResponse response = new();
            response.IsSuccess = this._toDoValidator.ValidateUpdate(id, data, response.Messages);
            if (response.IsSuccess)
            {
                await this._toDoService.UpdateToDo(this._mapper.Map(data, toDo));
                response.Data = this._mapper.Map<ToDo,GetToDoDTO>(toDo);
                response.Messages.Add("ToDo updated correctly");
            }
            return response;
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult<APIResponse>> DeleteToDo(int id)
        {
            ToDo? toDo = await this._toDoService.FindToDo(id);
            if (toDo == null)
            {
                return HttpErrors.NotFound("ToDo not found");
            }
            APIResponse response = new();
            if (response.IsSuccess)
            {
                await this._toDoService.DeleteToDo(toDo);
                response.Data = this._mapper.Map<ToDo, GetToDoDTO>(toDo);
                response.Messages.Add("ToDo has been removed");
            }
            return response;
        }
    }
}