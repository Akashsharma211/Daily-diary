export default function DiaryEditor({
  value,
  onChange,
  onSubmit,
}) {
  return (
    <div className="card">
      <h2>Write Your Day Here📝</h2>

      <textarea
        rows="10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <button onClick={onSubmit}>Analyze My Day 🤖</button>
    </div>
  );
}
