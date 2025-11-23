import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import AddRecipe from './pages/AddRecipe';
import MealPlanner from './pages/MealPlanner';
import ShoppingList from './pages/ShoppingList';
import RecipeDetail from './pages/RecipeDetail'; // ADD THIS IMPORT
import './styles/App.css';

/**
 * MAIN APPLICATION COMPONENT
 * This is the root component that sets up routing and global context
 * Key features demonstrated:
 * - React Router for navigation between pages
 * - Context API for global state management
 * - Component composition and prop drilling avoidance
 */
function App() {
  return (
    <RecipeProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/:id" element={<RecipeDetail />} /> {/* ADD THIS ROUTE */}
              <Route path="/add-recipe" element={<AddRecipe />} />
              <Route path="/meal-planner" element={<MealPlanner />} />
              <Route path="/shopping-list" element={<ShoppingList />} />
            </Routes>
          </main>
        </div>
      </Router>
    </RecipeProvider>
  );
}

export default App;