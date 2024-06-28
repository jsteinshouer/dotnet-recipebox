using RecipeBox.Data;
using RecipeBox.Models;
using RecipeBox.Services;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
	Args = args,
	// Look for static files in webroot
	WebRootPath = "Public"
});

// Add the RecipeContext
builder.Services.AddSqlite<RecipeContext>("Data Source=RecipeBox.db");
builder.Services.AddScoped<RecipeService>();

var app = builder.Build();

app.CreateDbIfNotExists();

var recipeService = app.Services.CreateScope().ServiceProvider.GetRequiredService<RecipeService>();

app.UseDefaultFiles();
app.UseStaticFiles();

// app.MapGet("/", () => "Hello World!");
app.MapGet("/api/recipes/{id}", (int id) => recipeService.GetById(id));
app.MapGet("/api/recipes", () => recipeService.GetAll());
app.MapPost("/api/recipes", (Recipe recipe) => recipeService.Create(recipe));
app.MapPut("/api/recipes/{id}", async (Recipe updateRecipe, int Id) =>
{
    var recipe = recipeService.GetById(Id);
	if (recipe is null) return Results.NotFound();
	updateRecipe.Id = Id;
	recipeService.Update(updateRecipe);
    return Results.NoContent();
});

app.Run();
