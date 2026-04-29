  <script type="module">
    import { initializeApp } from "firebase/app";
    import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";

    // ======================== ⚠️ REPLACE WITH YOUR FIREBASE CONFIG ========================
    // Go to Firebase console -> Project settings -> General -> Your web app config
    const firebaseConfig = {
        apiKey: "AIzaSyD_g49suLWESZZ377AxsL2G8JTcEBGT0tI",
        authDomain: "outage-login-947d8.firebaseapp.com",
        projectId: "outage-login-947d8",
        appId: "1:436354690312:web:3ed241912899af6a1450bd"
    };
    // 🔥 IMPORTANT: Replace the placeholder values above with your real Firebase config.
    // ====================================================================================

    // Initialize Firebase (will error if config invalid, but code ready for production)
    let app, auth;
    try {
      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      console.log("Firebase initialized successfully");
    } catch (err) {
      console.error("Firebase init error: check your config", err);
      const errorDiv = document.getElementById('error-message');
      errorDiv.innerText = "Firebase configuration missing. Update firebaseConfig in script.";
      errorDiv.style.display = 'block';
    }

    // DOM Elements
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');
    const errorMsgDiv = document.getElementById('error-message');
    const aiLoader = document.getElementById('aiLoading');
    const googleBtn = document.getElementById('googleSignInBtn');
    const forgotLink = document.getElementById('forgotPasswordLink');
    const forgotModal = document.getElementById('forgotPasswordModal');
    const registerBtn = document.getElementById('registerButton');
    const registerModal = document.getElementById('registerModal');
    const sendResetBtn = document.getElementById('sendResetButton');
    const resetEmailField = document.getElementById('resetEmail');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const pwdField = document.getElementById('password');

    // Helper: show/hide loader & error
    function setLoading(loading) {
      if (loading) {
        aiLoader.classList.add('active');
        errorMsgDiv.style.display = 'none';
      } else {
        aiLoader.classList.remove('active');
      }
    }

    function showError(message) {
      errorMsgDiv.innerText = message;
      errorMsgDiv.style.display = 'block';
    }

    // ---------- Email/Password Login ----------
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!auth) {
        showError("Firebase not initialized. Check configuration.");
        return;
      }
      const email = emailInput.value.trim();
      const pwd = passwordInput.value;
      if (!email || !pwd) {
        showError("Please fill in both fields.");
        return;
      }
      setLoading(true);
      try {
        await signInWithEmailAndPassword(auth, email, pwd);
        // redirect on success
        window.location.href = "/dashboard";
      } catch (err) {
        setLoading(false);
        let friendlyMsg = "Access denied. Invalid credentials.";
        if (err.code === 'auth/user-not-found') friendlyMsg = "No account found with this email.";
        else if (err.code === 'auth/wrong-password') friendlyMsg = "Incorrect password. Try again.";
        else if (err.code === 'auth/invalid-email') friendlyMsg = "Invalid email format.";
        else if (err.code === 'auth/too-many-requests') friendlyMsg = "Too many attempts. Wait a moment.";
        else friendlyMsg = err.message || "Authentication failed.";
        showError(friendlyMsg);
      }
    });

    // ---------- Google Sign-In (Popup) ----------
    googleBtn.addEventListener('click', async () => {
      if (!auth) {
        showError("Firebase not ready. Please check configuration.");
        return;
      }
      setLoading(true);
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        // success -> redirect
        window.location.href = "/dashboard";
      } catch (err) {
        setLoading(false);
        if (err.code === 'auth/popup-closed-by-user') {
          showError("Popup closed before completing sign in.");
        } else if (err.code === 'auth/unauthorized-domain') {
          showError("Google sign-in domain not authorized. Add your domain in Firebase Console.");
        } else {
          showError("Google sign-in failed: " + (err.message || "Try again later."));
        }
        console.error(err);
      }
    });

    // ---------- Password Reset via Email ----------
    sendResetBtn.addEventListener('click', async () => {
      const email = resetEmailField.value.trim();
      if (!email) {
        alert("Please enter your email address.");
        return;
      }
      if (!auth) {
        alert("Firebase not configured correctly.");
        return;
      }
      setLoading(true);
      try {
        await sendPasswordResetEmail(auth, email);
        setLoading(false);
        alert("✅ Password reset link sent! Check your email inbox.");
        forgotModal.classList.remove('active');
        resetEmailField.value = '';
      } catch (err) {
        setLoading(false);
        let errorMsg = "Unable to send reset email.";
        if (err.code === 'auth/user-not-found') errorMsg = "No account found with that email address.";
        else if (err.code === 'auth/invalid-email') errorMsg = "Invalid email format.";
        alert(errorMsg);
      }
    });

    // ---------- Auto-redirect if already logged in (dashboard protection) ----------
    if (auth) {
      onAuthStateChanged(auth, (user) => {
        if (user && window.location.pathname !== "/dashboard") {
          // if user already signed in and current page is login, redirect to dashboard
          window.location.href = "/dashboard";
        }
      });
    }

    // ---------- Modals logic ----------
    forgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      forgotModal.classList.add('active');
    });

    registerBtn.addEventListener('click', () => {
      registerModal.classList.add('active');
    });

    // Close modals when clicking overlay
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
      }
    });

    // Prevent modal content click propagation
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => e.stopPropagation());
    });

    // ---------- Password visibility toggle (fixed icon) ----------
    if (togglePasswordBtn && pwdField) {
      togglePasswordBtn.addEventListener('click', () => {
        const type = pwdField.getAttribute('type') === 'password' ? 'text' : 'password';
        pwdField.setAttribute('type', type);
        const iconSpan = togglePasswordBtn.querySelector('.material-icons-round');
        if (type === 'password') {
          iconSpan.textContent = 'visibility_off';
        } else {
          iconSpan.textContent = 'visibility';
        }
      });
    }

    // ---------- Theme toggle (dark/light mode) ----------
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    function applyTheme(theme) {
      if (theme === 'dark') {
        htmlElement.classList.remove('light');
        htmlElement.classList.add('dark');
        themeIcon.textContent = 'light_mode';
      } else {
        htmlElement.classList.remove('dark');
        htmlElement.classList.add('light');
        themeIcon.textContent = 'dark_mode';
      }
      localStorage.setItem('theme', theme);
    }

    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(storedTheme || (prefersDark ? 'dark' : 'light'));

    themeToggle.addEventListener('click', () => {
      const isDark = htmlElement.classList.contains('dark');
      applyTheme(isDark ? 'light' : 'dark');
    });

    // small fix: ensure any forced autocomplete style does not break
    console.log("ViPeR login interface ready — Firebase integrated");
  </script>