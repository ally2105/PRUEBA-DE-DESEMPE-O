import loginV     from './views/login.js';
import regV       from './views/register.js';
import userDashV  from './views/userdashboard.js';
import adminDashV from './views/admindashboard.js';
import nfV        from './views/notfound.js';
import { isAdmin } from './auth.js';

export default {
  '#/':          loginV,
  '#/login':     loginV,
  '#/register':  regV,
  '#/dashboard': () => isAdmin() ? adminDashV() : userDashV(),
  '#/404':       nfV
};
