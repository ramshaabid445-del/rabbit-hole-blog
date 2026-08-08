import React, { useState, useEffect } from 'react';
import { getAuthHeaders } from '../adminAuth';

const DashboardOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
      const res = await fetch('https://rabbit-hole-blog-production.up.railway.app/api/admin/stats', {
        headers: getAuthHeaders(),
      });
        const data = await res.json();
        if (res.ok) setStats(data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="admin-loading">Loading dashboard...</div>;

  return (
    <div>
      <h2 className="admin-page-title">Dashboard Overview</h2>
      <p className="admin-page-subtitle">At a glance — your blog's key metrics</p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-icon">📝</div>
          <div className="stat-card-value">{stats?.totalBlogs || 0}</div>
          <div className="stat-card-label">Total Blogs</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">👥</div>
          <div className="stat-card-value">{stats?.totalSubscribers || 0}</div>
          <div className="stat-card-label">Subscribers</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">💬</div>
          <div className="stat-card-value">{stats?.totalComments || 0}</div>
          <div className="stat-card-label">Total Comments</div>
          {stats?.pendingComments > 0 && (
            <div className="stat-card-pending">⚠️ {stats.pendingComments} pending</div>
          )}
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">📈</div>
          <div className="stat-card-value">{stats?.trendingArticle?.views || 0}</div>
          <div className="stat-card-label">Most Viewed</div>
        </div>
      </div>

      {stats?.trendingArticle && (
        <div className="trending-card">
          <h4>🔥 Most Trending Article</h4>
          <div className="trending-title">{stats.trendingArticle.title}</div>
          <div className="trending-meta">
            ID: {stats.trendingArticle.numericId} · {stats.trendingArticle.views} views
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;