import React from 'react';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>ברוכים הבאים לפלטפורמת הלמידה המונעת AI</h1>
        <p>בחרו את הנושאים שברצונכם ללמוד וקבלו שיעורים מותאמים אישית</p>
        <a href="/register" className="btn-register">הירשמו עכשיו</a>
      </header>
      <section className="features">
        <div className="feature">
          <h2>בחירת נושאים</h2>
          <p>בחרו קטגוריות ותתי-קטגוריות ללמוד מהן בצורה נוחה</p>
        </div>
        <div className="feature">
          <h2>שיעורים מותאמים</h2>
          <p>המערכת יוצרת לכם שיעורים אישיים על פי הפרומפטים שלכם</p>
        </div>
        <div className="feature">
          <h2>היסטוריית למידה</h2>
          <p>עקבו אחרי כל השיעורים שקיבלתם לאורך הזמן</p>
        </div>
      </section>
    </div>
  );
}
