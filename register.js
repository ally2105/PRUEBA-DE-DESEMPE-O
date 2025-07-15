/*  register.js
 *  View that handles user sign‑up
 *  – Renders the registration form
 *  – Validates that both password fields match
 *  – Sends a POST /users to json‑server
 *  – Saves the new user in localStorage as the active session
 *  – Redirects to #/dashboard and shows a toast on success
 */

import { registerUser } from '../api.js';  // POST helper
import { saveSession }  from '../auth.js'; // session helper

/*--------------------------------------------------------------
  Factory function → returns { html, init }
--------------------------------------------------------------*/
export default ({ showToast }) => ({

  /* ---------- HTML template inserted into #app ---------- */
  html: `
    <h2>Registro</h2>

    <form id="fReg">
      <!-- basic info -->
      <input name="name"     placeholder="Nombre"        required />
      <input name="email"    type="email"    placeholder="Correo"        required />

      <!-- password + confirmation -->
      <input name="password"  type="password" placeholder="Contraseña"            required />
      <input name="password2" type="password" placeholder="Confirmar contraseña"  required />

      <button class="primary">Registrarme</button>
    </form>

    <!-- error text, hidden until needed -->
    <p id="err" style="color:red; display:none;">
      Las contraseñas no coinciden
    </p>
  `,

  /* ---------- Runs once the markup is in the DOM ---------- */
  init() {
    document.getElementById('fReg').onsubmit = async e => {
      e.preventDefault();

      /* Gather field values */
      const fd = new FormData(e.target);

      /* 1. Validate matching passwords */
      if (fd.get('password') !== fd.get('password2')) {
        document.getElementById('err').style.display = 'block';
        return;                         // abort submission
      }
      document.getElementById('err').style.display = 'none';

      /* 2. Call API to create the user (POST /users)          */
      const newUser = await registerUser({
        name:     fd.get('name'),
        email:    fd.get('email'),
        password: fd.get('password')
      });

      /* 3. Persist session & feedback                         */
      saveSession(newUser);             // store in localStorage
      showToast('Registro exitoso');    // small notification
      location.hash = '#/dashboard';    // go to main panel
    };
  }
});
