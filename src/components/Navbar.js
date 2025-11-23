import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChefHat } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/recipes', label: 'Recipes', icon: '📖' },
    { path: '/add-recipe', label: 'Add Recipe', icon: '➕' },
    { path: '/meal-planner', label: 'Meal Planner', icon: '📅' },
    { path: '/shopping-list', label: 'Shopping List', icon: '🛒' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <ChefHat className="brand-icon" />
          <span className="brand-text">RecipeMaster</span>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${
                location.pathname === item.path ? 'nav-link-active' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;