import { useMemo, useState } from 'react';
import AddTaskModal from '../components/AddTaskModal.jsx';
import TaskItem from '../components/TaskItem.jsx';
import { useTasks } from '../state/TasksContext.jsx';
import { tags } from '../data/mock.js';

export default function Tasks() {
  const { tasks, addTask, toggleDone } = useTasks();

  const [addOpen, setAddOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('Work');
  const [error, setError] = useState('');

  const [query, setQuery] = useState('');
  const [tagFilter, setTagFilter] = useState('All');

  const openAdd = () => {
    setTitle('');
    setError('');
    setTag('Work');
    setAddOpen(true);
  };

  const closeAdd = () => setAddOpen(false);

  const handleCreate = (task) => {
    addTask(task);
  };

  const visible = useMemo(() => {
    const list = Array.isArray(tasks) ? tasks : [];
    const q = query.trim().toLowerCase();

    return list.filter((t) => {
      const okTag = tagFilter === 'All' ? true : t.tag === tagFilter;
      const okText = !q ? true : String(t.title || '').toLowerCase().includes(q);
      return okTag && okText;
    });
  }, [tasks, query, tagFilter]);

  return (
    <section className="screen">
      <div className="screen-head">
        <div>
          <div className="h1">Tasks</div>
          <div className="muted">Search and filter</div>
        </div>
        <button className="btn-primary" onClick={openAdd}>
          + Add
        </button>
      </div>

      <input
        className="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tasks…"
      />

      <div className="chips" aria-label="Tag filters">
        <button
          type="button"
          className={'chip' + (tagFilter === 'All' ? ' active' : '')}
          onClick={() => setTagFilter('All')}
        >
          All
        </button>
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            className={'chip' + (tagFilter === t ? ' active' : '')}
            onClick={() => setTagFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="empty">
          <div className="strong">No matches</div>
          <div className="muted">Try changing your search or tag filter.</div>
        </div>
      ) : (
        <div className="list">
          {visible.map((t) => (
            <TaskItem key={t.id} task={t} onToggle={toggleDone} />
          ))}
        </div>
      )}

      <AddTaskModal
        open={addOpen}
        onClose={closeAdd}
        onCreate={handleCreate}
        title={title}
        setTitle={setTitle}
        tag={tag}
        setTag={setTag}
        error={error}
        setError={setError}
      />
    </section>
  );
}
