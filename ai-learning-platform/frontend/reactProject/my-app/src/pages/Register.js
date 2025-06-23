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
      const response = await fetch(`${process.env.REACT_APP_BASE_URL || 'http://localhost:8000'}/api/users/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        
      });
      

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error registering');
      }

      const data = await response.json();
      alert(`User created: ${data.name}`);

      // כאן אפשר להחליט להוביל לדף התחברות או לנקות טופס וכו'
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