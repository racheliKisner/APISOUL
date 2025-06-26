import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';
  const [users, setUsers] = useState([]);
  const [history, setHistory] = useState({});
  const [openUsers, setOpenUsers] = useState({});
  const [openPrompts, setOpenPrompts] = useState({});
  const [viewedPrompts, setViewedPrompts] = useState({});

 
  useEffect(() => {
    fetch(`${baseURL}/api/users/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, [baseURL]);

  
  useEffect(() => {
    const fetchHistoryForUsers = async () => {
      const historyData = {};
      for (const user of users) {
        try {
          const response = await fetch(`${baseURL}/api/prompts/prompts/user/${user.id}`);
          const data = await response.json();
          historyData[user.id] = data;
        } catch (err) {
          console.error(`Error fetching history for user ${user.id}:`, err);
        }
      }
      setHistory(historyData);
    };

    if (users.length > 0) {
      fetchHistoryForUsers();
    }
  }, [users, baseURL]);

  
  const toggleUser = (userId) => {
    setOpenUsers(prev => {
      const isOpen = !prev[userId];
      if (!isOpen) {
        setOpenPrompts(prevPrompts => {
          const updated = { ...prevPrompts };
          delete updated[userId];
          return updated;
        });
      }
      return { ...prev, [userId]: isOpen };
    });
  };

  
  const togglePrompt = (userId, promptId) => {
    setOpenPrompts(prev => ({
      ...prev,
      [userId]: {
        [promptId]: !(prev[userId]?.[promptId]) 
      }
    }));
  
    setViewedPrompts(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [promptId]: true 
      }
    }));
  };

  return (
    <div>
      <h1 className="dashboard-title">Dashboard מנהל</h1>
      <button onClick={() => navigate('/dashboard')}> ללמידה</button> 
      <h2>כל המשתמשים</h2>
      <ul className="user-list">
        {users.map(user => (
          <li key={user.id} className="user-item" onClick={() => toggleUser(user.id)}>
            {user.name} - {user.phone}
            <span className="arrow">{openUsers[user.id] ? '▼' : '►'}</span>

            {openUsers[user.id] && (
              <div className="prompt-list">
                <h3>היסטוריה עבור משתמש {user.id}</h3>
                <ul>
                  {history[user.id]?.map(item => (
                    <li
                        key={item.id}
                        className={`prompt-item ${viewedPrompts[user.id]?.[item.id] ? 'viewed' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePrompt(user.id, item.id);
                        }}
                      >
                        {item.prompt}
                        <span className="arrow">{openPrompts[user.id]?.[item.id] ? '▼' : '►'}</span>

                        {openPrompts[user.id]?.[item.id] && (
                          <div className="prompt-response">
                            <p>{item.response}</p>
                          </div>
                        )}
                      </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
