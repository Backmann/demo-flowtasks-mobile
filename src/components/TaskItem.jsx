import TagPill from './TagPill.jsx';
import { formatShort, isToday, isOverdue } from '../utils/date.js';

export default function TaskItem({ task, onToggle, onOpen }) {
  const due = formatShort(task.due);
  const dueClass = isOverdue(task.due) ? 'due overdue' : isToday(task.due) ? 'due today' : 'due';

  return (
    <article className={'task' + (task.done ? ' done' : '')} onClick={() => onOpen?.(task)}>
      <button
        className={'check' + (task.done ? ' checked' : '')}
        onClick={(e) => {
          e.stopPropagation();
          onToggle?.(task.id);
        }}
        aria-label="Toggle done"
      />
      <div className="task-main">
        <div className="task-title">{task.title}</div>
        <div className="task-meta">
          <TagPill label={task.tag} />
          <span className={dueClass}>Due {due}</span>
          <span className={'prio ' + task.priority.toLowerCase()}>{task.priority}</span>
        </div>
      </div>
    </article>
  );
}
