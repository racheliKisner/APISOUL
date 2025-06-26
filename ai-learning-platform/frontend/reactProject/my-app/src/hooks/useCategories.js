import { useState, useEffect } from 'react';

export default function useCategories(baseURL) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${baseURL}/api/categories/categories/`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setCategories(data);
        } else if (data && Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          setCategories([]);
          console.error('Unexpected categories data:', data);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setCategories([]);
      }
    }
    fetchCategories();
  }, [baseURL]);

  return categories;
}
