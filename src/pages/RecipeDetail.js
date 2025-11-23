import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRecipeContext } from '../context/RecipeContext';
import { ArrowLeft, Clock, Users, ChefHat, Utensils, Trash2 } from 'lucide-react';

/**
 * RECIPE DETAIL PAGE
 * Shows complete recipe information with ingredients and instructions
 */
const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useRecipeContext();

  // Find the recipe by ID
  const recipe = state.recipes.find(recipe => recipe.id === parseInt(id));

  // If recipe not found, show error
  if (!recipe) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h2>Recipe Not Found</h2>
          <p>The recipe you're looking for doesn't exist.</p>
          <Link to="/recipes" className="btn btn-primary">
            Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  const handleDeleteRecipe = () => {
    if (window.confirm(`Are you sure you want to delete "${recipe.name}"?`)) {
      dispatch({ type: 'DELETE_RECIPE', payload: recipe.id });
      navigate('/recipes');
    }
  };

  const handleAddToMealPlan = () => {
    alert(`"${recipe.name}" added to meal plan! (This would open a meal planner modal in a real app)`);
  };

  return (
    <div className="page-container">
      {/* Header with Back Button */}
      <div className="recipe-detail-header">
        <button 
          onClick={() => navigate(-1)}
          className="btn btn-outline btn-sm"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        
        <div className="recipe-actions">
          <button 
            onClick={handleAddToMealPlan}
            className="btn btn-primary btn-sm"
          >
            <Utensils size={16} />
            Add to Meal Plan
          </button>
          <button 
            onClick={handleDeleteRecipe}
            className="btn btn-danger btn-sm"
          >
            <Trash2 size={16} />
            Delete Recipe
          </button>
        </div>
      </div>

      {/* Recipe Hero Section */}
      <div className="recipe-hero">
        <div className="recipe-hero-content">
          <div className="recipe-badge-group">
            {recipe.category && (
              <span className="recipe-badge category">{recipe.category}</span>
            )}
            <span className="recipe-badge time">
              <Clock size={14} />
              {recipe.prepTime} min
            </span>
            <span className="recipe-badge servings">
              <Users size={14} />
              {recipe.servings} servings
            </span>
          </div>
          
          <h1 className="recipe-title">{recipe.name}</h1>
          <p className="recipe-description">{recipe.description}</p>
        </div>

        {recipe.image ? (
          <div className="recipe-hero-image">
            <img src={recipe.image} alt={recipe.name} />
          </div>
        ) : (
          <div className="recipe-hero-placeholder">
            <ChefHat size={48} />
            <span>No Image</span>
          </div>
        )}
      </div>

      {/* Recipe Content Grid */}
      <div className="recipe-content-grid">
        {/* Ingredients Section */}
        <section className="ingredients-section">
          <h2 className="section-title">
            <Utensils size={20} />
            Ingredients
          </h2>
          <div className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-item">
                <span className="ingredient-name">{ingredient.name}</span>
                {ingredient.quantity && (
                  <span className="ingredient-quantity">{ingredient.quantity}</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Instructions Section */}
        <section className="instructions-section">
          <h2 className="section-title">
            <ChefHat size={20} />
            Instructions
          </h2>
          <div className="instructions-list">
            {recipe.instructions.map((instruction, index) => (
              <div key={index} className="instruction-step">
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  {instruction}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Quick Actions Footer */}
      <div className="recipe-footer-actions">
        <button 
          onClick={handleAddToMealPlan}
          className="btn btn-primary"
        >
          <Utensils size={16} />
          Add to Meal Plan
        </button>
        <Link 
          to="/recipes" 
          className="btn btn-outline"
        >
          Back to Recipes
        </Link>
      </div>
    </div>
  );
};

export default RecipeDetail;