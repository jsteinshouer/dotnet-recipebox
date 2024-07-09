using RecipeBox.Data;
using RecipeBox.Models;
using RecipeBox.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
	Args = args,
	// Look for static files in webroot
	WebRootPath = "Public"
});

var connectionString = "Data Source=RecipeBox.db";
builder.Services.AddSqlite<ApplicationDbContext>(connectionString);
builder.Services.AddScoped<RecipeService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<ApplicationUser>()
	.AddEntityFrameworkStores<ApplicationDbContext>();

var app = builder.Build();

app.CreateDbIfNotExists();

var recipeService = app.Services.CreateScope().ServiceProvider.GetRequiredService<RecipeService>();
var userService = app.Services.CreateScope().ServiceProvider.GetRequiredService<UserService>();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGroup("/api").MapIdentityApi<ApplicationUser>();

// app.MapGet("/", () => "Hello World!");
app.MapGet("/api/me", (HttpContext context) => 
{
	var user = userService.GetByUsername(context.User.Identity.Name);
	return Results.Ok(new{
		Id = user.Id,
		userName = user.UserName,
		Email = user.Email
	});
}).RequireAuthorization();

app.MapGet("/api/recipes/{id}", async (HttpContext context, int Id) => 
{
	var user = userService.GetByUsername(context.User.Identity.Name);
	var recipe = recipeService.GetById(Id);
	if (recipe is null || recipe.ApplicationUserId != user.Id) return Results.NotFound();
	return Results.Ok(recipe);
}).RequireAuthorization();

app.MapGet("/api/recipes", (HttpContext context) => 
{
	return userService.GetByUsername(context.User.Identity.Name).Recipes;
}).RequireAuthorization();

app.MapPost("/api/recipes", (HttpContext context, Recipe recipe) => 
{
	var user = userService.GetByUsername(context.User.Identity.Name);
	recipe.ApplicationUserId = user.Id;
	return recipeService.Create(recipe);
}).RequireAuthorization();

app.MapPut("/api/recipes/{id}", async (HttpContext context, Recipe updateRecipe, int Id) =>
{
	var user = userService.GetByUsername(context.User.Identity.Name);
	var recipe = recipeService.GetById(Id);
	if (recipe is null || recipe.ApplicationUserId != user.Id) return Results.NotFound();
	updateRecipe.Id = Id;
	recipeService.Update(updateRecipe);
    return Results.NoContent();
}).RequireAuthorization();

app.Run();
