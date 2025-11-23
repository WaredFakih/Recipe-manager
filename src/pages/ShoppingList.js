import React, { useState } from 'react';
import { useRecipeContext } from '../context/RecipeContext';
import { ShoppingCart, Check, Trash2 } from 'lucide-react';

const ShoppingList = () => {
  const { state } = useRecipeContext();
  const [purchasedItems, setPurchasedItems] = useState(new Set());

  const togglePurchased = (itemId) => {
    setPurchasedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const clearPurchased = () => {
    setPurchasedItems(new Set());
  };

  const progress = state.shoppingList.length > 0 
    ? (purchasedItems.size / state.shoppingList.length) * 100 
    : 0;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Shopping List</h1>
        <p className="page-subtitle">
          {state.shoppingList.length} items • {Math.round(progress)}% completed
        </p>
      </div>

      {state.shoppingList.length > 0 && (
        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-stats">
            <span>{purchasedItems.size} of {state.shoppingList.length} items purchased</span>
          </div>
        </div>
      )}

      <div className="shopping-actions">
        {purchasedItems.size > 0 && (
          <button onClick={clearPurchased} className="btn btn-outline">
            <Trash2 size={16} />
            Clear Purchased
          </button>
        )}
      </div>

      {state.shoppingList.length === 0 ? (
        <div className="empty-state">
          <ShoppingCart className="empty-icon" size={48} />
          <h3>Your shopping list is empty</h3>
          <p>Add recipes to your meal plan to generate a shopping list</p>
        </div>
      ) : (
        <div className="shopping-list">
          {state.shoppingList.map((item, index) => (
            <div
              key={item.id || index}
              className={`shopping-item ${purchasedItems.has(item.id || index) ? 'purchased' : ''}`}
            >
              <label className="item-checkbox">
                <input
                  type="checkbox"
                  checked={purchasedItems.has(item.id || index)}
                  onChange={() => togglePurchased(item.id || index)}
                />
                <span className="checkmark">
                  <Check size={14} />
                </span>
              </label>
              
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                {item.quantity && (
                  <span className="item-quantity">{item.quantity}</span>
                )}
                {item.recipe && (
                  <span className="item-recipe">for {item.recipe}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShoppingList;