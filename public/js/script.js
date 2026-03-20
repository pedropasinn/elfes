// ============================================
// Prof. Henrique Elfes - Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // --- Mobile menu toggle ---
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
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

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  // --- Module accordion (curso.html) ---
  document.querySelectorAll('.module-header').forEach(header => {
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      const content = header.nextElementSibling;

      document.querySelectorAll('.module-header').forEach(otherHeader => {
        if (otherHeader !== header) {
          otherHeader.setAttribute('aria-expanded', 'false');
          otherHeader.nextElementSibling.classList.remove('open');
        }
      });

      header.setAttribute('aria-expanded', !isExpanded);
      content.classList.toggle('open', !isExpanded);
    });
  });

  // --- Peek Modal (universal) ---
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

  function toDrivePreview(url) {
    if (!url || url === '#') return '';
    const match = url.match(/\/file\/d\/([^/]+)/);
    if (match) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return url;
  }

  function getModuleName(card) {
    const moduleEl = card.closest('.module');
    if (moduleEl) {
      const titleEl = moduleEl.querySelector('.module-title');
      const numberEl = moduleEl.querySelector('.module-number');
      return numberEl ? `${numberEl.textContent} — ${titleEl.textContent}` : titleEl.textContent;
    }
    return '';
  }

  function openPeekFromLesson(card) {
    const title = card.querySelector('.lesson-title').textContent;
    const desc = card.querySelector('.lesson-desc').textContent;
    const moduleName = getModuleName(card);
    const lessonNum = card.querySelector('.lesson-number').textContent;

    const videoLink = card.querySelector('.lesson-link');
    const pdfLink = card.querySelector('.lesson-link-pdf');
    const youtubeUrl = videoLink ? videoLink.getAttribute('href') : '';
    const pdfUrl = pdfLink ? pdfLink.getAttribute('href') : '';

    if (peekTitle) peekTitle.textContent = `Aula ${lessonNum} — ${title}`;
    if (peekDesc) peekDesc.textContent = desc;
    if (peekModuleBadge) peekModuleBadge.textContent = moduleName;

    if (peekVideo) peekVideo.src = toYouTubeEmbed(youtubeUrl);
    if (peekYoutubeLink) peekYoutubeLink.href = youtubeUrl;

    if (peekPdf) {
      const drivePreview = toDrivePreview(pdfUrl);
      peekPdf.src = drivePreview;
      if (peekPdfLink) peekPdfLink.href = pdfUrl;
      const pdfSection = peekPdf.closest('.peek-section');
      if (pdfSection) pdfSection.style.display = drivePreview ? '' : 'none';
    }

    openPeekModal();
  }

  function openPeekFromVideoCard(card) {
    const videoId = card.dataset.video;
    const title = card.querySelector('.video-card-title, .video-library-title');
    const module = card.querySelector('.video-card-module, .video-thumb-badge');

    if (peekTitle) peekTitle.textContent = title ? title.textContent : '';
    if (peekModuleBadge) peekModuleBadge.textContent = module ? module.textContent : '';
    if (peekDesc) peekDesc.textContent = '';

    if (peekVideo) peekVideo.src = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`;
    if (peekYoutubeLink) peekYoutubeLink.href = `https://youtu.be/${videoId}`;

    // Hide PDF section if it exists
    if (peekPdf) {
      peekPdf.src = '';
      const pdfSection = peekPdf.closest('.peek-section');
      if (pdfSection) pdfSection.style.display = 'none';
    }

    openPeekModal();
  }

  function openPeekModal() {
    if (peekOverlay) peekOverlay.classList.add('open');
    if (peekModal) peekModal.classList.add('open');
    document.body.classList.add('peek-open');
  }

  function closePeek() {
    if (peekOverlay) peekOverlay.classList.remove('open');
    if (peekModal) peekModal.classList.remove('open');
    document.body.classList.remove('peek-open');

    setTimeout(() => {
      if (peekVideo) peekVideo.src = '';
      if (peekPdf) peekPdf.src = '';
    }, 400);
  }

  // Lesson cards (curso.html & historia-filosofia.html)
  document.querySelectorAll('.lesson-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Let direct link clicks (assistir, ver esquemas, pdf) navigate normally
      const clickedLink = e.target.closest('a');
      if (clickedLink) return;

      // If card has a dedicated page, navigate there
      const aulaPage = card.dataset.aulaPage;
      if (aulaPage) {
        window.location.href = aulaPage;
        return;
      }

      // Otherwise open peek modal with video
      e.preventDefault();
      openPeekFromLesson(card);
    });
  });

  // Video cards (index.html & videos.html)
  document.querySelectorAll('.video-card, .video-library-card').forEach(card => {
    if (card.dataset.video) {
      card.addEventListener('click', () => {
        openPeekFromVideoCard(card);
      });
    }
  });

  // Close handlers
  if (peekClose) peekClose.addEventListener('click', closePeek);
  if (peekOverlay) peekOverlay.addEventListener('click', closePeek);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && peekModal && peekModal.classList.contains('open')) {
      closePeek();
    }
  });

  // --- Video filters (videos.html) ---
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      document.querySelectorAll('.video-library-card').forEach(card => {
        if (filter === 'all' || card.dataset.module === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
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

  document.querySelectorAll('.module, .community-card, .about-content, .about-image-wrapper, .course-card, .video-library-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

});
