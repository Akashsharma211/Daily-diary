import { useEffect, useState,} from "react";

import DiaryEditor from "./components/DiaryEditor";
import AIResponse from "./components/AIResponse";
import CalendarPicker from "./components/CalendarPicker";
import TodoList from "./components/TodoList";
import Clock from "./components/Clock";


import { analyzeDiary } from "./utils/gemini";
import {
  getDay,
  saveDiary,
  saveAI,
  saveTodos, 
} from "./utils/storage";

export default function App() {
  const today = new Date().toISOString().slice(0, 10);

  const [date, setDate] = useState(today);
  const [diary, setDiary] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);


  useEffect(() => {
    setIsDataLoaded(false); // Block auto-save during loading
    const data = getDay(date);

    setDiary(data?.diary || "");
    setAiResult(data?.ai || "");
    setTodos(data?.todos || []);
    
   
    setTimeout(() => setIsDataLoaded(true), 50); 
  }, [date]);

  
  useEffect(() => {
    if (!isDataLoaded || loading) return;

    const delayDebounceFn = setTimeout(() => {
      saveDiary(date, diary);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [diary, date, isDataLoaded, loading]);

  
  const handleUpdateTodos = (newTodos) => {
    setTodos(newTodos);
    if (isDataLoaded) {
      saveTodos(date, newTodos);
    }
  };


  async function analyze() {
    if (!diary.trim()) return;
    setLoading(true);

    try {
      const ai = await analyzeDiary(diary);
      setAiResult(ai);
      saveAI(date, ai);
    } catch (err) {
      console.error(err);
      alert("Ai is not responding. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <header className="card-header">
        <h1>AI Life Organizer</h1>
      </header>

      <Clock />

      <div className="main-grid">
        <CalendarPicker date={date} setDate={setDate} />

        <DiaryEditor
          value={diary}
          onChange={setDiary}
          onSubmit={analyze}
        />

        {loading && (
          <div className="card">
            <p className="animate-pulse font-bold text-accent">
              🤖 AI is reading your day...
            </p>
          </div>
        )}

        <AIResponse result={aiResult} />

        <TodoList
          date={date}
          todos={todos}
          setTodos={handleUpdateTodos} 
        />
      </div>
    </div>
  );
}