// ============================================
// Prof. Henrique Elfes - Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // --- Mobile menu toggle ---
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    // Animate hamburger to X
    const spans = menuToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // --- Module accordion ---
  document.querySelectorAll('.module-header').forEach(header => {
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      const content = header.nextElementSibling;

      // Close all other modules
      document.querySelectorAll('.module-header').forEach(otherHeader => {
        if (otherHeader !== header) {
          otherHeader.setAttribute('aria-expanded', 'false');
          otherHeader.nextElementSibling.classList.remove('open');
        }
      });

      // Toggle current
      header.setAttribute('aria-expanded', !isExpanded);
      content.classList.toggle('open', !isExpanded);
    });
  });

  // --- Scroll animations ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.module, .community-card, .about-content, .about-image-wrapper').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

});
