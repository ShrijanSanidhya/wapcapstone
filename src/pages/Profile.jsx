import { useState } from 'react';
import './Profile.css';

const Profile = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    dailyCalories: user.preferences?.dailyCalories || 2000,
    diet: user.preferences?.diet || 'balanced',
  });
  const [success, setSuccess] = useState(false);
  
  const dietOptions = [
    { value: 'balanced', label: 'Balanced' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten-free', label: 'Gluten Free' },
    { value: 'keto', label: 'Keto' },
    { value: 'paleo', label: 'Paleo' },
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      preferences: {
        dailyCalories: parseInt(formData.dailyCalories),
        diet: formData.diet,
      }
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setSuccess(true);
    
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  
 
  const stats = [
    { label: 'Calories Tracked', value: '12,450' },
    { label: 'Meals Logged', value: '32' },
    { label: 'Days Active', value: '14' },
    { label: 'Recipes Saved', value: '8' }
  ];
  
  return (
    <div className="profile-page">
      <div className="page-header">
        <h1 className="page-title">Your Profile</h1>
      </div>
      
      <div className="profile-header">
        <div className="profile-avatar">{user.name.charAt(0)}</div>
        <div>
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>
      
      <div className="profile-stats">
        {stats.map(stat => (
          <div key={stat.label} className="stat-card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
      
      <div className="profile-settings">
        <h2 className="section-title">Profile Settings</h2>
        
        {success && (
          <div className="success-message">
            Profile updated successfully!
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-control">
            <label htmlFor="dailyCalories">Daily Calorie Target</label>
            <input
              type="number"
              id="dailyCalories"
              name="dailyCalories"
              value={formData.dailyCalories}
              onChange={handleChange}
              min="1200"
              max="4000"
            />
          </div>
          
          <div className="form-control">
            <label htmlFor="diet">Preferred Diet</label>
            <select
              id="diet"
              name="diet"
              value={formData.diet}
              onChange={handleChange}
            >
              {dietOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <button type="submit" className="btn btn-primary btn-full">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
 