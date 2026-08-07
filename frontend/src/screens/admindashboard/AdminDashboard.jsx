import React, { useState } from 'react';
import Sidebar from './AdminComponents/Sidebar';
import AdminLogin from './AdminComponents/AdminLogin';
import DashboardOverview from './AdminComponents/DashboardOverview';
import BlogList from './AdminComponents/BlogList';
import AddEditBlog from './AdminComponents/AddEditBlog';
import CommentsManager from './AdminComponents/CommentsManager';
import HomeSectionsManager from './AdminComponents/HomeSectionsManager';
import CategoryManager from './AdminComponents/CategoryManager';
import ProfileSettings from './AdminComponents/ProfileSettings';
import useInactivityLogout from '../../hooks/useInactivityLogout';
import './AdminDashboard.css';

const AdminDashboard = () => {
  // Auto-logout admin after 3 minutes of inactivity (only when logged in)
  useInactivityLogout();

  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('adminUser');
    const token = localStorage.getItem('adminToken');
    // Only auto-login if BOTH token and admin user exist
    return (saved && token) ? JSON.parse(saved) : null;
  });
  const [activeSection, setActiveSection] = useState('overview');
  const [editingPost, setEditingPost] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If not logged in, show login page
  if (!admin) {
    return <AdminLogin onLoginSuccess={(adminData) => setAdmin(adminData)} />;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setActiveSection('edit-blog');
  };

  const handleBack = () => {
    setEditingPost(null);
    setActiveSection('blogs');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <DashboardOverview />;
      case 'blogs':
        return <BlogList onEdit={handleEdit} />;
      case 'edit-blog':
        return <AddEditBlog post={editingPost} onBack={handleBack} />;
      case 'comments':
        return <CommentsManager />;
      case 'sections':
        return <HomeSectionsManager />;
      case 'categories':
        return <CategoryManager />;
      case 'profile':
        return <ProfileSettings admin={admin} onProfileUpdate={(updatedAdmin) => {
          setAdmin(updatedAdmin);
          localStorage.setItem('adminUser', JSON.stringify(updatedAdmin));
        }} />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar
        activeSection={activeSection === 'edit-blog' ? 'blogs' : activeSection}
        onNavigate={setActiveSection}
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        admin={admin}
      />

      <div className="admin-main">
        <div className="admin-topbar">
          <button className="admin-hamburger" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <span className="admin-topbar-title">✦ Admin</span>
        </div>

        <div className="admin-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;