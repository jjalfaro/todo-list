using ToDoAPI.Data.Models;

namespace ToDoAPI.Services.ToDoService
{
    public interface IToDoService
    {
        IQueryable<ToDo> ListToDos(bool loadDone);
        Task InsertToDo(ToDo entity);
        Task UpdateToDo(ToDo entity);
        Task DeleteToDo(ToDo entity);

    }
}
