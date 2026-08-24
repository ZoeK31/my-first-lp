document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const backToTop = document.getElementById('back-to-top');
  const sections = document.querySelectorAll('main section[id]');
  const animatedEls = document.querySelectorAll('[data-animate]');
  const menuTabs = document.querySelectorAll('[data-menu-tab]');
  const menuPanels = document.querySelectorAll('[data-menu-panel]');

  /* ---------- スムーススクロール ---------- */
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || link.dataset.navTarget;
      if (!href || !href.startsWith('#')) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (mainNav.classList.contains('is-open')) {
        closeNav();
      }
    });
  });

  /* ---------- ヘッダーのスクロール状態 ---------- */
  const updateHeaderState = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
    backToTop.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
  };
  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  /* ---------- ハンバーガーメニュー ---------- */
  const openNav = () => {
    mainNav.classList.add('is-open');
    navToggle.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
  };

  const closeNav = () => {
    mainNav.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    mainNav.classList.contains('is-open') ? closeNav() : openNav();
  });

  /* ---------- 現在地に応じたナビのハイライト ---------- */
  const sectionNavLinks = document.querySelectorAll('.main-nav a[data-nav-link]');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        sectionNavLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => navObserver.observe(section));

  /* ---------- スクロールで要素をフェードイン ---------- */
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  animatedEls.forEach((el) => revealObserver.observe(el));

  /* ---------- ヒーローの初期表示アニメーション ---------- */
  const heroContent = document.querySelector('.hero-content');
  requestAnimationFrame(() => {
    setTimeout(() => heroContent && heroContent.classList.add('is-visible'), 200);
  });

  /* ---------- メニュータブ切り替え ---------- */
  menuTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.menuTab;

      menuTabs.forEach((t) => {
        t.classList.toggle('is-active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });

      menuPanels.forEach((panel) => {
        panel.classList.toggle('is-active', panel.dataset.menuPanel === target);
      });
    });
  });
});
