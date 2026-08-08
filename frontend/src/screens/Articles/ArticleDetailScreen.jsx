import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SubscribeModal from '../../components/SubscribeModal';
import '../../styles/Articles.css';

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

const ArticleDetailScreen = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentMessage, setCommentMessage] = useState("");

  // Fetch article from backend API
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`https://rabbit-hole-blog-production.up.railway.app/api/articles/${id}`);
        if (!res.ok) {
          setArticle(null);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  // Check if this article is saved by the subscriber
  useEffect(() => {
    const subscriberEmail = localStorage.getItem("subscriberEmail");
    if (!subscriberEmail || !article) return;

    const checkSaved = async () => {
      try {
        const res = await fetch(
          `https://rabbit-hole-blog-production.up.railway.app/api/subscribe/saved-articles/${subscriberEmail}`
        );
        if (res.ok) {
          const savedArticles = await res.json();
          const isSaved = savedArticles.some(
            (a) => String(a._id) === String(article._id)
          );
          setSaved(isSaved);
        }
      } catch (error) {
        console.error("Error checking saved status:", error);
      }
    };
    checkSaved();
  }, [article]);

  // Fetch comments for this article
  useEffect(() => {
    const fetchComments = async () => {
      if (!article || !article._id) return;

      try {
        const res = await fetch(`https://rabbit-hole-blog-production.up.railway.app/api/comments/${article._id}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [article]);

  // Post comment
  const handlePostComment = async (e) => {
    e.preventDefault();
    setCommentMessage("");

    if (!commentName.trim() || !commentEmail.trim() || !commentText.trim()) {
      setCommentMessage("Please fill in all fields.");
      return;
    }

    setCommentLoading(true);

    try {
      const payload = {
        postId: String(article._id),
        postTitle: article.title,
        name: commentName,
        email: commentEmail,
        comment: commentText,
      };

      const res = await fetch("https://rabbit-hole-blog-production.up.railway.app/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseText = await res.text();
      console.log("Comment response status:", res.status);
      console.log("Comment response body:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse response as JSON:", parseError);
        throw new Error("Backend error: Comment system not available.");
      }

      if (res.ok) {
        setCommentMessage("Comment posted! Waiting for admin approval.");
        setCommentName("");
        setCommentEmail("");
        setCommentText("");
      } else {
        const errorMsg = data && data.message ? data.message : "Failed to post comment.";
        setCommentMessage("Error (" + res.status + "): " + errorMsg);
        console.error("Comment error response:", data);
      }
    } catch (error) {
      console.error("Comment post error:", error);
      setCommentMessage("Error: " + error.message);
    } finally {
      setCommentLoading(false);
      setTimeout(() => setCommentMessage(""), 4000);
    }
  };

  // Toggle save article
  const handleSaveArticle = async () => {
    const subscriberEmail = localStorage.getItem("subscriberEmail");

    // If not subscribed, show modal
    if (!subscriberEmail) {
      setIsSubscribeModalOpen(true);
      return;
    }

    try {
      const res = await fetch("https://rabbit-hole-blog-production.up.railway.app/api/subscribe/save-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: subscriberEmail, articleId: article._id }),
      });

      if (res.ok) {
        const data = await res.json();
        setSaved(data.saved);
      }
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  if (loading) {
    return (
      <div className="article-detail-screen">
        <Navbar />
        <div className="article-detail-notfound">
          <h2>Loading...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-detail-screen">
        <Navbar />
        <div className="article-detail-notfound">
          <h2>Article not found</h2>
          <Link to="/articles" className="article-detail-back">
            ← Back to Articles
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Determine if "Last updated" should be shown
  const createdAt = article.createdAt;
  const updatedAt = article.updatedAt;
  const showUpdated = updatedAt && createdAt && new Date(updatedAt).getTime() !== new Date(createdAt).getTime();

  return (
    <div className="article-detail-screen">
      <Navbar />

      <section className="article-detail-hero">
        <div className="article-detail-header">
          <div className="article-detail-top-nav">
            <Link to="/articles" className="article-detail-back">
              ← Back to Articles
            </Link>
            <span className="article-detail-badge">{article.category}</span>
          </div>
          
          <div className="article-detail-title-wrapper">
            <h1 className="article-detail-title">{article.title}</h1>
          </div>
          
          <div className="article-detail-meta">
            <span>📅 {formatDate(createdAt)}</span>
            {showUpdated && (
              <span className="article-detail-updated">🔄 Last updated: {formatDate(updatedAt)}</span>
            )}
            <span>📖 {article.readTime}</span>
            <span>👁️ {formatViews(article.views)} reads</span>
            {/* Save / Bookmark button */}
            <button
              className={`article-save-btn ${saved ? "saved" : ""}`}
              onClick={handleSaveArticle}
              title={saved ? "Remove from saved" : "Save article"}
            >
              {saved ? "🔖 Saved" : "🔖 Save"}
            </button>
          </div>
        </div>

        <div className="article-detail-featured-image">
          <img src={article.image} alt={article.title} />
        </div>
      </section>

      <section className="article-detail-body">
        <div className="article-content-wrapper">
          {article.content.map((paragraph, index) => {
            const isBlockquote = paragraph.includes('<blockquote>');
            
            return (
              <div key={index} className="article-content-block">
                {isBlockquote ? (
                  <div
                    className="article-blockquote"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                )}
                
                {/* Insert inline images after certain paragraphs (max 3 total).
                    Skip any image that is the same as the featured/card image
                    to prevent duplicates. */}
                {!isBlockquote && article.images && article.images.length > 0 && (() => {
                  // Filter out images that match the main featured image
                  const uniqueImages = article.images.filter(
                    (img) => img !== article.image
                  );
                  return (
                    <>
                      {index === 2 && uniqueImages[0] && (
                        <div className="article-inline-image">
                          <img 
                            src={uniqueImages[0]} 
                            alt={`${article.title} - Illustration 1`}
                          />
                        </div>
                      )}
                      {index === 6 && uniqueImages[1] && (
                        <div className="article-inline-image">
                          <img 
                            src={uniqueImages[1]} 
                            alt={`${article.title} - Illustration 2`}
                          />
                        </div>
                      )}
                      {index === 10 && uniqueImages[2] && (
                        <div className="article-inline-image">
                          <img 
                            src={uniqueImages[2]} 
                            alt={`${article.title} - Illustration 3`}
                          />
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            );
          })}
        </div>
      </section>

      <div className="article-detail-cta">
        <Link to="/articles" className="article-cta-button">
          ← Read More Articles
        </Link>
      </div>

      {/* ============ COMMENTS SECTION ============ */}
      <section className="article-comments-section">
        <div className="article-comments-container">
          <h3 className="comments-title">Comments</h3>
          <p className="comments-subtitle">Join the conversation — share your thoughts below.</p>

          <form className="comment-form" onSubmit={handlePostComment}>
            <div className="comment-form-row">
              <input
                type="text"
                placeholder="Your name"
                className="comment-input"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email address"
                className="comment-input"
                value={commentEmail}
                onChange={(e) => setCommentEmail(e.target.value)}
                required
              />
            </div>
            <textarea
              placeholder="Write your comment..."
              className="comment-textarea"
              rows="4"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            ></textarea>
            <button type="submit" className="comment-submit-btn" disabled={commentLoading}>
              {commentLoading ? "Posting..." : "Post Comment"}
            </button>
          </form>

          {commentMessage && (
            <p className="comment-message" style={{
              marginTop: "12px",
              fontSize: "13px",
              color: commentMessage.includes("success") || commentMessage.includes("posted") ? "#10b981" : "#ef4444",
              background: commentMessage.includes("success") || commentMessage.includes("posted") ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
              padding: "8px 16px",
              borderRadius: "0",
              display: "inline-block",
            }}>
              {commentMessage}
            </p>
          )}

          <div className="comments-divider"></div>

          <div className="comments-list">
            {comments.length === 0 ? (
              <p className="comments-empty">No comments yet. Be the first to share your thoughts!</p>
            ) : (
              comments.map((c) => (
                <div key={c._id || c.id} className="comment-item">
                  <div className="comment-avatar">
                    {c.name ? c.name[0].toUpperCase() : "U"}
                  </div>
                  <div className="comment-body">
                    <div className="comment-header">
                      <span className="comment-author">{c.name}</span>
                      <span className="comment-date">{formatDate(c.createdAt)}</span>
                    </div>
                    <p className="comment-text">{c.comment}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />

      {/* Subscribe Modal — shown when unsubscribed user tries to save */}
      <SubscribeModal
        isOpen={isSubscribeModalOpen}
        onClose={() => setIsSubscribeModalOpen(false)}
      />
    </div>
  );
};

export default ArticleDetailScreen;