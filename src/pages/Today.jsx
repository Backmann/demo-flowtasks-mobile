import { useMemo, useState } from 'react';
import { tasks as seed, tags } from '../data/mock.js';
import { isToday } from '../utils/date.js';
import TaskItem from '../components/TaskItem.jsx';
import Modal from '../components/Modal.jsx';

export default function Today() {
  const [items, setItems] = useState(seed);
  const [activeTag, setActiveTag] = useState('All');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const today = useMemo(() => items.filter((t) => isToday(t.due)), [items]);
  const filtered = useMemo(() => {
    const base = today;
    if (activeTag === 'All') return base;
    return base.filter((t) => t.tag === activeTag);
  }, [today, activeTag]);

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
          <div className="h1">Today</div>
          <div className="muted">Focus on what matters</div>
        </div>
        <button className="btn-primary" onClick={() => alert('Demo: Add flow can be added later')}>
          + Add
        </button>
      </div>

      <div className="chips">
        <button
          className={'chip' + (activeTag === 'All' ? ' active' : '')}
          onClick={() => setActiveTag('All')}
        >
          All
        </button>
        {tags.map((t) => (
          <button
            key={t}
            className={'chip' + (activeTag === t ? ' active' : '')}
            onClick={() => setActiveTag(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="list">
        {filtered.length === 0 ? (
          <div className="empty">No tasks for today.</div>
        ) : (
          filtered.map((t) => <TaskItem key={t.id} task={t} onToggle={toggle} onOpen={openTask} />)
        )}
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
            <div className="divider" />
            <div className="muted">
              Demo note: In a real mobile app, this screen includes subtasks, reminders, and sync.
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
