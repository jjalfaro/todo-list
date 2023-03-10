using ToDoAPI.Data;
using ToDoAPI.Data.Models;

namespace ToDoAPI.Services.ToDoService
{
    public class ToDoService : IToDoService
    {
        private readonly ToDoListDB _db;

        public ToDoService(ToDoListDB db)
        {
            _db = db;
        }

        public Task DeleteToDo(ToDo entity)
        {
            throw new NotImplementedException();
        }

        public Task InsertToDo(ToDo entity)
        {
            throw new NotImplementedException();
        }

        public IQueryable<ToDo> ListToDos(bool loadDone = false)
        {
            return this._db
                .ToDos
                .Where(td => td.Done == loadDone);
        }

        public Task UpdateToDo(ToDo entity)
        {
            throw new NotImplementedException();
        }
    }
}
