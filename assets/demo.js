/* =====================================================================
   Caio Boyda · Arte Livre — dados de EXEMPLO do modo demonstração.
   Só roda com o Supabase desligado. Clientes fictícios, marcados
   "(exemplo)". Valores em R$ também fictícios: mostram o funil, não são
   tabela do Caio. As "referências" usam fotos da pasta fotos/.
   Carrega depois de config.js e antes de agenda.js / admin.js.
   ===================================================================== */
(function () {
  'use strict';
  var CFG = window.TV;
  if (!CFG || !CFG.modoDemo) return;
  var PFX = CFG.prefixoDemo || 'dv_';
  var VERSAO = PFX + 'semeado_v1';
  try { if (localStorage.getItem(VERSAO)) return; } catch (e) { return; }

  function iso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function aberto(d) { var e = (CFG.expediente || {})[d.getDay()]; return e ? !!e.aberto : d.getDay() !== 0; }
  function dia(off) {
    var d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + off);
    for (var i = 0; i < 7 && !aberto(d); i++) d.setDate(d.getDate() + (off < 0 ? -1 : 1));
    return iso(d);
  }
  function outroDia(s, passo) {
    var p = s.split('-'), d = new Date(+p[0], +p[1] - 1, +p[2], 12);
    do { d.setDate(d.getDate() + passo); } while (!aberto(d));
    return iso(d);
  }
  function criado(off, h) { var d = new Date(); d.setDate(d.getDate() + off); d.setHours(h || 10, 17, 0, 0); return d.toISOString(); }
  function min(t) { var p = t.split(':'); return (+p[0]) * 60 + (+p[1]); }
  function hora(m) { return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); }

  var SERV = {};
  (CFG.servicosDemo || []).forEach(function (s) { SERV[s.id] = s; });

  function pj(tipo, estilo, local, tam, ideia, extra) {
    return ['Projeto: ' + tipo, estilo ? 'Estilo: ' + estilo : '', 'Local: ' + local, 'Tamanho: ' + tam]
      .concat(extra || [], ['Ideia: ' + ideia]).filter(Boolean).join('\n');
  }

  // [serviço, dia, início, cliente, etapa, obs, anexos, valor, sinal, sinal pago, criado há n dias]
  var L = [
    ['orcamento',      dia(1),  '10:00', 'Camila S.',  'novo',      pj('Arte autoral do Caio', 'Colorida', 'Braço', '10 a 20 cm', 'Quero uma arte sua com a minha família, no estilo daquela com flores', ['Primeira tattoo: Sim']), ['fotos/autoral-familia.jpg'], 0, 0, false, 0],
    ['cobertura',      dia(2),  '11:00', 'Rodrigo M.', 'novo',      pj('Cobrir tattoo antiga', 'Blackwork', 'Ombro', '10 a 20 cm', 'Cobrir um tribal antigo, pode ser algo bem preto', ['Cobertura: Sim']), [], 0, 0, false, 0],
    ['sessao-pequena', dia(7),  '14:00', 'Amanda R.',  'novo',      pj('Letrado (lettering)', 'Fine line', 'Costela', '10 a 20 cm', 'Versículo em letra fina acompanhando a costela'), ['fotos/letrado-salmo.jpg'], 0, 0, false, -1],
    ['sessao-media',   dia(3),  '10:00', 'Bruno T.',   'conversa',  pj('Ideia minha', 'Realismo', 'Antebraço', '10 a 20 cm', 'Lobo realista no antebraço, olhando para frente'), ['fotos/tattoo-lobo.jpg'], 0, 0, false, -2],
    ['orcamento',      dia(2),  '15:00', 'Júlia P.',   'conversa',  pj('Freehand (desenho na pele)', 'Preto e cinza', 'Perna / panturrilha', 'Mais de 20 cm', 'Quero que você desenhe direto na perna, algo com folhas'), [], 0, 0, false, -3],
    ['sessao-media',   dia(6),  '10:00', 'Larissa P.', 'orcado',    pj('Ideia minha', 'Preto e cinza', 'Braço', '10 a 20 cm', 'Tigre entre folhas no braço'), ['fotos/tattoo-tigre.jpg'], 80000, 20000, false, -4],
    ['sessao-pequena', dia(4),  '14:00', 'Wesley N.',  'orcado',    pj('Letrado (lettering)', '', 'Antebraço', '5 a 10 cm', 'Nome da minha filha em letra cursiva'), [], 35000, 10000, true, -5],
    ['sessao-pequena', dia(0),  '15:00', 'Tainá O.',   'marcado',   pj('Ideia minha', 'Blackwork', 'Ombro', '10 a 20 cm', 'Arraia bem preta no ombro'), ['fotos/tattoo-arraia.jpg'], 45000, 15000, true, -7],
    ['sessao-longa',   dia(5),  '10:00', 'Vanessa L.', 'marcado',   pj('Arte autoral do Caio', 'Colorida', 'Ombro', 'Mais de 20 cm', 'Carpa com flores, colorida, fechando o ombro'), ['fotos/tattoo-carpa.jpg'], 150000, 30000, true, -9],
    ['sessao-pequena', dia(-5), '10:00', 'Priscila F.','concluido', pj('Ideia minha', 'Preto e cinza', 'Costela', '10 a 20 cm', 'Pena na costela'), [], 40000, 10000, true, -14],
    ['sessao-media',   dia(-8), '13:00', 'Diego A.',   'concluido', pj('Ideia minha', 'Realismo', 'Antebraço', '10 a 20 cm', 'Leão realista'), [], 70000, 20000, true, -16],
    ['cobertura',      dia(-2), '16:00', 'Lucas M.',   'recusado',  pj('Cobrir tattoo antiga', 'Colorida', 'Peito', 'Mais de 20 cm', 'Cobrir uma tattoo grande no peito', ['Cobertura: Sim']), [], 0, 0, false, -6]
  ];

  var ocupado = {}, hoje = iso(new Date());
  var lista = L.map(function (x, i) {
    var s = SERV[x[0]] || { nome: x[0], duracao_min: 60 };
    var status = x[4] === 'concluido' ? 'concluido' : x[4] === 'recusado' ? 'cancelado' : 'confirmado';
    var ini = min(x[2]), fimMin = ini + s.duracao_min, d = x[1];
    if (status === 'confirmado') {
      for (var t = 0; t < 14; t++) {
        var livre = !(ocupado[d] || []).some(function (o) { return ini < o[1] && fimMin > o[0]; });
        var exp = CFG.expediente[new Date(d + 'T12:00').getDay()];
        if (livre && exp && exp.fecha && fimMin <= min(exp.fecha)) break;
        d = outroDia(d, d < hoje ? -1 : 1);
      }
      (ocupado[d] = ocupado[d] || []).push([ini, fimMin]);
    }
    return {
      codigo: 'EX' + String(1001 + i), barbeiro_id: 'caio', barbeiro: 'Caio Boyda',
      servico: s.nome, preco_centavos: 0, nome: x[3] + ' (exemplo)',
      telefone: '719000000' + String(10 + i), dia: d, inicio: hora(ini), fim: hora(fimMin),
      obs: x[5], status: status, anexos: x[6], exemplo: true,
      etapa: x[4], valor_centavos: x[7], sinal_centavos: x[8], sinal_pago: x[9], criado_em: criado(x[10])
    };
  });
  var bloqueios = [
    { id: 'b1', barbeiro_id: 'caio', data: dia(10), hora_inicio: '00:00', hora_fim: '23:59', motivo: 'Grafite: mural (exemplo)' }
  ];
  try {
    localStorage.setItem(PFX + 'agendamentos_demo', JSON.stringify(lista));
    localStorage.setItem(PFX + 'bloqueios_demo', JSON.stringify(bloqueios));
    localStorage.removeItem(PFX + 'artistas_demo');
    localStorage.setItem(PFX + 'demo_semeado_v1', '1');
    localStorage.setItem(VERSAO, '1');
  } catch (e) {}
})();
