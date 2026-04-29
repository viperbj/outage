import { auth, onAuthStateChanged } from "./firebase.JS";

const SESSION_LIMIT = 8 * 60 * 60 * 1000; // 8 hours

onAuthStateChanged(auth, (user) => {

  if (user) {

    const loginTime = localStorage.getItem("loginTime");

    if (!loginTime) {
      localStorage.setItem("loginTime", Date.now());
      return;
    }

    if (Date.now() - loginTime > SESSION_LIMIT) {
      localStorage.clear();
      auth.signOut();
      window.location.href = "/login/";
    }

  } else {

    const fullPath = window.location.pathname;
    window.location.href = `/login/?redirect=${encodeURIComponent(fullPath)}`;
  }

});