import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/SavedBlogs.css';

/**
 * Format view count: if >= 1000, show as "1.2K", otherwise show raw number
 */
const formatViews = (views) => {
  if (!views && views !== 0) return "0";
  if (views >= 1000) {
    return (views / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return views.toString();
};

/**
 * Format a Date object or ISO string to readable format like "July 30, 2026"
 */
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// turns "Simulation Theory" -> "cat-simulation-theory" for accent colors
const categorySlug = (category) =>
  `cat-${category.toLowerCase().replace(/&/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`;

const categoryIcon = (category) => {
  const icons = {
    Nature: '🌿',
    Science: '🔬',
    Philosophy: '🧠',
    'Simulation Theory': '🔗',
    'Religion & God': '🏛️',
    Cosmos: '🪐',
    Consciousness: '👁️',
    Mysteries: '🔺',
    Environment: '🌍'
  };
  return icons[category] || '✦';
};

// Inspiration Gallery images — aesthetic nature photography
// Bento grid layout: 1 large left (full-height) + 2 small right top + 1 wide right bottom
const galleryImages = [
  {
    src: 'https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Above the Clouds',
    subtitle: 'Morning mist over the valley',
    span: 'large'
  },
  {
    src: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Where Flowers Bloom',
    subtitle: 'Dew-kissed petals at dawn',
    span: 'small'
  },
  {
    src: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Quiet Waters',
    subtitle: 'A mirror to the sky',
    span: 'small'
  },
  {
    src: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Golden Hour',
    subtitle: 'When the world turns to gold',
    span: 'wide'
  }
];

const SavedBlogsScreen = () => {
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasEmail, setHasEmail] = useState(false);

  // Fetch saved articles from backend
  useEffect(() => {
    const subscriberEmail = localStorage.getItem("subscriberEmail");

    if (!subscriberEmail) {
      setHasEmail(false);
      setLoading(false);
      return;
    }

    setHasEmail(true);

    const fetchSavedArticles = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/subscribe/saved-articles/${subscriberEmail}`
        );
        if (res.ok) {
          const data = await res.json();
          setSavedArticles(data);
        }
      } catch (error) {
        console.error("Error fetching saved articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedArticles();
  }, []);

  return (
    <div className="saved-blogs-screen">
      <Navbar />

      {/* ============ HERO SECTION ============ */}
      <section className="saved-hero">
        <div
          className="saved-hero-inner"
          style={{ backgroundImage: `url(/images/saved.jpeg)` }}
        >
          <div className="saved-hero-overlay"></div>
          <span className="saved-eyebrow">YOUR COLLECTION</span>
          <h1 className="saved-hero-title">
            <span className="title-white">My Saved</span>
            <span className="title-gradient">Blogs</span>
          </h1>
          <p className="saved-hero-desc">
            All your bookmarked articles in one place — revisit the ideas that caught your curiosity.
          </p>
        </div>
      </section>

      {/* ============ SAVED ARTICLES SECTION ============ */}
      <section className="saved-articles-section">
        <div className="saved-container">
          {loading ? (
            <p className="saved-loading">Loading your saved articles...</p>
          ) : !hasEmail ? (
            <div className="saved-empty-state">
              <div className="saved-empty-icon">🔖</div>
              <h2 className="saved-empty-title">No articles saved yet</h2>
              <p className="saved-empty-subtext">
                Explore articles and save your favorites to see them here.
              </p>
              <Link to="/articles" className="saved-empty-btn">
                Browse Articles →
              </Link>
            </div>
          ) : savedArticles.length === 0 ? (
            <div className="saved-empty-state">
              <div className="saved-empty-icon">🔖</div>
              <h2 className="saved-empty-title">No articles saved yet</h2>
              <p className="saved-empty-subtext">
                Explore articles and save your favorites to see them here.
              </p>
              <Link to="/articles" className="saved-empty-btn">
                Browse Articles →
              </Link>
            </div>
          ) : (
            <>
              <div className="saved-section-header">
                <span className="saved-section-label">✦ Your Bookmarks</span>
                <h2 className="saved-section-title">Saved Articles</h2>
                <p className="saved-section-count">
                  {savedArticles.length} {savedArticles.length === 1 ? 'article' : 'articles'} saved
                </p>
              </div>

              <div className="saved-articles-grid">
                {savedArticles.map((article) => (
                  <Link
                    key={article._id}
                    to={`/articles/${article.numericId}`}
                    className="saved-article-card-link"
                  >
                    <article className={`saved-article-card ${categorySlug(article.category)}`}>
                      <div className="saved-card-media">
                        <div className="saved-card-media-inner">
                          <img src={article.image} alt={article.title} />
                        </div>
                        <span className="saved-card-badge">{article.category}</span>
                        <span className="saved-card-avatar">{categoryIcon(article.category)}</span>
                      </div>
                      <div className="saved-card-body">
                        <h3 className="saved-card-title">{article.title}</h3>
                        <p className="saved-card-excerpt">{article.excerpt}</p>
                        <span className="saved-card-readmore">Read More →</span>
                        <div className="saved-card-divider"></div>
                        <div className="saved-card-footer">
                          <span>{formatDate(article.createdAt)}</span>
                          <span>📖 {article.readTime}</span>
                          <span>👁️ {formatViews(article.views)}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ============ INSPIRATION GALLERY — Bento Grid ============ */}
      <div className="saved-gallery-wrapper">
        <section className="saved-gallery-section">
          <div className="saved-gallery-container">
            <div className="saved-gallery-header">
              <span className="saved-section-label">✦ Moments of Reflection</span>
              <h2 className="saved-section-title">Little Escapes</h2>
              <p className="saved-gallery-desc">
                Sometimes the best ideas come when we pause and look around.
              </p>
            </div>

            <div className="saved-gallery-grid">
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className={`saved-gallery-item ${img.span === 'large' ? 'saved-gallery-large' : ''} ${img.span === 'wide' ? 'saved-gallery-wide' : ''}`}
                >
                  <div className="saved-gallery-img">
                    <img src={img.src} alt={img.title} />
                  </div>
                  <div className="saved-gallery-overlay">
                    <span className="saved-gallery-caption">{img.title}</span>
                    {img.subtitle && <span className="saved-gallery-desc-small">{img.subtitle}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ============ FOOTER ============ */}
      <Footer />
    </div>
  );
};

export default SavedBlogsScreen;