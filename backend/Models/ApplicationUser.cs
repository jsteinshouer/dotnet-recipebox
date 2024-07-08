using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace RecipeBox.Models;

public class ApplicationUser : IdentityUser
{

	public ICollection<Recipe>? Recipes{ get; set; }
}
