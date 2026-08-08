/**
 * adminAuth.js
 * Shared helper for authenticated API calls from admin dashboard.
 * Automatically adds JWT token to headers and handles 401 redirects.
 */

const API_BASE = "https://rabbit-hole-blog-production.up.railway.app/api";

/**
 * Get the auth headers with JWT token
 */
export const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Authenticated fetch wrapper
 * Automatically adds Authorization header and handles 401 responses.
 *
 * @param {string} url - API endpoint (e.g. "/admin/posts")
 * @param {object} options - fetch options (method, body, etc.)
 * @returns {Promise<object>} - parsed JSON response
 */
export const authFetch = async (url, options = {}) => {
  const fullUrl = url.startsWith("http") ? url : `${API_BASE}${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => ({}));

  // If 401 (unauthorized), clear token and redirect to login
  if (res.status === 401) {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    window.location.href = "/admin";
    throw new Error("Session expired. Please login again.");
  }

  return { res, data };
};

/**
 * Check if admin is logged in (token exists)
 */
export const isAdminLoggedIn = () => {
  return !!localStorage.getItem("adminToken");
};

/**
 * Logout - clear token and redirect
 */
export const logout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");
  window.location.href = "/admin";
};