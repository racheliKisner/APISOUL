import React, { useState } from 'react';
import '../styles/Register.css'; 
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; 
    return phoneRegex.test(phone);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    
    if (!isValidPhoneNumber(form.phone)) {
      setError('מספר הטלפון חייב להיות 10 ספרות.');
      setLoading(false);
      return;
    }
  
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
 
      const response = await fetch(`${process.env.REACT_APP_BASE_URL || 'http://localhost:8000'}/api/users/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error creating user:', errorData); 
        throw new Error(errorData.detail || 'שגיאה ברישום');
      }
  
      const data = await response.json();
      
      
      const existingUserId = localStorage.getItem('user_id');
      if (existingUserId !== data.id.toString()) {
        localStorage.setItem('username', data.name); 
        localStorage.setItem('user_id', data.id); 
        localStorage.setItem('is_admin', data.is_admin !== undefined ? data.is_admin : false); 
      } else {
        console.log("המשתמש כבר קיים ב-Local Storage.");
      }

      alert(`User created: ${data.name}`);
      
      
      navigate('/dashboard');
      
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
