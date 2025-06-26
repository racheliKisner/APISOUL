import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css'; 

export default function Login() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
  
    try {
      const response = await fetch(
        `${baseURL}/api/users/users/`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
  
      const data = await response.json();
      console.log("נתוני התגובה:", data); 
  
      if (!response.ok) {
        console.log("לא הצליח!!!");
        throw new Error(data.detail || 'Login failed');
      }
  
      const user = data.find(user => user.phone === phone); 
      if (user) {
        localStorage.setItem('username', user.name); 
        localStorage.setItem('user_id', user.id);
        localStorage.setItem('is_admin', user.is_admin);
        navigate('/dashboard');
      } else {
        setError("לא נמצא משתמש עם המספר טלפון שהוזן");
      }
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="register-container"> {/* שינוי לשימוש במחלקה register-container */}
      <h3>התחברות עם מספר טלפון</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="phone">מספר טלפון:</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          disabled={loading}
        />
        {error && <p>{error}</p>} {/* שינוי להציג את השגיאה באותו סגנון */}
        <button type="submit" disabled={loading}>
          {loading ? 'טוען...' : 'התחבר'}
        </button>
      </form>
    </div>
  );
}
