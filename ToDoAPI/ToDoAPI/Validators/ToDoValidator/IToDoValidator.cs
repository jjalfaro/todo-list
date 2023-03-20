using ToDoAPI.DataTransferObjects;

namespace ToDoAPI.Validators.ToDoValidator
{
    public interface IToDoValidator
    {
        bool ValidateInsert(InsertUpdateToDoDTO data, List<string> messages);
        bool ValidateUpdate(int id, InsertUpdateToDoDTO data, List<string> messages);
    }
}
