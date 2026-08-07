import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import articlesData from '../../data/articlesData';
import '../../styles/HomeScreen.css';

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

const HomeScreen = () => {
  const navigate = useNavigate();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMsg, setNewsletterMsg] = useState('');
  const [newsletterError, setNewsletterError] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [backendCategories, setBackendCategories] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/articles");
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let backendCats = [];

        // 1. Try the categories endpoint
        try {
          const res = await fetch("http://localhost:5000/api/articles/categories");
          const data = await res.json();
          if (res.ok && Array.isArray(data)) backendCats = data;
        } catch (e) {
          console.error("Categories endpoint failed:", e);
        }

        // 2. Also derive categories from articles (always reliable)
        const articleCats = [...new Set(articles.map((a) => a.category).filter(Boolean))]
          .map((name) => ({ name, image: "" }));

        // 3. Merge both sources (deduplicate by name)
        const merged = [...backendCats, ...articleCats];
        const seen = new Set();
        const unique = merged.filter((c) => {
          if (seen.has(c.name)) return false;
          seen.add(c.name);
          return true;
        });

        // 4. Filter out static categories already in pills
        const staticNames = ["Nature", "Science", "Philosophy", "Simulation Theory", "Religion & God", "Cosmos", "Consciousness", "Mysteries"];
        const newOnes = unique.filter((c) => !staticNames.includes(c.name));
        setBackendCategories(newOnes);
      } catch (err) {
        console.error("Error fetching backend categories:", err);
      }
    };
    fetchCategories();
  }, [articles]); // Re-run when articles load so we always have category data

  const getCategoryIcon = (name) => {
    const n = name.toLowerCase();
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
    return '✨';
  };

  const getArticle = (numericId) => {
    const staticArticle = articlesData.find((a) => a.id === numericId);
    if (!staticArticle) return null;
    const apiArticle = articles.find((a) => a.title === staticArticle.title);
    return apiArticle || staticArticle;
  };

  const getArticleImage = (id, fallback) => {
    const art = articlesData.find((a) => a.id === id);
    return art ? art.image : fallback;
  };

  const getSectionArticles = (flag, count, fallbackIds) => {
    const flagged = articles
      .filter((a) => a[flag])
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const staticArticles = fallbackIds
      .map((id) => articlesData.find((a) => a.id === id))
      .filter(Boolean);

    const merged = [...flagged];

    for (const staticArt of staticArticles) {
      if (merged.length >= count) break;
      const alreadyExists = merged.some((a) => a.title === staticArt.title);
      if (!alreadyExists) {
        merged.push(staticArt);
      }
    }

    return merged.slice(0, count);
  };

  const editorsPickArticles = getSectionArticles('isEditorsPick', 4, [1, 5, 3, 6]);
  const trendingArticles = getSectionArticles('isTrending', 6, [1, 2, 3, 4, 5, 6]);
  const freshPerspectiveArticles = getSectionArticles('isFreshPerspective', 4, [7, 8, 9, 10]);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterMsg('');
    setNewsletterLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("subscriberEmail", newsletterEmail);
        setNewsletterMsg(data.message || "Subscribed successfully!");
        setNewsletterError(false);
        setNewsletterEmail('');
      } else {
        setNewsletterMsg(data.message || "Something went wrong.");
        setNewsletterError(true);
      }
    } catch (error) {
      setNewsletterMsg("Server error. Please try again later.");
      setNewsletterError(true);
    } finally {
      setNewsletterLoading(false);
    }
  };

  const getViews = (numericId) => {
    const article = getArticle(numericId);
    return article && article.views ? formatViews(article.views) : null;
  };

  const getDate = (numericId) => {
    const article = getArticle(numericId);
    return article && article.createdAt ? formatDate(article.createdAt) : null;
  };

  return (
    <div className="home-screen">
      <Navbar />

      {/* ============ HERO SECTION ============ */}
      <section className="hero-section" id="home">
        <div
          className="hero-inner"
          style={{ '--hero-bg-image': "url('/images/home.jpeg')" }}
        >
          <div className="hero-inner-overlay"></div>
          <div className="hero-container">
            <div className="hero-left">
              <h1 className="hero-title">
                <span className="hero-title-light">Dive into the</span>
                <span className="hero-title-brand">Rabbit Hole</span>
              </h1>

              <p className="hero-desc">
                Explore the mysteries of consciousness, simulation theory, quantum reality, 
                and the hidden patterns that connect everything in our universe.
              </p>

              <div className="hero-buttons">
                <Link to="/articles" className="btn-dark">Start Exploring</Link>
                <Link to="/about#author-story" className="btn-outline">Meet the Author</Link>
              </div>

              <div className="insight-card">
                <div className="insight-header">
                  <span className="insight-dot"></span>
                  <span className="insight-label">Today's Insight</span>
                </div>
                <p className="insight-text">
                  "The universe is not only stranger than we imagine, it is stranger than we can imagine."
                </p>
                <div className="insight-author">— J.B.S. Haldane</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CATEGORY PILLS ============ */}
      <div className="category-pills-wrapper">
        <div className="category-pills-container">
          <div className="category-pills-row-horizontal">
            <Link to="/articles?category=Nature" className="category-pill-item-light">
              <span className="pill-icon">🌿</span>
              <span className="pill-label">Nature</span>
            </Link>
            <Link to="/articles?category=Science" className="category-pill-item-light">
              <span className="pill-icon">🔬</span>
              <span className="pill-label">Science</span>
            </Link>
            <Link to="/articles?category=Philosophy" className="category-pill-item-light">
              <span className="pill-icon">🧠</span>
              <span className="pill-label">Philosophy</span>
            </Link>
            <Link to="/articles?category=Simulation%20Theory" className="category-pill-item-light">
              <span className="pill-icon">🔗</span>
              <span className="pill-label">Simulation</span>
            </Link>
            <Link to="/articles?category=Religion%20%26%20God" className="category-pill-item-light">
              <span className="pill-icon">🏛️</span>
              <span className="pill-label">Religion</span>
            </Link>
            <Link to="/articles?category=Cosmos" className="category-pill-item-light">
              <span className="pill-icon">🪐</span>
              <span className="pill-label">Cosmos</span>
            </Link>
            <Link to="/articles?category=Consciousness" className="category-pill-item-light">
              <span className="pill-icon">👁️</span>
              <span className="pill-label">Consciousness</span>
            </Link>
            <Link to="/articles?category=Mysteries" className="category-pill-item-light">
              <span className="pill-icon">🔺</span>
              <span className="pill-label">Mysteries</span>
            </Link>
            {backendCategories.map((cat) => (
              <Link
                key={cat._id}
                to={`/articles?category=${encodeURIComponent(cat.name)}`}
                className="category-pill-item-light"
              >
                <span className="pill-icon">{getCategoryIcon(cat.name)}</span>
                <span className="pill-label">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ============ EDITOR'S PICK ============ */}
      <div className="editors-wrapper">
        <section className="editors-section">
          <div className="editors-container">
            <div className="editors-header">
              <span className="section-label">✦ Editor's Pick</span>
              <h2 className="section-title">Curated for You</h2>
              <p className="section-desc">Handpicked deep dives into the most mind-expanding topics</p>
            </div>
            <div className="editors-grid">
              {editorsPickArticles[0] && (
                <Link to={`/articles/${editorsPickArticles[0].numericId || editorsPickArticles[0].id}`} className="editors-card-link editors-card-lg-link">
                  <div className="editors-card-lg">
                    <div className="editors-card-img">
                      <img loading="lazy" decoding="async" src={editorsPickArticles[0].image} alt={editorsPickArticles[0].title} />
                    </div>
                    <div className="editors-card-overlay">
                      <span className="editors-card-badge">{editorsPickArticles[0].category}</span>
                      <h3 className="editors-card-title">{editorsPickArticles[0].title}</h3>
                      <p className="editors-card-excerpt">{editorsPickArticles[0].excerpt}</p>
                      <span className="editors-card-read">Read Article →</span>
                    </div>
                  </div>
                </Link>
              )}
              <div className="editors-grid-right">
                {editorsPickArticles.slice(1, 4).map((article, i) => (
                  <Link
                    key={article._id || article.id}
                    to={`/articles/${article.numericId || article.id}`}
                    className={`editors-card-link ${i === 2 ? 'editors-card-wide-link' : ''}`}
                  >
                    <div className={`editors-card-sm ${i === 2 ? 'editors-card-wide' : ''}`}>
                      <div className="editors-card-img">
                        <img loading="lazy" decoding="async" src={article.image} alt={article.title} />
                      </div>
                      <div className="editors-card-overlay">
                        <span className="editors-card-badge">{article.category}</span>
                        <h3 className="editors-card-title">{article.title}</h3>
                        <span className="editors-card-read">Read Article →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ============ QUOTE OF THE WEEK ============ */}
      <div className="home-quote-wrapper">
        <section className="home-quote-section">
          <div className="home-quote-bg"></div>
          <div className="home-quote-content">
            <span className="home-quote-eyebrow">✦ Thought of the Week</span>
            <blockquote className="home-quote-text">
              "The most beautiful thing we can experience is the mysterious. It is the source of all true art and science."
            </blockquote>
            <div className="home-quote-author">— Albert Einstein</div>
            <div className="home-quote-divider"></div>
            <p className="home-quote-invite">
              Every week, a new thought to challenge the way you see reality.
            </p>
            <Link to="/articles" className="home-quote-btn">Explore More Ideas →</Link>
          </div>
        </section>
      </div>

      {/* ============ FEATURED ARTICLES SECTION ============ */}
      <div className="featured-wrapper">
        <section className="featured-section" id="articles">
          <div className="featured-container">
            <div className="featured-header">
              <span className="section-label">✦ Reader Favorites</span>
              <h2 className="section-title">Trending on the Rabbit Hole</h2>
              <p className="section-desc">The most-read articles our community can't stop talking about</p>
            </div>

            <div className="featured-content">
              <div className="featured-cards-row">
                {trendingArticles.map((article) => (
                  <Link key={article._id || article.id} to={`/articles/${article.numericId || article.id}`} className="featured-card-link">
                    <div className="featured-card d-flex flex-column">
                      <div className="featured-card-img">
                        <img loading="lazy" decoding="async" src={article.image} alt={article.title} />
                        <span className="featured-card-badge">{article.category}</span>
                      </div>
                      <div className="featured-card-body">
                        <h3 className="featured-card-title">{article.title}</h3>
                        <p className="featured-card-excerpt">{article.excerpt}</p>
                        <div className="featured-card-meta">
                          <span>📖 {article.readTime}</span>
                          <span>👁️ {formatViews(article.views)}</span>
                          <span className="featured-card-bookmark">🔖</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="featured-right d-flex flex-column">
                <div className="trending-card" style={{ background: 'linear-gradient(135deg, #221651 0%, #2d1e6c 100%)', color: '#fff' }}>
                  <div className="trending-header" style={{ color: '#fff' }}>
                    <span className="trending-icon">🔥</span>
                    <span className="trending-label" style={{ color: '#fff' }}>Trending Now</span>
                  </div>
                  <div className="trending-list" style={{ color: '#fff' }}>
                    <div className="trending-item" style={{ color: '#fff' }}>
                      <span className="trending-num" style={{ color: '#fff' }}>01</span>
                      <div className="trending-item-content" style={{ color: '#fff' }}>
                        <h4 style={{ color: '#fff' }}>The Mandela Effect: Collective False Memory?</h4>
                        <span className="trending-item-meta" style={{ color: '#fff' }}>1.2K reads</span>
                      </div>
                    </div>
                    <div className="trending-item" style={{ color: '#fff' }}>
                      <span className="trending-num" style={{ color: '#fff' }}>02</span>
                      <div className="trending-item-content" style={{ color: '#fff' }}>
                        <h4 style={{ color: '#fff' }}>Synchronicity: When Coincidences Stop Being Coincidences</h4>
                        <span className="trending-item-meta" style={{ color: '#fff' }}>980 reads</span>
                      </div>
                    </div>
                    <div className="trending-item" style={{ color: '#fff' }}>
                      <span className="trending-num" style={{ color: '#fff' }}>03</span>
                      <div className="trending-item-content" style={{ color: '#fff' }}>
                        <h4 style={{ color: '#fff' }}>The Holographic Universe Theory</h4>
                        <span className="trending-item-meta" style={{ color: '#fff' }}>856 reads</span>
                      </div>
                    </div>
                    <div className="trending-item" style={{ color: '#fff' }}>
                      <span className="trending-num" style={{ color: '#fff' }}>04</span>
                      <div className="trending-item-content" style={{ color: '#fff' }}>
                        <h4 style={{ color: '#fff' }}>Plant Intelligence: Secret Life of Networks</h4>
                        <span className="trending-item-meta" style={{ color: '#fff' }}>723 reads</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="premium-card">
                  <div className="premium-icon">⭐</div>
                  <h4 className="premium-title">Unlock Premium Insights</h4>
                  <p className="premium-text">Get exclusive content, deep dives, and early access to new articles.</p>
                  <button
                    className="premium-btn"
                    onClick={() => navigate('/contact', { state: { subject: 'Asking about Premium' } })}
                  >
                    Ask about Premium →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ============ EXPLORE BY TOPIC ============ */}
      <div className="home-topics-wrapper">
        <section className="home-topics-section">
          <div className="home-topics-container">
            <div className="home-topics-header">
              <span className="section-label">✦ Explore</span>
              <h2 className="section-title">Dive Into a Topic</h2>
              <p className="section-desc">Every path leads somewhere unexpected</p>
            </div>
            <div className="home-topics-grid">
              <Link to="/articles?category=Cosmos" className="home-topic-card" style={{'--topic-accent': '#7c3aed'}}>
                <div className="home-topic-img">
                  <img loading="lazy" decoding="async" fetchpriority="low" src="https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Cosmos" />
                </div>
                <div className="home-topic-content">
                  <span className="home-topic-icon">🪐</span>
                  <h3 className="home-topic-name">Cosmos</h3>
                  <span className="home-topic-count">12 articles</span>
                </div>
              </Link>
              <Link to="/articles?category=Consciousness" className="home-topic-card" style={{'--topic-accent': '#ec4899'}}>
                <div className="home-topic-img">
                  <img loading="lazy" decoding="async" fetchpriority="low" src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Consciousness" />
                </div>
                <div className="home-topic-content">
                  <span className="home-topic-icon">👁️</span>
                  <h3 className="home-topic-name">Consciousness</h3>
                  <span className="home-topic-count">8 articles</span>
                </div>
              </Link>
              <Link to="/articles?category=Philosophy" className="home-topic-card" style={{'--topic-accent': '#f59e0b'}}>
                <div className="home-topic-img">
                  <img loading="lazy" decoding="async" fetchpriority="low" src="https://images.pexels.com/photos/256514/pexels-photo-256514.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Philosophy" />
                </div>
                <div className="home-topic-content">
                  <span className="home-topic-icon">🧠</span>
                  <h3 className="home-topic-name">Philosophy</h3>
                  <span className="home-topic-count">10 articles</span>
                </div>
              </Link>
              <Link to="/articles?category=Science" className="home-topic-card" style={{'--topic-accent': '#06b6d4'}}>
                <div className="home-topic-img">
                  <img loading="lazy" decoding="async" fetchpriority="low" src="https://images.pexels.com/photos/414916/pexels-photo-414916.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Science" />
                </div>
                <div className="home-topic-content">
                  <span className="home-topic-icon">🔬</span>
                  <h3 className="home-topic-name">Science</h3>
                  <span className="home-topic-count">15 articles</span>
                </div>
              </Link>
              <Link to="/articles?category=Simulation%20Theory" className="home-topic-card" style={{'--topic-accent': '#8b5cf6'}}>
                <div className="home-topic-img">
                  <img loading="lazy" decoding="async" fetchpriority="low" src="https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Simulation" />
                </div>
                <div className="home-topic-content">
                  <span className="home-topic-icon">🔗</span>
                  <h3 className="home-topic-name">Simulation</h3>
                  <span className="home-topic-count">6 articles</span>
                </div>
              </Link>
              <Link to="/articles?category=Nature" className="home-topic-card" style={{'--topic-accent': '#10b981'}}>
                <div className="home-topic-img">
                  <img loading="lazy" decoding="async" fetchpriority="low" src="https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Nature" />
                </div>
                <div className="home-topic-content">
                  <span className="home-topic-icon">🌿</span>
                  <h3 className="home-topic-name">Nature</h3>
                  <span className="home-topic-count">9 articles</span>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ============ IMAGE GALLERY ============ */}
      <div className="home-gallery-wrapper">
        <section className="home-gallery-section">
          <div className="home-gallery-header">
            <span className="section-label">✦ Gallery</span>
            <h2 className="section-title">Snapshots of Curiosity</h2>
            <p className="section-desc">A visual escape into the strange, the beautiful, and the unexplained.</p>
          </div>
          <div className="home-gallery-grid">
            <div className="home-gallery-item">
              <img loading="lazy" decoding="async" fetchpriority="low" src="https://images.pexels.com/photos/11920154/pexels-photo-11920154.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Cosmos" />
              <div className="home-gallery-overlay">
                <span className="home-gallery-caption">Cosmos</span>
              </div>
            </div>
            <div className="home-gallery-item">
              <img loading="lazy" decoding="async" fetchpriority="low" src="https://images.pexels.com/photos/12025043/pexels-photo-12025043.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Consciousness" />
              <div className="home-gallery-overlay">
                <span className="home-gallery-caption">Consciousness</span>
              </div>
            </div>
            <div className="home-gallery-item">
              <img loading="lazy" decoding="async" fetchpriority="low" src="https://images.pexels.com/photos/30311412/pexels-photo-30311412.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Philosophy" />
              <div className="home-gallery-overlay">
                <span className="home-gallery-caption">Philosophy</span>
              </div>
            </div>
            <div className="home-gallery-item">
              <img loading="lazy" decoding="async" fetchpriority="low" src="https://images.pexels.com/photos/5755672/pexels-photo-5755672.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Science" />
              <div className="home-gallery-overlay">
                <span className="home-gallery-caption">Science</span>
              </div>
            </div>
            <div className="home-gallery-item">
              <img loading="lazy" decoding="async" fetchpriority="low" src="https://images.pexels.com/photos/16150773/pexels-photo-16150773.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Simulation" />
              <div className="home-gallery-overlay">
                <span className="home-gallery-caption">Simulation</span>
              </div>
            </div>
            <div className="home-gallery-item">
              <img loading="lazy" decoding="async" fetchpriority="low" src="https://images.pexels.com/photos/37246081/pexels-photo-37246081.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Nature" />
              <div className="home-gallery-overlay">
                <span className="home-gallery-caption">Nature</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ============ LATEST THOUGHTS SECTION ============ */}
      <div className="thoughts-wrapper">
        <section className="thoughts-section">
          <div className="thoughts-container">
            <div className="thoughts-header">
              <span className="section-label">✦ Latest Thoughts</span>
              <h2 className="section-title">Fresh Perspectives</h2>
              <p className="section-desc-soft">New ideas and explorations added weekly</p>
            </div>
            <div className="thoughts-grid">
              {freshPerspectiveArticles.map((article) => (
                <Link key={article._id || article.id} to={`/articles/${article.numericId || article.id}`} className="thought-card-anchor">
                  <div className="thought-card">
                    <div className="thought-card-img">
                      <img loading="lazy" decoding="async" src={article.image} alt={article.title} />
                    </div>
                    <div className="thought-card-content">
                      <span className="thought-card-date">{formatDate(article.createdAt)}</span>
                      <h4>{article.title}</h4>
                      <p>{article.excerpt}</p>
                      <span className="thought-card-link">Read More →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ============ NEWSLETTER ============ */}
      <div className="newsletter-wrapper">
        <section className="newsletter-section" id="subscribe">
          <div className="newsletter-inner text-center">
            <div className="newsletter-icon">✉️</div>
            <h2 className="newsletter-title">Join the Journey</h2>
            <p className="newsletter-text">Subscribe to receive weekly insights, exclusive content, and early access to new articles.</p>
            <form className="newsletter-form d-flex" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-dark" disabled={newsletterLoading}>
                {newsletterLoading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {newsletterMsg && (
              <p
                className="newsletter-message"
                style={{
                  marginTop: "12px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: newsletterError ? "#fca5a5" : "#a7f3d0",
                  background: newsletterError
                    ? "rgba(239, 68, 68, 0.15)"
                    : "rgba(16, 185, 129, 0.15)",
                  padding: "8px 16px",
                  display: "inline-block",
                }}
              >
                {newsletterMsg}
              </p>
            )}
          </div>
        </section>
      </div>

      {/* ============ FOOTER ============ */}
      <Footer />
    </div>
  );
};

export default HomeScreen;