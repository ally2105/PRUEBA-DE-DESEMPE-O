/*  api.js
 *  API utility functions to communicate with json‑server (mock backend)
 *  BASE: http://localhost:3000
 *  Resources: /users
 */

const BASE = 'http://localhost:3000'; // Root URL for all requests

/*--------------------------------------------------------------
  registerUser(user)
  Sends a POST to /users to create a new user with role: 'user'
--------------------------------------------------------------*/
export const registerUser = async u => {
  const res = await fetch(`${BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...u, role: 'user' }) // add role automatically
  });

  if (!res.ok) throw new Error('Error al registrar'); // basic error check
  return res.json(); // returns the saved user
};

/*--------------------------------------------------------------
  loginUser(email, password)
  Sends a GET to /users?email=...&password=...
  Returns the first user found, or null if not found
--------------------------------------------------------------*/
export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
  const data = await res.json();  // returns an array (json‑server simulates filtering)
  return data[0] || null;         // return the user or null if not found
};

/*--------------------------------------------------------------
  getUsers()
  GETs all users from the server
  Used in admin dashboard
--------------------------------------------------------------*/
export const getUsers = async () => {
  const res = await fetch(`${BASE}/users`);
  return res.json(); // returns full array of user objects
};

/*--------------------------------------------------------------
  deleteUser(id)
  Sends DELETE /users/:id
  Used to remove users in the admin panel
--------------------------------------------------------------*/
export const deleteUser = async id => {
  await fetch(`${BASE}/users/${id}`, { method: 'DELETE' });
};
