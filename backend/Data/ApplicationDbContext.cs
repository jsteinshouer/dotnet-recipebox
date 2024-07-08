using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RecipeBox.Models;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
	public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
		base(options)
	{

	}

	protected override void OnModelCreating(ModelBuilder builder)
	{
		base.OnModelCreating(builder);
		builder.Entity<ApplicationUser>().ToTable("Users");
		builder.Entity<IdentityRole>().ToTable("Roles");
		builder.Entity<IdentityUserClaim<string>>().ToTable("Claims");
		builder.Entity<IdentityUserToken<string>>().ToTable("Tokens");
		builder.Entity<IdentityUserLogin<string>>().ToTable("Logins");
		builder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaims");
		builder.Entity<IdentityUserRole<string>>().ToTable("UserRoles");
	}

	public DbSet<Recipe> Recipes => Set<Recipe>();
}
