import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'; 
import articlesData from '../data/articlesData';
import SubscribeModal from './SubscribeModal';
import './Navbar.css';

const Navbar = () => {
  const [isSidePanel, setIsSidePanel] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const searchResults = articlesData.filter((article) => {
    const q = searchQuery.toLowerCase();
    if (!q) return false;
    return (
      article.title.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q) ||
      article.category.toLowerCase().includes(q)
    );
  });

  // All pages now use the light theme, so navbar always uses light style
  const lightPages = ['/', '/articles', '/categories', '/about', '/contact', '/saved-blogs'];
  const isLightPage = true; // All pages are light now

  // Close side panel on route change
  useEffect(() => {
    setIsSidePanel(false);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSidePanel) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isSidePanel]);

  return (
    <>
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isLightPage ? 'navbar-light' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <button 
            className={`hamburger ${isSidePanel ? 'active' : ''}`}
            onClick={() => setIsSidePanel(!isSidePanel)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <Link to="/" className="navbar-logo">
            The <span>Rabbit</span> Hole
          </Link>
        </div>

        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" end className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/articles" className="nav-link">Articles</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/categories" className="nav-link">Categories</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/saved-blogs" className="nav-link">Saved Blogs</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link">About</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className="nav-link">Contact</NavLink>
          </li>
        </ul>

        {isSearchOpen ? (
          <div className="nav-actions-wrapper">
            <input
              type="text"
              className="navbar-search-input-inline"
              placeholder="Search articles, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button className="nav-search-close" onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} aria-label="Close search">
              ✕
            </button>
          </div>
        ) : (
          <div className="nav-actions-wrapper">
            <button className="nav-search-btn" onClick={() => setIsSearchOpen(true)} aria-label="Search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <button className="subscribe-btn" onClick={() => setIsSubscribeModalOpen(true)}>Subscribe</button>
          </div>
        )}

        {isSearchOpen && searchQuery.trim().length > 0 && (
          <div className="navbar-search-dropdown">
            <div className="navbar-search-results">
              {searchResults.length > 0 ? (
                searchResults.slice(0, 6).map((article) => (
                  <Link
                    key={article.id}
                    to={`/articles/${article.id}`}
                    className="navbar-search-result-item"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <span className="navbar-search-result-category">{article.category}</span>
                    <span className="navbar-search-result-title">{article.title}</span>
                  </Link>
                ))
              ) : (
                <div className="navbar-search-no-results">No results found</div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className={`side-overlay ${isSidePanel ? 'active' : ''}`} onClick={() => setIsSidePanel(false)}></div>
      
      <div className={`side-panel ${isSidePanel ? 'active' : ''}`}>
        <div className="side-panel-header">
          <span className="side-panel-logo">The <span>Rabbit</span> Hole</span>
          <button className="side-close" onClick={() => setIsSidePanel(false)}>✕</button>
        </div>
        <ul className="side-menu">
          <li><Link to="/dashboard" onClick={() => setIsSidePanel(false)}><span className="side-icon">📊</span> Dashboard</Link></li>
          {isMobile && (
            <>
              <li><Link to="/" onClick={() => setIsSidePanel(false)}><span className="side-icon">🏠</span> Home</Link></li>
              <li><Link to="/articles" onClick={() => setIsSidePanel(false)}><span className="side-icon">📝</span> Articles</Link></li>
              <li><Link to="/categories" onClick={() => setIsSidePanel(false)}><span className="side-icon">📂</span> Categories</Link></li>
              <li><Link to="/saved-blogs" onClick={() => setIsSidePanel(false)}><span className="side-icon">🔖</span> Saved Blogs</Link></li>
              <li><Link to="/about" onClick={() => setIsSidePanel(false)}><span className="side-icon">ℹ️</span> About</Link></li>
              <li><Link to="/contact" onClick={() => setIsSidePanel(false)}><span className="side-icon">📧</span> Contact</Link></li>
            </>
          )}
        </ul>
        <div className="side-panel-footer">
          <span>© 2025 The Rabbit Hole</span>
        </div>
      </div>
    </nav>
      <SubscribeModal
        isOpen={isSubscribeModalOpen}
        onClose={() => setIsSubscribeModalOpen(false)}
      />
    </>
  );
};

export default Navbar;