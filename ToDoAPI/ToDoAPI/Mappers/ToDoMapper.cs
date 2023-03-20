using AutoMapper;
using ToDoAPI.Data.Models;
using ToDoAPI.DataTransferObjects;

namespace ToDoAPI.Mappers
{
    public class ToDoMapper:Profile
    {
        public ToDoMapper() {
            CreateMap<ToDo, GetToDoDTO>();
            CreateMap<InsertUpdateToDoDTO, ToDo>();
        }
    }
}
