namespace ToDoAPI.DataTransferObjects
{
    public class InsertUpdateToDoDTO
    {
        public string Description { get; set; }

        public DateTime DueDate { get; set; }

        public bool Done { get; set; }
    }

    public class GetToDoDTO
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public bool Done { get; set; }
    }
}
