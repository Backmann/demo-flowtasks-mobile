import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TaskItem from '../components/TaskItem.jsx';
import Modal from '../components/Modal.jsx';
import AddTaskModal from '../components/AddTaskModal.jsx';
import { tags } from '../data/mock.js';
import { useTasks } from '../state/tasksContext.js';

export default function Tasks() {
  const { state, toggleDone, addTask } = useTasks();

  const [searchParams, setSearchParams] = useSearchParams();

  // deep link params
  const tagParam = searchParams.get('tag') || 'All';
  const qParam = searchParams.get('q') || '';

  const [query, setQuery] = useState(qParam);
  const [openTask, setOpenTask] = useState(false);
  const [active, setActive] = useState(null);

  const [openAdd, setOpenAdd] = useState(false);

  // keep local input in sync with URL (if user opens a deep link)
  useEffect(() => {
    setQuery(qParam);
  }, [qParam]);

  const filtered = useMemo(() => {
    let list = state.tasks;

    if (tagParam !== 'All') {
      list = list.filter((t) => t.tag === tagParam);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (t) => t.title.toLowerCase().includes(q) || t.tag.toLowerCase().includes(q)
      );
    }

    return list;
  }, [state.tasks, tagParam, query]);

  const applyTag = (tag) => {
    const next = new URLSearchParams(searchParams);
    if (tag === 'All') next.delete('tag');
    else next.set('tag', tag);
    setSearchParams(next);
  };

  const applyQuery = (val) => {
    setQuery(val);
    const next = new URLSearchParams(searchParams);
    const trimmed = val.trim();
    if (!trimmed) next.delete('q');
    else next.set('q', trimmed);
    setSearchParams(next);
  };

  const openDetails = (task) => {
    setActive(task);
    setOpenTask(true);
  };

  return (
    <section className="screen">
      <div className="screen-head">
        <div>
          <div className="h1">Tasks</div>
          <div className="muted">Deep links: /tasks?tag=Work&amp;q=react</div>
        </div>

        <button className="btn-primary" onClick={() => setOpenAdd(true)}>
          + Add
        </button>
      </div>

      <input
        className="search"
        value={query}
        onChange={(e) => applyQuery(e.target.value)}
        placeholder="Search tasks..."
      />

      <div className="chips">
        <button
          className={'chip' + (tagParam === 'All' ? ' active' : '')}
          onClick={() => applyTag('All')}
        >
          All
        </button>
        {tags.map((t) => (
          <button
            key={t}
            className={'chip' + (tagParam === t ? ' active' : '')}
            onClick={() => applyTag(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="list">
        {filtered.map((t) => (
          <TaskItem key={t.id} task={t} onToggle={toggleDone} onOpen={openDetails} />
        ))}
      </div>

      <Modal open={openTask} title={active?.title ?? 'Task'} onClose={() => setOpenTask(false)}>
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

      <AddTaskModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onCreate={addTask}
        initialTag={tagParam !== 'All' ? tagParam : undefined}
      />
    </section>
  );
}
