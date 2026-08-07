import React, { useState, useEffect } from 'react';
import { getAuthHeaders } from '../adminAuth';

const HomeSectionsManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/home-sections', {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (res.ok) setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleToggle = (id, field) => {
    setPosts(posts.map((p) =>
      p._id === id ? { ...p, [field]: !p[field] } : p
    ));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const updates = posts.map((p) => ({
        _id: p._id,
        isEditorsPick: p.isEditorsPick || false,
        isTrending: p.isTrending || false,
        isFreshPerspective: p.isFreshPerspective || false,
      }));

      const res = await fetch('http://localhost:5000/api/admin/home-sections', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ updates }),
      });

      if (res.ok) {
        setMessage('✅ Home sections updated successfully!');
      } else {
        setMessage('❌ Error saving changes');
      }
    } catch (err) {
      setMessage('❌ Server error');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return <div className="admin-loading">Loading posts...</div>;

  return (
    <div>
      <div className="admin-page-header">
        <div className="admin-page-header-content">
          <h2 className="admin-page-title">Home Sections</h2>
          <p className="admin-page-subtitle">
            Assign published articles to Editor's Pick, Trending Now, and Fresh Perspectives sections
          </p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className={`admin-alert ${message.includes('✅') ? 'admin-alert-success' : 'admin-alert-error'}`}>
          {message}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="admin-empty-state">
          <div className="admin-empty-state-icon">🏠</div>
          No published articles yet. Publish some articles first.
        </div>
      ) : (
        <div className="section-checkbox-list">
          <div className="section-checkbox-header">
            <div className="section-checkbox-header-title">Article</div>
            <div className="section-checkbox-col section-checkbox-col-editors">Editor's Pick</div>
            <div className="section-checkbox-col section-checkbox-col-trending">Trending</div>
            <div className="section-checkbox-col section-checkbox-col-fresh">Fresh Perspective</div>
          </div>
          {posts.map((post) => (
            <div key={post._id} className="section-checkbox-item">
              <div className="section-title">
                {post.title}
                <span className="section-category">{post.category}</span>
              </div>
              <div className="section-checkbox-col section-checkbox-col-editors">
                <input
                  type="checkbox"
                  checked={post.isEditorsPick || false}
                  onChange={() => handleToggle(post._id, 'isEditorsPick')}
                />
              </div>
              <div className="section-checkbox-col section-checkbox-col-trending">
                <input
                  type="checkbox"
                  checked={post.isTrending || false}
                  onChange={() => handleToggle(post._id, 'isTrending')}
                />
              </div>
              <div className="section-checkbox-col section-checkbox-col-fresh">
                <input
                  type="checkbox"
                  checked={post.isFreshPerspective || false}
                  onChange={() => handleToggle(post._id, 'isFreshPerspective')}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeSectionsManager;