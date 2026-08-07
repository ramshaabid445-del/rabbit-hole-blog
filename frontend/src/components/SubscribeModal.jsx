import React, { useState } from "react";
import "./SubscribeModal.css";

/**
 * SubscribeModal Component
 * A modal popup for email subscription.
 * Matches the styling of the "Join the Journey" newsletter section on the Home page.
 *
 * Props:
 *   isOpen  - boolean controlling modal visibility
 *   onClose - function to close the modal
 */
const SubscribeModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Close modal when clicking the overlay background
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        // Success — save email to localStorage for future use (e.g. comments)
        localStorage.setItem("subscriberEmail", email);
        setMessage(data.message || "Subscribed successfully!");
        setIsError(false);
        // Auto-close modal after a short delay on success
        setTimeout(() => {
          onClose();
          setMessage("");
          setEmail("");
        }, 1500);
      } else {
        setMessage(data.message || "Something went wrong. Please try again.");
        setIsError(true);
      }
    } catch (error) {
      setMessage("Server error. Please try again later.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="subscribe-modal-overlay" onClick={handleOverlayClick}>
      <div className="subscribe-modal">
        {/* Close button */}
        <button className="subscribe-modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="subscribe-modal-content">
          <div className="subscribe-modal-icon">✉️</div>
          <h2 className="subscribe-modal-title">Join the Journey</h2>
          <p className="subscribe-modal-text">
            Subscribe to receive weekly insights, exclusive content, and early access to new articles.
          </p>

          <form className="subscribe-modal-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="subscribe-modal-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="subscribe-modal-btn" disabled={loading}>
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {message && (
            <p className={`subscribe-modal-message ${isError ? "error" : "success"}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscribeModal;