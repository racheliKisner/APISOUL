import React, { useState } from 'react';
import '../styles/Register.css'; 

export default function Register() {
  const [form, setForm] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // טיפול בשליחת הטופס
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      
      const checkResponse = await fetch(`${process.env.REACT_APP_BASE_URL || 'http://localhost:8000'}/api/users/users/check?name=${form.name}&phone=${form.phone}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const checkData = await checkResponse.json();
      console.log('Response from API:', checkData);
      if (checkData) {
        throw new Error('שם המשתמש או הטלפון כבר קיים. אנא בחר שם אחר או טלפון אחר.');
      }
  
      // המשך לרישום אם המשתמש לא קיים
      const response = await fetch(`${process.env.REACT_APP_BASE_URL || 'http://localhost:8000'}/api/users/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error creating user:', errorData); // הוספת לוג נוסף
        throw new Error(errorData.detail || 'שגיאה ברישום');
    }
    
  
      const data = await response.json();
      
      // בדוק אם המשתמש כבר קיים ב-Local Storage
      const existingUserId = localStorage.getItem('user_id');
      if (existingUserId !== data.id.toString()) {
        // שמירת הפרטים ב-Local Storage
        localStorage.setItem('username', data.name); // שמירת שם המשתמש
        localStorage.setItem('user_id', data.id); // שמירת ה-user_id
      } else {
        console.log("המשתמש כבר קיים ב-Local Storage.");
      }

      alert(`User created: ${data.name}`);
      
      // הפנה לדף השיעור
      window.location.href = '/lessons';
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Phone:
          <input name="phone" value={form.phone} onChange={handleChange} required />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
