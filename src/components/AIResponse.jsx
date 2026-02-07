export default function AIResponse({ result }) {
  if (!result) return null;

  return (
    <div className="card ai ai-card-wrapper">
      <h2>Overview 🌙</h2>
      <pre className="ai-content">{result}</pre>
    </div>
  );
}