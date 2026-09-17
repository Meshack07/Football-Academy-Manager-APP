import { Bell, Search } from "lucide-react";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, Admin 👋</p>
        </div>
      </div>

      <div className="header-right">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search..." />
        </div>

        <button className="notification-button">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div className="profile">
          <div className="profile-avatar">A</div>

          <div className="profile-info">
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;