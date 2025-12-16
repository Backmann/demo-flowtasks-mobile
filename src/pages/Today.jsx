import { useMemo, useState } from 'react';
import { tags } from '../data/mock.js';
import { isToday } from '../utils/date.js';
import TaskItem from '../components/TaskItem.jsx';
import Modal from '../components/Modal.jsx';
import AddTaskModal from '../components/AddTaskModal.jsx';
import { useTasks } from '../state/tasksContext.js';

export default function Today() {
  const { state, toggleDone, addTask } = useTasks();

  const [activeTag, setActiveTag] = useState('All');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);

  const today = useMemo(() => state.tasks.filter((t) => isToday(t.due)), [state.tasks]);

  const filtered = useMemo(() => {
    if (activeTag === 'All') return today;
    return today.filter((t) => t.tag === activeTag);
  }, [today, activeTag]);

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
        <button className="btn-primary" onClick={() => setOpenAdd(true)}>
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
          filtered.map((t) => (
            <TaskItem key={t.id} task={t} onToggle={toggleDone} onOpen={openTask} />
          ))
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
          </div>
        )}
      </Modal>

      <AddTaskModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onCreate={addTask}
        initialTag={activeTag !== 'All' ? activeTag : undefined}
      />
    </section>
  );
}
