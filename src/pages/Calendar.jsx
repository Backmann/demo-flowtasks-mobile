import { useMemo } from 'react';
import { formatShort } from '../utils/date.js';
import { useTasks } from '../state/TasksContext.jsx';

export default function Calendar() {
  const { state } = useTasks();

  const grouped = useMemo(() => {
    return state.tasks.reduce((acc, t) => {
      const key = formatShort(t.due);
      acc[key] = acc[key] || [];
      acc[key].push(t);
      return acc;
    }, {});
  }, [state.tasks]);

  const keys = Object.keys(grouped);

  return (
    <section className="screen">
      <div className="screen-head">
        <div>
          <div className="h1">Calendar</div>
          <div className="muted">Upcoming deadlines</div>
        </div>
      </div>

      <div className="calendar">
        {keys.map((k) => (
          <div key={k} className="cal-day">
            <div className="cal-date">{k}</div>
            <div className="cal-list">
              {grouped[k].map((t) => (
                <div key={t.id} className="cal-item">
                  <div className="strong">{t.title}</div>
                  <div className="muted">
                    {t.tag} · {t.priority} · {t.done ? 'Done' : 'Open'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
