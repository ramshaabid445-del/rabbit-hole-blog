import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/Articles.css';

const STATIC_CATEGORIES = [
  'All',
  'Nature',
  'Science',
  'Philosophy',
  'Simulation Theory',
  'Religion & God',
  'Cosmos',
  'Consciousness',
  'Mysteries',
  'Environment'
];

// turns "Simulation Theory" -> "cat-simulation-theory" so it matches the
// per-category accent-color classes in Articles.css
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
  if (icons[category]) return icons[category];

  // Dynamic icon for backend categories
  const n = category.toLowerCase();
  const has = (...words) => words.some((w) => n.includes(w));
  if (has('nature','plant','tree','animal','forest','garden','flower','ecosystem','wildlife','bird')) return '🌿';
  if (has('science','physics','chemistry','biology','lab','research','experiment')) return '🔬';
  if (has('philosophy','think','logic','mind','wisdom','existential','meaning')) return '🧠';
  if (has('simulation','virtual','matrix','digital','holograph','program','code','ai')) return '🔗';
  if (has('religion','god','faith','spirit','prayer','divine','soul','sacred')) return '🏛️';
  if (has('cosmos','space','galaxy','universe','star','planet','astronom','astro','solar','mars','moon','orbit')) return '🪐';
  if (has('consciousness','awareness','brain','mindful','perception','self','senses')) return '👁️';
  if (has('mystery','secret','paranormal','unknown','cryptid','monster','ufo','alien','haunted','ghost')) return '🔺';
  if (has('environment','climate','earth','planet','sustain','ocean','weather','pollution','green')) return '🌍';
  if (has('technology','robot','computer','internet','machine','invention','engineering','innovation')) return '🤖';
  if (has('quantum','particle','atom','wave','mechanics')) return '⚛️';
  if (has('energy','sound','vibration','frequency','spiritual','healing','meditation','yoga')) return '✨';
  if (has('calm','peace','mindful','zen','relax','stillness','quiet')) return '🧘';
  if (has('history','ancient','archaeology','civilization','pyramid','dinosaur','medieval','empire')) return '🏺';
  if (has('psychology','emotion','mental','therapy','behavior','dream')) return '💭';
  if (has('mathematics','math','numbers','geometry','pattern','sequence','fractal','algorithm')) return '📐';
  if (has('astrology','zodiac','horoscope','aurora','northern')) return '♈';
  if (has('myth','legend','folklore','fairy','dragon','fantasy','greek','norse')) return '🐉';
  if (has('music','sound','art','culture','literature','poetry','film','cinema')) return '🎨';
  if (has('food','nutrition','cooking','recipe','diet','coffee','tea')) return '🍃';
  if (has('health','medicine','disease','virus','brain health','wellness','fitness')) return '🩺';
  if (has('travel','adventure','explore','mountain','island','sea','desert','journey')) return '🌍';
  if (has('human','behavior','society','culture','people')) return '💭';
  if (has('reality','dimension','paradox')) return '🌀';
  if (has('lifestyle','daily','habit','productivity')) return '⏳';
  if (has('business','econom','money','finance','market')) return '💼';
  if (has('politics','law','justice','government')) return '⚖️';
  if (has('photography','visual','photo','color')) return '🎥';
  if (has('education','learning','school','study','knowledge')) return '📚';
  if (has('books','reading','writing','story')) return '📖';
  if (has('future','innovation','futur','prediction','dystopia','utopia')) return '🔮';
  if (has('medical','doctor','disease','virus','healthcare')) return '🩺';
  if (has('nuclear','power','electric')) return '⚡';
  if (has('love','relationship','emotion','feel')) return '💖';
  return '✦';
};

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

const ArticlesScreen = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState([]);
  const [backendCategories, setBackendCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const requestedCategory = searchParams.get('category');

  // Merge static + backend categories dynamically
  const CATEGORIES = useMemo(() => {
    const staticNames = STATIC_CATEGORIES.filter((c) => c !== 'All');
    const backendNames = backendCategories.map((c) => c.name);
    const merged = [...new Set([...staticNames, ...backendNames])];
    return ['All', ...merged];
  }, [backendCategories]);

  const initialCategory = CATEGORIES.find((category) => category.toLowerCase() === requestedCategory?.toLowerCase()) || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const articlesGridRef = useRef(null);

  // Fetch backend categories (with fallback to derive from articles)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let backendCats = [];

        // 1. Try the categories endpoint
        try {
          const res = await fetch("https://rabbit-hole-blog-production.up.railway.app/api/articles/categories");
          const data = await res.json();
          if (res.ok && Array.isArray(data)) backendCats = data;
        } catch (e) {
          console.error("Categories endpoint failed:", e);
        }

        // 2. Also derive categories from articles (always reliable)
        try {
          const res = await fetch("https://rabbit-hole-blog-production.up.railway.app/api/articles");
          const data = await res.json();
          if (res.ok && Array.isArray(data)) {
            const articleCats = [...new Set(data.map((a) => a.category).filter(Boolean))]
              .map((name) => ({ name, image: '' }));
            backendCats = [...backendCats, ...articleCats];
          }
        } catch (e) {
          console.error("Articles endpoint failed:", e);
        }

        // 3. Deduplicate by name
        const seen = new Set();
        const unique = backendCats.filter((c) => {
          if (seen.has(c.name)) return false;
          seen.add(c.name);
          return true;
        });

        setBackendCategories(unique);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch articles from backend API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("https://rabbit-hole-blog-production.up.railway.app/api/articles");
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  React.useEffect(() => setActiveCategory(initialCategory), [initialCategory]);

  React.useEffect(() => {
    if (requestedCategory && articlesGridRef.current) {
      requestAnimationFrame(() => articlesGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  }, [requestedCategory]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory, articles]);

  return (
    <div className="articles-screen">
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="articles-hero">
        <div
          className="articles-hero-inner"
          style={{ backgroundImage: `url(/images/articles.jpeg)` }}
        >
          <div className="articles-hero-overlay"></div>
          <span className="articles-eyebrow">ALL ARTICLES</span>
          <h1 className="articles-hero-title">
            Dive Into <span className="title-gradient">Every Idea</span>
          </h1>
          <p className="articles-hero-desc">
            Browse the full collection — from the nature of reality to the nature outside your window.
          </p>
        </div>
      </section>

      {/* ============ FILTER PILLS ============ */}
      <section className="articles-filter-section">
        <div className="articles-filter-container">
          <div className="articles-filter-row">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`articles-filter-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ARTICLES GRID ============ */}
      <section className="articles-grid-section" ref={articlesGridRef}>
        <div className="container-fluid">
          {loading ? (
            <p className="articles-count">Loading articles...</p>
          ) : (
            <p className="articles-count">
              {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'} found
            </p>
          )}

          {!loading && filteredArticles.length > 0 ? (
            <div className="row g-4">
              {filteredArticles.map((article) => (
                <div key={article.numericId} className="col-lg-4 col-md-6 col-sm-12">
                  <Link to={`/articles/${article.numericId}`} className="article-card-link">
                    <article className={`editorial-card ${categorySlug(article.category)}`}>
                      <div className="editorial-media">
                        <div className="editorial-media-inner">
                          <img src={article.image} alt={article.title} />
                        </div>
                        <span className="editorial-badge">{article.category}</span>
                        <span className="editorial-avatar">{categoryIcon(article.category)}</span>
                      </div>
                      <div className="editorial-body">
                        <h3 className="editorial-title">{article.title}</h3>
                        <p className="editorial-excerpt">{article.excerpt}</p>
                        <span className="editorial-readmore">Read More →</span>
                        <div className="editorial-divider"></div>
                        <div className="editorial-footer">
                          <span>{formatDate(article.createdAt)}</span>
                          <span>📖 {article.readTime}</span>
                          <span>👁️ {formatViews(article.views)}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </div>
              ))}
            </div>
          ) : !loading ? (
            <div className="articles-empty">No articles match your search. Try a different keyword or category.</div>
          ) : null}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ArticlesScreen;