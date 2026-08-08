import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SubscribeModal from '../../components/SubscribeModal';
import '../../styles/ContactScreen.css';

const ContactScreen = () => {
  const location = useLocation();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

  // Pre-fill subject if navigated from "Ask About Premium" button
  useEffect(() => {
    if (location.state?.subject) {
      setForm((prev) => ({ ...prev, subject: location.state.subject }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch("https://rabbit-hole-blog-production.up.railway.app/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Message sent successfully!");
        setIsError(false);
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setMessage(data.message || "Something went wrong, please try again");
        setIsError(true);
      }
    } catch (error) {
      setMessage("Something went wrong, please try again");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-screen">
      <Navbar />

      {/* ============ CONTACT HERO / FORM SECTION ============ */}
      <section className="contact-section" id="contact">
        <div className="contact-container">

          {/* LEFT SIDE */}
          <div className="contact-left">
            <span className="contact-eyebrow">Let's Connect</span>
            <h1 className="contact-title">
              Have a Question, Idea or Just Want to{' '}
              <span className="contact-title-brand">Say Hello?</span>
            </h1>
            <p className="contact-desc">
              I'd love to hear from you. Whether it's a question, suggestion,
              collaboration or just a friendly message.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <span className="contact-info-icon">✉️</span>
                <div>
                  <h4>Email</h4>
                  <p>ramsh.blogs@gmail.com</p>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-icon">⏱️</span>
                <div>
                  <h4>Response Time</h4>
                  <p>Usually within 24–48 hours</p>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-icon">📍</span>
                <div>
                  <h4>Location</h4>
                  <p>Somewhere on Earth</p>
                </div>
              </div>
            </div>

            <div className="contact-image-wrapper">
              <img src="/images/about2.jpeg" alt="Contact" className="contact-image" />
              <div className="contact-image-glow"></div>
              <div className="contact-quote-card">
                <p>"The most beautiful thing we can experience is the mysterious."</p>
                <span>— Albert Einstein</span>
              </div>
            </div>
          </div>

          {/* MIDDLE - FORM */}
          <div className="contact-form-card">
            <h2 className="contact-form-title">Send a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact-form-group">
                  <label>Your Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact-form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-form-group contact-form-message">
                <label>Message</label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Write your message here..."
                  value={form.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

                <button type="submit" className="contact-send-btn d-inline-flex align-items-center justify-content-center" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'} <span className="send-icon">➤</span>
                </button>
                {message && (
                  <p
                    style={{
                      marginTop: "16px",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: isError ? "#fca5a5" : "#10b981",
                      background: isError
                        ? "rgba(239, 68, 68, 0.1)"
                        : "rgba(16, 185, 129, 0.1)",
                      padding: "10px 16px",
                      textAlign: "center",
                    }}
                  >
                    {message}
                  </p>
                )}
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="contact-right">
            <div className="connect-card">
              <h3>Other Ways to Connect</h3>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="connect-item">
                <span className="connect-icon">𝕏</span>
                <div>
                  <h4>Twitter / X</h4>
                  <span>@novum_blog</span>
                </div>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="connect-item">
                <span className="connect-icon">📷</span>
                <div>
                  <h4>Instagram</h4>
                  <span>@novum.blog</span>
                </div>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="connect-item">
                <span className="connect-icon">▶️</span>
                <div>
                  <h4>YouTube</h4>
                  <span>Rabbit Hole Explorer</span>
                </div>
              </a>

              <div className="connect-newsletter">
                <h4>Newsletter</h4>
                <p>Stay updated with our latest thoughts</p>
                <button className="join-newsletter-btn" onClick={() => setIsSubscribeModalOpen(true)}>Join Newsletter →</button>
              </div>
            </div>

            <div className="contact-side-quote">
              <span className="quote-mark">"</span>
              <p>The most beautiful thing we can experience is the mysterious.</p>
              <span className="quote-author">— Albert Einstein</span>
            </div>
          </div>

        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <Footer />

      {/* Subscribe Modal — reused from Navbar */}
      <SubscribeModal
        isOpen={isSubscribeModalOpen}
        onClose={() => setIsSubscribeModalOpen(false)}
      />
    </div>
  );
};

export default ContactScreen;
