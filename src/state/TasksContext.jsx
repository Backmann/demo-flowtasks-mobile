import { useEffect, useMemo, useReducer } from 'react';
import { tasks as seedTasks } from '../data/mock.js';
import { loadState, saveState } from './storage.js';
import { TasksContext } from './tasksContext.js';

const initialState = {
  tasks: seedTasks,
};

function reducer(state, action) {
  switch (action.type) {
    case 'INIT': {
      return action.payload ?? state;
    }
    case 'TOGGLE_DONE': {
      const tasks = state.tasks.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t));
      return { ...state, tasks };
    }
    case 'ADD_TASK': {
      return { ...state, tasks: [action.task, ...state.tasks] };
    }
    default:
      return state;
  }
}

export function TasksProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = loadState();
    if (saved && Array.isArray(saved.tasks)) {
      dispatch({ type: 'INIT', payload: saved });
    }
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const api = useMemo(() => {
    return {
      state,
      toggleDone: (id) => dispatch({ type: 'TOGGLE_DONE', id }),
      addTask: (task) => dispatch({ type: 'ADD_TASK', task }),
    };
  }, [state]);

  return <TasksContext.Provider value={api}>{children}</TasksContext.Provider>;
}

export default TasksProvider;
