import React, { useState, useEffect } from 'react';
import { getAuthHeaders } from '../adminAuth';
import useInactivityLogout from '../../../hooks/useInactivityLogout';

const AddEditBlog = ({ post, onBack }) => {
  // Auto-logout admin after 3 minutes of inactivity
  useInactivityLogout();

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    category: '',
    image: '',
    readTime: '',
    tags: '',
    status: 'draft',
    isEditorsPick: false,
    isTrending: false,
    isFreshPerspective: false,
    contentBlocks: [{ type: 'text', value: '' }],
  });
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const isEditing = !!post;

  // Existing frontend categories (static)
  const staticCategories = [
    'Nature',
    'Science',
    'Philosophy',
    'Simulation Theory',
    'Religion & God',
    'Cosmos',
    'Consciousness',
    'Mysteries',
    'Environment',
  ];

  // Fetch categories from backend and merge with static ones
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/categories', {
          headers: getAuthHeaders(),
        });
        const data = await res.json();
        if (res.ok) {
          // Merge backend categories with static categories, deduplicate by name
          const backendNames = data.map((c) => c.name);
          const merged = [...new Set([...staticCategories, ...backendNames])];
          setCategories(merged);
        } else {
          setCategories(staticCategories);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setCategories(staticCategories);
      }
    };
    fetchCategories();
  }, []);

  // Load post data if editing
  useEffect(() => {
    if (post) {
      setForm({
        title: post.title || '',
        excerpt: post.excerpt || '',
        category: post.category || '',
        image: post.image || '',
        readTime: post.readTime || '',
        tags: post.tags ? post.tags.join(', ') : '',
        status: post.status || 'draft',
        isEditorsPick: post.isEditorsPick || false,
        isTrending: post.isTrending || false,
        isFreshPerspective: post.isFreshPerspective || false,
        contentBlocks: post.contentBlocks && post.contentBlocks.length > 0
          ? post.contentBlocks
          : post.content && post.content.length > 0
            ? post.content.map((c) => ({ type: 'text', value: c }))
            : [{ type: 'text', value: '' }],
      });
    }
  }, [post]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlockChange = (index, value) => {
    const blocks = [...form.contentBlocks];
    blocks[index] = { ...blocks[index], value };
    setForm((prev) => ({ ...prev, contentBlocks: blocks }));
  };

  const addBlock = (type) => {
    const block = type === 'text'
      ? { type: 'text', value: '' }
      : type === 'image'
        ? { type: 'image', value: '' }
        : { type: 'quote', value: '' };
    setForm((prev) => ({ ...prev, contentBlocks: [...prev.contentBlocks, block] }));
  };

  const removeBlock = (index) => {
    if (form.contentBlocks.length <= 1) return;
    const blocks = form.contentBlocks.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, contentBlocks: blocks }));
  };

  const moveBlock = (index, direction) => {
    const blocks = [...form.contentBlocks];
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    [blocks[index], blocks[target]] = [blocks[target], blocks[index]];
    setForm((prev) => ({ ...prev, contentBlocks: blocks }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const tagsArray = form.tags
      ? form.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const payload = {
      ...form,
      tags: tagsArray,
      readTime: form.readTime || `${Math.ceil(form.contentBlocks.length * 1.5)} min read`,
    };
    delete payload.contentBlocks;

    // Convert contentBlocks to the format needed
    // For text blocks, use content array; for all blocks, use contentBlocks
    const textBlocks = form.contentBlocks.filter((b) => b.type === 'text').map((b) => b.value);
    payload.content = textBlocks;
    payload.contentBlocks = form.contentBlocks;

    try {
      const url = isEditing
        ? `http://localhost:5000/api/admin/posts/${post._id}`
        : 'http://localhost:5000/api/admin/posts';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(isEditing ? '✅ Blog updated successfully!' : '✅ Blog created successfully!');
        setTimeout(() => onBack(), 1500);
      } else {
        setMessage('❌ Error: ' + (data.message || 'Something went wrong'));
      }
    } catch (err) {
      setMessage('❌ Server error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div className="admin-page-header-content">
          <h2 className="admin-page-title">{isEditing ? 'Edit Blog' : 'New Blog'}</h2>
          <p className="admin-page-subtitle">
            {isEditing ? 'Update the content below' : 'Create a new blog article'}
          </p>
        </div>
        <button className="admin-btn admin-btn-outline" onClick={onBack}>
          ← Back to List
        </button>
      </div>

      {message && (
        <div className={`admin-alert ${message.includes('✅') ? 'admin-alert-success' : 'admin-alert-error'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="admin-form-grid-2">
          <div className="admin-form-group">
            <label>Title *</label>
            <input
              className="admin-form-control"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Article title"
              required
            />
          </div>
          <div className="admin-form-group">
            <label>Category *</label>
            <select
              className="admin-form-control"
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
              required
            >
              <option value="">Select category</option>
              {categories.map((catName) => (
                <option key={catName} value={catName}>{catName}</option>
              ))}
              {/* <option value="Other">Other (type manually)</option> */}
            </select>
            {form.category === 'Other' && (
              <input
                className="admin-form-control"
                style={{ marginTop: 8 }}
                value={form.category === 'Other' ? '' : form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                placeholder="Enter custom category"
              />
            )}
          </div>
        </div>

        <div className="admin-form-group">
          <label>Excerpt *</label>
          <textarea
            className="admin-form-control"
            value={form.excerpt}
            onChange={(e) => handleChange('excerpt', e.target.value)}
            placeholder="Short description for cards"
            rows={2}
            required
          />
        </div>

        <div className="admin-form-grid-2">
          <div className="admin-form-group">
            <label>Cover Image URL *</label>
            <input
              className="admin-form-control"
              value={form.image}
              onChange={(e) => handleChange('image', e.target.value)}
              placeholder="https://..."
              required
            />
          </div>
          <div className="admin-form-group">
            <label>Read Time</label>
            <input
              className="admin-form-control"
              value={form.readTime}
              onChange={(e) => handleChange('readTime', e.target.value)}
              placeholder="e.g. 6 min read (auto if empty)"
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label>Tags (comma-separated)</label>
          <input
            className="admin-form-control"
            value={form.tags}
            onChange={(e) => handleChange('tags', e.target.value)}
            placeholder="e.g. quantum, physics, consciousness"
          />
        </div>

        {/* Content Blocks Builder */}
        <div className="admin-form-group">
          <label>Content Blocks</label>
          <div className="content-blocks-area">
            {form.contentBlocks.map((block, index) => (
              <div key={index} className="content-block">
                <div className="content-block-header">
                  <span className="content-block-type">
                    {block.type === 'text' ? '📝 Text' : block.type === 'image' ? '🖼️ Image' : '💬 Quote'}
                  </span>
                  <div className="content-block-actions">
                    <button type="button" onClick={() => moveBlock(index, -1)} title="Move up">↑</button>
                    <button type="button" onClick={() => moveBlock(index, 1)} title="Move down">↓</button>
                    <button type="button" className="delete-btn" onClick={() => removeBlock(index)} title="Remove">✕</button>
                  </div>
                </div>
                {block.type === 'text' ? (
                  <textarea
                    value={block.value}
                    onChange={(e) => handleBlockChange(index, e.target.value)}
                    placeholder="Write your paragraph here... (HTML supported)"
                    rows={3}
                  />
                ) : block.type === 'image' ? (
                  <div>
                    <input
                      type="text"
                      value={block.value}
                      onChange={(e) => handleBlockChange(index, e.target.value)}
                      placeholder="Image URL..."
                    />
                    {block.value && (
                      <img
                        src={block.value}
                        alt="Preview"
                        className="img-fluid"
                        style={{ width: '100%', maxHeight: 200, objectFit: 'cover', marginTop: 8, borderRadius: 8 }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    )}
                  </div>
                ) : (
                  <textarea
                    value={block.value}
                    onChange={(e) => handleBlockChange(index, e.target.value)}
                    placeholder="Write your quote here..."
                    rows={2}
                  />
                )}
              </div>
            ))}
            <div className="add-block-buttons">
              <button type="button" className="add-block-btn" onClick={() => addBlock('text')}>
                + Add Text
              </button>
              <button type="button" className="add-block-btn" onClick={() => addBlock('image')}>
                + Add Image
              </button>
              <button type="button" className="add-block-btn" onClick={() => addBlock('quote')}>
                + Add Quote
              </button>
            </div>
          </div>
        </div>

        {/* Status & Section Flags */}
        <div className="admin-form-group">
          <label>Status</label>
          <select
            className="admin-form-control"
            value={form.status}
            onChange={(e) => handleChange('status', e.target.value)}
            style={{ maxWidth: 200 }}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="admin-form-group">
          <label>Section Flags</label>
          <div className="admin-checkbox-group">
            <label className="admin-checkbox-label">
              <input
                type="checkbox"
                checked={form.isEditorsPick}
                onChange={(e) => handleChange('isEditorsPick', e.target.checked)}
              />
              Editor's Pick
            </label>
            <label className="admin-checkbox-label">
              <input
                type="checkbox"
                checked={form.isTrending}
                onChange={(e) => handleChange('isTrending', e.target.checked)}
              />
              Trending
            </label>
            <label className="admin-checkbox-label">
              <input
                type="checkbox"
                checked={form.isFreshPerspective}
                onChange={(e) => handleChange('isFreshPerspective', e.target.checked)}
              />
              Fresh Perspective
            </label>
          </div>
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving} style={{ padding: '12px 32px' }}>
            {saving ? 'Saving...' : isEditing ? 'Update Blog' : 'Create Blog'}
          </button>
          <button type="button" className="admin-btn admin-btn-outline" onClick={onBack}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditBlog;