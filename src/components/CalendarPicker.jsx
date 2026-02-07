export default function CalendarPicker({ date, setDate }) {
  return (
    <div className="card calendar-card">
      <h2>📅 Select Day</h2>

      <input
        className="calendar-input"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
    </div>
  );
}
