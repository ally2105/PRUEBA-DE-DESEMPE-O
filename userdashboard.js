/*  userdashboard.js
 *  View for normal logged‑in users
 *  – Displays a welcome message
 *  – Includes a logout button
 *  – Reads the current session from localStorage
 */

import { clearSession, getSession } from '../auth.js'; // session helpers

/*--------------------------------------------------------------
  Factory function → returns { html, init }
--------------------------------------------------------------*/
export default () => ({

  /* ---------- HTML content rendered in <div id="app"> ---------- */
  html: `
    <div class="user">
      <h2>Panel Usuario</h2>
      <!-- Dynamic greeting using current user's name -->
      <p>Hola ${getSession().name}!</p>

      <!-- Logout button -->
      <button id="out" class="primary">Cerrar sesión</button>
    </div>
  `,

  /* ---------- Logic executed after HTML is in the DOM ---------- */
  init() {
    document.getElementById('out').onclick = () => {
      clearSession();               // removes user from localStorage
      location.hash = '#/login';    // redirects to login route
    };
  }
});
