import { Outlet } from 'react-router-dom';
import PhoneFrame from './PhoneFrame.jsx';
import BottomTabs from './BottomTabs.jsx';

export default function AppShell() {
  return (
    <div className="flowtasks-root">
      <PhoneFrame>
        <div className="mobile-app">
          <header className="mobile-topbar">
            <div>
              <div className="mobile-title">FlowTasks</div>
              <div className="mobile-sub">Mobile demo · offline mock</div>
            </div>
            <div className="mobile-chip">v1</div>
          </header>

          <div className="mobile-body">
            <Outlet />
          </div>

          <BottomTabs />
        </div>
      </PhoneFrame>
    </div>
  );
}
