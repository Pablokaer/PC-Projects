// ========================
// Hamburger Nav
// ========================
(function () {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    const overlay = document.querySelector('.nav-overlay');
    if (!toggle || !nav || !overlay) return;

    const open = () => {
        nav.classList.add('nav-open');
        overlay.classList.add('active');
        toggle.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    };

    const close = () => {
        nav.classList.remove('nav-open');
        overlay.classList.remove('active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () =>
        nav.classList.contains('nav-open') ? close() : open()
    );

    overlay.addEventListener('click', close);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });

    // Close drawer when a link is clicked (SPA-style nav)
    nav.querySelectorAll('.nav-link').forEach((link) =>
        link.addEventListener('click', close)
    );
})();


(function () {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    els.forEach((el) => observer.observe(el));
})();

// ========================
// Progress Bar Fill
// ========================
(function () {
    const fills = document.querySelectorAll('.progress-fill[data-width]');
    if (!fills.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.width = entry.target.dataset.width + '%';
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );

    fills.forEach((el) => observer.observe(el));
})();

/* ======================== */
/* Scroll-driven UI         */
/* ======================== */
(() => {
    const header = document.querySelector('.header');
    const bar    = document.getElementById('scroll-progress');
    const btn    = document.getElementById('back-to-top');
    let rafId    = null;

    function update() {
        rafId = null;
        const y     = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;

        if (header) header.classList.toggle('scrolled', y > 20);
        if (bar)    bar.style.width = total > 0 ? (y / total * 100) + '%' : '0%';
        if (btn)    btn.classList.toggle('visible', y > 300);
    }

    window.addEventListener('scroll', () => {
        if (!rafId) rafId = requestAnimationFrame(update);
    }, { passive: true });

    update();

    if (btn) btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ========================
// Active Nav Link
// ========================
(function () {
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach((link) => {
        if (link.getAttribute('href') === page) {
            link.classList.add('nav-link-active');
        }
    });
})();

/* ======================== */
/* Typewriter — Hero        */
/* ======================== */
(() => {
    const el = document.querySelector('.hero-greeting');
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const phrases = [
        el.textContent.trim(),
        'Desenvolvedor & Criador',
        'Bem-vindo ao meu espaço',
    ];
    let idx = 0;
    let charIdx = 0;
    let deleting = false;
    const pause = 3000;
    const typeSpeed = 55;
    const deleteSpeed = 32;

    function tick() {
        const current = phrases[idx];
        if (deleting) {
            charIdx--;
            el.textContent = current.slice(0, charIdx);
            if (charIdx === 0) {
                deleting = false;
                idx = (idx + 1) % phrases.length;
                charIdx = 0;
                setTimeout(tick, 300);
                return;
            }
            setTimeout(tick, deleteSpeed);
        } else {
            charIdx++;
            el.textContent = current.slice(0, charIdx);
            if (charIdx === current.length) {
                setTimeout(() => { deleting = true; tick(); }, pause);
                return;
            }
            setTimeout(tick, typeSpeed);
        }
    }

    // Start after hero entrance animation settles
    el.classList.add('typing');
    setTimeout(tick, 1200);
})();

/* ======================== */
/* Scroll Inertia           */
/* ======================== */
(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let velocity  = 0;
    let rafId     = null;
    const FRICTION = 0.94;   // lower = stops faster (0–1)
    const MULTIPLIER = 1.1;  // amplifies wheel delta

    function loop() {
        if (Math.abs(velocity) < 0.5) {
            velocity = 0;
            rafId = null;
            return;
        }
        window.scrollBy(0, velocity);
        velocity *= FRICTION;
        rafId = requestAnimationFrame(loop);
    }

    window.addEventListener('wheel', (e) => {
        e.preventDefault();
        velocity += e.deltaY * MULTIPLIER;
        if (!rafId) rafId = requestAnimationFrame(loop);
    }, { passive: false });
})();
