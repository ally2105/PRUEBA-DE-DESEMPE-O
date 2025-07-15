/*  auth.js
 *  Session management using localStorage
 *  Provides helper functions to store, read, and check the current user
 */

const KEY = 'currentUser'; // LocalStorage key used for session

/*--------------------------------------------------------------
  saveSession(user)
  Stores the user object in localStorage as a JSON string
--------------------------------------------------------------*/
export const saveSession = u => localStorage.setItem(KEY, JSON.stringify(u));

/*--------------------------------------------------------------
  clearSession()
  Removes the session from localStorage (logout)
--------------------------------------------------------------*/
export const clearSession = () => localStorage.removeItem(KEY);

/*--------------------------------------------------------------
  getSession()
  Reads the stored session from localStorage and parses it
  Returns null if not found
--------------------------------------------------------------*/
export const getSession = () => JSON.parse(localStorage.getItem(KEY) || 'null');

/*--------------------------------------------------------------
  isLoggedIn()
  Returns true if a session exists (i.e., user is logged in)
--------------------------------------------------------------*/
export const isLoggedIn = () => !!getSession();

/*--------------------------------------------------------------
  isAdmin()
  Returns true if the current session user has role === 'admin'
--------------------------------------------------------------*/
export const isAdmin = () => getSession()?.role === 'admin';
