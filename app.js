const data = {
  'en-US': {
    initial:  "Ready for a pick‑up line?",
    intro:    "Click the button to generate a cheesy pick‑up line and share it!",
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
    initial:  "Vamos gerar uma cantada?",
    intro:    "Clique no botão para gerar uma cantada divertida e compartilhe!",
    generate: "Generate",
    lines: [
      "Você acredita em amor à primeira vista ou devo passar de novo? 👀",
      "Seu pai é padeiro? Porque você é um sonho! 🥐",
      "Você é Wi‑Fi? Porque estou sentindo conexão. 📶"
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
    initial:  "¡Hora de una frase divertida!",
    intro:    "¡Haz clic para generar una frase divertida y compártela!",
    generate: "Generate",
    lines: [
      "¿Eres un mago? Porque cada vez que te veo, desaparece todo lo demás. ✨",
      "¿Tienes nombre o puedo llamarte mío? 💌",
      "¿Tu papá es boxeador? ¡Porque eres un nocaut! 🥊"
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
const introEl    = document.getElementById('intro');
const lineEl     = document.getElementById('line');
const btn        = document.getElementById('generate');
const commentEl  = document.getElementById('comment');
const offersEl   = document.getElementById('offers');
const affSection = document.getElementById('affiliate');
const affTitle   = document.getElementById('affTitle');
const select     = document.getElementById('langSelect');
const langLabel  = document.getElementById('langLabel');
const copyBtn  = document.getElementById('copyBtn');
const shareBtn = document.getElementById('shareBtn');

// Copy to clipboard
copyBtn.addEventListener('click', () => {
  const text = lineEl.textContent;
  if (!text) return;
  navigator.clipboard.writeText(text)
    .then(() => {
      commentEl.textContent = "Copied! ✅";
      setTimeout(() => commentEl.textContent = "", 1500);
    })
    .catch(() => {
      commentEl.textContent = "Copy failed 😢";
      setTimeout(() => commentEl.textContent = "", 1500);
    });
});

// Share via Web Share API or Twitter fallback
shareBtn.addEventListener('click', () => {
  const text = lineEl.textContent;
  const url  = window.location.href;
  if (navigator.share) {
    navigator.share({
      title: 'Cheesy or Not?',
      text,
      url
    }).catch(() => {});
  } else {
    // fallback: open Twitter intent
    const shareUrl = 
      'https://twitter.com/intent/tweet?text='
      + encodeURIComponent(text + ' ' + url);
    window.open(shareUrl, '_blank', 'noopener');
  }
});

// detect browser locale and fall back if needed
let loc = navigator.language;
if (!data[loc]) {
  if (loc.startsWith('pt')) loc = 'pt-BR';
  else if (loc.startsWith('es')) loc = 'es-ES';
  else loc = 'en-US';
}
let currentLoc = loc;
select.value  = currentLoc;

// render affiliate offers
function renderOffers() {
  offersEl.innerHTML = '';
  data[currentLoc].offers.forEach(item => {
    const div = document.createElement('div');
    div.className = 'offer';
    div.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <a href="${item.link}" target="_blank">${item.title}</a>
    `;
    offersEl.appendChild(div);
  });
}

// update all UI text
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

// on click generate
btn.addEventListener('click', () => {
  const cfg = data[currentLoc];
  const line = cfg.lines[Math.floor(Math.random()*cfg.lines.length)];
  const comm = cfg.comments[Math.floor(Math.random()*cfg.comments.length)];
  lineEl.textContent    = line;
  commentEl.textContent = comm;
});

// on language change
select.addEventListener('change', e => {
  currentLoc = e.target.value;
  updateUI();
});

// initial render
updateUI();
