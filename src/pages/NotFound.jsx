import React, { useState, useEffect } from 'react';
import './NotFound.css';

const NotFound = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="not-found-page">
      <h1 className="error-code">404</h1>
      <h2 className="error-title">Page Not Found</h2>
      <p className="error-message">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <p className="redirect-message">
        Redirecting to home page in {countdown} seconds...
      </p>
      <button 
        onClick={() => window.location.href = '/'} 
        className="btn btn-primary"
      >
        Return to Home
      </button>
    </div>
  );
};

export default NotFound;
 