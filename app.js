// data for lines, comments, affiliate
const data = {
  'en-US': {
    lines: [
      "Are you a magician? Because whenever I look at you, everyone else disappears. ✨",
      "Do you have a name, or can I call you mine? 💌",
      "Is your dad a boxer? Because you're a knockout! 🥊"
    ],
    comments: ["You nailed it! 🔥","That’s fire! 🚀","Smooth move! 😉"],
    affTitle: "Surprise with a gift! 🎁",
    offers: [
      { title: "Bouquet of Flowers", img:"flower.jpg", link:"https://amzn.to/BR_FLOWER" },
      { title: "Box of Chocolates", img:"choco.jpg", link:"https://amzn.to/BR_CHOCOLATE" }
    ]
  },
  'pt-BR': {
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
    ]
  },
  'es-ES': {
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
    ]
  }
};

// elements
const lineEl    = document.getElementById('line');
const commentEl = document.getElementById('comment');
const btn       = document.getElementById('generate');
const offersEl  = document.getElementById('offers');
const affSection= document.getElementById('affiliate');
const affTitle  = document.getElementById('affTitle');
const select    = document.getElementById('langSelect');
const langLabel = document.getElementById('langLabel');

// detect browser locale
let currentLoc = navigator.language;
if (!data[currentLoc]) currentLoc = 'en-US';

// initialize dropdown
select.value = currentLoc;

// render affiliate offers (all, will hide later if needed)
function renderOffers() {
  offersEl.innerHTML = '';
  data[currentLoc].offers.forEach(item => {
    const div = document.createElement('div');
    div.className = 'offer';
    div.innerHTML = `<img src="${item.img}" alt=""><a href="${item.link}" target="_blank">${item.title}</a>`;
    offersEl.appendChild(div);
  });
}

// update UI texts & affiliate visibility
function updateUI() {
  const cfg = data[currentLoc];
  langLabel.textContent = {
    'en-US':'Choose another language:',
    'pt-BR':'Escolha outro idioma:',
    'es-ES':'Elige otro idioma:'
  }[currentLoc];
  select.value = currentLoc;
  affTitle.textContent = cfg.affTitle;
  renderOffers();
  // show affiliate only for BR or US
  affSection.style.display = (currentLoc==='pt-BR' || currentLoc==='en-US') ? 'block' : 'none';
}

// generate line + comment
btn.addEventListener('click', () => {
  const cfg = data[currentLoc];
  const line = cfg.lines[Math.floor(Math.random()*cfg.lines.length)];
  const comm = cfg.comments[Math.floor(Math.random()*cfg.comments.length)];
  lineEl.textContent = line;
  commentEl.textContent = comm;
});

// language switch
select.addEventListener('change', e => {
  currentLoc = e.target.value;
  updateUI();
});

// first render
updateUI();
