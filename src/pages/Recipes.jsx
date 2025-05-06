import { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import { searchRecipes, getRandomRecipes } from '../api/spoonacular';
import './Recipes.css';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');
  const [selectedIntolerances, setSelectedIntolerances] = useState([]);
  
  const dietOptions = [
    'Gluten Free', 'Ketogenic', 'Vegetarian', 'Vegan', 
    'Paleo', 'Pescetarian', 'Whole30'
  ];
  
  const intoleranceOptions = [
    'Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 
    'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Tree Nut', 'Wheat'
  ];
  
  useEffect(() => {
    const fetchInitialRecipes = async () => {
      setLoading(true);
      const recipes = await getRandomRecipes(12);
      setRecipes(recipes);
      setLoading(false);
    };
    
    fetchInitialRecipes();
  }, []);
  
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setLoading(true);
    const intolerancesString = selectedIntolerances.join(',');
    const results = await searchRecipes(query, selectedDiet, intolerancesString);
    setRecipes(results);
    setLoading(false);
  };
  
  const toggleIntolerance = (intolerance) => {
    setSelectedIntolerances(prev => 
      prev.includes(intolerance)
        ? prev.filter(item => item !== intolerance)
        : [...prev, intolerance]
    );
  };
  
  return (
    <div className="recipes-page">
      <div className="page-header">
        <h1 className="page-title">Find Recipes</h1>
        <p className="page-subtitle">
          Discover delicious and nutritious recipes tailored to your preferences.
        </p>
        
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>
        
        <div className="filter-section">
          <h3 className="filter-title">Diet Preferences</h3>
          <div className="dietary-filters">
            {dietOptions.map(diet => (
              <div
                key={diet}
                className={`filter-pill ${selectedDiet === diet.toLowerCase() ? 'active' : ''}`}
                onClick={() => setSelectedDiet(prev => prev === diet.toLowerCase() ? '' : diet.toLowerCase())}
              >
                {diet}
              </div>
            ))}
          </div>
        </div>
        
        <div className="filter-section">
          <h3 className="filter-title">Intolerances</h3>
          <div className="dietary-filters">
            {intoleranceOptions.map(intolerance => (
              <div
                key={intolerance}
                className={`filter-pill ${selectedIntolerances.includes(intolerance.toLowerCase()) ? 'active' : ''}`}
                onClick={() => toggleIntolerance(intolerance.toLowerCase())}
              >
                {intolerance}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="loading-message">Loading recipes...</div>
      ) : recipes.length > 0 ? (
        <div className="recipe-grid">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="no-results">No recipes found. Try different search terms.</div>
      )}
    </div>
  );
};

export default Recipes;
 