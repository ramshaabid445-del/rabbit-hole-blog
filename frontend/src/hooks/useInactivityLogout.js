import { useEffect } from 'react';

/**
 * useInactivityLogout.js
 * Custom hook that automatically logs out the admin after a period of inactivity.
 *
 * - Tracks a timer (setTimeout) set for INACTIVITY_LIMIT milliseconds.
 * - Resets the timer whenever any activity event fires (mousemove, keydown,
 *   click, scroll, touchstart).
 * - If no activity occurs within the limit, clears the admin token from
 *   localStorage, redirects to the admin login page, and shows a message.
 * - Cleans up all event listeners on component unmount to avoid memory leaks.
 *
 * Usage:
 *   useInactivityLogout();
 */

// Duration of inactivity (in ms) before auto-logout.
// Currently set to 3 minutes — change this value to adjust the timeout.
const INACTIVITY_LIMIT = 3 * 60 * 1000; // 3 minutes

// Events that count as "user activity" — any of these resets the timer.
const ACTIVITY_EVENTS = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

// Message shown when the admin is auto-logged out.
const INACTIVITY_MESSAGE = "You've been logged out due to inactivity. Please login again.";

// Redirect URL — the admin dashboard route. Since the token is cleared,
// AdminDashboard will automatically show the login page.
const LOGIN_REDIRECT_URL = '/dashboard';

// --- Module-level singleton state ---
// Multiple admin components (AdminDashboard, AddEditBlog, etc.) may call this
// hook simultaneously because they render nested. We use module-level variables
// so only ONE shared timer and ONE set of event listeners run at a time.
let instanceCount = 0;        // How many components are currently using the hook
let sharedTimer = null;       // The single shared inactivity timer
let sharedHandleActivity = null; // The single activity handler attached to window

const useInactivityLogout = () => {
  useEffect(() => {
    // Only start the inactivity timer if the admin is logged in.
    // This prevents the timer from running on the login page itself.
    if (!localStorage.getItem('adminToken')) {
      return;
    }

    // Increment the instance counter — this component is now active.
    instanceCount += 1;

    /**
     * Clears the shared inactivity timer (if any).
     */
    const clearTimer = () => {
      if (sharedTimer) {
        clearTimeout(sharedTimer);
        sharedTimer = null;
      }
    };

    /**
     * Starts (or restarts) the shared inactivity timer.
     * When it fires, the admin is logged out automatically.
     */
    const startTimer = () => {
      clearTimer();
      sharedTimer = setTimeout(() => {
        // --- Admin has been inactive for INACTIVITY_LIMIT ---

        // 1. Clear the admin token & user data from localStorage
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');

        // 2. Show a message to the admin
        alert(INACTIVITY_MESSAGE);

        // 3. Redirect to the admin dashboard route.
        //    Since the token was removed above, AdminDashboard will
        //    automatically show the login page.
        window.location.href = LOGIN_REDIRECT_URL;
      }, INACTIVITY_LIMIT);
    };

    /**
     * Handler for any activity event — resets the inactivity timer.
     */
    const handleActivity = () => {
      startTimer();
    };

    // Start the timer on mount (shared across all instances).
    startTimer();

    // Only attach event listeners ONCE, on the first instance.
    // Subsequent instances reuse the same listeners/timer.
    if (instanceCount === 1) {
      sharedHandleActivity = handleActivity;
      ACTIVITY_EVENTS.forEach((event) => {
        window.addEventListener(event, sharedHandleActivity);
      });
    }

    // Cleanup on unmount:
    return () => {
      // Decrement the instance counter
      instanceCount -= 1;

      // If this was the LAST mounted instance, clear the timer and remove
      // all event listeners. Otherwise, leave them in place so the parent
      // component (e.g. AdminDashboard) keeps tracking inactivity.
      if (instanceCount <= 0) {
        clearTimer();
        if (sharedHandleActivity) {
          ACTIVITY_EVENTS.forEach((event) => {
            window.removeEventListener(event, sharedHandleActivity);
          });
          sharedHandleActivity = null;
        }
      }
    };
  }, []); // Empty dependency array — run once on mount, cleanup on unmount
};

export default useInactivityLogout;