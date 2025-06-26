import React from 'react';
import '../styles/CategorySelector.css'; 

export default function CategorySelector({
  categories,
  subCategories,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory
}) {
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory('');
  };

  return (
    <div className="main-content">
  
    <div className="form-sidebar">
      <h3 className="sidebar-title">סינון לפי קטגוריה</h3>

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
    </div>
  </div>
  );
}
