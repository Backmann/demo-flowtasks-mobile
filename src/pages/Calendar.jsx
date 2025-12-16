import { tasks } from '../data/mock.js';
import { formatShort } from '../utils/date.js';

export default function Calendar() {
  const grouped = tasks.reduce((acc, t) => {
    const key = formatShort(t.due);
    acc[key] = acc[key] || [];
    acc[key].push(t);
    return acc;
  }, {});

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
                    {t.tag} · {t.priority}
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
