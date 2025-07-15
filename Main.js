/*  Main.js
 *  Core SPA controller
 *  – Handles route changes and view mounting
 *  – Manages toast notifications
 *  – Includes dark/light theme toggle
 */

import routes from './routes.js';     // Hash-based route mapping
import { isLoggedIn } from './auth.js'; // Session check helper

// DOM references
const root = document.getElementById('app');           // main view container
const toast = document.getElementById('toast');        // toast message box
const modeToggle = document.getElementById('mode-toggle'); // dark mode toggle button

/*--------------------------------------------------------------
  showToast(message)
  Shows a toast message for 2.5 seconds
--------------------------------------------------------------*/
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

/*--------------------------------------------------------------
  mount(route)
  - Renders the view associated with the current hash
  - Blocks access to /dashboard if not logged in
  - Passes showToast helper to views
--------------------------------------------------------------*/
export function mount(route) {
  // Protect dashboard route
  if (route.startsWith('#/dashboard') && !isLoggedIn()) {
    location.hash = '#/login';
    return;
  }

  // Load matching view or fallback 404
  const view = routes[route] || routes['#/404'];

  // Destructure view's HTML and init function
  const { html, init } = view({ showToast });

  // Inject HTML into <div id="app">
  root.innerHTML = html;

  // Run the view's init logic, if provided
  init?.();
}

/*--------------------------------------------------------------
  Event listeners
  - On page load → mount current hash or default to /login
  - On hash change → mount corresponding view
--------------------------------------------------------------*/
window.addEventListener('DOMContentLoaded', () => mount(location.hash || '#/login'));
window.addEventListener('hashchange', ()      => mount(location.hash));

/*--------------------------------------------------------------
  Dark mode toggle
  - Reads preference from localStorage
  - Updates DOM and toggles icon
--------------------------------------------------------------*/
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  modeToggle.textContent = '☀️'; // sun icon
}

modeToggle.onclick = () => {
  document.body.classList.toggle('dark');
  const dark = document.body.classList.contains('dark');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
  modeToggle.textContent = dark ? '☀️' : '🌙'; // switch icon accordingly
};
