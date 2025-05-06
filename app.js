window.addEventListener('DOMContentLoaded', () => {

  const data = {
    'en-US': {
      intro: "Click to generate a cheesy pick-up line!",
      generate: "Generate",
      initial: "Ready for a pick-up line?",
      lines: [
        "Are you a magician? Because whenever I look at you, everyone else disappears.",
        "Do you have a name, or can I call you mine?",
        "Is your dad a boxer? Because you're a knockout!"
      ],
      comments: ["🔥", "😊", "😉"],
      affTitle: "Surprise someone!",
      offers: [
        { title: "Flowers 🌸", link: "https://amzn.to/US_FLOWER" },
        { title: "Chocolates 🍫", link: "https://amzn.to/US_CHOCOLATE" }
      ],
      langLabel: "Choose another language:"
    },
    'pt-BR': {
      intro: "Clique para gerar uma cantada!",
      generate: "Gerar cantada",
      initial: "Que tal uma cantada divertida?",
      lines: [
        "Você é Wi-Fi? Porque estou sentindo conexão.",
        "Seu sorriso ilumina mais que o sol.",
        "Se beleza fosse música, você seria uma sinfonia."
      ],
      comments: ["🔥", "😊", "😉"],
      affTitle: "Surpreenda alguém!",
      offers: [
        { title: "Flores 🌸", link: "https://amzn.to/BR_FLOWER" },
        { title: "Chocolates 🍫", link: "https://amzn.to/BR_CHOCOLATE" }
      ],
      langLabel: "Escolha outro idioma:"
    },
    'es-ES': {
      intro: "¡Haz clic para una frase divertida!",
      generate: "Generar frase",
      initial: "¿Listo para sonreír?",
      lines: [
        "¿Eres un imán? Porque me atraes como nada más.",
        "Si la belleza fuera tiempo, serías eternidad.",
        "¿Eres una estrella? Porque iluminas mi noche."
      ],
      comments: ["🔥", "😊", "😉"],
      affTitle: "¡Sorprende a alguien!",
      offers: [
        { title: "Flores 🌸", link: "https://amzn.to/ES_FLOWER" },
        { title: "Chocolates 🍫", link: "https://amzn.to/ES_CHOCOLATE" }
      ],
      langLabel: "Elige otro idioma:"
    }
  };

  const introEl = document.getElementById('intro');
  const lineEl = document.getElementById('line');
  const btn = document.getElementById('generate');
  const commentEl = document.getElementById('comment');
  const select = document.getElementById('langSelect');
  const langLabel = document.getElementById('langLabel');
  const affSection = document.getElementById('affiliate');
  const affTitle = document.getElementById('affTitle');
  const offersEl = document.getElementById('offers');

  let currentLang = navigator.language in data ? navigator.language : 'en-US';
  select.value = currentLang;

  function renderAffiliate() {
    offersEl.innerHTML = '';
    data[currentLang].offers.forEach(item => {
      const a = document.createElement('a');
      a.textContent = item.title;
      a.href = item.link;
      a.target = '_blank';
      offersEl.appendChild(a);
      offersEl.appendChild(document.createElement('br'));
    });

    affTitle.textContent = data[currentLang].affTitle;
    affSection.style.display = ['pt-BR','en-US'].includes(currentLang) ? 'block' : 'none';
  }

  function updateUI() {
    introEl.textContent = data[currentLang].intro;
    lineEl.textContent = data[currentLang].initial;
    btn.textContent = data[currentLang].generate;
    langLabel.textContent = data[currentLang].langLabel;
    commentEl.textContent = '';
    renderAffiliate();
  }

  btn.addEventListener('click', () => {
    const line = data[currentLang].lines[Math.floor(Math.random() * data[currentLang].lines.length)];
    const comment = data[currentLang].comments[Math.floor(Math.random() * data[currentLang].comments.length)];
    lineEl.textContent = line;
    commentEl.textContent = comment;
  });

  select.addEventListener('change', () => {
    currentLang = select.value;
    updateUI();
  });

  updateUI();
});
