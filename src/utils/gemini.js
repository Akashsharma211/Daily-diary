export async function analyzeDiary(text) {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.0-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `
Analyze this diary entry.

Give:
1. Mood
2. Rating out of 10
3. Short summary
4. Motivation for tomorrow

Diary:
${text}
                `,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await res.json();

  return data.candidates[0].content.parts[0].text;
}
