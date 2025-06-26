
import React, { useEffect, useState } from 'react';
import AdminDashboard from './AdminDashboard';
import CategorySelector from '../components/CategorySelector';
import PromptForm from '../components/PromptForm';
import AIResponse from '../components/AIResponse';
import useCategories from '../hooks/useCategories';
import usePromptSubmit from '../hooks/usePromptSubmit';
import HistoryList from '../components/HistoryList';
import { Link } from 'react-router-dom';
export default function Dashboard() {
  const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

  const username = localStorage.getItem('username') || '';
  const userId = localStorage.getItem('user_id');
  const isAdmin = localStorage.getItem('is_admin') === 'true'; // שמור את זה בלוגין

  const categories = useCategories(baseURL);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [prompt, setPrompt] = useState('');
  const [history, setHistory] = useState([]);
  const { response, error, submitPrompt, isLoading } = usePromptSubmit(baseURL, categories, subCategories);

  useEffect(() => {
    if (!selectedCategory) {
      setSubCategories([]);
      setSelectedSubCategory('');
      return;
    }
    fetch(`${baseURL}/api/sub_categories/sub_categories/category/${selectedCategory}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setSubCategories(data);
        else if (data && Array.isArray(data.subCategories)) setSubCategories(data.subCategories);
        else setSubCategories([]);
      })
      .catch(() => setSubCategories([]));
  }, [selectedCategory, baseURL]);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitPrompt({ userId, selectedCategory, selectedSubCategory, prompt, setHistory });
  };

  if (isAdmin) {
    return <AdminDashboard baseURL={baseURL} />;
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Hi {username} 👋</h1>
        <p>בחר נושא ללמוד ושלח פרומפט ל-AI</p>
        {username === 'admin' && (
          <Link to="/admin">לוח בקרה של מנהל</Link>
        )}
      </div>

      <CategorySelector
        categories={categories}
        subCategories={subCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory}
      />

      <PromptForm prompt={prompt} setPrompt={setPrompt} handleSubmit={handleSubmit} />
      <AIResponse response={response} isLoading={isLoading} />
      <HistoryList userId={userId} categories={categories} />
    </div>
  );
}
