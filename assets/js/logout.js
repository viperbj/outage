import { auth, signOut } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".logoutBtn").forEach(btn => {
    btn.addEventListener("click", async () => {
      await signOut(auth);
      localStorage.clear();
      window.location.href = "/login/";
    });
  });
});