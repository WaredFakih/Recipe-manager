import React, { useState } from 'react';
import { useRecipeContext } from '../context/RecipeContext';
import { Plus, Utensils, Clock, Trash2, X, AlertCircle } from 'lucide-react';

/**
 * MEAL PLANNING INTERFACE WITH DELETE FUNCTIONALITY
 * Demonstrates:
 * - Weekly calendar layout with meal management
 * - Delete individual meals and clear entire plan
 * - Modal interactions for recipe selection
 * - Confirmation dialogs for destructive actions
 */
const MealPlanner = () => {
  const { state, dispatch, ACTIONS } = useRecipeContext();
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMealType, setSelectedMealType] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

  /**
   * Add a recipe to the meal plan
   */
  const handleAddToMealPlan = (recipe) => {
    if (selectedDay && selectedMealType) {
      dispatch({
        type: ACTIONS.ADD_TO_MEAL_PLAN,
        payload: {
          day: `${selectedDay}-${selectedMealType}`,
          recipe: recipe
        }
      });
      setShowRecipeModal(false);
    }
  };

  /**
   * Remove a specific meal from the meal plan
   */
  const handleRemoveFromMealPlan = (day, mealType, e) => {
    e.stopPropagation(); // Prevent triggering the add meal function
    const mealKey = `${day}-${mealType}`;
    
    if (window.confirm(`Remove ${state.mealPlan[mealKey]?.name} from ${day} ${mealType}?`)) {
      dispatch({
        type: ACTIONS.REMOVE_FROM_MEAL_PLAN,
        payload: mealKey
      });
    }
  };

  /**
   * Clear the entire meal plan
   */
  const handleClearMealPlan = () => {
    dispatch({ type: ACTIONS.CLEAR_MEAL_PLAN });
    setShowClearConfirm(false);
  };

  /**
   * Get meal for a specific day and meal type
   */
  const getMealForSlot = (day, mealType) => {
    return state.mealPlan[`${day}-${mealType}`];
  };

  /**
   * Count total planned meals for statistics
   */
  const totalPlannedMeals = Object.keys(state.mealPlan).length;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Meal Planner</h1>
        <p className="page-subtitle">
          Plan your weekly meals and save time • {totalPlannedMeals} meals planned
        </p>
      </div>

      {/* Weekly Calendar */}
      <div className="meal-planner">
        <div className="planner-header">
          <div className="time-column"></div>
          {daysOfWeek.map(day => (
            <div key={day} className="day-header">
              <span className="day-name">{day}</span>
              <span className="day-date">{/* Optional: Add dates here */}</span>
            </div>
          ))}
        </div>

        <div className="planner-body">
          {mealTypes.map(mealType => (
            <div key={mealType} className="meal-row">
              <div className="meal-type-header">
                <Utensils size={16} />
                <span>{mealType}</span>
              </div>
              
              {daysOfWeek.map(day => {
                const mealKey = `${day}-${mealType}`;
                const meal = getMealForSlot(day, mealType);
                
                return (
                  <div
                    key={mealKey}
                    className={`meal-slot ${meal ? 'has-meal' : 'empty-meal'}`}
                    onClick={() => {
                      setSelectedDay(day);
                      setSelectedMealType(mealType);
                      setShowRecipeModal(true);
                    }}
                  >
                    {meal ? (
                      <div className="scheduled-meal">
                        <div className="meal-header">
                          <h4 className="meal-title">{meal.name}</h4>
                          {/* DELETE BUTTON FOR INDIVIDUAL MEAL */}
                          <button
                            className="meal-delete-btn"
                            onClick={(e) => handleRemoveFromMealPlan(day, mealType, e)}
                            title={`Remove ${meal.name}`}
                            aria-label={`Remove ${meal.name} from ${day} ${mealType}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="meal-meta">
                          <Clock size={12} />
                          <span>{meal.prepTime} min</span>
                          <span className="servings">{meal.servings} servings</span>
                        </div>
                        {meal.category && (
                          <span className="meal-category">{meal.category}</span>
                        )}
                      </div>
                    ) : (
                      <div className="empty-slot">
                        <Plus size={20} />
                        <span>Add Meal</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="planner-actions">
        <button 
          className="btn btn-primary"
          onClick={() => dispatch({ type: ACTIONS.GENERATE_SHOPPING_LIST })}
          disabled={totalPlannedMeals === 0}
        >
          Generate Shopping List
          {totalPlannedMeals > 0 && (
            <span className="badge">{totalPlannedMeals}</span>
          )}
        </button>
        
        <button 
          className="btn btn-outline btn-danger"
          onClick={() => setShowClearConfirm(true)}
          disabled={totalPlannedMeals === 0}
        >
          <Trash2 size={16} />
          Clear All Meals
        </button>
      </div>

      {/* Empty State */}
      {totalPlannedMeals === 0 && (
        <div className="empty-state">
          <Utensils className="empty-icon" size={48} />
          <h3>No meals planned yet</h3>
          <p>Click on any meal slot to start planning your week</p>
        </div>
      )}

      {/* Recipe Selection Modal */}
      {showRecipeModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Select Recipe for {selectedDay} {selectedMealType}</h2>
              <button
                onClick={() => setShowRecipeModal(false)}
                className="modal-close-btn"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="recipe-grid-modal">
              {state.recipes.length === 0 ? (
                <div className="empty-state">
                  <p>No recipes available. Add some recipes first!</p>
                </div>
              ) : (
                state.recipes.map(recipe => (
                  <div
                    key={recipe.id}
                    className="recipe-option"
                    onClick={() => handleAddToMealPlan(recipe)}
                  >
                    <div className="recipe-option-header">
                      <h4>{recipe.name}</h4>
                      <span className="recipe-time">{recipe.prepTime} min</span>
                    </div>
                    <p className="recipe-description">{recipe.description}</p>
                    <div className="recipe-meta">
                      <span className="servings">{recipe.servings} servings</span>
                      {recipe.category && (
                        <span className="category-tag">{recipe.category}</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="modal-actions">
              <button
                onClick={() => setShowRecipeModal(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      {showClearConfirm && (
        <div className="modal-overlay">
          <div className="modal-content confirm-modal">
            <div className="confirm-icon">
              <AlertCircle size={48} color="#ef4444" />
            </div>
            <h2>Clear All Meals?</h2>
            <p>This will remove all meals from your weekly plan. This action cannot be undone.</p>
            <div className="confirm-actions">
              <button
                onClick={handleClearMealPlan}
                className="btn btn-danger"
              >
                Yes, Clear All
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;