import { useMemo, useState } from 'react';
import { tasks as seed } from '../data/mock.js';
import TaskItem from '../components/TaskItem.jsx';
import Modal from '../components/Modal.jsx';

export default function Tasks() {
  const [items, setItems] = useState(seed);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (t) => t.title.toLowerCase().includes(q) || t.tag.toLowerCase().includes(q)
    );
  }, [items, query]);

  const toggle = (id) =>
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const openTask = (task) => {
    setActive(task);
    setOpen(true);
  };

  return (
    <section className="screen">
      <div className="screen-head">
        <div>
          <div className="h1">Tasks</div>
          <div className="muted">Search & manage</div>
        </div>
      </div>

      <input
        className="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tasks..."
      />

      <div className="list">
        {filtered.map((t) => (
          <TaskItem key={t.id} task={t} onToggle={toggle} onOpen={openTask} />
        ))}
      </div>

      <Modal open={open} title={active?.title ?? 'Task'} onClose={() => setOpen(false)}>
        {active && (
          <div className="stack">
            <div className="row">
              <span className="muted">Tag</span>
              <span className="strong">{active.tag}</span>
            </div>
            <div className="row">
              <span className="muted">Priority</span>
              <span className={'prio ' + active.priority.toLowerCase()}>{active.priority}</span>
            </div>
            <div className="row">
              <span className="muted">Status</span>
              <span className="strong">{active.done ? 'Done' : 'Open'}</span>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
