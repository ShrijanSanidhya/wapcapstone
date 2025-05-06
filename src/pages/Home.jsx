import { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import { getRandomRecipes } from '../api/spoonacular';
import './Home.css';

const Home = ({ user, onNavigate }) => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      setLoading(true);
      const recipes = await getRandomRecipes(4);
      setFeaturedRecipes(recipes);
      setLoading(false);
    };
    
    fetchFeaturedRecipes();
  }, []);
  
  return (
    <div>
      <div className="hero-section">
        <h1 className="hero-title">Your Personal Nutrition Assistant</h1>
        <p className="hero-subtitle">
          Track calories, discover healthy recipes, and create personalized meal plans all in one place.
        </p>
        <div className="hero-buttons">
          {user ? (
            <button 
              onClick={() => onNavigate('meal-planner')} 
              className="btn btn-primary"
            >
              Create Meal Plan
            </button>
          ) : (
            <button 
              onClick={() => onNavigate('signup')} 
              className="btn btn-primary"
            >
              Get Started
            </button>
          )}
          <button 
            onClick={() => onNavigate('recipes')} 
            className="btn btn-secondary"
          >
            Browse Recipes
          </button>
        </div>
      </div>
      
      <div className="features-container">
        <div className="feature-card">
          <div className="feature-icon">🍽️</div>
          <h3 className="feature-title">Track Calories</h3>
          <p className="feature-description">
            Log your meals and monitor your daily calorie intake to stay on track with your health goals.
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🥗</div>
          <h3 className="feature-title">Find Recipes</h3>
          <p className="feature-description">
            Discover thousands of healthy recipes tailored to your dietary preferences and restrictions.
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📝</div>
          <h3 className="feature-title">Plan Meals</h3>
          <p className="feature-description">
            Create weekly meal plans that help you meet your nutritional needs and save time.
          </p>
        </div>
      </div>
      
      <div className="featured-section">
        <div className="featured-header">
          <h2 className="section-title">Featured Recipes</h2>
          <button 
            onClick={() => onNavigate('recipes')} 
            className="view-all-link"
          >
            View All
          </button>
        </div>
        
        {loading ? (
          <div className="loading-message">Loading recipes...</div>
        ) : (
          <div className="recipe-grid">
            {featuredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
 