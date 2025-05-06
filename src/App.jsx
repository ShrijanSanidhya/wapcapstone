import React, { useState, useEffect } from 'react';
import './App.css';

// Import all page components
import Index from './pages/Index';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
// import Recipes from './pages/Recipes';
import MealPlanner from './pages/MealPlanner';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  const [currentPage, setCurrentPage] = useState('index');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for saved user data in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCurrentPage('index');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'index':
        return <Index onNavigate={handleNavigate} />;
      case 'home':
        return <Home user={user} onNavigate={handleNavigate} />;
      case 'login':
        return user ? <Home user={user} onNavigate={handleNavigate} /> : <Login handleLogin={handleLogin} onNavigate={handleNavigate} />;
      case 'signup':
        return user ? <Home user={user} onNavigate={handleNavigate} /> : <Signup handleLogin={handleLogin} onNavigate={handleNavigate} />;
      case 'profile':
        return user ? <Profile user={user} setUser={setUser} onNavigate={handleNavigate} /> : <Login handleLogin={handleLogin} onNavigate={handleNavigate} />;
      case 'recipes':
        return <Recipes user={user} onNavigate={handleNavigate} />;
      case 'meal-planner':
        return user ? <MealPlanner user={user} onNavigate={handleNavigate} /> : <Login handleLogin={handleLogin} onNavigate={handleNavigate} />;
      case 'contact':
        return <Contact onNavigate={handleNavigate} />;
      default:
        return <NotFound onNavigate={handleNavigate} />;
    }
  };

  // Helper to determine active nav link
  const isActive = (page) => {
    if (page === 'home' && (currentPage === 'home' || currentPage === 'index')) return true;
    return currentPage === page;
  };

  return (
    <div className="app">
      <header className="app-header">
        <nav className="nav-menu">
          <button className="nav-logo" onClick={() => handleNavigate('home')}>
            NutriPlan
          </button>
          <button 
            onClick={() => handleNavigate('home')}
            className={`nav-link${isActive('home') ? ' active' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => handleNavigate('recipes')}
            className={`nav-link${isActive('recipes') ? ' active' : ''}`}
          >
            Recipes
          </button>
          <button 
            onClick={() => handleNavigate('meal-planner')}
            className={`nav-link${isActive('meal-planner') ? ' active' : ''}`}
          >
            Meal Planner
          </button>
          <button 
            onClick={() => handleNavigate('contact')}
            className={`nav-link${isActive('contact') ? ' active' : ''}`}
          >
            Contact
          </button>
          {user ? (
            <>
              <button 
                onClick={() => handleNavigate('profile')}
                className={`nav-link${isActive('profile') ? ' active' : ''}`}
              >
                Profile
              </button>
              <button 
                onClick={handleLogout}
                className="nav-link"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => handleNavigate('login')}
                className="nav-login"
              >
                Login
              </button>
              <button 
                onClick={() => handleNavigate('signup')}
                className="nav-signup"
              >
                Sign Up
              </button>
            </>
          )}
        </nav>
      </header>

      <main className="app-main">
        {renderPage()}
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Calorie Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
