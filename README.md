
# RecipeBox

A simple recipe application using .net core.

### Scaffold project

```
dotnet new web -o RecipeBox -f net8.0
```

### Setup EF
```
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet tool install --global dotnet-ef
```

### Apply EF to the project

1. Add a folder named `data`
2. Create `Models/Recipe.cs`
3. Create `Data/RecipeContext.cs`
4. Setup DB connection in `Program.cs`
5. Generate DB Migrations

```
dotnet ef migrations add InitialCreate --context RecipeContext
```

6. Apply migration

```
dotnet ef database update --context RecipeContext
```

### (Seed data)[https://learn.microsoft.com/en-us/training/modules/persist-data-ef-core/4-interacting-data#seed-the-database] and add first endpoint

1. Created `RecipeBox/Models/DBInitializer.cs`
2. Created `RecipeBox/Data/Extensions.cs`
3. Add `app.CreateDbIfNotExists();` to `Program.cs`
4. Add `Services/RecipeService.cs`
5. Add `builder.Services.AddScoped<RecipeService>();` to `Program.cs`
6. Add a reference to `RecipeService` in `Program.cs`

```
var recipeService = app.Services.CreateScope().ServiceProvider.GetRequiredService<RecipeService>();
```

4. Run `dotnet run`