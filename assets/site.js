/* =====================================================================
   Vitrine do Caio (todas as páginas) — não depende do motor.
   - faixa de demo, ano do rodapé, menu do celular
   - mural / portfólio filtrável (Tattoos, Letrados, Desenhos) + lupa
   - flashes autorais (ou espaços reservados enquanto não há)
   - botões "quero uma arte autoral" já marcam o tipo de projeto
   - mapa e botão flutuante
   ===================================================================== */
(function () {
  'use strict';

  var CFG = window.TV;
  function $(s) { return document.querySelector(s); }
  function $$(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }
  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }

  $$('.ano').forEach(function (n) { n.textContent = new Date().getFullYear(); });
  if (CFG.modoDemo && $('#faixa-demo')) $('#faixa-demo').hidden = false;

  /* ---- menu do celular ---- */
  var bm = $('#btn-menu'), menu = $('#menu');
  if (bm && menu) {
    bm.addEventListener('click', function () {
      var aberto = bm.getAttribute('aria-expanded') === 'true';
      bm.setAttribute('aria-expanded', aberto ? 'false' : 'true');
      menu.classList.toggle('aberto', !aberto);
    });
    menu.addEventListener('click', function (ev) {
      if (ev.target.closest('a')) { bm.setAttribute('aria-expanded', 'false'); menu.classList.remove('aberto'); }
    });
  }
  // página atual destacada no menu
  var aqui = location.pathname.split('/').pop() || 'index.html';
  $$('#menu a').forEach(function (a) {
    if (a.getAttribute('href').split('#')[0] === aqui && !/#/.test(a.getAttribute('href'))) a.setAttribute('aria-current', 'page');
  });

  /* ---- lupa (foto ampliada, com setas) ---- */
  var lupa = null, fila = [], pos = 0;
  function mostra() {
    var f = fila[pos];
    lupa.querySelector('.lupa-leg').textContent = f.alt + '  ·  ' + (pos + 1) + '/' + fila.length;
    var im = lupa.querySelector('img'); im.src = f.src; im.alt = f.alt;
  }
  function amplia(lista, i) {
    if (!lupa) {
      lupa = el('dialog', 'lupa');
      lupa.innerHTML = '<div class="lupa-topo"><span class="lupa-leg"></span><button type="button" class="btn btn-linha mini" data-x>Fechar</button></div>' +
        '<img alt=""><div class="lupa-setas"><button type="button" class="btn btn-linha mini" data-p="-1" aria-label="Anterior">←</button><button type="button" class="btn btn-linha mini" data-p="1" aria-label="Próxima">→</button></div>';
      lupa.addEventListener('click', function (ev) {
        if (ev.target === lupa || ev.target.hasAttribute('data-x')) return lupa.close();
        var p = ev.target.getAttribute('data-p');
        if (p) { pos = (pos + (+p) + fila.length) % fila.length; mostra(); }
      });
      lupa.addEventListener('keydown', function (ev) {
        if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') { pos = (pos + (ev.key === 'ArrowRight' ? 1 : -1) + fila.length) % fila.length; mostra(); }
      });
      document.body.appendChild(lupa);
    }
    fila = lista; pos = i; mostra();
    if (lupa.showModal) lupa.showModal(); else window.open(lista[i].src, '_blank');
  }

  function nomeCat(id) { return ((CFG.categorias || []).filter(function (c) { return c.id === id; })[0] || {}).nome || ''; }

  function peca(f, lista, i) {
    var fig = el('figure', 'peca');
    fig.setAttribute('data-cat', f.cat || '');
    var b = el('button', 'peca-btn');
    b.type = 'button';
    b.setAttribute('aria-label', 'Ampliar: ' + f.alt);
    var im = el('img'); im.src = f.src; im.alt = f.alt; im.loading = 'lazy';
    if (f.pos) im.style.objectPosition = f.pos;
    b.appendChild(im);
    b.addEventListener('click', function () { amplia(lista, i); });
    fig.appendChild(b);
    var cap = el('figcaption');
    cap.appendChild(el('span', 'peca-cat', nomeCat(f.cat)));
    cap.appendChild(el('span', null, f.alt));
    fig.appendChild(cap);
    return fig;
  }

  /* ---- amostra na capa ---- */
  var amostra = $('#mural-capa');
  if (amostra) {
    var n = +amostra.getAttribute('data-max') || 6;
    var l0 = CFG.portfolio.slice(0, n);
    l0.forEach(function (f, i) { amostra.appendChild(peca(f, l0, i)); });
  }

  /* ---- portfólio filtrável ---- */
  var grade = $('#portfolio');
  if (grade) {
    var filtros = $('#filtros'), atual = 'todos';
    var vazio = $('#port-vazio');
    function pinta() {
      grade.innerHTML = '';
      var l = CFG.portfolio.filter(function (f) { return atual === 'todos' || f.cat === atual; });
      l.forEach(function (f, i) { grade.appendChild(peca(f, l, i)); });
      // categoria com poucas peças: espaço reservado para as fotos dos destaques
      var reserva = atual === 'todos' ? 0 : Math.max(0, 3 - l.length);
      for (var k = 0; k < reserva; k++) {
        var r = el('figure', 'peca peca-reserva');
        r.appendChild(el('span', 'reserva-tag', 'em breve'));
        r.appendChild(el('span', 'reserva-txt', 'Mais ' + nomeCat(atual).toLowerCase() + ' do destaque do Instagram entram aqui'));
        grade.appendChild(r);
      }
      vazio.hidden = !!l.length;
      $$('#filtros button').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-f') === atual ? 'true' : 'false'); });
      $('#port-conta').textContent = l.length + (l.length === 1 ? ' peça' : ' peças');
    }
    [{ id: 'todos', nome: 'Todos' }].concat(CFG.categorias).forEach(function (c) {
      var b = el('button', 'filtro-btn');
      b.type = 'button'; b.setAttribute('data-f', c.id);
      var qtd = c.id === 'todos' ? CFG.portfolio.length : CFG.portfolio.filter(function (f) { return f.cat === c.id; }).length;
      b.appendChild(document.createTextNode(c.nome + ' '));
      b.appendChild(el('small', null, String(qtd)));
      b.addEventListener('click', function () {
        atual = c.id; pinta();
        try { history.replaceState(null, '', c.id === 'todos' ? location.pathname : '#' + c.id); } catch (e) {}
      });
      filtros.appendChild(b);
    });
    var h = location.hash.slice(1);
    if (CFG.categorias.some(function (c) { return c.id === h; })) atual = h;
    pinta();
  }

  /* ---- flashes / autorais disponíveis ---- */
  var fl = $('#flashes');
  if (fl) {
    var lf = CFG.flashes || [];
    if (lf.length) {
      lf.forEach(function (f, i) {
        var c = el('article', 'flash');
        var b = el('button', 'flash-img'); b.type = 'button';
        var im = el('img'); im.src = f.src; im.alt = f.titulo; im.loading = 'lazy';
        b.appendChild(im);
        b.addEventListener('click', function () { amplia(lf.map(function (x) { return { src: x.src, alt: x.titulo }; }), i); });
        c.appendChild(b);
        c.appendChild(el('h3', null, f.titulo));
        if (f.tamanho) c.appendChild(el('p', null, f.tamanho));
        var q = el('a', 'btn btn-spray mini', 'Quero esse');
        q.href = 'index.html#agendar'; q.setAttribute('data-projeto', 'Arte autoral do Caio'); q.setAttribute('data-ideia', 'Flash: ' + f.titulo);
        c.appendChild(q);
        fl.appendChild(c);
      });
    } else {
      ['01', '02', '03'].forEach(function (n) {
        var c = el('article', 'flash flash-reserva');
        var m = el('div', 'flash-moldura');
        m.appendChild(el('span', 'flash-num', n));
        m.appendChild(el('span', 'flash-tag', 'flash autoral'));
        c.appendChild(m);
        c.appendChild(el('h3', null, 'Arte do Caio disponível'));
        c.appendChild(el('p', null, 'Desenho autoral pronto para tatuar. Quando ele publicar, aparece aqui com tamanho e local sugerido.'));
        fl.appendChild(c);
      });
    }
  }

  /* ---- "quero uma arte autoral" etc.: já marca o tipo de projeto ---- */
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('[data-projeto]');
    if (!a || !$('#agendar-app')) return;
    ev.preventDefault();
    var tipo = a.getAttribute('data-projeto');
    $$('#pj-estilo .chip').forEach(function (c) { c.setAttribute('aria-pressed', c.textContent === tipo ? 'true' : 'false'); });
    var ideia = a.getAttribute('data-ideia'), cx = $('#pj-ideia');
    if (ideia && cx && !cx.value) cx.value = ideia;
    $('#agendar').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---- link com âncora vindo de outra página (#agendar) ---- */
  window.addEventListener('load', function () {
    var alvo = location.hash.length > 1 && document.getElementById(location.hash.slice(1));
    if (alvo && !grade) setTimeout(function () { alvo.scrollIntoView(); }, 150);
  });

  /* ---- botão flutuante: some no topo e quando o pedido está na tela ---- */
  var flutua = $('.flutua'), agendar = $('#agendar');
  if (flutua) {
    var visto = false;
    var atualiza = function () { flutua.hidden = window.scrollY < window.innerHeight * 0.7 || visto; };
    if (agendar && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { visto = es[0].isIntersecting; atualiza(); }, { threshold: 0.05 }).observe(agendar);
    }
    window.addEventListener('scroll', atualiza, { passive: true });
    atualiza();
  }

  /* ---- mapa ---- */
  var mapa = $('#mapa');
  if (mapa && CFG.endereco.embed) {
    var ifr = el('iframe');
    ifr.src = CFG.endereco.embed; ifr.loading = 'lazy'; ifr.title = 'Mapa: ' + CFG.endereco.busca;
    ifr.referrerPolicy = 'no-referrer-when-downgrade';
    mapa.appendChild(ifr);
  }

  /* ---- FAQ: abre um por vez ---- */
  $$('.faq details').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) $$('.faq details').forEach(function (o) { if (o !== d) o.open = false; });
    });
  });
})();
