import React, { useState } from 'react';

export default function Login() {
  const [id, setId] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    console.log('handleSubmit called with id:', id);  // בדיקה בקונסול
    
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL || 'http://localhost:8000'}/api/users/users/?id=${id}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
    );

      console.log('Response received:', response); // לוג של התגובה

      const data = await response.json();
      console.log('Response data:', data); // לוג של נתוני התגובה

      if (!response.ok) {
        console.error('Login failed:', data.detail); // לוג של שגיאה
        throw new Error(data.detail || 'Login failed');
      }
      localStorage.setItem('username', data.username);
      alert(`התחברת עם id: ${data.id || id}`);
    
    } catch (err) {
      console.error('Error occurred:', err.message); // לוג של השגיאה
      setError(err.message);
    } finally {
      setLoading(false);
      console.log('Loading finished'); // לוג לסיום הטעינה
    }
  };

  return (
    <div className="login-container">
      <h2>התחברות עם ID </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'טוען...' : 'התחבר'}
        </button>
      </form>
    </div>
  );
}
