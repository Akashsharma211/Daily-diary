const KEY = "ai-life-organizer-v3";



function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

function write(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}



export function getDay(date) {
  const all = read();
  return all[date] || null;
}

export function saveDay(date, patch) {
  const all = read();

  all[date] = {
    ...(all[date] || {}),
    ...patch,
  };

  write(all);
}

export function saveTodos(date, todos) {
  saveDay(date, { todos });
}

export function saveDiary(date, diary) {
  saveDay(date, { diary });
}

export function saveAI(date, ai) {
  saveDay(date, { ai });
}
