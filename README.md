# FlowTasks Mobile (Demo)

FlowTasks Mobile is a premium-looking mobile task manager demo built with React (Vite).
It mimics a real mobile UX (bottom tabs, phone frame, task lists, filters, modal sheets),
and demonstrates clean modular architecture, state management, and persistence.

## Features

- Mobile-like UI (phone frame, bottom tabs, modal sheet)
- Tasks with:
  - tags
  - priorities (High/Medium/Low)
  - due dates
  - done/undone state
- Search & filter
- Deep links via URL query params:
  - `/tasks?tag=Work`
  - `/tasks?q=react`
- Offline persistence (localStorage)
- Clean, extensible architecture (reducer + context + storage layer)

## Tech Stack

- React + Vite
- React Router (routing + query params)
- Context + Reducer (state management)
- localStorage (offline persistence)
- CSS (custom premium/glossy UI)

## Architecture

- `src/state/`
  - `TasksContext.jsx` — global store (Context + Reducer)
  - `storage.js` — persistence layer (load/save)
- `src/data/`
  - `mock.js` — initial seed data
- `src/components/`
  - UI building blocks (Modal, TaskItem, AddTaskModal, etc.)
- `src/pages/`
  - screens (Today, Tasks, Calendar, Settings)

## Roadmap

- [ ] Edit task flow
- [ ] Delete task / bulk actions
- [ ] Subtasks + notes
- [ ] Reminders (push-like UX demo)
- [ ] API sync layer (fake latency + optimistic updates)
- [ ] Theme switch (dark/light inside demo)
