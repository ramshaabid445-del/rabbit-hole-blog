import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo-text">The <span>Rabbit</span> Hole</div>
              <p className="footer-desc">Exploring the mysteries of consciousness, reality, and the hidden patterns that connect everything in our universe.</p>
            </div>
            <div className="footer-col">
              <h4>Explore</h4>
              <ul>
                <li><a href="/articles">Articles</a></li>
                <li><a href="/categories">Categories</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Connect</h4>
              <ul>
                <li><a href="/twitter">Twitter</a></li>
                <li><a href="/discord">Discord</a></li>
                <li><a href="/github">GitHub</a></li>
                <li><a href="/rss">RSS Feed</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <ul>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
                <li><a href="/faq">FAQ</a></li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="footer-bottom d-flex align-items-center justify-content-between">
            <span>© 2025 The Rabbit Hole. All rights reserved.</span>
            <div className="footer-social">
              <a href="/twitter">𝕏</a>
              <a href="/discord">◆</a>
              <a href="/github">⌘</a>
              <a href="/rss">⎊</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
