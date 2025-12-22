import { useMemo } from 'react';
import TaskItem from '../components/TaskItem.jsx';
import { useTasks } from '../state/TasksContext.jsx';
import { isOverdue, isToday } from '../utils/date.js';

export default function Today() {
  const { tasks, toggleDone } = useTasks();

  const { todayTasks, overdueTasks, doneCount, openCount } = useMemo(() => {
    const list = Array.isArray(tasks) ? tasks : [];
    const todayList = list.filter((x) => isToday(x.due));
    const overdueList = list.filter((x) => !x.done && isOverdue(x.due));

    const done = todayList.filter((x) => x.done).length;
    const open = Math.max(0, todayList.length - done);

    return { todayTasks: todayList, overdueTasks: overdueList, doneCount: done, openCount: open };
  }, [tasks]);

  return (
    <section className="screen">
      <div className="screen-head">
        <div>
          <div className="h1">Today</div>
          <div className="muted">
            {openCount} open · {doneCount} done
          </div>
        </div>

        <div className="chips" aria-label="Today summary">
          <span className="chip active">Open {openCount}</span>
          <span className="chip">Done {doneCount}</span>
        </div>
      </div>

      {overdueTasks.length > 0 && (
        <div className="panel">
          <div className="row">
            <div>
              <div className="strong">Overdue</div>
              <div className="muted">Resolve these first</div>
            </div>
            <div className="mobile-chip">{overdueTasks.length}</div>
          </div>

          <div className="list">
            {overdueTasks.slice(0, 3).map((task) => (
              <TaskItem key={task.id} task={task} onToggle={toggleDone} />
            ))}
          </div>
        </div>
      )}

      <div className="panel">
        <div className="row">
          <div>
            <div className="strong">Today&apos;s tasks</div>
            <div className="muted">Due today</div>
          </div>
          <div className="mobile-chip">{todayTasks.length}</div>
        </div>

        {todayTasks.length === 0 ? (
          <div className="empty">
            <div className="strong">No tasks for today</div>
            <div className="muted">Add tasks in the Tasks tab.</div>
          </div>
        ) : (
          <div className="list">
            {todayTasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={toggleDone} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
