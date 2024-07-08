using System.ComponentModel.DataAnnotations;

namespace RecipeBox.Models;

public class Recipe
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string? Name { get; set; }

    [Required]
    public string? Ingredients { get; set; }

    [Required]
    public string? Directions { get; set; }

    [Required]
    public string? ApplicationUserId { get; set; }
}
