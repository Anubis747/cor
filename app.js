window.addEventListener('DOMContentLoaded', () => {

  const translations = {
    'en-US': {
      intro: "Click to generate a cheesy pick-up line!",
      generate: "Generate",
      initial: "Ready for a pick-up line?",
      langLabel: "Choose another language:"
    },
    'pt-BR': {
      intro: "Clique para gerar uma cantada!",
      generate: "Gerar cantada",
      initial: "Que tal uma cantada divertida?",
      langLabel: "Escolha outro idioma:"
    },
    'es-ES': {
      intro: "¡Haz clic para una frase divertida!",
      generate: "Generar frase",
      initial: "¿Listo para sonreír?",
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

  let linesArray = [];
  let commentsArray = [];

  let currentLang = select.value || 'en-US';

  function loadLanguageData(langCode) {
    fetch(`lines_${langCode.replace('-', '_')}.json`)
      .then(res => res.json())
      .then(data => {
        linesArray = data.lines;
        commentsArray = data.comments;
        updateUI();
      })
      .catch(err => {
        console.error("Erro ao carregar dados:", err);
        linesArray = ["Error loading pickup lines."];
        commentsArray = ["Oops!"];
        updateUI();
      });
  }

  function renderAffiliate() {
    const affData = {
      'en-US': {
        title: 'Surprise with a gift! 🎁',
        offers: [
          { name: 'Bouquet of Flowers', link: 'https://amzn.to/US_FLOWER' },
          { name: 'Box of Chocolates', link: 'https://amzn.to/US_CHOCOLATE' }
        ]
      },
      'pt-BR': {
        title: 'Surpreenda com um presente! 🎁',
        offers: [
          { name: 'Buquê de Flores', link: 'https://amzn.to/BR_FLOWER' },
          { name: 'Caixa de Chocolates', link: 'https://amzn.to/BR_CHOCOLATE' }
        ]
      },
      'es-ES': {
        title: '¡Sorprende con un regalo! 🎁',
        offers: [
          { name: 'Ramo de Flores', link: 'https://amzn.to/ES_FLOWER' },
          { name: 'Caja de Chocolates', link: 'https://amzn.to/ES_CHOCOLATE' }
        ]
      }
    };

    const localeData = affData[currentLang];
    if (!localeData) {
      affSection.style.display = 'none';
      return;
    }

    affSection.style.display = 'block';
    affTitle.textContent = localeData.title;
    offersEl.innerHTML = '';

    localeData.offers.forEach(offer => {
      const offerLink = document.createElement('a');
      offerLink.href = offer.link;
      offerLink.textContent = offer.name;
      offerLink.target = '_blank';
      offerLink.rel = 'noopener';
      offersEl.appendChild(offerLink);
    });
  }

  function updateUI() {
    const t = translations[currentLang] || translations['en-US'];
    introEl.textContent = t.intro;
    lineEl.textContent = t.initial;
    btn.textContent = t.generate;
    langLabel.textContent = t.langLabel;
    commentEl.textContent = '';
    renderAffiliate();
  }

  btn.addEventListener('click', () => {
    if (linesArray.length === 0) return;
    const line = linesArray[Math.floor(Math.random() * linesArray.length)];
    const comment = commentsArray[Math.floor(Math.random() * commentsArray.length)];
    lineEl.textContent = line;
    commentEl.textContent = comment;
  });

  select.addEventListener('change', () => {
    currentLang = select.value;
    loadLanguageData(currentLang);
  });

  function copyText(text) {
    if (navigator.clipboard?.writeText) {
      return navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok ? Promise.resolve() : Promise.reject();
    }
  }

  const copyIcon = document.getElementById('copyIcon');
  const shareIcon = document.getElementById('shareIcon');

  if (copyIcon) {
    copyIcon.addEventListener('click', () => {
      const text = lineEl.textContent;
      if (!text) return;
      copyText(text)
        .then(() => { commentEl.textContent = "Copied! ✅"; })
        .catch(() => { commentEl.textContent = "Copy failed 😢"; });
      setTimeout(() => commentEl.textContent = "", 1500);
    });
  }

  if (shareIcon) {
    shareIcon.addEventListener('click', () => {
      const text = lineEl.textContent;
      const url = window.location.href;
      if (!text) return;

      if (navigator.share) {
        navigator.share({ title: 'Cheesy or Not?', text: text, url: url })
          .catch(() => {});
      } else {
        const shareURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}%20${encodeURIComponent(url)}`;
        window.open(shareURL, '_blank', 'noopener');
      }
    });
  }

  // Detectar idioma inicial do navegador
  const browserLang = navigator.language.startsWith('pt') ? 'pt-BR'
                    : navigator.language.startsWith('es') ? 'es-ES'
                    : 'en-US';

  select.value = browserLang;
  currentLang = browserLang;
  loadLanguageData(currentLang);

});
