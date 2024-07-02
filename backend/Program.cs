using RecipeBox.Data;
using RecipeBox.Models;
using RecipeBox.Services;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
	Args = args,
	// Look for static files in webroot
	WebRootPath = "Public"
});

var connectionString = "Data Source=RecipeBox.db";
builder.Services.AddSqlite<ApplicationDbContext>(connectionString);
builder.Services.AddScoped<RecipeService>();
builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
	.AddEntityFrameworkStores<ApplicationDbContext>();

var app = builder.Build();

app.CreateDbIfNotExists();

var recipeService = app.Services.CreateScope().ServiceProvider.GetRequiredService<RecipeService>();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGroup("/api").MapIdentityApi<IdentityUser>();

// app.MapGet("/", () => "Hello World!");
app.MapGet("/api/recipes/{id}", (int id) => recipeService.GetById(id));
app.MapGet("/api/recipes", () => recipeService.GetAll());
app.MapPost("/api/recipes", (Recipe recipe) => recipeService.Create(recipe)).RequireAuthorization();
app.MapPut("/api/recipes/{id}", async (Recipe updateRecipe, int Id) =>
{
    var recipe = recipeService.GetById(Id);
	if (recipe is null) return Results.NotFound();
	updateRecipe.Id = Id;
	recipeService.Update(updateRecipe);
    return Results.NoContent();
}).RequireAuthorization();

app.Run();
