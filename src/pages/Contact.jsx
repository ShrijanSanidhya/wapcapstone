import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };
  
  return (
    <div className="contact-page">
      <div className="page-header">
        <h1 className="page-title">Contact Us</h1>
        <p className="page-subtitle">
          Have questions, feedback, or suggestions? We'd love to hear from you!
        </p>
      </div>
      
      <div className="contact-content">
        {submitted ? (
          <div className="thank-you-message">
            <div className="check-icon">✅</div>
            <h2>Thank You!</h2>
            <p>
              Your message has been sent successfully. We'll get back to you soon.
            </p>
            <button 
              onClick={() => setSubmitted(false)} 
              className="btn btn-primary"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-control">
              <label htmlFor="name">Your Name</label>
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
              <label htmlFor="email">Your Email</label>
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
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
              ></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary btn-full">
              Send Message
            </button>
          </form>
        )}
        
        <div className="contact-info">
          <h2 className="section-title">Other Ways to Reach Us</h2>
          
          <div className="contact-method">
            <div className="contact-icon">📧</div>
            <div>
              <h3>Email</h3>
              <p>shrijan.sanidhya2024@nst.rishihood.edu.in</p>
            </div>
          </div>
          
          <div className="contact-method">
            <div className="contact-icon">📱</div>
            <div>
              <h3>Phone</h3>
              <p>+91 9175919606</p>
            </div>
          </div>
          
          <div className="contact-method">
            <div className="contact-icon">📍</div>
            <div>
              <h3>Address</h3>
              <p>123 Nutrition Street, Healthy City, HC 12345</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
