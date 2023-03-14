using ToDoAPI;
using ToDoAPI.Data;
using ToDoAPI.Services.ToDoService;
using ToDoAPI.Validators.ToDoValidator;

//BUILDER
var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
                //.ConfigureApiBehaviorOptions(options =>
                //{
                //    options.InvalidModelStateResponseFactory = context =>
                //    {
                //        return HttpErrors.BadRequest(data: "Invalid data model");
                //    };
                //});


builder.Services.AddDbContext<ToDoDB>();
builder.Services.AddAutoMapper(typeof(Program));

// Add services to the container.
builder.Services.AddScoped<IToDoService, ToDoService>();

//Validators
builder.Services.AddScoped<IToDoValidator, ToDoValidator>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(options =>
{
    options.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
           //.WithExposedHeaders(ResponseHeaders.AccessTokenExpired, ResponseHeaders.SessionExpired);
});

app.UseAuthorization();

app.MapControllers();

app.Run();
