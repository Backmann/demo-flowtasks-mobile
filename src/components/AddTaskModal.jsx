import Modal from './Modal.jsx';
import { tags } from '../data/mock.js';

function todayAt(hour = 9) {
  const d = new Date();
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

export default function AddTaskModal({
  open,
  onClose,
  onCreate,
  title,
  setTitle,
  tag,
  setTag,
  error,
  setError,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) {
      setError('Название задачи не может быть пустым.');
      return;
    }

    onCreate?.({
      title: trimmed,
      tag,
      priority: 'Medium',
      due: todayAt(18),
      done: false,
    });

    onClose?.();
  };

  return (
    <Modal open={open} onClose={onClose} title="Новая задача">
      <form onSubmit={handleSubmit} className="stack">
        <div>
          <label htmlFor="task-title" className="muted">
            Название
          </label>
          <input
            id="task-title"
            className="input"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            placeholder="Например, Купить продукты"
            autoFocus
          />
          {error && <p className="error">{error}</p>}
        </div>

        <div>
          <label htmlFor="task-tag" className="muted">
            Тег
          </label>
          <select id="task-tag" className="input" value={tag} onChange={(e) => setTag(e.target.value)}>
            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="row justify-end">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Отмена
          </button>
          <button type="submit" className="btn-primary">
            Создать задачу
          </button>
        </div>
      </form>
    </Modal>
  );
}
