export default function AIResponse({ result }) {
  if (!result) return null;

  return (
    <div className="card ai">
      <h2>AI Reflection 🌙</h2>
      <pre>{result}</pre>
    </div>
  );
}
