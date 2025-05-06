const API_KEY = '4efe382e4f6345a5b04754e015a6a421';
const API_URL = 'https://api.spoonacular.com';

// Get random recipes
export const getRandomRecipes = async (number = 6) => {
  try {
    const response = await fetch(
      `${API_URL}/recipes/random?apiKey=${API_KEY}&number=${number}`
    );
    const data = await response.json();
    return data.recipes || [];
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    return [];
  }
};

// Search recipes
export const searchRecipes = async (query, diet = '', intolerances = '') => {
  try {
    let url = `${API_URL}/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=12&addRecipeInformation=true&fillIngredients=true`;
    
    if (diet) {
      url += `&diet=${diet}`;
    }
    
    if (intolerances) {
      url += `&intolerances=${intolerances}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
};

// Generate a meal plan
export const generateMealPlan = async (targetCalories = 2000, diet = '', exclude = '') => {
  try {
    let url = `${API_URL}/mealplanner/generate?apiKey=${API_KEY}&timeFrame=week&targetCalories=${targetCalories}`;
    
    if (diet) {
      url += `&diet=${diet}`;
    }
    
    if (exclude) {
      url += `&exclude=${exclude}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating meal plan:', error);
    return null;
  }
};
