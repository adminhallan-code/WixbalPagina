/* ==========================================================================
   Wixbal — página de Servicios
   ========================================================================== */
(function () {
  'use strict';

  var CANVAS = 1440;
  var BREAKPOINT = 1100;

  /* ------------------------------- Datos -------------------------------- */

  var AGENCIES = {
    balam:   { name: 'Balam Expeditions',   color: '#C6A57B' },
    wolfs:   { name: 'Wolfs Travel Agency', color: '#2E4A2F' },
    ixkanul: { name: 'Ixkanul Tours',       color: '#F27BA4' }
  };

  var LABELS = {
    all: 'Tres agencias',
    balam: 'Balam Expeditions',
    wolfs: 'Wolfs Travel Agency',
    ixkanul: 'Ixkanul Tours'
  };

  var TOURS = [
    { id: 'tikal', ag: 'balam', place: 'Petén', title: 'Tikal & Yaxhá', dur: '4 días', group: 'Máx. 8', price: 'Q3,900',
      short: 'Amanecer en el Templo IV y atardecer en Yaxhá.',
      body: 'Dos ciudades mayas en cuatro días: Tikal con guía arqueólogo, amanecer desde el Templo IV, y Yaxhá al atardecer frente a la laguna. Incluye hospedaje en eco-lodge y traslados desde Flores.',
      tags: ['Arqueología', 'Selva', 'Eco-lodge'], photo: 'Foto: Templo I de Tikal' },

    { id: 'atitlan', ag: 'balam', place: 'Sololá', title: 'Atitlán & Chichicastenango', dur: '5 días', group: 'Máx. 8', price: 'Q4,200',
      short: 'Tres pueblos del lago y el mercado de los jueves.',
      body: 'Recorrido en lancha por San Juan, Santiago y San Pedro, taller de tejido con cooperativa local y el mercado de Chichicastenango en jueves o domingo.',
      tags: ['Lago', 'Textiles', 'Mercado'], photo: 'Foto: Lago de Atitlán con volcanes' },

    { id: 'antigua', ag: 'balam', place: 'Sacatepéquez', title: 'Antigua colonial', dur: '2 días', group: 'Máx. 10', price: 'Q1,650',
      short: 'Ruinas, conventos y una finca de café.',
      body: 'Caminata por el casco histórico, conventos de Capuchinas y Santa Clara, taller de chocolate y visita a finca de café con degustación.',
      tags: ['Historia', 'Café', 'Gastronomía'], photo: 'Foto: Arco de Santa Catalina' },

    { id: 'semuc', ag: 'balam', place: 'Alta Verapaz', title: 'Semuc Champey & Lanquín', dur: '3 días', group: 'Máx. 8', price: 'Q2,800',
      short: 'Pozas turquesa, cuevas y río Cahabón.',
      body: 'Pozas de Semuc Champey desde el mirador, cuevas de K’anba con antorchas y tubing en el río Cahabón. Hospedaje frente al río.',
      tags: ['Naturaleza', 'Aventura', 'Río'], photo: 'Foto: pozas de Semuc Champey' },

    { id: 'dulce', ag: 'balam', place: 'Izabal', title: 'Río Dulce & Livingston', dur: '3 días', group: 'Máx. 8', price: 'Q2,950',
      short: 'Cañón, manglares y cultura garífuna.',
      body: 'Navegación por el cañón del Río Dulce, castillo de San Felipe y dos noches en Livingston con cocina y música garífuna.',
      tags: ['Caribe', 'Garífuna', 'Navegación'], photo: 'Foto: cañón del Río Dulce' },

    { id: 'acat-trek', ag: 'wolfs', place: 'Chimaltenango', title: 'Trekking Acatenango', dur: '2 días · 1 noche', group: 'Máx. 12', price: 'Q950',
      short: 'Campamento base frente al Volcán de Fuego.',
      body: 'Ascenso guiado de 5 a 6 horas hasta el campamento base a 3,600 m, cena caliente, noche frente a las erupciones del Fuego y cumbre al amanecer a 3,976 m.',
      tags: ['Trekking', 'Campamento', 'Amanecer'], photo: 'Foto: campamento con el Volcán de Fuego de noche' },

    { id: 'acat-express', ag: 'wolfs', place: 'Chimaltenango', title: 'Acatenango express', dur: '1 día', group: 'Máx. 12', price: 'Q550',
      short: 'Subida y bajada el mismo día.',
      body: 'Para quienes tienen poco tiempo: salida 4 a.m. desde Antigua, cumbre al mediodía y regreso por la tarde. Ritmo exigente.',
      tags: ['Trekking', 'Un día', 'Exigente'], photo: 'Foto: sendero del Acatenango entre nubes' },

    { id: 'doble', ag: 'wolfs', place: 'Chimaltenango', title: 'Doble volcán · Acatenango + Fuego', dur: '2 días · 1 noche', group: 'Máx. 8', price: 'Q1,350',
      short: 'Caminata nocturna hasta la ladera del Fuego.',
      body: 'Además del campamento base, caminata opcional nocturna por la garganta hasta la ladera del Volcán de Fuego para ver las erupciones de cerca. Solo con clima favorable.',
      tags: ['Trekking', 'Avanzado', 'Fuego'], photo: 'Foto: erupción del Volcán de Fuego' },

    { id: 'ix-media', ag: 'ixkanul', place: 'Chimaltenango', title: 'Acatenango en 4x4 · media jornada', dur: '5 horas', group: 'Máx. 6', price: 'Q480',
      short: 'Hasta la parte alta sin trekking completo.',
      body: 'Subida en vehículo 4x4 por las faldas del volcán hasta el mirador alto, caminata corta de 40 minutos y vista al Fuego. Ideal para familias.',
      tags: ['4x4', 'Familias', 'Mirador'], photo: 'Foto: 4x4 en las faldas del Acatenango' },

    { id: 'ix-amanecer', ag: 'ixkanul', place: 'Chimaltenango', title: '4x4 + amanecer', dur: '1 día', group: 'Máx. 6', price: 'Q690',
      short: 'Salida 3 a.m. y amanecer en el mirador.',
      body: 'Salida de madrugada en 4x4 para llegar al mirador antes del amanecer, desayuno de campo y descenso a media mañana.',
      tags: ['4x4', 'Amanecer', 'Desayuno'], photo: 'Foto: amanecer sobre el Volcán de Fuego' },

    { id: 'ix-privado', ag: 'ixkanul', place: 'Chimaltenango', title: '4x4 privado', dur: 'A tu medida', group: '1 – 6', price: 'Q2,400',
      short: 'Vehículo y guía solo para tu grupo.',
      body: 'Ruta privada con horario flexible, paradas fotográficas y opción de picnic en el mirador. Precio por vehículo.',
      tags: ['4x4', 'Privado', 'Flexible'], photo: 'Foto: 4x4 con vista al valle' }
  ];

  var REGIONS = [
    { id: 'antigua', place: 'Antigua Guatemala · Sacatepéquez', name: 'Casas boutique en el casco histórico',
      body: 'Casonas coloniales restauradas con patio central, a dos cuadras del Arco. Desayuno chapín y terraza con vista al Volcán de Agua.',
      perks: ['Desayuno incluido', 'Patio colonial', 'Terraza'],
      photo: 'Foto: patio colonial con fuente en Antigua',
      rooms: [
        { name: 'Habitación estándar', desc: 'Cama queen · baño privado', price: 680 },
        { name: 'Suite con terraza', desc: 'Vista al Volcán de Agua', price: 1150 },
        { name: 'Casa completa', desc: 'Hasta 6 personas · cocina', price: 2600 }
      ] },

    { id: 'atitlan', place: 'Lago de Atitlán · Sololá', name: 'Lodges frente a los tres volcanes',
      body: 'Habitaciones con terraza al lago, llegada en lancha desde Panajachel. Cena con productos del huerto y kayaks al amanecer.',
      perks: ['Llegada en lancha', 'Kayaks', 'Cena del huerto'],
      photo: 'Foto: terraza con vista al Lago de Atitlán',
      rooms: [
        { name: 'Habitación jardín', desc: 'Vista parcial al lago', price: 540 },
        { name: 'Bungalow frente al lago', desc: 'Terraza privada · hamaca', price: 920 },
        { name: 'Casa del muelle', desc: 'Hasta 5 personas · muelle', price: 2100 }
      ] },

    { id: 'acatenango', place: 'Volcán de Acatenango · Chimaltenango', name: 'Campamento base a 3,600 m',
      body: 'Cabañas de madera y carpas de altura con vista directa al Volcán de Fuego. Cena caliente, saco térmico y fogata.',
      perks: ['Vista al Fuego', 'Saco térmico', 'Cena caliente'],
      photo: 'Foto: campamento nocturno con el Volcán de Fuego',
      rooms: [
        { name: 'Carpa de altura', desc: 'Para 2 · colchoneta y saco', price: 380 },
        { name: 'Cabaña compartida', desc: 'Literas · hasta 6', price: 520 },
        { name: 'Cabaña privada', desc: 'Para 2 · ventana al Fuego', price: 890 }
      ] },

    { id: 'peten', place: 'Tikal · Petén', name: 'Eco-lodges en la selva',
      body: 'Bungalows de madera a 15 minutos del parque. Despiertas con monos aulladores y entras a Tikal antes que los grupos grandes.',
      perks: ['Junto a Tikal', 'Piscina natural', 'Entrada temprana'],
      photo: 'Foto: bungalow de madera en la selva de Petén',
      rooms: [
        { name: 'Bungalow selva', desc: 'Ventilador · baño privado', price: 720 },
        { name: 'Bungalow laguna', desc: 'Vista a la laguna · A/C', price: 1050 },
        { name: 'Villa familiar', desc: 'Hasta 5 · dos habitaciones', price: 1900 }
      ] }
  ];

  var MAX_NIGHTS = 7;

  /* ------------------------------ Utilidades ----------------------------- */

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function restart(node) {
    if (!node) return;
    var anim = node.style.animation;
    node.style.animation = 'none';
    void node.offsetWidth;
    node.style.animation = anim || '';
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
    var z = Math.min(1, (w - 80) / 1240, (h - 80) / 680);
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
  }

  /* -------------------------- Catálogo y filtros ------------------------- */

  var openModal;

  function initCatalog() {
    var grid = $('[data-grid]');
    var count = $('[data-count]');
    if (!grid) return;
    var filter = 'all';

    function card(tour) {
      var ag = AGENCIES[tour.ag];

      var node = el('article', 'tour');
      node.tabIndex = 0;
      node.setAttribute('role', 'button');
      node.setAttribute('aria-label', 'Ver detalle de ' + tour.title);

      var img = el('div', 'tour__img');
      var slot = el('div', 'slot');
      slot.setAttribute('data-slot', tour.photo);
      img.appendChild(slot);
      node.appendChild(img);

      node.appendChild(el('div', 'tour__scrim'));

      var badge = el('div', 'tour__agency');
      var dot = el('i');
      dot.style.background = ag.color;
      badge.appendChild(dot);
      badge.appendChild(document.createTextNode(ag.name));
      node.appendChild(badge);

      node.appendChild(el('div', 'tour__dur', tour.dur));

      var body = el('div', 'tour__body');
      body.appendChild(el('div', 'tour__place', tour.place));
      body.appendChild(el('div', 'tour__title', tour.title));
      body.appendChild(el('p', 'tour__short', tour.short));

      var foot = el('div', 'tour__foot');
      var left = el('div');
      left.appendChild(el('div', 'tour__from', 'Desde'));
      left.appendChild(el('div', 'tour__price', tour.price));
      foot.appendChild(left);
      foot.appendChild(el('span', 'tour__more', 'Ver detalle →'));
      body.appendChild(foot);

      node.appendChild(body);

      node.addEventListener('click', function () { openModal(tour); });
      node.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(tour); }
      });
      return node;
    }

    function render() {
      var list = TOURS.filter(function (t) { return filter === 'all' || t.ag === filter; });
      grid.textContent = '';
      list.forEach(function (t) { grid.appendChild(card(t)); });
      if (count) {
        count.textContent = list.length + ' servicio' + (list.length === 1 ? '' : 's') + ' · ' + LABELS[filter];
      }
      restart(grid);
    }

    $$('[data-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        filter = btn.getAttribute('data-filter');
        $$('[data-filter]').forEach(function (b) { b.classList.toggle('is-on', b === btn); });
        render();
      });
    });

    render();
  }

  /* ------------------------------- Modal --------------------------------- */

  function initModal() {
    var modal = $('[data-modal]');
    if (!modal) return;
    var card = $('.smodal__card', modal);
    var lastFocus = null;

    openModal = function (tour) {
      var ag = AGENCIES[tour.ag];
      lastFocus = document.activeElement;

      $$('[data-modal-field]', modal).forEach(function (node) {
        var key = node.getAttribute('data-modal-field');
        node.textContent = key === 'agencyPlace' ? ag.name + ' · ' + tour.place : tour[key];
      });

      var dot = $('[data-modal-dot]', modal);
      if (dot) dot.style.background = ag.color;

      var slot = $('[data-modal-slot]', modal);
      if (slot) slot.setAttribute('data-slot', tour.photo);

      var tags = $('[data-modal-tags]', modal);
      tags.textContent = '';
      tour.tags.forEach(function (t) { tags.appendChild(el('span', null, t)); });

      fitModal();
      modal.hidden = false;
      document.body.classList.add('is-locked');
      restart(card);
      var close = $('[data-close]', modal);
      if (close) close.focus();
    };

    function close() {
      modal.hidden = true;
      document.body.classList.remove('is-locked');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target === $('.smodal__scale', modal)) close();
    });
    $$('[data-close]', modal).forEach(function (node) { node.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) close();
    });
  }

  /* --------------------------- Configurador de estancia ------------------- */

  function initBuilder() {
    var roomsHost = $('[data-rooms]');
    if (!roomsHost) return;

    var slot = $('[data-region-slot]');
    var panel = $('[data-region-panel]');
    var perksHost = $('[data-region-perks]');
    var dotsHost = $('[data-night-dots]');
    var totalNode = $('[data-total]');
    var summaryNode = $('[data-summary]');
    var nightsNode = $('[data-nights]');
    var wordNode = $('[data-nights-word]');

    var regionIdx = 0;
    var roomIdx = 0;
    var nights = 2;

    function region() { return REGIONS[regionIdx]; }
    function room() { return region().rooms[roomIdx]; }

    function renderRegion() {
      var r = region();

      $$('[data-region-field]').forEach(function (node) {
        node.textContent = r[node.getAttribute('data-region-field')];
      });
      if (slot) slot.setAttribute('data-slot', r.photo);

      perksHost.textContent = '';
      r.perks.forEach(function (p) { perksHost.appendChild(el('span', null, p)); });

      $$('[data-region]').forEach(function (b, i) { b.classList.toggle('is-on', i === regionIdx); });
      restart(panel);
      restart($('.stay__caption'));
    }

    function renderRooms() {
      roomsHost.textContent = '';
      region().rooms.forEach(function (rm, i) {
        var node = el('button', 'room' + (i === roomIdx ? ' room is-on' : ''));
        node.className = 'room' + (i === roomIdx ? ' is-on' : '');
        node.type = 'button';
        node.setAttribute('aria-pressed', i === roomIdx ? 'true' : 'false');

        var left = el('div');
        left.appendChild(el('div', 'room__name', rm.name));
        left.appendChild(el('div', 'room__desc', rm.desc));

        var right = el('div', 'room__price');
        right.appendChild(el('div', 'room__amount', 'Q' + rm.price.toLocaleString('es-GT')));
        right.appendChild(el('div', 'room__unit', 'por noche'));

        node.appendChild(left);
        node.appendChild(right);
        node.addEventListener('click', function () {
          roomIdx = i;
          renderRooms();
          renderTotal();
        });
        roomsHost.appendChild(node);
      });
    }

    function renderNights() {
      nightsNode.textContent = nights;
      wordNode.textContent = nights === 1 ? 'noche' : 'noches';

      dotsHost.textContent = '';
      for (var i = 0; i < MAX_NIGHTS; i++) {
        var bar = el('i');
        if (i < nights) bar.className = 'is-on';
        dotsHost.appendChild(bar);
      }
    }

    function renderTotal() {
      var rm = room();
      totalNode.textContent = 'Q' + (rm.price * nights).toLocaleString('es-GT');
      summaryNode.textContent = rm.name + ' · ' + nights + ' ' + (nights === 1 ? 'noche' : 'noches');
      restart(totalNode);
    }

    $$('[data-region]').forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        regionIdx = i;
        roomIdx = 0;
        renderRegion();
        renderRooms();
        renderTotal();
      });
    });

    $('[data-nights-minus]').addEventListener('click', function () {
      nights = Math.max(1, nights - 1);
      renderNights();
      renderTotal();
    });
    $('[data-nights-plus]').addEventListener('click', function () {
      nights = Math.min(MAX_NIGHTS, nights + 1);
      renderNights();
      renderTotal();
    });

    renderRegion();
    renderRooms();
    renderNights();
    renderTotal();
  }

  /* --------------------------------- Init -------------------------------- */

  function init() {
    fitPage();
    fitModal();
    initBurger();
    initModal();
    initCatalog();
    initBuilder();

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
