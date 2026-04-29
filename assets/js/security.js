// ===================== FRONTEND SECURITY MODULE =====================
(function() {
    // 1. Disable right-click on non‑editable elements
    document.addEventListener('contextmenu', function(e) {
        const tag = e.target.tagName.toLowerCase();
        const isEditable = e.target.isContentEditable || 
                           (tag === 'input' && e.target.type !== 'checkbox' && e.target.type !== 'radio') || 
                           tag === 'textarea';
        if (!isEditable) {
            e.preventDefault();
        }
    });

    // 2. Block dangerous keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // F12
        if (e.key === 'F12' || e.code === 'F12') {
            e.preventDefault();
            return;
        }
        // Ctrl+Shift+I, J, C (DevTools)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.code === 'KeyI' || e.code === 'KeyJ' || e.code === 'KeyC')) {
            e.preventDefault();
            return;
        }
        // Ctrl+U (view source)
        if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.code === 'KeyU')) {
            e.preventDefault();
            return;
        }
        // Ctrl+S (save page)
        if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.code === 'KeyS')) {
            e.preventDefault();
            return;
        }
        // Ctrl+P (print)
        if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.code === 'KeyP')) {
            e.preventDefault();
            return;
        }
        // Ctrl+Shift+R (hard reload)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'R' || e.code === 'KeyR')) {
            e.preventDefault();
        }
    });

    // 3. Prevent dragging of images and iframes
    document.querySelectorAll('img, iframe').forEach(el => el.setAttribute('draggable', 'false'));
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG' || e.target.closest('iframe')) {
            e.preventDefault();
        }
    });

    // 4. DevTools detection (performance based)
    let devToolsOpen = false;
    function detectDevToolsByTiming() {
        const threshold = 160;
        const start = performance.now();
        debugger;  // Pauses execution only if DevTools is open
        const end = performance.now();
        if (end - start > threshold && !devToolsOpen) {
            devToolsOpen = true;
            // Optionally redirect or destroy session
            localStorage.removeItem('ai_notes_session_demo');
            window.location.href = "/login/index.html?blocked=devtools";
        } else if (end - start <= threshold) {
            devToolsOpen = false;
        }
    }
    setInterval(detectDevToolsByTiming, 2000);

    // 5. DevTools detection by window dimensions
    function detectDevToolsBySize() {
        const widthDiff = window.outerWidth - window.innerWidth;
        const heightDiff = window.outerHeight - window.innerHeight;
        if ((widthDiff > 200 || heightDiff > 200) && !devToolsOpen) {
            devToolsOpen = true;
            localStorage.removeItem('ai_notes_session_demo');
            window.location.href = "/login/index.html?blocked=devtools";
        }
    }
    setInterval(detectDevToolsBySize, 1500);

    // 6. Frame‑busting (prevent clickjacking / iframe embedding)
    if (window.self !== window.top) {
        window.top.location = window.self.location;
    }

    // 7. Disable copy/cut/paste on non‑input elements
    document.addEventListener('copy', function(e) {
        const target = e.target;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && !target.isContentEditable) {
            e.preventDefault();
        }
    });
    document.addEventListener('cut', function(e) {
        const target = e.target;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && !target.isContentEditable) {
            e.preventDefault();
        }
    });
    document.addEventListener('paste', function(e) {
        const target = e.target;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && !target.isContentEditable) {
            e.preventDefault();
        }
    });

    // 8. Silence most console methods to reduce information leakage (optional)
    if (typeof window.console !== "undefined") {
        const noop = () => {};
        const allowed = ['error']; // keep errors for debugging (can be removed)
        for (let method in console) {
            if (typeof console[method] === 'function' && !allowed.includes(method)) {
                console[method] = noop;
            }
        }
    }

    // 9. Additional CSS‑based protections (inject style)
    const style = document.createElement('style');
    style.textContent = `
        *:not(input):not(textarea):not([contenteditable="true"]) {
            user-select: none !important;
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
        }
        img, iframe {
            -webkit-user-drag: none;
            user-drag: none;
            draggable: false;
        }
    `;
    document.head.appendChild(style);
})();