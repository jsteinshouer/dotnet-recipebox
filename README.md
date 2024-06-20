
# RecipeBox

A simple recipe application using .net core.

```
dotnet new web -o RecipeBox -f net8.0
```

Setup EF
```
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet tool install --global dotnet-ef
```

Apply EF to the project

1. Add a folder named `data`
2. Create `Models/Recipe.cs`
3. Create `Data/RecipeContext.cs`
4. Setup DB connection in `Program.cs`
5. Generate DB Migrations

```
dotnet ef migrations add InitialCreate --context RecipeContext
```