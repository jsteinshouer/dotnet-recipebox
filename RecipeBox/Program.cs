using RecipeBox.Data;
using RecipeBox.Models;
using RecipeBox.Services;

var builder = WebApplication.CreateBuilder(args);

// Add the RecipeContext
builder.Services.AddSqlite<RecipeContext>("Data Source=RecipeBox.db");
builder.Services.AddScoped<RecipeService>();

var app = builder.Build();

app.CreateDbIfNotExists();

var recipeService = app.Services.CreateScope().ServiceProvider.GetRequiredService<RecipeService>();

app.MapGet("/", () => "Hello World!");
app.MapGet("/recipes/{id}", (int id) => recipeService.GetById(id));
app.MapGet("/recipes", () => recipeService.GetAll());
app.MapPost("/recipes", (Recipe recipe) => recipeService.Create(recipe));

app.Run();
