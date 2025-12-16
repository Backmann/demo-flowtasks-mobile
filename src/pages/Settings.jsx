export default function Settings() {
  return (
    <section className="screen">
      <div className="screen-head">
        <div>
          <div className="h1">Settings</div>
          <div className="muted">Demo placeholders</div>
        </div>
      </div>

      <div className="panel">
        <div className="row">
          <div>
            <div className="strong">Sync</div>
            <div className="muted">In real app: API + offline cache</div>
          </div>
          <button className="btn">Coming soon</button>
        </div>

        <div className="divider" />

        <div className="row">
          <div>
            <div className="strong">Notifications</div>
            <div className="muted">In real app: push reminders</div>
          </div>
          <button className="btn">Coming soon</button>
        </div>
      </div>
    </section>
  );
}
