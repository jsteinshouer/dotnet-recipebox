using Microsoft.EntityFrameworkCore;
using RecipeBox.Models;

namespace RecipeBox.Data;

public class RecipeContext : DbContext
{
    public RecipeContext (DbContextOptions<RecipeContext> options)
        : base(options)
    {
    }

    public DbSet<Recipe> Recipes => Set<Recipe>();
}