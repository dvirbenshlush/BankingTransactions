import axios from 'axios';

export const generateMatchScore = async (
  resume: string,
  preferences: string,
  jobDesc: string
): Promise<{ score: number; explanation: string }> => {
  const prompt = `
האם המשרה הבאה מתאימה למועמד? תן ציון התאמה בין 0 ל-100 והסבר קצר.

קורות חיים:
${resume}

העדפות:
${preferences}

תיאור משרה:
${jobDesc}
`;

  const payload = {
    model: 'google/gemini-2.0-flash-thinking-exp:free',
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ]
  };

  console.log('📦 Payload:', JSON.stringify(payload, null, 2)); // הדפסה לבדיקה

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      payload,
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'job-matcher-extension'
        }
      }
    );

    const text: string = response.data.choices[0].message.content;
    const match = text.match(/(\d{1,3})/);
    const score = match ? parseInt(match[1]) : 0;

    return { score, explanation: text };
  } catch (err: any) {
    if (err.response) {
      console.error('❌ Axios Error Response:', JSON.stringify(err.response.data, null, 2));
    } else {
      console.error('❌ Axios General Error:', err.message);
    }
    throw err;
  }
};
