# 🍳 Recipe Manager & Meal Planner

A comprehensive React-based web application for managing recipes, planning meals, and generating shopping lists. Built with modern web development principles and responsive design.

![Recipe Manager](https://img.shields.io/badge/React-18.2.0-blue) ![License](https://img.shields.io/badge/License-MIT-green) ![Status](https://img.shields.io/badge/Status-Production%20Ready-success)

## 🌟 Live Demo
[Add your deployment link here]

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Pages Overview](#pages-overview)
- [Key Features](#key-features)
- [Development Principles](#development-principles)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Features

### Core Functionality
- **Recipe Management** - Create, view, edit, and delete recipes
- **Meal Planning** - Weekly meal planner with drag-and-drop interface
- **Shopping Lists** - Automatically generated from meal plans
- **Search & Filter** - Find recipes by name, ingredients, or category
- **Responsive Design** - Works perfectly on all devices

### User Experience
- **Intuitive Interface** - Clean, modern design with smooth animations
- **Data Persistence** - Local storage keeps your data safe between sessions
- **Real-time Updates** - Instant feedback on all user actions
- **Accessibility** - Built with ARIA labels and keyboard navigation

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with functional components and hooks
- **React Router DOM** - Client-side routing for SPA experience
- **Context API** - Global state management with useReducer
- **CSS3** - Custom responsive design with CSS variables
- **Lucide React** - Beautiful, consistent icons

### Development Tools
- **Create React App** - Zero-configuration build setup
- **ESLint** - Code quality and consistency
- **Git** - Version control

## 📁 Project Structure
recipe-manager/
├── public/
│ └── index.html
├── src/
│ ├── components/ # Reusable UI components
│ │ └── Navbar.js # Responsive navigation
│ ├── pages/ # Main application pages
│ │ ├── Home.js # Landing page with dashboard
│ │ ├── Recipes.js # Recipe catalog and search
│ │ ├── AddRecipe.js # Recipe creation form
│ │ ├── MealPlanner.js # Weekly meal planning
│ │ ├── ShoppingList.js # Shopping list management
│ │ └── RecipeDetail.js # Individual recipe view
│ ├── context/ # State management
│ │ └── RecipeContext.js # Global state with useReducer
│ ├── styles/ # Styling
│ │ └── App.css # Complete CSS with responsive design
│ ├── App.js # Main app component with routing
│ └── index.js # Application entry point
└── package.json

## 📄 Pages Overview

### 1. Home (`/`)
- **Purpose**: Landing page and dashboard
- **Features**: 
  - Hero section with call-to-action
  - Statistics dashboard
  - Feature overview
  - Quick navigation

### 2. Recipes (`/recipes`)
- **Purpose**: Recipe catalog and management
- **Features**:
  - Grid layout of all recipes
  - Search by name and ingredients
  - Filter by category
  - Delete functionality
  - View recipe details

### 3. Add Recipe (`/add-recipe`)
- **Purpose**: Recipe creation interface
- **Features**:
  - Dynamic form with validation
  - Add/remove ingredient fields
  - Add/remove instruction steps
  - Category selection
  - Image upload capability

### 4. Meal Planner (`/meal-planner`)
- **Purpose**: Weekly meal planning
- **Features**:
  - 7-day calendar view
  - Breakfast, Lunch, Dinner slots
  - Modal recipe selection
  - Individual meal deletion
  - Clear entire week option
  - Generate shopping list

### 5. Shopping List (`/shopping-list`)
- **Purpose**: Grocery list management
- **Features**:
  - Auto-generated from meal plan
  - Check-off purchased items
  - Progress tracking
  - Clear completed items

### 6. Recipe Detail (`/recipes/:id`)
- **Purpose**: Detailed recipe view
- **Features**:
  - Complete recipe information
  - Ingredients with quantities
  - Step-by-step instructions
  - Recipe metadata
  - Add to meal plan option

## 🔑 Key Features

### State Management
```javascript
// Advanced Context API implementation
const ACTIONS = {
  ADD_RECIPE: 'ADD_RECIPE',
  DELETE_RECIPE: 'DELETE_RECIPE',
  ADD_TO_MEAL_PLAN: 'ADD_TO_MEAL_PLAN',
  REMOVE_FROM_MEAL_PLAN: 'REMOVE_FROM_MEAL_PLAN',
  CLEAR_MEAL_PLAN: 'CLEAR_MEAL_PLAN',
  GENERATE_SHOPPING_LIST: 'GENERATE_SHOPPING_LIST'
};