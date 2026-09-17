import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Dumbbell,
  Trophy,
  BarChart3,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      {/* LOGO */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Trophy size={22} />
        </div>

        <div>
          <h2>Academy Manager</h2>
          <span>Football Management</span>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="sidebar-nav">
        <p className="nav-title">MAIN MENU</p>

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/players"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <Users size={20} />
          <span>Players</span>
        </NavLink>

        <NavLink
          to="/attendance"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <ClipboardCheck size={20} />
          <span>Attendance</span>
        </NavLink>

        <NavLink
          to="/training"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <Dumbbell size={20} />
          <span>Training</span>
        </NavLink>

        <NavLink
          to="/matches"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <Trophy size={20} />
          <span>Matches</span>
        </NavLink>

        <NavLink
          to="/statistics"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <BarChart3 size={20} />
          <span>Statistics</span>
        </NavLink>

        <p className="nav-title settings-title">SYSTEM</p>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>

      {/* SIDEBAR FOOTER */}
      <div className="sidebar-footer">
        <div className="academy-status">
          <div className="status-dot"></div>

          <div>
            <strong>Academy Online</strong>
            <span>System operational</span>
          </div>
        </div>

        <div className="sidebar-version">
          Football Academy Manager v1.0
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;