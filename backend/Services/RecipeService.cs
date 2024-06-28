using RecipeBox.Models;
using RecipeBox.Data;
using Microsoft.EntityFrameworkCore;

namespace RecipeBox.Services;

//https://learn.microsoft.com/en-us/training/modules/persist-data-ef-core/4-interacting-data

public class RecipeService
{
    private readonly RecipeContext _context;


    //injected via dependency injection from Program.cs
    public RecipeService(RecipeContext context)
    {
        _context = context;
    }

    public IEnumerable<Recipe> GetAll()
    {
        return _context.Recipes
            .AsNoTracking()
            .ToList();
    }

    public Recipe? GetById(int id)
    {
        return _context.Recipes
            .AsNoTracking()
            .SingleOrDefault(p => p.Id == id);
    }

    public Recipe Create(Recipe newRecipe)
    {
        _context.Recipes.Add(newRecipe);
        _context.SaveChanges();

        return newRecipe;
    }

	public void Update(Recipe updateRecipe)
	{
		var recipe = _context.Recipes.Find(updateRecipe.Id);
		if (recipe is null)
			throw new InvalidOperationException("Recipe does not exist");

		recipe.Name = updateRecipe.Name;
		recipe.Directions = updateRecipe.Directions;
		recipe.Ingredients = updateRecipe.Ingredients;

		_context.SaveChanges();
	}
}
