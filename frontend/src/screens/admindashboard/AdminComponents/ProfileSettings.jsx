import React, { useState, useEffect } from 'react';
import { getAuthHeaders } from '../adminAuth';

const ProfileSettings = ({ admin, onProfileUpdate }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (admin) {
      setForm((prev) => ({
        ...prev,
        name: admin.name || '',
        email: admin.email || '',
      }));
    }
  }, [admin]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setMessage('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validation
    if (!form.name.trim()) {
      setError('Name is required');
      return;
    }
    if (!form.email.trim()) {
      setError('Email is required');
      return;
    }

    // Password validation
    if (form.newPassword) {
      if (!form.currentPassword) {
        setError('Current password is required to change password');
        return;
      }
      if (form.newPassword !== form.confirmPassword) {
        setError('New passwords do not match');
        return;
      }
      if (form.newPassword.length < 6) {
        setError('New password must be at least 6 characters');
        return;
      }
    }

    setLoading(true);

    try {
      const payload = {
        name: form.name,
        email: form.email,
      };

      if (form.newPassword) {
        payload.currentPassword = form.currentPassword;
        payload.newPassword = form.newPassword;
      }

      const res = await fetch(`http://localhost:5000/api/admin/profile/${admin.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Profile updated successfully!');
        // Clear password fields
        setForm((prev) => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }));
        // Notify parent to update admin state
        if (onProfileUpdate && data.admin) {
          onProfileUpdate(data.admin);
        }
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="admin-page-title">Profile Settings</h2>
      <p className="admin-page-subtitle">Manage your account information and security</p>

      {message && <div className="admin-alert admin-alert-success">{message}</div>}
      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <div className="admin-card">
        <div className="admin-card-header">
          <h4 className="admin-card-title">Account Information</h4>
          <p className="admin-card-subtitle">Update your profile details and password</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Profile Preview */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 28,
            padding: 20,
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(236, 72, 153, 0.08))',
            borderRadius: 14,
            border: '1px solid rgba(168, 85, 247, 0.15)',
          }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 700,
              color: '#fff',
              boxShadow: '0 4px 16px rgba(168, 85, 247, 0.3)',
              flexShrink: 0,
            }}>
              {form.name
                .split(' ')
                .map((w) => w[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#111a2b', marginBottom: 2 }}>
                {form.name || 'Admin User'}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(17, 26, 43, 0.5)' }}>
                {form.email}
              </div>
            </div>
          </div>

          {/* Name & Email */}
          <div className="admin-form-grid-2">
            <div className="admin-form-group">
              <label>Full Name *</label>
              <input
                type="text"
                className="admin-form-control"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="admin-form-group">
              <label>Email Address *</label>
              <input
                type="email"
                className="admin-form-control"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>

          {/* Password Section */}
          <div style={{
            marginTop: 28,
            paddingTop: 24,
            borderTop: '1px solid rgba(17, 26, 43, 0.08)',
          }}>
            <h4 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1rem',
              fontWeight: 700,
              marginBottom: 4,
              color: '#111a2b',
            }}>
              Change Password
            </h4>
            <p style={{
              fontSize: 13,
              color: 'rgba(17, 26, 43, 0.45)',
              marginBottom: 20,
            }}>
              Leave blank to keep your current password
            </p>

            <div className="admin-form-group">
              <label>Current Password</label>
              <input
                type="password"
                className="admin-form-control"
                value={form.currentPassword}
                onChange={(e) => handleChange('currentPassword', e.target.value)}
                placeholder="Enter current password"
                autoComplete="current-password"
              />
            </div>

            <div className="admin-form-grid-2">
              <div className="admin-form-group">
                <label>New Password</label>
                <input
                  type="password"
                  className="admin-form-control"
                  value={form.newPassword}
                  onChange={(e) => handleChange('newPassword', e.target.value)}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                />
              </div>
              <div className="admin-form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  className="admin-form-control"
                  value={form.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;