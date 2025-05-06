
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, handleLogout }) => {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">NutriPlan</Link>
        
        <div className="navbar-links">
          <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/recipes" className={`navbar-link ${location.pathname === '/recipes' ? 'active' : ''}`}>
            Recipes
          </Link>
          <Link to="/meal-planner" className={`navbar-link ${location.pathname === '/meal-planner' ? 'active' : ''}`}>
            Meal Planner
          </Link>
          <Link to="/contact" className={`navbar-link ${location.pathname === '/contact' ? 'active' : ''}`}>
            Contact
          </Link>
        </div>
        
        <div className="auth-links">
          {user ? (
            <>
              <div className="user-info">
                <div className="user-avatar">{user.name.charAt(0)}</div>
                <Link to="/profile" className="navbar-link">Profile</Link>
              </div>
              <button onClick={handleLogout} className="btn btn-primary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
