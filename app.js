const data = {
  'en-US': {
    initial:  "Ready for a pick‑up line?",
    intro:    "Click the button to get a cheesy pick‑up line and share it!",
    generate: "Generate",
    lines: [
      "Are you a magician? Because whenever I look at you, everyone else disappears. ✨",
      "Do you have a name, or can I call you mine? 💌",
      "Is your dad a boxer? Because you're a knockout! 🥊"
    ],
    comments: ["You nailed it! 🔥","That’s fire! 🚀","Smooth move! 😉"],
    affTitle: "Surprise with a gift! 🎁",
    offers: [
      { title: "Bouquet of Flowers", img:"flower.jpg", link:"https://amzn.to/US_FLOWER" },
      { title: "Box of Chocolates", img:"choco.jpg", link:"https://amzn.to/US_CHOCOLATE" }
    ],
    langLabel: "Choose another language:"
  },
  'pt-BR': {
    initial:  "Pronto para uma cantada divertida?",
    intro:    "Clique no botão para gerar uma cantada divertida e compartilhe!",
    generate: "Generate",
    lines: [
      "Você é Wi‑Fi? Porque estou sentindo conexão. 📶",
      "Seu sorriso ilumina mais que o sol nascente. ☀️",
      "Se beleza fosse música, você seria uma sinfonia. 🎶"
    ],
    comments: ["Arrasou!! 🔥","Ai sim você vai longe! 🚀","Mandou bem! 😉"],
    affTitle: "Surpreenda com um presente! 🎁",
    offers: [
      { title: "Buquê de Flores", img:"flower.jpg", link:"https://amzn.to/BR_FLOWER" },
      { title: "Caixa de Chocolates", img:"choco.jpg", link:"https://amzn.to/BR_CHOCOLATE" }
    ],
    langLabel: "Escolha outro idioma:"
  },
  'es-ES': {
    initial:  "¿Listo para una cantada divertida?",
    intro:    "¡Haz clic para ver una cantada divertida y compártela!",
    generate: "Generate",
    lines: [
      "¿Eres un imán? Porque me atraes como nada más. 🧲",
      "Si la belleza fuera tiempo, tú serías la eternidad. ⌛️",
      "¿Eres una estrella? Porque iluminas mi noche. ⭐️"
    ],
    comments: ["¡Buenísimo! 🔥","¡Eso fue genial! 🚀","¡Qué smooth! 😉"],
    affTitle: "¡Sorprende con un regalo! 🎁",
    offers: [
      { title: "Ramo de Flores", img:"flower.jpg", link:"https://amzn.to/ES_FLOWER" },
      { title: "Caja de Chocolates", img:"choco.jpg", link:"https://amzn.to/ES_CHOCOLATE" }
    ],
    langLabel: "Elige otro idioma:"
  }
};

// elementos
const introEl    = document.getElementById('intro');
const lineEl     = document.getElementById('line');
const btn        = document.getElementById('generate');
const commentEl  = document.getElementById('comment');
const offersEl   = document.getElementById('offers');
const affSection = document.getElementById('affiliate');
const affTitle   = document.getElementById('affTitle');
const select     = document.getElementById('langSelect');
const langLabel  = document.getElementById('langLabel');
const copyIcon   = document.getElementById('copyIcon');
const shareIcon  = document.getElementById('shareIcon');

// Função de cópia com fallback
function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly','');
  ta.style.position = 'absolute';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(ta);
  return ok ? Promise.resolve() : Promise.reject();
}

// eventos de copy/share
copyIcon.addEventListener('click', () => {
  const text = lineEl.textContent;
  if (!text) return;
  copyText(text)
    .then(() => {
      commentEl.textContent = "Copied! ✅";
      setTimeout(() => commentEl.textContent = "", 1500);
    })
    .catch(() => {
      commentEl.textContent = "Copy failed 😢";
      setTimeout(() => commentEl.textContent = "", 1500);
    });
});
shareIcon.addEventListener('click', () => {
  const text = lineEl.textContent;
  const url  = window.location.href;
  if (!text) return;
  if (navigator.share) {
    navigator.share({ title:'Cheesy or Not?', text, url }).catch(()=>{});
  } else {
    window.open(
      'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text + ' ' + url),
      '_blank','noopener'
    );
  }
});

// detecta locale
let loc = navigator.language;
if (!data[loc]) {
  if (loc.startsWith('pt')) loc = 'pt-BR';
  else if (loc.startsWith('es')) loc = 'es-ES';
  else loc = 'en-US';
}
let currentLoc = loc;
select.value  = currentLoc;

// render ofertas
function renderOffers() {
  offersEl.innerHTML = '';
  data[currentLoc].offers.forEach(item => {
    const div = document.createElement('div');
    div.className = 'offer';
    div.innerHTML = `<img src="${item.img}" alt=""><a href="${item.link}" target="_blank">${item.title}</a>`;
    offersEl.appendChild(div);
  });
}

// atualiza UI
function updateUI() {
  const cfg = data[currentLoc];
  introEl.textContent    = cfg.intro;
  btn.textContent        = cfg.generate;
  lineEl.textContent     = cfg.initial;
  commentEl.textContent  = "";
  affTitle.textContent   = cfg.affTitle;
  langLabel.textContent  = cfg.langLabel;
  select.value           = currentLoc;
  renderOffers();
  affSection.style.display = (currentLoc==='pt-BR' || currentLoc==='en-US') ? 'block' : 'none';
}

// gerar frase
btn.addEventListener('click', () => {
  const cfg = data[currentLoc];
  const line = cfg.lines[Math.floor(Math.random()*cfg.lines.length)];
  const comm = cfg.comments[Math.floor(Math.random()*cfg.comments.length)];
  lineEl.textContent    = line;
  commentEl.textContent = comm;
});
// troca idioma
select.addEventListener('change', e => {
  currentLoc = e.target.value;
  updateUI();
});
// render inicial
updateUI();
