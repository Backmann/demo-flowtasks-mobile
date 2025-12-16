import { NavLink } from 'react-router-dom';

export default function BottomTabs() {
  return (
    <nav className="tabs">
      <NavLink to="/" end className={({ isActive }) => 'tab' + (isActive ? ' active' : '')}>
        <span className="tab-ico">●</span>
        <span className="tab-txt">Today</span>
      </NavLink>

      <NavLink to="/tasks" className={({ isActive }) => 'tab' + (isActive ? ' active' : '')}>
        <span className="tab-ico">≡</span>
        <span className="tab-txt">Tasks</span>
      </NavLink>

      <NavLink to="/calendar" className={({ isActive }) => 'tab' + (isActive ? ' active' : '')}>
        <span className="tab-ico">▦</span>
        <span className="tab-txt">Calendar</span>
      </NavLink>

      <NavLink to="/settings" className={({ isActive }) => 'tab' + (isActive ? ' active' : '')}>
        <span className="tab-ico">⚙</span>
        <span className="tab-txt">Settings</span>
      </NavLink>
    </nav>
  );
}
