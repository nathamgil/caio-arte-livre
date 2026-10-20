/* =====================================================================
   Caio Boyda · Arte Livre — configuração
   Único arquivo que precisa ser editado para o site sair do modo de
   demonstração e entrar no ar de verdade.
   Tudo aqui veio do Instagram @caioartelivre (20/10/2026). O que não
   estava lá está marcado "A CONFIRMAR".
   ===================================================================== */

window.TV = {

  /* ---- Artista ------------------------------------------------------ */
  nome:        'Caio Boyda · Arte Livre',
  nomeCurto:   'Caio Boyda',
  slogan:      'Tatuador & grafiteiro · Salvador',
  assinatura:  'Tattoos com identidade',
  instagram:   'caioartelivre',
  linkAgenda:  'https://mono.direct/caioartelivre',   // link de agendamento que está hoje na bio
  prefixoDemo: 'cal_',   // chaves da demo no navegador (agenda.js e admin.js usam o mesmo)
  logo:        'fotos/caio-perfil.jpg',

  // textos que o motor (agenda.js) usa
  textoPreco: 'Sob orçamento',
  rotServico: 'Sessão',
  textoSite:  'Fiz meu pedido de orçamento pelo site do Caio.',
  contatoTxt: 'chame o Caio no Direct do Instagram',

  // WhatsApp: A CONFIRMAR. Vazio = o resumo do pedido vai pelo Direct
  // do Instagram (copiado para colar).
  whatsapp:        '',
  whatsappVisivel: '',

  // Do post "Onde a arte ganha forma / Nossa localização" (Tatto Grafite Studio).
  estudio: 'Tatto Grafite Studio',
  endereco: {
    linha1: 'R. Waldemar Falcão, 146',
    linha2: 'Brotas, Salvador — BA · 40296-700',
    referencia: 'Perto do Condomínio Florestal Shopping',
    maps:   'https://www.google.com/maps/search/?api=1&query=R.+Waldemar+Falc%C3%A3o%2C+146%2C+Brotas%2C+Salvador+BA',
    embed:  'https://www.google.com/maps?q=R.+Waldemar+Falc%C3%A3o%2C+146%2C+Brotas%2C+Salvador+-+BA&output=embed',
    busca:  'R. Waldemar Falcão, 146, Brotas, Salvador - BA'
  },
  // A CONFIRMAR: não está publicado. Provisório para a agenda funcionar.
  funcionamento: 'Com hora marcada (dias e horários a confirmar)',

  /* ---- Supabase ---------------------------------------------------
     Vazios = MODO DEMONSTRAÇÃO (tudo funciona, mas fica no navegador).
     Para ligar: supabase.com > New project (São Paulo) > SQL Editor >
     rode db/schema.sql > Settings > API > cole URL e chave anon abaixo.
  ------------------------------------------------------------------ */
  supabaseUrl: '',
  supabaseKey: '',

  regras: {
    passoMin:        30,
    antecedenciaMin: 60,
    janelaDias:      30,
    cancelamentoH:   2
  },
  semPreferencia: false,

  /* ---- Expediente (0 = domingo) — A CONFIRMAR -------------------- */
  expediente: {
    0: { aberto: false },
    1: { aberto: true, abre: '10:00', fecha: '19:00' },
    2: { aberto: true, abre: '10:00', fecha: '19:00' },
    3: { aberto: true, abre: '10:00', fecha: '19:00' },
    4: { aberto: true, abre: '10:00', fecha: '19:00' },
    5: { aberto: true, abre: '10:00', fecha: '19:00' },
    6: { aberto: true, abre: '10:00', fecha: '16:00' }
  },

  /* ---- O artista (um só: a etapa "com quem" some sozinha) ---------- */
  artistas: [
    {
      slug: 'caio', nome: 'Caio Boyda', apelido: 'Caio', instagram: 'caioartelivre', whatsapp: '',
      foto: 'fotos/caio-perfil.jpg',
      oficio: 'Tatuador & grafiteiro',
      linha: 'Tattoos autorais · Fine line · Freehand · Realismo',
      estilos: ['Tattoos autorais', 'Fine line', 'Freehand', 'Realismo', 'Letrados']
    }
  ],

  /* ---- Portfólio (portfolio.html) ---------------------------------
     cat: tattoos | letrados | desenhos. Só fotos do Instagram dele.
     Os destaques LETRADOs e DESENHOs têm mais peças: A CONFIRMAR as fotos.
  ------------------------------------------------------------------ */
  portfolio: [
    { src: 'fotos/tattoo-lobo.jpg',     cat: 'tattoos',  alt: 'Lobo em realismo no antebraço' },
    { src: 'fotos/tattoo-tigre.jpg',    cat: 'tattoos',  alt: 'Tigre em preto e cinza no braço' },
    { src: 'fotos/letrado-salmo.jpg',   cat: 'letrados', alt: 'Letrado do Salmo 91:7 na costela' },
    { src: 'fotos/autoral-familia.jpg', cat: 'desenhos', alt: 'Desenho autoral de família com flores, colorido, no braço' },
    { src: 'fotos/tattoo-arraia.jpg',   cat: 'tattoos',  alt: 'Arraia em blackwork no ombro' },
    { src: 'fotos/tattoo-carpa.jpg',    cat: 'tattoos',  alt: 'Carpa colorida com flores no ombro' },
    { src: 'fotos/tattoo-pena.jpg',     cat: 'tattoos',  alt: 'Pena em preto e cinza na costela', pos: 'center 40%' }
  ],
  categorias: [
    { id: 'tattoos',  nome: 'Tattoos' },
    { id: 'letrados', nome: 'Letrados' },
    { id: 'desenhos', nome: 'Desenhos & autorais' }
  ],

  /* ---- Flashes / autorais disponíveis ------------------------------
     Artes do Caio prontas para tatuar. Vazio = o site mostra os espaços
     reservados. Formato: { titulo, src, tamanho } . A CONFIRMAR com ele.
  ------------------------------------------------------------------ */
  flashes: [],

  // Tudo sob orçamento (preço 0). Durações A CONFIRMAR: só reservam a agenda.
  servicosDemo: [
    { id:'orcamento',    nome:'Conversa de orçamento', descricao:'Para ver a ideia, o local e o tamanho com o Caio e fechar valor e data.', preco_centavos:0, a_partir_de:false, duracao_min:30,  categoria:'Começo' },
    { id:'sessao-pequena', nome:'Sessão pequena',      descricao:'Peças menores, letrados curtos e fine line.',                           preco_centavos:0, a_partir_de:false, duracao_min:120, categoria:'Sessão' },
    { id:'sessao-media',   nome:'Sessão média',        descricao:'Peças com mais detalhe: antebraço, panturrilha, costela.',              preco_centavos:0, a_partir_de:false, duracao_min:240, categoria:'Sessão' },
    { id:'sessao-longa',   nome:'Sessão longa',        descricao:'Boa parte do dia para realismo grande e fechamentos.',                  preco_centavos:0, a_partir_de:false, duracao_min:360, categoria:'Sessão' },
    { id:'cobertura',      nome:'Avaliação de cobertura', descricao:'Para cobrir uma tattoo antiga: o Caio avalia a peça e desenha a solução.', preco_centavos:0, a_partir_de:false, duracao_min:30, categoria:'Começo' }
  ],

  /* ---- Tipo de projeto (obrigatório no pedido) ----------------------- */
  estilos: ['Arte autoral do Caio', 'Ideia minha', 'Letrado (lettering)', 'Freehand (desenho na pele)', 'Cobrir tattoo antiga'],

  /* ---- Estilo (opcional no pedido) — da bio ----------------------- */
  estilosTattoo: ['Fine line', 'Realismo', 'Preto e cinza', 'Colorida', 'Blackwork', 'Ainda não sei']
};

// o motor chama os profissionais de "barbeiros" (nome herdado, não aparece na tela)
window.TV.barbeirosDemo = window.TV.artistas.map(function (a) {
  return { id: a.slug, slug: a.slug, nome: a.nome, foto: a.foto, instagram: a.instagram,
           whatsapp: a.whatsapp, cargo: a.linha };
});
window.TV.artistaPor = function (chave) {
  return window.TV.artistas.filter(function (a) {
    return a.slug === chave || a.nome === chave || a.instagram === chave;
  })[0] || null;
};
window.TV.modoDemo = !(window.TV.supabaseUrl && window.TV.supabaseKey);
