import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipeContext } from '../context/RecipeContext';
import { ChefHat, Clock, Users, BarChart3 } from 'lucide-react';

const Home = () => {
  const { state } = useRecipeContext();

  const stats = [
    {
      icon: <ChefHat className="stat-icon" />,
      label: 'Total Recipes',
      value: state.recipes.length,
      color: 'text-blue'
    },
    {
      icon: <Clock className="stat-icon" />,
      label: 'Meals Planned',
      value: Object.keys(state.mealPlan).length,
      color: 'text-green'
    },
    {
      icon: <Users className="stat-icon" />,
      label: 'Active This Week',
      value: '7+',
      color: 'text-purple'
    },
    {
      icon: <BarChart3 className="stat-icon" />,
      label: 'Time Saved',
      value: '5h+',
      color: 'text-orange'
    }
  ];

  return (
    <div className="page-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-heading">
            Organize Your Kitchen,<br />
            <span className="gradient-text">Simplify Your Cooking</span>
          </h1>
          <p className="hero-subtitle">
            Manage recipes, plan meals, and generate shopping lists all in one place. 
            Save time and reduce food waste with smart meal planning.
          </p>
          <div className="hero-actions">
            <Link to="/add-recipe" className="btn btn-primary">
              Add Your First Recipe
            </Link>
            <Link to="/recipes" className="btn btn-secondary">
              Browse Recipes
            </Link>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="recipe-card-preview">
            <div className="preview-image"></div>
            <div className="preview-content">
              <h3>Quick Pasta</h3>
              <p>30 min • 4 servings</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <h2 className="section-heading">Your Cooking Journey</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className={`stat-icon-container ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="stat-info">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-heading">Everything You Need</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📖</div>
            <h3>Recipe Collection</h3>
            <p>Store all your favorite recipes with ingredients, instructions, and cooking times.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Meal Planning</h3>
            <p>Plan your weekly meals and avoid last-minute cooking decisions.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🛒</div>
            <h3>Shopping Lists</h3>
            <p>Automatically generate shopping lists from your meal plans.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;