import { useMemo, useState } from 'react';
import Modal from './Modal.jsx';
import { tags as defaultTags } from '../data/mock.js';

const priorities = ['Low', 'Medium', 'High'];

function isoTodayPlus(days = 0) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(9, 0, 0, 0);
  return d.toISOString().slice(0, 10); // yyyy-mm-dd
}

export default function AddTaskModal({ open, onClose, onCreate, initialTag }) {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState(initialTag || 'Work');
  const [priority, setPriority] = useState('Medium');
  const [due, setDue] = useState(isoTodayPlus(0));
  const [error, setError] = useState('');

  const tags = useMemo(() => defaultTags, []);

  const submit = () => {
    const trimmed = title.trim();
    if (trimmed.length < 3) {
      setError('Title must be at least 3 characters.');
      return;
    }

    const dueIso = new Date(due + 'T09:00:00').toISOString();

    onCreate?.({
      id: 't_' + Math.random().toString(16).slice(2),
      title: trimmed,
      tag,
      priority,
      due: dueIso,
      done: false,
    });

    // reset + close
    setTitle('');
    setTag(initialTag || 'Work');
    setPriority('Medium');
    setDue(isoTodayPlus(0));
    setError('');
    onClose?.();
  };

  return (
    <Modal open={open} title="Add task" onClose={onClose}>
      <div className="form">
        <label className="field">
          <div className="label">Title</div>
          <input
            className="input"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError('');
            }}
            placeholder="e.g. Prepare client report"
            autoFocus
          />
        </label>

        <div className="grid2">
          <label className="field">
            <div className="label">Tag</div>
            <select className="input" value={tag} onChange={(e) => setTag(e.target.value)}>
              {tags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <div className="label">Priority</div>
            <select
              className="input"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              {priorities.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="field">
          <div className="label">Due date</div>
          <input
            className="input"
            type="date"
            value={due}
            onChange={(e) => setDue(e.target.value)}
          />
        </label>

        {error && <div className="error">{error}</div>}

        <div className="actions">
          <button className="btn" onClick={onClose} type="button">
            Cancel
          </button>
          <button className="btn-primary" onClick={submit} type="button">
            Create
          </button>
        </div>
      </div>
    </Modal>
  );
}
