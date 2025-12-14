// Small, performant script:
// - mobile nav toggle
// - IntersectionObserver to add .is-visible for .fade-in elements (scroll animations)
document.addEventListener('DOMContentLoaded', function () {
  // Nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.style.display = open ? '' : 'flex';
      // For accessibility on small screens, we'll add a simple class; desktop CSS shows nav by default
    });
    // Ensure nav style gets reset on viewport resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 900) {
        nav.style.display = '';
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        nav.style.display = '';
      }
    });
  }

  // IntersectionObserver for scroll animations (fast & efficient)
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -8% 0px', // trigger a bit earlier
    threshold: 0.08
  };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
