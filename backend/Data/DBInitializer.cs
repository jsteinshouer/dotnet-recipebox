using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using RecipeBox.Models;

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

			ApplicationUser user = new ApplicationUser()
			{
				  UserName = "me@example.com",
				  Email = "me@example.com",
			};

			var result = userManager.CreateAsync(user, "P@ssword1");

			var recipes = new Recipe[]
            {
                new Recipe
                    { 
                        Name = "Cheese Grits", 
                        Ingredients = "2 cups milk\n1 cup water\n3/4 cup instant grits\n4 tablespoons butter\n1/2 teaspoon kosher salt\n1/2 cup cheddar cheese, shredded\n2 eggs", 
                        Directions = "Preheat oven to 375.\nBring water and milk to a boil.\nAdd grits and stir constantly for about 5 minute until thick.\nRemove from heat and stir in remaining ingredients.\nButter or lightly oil a 2 quart baking dish. Transfer grits to baking dish and bake for about 20-25 minutes or until set and lightly browned on the edges."
                    },
                new Recipe
                    { 
                        Name = "Grilled Chicken Caesar Wraps", 
                        Ingredients = "1 Flatout Low Carb Protein Wrap\n2 tablespoons homemade or purchased Caesar dressing\n1 cup chopped romaine lettuce\n4 ounces grilled chicken sliced\n1/4 cup Parmesan cheese",
                        Directions = "1. Place wrap on a flat surface. Spread Caesar dressing in an even layer.\n\n2. Top with romaine, grilled chicken, and Parmesan cheese. Roll tightly, slice, and serve! Or, wrap in foil and keep refrigerated until lunch time!"
                    },
                new Recipe
                    { 
                        Name = "Lemon Caper Flounder", 
                        Ingredients = "1 cup milk\n1/2 cup flour\n2 tablespoons olive oil\n4 flounder fillets\nkosher salt and pepper\n4 tablespoons butter\n2 tablespoons capers, drained\n1/2 lemon, juiced\nparsley, optional", 
                        Directions = "Pour milk into a shallow dish. Add fish and let soak for about 5 minutes.\nMeanwhile, place flour in a separate shallow dish.\nHeat oil in a skillet over medium high heat.\nRemove fillets from milk one at a time. Let excess milk drip off and then dredge in flour on both sides.\nPlace fillets in pan, season with salt and pepper, and cook for about 2 minutes per side.\nTransfer from pan to a plate and tent lightly with foil.\nWipe pan clean with a paper towel.\nReturn pan to stove and add butter. Cook over medium high heat until melted and slightly brown.\nRemove from heat and add capers and lemon juice.\nPlate fillets, drizzle with lemon caper sauce, and garnish with parsley."
                    }
            };

			user.Recipes = recipes;

            // context.Recipes.AddRange(recipes);
            context.SaveChanges();
        }
    }
}
