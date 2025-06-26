import React from 'react';

export default function PromptForm({ prompt, setPrompt, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <label>פרומפט:</label>
      <textarea
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        rows="3"
        required
      />
      <button className="btn-register" type="submit">שלח פרומפט</button>
    </form>
  );
}
