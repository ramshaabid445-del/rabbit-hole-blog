import React, { useState, useEffect } from 'react';
import { getAuthHeaders } from '../adminAuth';

const CommentsManager = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchComments = async (status) => {
    setLoading(true);
    try {
      const url = status && status !== 'all'
        ? `https://rabbit-hole-blog-production.up.railway.app/api/admin/comments?status=${status}`
        : 'https://rabbit-hole-blog-production.up.railway.app/api/admin/comments';
      const res = await fetch(url, { headers: getAuthHeaders() });
      const data = await res.json();
      if (res.ok) setComments(data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchComments(filter); }, [filter]);

  const handleStatus = async (id, status) => {
    try {
      const res = await fetch(`https://rabbit-hole-blog-production.up.railway.app/api/admin/comments/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setComments(comments.map((c) => c._id === id ? { ...c, status } : c));
      }
    } catch (err) {
      console.error('Error updating comment:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      const res = await fetch(`https://rabbit-hole-blog-production.up.railway.app/api/admin/comments/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        setComments(comments.filter((c) => c._id !== id));
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'approved', label: 'Approved' },
    { key: 'rejected', label: 'Rejected' },
  ];

  return (
    <div>
      <h2 className="admin-page-title">Comments</h2>
      <p className="admin-page-subtitle">Manage reader comments — approve or reject before they appear publicly</p>

      <div className="filter-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`filter-tab ${filter === tab.key ? 'active' : ''}`}
            onClick={() => setFilter(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="admin-loading">Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className="admin-empty-state">
          <div className="admin-empty-state-icon">💬</div>
          No comments found.
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Blog</th>
                <th>Commenter</th>
                <th>Comment</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={comment._id}>
                  <td data-label="Blog" className="admin-cell-blog">
                    {comment.postTitle || (comment.postId?.title) || 'Unknown'}
                  </td>
                  <td data-label="Commenter">
                    <div className="admin-cell-commenter-name">{comment.name}</div>
                    <div className="admin-cell-commenter-email">{comment.email}</div>
                  </td>
                  <td data-label="Comment" className="admin-cell-comment">
                    <div className="admin-comment-text">
                      {comment.comment}
                    </div>
                  </td>
                  <td data-label="Date" className="admin-cell-date">{formatDate(comment.createdAt)}</td>
                  <td data-label="Status">
                    <span className={`status-badge ${comment.status}`}>{comment.status}</span>
                  </td>
                  <td data-label="Actions">
                    <div className="admin-action-group">
                      {comment.status !== 'approved' && (
                        <button className="admin-btn admin-btn-success admin-btn-sm" onClick={() => handleStatus(comment._id, 'approved')}>
                          ✅
                        </button>
                      )}
                      {comment.status !== 'rejected' && (
                        <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleStatus(comment._id, 'rejected')}>
                          ❌
                        </button>
                      )}
                      <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => handleDelete(comment._id)}>
                        🗑️
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

export default CommentsManager;