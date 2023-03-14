using System.Net;

namespace ToDoAPI
{
    public class APIResponse
    {
        public HttpStatusCode StatusCode { get; set; }
        public bool IsSuccess { get; set; }
        public List<string> Messages { get; set; }
        public object? Data { get; set; }
        
        public APIResponse() {
            this.StatusCode = HttpStatusCode.OK;
            this.IsSuccess = true; 
            this.Messages = new List<string>();
        }
    }
}
