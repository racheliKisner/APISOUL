import { useState } from 'react';

export default function usePromptSubmit(baseURL, categories, subCategories) {
  const [response, setResponse] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 

  const submitPrompt = async ({ userId, selectedCategory, selectedSubCategory, prompt, setHistory }) => {
    setIsLoading(true); 
    setResponse('');
    setError(null);
    try {
      const categoryName = categories.find(cat => String(cat.id) === selectedCategory)?.name || '';
      const subCategoryName = subCategories.find(sub => String(sub.id) === selectedSubCategory)?.name || '';
      const fullPrompt = `${prompt.trim()} (${categoryName} - ${subCategoryName})`;

      const aiRes = await fetch(`${baseURL}/api/ai/ai-response/`, {
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

      if (!aiRes.ok) throw new Error('AI response error');

      const text = await aiRes.text();
      const aiResponse = JSON.parse(text);

      const promptRes = await fetch(`${baseURL}/api/prompts/prompts/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: aiResponse.user_id,
          category_id: aiResponse.category_id,
          sub_category_id: aiResponse.sub_category_id,
          prompt: prompt,
          response: aiResponse.response,
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
      setIsLoading(false); // סיום טעינה
    }
  };

  return { response, error, isLoading, submitPrompt };
}
