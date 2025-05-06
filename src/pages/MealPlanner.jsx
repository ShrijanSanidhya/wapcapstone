import { useState } from 'react';
import { generateMealPlan } from '../api/spoonacular';
import './MealPlanner.css';

const MealPlanner = ({ user }) => {
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [calorieTarget, setCalorieTarget] = useState(user?.preferences?.dailyCalories || 2000);
  const [dietType, setDietType] = useState('');
  const [excludeItems, setExcludeItems] = useState('');
  
  const dietOptions = [
    { value: '', label: 'No Preference' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten-free', label: 'Gluten Free' },
    { value: 'paleo', label: 'Paleo' }
  ];
  
  const handleGenerateMealPlan = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const plan = await generateMealPlan(calorieTarget, dietType, excludeItems);
      setMealPlan(plan);
    } catch (error) {
      console.error('Error generating meal plan:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Format the day of the week
  const getDayOfWeek = (dayIndex) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[dayIndex];
  };
  
  return (
    <div className="meal-planner-page">
      <div className="page-header">
        <h1 className="page-title">Meal Planner</h1>
        <p className="page-subtitle">
          Create a personalized weekly meal plan based on your preferences.
        </p>
        
        <div className="meal-plan-generator">
          <h2 className="section-title">Generate Your Meal Plan</h2>
          
          <form onSubmit={handleGenerateMealPlan} className="meal-plan-form">
            <div className="form-control">
              <label htmlFor="calories">Daily Calorie Target</label>
              <input
                type="number"
                id="calories"
                value={calorieTarget}
                onChange={(e) => setCalorieTarget(e.target.value)}
                min="1200"
                max="4000"
              />
            </div>
            
            <div className="form-control">
              <label htmlFor="diet">Diet Type</label>
              <select
                id="diet"
                value={dietType}
                onChange={(e) => setDietType(e.target.value)}
              >
                {dietOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-control">
              <label htmlFor="exclude">Exclude Ingredients (comma separated)</label>
              <input
                type="text"
                id="exclude"
                value={excludeItems}
                onChange={(e) => setExcludeItems(e.target.value)}
                placeholder="e.g. shellfish, peanuts, mushrooms"
              />
            </div>
            
            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Meal Plan'}
            </button>
          </form>
        </div>
        
        {loading ? (
          <div className="loading-message">Generating your meal plan...</div>
        ) : mealPlan ? (
          <div className="meal-plan-results">
            <h2 className="section-title">Your Weekly Meal Plan</h2>
            
            {mealPlan.week && Object.keys(mealPlan.week).map((day, index) => (
              <div key={day} className="meal-plan-day">
                <h3 className="day-title">{getDayOfWeek(index)}</h3>
                
                <div className="meal-slot">
                  <h4 className="meal-type">Breakfast</h4>
                  {mealPlan.week[day].meals[0] && (
                    <div className="food-item">
                      <div>
                        <p className="food-title">{mealPlan.week[day].meals[0].title}</p>
                        <p className="food-calories">
                          {Math.round(mealPlan.week[day].nutrients.calories)} kcal
                        </p>
                      </div>
                      <a 
                        href={mealPlan.week[day].meals[0].sourceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="recipe-link"
                      >
                        View Recipe
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="meal-slot">
                  <h4 className="meal-type">Lunch</h4>
                  {mealPlan.week[day].meals[1] && (
                    <div className="food-item">
                      <div>
                        <p className="food-title">{mealPlan.week[day].meals[1].title}</p>
                        <p className="food-calories">
                          {Math.round(mealPlan.week[day].nutrients.calories)} kcal
                        </p>
                      </div>
                      <a 
                        href={mealPlan.week[day].meals[1].sourceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="recipe-link"
                      >
                        View Recipe
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="meal-slot">
                  <h4 className="meal-type">Dinner</h4>
                  {mealPlan.week[day].meals[2] && (
                    <div className="food-item">
                      <div>
                        <p className="food-title">{mealPlan.week[day].meals[2].title}</p>
                        <p className="food-calories">
                          {Math.round(mealPlan.week[day].nutrients.calories)} kcal
                        </p>
                      </div>
                      <a 
                        href={mealPlan.week[day].meals[2].sourceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="recipe-link"
                      >
                        View Recipe
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="day-nutrients">
                  <div className="nutrient">
                    <span className="nutrient-label">Calories:</span>
                    <span className="nutrient-value">{Math.round(mealPlan.week[day].nutrients.calories)} kcal</span>
                  </div>
                  <div className="nutrient">
                    <span className="nutrient-label">Protein:</span>
                    <span className="nutrient-value">{Math.round(mealPlan.week[day].nutrients.protein)}g</span>
                  </div>
                  <div className="nutrient">
                    <span className="nutrient-label">Carbs:</span>
                    <span className="nutrient-value">{Math.round(mealPlan.week[day].nutrients.carbohydrates)}g</span>
                  </div>
                  <div className="nutrient">
                    <span className="nutrient-label">Fat:</span>
                    <span className="nutrient-value">{Math.round(mealPlan.week[day].nutrients.fat)}g</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MealPlanner;
 