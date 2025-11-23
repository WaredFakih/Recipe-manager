import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // ADD Link IMPORT
import { useRecipeContext } from '../context/RecipeContext';
import { Search, Trash2, Clock, Users } from 'lucide-react';

/**
 * RECIPE CATALOG PAGE
 * Demonstrates:
 * - Advanced filtering and search functionality
 * - Grid layout for recipe cards
 * - Responsive card layouts
 * - Interactive UI elements with delete functionality
 */
const Recipes = () => {
  const { state, dispatch } = useRecipeContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Extract unique categories from recipes
  const categories = ['all', ...new Set(state.recipes.map(recipe => recipe.category))];

  // Filter recipes based on search and category
  const filteredRecipes = state.recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.ingredients.some(ing => 
                           ing.name.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesCategory = filterCategory === 'all' || recipe.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteRecipe = (recipeId) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      dispatch({ type: 'DELETE_RECIPE', payload: recipeId });
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">My Recipe Collection</h1>
        <p className="page-subtitle">Manage and organize all your favorite recipes</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="controls-section">
        <div className="search-box">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search recipes or ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Recipe Grid */}
      {filteredRecipes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📖</div>
          <h3>No recipes found</h3>
          <p>Try adjusting your search or add a new recipe</p>
          <Link to="/add-recipe" className="btn btn-primary">
            Add Your First Recipe
          </Link>
        </div>
      ) : (
        <div className="recipes-grid">
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              {recipe.image && (
                <div className="recipe-image">
                  <img src={recipe.image} alt={recipe.name} />
                </div>
              )}
              
              <div className="recipe-content">
                <div className="recipe-header">
                  <h3 className="recipe-title">{recipe.name}</h3>
                  <button
                    onClick={() => handleDeleteRecipe(recipe.id)}
                    className="delete-btn"
                    aria-label={`Delete ${recipe.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <p className="recipe-description">{recipe.description}</p>

                <div className="recipe-meta">
                  <span className="meta-item">
                    <Clock size={16} />
                    {recipe.prepTime} min
                  </span>
                  <span className="meta-item">
                    <Users size={16} />
                    {recipe.servings} servings
                  </span>
                  {recipe.category && (
                    <span className="recipe-category">{recipe.category}</span>
                  )}
                </div>

                <div className="recipe-actions">
                  {/* FIXED: Changed button to Link for navigation */}
                  <Link 
                    to={`/recipes/${recipe.id}`} 
                    className="btn btn-outline"
                  >
                    View Recipe
                  </Link>
                  <button className="btn btn-secondary">
                    Add to Plan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;