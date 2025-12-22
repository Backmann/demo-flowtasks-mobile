// src/state/TasksContext.jsx
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { loadState, saveState } from './storage.js';
import { initialTasks } from '../data/mock.js';

const TasksContext = createContext(null);
const STORAGE_KEY = 'flowtasks_state_v1';

function normalizeLoadedState(loaded) {
  if (loaded && Array.isArray(loaded.tasks)) return loaded;
  return { tasks: Array.isArray(initialTasks) ? initialTasks : [] };
}

function ensureTask(task) {
  const base = task && typeof task === 'object' ? task : {};
  const id =
    base.id ||
    (typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID()) ||
    `t_${Date.now()}_${Math.random().toString(16).slice(2)}`;

  // Defaults that keep the UI + logic stable across pages/components
  const due = base.due || new Date().toISOString();
  const title = typeof base.title === 'string' ? base.title : '';
  const tag = base.tag || 'Work';
  const priority = base.priority || 'Medium';
  const done = Boolean(base.done);

  return { ...base, id, title, tag, priority, due, done };
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK': {
      const task = ensureTask(action.task);
      if (!task.title.trim()) return state;
      return { ...state, tasks: [task, ...state.tasks] };
    }

    case 'TOGGLE_DONE': {
      const id = action.id;
      return {
        ...state,
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
      };
    }

    default:
      return state;
  }
}

export function TasksProvider({ children }) {
  const loaded = loadState(STORAGE_KEY);
  const [state, dispatch] = useReducer(reducer, normalizeLoadedState(loaded));

  useEffect(() => {
    saveState(STORAGE_KEY, state);
  }, [state]);

  const api = useMemo(
    () => ({
      state,
      tasks: state.tasks, // convenience for consumers
      addTask: (task) => dispatch({ type: 'ADD_TASK', task }),
      toggleDone: (id) => dispatch({ type: 'TOGGLE_DONE', id }),
    }),
    [state]
  );

  return <TasksContext.Provider value={api}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasks must be used inside <TasksProvider>');
  return ctx;
}
