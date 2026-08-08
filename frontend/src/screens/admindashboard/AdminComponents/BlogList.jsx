import React, { useState, useEffect } from 'react';
import { getAuthHeaders } from '../adminAuth';

const BlogList = ({ onEdit }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch('https://rabbit-hole-blog-production.up.railway.app/api/admin/posts', {
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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`https://rabbit-hole-blog-production.up.railway.app/api/admin/posts/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        setPosts(posts.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) return <div className="admin-loading">Loading posts...</div>;

  return (
    <div>
      <div className="admin-page-header">
        <div className="admin-page-header-content">
          <h2 className="admin-page-title">Blog Posts</h2>
          <p className="admin-page-subtitle">Manage all your articles</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => onEdit(null)}>
          + New Blog
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="admin-empty-state">
          <div className="admin-empty-state-icon">📝</div>
          No blog posts yet. Create your first one!
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Views</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td data-label="">
                    <img
                      className="table-thumb"
                      src={post.image || 'https://via.placeholder.com/56x40'}
                      alt={post.title}
                    />
                  </td>
                  <td data-label="Title" className="admin-cell-title">
                    {post.title}
                  </td>
                  <td data-label="Category" className="admin-cell-category">{post.category}</td>
                  <td data-label="Status">
                    <span className={`status-badge ${post.status}`}>{post.status}</span>
                  </td>
                  <td data-label="Views">{post.views || 0}</td>
                  <td data-label="Date" className="admin-cell-date">{formatDate(post.createdAt)}</td>
                  <td data-label="Actions">
                    <div className="admin-action-group">
                      <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => onEdit(post)}>
                        Edit
                      </button>
                      <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(post._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BlogList;