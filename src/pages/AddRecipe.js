import React, { useState } from 'react';
import { useRecipeContext } from '../context/RecipeContext';
import { Plus, Trash2 } from 'lucide-react';

const AddRecipe = () => {
  const { dispatch } = useRecipeContext();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    prepTime: '',
    servings: '',
    ingredients: [{ name: '', quantity: '' }],
    instructions: ['']
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][field] = value;
    setFormData(prev => ({ ...prev, ingredients: updatedIngredients }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', quantity: '' }]
    }));
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, ingredients: updatedIngredients }));
    }
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index] = value;
    setFormData(prev => ({ ...prev, instructions: updatedInstructions }));
  };

  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  const removeInstruction = (index) => {
    if (formData.instructions.length > 1) {
      const updatedInstructions = formData.instructions.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, instructions: updatedInstructions }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.description || !formData.prepTime || !formData.servings) {
      alert('Please fill in all required fields');
      return;
    }

    dispatch({
      type: 'ADD_RECIPE',
      payload: {
        ...formData,
        prepTime: parseInt(formData.prepTime),
        servings: parseInt(formData.servings)
      }
    });

    // Reset form
    setFormData({
      name: '',
      description: '',
      category: '',
      prepTime: '',
      servings: '',
      ingredients: [{ name: '', quantity: '' }],
      instructions: ['']
    });

    alert('Recipe added successfully!');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Add New Recipe</h1>
        <p className="page-subtitle">Share your culinary masterpiece with the world</p>
      </div>

      <form onSubmit={handleSubmit} className="recipe-form">
        <section className="form-section">
          <h2 className="section-heading">Basic Information</h2>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Recipe Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="form-input"
                placeholder="e.g., Classic Spaghetti Carbonara"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="form-input"
              >
                <option value="">Select a category</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Preparation Time (minutes) *</label>
              <input
                type="number"
                min="1"
                value={formData.prepTime}
                onChange={(e) => handleInputChange('prepTime', e.target.value)}
                className="form-input"
                placeholder="30"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Servings *</label>
              <input
                type="number"
                min="1"
                value={formData.servings}
                onChange={(e) => handleInputChange('servings', e.target.value)}
                className="form-input"
                placeholder="4"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="form-input"
              placeholder="Describe your recipe... What makes it special?"
              rows="3"
              required
            />
          </div>
        </section>

        <section className="form-section">
          <div className="section-header">
            <h2 className="section-heading">Ingredients</h2>
            <button
              type="button"
              onClick={addIngredient}
              className="btn btn-outline btn-sm"
            >
              <Plus size={16} />
              Add Ingredient
            </button>
          </div>

          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-row">
              <div className="ingredient-inputs">
                <input
                  type="text"
                  placeholder="Ingredient name *"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  className="form-input"
                  required
                />
                <input
                  type="text"
                  placeholder="Quantity (e.g., 2 cups, 200g)"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                  className="form-input"
                />
              </div>
              {formData.ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="remove-btn"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </section>

        <section className="form-section">
          <div className="section-header">
            <h2 className="section-heading">Instructions</h2>
            <button
              type="button"
              onClick={addInstruction}
              className="btn btn-outline btn-sm"
            >
              <Plus size={16} />
              Add Step
            </button>
          </div>

          {formData.instructions.map((instruction, index) => (
            <div key={index} className="instruction-step">
              <div className="step-header">
                <span className="step-number">Step {index + 1}</span>
                {formData.instructions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    className="remove-btn"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              <textarea
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                className="form-input"
                placeholder={`Describe step ${index + 1}...`}
                rows="3"
                required
              />
            </div>
          ))}
        </section>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary btn-lg">
            Save Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;