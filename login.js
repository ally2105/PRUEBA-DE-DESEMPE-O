/*  login.js
 *  Handles the login view of the SPA
 *  – Renders the form
 *  – Submits credentials to json‑server
 *  – Stores the session in localStorage
 *  – Redirects to #/dashboard on success
 */

import { loginUser } from '../api.js';   // REST helper: GET /users?email&password
import { saveSession } from '../auth.js';// Persists the logged‑in user in localStorage

/*-------------------------------------------------------------------
  Factory function ➜ returns { html, init }
  The router will insert html into <div id="app"> and then call init()
-------------------------------------------------------------------*/
export default ({ showToast }) => ({

  /* ---------- Mark‑up injected into the page ---------- */
  html: `
    <h2>Login</h2>

    <form id="fLogin">
      <!-- e‑mail field -->
      <input name="email"    type="email"    placeholder="Correo"       required />
      <!-- password field -->
      <input name="password" type="password" placeholder="Contraseña"  required />

      <button class="primary">Entrar</button>
    </form>

    <!-- error message, hidden by default -->
    <p id="err" style="color:red;display:none;">
      Credenciales incorrectas
    </p>
  `,

  /* ---------- Runs after the HTML is in the DOM ---------- */
  init() {
    document.getElementById('fLogin').onsubmit = async e => {
      e.preventDefault();                            // stop page reload

      /* Collect form data */
      const fd = new FormData(e.target);

      /* Ask json‑server if such user exists  */
      const u = await loginUser(fd.get('email'), fd.get('password'));

      if (u) {
        /* Success ---------------------------------------------------- */
        saveSession(u);                              // keep user in localStorage
        showToast('¡Bienvenido!');                   // optional toast feedback
        location.hash = '#/dashboard';               // route to dashboard
      } else {
        /* Failure ---------------------------------------------------- */
        /* show the hidden error paragraph */
        document.getElementById('err').style.display = 'block';
      }
    };
  }
});