
import { useState } from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe, addToMealPlan }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div className="recipe-card">
      <img 
        src={recipe.image} 
        alt={recipe.title} 
        className="recipe-image" 
      />
      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.title}</h3>
        
        <div className="recipe-meta">
          <div className="recipe-calories">
            <span>🔥</span> {recipe.nutrition?.calories || recipe.calories || 'N/A'} kcal
          </div>
          <div className="recipe-time">
            <span>⏱️</span> {recipe.readyInMinutes || '30'} min
          </div>
        </div>
        
        {showDetails ? (
          <>
            <div className="recipe-description">
              <p dangerouslySetInnerHTML={{ __html: recipe.summary?.substring(0, 150) + '...' || 'No description available' }}></p>
              
              <h4 className="nutrient-heading">Nutrients:</h4>
              <ul className="nutrient-list">
                <li>Protein: {recipe.nutrition?.nutrients.find(n => n.name === "Protein")?.amount || 'N/A'}g</li>
                <li>Carbs: {recipe.nutrition?.nutrients.find(n => n.name === "Carbohydrates")?.amount || 'N/A'}g</li>
                <li>Fat: {recipe.nutrition?.nutrients.find(n => n.name === "Fat")?.amount || 'N/A'}g</li>
              </ul>
            </div>
            <button onClick={() => setShowDetails(false)} className="btn btn-secondary btn-full">
              Show Less
            </button>
          </>
        ) : (
          <>
            <div className="recipe-description">
              <p>{recipe.title} - A delicious and nutritious meal option.</p>
            </div>
            <button onClick={() => setShowDetails(true)} className="btn btn-secondary btn-full">
              Show More
            </button>
          </>
        )}
        
        {addToMealPlan && (
          <button onClick={() => addToMealPlan(recipe)} className="btn btn-primary btn-full">
            Add to Meal Plan
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
