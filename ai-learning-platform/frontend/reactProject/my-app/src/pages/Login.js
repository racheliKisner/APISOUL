


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [id, setId] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    // איפוס המידע הקודם ב-Local Storage
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
  
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL || 'http://localhost:8000'}/api/users/users/`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
  
      const data = await response.json();
      console.log("נתוני התגובה:", data); // לוג נתוני התגובה
  
      if (!response.ok) {
        console.log("לא הצליח!!!");
        throw new Error(data.detail || 'Login failed');
      } else {
        console.log("התחברות הצליחה!!!");
      }
  
      
      const user = data.find(user => user.id === parseInt(id)); 
      if (user) {
        localStorage.setItem('username', user.name || 'user'); 
        localStorage.setItem('user_id', user.id); 
        console.log("שם משתמש ושיוך ID נשמרו:", user.name, user.id); 
        navigate('/dashboard');
      } else {
        console.error("לא נמצא משתמש עם ה-ID שהוזן"); 
        setError("לא נמצא משתמש עם ה-ID שהוזן");
      }
      
    } catch (err) {
      console.error("שגיאה:", err); 
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-container">
      <h2>התחברות עם ID</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          disabled={loading}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'טוען...' : 'התחבר'}
        </button>
      </form>
    </div>
  );
}
