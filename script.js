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

  // --- Peek Modal (Notion-style side panel) ---
  const peekOverlay = document.getElementById('peekOverlay');
  const peekModal = document.getElementById('peekModal');
  const peekClose = document.getElementById('peekClose');
  const peekTitle = document.getElementById('peekTitle');
  const peekDesc = document.getElementById('peekDesc');
  const peekModuleBadge = document.getElementById('peekModuleBadge');
  const peekVideo = document.getElementById('peekVideo');
  const peekPdf = document.getElementById('peekPdf');
  const peekYoutubeLink = document.getElementById('peekYoutubeLink');
  const peekPdfLink = document.getElementById('peekPdfLink');

  // Convert youtu.be URL to embed URL
  function toYouTubeEmbed(url) {
    if (!url) return '';
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/watch')) {
      const params = new URL(url).searchParams;
      videoId = params.get('v');
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : '';
  }

  // Convert Google Drive view URL to preview/embed URL
  function toDrivePreview(url) {
    if (!url || url === '#') return '';
    const match = url.match(/\/file\/d\/([^/]+)/);
    if (match) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return url;
  }

  // Get module name from a lesson card
  function getModuleName(card) {
    const moduleEl = card.closest('.module');
    if (moduleEl) {
      const titleEl = moduleEl.querySelector('.module-title');
      const numberEl = moduleEl.querySelector('.module-number');
      return numberEl ? `${numberEl.textContent} — ${titleEl.textContent}` : titleEl.textContent;
    }
    return '';
  }

  function openPeek(card) {
    const title = card.querySelector('.lesson-title').textContent;
    const desc = card.querySelector('.lesson-desc').textContent;
    const moduleName = getModuleName(card);
    const lessonNum = card.querySelector('.lesson-number').textContent;

    const videoLink = card.querySelector('.lesson-link');
    const pdfLink = card.querySelector('.lesson-link-pdf');
    const youtubeUrl = videoLink ? videoLink.getAttribute('href') : '';
    const pdfUrl = pdfLink ? pdfLink.getAttribute('href') : '';

    // Populate modal
    peekTitle.textContent = `Aula ${lessonNum} — ${title}`;
    peekDesc.textContent = desc;
    peekModuleBadge.textContent = moduleName;

    // Set YouTube embed
    peekVideo.src = toYouTubeEmbed(youtubeUrl);
    peekYoutubeLink.href = youtubeUrl;

    // Set PDF embed
    const drivePreview = toDrivePreview(pdfUrl);
    peekPdf.src = drivePreview;
    peekPdfLink.href = pdfUrl;

    // Show/hide PDF section
    const pdfSection = peekPdf.closest('.peek-section');
    if (drivePreview) {
      pdfSection.style.display = '';
    } else {
      pdfSection.style.display = 'none';
    }

    // Open
    peekOverlay.classList.add('open');
    peekModal.classList.add('open');
    document.body.classList.add('peek-open');
  }

  function closePeek() {
    peekOverlay.classList.remove('open');
    peekModal.classList.remove('open');
    document.body.classList.remove('peek-open');

    // Stop video playback
    setTimeout(() => {
      peekVideo.src = '';
      peekPdf.src = '';
    }, 400);
  }

  // Attach click handlers to all lesson cards
  document.querySelectorAll('.lesson-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't open peek if clicking directly on a link (allow right-click, ctrl+click)
      if (e.target.closest('a') && (e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      openPeek(card);
    });
  });

  // Close handlers
  peekClose.addEventListener('click', closePeek);
  peekOverlay.addEventListener('click', closePeek);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && peekModal.classList.contains('open')) {
      closePeek();
    }
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
