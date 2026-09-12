/* ==========================================================================
   Wixbal — interacción de la portada
   ========================================================================== */
(function () {
  'use strict';

  var GOLD = '#C6A57B';
  var CANVAS = 1440;      // ancho del lienzo original
  var BREAKPOINT = 1100;  // por debajo de esto se usa el layout en columna

  /* ------------------------------- Datos -------------------------------- */

  var services = [
    {
      id: 1, num: 'I', title: 'Rutas guiadas',
      photo: 'Guía frente a un templo',
      body: 'Itinerarios de 3 a 12 días por Petén, el altiplano y las Verapaces. Cada ruta la lidera un guía de la región, con paradas en sitios arqueológicos, mercados y talleres fuera del circuito habitual.',
      dur: '3 – 12 días', group: 'Máx. 8', price: 'Q2,400',
      tags: ['Tikal', 'Atitlán', 'Antigua', 'Semuc Champey']
    },
    {
      id: 2, num: 'II', title: 'Estancias en comunidades',
      photo: 'Cocina en una casa de Atitlán',
      body: 'Duerme, cocina y teje con familias anfitrionas del lago y el altiplano. Estancias de 2 a 5 noches donde el ingreso se queda directamente en la comunidad.',
      dur: '2 – 5 noches', group: 'Máx. 4', price: 'Q950',
      tags: ['San Juan La Laguna', 'Chichicastenango', 'Nebaj']
    },
    {
      id: 3, num: 'III', title: 'Viajes a medida',
      photo: 'Mapa y cuaderno de viaje',
      body: 'Diseñamos tu ruta desde cero: fechas, ritmo, intereses y presupuesto. Recibes una propuesta en 48 horas con guía asignado y logística resuelta.',
      dur: 'A tu medida', group: '1 – 12', price: 'Cotización',
      tags: ['Familias', 'Fotografía', 'Arqueología', 'Gastronomía']
    },
    {
      id: 4, num: 'IV', title: 'Transporte y logística',
      photo: 'Camioneta en carretera de montaña',
      body: 'Traslados privados entre destinos, boletos de sitios y coordinación completa para grupos, escuelas y empresas en todo el país.',
      dur: 'Por trayecto', group: 'Hasta 40', price: 'Q350',
      tags: ['Aeropuerto', 'Grupos', 'Todo el país']
    }
  ];

  var agencies = [
    {
      id: 'balam', name: 'Balam Expeditions', logo: '/assets/balam.png',
      kind: 'Agencia I · Viajes por todo el país',
      spec: 'Rutas culturales y naturaleza', where: 'Toda Guatemala',
      photo: 'Foto: grupo de Balam en Semuc Champey',
      body: 'Balam recorre el país completo: Tikal y Yaxhá, el Lago de Atitlán, Antigua, las Verapaces y el Caribe. Rutas de varios días con guías de cada región.',
      logoSize: 84
    },
    {
      id: 'wolfs', name: 'Wolfs Travel Agency', logo: '/assets/wolfs.png',
      kind: 'Agencia II · Trekking de altura',
      spec: 'Trekking al Acatenango', where: 'Volcán de Acatenango',
      photo: 'Foto: campamento nocturno frente al Volcán de Fuego',
      body: 'Especialistas en el ascenso al Acatenango: caminata guiada, campamento base con vista al Volcán de Fuego y amanecer en la cumbre a 3,976 m.',
      logoSize: 80, logoWolfs: true
    },
    {
      id: 'ixkanul', name: 'Ixkanul Tours', logo: '/assets/ixkanul.png',
      kind: 'Agencia III · Aventura 4x4',
      spec: 'Acatenango en 4x4', where: 'Volcán de Acatenango',
      photo: 'Foto: 4x4 subiendo las faldas del Acatenango',
      body: 'La misma montaña, otra forma de subirla: Ixkanul acerca en vehículos 4x4 hasta la parte alta del volcán, ideal para quienes buscan la vista sin el trekking completo.',
      logoSize: 72
    }
  ];

  var hotels = [
    { id: 'antigua', place: 'Antigua Guatemala', name: 'Casa boutique · Calle del Arco', note: 'Patio colonial · 8 habitaciones', photo: 'Foto: patio colonial con fuente en Antigua' },
    { id: 'atitlan', place: 'Lago de Atitlán', name: 'Lodge frente a los volcanes', note: 'Terraza al lago · llegada en lancha', photo: 'Foto: terraza con vista al Lago de Atitlán' },
    { id: 'acatenango', place: 'Volcán de Acatenango', name: 'Campamento base a 3,600 m', note: 'Cabañas y carpas · vista al Fuego', photo: 'Foto: campamento nocturno con el Volcán de Fuego' },
    { id: 'peten', place: 'Petén', name: 'Eco-lodge en la selva', note: 'Bungalows · a 15 min de Tikal', photo: 'Foto: bungalow de madera entre la selva de Petén' }
  ];

  /* ------------------------------ Utilidades ----------------------------- */

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function svgEl(name, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', name);
    for (var k in attrs) if (attrs[k] != null) el.setAttribute(k, attrs[k]);
    return el;
  }

  /* Reinicia una animación CSS en un elemento. */
  function restart(el) {
    if (!el) return;
    var anim = el.style.animation;
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = anim || '';
  }

  /* ------------------------- Anillo del calendario ----------------------- */

  function buildRing() {
    var host = $('[data-ring]');
    if (!host) return;

    var svg = svgEl('svg', { viewBox: '0 0 1000 1000' });

    svg.appendChild(svgEl('circle', { cx: 500, cy: 500, r: 486, fill: 'none', stroke: GOLD, 'stroke-width': 2 }));
    svg.appendChild(svgEl('circle', { cx: 500, cy: 500, r: 430, fill: 'none', stroke: GOLD, 'stroke-width': 1, opacity: .5 }));
    svg.appendChild(svgEl('circle', { cx: 500, cy: 500, r: 360, fill: 'none', stroke: GOLD, 'stroke-width': 8, 'stroke-dasharray': '2 14', opacity: .8 }));
    svg.appendChild(svgEl('circle', { cx: 500, cy: 500, r: 336, fill: 'none', stroke: GOLD, 'stroke-width': 1.5 }));

    var i, d;
    for (i = 0; i < 260; i++) {
      var a = (i / 260) * Math.PI * 2;
      var big = i % 13 === 0;
      svg.appendChild(svgEl('line', {
        x1: 500 + Math.cos(a) * 470, y1: 500 + Math.sin(a) * 470,
        x2: 500 + Math.cos(a) * (big ? 440 : 456), y2: 500 + Math.sin(a) * (big ? 440 : 456),
        stroke: GOLD, 'stroke-width': big ? 3 : 1.2, opacity: big ? 1 : .6
      }));
    }

    for (i = 0; i < 20; i++) {
      var ang = (i / 20) * Math.PI * 2 - Math.PI / 2;
      var x = 500 + Math.cos(ang) * 395;
      var y = 500 + Math.sin(ang) * 395;
      var n = i % 5;
      var g = svgEl('g', { transform: 'translate(' + x + ' ' + y + ') rotate(' + (i / 20) * 360 + ')' });
      g.appendChild(svgEl('rect', { x: -16, y: -16, width: 32, height: 32, rx: 7, fill: 'none', stroke: GOLD, 'stroke-width': 1.5 }));
      for (d = 0; d < n % 5; d++) {
        g.appendChild(svgEl('circle', { cx: -12 + d * 8, cy: -6, r: 2.6, fill: GOLD }));
      }
      g.appendChild(svgEl('rect', { x: -12, y: 2, width: 24, height: 3, fill: GOLD }));
      if (i % 2) g.appendChild(svgEl('rect', { x: -12, y: 8, width: 24, height: 3, fill: GOLD }));
      svg.appendChild(g);
    }

    host.appendChild(svg);
  }

  /* --------------------- Escalado del lienzo de 1440 --------------------- */

  function fitPage() {
    var w = document.documentElement.clientWidth;
    var zoom = w >= BREAKPOINT ? Math.min(1.25, w / CANVAS) : 1;
    document.documentElement.style.setProperty('--zoom', zoom);
  }

  function fitModal() {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    if (w < BREAKPOINT) {
      document.documentElement.style.setProperty('--modal-zoom', 1);
      return;
    }
    var z = Math.min(1, (w - 80) / 1320, (h - 80) / 760);
    document.documentElement.style.setProperty('--modal-zoom', Math.max(0.45, z));
  }

  /* ----------------------------- Menú móvil ------------------------------ */

  function initBurger() {
    var burger = $('[data-burger]');
    var topbar = $('.topbar');
    if (!burger || !topbar) return;

    burger.addEventListener('click', function () {
      var open = topbar.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    $$('.nav__link', topbar).forEach(function (link) {
      link.addEventListener('click', function () {
        topbar.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --------------------------- Carrusel de cards ------------------------- */

  var moved = false;

  function initCarousel() {
    var track = $('[data-track]');
    if (!track) return;
    var step = 362; // ancho de tarjeta (340) + separación (22)

    var prev = $('[data-prev]');
    var next = $('[data-next]');
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step, behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: step, behavior: 'smooth' }); });

    track.addEventListener('pointerdown', function (e) {
      if (e.button) return;
      var startX = e.clientX;
      var startLeft = track.scrollLeft;
      moved = false;
      track.classList.add('is-dragging');

      function move(ev) {
        var dx = ev.clientX - startX;
        if (Math.abs(dx) > 4) moved = true;
        track.scrollLeft = startLeft - dx;
      }
      function up() {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
        track.classList.remove('is-dragging');
        setTimeout(function () { moved = false; }, 50);
      }
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
    });
  }

  /* ------------------------------- Modal --------------------------------- */

  function initModal() {
    var modal = $('[data-modal]');
    if (!modal) return;
    var card = $('.modal__card', modal);
    var lastFocus = null;

    function fill(svc) {
      $$('[data-svc-field]', modal).forEach(function (el) {
        el.textContent = svc[el.getAttribute('data-svc-field')];
      });
      var slot = $('[data-modal-slot]', modal);
      if (slot) slot.setAttribute('data-slot', svc.photo);

      var tags = $('[data-svc-tags]', modal);
      tags.textContent = '';
      svc.tags.forEach(function (t) {
        var span = document.createElement('span');
        span.textContent = t;
        tags.appendChild(span);
      });
    }

    function open(index) {
      lastFocus = document.activeElement;
      fill(services[index]);
      fitModal();
      modal.hidden = false;
      document.body.classList.add('is-locked');
      restart(card);
      var close = $('[data-close]', modal);
      if (close) close.focus();
    }

    function close() {
      modal.hidden = true;
      document.body.classList.remove('is-locked');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    $$('[data-svc]').forEach(function (el) {
      el.addEventListener('click', function () {
        if (moved) return;
        open(parseInt(el.getAttribute('data-svc'), 10));
      });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(parseInt(el.getAttribute('data-svc'), 10));
        }
      });
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target === $('.modal__scale', modal)) close();
    });
    $$('[data-close]', modal).forEach(function (el) {
      el.addEventListener('click', close);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) close();
    });
  }

  /* --------------------------- Rotación de agencias ---------------------- */

  function initAgencies() {
    var buttons = $$('[data-ag-pick]');
    if (!buttons.length) return;

    var panel = $('[data-ag-panel]');
    var bg = $('.about__bg');
    var seal = $('[data-ag-seal]');
    var sealImg = $('[data-ag="logo"]');
    var slot = $('[data-ag-slot]');
    var index = 0;
    var timer = null;

    function render(i) {
      index = i;
      var ag = agencies[i];

      $$('[data-ag]').forEach(function (el) {
        var key = el.getAttribute('data-ag');
        if (key !== 'logo') el.textContent = ag[key];
      });

      if (slot) slot.setAttribute('data-slot', ag.photo);
      if (sealImg) {
        sealImg.src = ag.logo;
        sealImg.alt = ag.name;
        sealImg.style.width = ag.logoSize + 'px';
        sealImg.style.height = (ag.logoWolfs ? 66 : ag.logoSize) + 'px';
        sealImg.className = ag.logoWolfs ? 'logo--wolfs' : '';
      }

      buttons.forEach(function (b, bi) { b.classList.toggle('is-active', bi === i); });

      restart(panel);
      restart(bg);
      restart(seal);
      var fill = buttons[i] && $('.agency__fill', buttons[i]);
      restart(fill);
    }

    function startTimer() {
      clearInterval(timer);
      timer = setInterval(function () { render((index + 1) % agencies.length); }, 7000);
    }

    buttons.forEach(function (b, i) {
      b.addEventListener('click', function () { render(i); startTimer(); });
    });

    render(0);
    startTimer();
  }

  /* ------------------------------- Hotelería ----------------------------- */

  function initHotels() {
    var rows = $$('[data-hotel]');
    if (!rows.length) return;

    var frame = $('[data-hotel-frame]');
    var slot = $('[data-hotel-slot]');

    function render(i) {
      var h = hotels[i];
      $$('[data-hotel-field]').forEach(function (el) {
        el.textContent = h[el.getAttribute('data-hotel-field')];
      });
      if (slot) slot.setAttribute('data-slot', h.photo);
      rows.forEach(function (r, ri) { r.classList.toggle('is-active', ri === i); });
      restart(frame);
      var fill = rows[i] && $('.hrow__fill', rows[i]);
      restart(fill);
    }

    rows.forEach(function (row, i) {
      row.addEventListener('mouseenter', function () { render(i); });
      row.addEventListener('click', function () { render(i); });
      row.addEventListener('focus', function () { render(i); });
    });

    render(0);
  }

  /* --------------------------- Formulario de cotización ------------------ */

  function initQuote() {
    var form = $('[data-quote]');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = $('input', form);
      var email = (input.value || '').trim();
      if (!email) return;
      window.location.href =
        'mailto:hola@wixbal.gt?subject=' + encodeURIComponent('Cotización de viaje · Wixbal') +
        '&body=' + encodeURIComponent('Hola Wixbal, me interesa una propuesta de viaje.\n\nMi correo: ' + email);
      form.reset();
    });
  }

  /* --------------------------------- Init -------------------------------- */

  function init() {
    buildRing();
    fitPage();
    fitModal();
    initBurger();
    initCarousel();
    initModal();
    initAgencies();
    initHotels();
    initQuote();

    var raf;
    window.addEventListener('resize', function () {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () { fitPage(); fitModal(); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
