import { useState } from 'react';
import './Auth.css';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    
    const userData = {
      id: 1,
      name: email.split('@')[0],
      email,
      preferences: {
        dailyCalories: 2000,
        diet: 'balanced',
      }
    };
    
    handleLogin(userData);
  };
  
  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Login to NutriPlan</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </div>
        
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        
        <button type="submit" className="btn btn-primary btn-full">
          Login
        </button>
        
        <p className="form-footer">
          Don't have an account? 
          <button 
            type="button" 
            onClick={() => window.location.href = '/signup'} 
            className="form-link"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
 