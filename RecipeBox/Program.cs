using RecipeBox.Data;

var builder = WebApplication.CreateBuilder(args);

// Add the RecipeContext
builder.Services.AddSqlite<RecipeContext>("Data Source=RecipeBox.db");


var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
