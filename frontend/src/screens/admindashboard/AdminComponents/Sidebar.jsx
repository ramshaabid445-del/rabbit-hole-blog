import React from 'react';

const navSections = [
  {
    title: 'Main',
    items: [
      { key: 'overview', label: 'Dashboard', icon: '📊' },
    ],
  },
  {
    title: 'Content',
    items: [
      { key: 'blogs', label: 'Blog Posts', icon: '📝' },
      { key: 'categories', label: 'Categories', icon: '📂' },
      { key: 'comments', label: 'Comments', icon: '💬' },
      { key: 'sections', label: 'Home Sections', icon: '🏠' },
    ],
  },
  {
    title: 'Account',
    items: [
      { key: 'profile', label: 'Profile Settings', icon: '👤' },
    ],
  },
];

const Sidebar = ({ activeSection, onNavigate, onLogout, isOpen, onClose, admin }) => {
  const adminName = admin?.name || admin?.email?.split('@')[0] || 'Admin';
  const initials = adminName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <span className="admin-sidebar-logo">✦ The Rabbit Hole</span>
          <button className="admin-sidebar-close" onClick={onClose}>✕</button>
        </div>

        <div className="admin-sidebar-profile">
          <div className="admin-profile-avatar">{initials}</div>
          <div className="admin-profile-info">
            <div className="admin-profile-name">{adminName}</div>
            <div className="admin-profile-role">Administrator</div>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          {navSections.map((section) => (
            <div key={section.title} className="admin-nav-section">
              <div className="admin-nav-section-title">{section.title}</div>
              {section.items.map((item) => (
                <button
                  key={item.key}
                  className={`admin-nav-item ${activeSection === item.key ? 'active' : ''}`}
                  onClick={() => { onNavigate(item.key); onClose(); }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-logout-btn" onClick={onLogout}>
            <span className="nav-icon">🚪</span> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;