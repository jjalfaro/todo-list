using Microsoft.VisualBasic;
using ToDoAPI.Data;
using ToDoAPI.DataTransferObjects;

namespace ToDoAPI.Validators.ToDoValidator
{
    public class ToDoValidator : IToDoValidator
    {
        private readonly ToDoDB _db;

        public ToDoValidator(ToDoDB db)
        {
            _db = db;
        }

        public bool ValidateInsert(InsertUpdateToDoDTO data, List<string> messages)
        {
            List<string> innerMessages = new();
            
            //Description
            if (string.IsNullOrWhiteSpace(data.Description))
            {
                innerMessages.Add("ToDo description is required");
            }
            else if (data.Description.Length > 250)
            {
                innerMessages.Add("ToDo description length can't be greater than 250 characters");
            }

            //DueDate
            if(data.DueDate.Date < DateTime.Now.Date)
            {
                innerMessages.Add("Due Date can't be before today");
            }

            //Status
            if (data.Done)
            {
                innerMessages.Add("ToDo can't be added as completed");
            }

            messages.AddRange(innerMessages);

            return !innerMessages.Any();

        }

        public bool ValidateUpdate(int id, InsertUpdateToDoDTO data, List<string> messages)
        {
            List<string> innerMessages = new();

            //Description
            if (string.IsNullOrWhiteSpace(data.Description))
            {
                innerMessages.Add("ToDo description is required");
            }
            else if (data.Description.Length > 250)
            {
                innerMessages.Add("ToDo description length can't be greater than 250 characters");
            }

            messages.AddRange(innerMessages);

            return !innerMessages.Any();
        }
    }
}
