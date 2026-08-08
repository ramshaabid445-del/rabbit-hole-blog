import React, { useState, useEffect } from 'react';
import { getAuthHeaders } from '../adminAuth';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await fetch('https://rabbit-hole-blog-production.up.railway.app/api/admin/categories', {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (res.ok) setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (!image.trim()) {
      setMessage('❌ Image URL is required');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      const url = editing
        ? `https://rabbit-hole-blog-production.up.railway.app/api/admin/categories/${editing._id}`
        : 'https://rabbit-hole-blog-production.up.railway.app/api/admin/categories';
      const method = editing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify({ name: name.trim(), image }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(editing ? '✅ Category updated!' : '✅ Category created!');
        setName('');
        setImage('');
        setEditing(null);
        fetchCategories();
      } else {
        setMessage('❌ ' + (data.message || 'Error'));
      }
    } catch (err) {
      setMessage('❌ Server error');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const handleEdit = (cat) => {
    setEditing(cat);
    setName(cat.name);
    setImage(cat.image || '');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      const res = await fetch(`https://rabbit-hole-blog-production.up.railway.app/api/admin/categories/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        setCategories(categories.filter((c) => c._id !== id));
        setMessage('✅ Category deleted');
      }
    } catch (err) {
      console.error('Error deleting category:', err);
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCancel = () => {
    setEditing(null);
    setName('');
    setImage('');
  };

  return (
    <div>
      <h2 className="admin-page-title">Categories</h2>
      <p className="admin-page-subtitle">Manage blog categories — add, edit, or remove</p>

      {message && (
        <div className={`admin-alert ${message.includes('✅') ? 'admin-alert-success' : 'admin-alert-error'}`}>
          {message}
        </div>
      )}

      <div className="admin-card" style={{ marginBottom: 24, width: '100%' }}>
        <div className="admin-card-header">
          <h4 className="admin-card-title">{editing ? 'Edit Category' : 'Add New Category'}</h4>
          <p className="admin-card-subtitle">
            {editing ? 'Update the category details' : 'Create a new category for your blog'}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-grid-2">
            <div className="admin-form-group">
              <label>Category Name *</label>
              <input
                className="admin-form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Science"
                required
              />
            </div>
            <div className="admin-form-group">
              <label>Image URL *</label>
              <input
                className="admin-form-control"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                required
              />
            </div>
          </div>
          <div className="admin-action-group">
            <button type="submit" className="admin-btn admin-btn-primary">
              {editing ? 'Update' : 'Add Category'}
            </button>
            {editing && (
              <button type="button" className="admin-btn admin-btn-outline" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {loading ? (
        <div className="admin-loading">Loading...</div>
      ) : categories.length === 0 ? (
        <div className="admin-empty-state">
          <div className="admin-empty-state-icon">📂</div>
          No categories yet. Add your first one!
        </div>
      ) : (
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id}>
                  <td style={{ fontWeight: 600 }}>{cat.name}</td>
                  <td>
                    {cat.image ? (
                      <img className="table-thumb" src={cat.image} alt={cat.name} />
                    ) : (
                      <span style={{ color: 'rgba(17,26,43,0.3)', fontSize: 12 }}>No image</span>
                    )}
                  </td>
                  <td>
                    <div className="admin-action-group">
                      <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => handleEdit(cat)}>
                        Edit
                      </button>
                      <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(cat._id)}>
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

export default CategoryManager;