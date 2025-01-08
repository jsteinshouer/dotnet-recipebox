using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using RecipeBox.Models;
using System.Text.Json;

namespace RecipeBox.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context, UserManager<ApplicationUser> userManager)


        {

            if ( context.Recipes.Any() )
            {
                return;   // DB has been seeded
            }


			var root = Directory.GetCurrentDirectory();
			var userDataFile = Path.Combine(root, "Data/User.json");

			if (File.Exists(userDataFile))
			{
				var reader1 = new StreamReader(userDataFile);
				var jsonData = reader1.ReadToEnd();

				var userData = JsonSerializer.Deserialize<UserDTO>(jsonData);
				ApplicationUser user = new ApplicationUser()
				{
					UserName = userData.Email,
					Email = userData.Email,
				};
				var result = userManager.CreateAsync(user, userData.Password);
				var dataFilePath = Path.Combine(root, "Data/Recipes.json");

				if (File.Exists(dataFilePath)) {
					var reader2 = new StreamReader(dataFilePath);
					var recipeData = reader2.ReadToEnd();
					var recipes = JsonSerializer.Deserialize<List<Recipe>>(recipeData);
					user.Recipes = recipes;
				}
			}



            context.SaveChanges();
        }
    }
}
