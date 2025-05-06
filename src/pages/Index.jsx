import React from 'react';
import '../styles/Index.css';

function Index({ onNavigate }) {
  return (
    <div className="index-hero-bg">
      <div className="index-hero">
        <h1 className="index-title">Your Personal Nutrition Assistant</h1>
        <p className="index-subtitle">
          Track calories, discover healthy recipes, and create personalized meal plans all in one place.
        </p>
        <div className="index-hero-buttons">
          <button
            className="index-btn-green"
            onClick={() => onNavigate('signup')}
          >
            Get Started
          </button>
          <button
            className="index-btn-orange"
            onClick={() => onNavigate('recipes')}
          >
            Browse Recipes
          </button>
        </div>
      </div>
      <div className="index-features">
        <div className="index-feature-card">
          <div className="index-feature-emoji">🍽️</div>
          <div className="index-feature-title">Track Calories</div>
          <div className="index-feature-desc">Log your meals and monitor your daily calorie intake to stay on track with your health goals.</div>
        </div>
        <div className="index-feature-card">
          <div className="index-feature-emoji">🥗</div>
          <div className="index-feature-title">Find Recipes</div>
          <div className="index-feature-desc">Discover thousands of healthy recipes tailored to your dietary preferences and restrictions.</div>
        </div>
        <div className="index-feature-card">
          <div className="index-feature-emoji">📝</div>
          <div className="index-feature-title">Plan Meals</div>
          <div className="index-feature-desc">Create weekly meal plans that help you meet your nutritional needs and save time.</div>
        </div>
      </div>
    </div>
  );
}

export default Index; 