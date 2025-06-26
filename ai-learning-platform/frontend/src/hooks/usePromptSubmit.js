import { useState } from 'react';

export default function usePromptSubmit(baseURL, categories, subCategories) {
  const [response, setResponse] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 

  const submitPrompt = async ({ userId, selectedCategory, selectedSubCategory, prompt, setHistory }) => {
    console.log('Submitting prompt:', prompt);
    if (isLoading || !prompt.trim()) return; 
    setIsLoading(true); 
    setResponse('');
    setError(null);
    try {
      const categoryName = categories.find(cat => String(cat.id) === selectedCategory)?.name || '';
      const subCategoryName = subCategories.find(sub => String(sub.id) === selectedSubCategory)?.name || '';
      const fullPrompt = `${prompt.trim()} (${categoryName} - ${subCategoryName})`;

      const promptRes = await fetch(`${baseURL}/api/prompts/prompts/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          category_id: selectedCategory,
        sub_category_id: selectedSubCategory,
          prompt: fullPrompt,
          response: "",
        }),
      });

     const promptData = await promptRes.json();

      setResponse(promptData.response || 'לא התקבלה תגובה');
      setHistory(prev => [{ prompt, response: promptData.response }, ...prev]);
    } catch (err) {
      console.error('Error submitting prompt:', err);
      setResponse('שגיאה בשליחת הפרומפט');
      setError(err);
    } finally {
      setIsLoading(false); 
    }
  };

  return { response, error, isLoading, submitPrompt };
}
