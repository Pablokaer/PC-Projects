(() => {
    'use strict';

    const SITE = window.SITE || {};
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ------------------------------------------------ */
    /* Config → DOM (links, status, hero image, year)   */
    /* ------------------------------------------------ */
    const links = {
        github: SITE.github,
        linkedin: SITE.linkedin,
        email: SITE.email ? 'mailto:' + SITE.email : ''
    };
    document.querySelectorAll('[data-link]').forEach((el) => {
        const url = links[el.dataset.link];
        if (url) el.setAttribute('href', url);
    });
    document.querySelectorAll('[data-email]').forEach((el) => {
        if (SITE.email) el.textContent = SITE.email;
    });
    document.querySelectorAll('[data-site="status"]').forEach((el) => {
        if (typeof SITE.status === 'string') el.textContent = SITE.status;
    });
    document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

    const disc = document.querySelector('.hero-art__disc');
    if (disc && SITE.heroImage) {
        const img = new Image();
        img.src = SITE.heroImage;
        img.alt = SITE.heroImageAlt || '';
        img.width = 520;
        img.height = 520;
        img.decoding = 'async';
        img.onload = () => {
            disc.replaceChildren(img);
            disc.removeAttribute('aria-hidden');
        };
    }

    /* ------------------------------------------------ */
    /* Header: scrolled state, progress, back-to-top    */
    /* ------------------------------------------------ */
    const header = document.querySelector('.site-header');
    const bar = document.getElementById('scroll-progress');
    const topBtn = document.getElementById('back-to-top');
    let ticking = false;

    const onScroll = () => {
        ticking = false;
        const y = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if (header) header.classList.toggle('scrolled', y > 12);
        if (bar) bar.style.width = total > 0 ? (y / total) * 100 + '%' : '0%';
        if (topBtn) topBtn.classList.toggle('visible', y > 600);
    };
    window.addEventListener('scroll', () => {
        if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();
    if (topBtn) topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

    /* ------------------------------------------------ */
    /* Mobile menu                                      */
    /* ------------------------------------------------ */
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('site-nav');
    if (toggle && nav) {
        const setOpen = (open, restoreFocus) => {
            nav.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
            document.body.classList.toggle('menu-open', open);
            if (!open && restoreFocus) toggle.focus();
        };
        toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
        nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('open')) setOpen(false, true);
        });
        window.matchMedia('(min-width: 801px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
    }

    /* ------------------------------------------------ */
    /* Scroll reveal                                    */
    /* ------------------------------------------------ */
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (revealEls.length) {
        if (!('IntersectionObserver' in window) || reduceMotion) {
            revealEls.forEach((el) => el.classList.add('revealed'));
        } else {
            const io = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        io.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
            revealEls.forEach((el) => io.observe(el));
        }
    }

    /* ------------------------------------------------ */
    /* Projects: live count + filtering                 */
    /* ------------------------------------------------ */
    const grid = document.getElementById('project-grid');
    if (grid) {
        const cards = Array.from(grid.querySelectorAll('.project-card'));
        const pad = (n) => String(n).padStart(2, '0');

        document.querySelectorAll('[data-project-count]').forEach((el) => { el.textContent = pad(cards.length); });

        // First visible card is the large feature; an odd one out closes the grid as a wide card.
        const layout = () => {
            const visible = cards.filter((c) => !c.hidden);
            cards.forEach((c) => c.classList.remove('is-wide', 'is-reverse'));
            visible.forEach((c, i) => {
                const idx = c.querySelector('.project-card__index');
                if (idx) idx.textContent = pad(i + 1);
            });
            if (visible[0]) visible[0].classList.add('is-wide');
            const rest = visible.slice(1);
            if (rest.length % 2 === 1) rest[rest.length - 1].classList.add('is-wide', 'is-reverse');
        };
        layout();

        const status = document.getElementById('filter-status');
        const buttons = document.querySelectorAll('.filter button');
        buttons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const key = btn.dataset.filter;
                buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
                let shown = 0;
                cards.forEach((card) => {
                    const match = key === 'all' || card.dataset.category.split(' ').includes(key);
                    card.hidden = !match;
                    if (match) {
                        shown++;
                        if (!reduceMotion) {
                            card.classList.remove('is-entering');
                            void card.offsetWidth;            // restart the animation
                            card.classList.add('is-entering');
                        }
                    }
                });
                layout();
                if (status) status.textContent = shown + (shown === 1 ? ' project shown' : ' projects shown');
            });
        });
    }
})();
