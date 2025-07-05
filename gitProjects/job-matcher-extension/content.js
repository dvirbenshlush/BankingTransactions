chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'runMatch') {
      initMatchMeter();
    }
  });
  async function initMatchMeter() {
    // שלוף את הטקסט של המשרה מהדף
    // const jobDesc = extractJobDescription();
    const jobDesc = "דרוש מנהל מוצר עם ניסיון בניהול תהליכי פיתוח בתחום ה-AI, הבנה בטכנולוגיות NLP, ויכולת להוביל צוותים טכנולוגיים."

    // if (!jobDesc) return;
  
    // שלוף את קו״ח והעדפות מה-storage
    chrome.storage.local.get(['resume', 'preferences'], async ({ resume, preferences }) => {
        
        if (!resume || !preferences) 
        {
            alert('❌ לא נמצאו קו"ח או העדפות. יש לוודא שהנתונים נשמרו בהצלחה קודם לכן.');
            return;
        }
  
      // שלח בקשה לשרת
      try {
        const response = await fetch('http://localhost:3000/match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resume, preferences, jobDesc })
        });
  
        const result = await response.json();
        showMatchScore(result.score, result.explanation);
      } catch (err) {
        console.error('❌ שגיאה בשליחת בקשה לשרת:', err);
        alert('❌ שגיאה בשליחת בקשה לשרת:', err);
      }
    });
  }
  
  function extractJobDescription() {
    // דוגמה ללינקדאין – אתה יכול לשנות לפי האתר
    const el = document.querySelector('.jobs-description-content__text');
    return el ? el.innerText.trim() : null;
  }
  
  function showMatchScore(score, explanation) {
    const meter = document.createElement('div');
    meter.style.position = 'fixed';
    meter.style.top = '20px';
    meter.style.right = '20px';
    meter.style.zIndex = '9999';
    meter.style.background = 'white';
    meter.style.border = '2px solid #00a884';
    meter.style.padding = '10px';
    meter.style.borderRadius = '10px';
    meter.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
    meter.innerText = `✅ ציון התאמה: ${score}%`;
  
    meter.onclick = () => alert(`הסבר:\n${explanation}`);
    document.body.appendChild(meter);
  }
  