using Microsoft.EntityFrameworkCore;
using ToDoAPI.Data;
using ToDoAPI.Data.Models;

namespace ToDoAPI.Services.ToDoService
{
    public class ToDoService : IToDoService
    {
        private readonly ToDoDB _db;

        public ToDoService(ToDoDB db)
        {
            _db = db;
        }

        public async Task DeleteToDo(ToDo entity)
        {
            this._db.ToDo.Remove(entity);
            await this._db.SaveChangesAsync();
        }

        public async Task<ToDo?> FindToDo(int id)
        {
            return await this._db
                .ToDo
                .Where(td => td.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task InsertToDo(ToDo entity)
        {
            this._db.ToDo.Add(entity);
            await this._db.SaveChangesAsync();
        }

        public IQueryable<ToDo> ListToDos(bool loadDone = false)
        {
            return this._db
                .ToDo
                .Where(td => td.Done == loadDone);
        }

        public async Task UpdateToDo(ToDo entity)
        {
            this._db.ToDo.Update(entity);
            await this._db .SaveChangesAsync();
        }
    }
}
