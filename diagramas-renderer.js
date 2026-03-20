/* ============================================
   Diagram Renderer — Prof. Henrique Elfes
   Builds diagram HTML from structured AULAS_DATA
   ============================================ */

const DiagramRenderer = (function () {

  // ── SVG Icons ──────────────────────────────────────────────

  const SVG_X = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  const SVG_CHECK = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>';
  const SVG_ARROW = '<svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
  const SVG_INFO = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
  const SVG_CONVERGE = '<svg width="24" height="40" viewBox="0 0 24 40" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 0 L12 20 L20 0" stroke-dasharray="4 3" opacity="0.3"/><path d="M12 20 L12 40"/><path d="M8 34 L12 40 L16 34"/></svg>';

  // ── Renderer: Concentric Circles ──────────────────────────

  function concentricCircles(data) {
    var ringsHtml = '';
    for (var i = 0; i < data.rings.length; i++) {
      var r = data.rings[i];
      var isCenter = i === data.rings.length - 1;
      var ringClass = isCenter ? 'cosmo-ring cosmo-ring--center' : 'cosmo-ring';

      var style = 'width:' + r.size + 'px;height:' + r.size + 'px;' +
        'background:' + r.bg + ';' +
        'border-color:' + r.borderColor + ';' +
        'z-index:' + (r.zIndex || 1) + ';';

      if (r.borderStyle) {
        style += 'border-style:' + r.borderStyle + ';';
      }
      if (r.glow) {
        style += 'box-shadow:' + r.glow + ';';
      }

      var labelStyle = '';
      if (r.labelPosition === 'top') {
        labelStyle = 'top:-28px;';
      } else if (r.labelPosition === 'bottom') {
        labelStyle = 'bottom:-28px;';
      }
      if (r.labelColor) {
        labelStyle += 'color:' + r.labelColor + ';';
      }

      ringsHtml += '<div class="' + ringClass + '" style="' + style + '">' +
        '<span class="cosmo-ring-label" style="' + labelStyle + '">' + r.label + '</span>' +
        '</div>';
    }

    var legendHtml = '';
    for (var j = 0; j < data.legend.length; j++) {
      var l = data.legend[j];
      var dotStyle = 'background:' + l.color + ';';
      if (l.shadow) {
        dotStyle += 'box-shadow:' + l.shadow + ';';
      }
      legendHtml += '<div class="cosmo-legend-item">' +
        '<div class="cosmo-legend-dot" style="' + dotStyle + '"></div>' +
        '<div>' +
          '<div class="cosmo-legend-title">' + l.title + '</div>' +
          '<div class="cosmo-legend-desc">' + l.desc + '</div>' +
        '</div>' +
      '</div>';
    }

    return '<div class="cosmo-container reveal">' +
      '<div class="cosmo-sphere">' + ringsHtml + '</div>' +
      '<div class="cosmo-legend">' + legendHtml + '</div>' +
    '</div>';
  }

  // ── Renderer: Card Grid ───────────────────────────────────

  function cardGrid(data) {
    var html = '<div class="condition-grid reveal">';
    for (var i = 0; i < data.cards.length; i++) {
      var c = data.cards[i];
      var accentStyle = c.accentColor ? 'border-top:3px solid ' + c.accentColor + ';' : '';
      var iconBgStyle = c.iconBg ? 'background:' + c.iconBg + ';' : '';

      html += '<div class="condition-card" style="' + accentStyle + '">' +
        '<div class="condition-icon" style="' + iconBgStyle + '">' + c.icon + '</div>' +
        '<h3>' + c.title + '</h3>' +
        '<p>' + c.text + '</p>';

      if (c.quote) {
        html += '<div class="condition-quote"><p>' + c.quote + '</p></div>';
      }

      html += '</div>';
    }
    html += '</div>';
    return html;
  }

  // ── Renderer: Cycle Diagram ───────────────────────────────

  function cycleDiagram(data) {
    var nodesHtml = '';
    for (var i = 0; i < data.nodes.length; i++) {
      var n = data.nodes[i];
      var posStyle = '';
      switch (n.position) {
        case 'top':
          posStyle = 'top:-10px;left:50%;transform:translateX(-50%);';
          break;
        case 'right':
          posStyle = 'top:50%;right:-10px;transform:translateY(-50%);';
          break;
        case 'bottom':
          posStyle = 'bottom:-10px;left:50%;transform:translateX(-50%);';
          break;
        case 'left':
          posStyle = 'top:50%;left:-10px;transform:translateY(-50%);';
          break;
      }
      var nodeStyle = posStyle +
        'background:' + n.bg + ';' +
        'color:' + n.color + ';' +
        'border:2px solid ' + n.borderColor + ';';

      nodesHtml += '<div class="cycle-node" style="' + nodeStyle + '">' +
        '<span class="cycle-node-icon">' + n.icon + '</span>' +
        '<span>' + n.label + '</span>' +
      '</div>';
    }

    var tagsHtml = '';
    for (var j = 0; j < data.tags.length; j++) {
      tagsHtml += '<span class="cycle-name-tag">' + data.tags[j] + '</span>';
    }

    return '<div class="cycle-visual reveal">' +
      '<div class="cycle-diagram">' +
        '<div class="cycle-orbit"></div>' +
        '<div class="cycle-path"></div>' +
        '<div class="cycle-center">' +
          '<span class="cycle-center-title">' + data.centerTitle + '</span>' +
          '<span class="cycle-center-sub">' + data.centerSub + '</span>' +
        '</div>' +
        nodesHtml +
      '</div>' +
      '<div class="cycle-names">' +
        '<h3 class="cycle-names-title">' + data.namesTitle + '</h3>' +
        '<div>' + tagsHtml + '</div>' +
        '<div class="cycle-summary">' + data.summary + '</div>' +
      '</div>' +
    '</div>';
  }

  // ── Renderer: Comparison Panel ────────────────────────────

  function comparisonPanel(data) {
    function renderPanel(panel, iconClass, svgIcon) {
      var themeClass = panel.theme === 'dark' ? 'block-panel block-panel-dark' : 'block-panel block-panel-light';
      var items = '';
      for (var i = 0; i < panel.items.length; i++) {
        items += '<li>' +
          '<span class="block-list-icon ' + iconClass + '">' + svgIcon + '</span>' +
          '<span>' + panel.items[i].html + '</span>' +
        '</li>';
      }
      return '<div class="' + themeClass + '">' +
        '<h3>' + panel.title + '</h3>' +
        '<ul class="block-list">' + items + '</ul>' +
      '</div>';
    }

    return '<div class="block-grid reveal">' +
      renderPanel(data.left, 'icon-block', SVG_X) +
      '<div class="block-vs"><div class="block-vs-circle">vs</div></div>' +
      renderPanel(data.right, 'icon-check', SVG_CHECK) +
    '</div>';
  }

  // ── Renderer: Timeline ────────────────────────────────────

  function timeline(data) {
    var html = '<div class="timeline reveal">';
    for (var i = 0; i < data.items.length; i++) {
      var t = data.items[i];
      var tagStyle = t.tagColor ? ' style="color:' + t.tagColor + ';"' : '';
      html += '<div class="timeline-item">' +
        '<div class="timeline-content">' +
          '<div class="timeline-tag"' + tagStyle + '>' + t.tag + '</div>' +
          '<h4>' + t.title + '</h4>' +
          '<p>' + t.text + '</p>' +
        '</div>' +
        '<div class="timeline-dot"></div>' +
      '</div>';
    }
    html += '</div>';
    return html;
  }

  // ── Renderer: Comparison Table ────────────────────────────

  function comparisonTable(data) {
    var headerHtml = '<tr>';
    for (var c = 0; c < data.columns.length; c++) {
      headerHtml += '<th>' + data.columns[c] + '</th>';
    }
    headerHtml += '</tr>';

    var bodyHtml = '';
    for (var r = 0; r < data.rows.length; r++) {
      bodyHtml += '<tr>';
      for (var d = 0; d < data.rows[r].length; d++) {
        bodyHtml += '<td>' + data.rows[r][d] + '</td>';
      }
      bodyHtml += '</tr>';
    }

    return '<table class="compare-table reveal">' +
      '<thead>' + headerHtml + '</thead>' +
      '<tbody>' + bodyHtml + '</tbody>' +
    '</table>';
  }

  // ── Renderer: Cause Cards ─────────────────────────────────

  function causeCards(data) {
    var html = '<div class="causes-grid reveal">';
    for (var i = 0; i < data.cards.length; i++) {
      var c = data.cards[i];
      html += '<div class="cause-card">' +
        '<div class="cause-number">' + c.number + '</div>' +
        '<div class="cause-name">' + c.name + '</div>' +
        '<div class="cause-question">' + c.question + '</div>' +
        '<div class="cause-desc">' + c.desc + '</div>' +
        '<span class="cause-owner ' + c.ownerClass + '">' + c.owner + '</span>' +
      '</div>';
    }
    html += '</div>';
    return html;
  }

  // ── Renderer: Flow Steps ──────────────────────────────────

  function flowSteps(data) {
    var html = '<div class="reason-flow reveal">';
    for (var i = 0; i < data.steps.length; i++) {
      var s = data.steps[i];
      var isLast = i === data.steps.length - 1;
      html += '<div class="reason-step">' +
        '<div class="reason-step-num">' + s.num + '</div>' +
        '<h4>' + s.title + '</h4>' +
        '<div class="reason-step-latin">' + s.latin + '</div>' +
        '<p>' + s.text + '</p>' +
        '<div class="reason-step-example">' + s.example + '</div>';
      if (!isLast) {
        html += '<div class="reason-arrow">' + SVG_ARROW + '</div>';
      }
      html += '</div>';
    }
    html += '</div>';

    if (data.note) {
      html += '<div class="reason-note reveal">' +
        '<div class="reason-note-icon">' + SVG_INFO + '</div>' +
        '<div class="reason-note-text">' + data.note.html + '</div>' +
      '</div>';
    }

    return html;
  }

  // ── Renderer: Convergence ─────────────────────────────────

  function convergence(data) {
    var itemsHtml = '<div class="purpose-top">';
    for (var i = 0; i < data.items.length; i++) {
      var item = data.items[i];
      var style = 'border-color:' + item.borderColor + ';background:' + item.bgColor + ';';
      itemsHtml += '<div class="purpose-desire" style="' + style + '">' +
        '<div class="purpose-desire-icon">' + item.icon + '</div>' +
        '<h4>' + item.title + '</h4>' +
        '<p>' + item.text + '</p>' +
      '</div>';
    }
    itemsHtml += '</div>';

    var convergeHtml = '<div class="purpose-converge">' +
      SVG_CONVERGE +
      '<span class="purpose-converge-label">' + data.convergeLabel + '</span>' +
    '</div>';

    var triadHtml = '';
    if (data.result.triad && data.result.triad.length) {
      triadHtml = '<div class="purpose-triad">';
      for (var j = 0; j < data.result.triad.length; j++) {
        triadHtml += '<span class="purpose-triad-item">' + data.result.triad[j] + '</span>';
      }
      triadHtml += '</div>';
    }

    var resultHtml = '<div class="purpose-result">' +
      '<div class="purpose-result-content">' +
        '<span class="purpose-result-tag">' + data.result.tag + '</span>' +
        '<h3>' + data.result.title + '</h3>' +
        '<p>' + data.result.text + '</p>' +
        triadHtml +
      '</div>' +
    '</div>';

    return '<div class="purpose-visual reveal">' +
      itemsHtml + convergeHtml + resultHtml +
    '</div>';
  }

  // ── Render Section Wrapper ────────────────────────────────

  function renderSection(diagram, index) {
    var num = String(index + 1).padStart(2, '0');
    var renderers = {
      concentricCircles: concentricCircles,
      cardGrid: cardGrid,
      cycleDiagram: cycleDiagram,
      comparisonPanel: comparisonPanel,
      timeline: timeline,
      comparisonTable: comparisonTable,
      causeCards: causeCards,
      flowSteps: flowSteps,
      convergence: convergence
    };

    var renderFn = renderers[diagram.type];
    var content = renderFn ? renderFn(diagram.data) : '';

    return '<section class="diagram-section" id="bloco' + (index + 1) + '">' +
      '<div class="container">' +
        '<div class="diagram-header reveal">' +
          '<div class="diagram-number">' + num + '</div>' +
          '<h2 class="diagram-title">' + diagram.title + '</h2>' +
          '<p class="diagram-subtitle">' + diagram.subtitle + '</p>' +
        '</div>' +
        content +
      '</div>' +
    '</section>';
  }

  // ── Observer Setup ────────────────────────────────────────

  function attachObservers() {
    // Reveal on scroll
    var revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      revealEls.forEach(function (el) {
        revealObserver.observe(el);
      });
    }

    // Active nav item tracking
    var navItems = document.querySelectorAll('.diagram-nav-item');
    var sections = [];
    navItems.forEach(function (item) {
      var href = item.getAttribute('href');
      if (href && href.startsWith('#')) {
        var section = document.getElementById(href.substring(1));
        if (section) {
          sections.push({ el: section, nav: item });
        }
      }
    });

    if (sections.length) {
      var navObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navItems.forEach(function (ni) { ni.classList.remove('active'); });
            for (var i = 0; i < sections.length; i++) {
              if (sections[i].el === entry.target) {
                sections[i].nav.classList.add('active');
                break;
              }
            }
          }
        });
      }, { rootMargin: '-40% 0px -55% 0px' });

      sections.forEach(function (s) {
        navObserver.observe(s.el);
      });
    }
  }

  // ── Init ──────────────────────────────────────────────────

  function init() {
    var params = new URLSearchParams(window.location.search);
    var curso = params.get('curso') || 'historia-filosofia';
    var n = parseInt(params.get('n'), 10);

    if (!window.AULAS_DATA || !AULAS_DATA[curso]) {
      var titleEl = document.getElementById('aulaTitle');
      if (titleEl) titleEl.textContent = 'Aula nao encontrada';
      return;
    }

    var course = AULAS_DATA[curso];

    if (!n || n < 1 || n > course.aulas.length) {
      var titleEl = document.getElementById('aulaTitle');
      if (titleEl) titleEl.textContent = 'Aula nao encontrada';
      return;
    }

    var aula = course.aulas[n - 1];

    // Back link to course page
    var backLink = document.getElementById('aulaBack');
    if (backLink) backLink.href = course.pagina;

    // Hero content
    var tagEl = document.getElementById('aulaTag');
    var titleEl = document.getElementById('aulaTitle');
    var descEl = document.getElementById('aulaDesc');
    var videoEl = document.getElementById('aulaVideo');

    if (tagEl) tagEl.textContent = aula.tag || '';
    if (titleEl) titleEl.innerHTML = aula.title || '';
    if (descEl) descEl.textContent = aula.description || '';
    if (videoEl && aula.video) {
      videoEl.src = 'https://www.youtube.com/embed/' + aula.video + '?rel=0';
    }

    var diagramNav = document.getElementById('diagramNav');
    var diagramNavInner = document.getElementById('diagramNavInner');
    var diagramsContainer = document.getElementById('diagramsContainer');
    var comingSoon = document.getElementById('comingSoon');

    if (aula.diagrams && aula.diagrams.length > 0) {
      // Show diagram nav, hide coming soon
      if (diagramNav) diagramNav.style.display = '';
      if (comingSoon) comingSoon.style.display = 'none';

      // Build nav items
      if (diagramNavInner) {
        var navHtml = '';
        for (var i = 0; i < aula.diagrams.length; i++) {
          var d = aula.diagrams[i];
          var activeClass = i === 0 ? ' active' : '';
          navHtml += '<a href="#bloco' + (i + 1) + '" class="diagram-nav-item' + activeClass + '">' + d.navLabel + '</a>';
        }
        diagramNavInner.innerHTML = navHtml;
      }

      // Render all diagrams
      if (diagramsContainer) {
        var sectionsHtml = '';
        for (var j = 0; j < aula.diagrams.length; j++) {
          sectionsHtml += renderSection(aula.diagrams[j], j);
        }
        diagramsContainer.innerHTML = sectionsHtml;
      }

      // Attach scroll observers
      attachObservers();
    } else {
      // No diagrams — show coming soon, hide nav
      if (diagramNav) diagramNav.style.display = 'none';
      if (comingSoon) comingSoon.style.display = '';
    }

    // Prev / next navigation
    var prevLink = document.getElementById('aulaPrev');
    var nextLink = document.getElementById('aulaNext');

    if (prevLink && n > 1) {
      prevLink.style.visibility = 'visible';
      prevLink.href = 'aula.html?curso=' + curso + '&n=' + (n - 1);
      var prevSpan = prevLink.querySelector('span');
      if (prevSpan) prevSpan.textContent = 'Aula anterior';
    }

    if (nextLink && n < course.aulas.length) {
      nextLink.style.visibility = 'visible';
      nextLink.href = 'aula.html?curso=' + curso + '&n=' + (n + 1);
      var nextSpan = nextLink.querySelector('span');
      if (nextSpan) nextSpan.textContent = 'Proxima aula';
    }
  }

  // ── Public API ────────────────────────────────────────────

  return {
    init: init,
    renderSection: renderSection,
    concentricCircles: concentricCircles,
    cardGrid: cardGrid,
    cycleDiagram: cycleDiagram,
    comparisonPanel: comparisonPanel,
    timeline: timeline,
    comparisonTable: comparisonTable,
    causeCards: causeCards,
    flowSteps: flowSteps,
    convergence: convergence,
    attachObservers: attachObservers
  };

})();
