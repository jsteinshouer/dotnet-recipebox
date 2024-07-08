using RecipeBox.Models;
using RecipeBox.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace RecipeBox.Services;

//https://learn.microsoft.com/en-us/training/modules/persist-data-ef-core/4-interacting-data

public class UserService
{
	private readonly ApplicationDbContext _context;


	//injected via dependency injection from Program.cs
	public UserService(ApplicationDbContext context)
	{
		_context = context;
	}

	public IEnumerable<ApplicationUser> GetAll()
	{
		return _context.Users
			.AsNoTracking()
			.ToList();
	}

	public ApplicationUser? GetByUsername(string username)
	{
		return _context.Users
			.Include(p => p.Recipes)
			.AsNoTracking()
			.SingleOrDefault(p => p.UserName == username);
	}

}
