import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState([]);

  const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${baseURL}/api/categories/categories/`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setCategories(data);
      } else if (data && Array.isArray(data.categories)) {
        setCategories(data.categories);
      } else {
        console.error('Unexpected categories data:', data);
        setCategories([]);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories(); // קרא לפונקציה fetchCategories
    fetch(`${baseURL}/api/prompts/user/${username}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setHistory(data);
        } else {
          console.error('Unexpected history data:', data);
          setHistory([]);
        }
      })
      .catch(err => {
        console.error('Failed to fetch history:', err);
        setHistory([]);
      });
  }, [username]);

  useEffect(() => {
    if (!selectedCategory) {
      setSubCategories([]);
      setSelectedSubCategory('');
      return;
    }
    fetch(`${baseURL}/api/sub_categories/sub_categories/category/${selectedCategory}`)
      .then(res => res.json())
      .then(data => {
        console.log('Subcategories from API:', data);
        if (Array.isArray(data)) {
          setSubCategories(data);
        } else if (data && Array.isArray(data.subCategories)) {
          setSubCategories(data.subCategories);
        } else {
          console.error('Unexpected subcategories data:', data);
          setSubCategories([]);
        }
      })
      .catch(err => {
        console.error('Failed to fetch subcategories:', err);
        setSubCategories([]);
      });
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse('טוען...');
    try {
      const res = await fetch(`${baseURL}/api/prompts/prompts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 1,
          category_id: selectedCategory,
          sub_category_id: selectedSubCategory,
          prompt: prompt,
        }),
      });
      const data = await res.json();
      setResponse(data.response || 'לא התקבלה תגובה');
      setHistory(prev => [{ prompt, response: data.response }, ...prev]); // שומר את הפרומפט ואת התגובה
    } catch (err) {
      console.error('Error submitting prompt:', err);
      setResponse('שגיאה בשליחת הפרומפט');
    }
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Hi {username} 👋</h1>
        <p> AI -בחר נושא ללמוד ושלח פרומפט  ל </p>
      </div>

      <form onSubmit={handleSubmit}>
        <label>קטגוריה:</label>
        <select value={selectedCategory} onChange={handleCategoryChange} required>
          <option value="">בחר</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <label>תת־קטגוריה:</label>
        <select value={selectedSubCategory} onChange={e => setSelectedSubCategory(e.target.value)} required>
          <option value="">בחר</option>
          {subCategories.map(sub => (
            <option key={sub.id} value={sub.id}>{sub.name}</option>
          ))}
        </select>

        <label>פרומפט:</label>
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows="3" required />

        <button className="btn-register" type="submit">שלח פרומפט</button>
      </form>

      <div className="feature" style={{ marginTop: '24px' }}>
        <h2>תגובה מה-AI:</h2>
        <p>{response}</p>
      </div>

      <div className="features" style={{ marginTop: '40px' }}>
        {history.map((item, idx) => (
          <div className="feature" key={idx}>
            <h2>{item.prompt}</h2>
            <p>{item.response}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
