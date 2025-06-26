import React, { useState, useEffect } from 'react';
export default function History({ userId, categories }) {
  const [history, setHistory] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';
  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("user_id"));
    if (!userId) return;
    fetch(`${baseURL}/api/prompts/prompts/user/${id}`)
      .then(res => res.json())
      .then(data => setHistory(data))
      .catch(() => setHistory([]));
  }, [userId]);

 
  const categoryMap = Array.isArray(categories)
  ? categories.reduce((acc, cat) => {
      acc[cat.id] = cat.name;
      return acc;
    }, {})
  : {};


  
  const grouped = history.reduce((acc, prompt) => {
    const catId = prompt.category_id || 'unknown';
    if (!acc[catId]) acc[catId] = [];
    acc[catId].push(prompt);
    return acc;
  }, {});

  const toggleCategory = (catId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  return (
    <div>
      <h2>היסטוריית למידה</h2>
      {Object.entries(grouped).map(([catId, prompts]) => (
        <div key={catId} style={{ marginBottom: 16 }}>
          <div
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => toggleCategory(catId)}
          >
            {expandedCategories[catId] ? '▼' : '▶'} {categoryMap[catId] || 'קטגוריה לא ידועה'}
          </div>
          {expandedCategories[catId] && (
            <div style={{ paddingLeft: 16 }}>
              {prompts.map((item) => (
                <div key={item.id} style={{ marginBottom: 12 }}>
                  <div><b>פרומפט:</b> {item.prompt}</div>
                  <div><b>תגובה:</b> {item.response}</div>
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
