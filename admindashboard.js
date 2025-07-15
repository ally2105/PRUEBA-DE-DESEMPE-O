
import { clearSession, getSession } from '../auth.js';   // Helpers to log out and get user
import { getUsers, deleteUser } from '../api.js';    // 

// Function that generates the administrator view
export default (ctx = {}) => {
 // Extract the showToast function from the context, or use an empty one if not passed
  const { showToast = () => { } } = ctx;

  return {
   // HTML to be inserted into the <div id="app">
    html: `
    <h2>CREATE EVENT<h2>

    <form id="crud">
    <input name="Nombre del evento"    type="text"    placeholder="Nombre del evento"       required />   
    <input name="fecha del evento" type="date" placeholder="fecha del evento" required />
    <input name ="hora del evento" type ="time" placeholder="hora del evento" required />
    <button class="primary">AGREGAR EVENTO</button>
    <button class="secondary" id="btnLogout">Cerrar sesión</button>
    </form>`,
    // Add the logout event
    init() {
      document.getElementById('btnLogout').onclick = e => {
        e.preventDefault(); // Prevents the default behavior of the button
        clearSession(); //Clear the session
        location.hash = '#/login'; // Redirects to login
      };
    }
  };
};