document.addEventListener('DOMContentLoaded', () => {
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

  const affiliateProductsBR = [/* ... seus 25 produtos AliExpress ... */];
  const affiliateProductsEN = [
    {
      names: { 'en-US': "100 Date Ideas Scratch Poster 🧡" },
      link: "https://www.amazon.com/dp/B081V6W99F?tag=yourtag-20"
    },
    {
      names: { 'en-US': "Funny Couple Mug Set ☕" },
      link: "https://www.amazon.com/dp/B08KFLN3LZ?tag=yourtag-20"
    },
    {
      names: { 'en-US': "Love Coupons for Him & Her 💌" },
      link: "https://www.amazon.com/dp/B0763H38ZD?tag=yourtag-20"
    },
    {
      names: { 'en-US': "Mini Projector for Date Night 📽️" },
      link: "https://www.amazon.com/dp/B09R1HNNB6?tag=yourtag-20"
    },
    {
      names: { 'en-US': "Heart-Shaped Waffle Maker ❤️" },
      link: "https://www.amazon.com/dp/B01N6DC2ZE?tag=yourtag-20"
    }
  ];

  const $ = id => document.getElementById(id);

  const introEl    = $('intro');
  const lineEl     = $('line');
  const btn        = $('generate');
  const commentEl  = $('comment');
  const select     = $('langSelect');
  const langLabel  = $('langLabel');
  const affTitle   = $('affTitle');
  const carousel   = $('carousel');
  const bmcText    = $('bmcText');
  const copyIcon   = $('copyIcon');
  const shareIcon  = $('shareIcon');

  const basePath = window.location.pathname.replace(/\/[^/]*$/, '/');
  let linesArray = [];
  let commentsArray = [];
  let currentLang = 'en-US';
  let affiliateProducts = [];
  let carouselIndex = 0;

  function sanitizeText(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function updateCarousel() {
    if (!carousel || !affiliateProducts.length) return;
    const product = affiliateProducts[carouselIndex];
    if (!product || !product.link || !product.names) return;

    const name = product.names[currentLang] || product.names['en-US'] || product.names['pt-BR'] || "Product";
    carousel.innerHTML = `<a href="${encodeURI(product.link)}" target="_blank" rel="noopener">${sanitizeText(name)}</a>`;
    carouselIndex = (carouselIndex + 1) % affiliateProducts.length;
  }

  function renderAffiliate() {
    const titles = {
      'en-US': 'Surprise with a gift! 🎁',
      'pt-BR': 'Surpreenda com um presente! 🎁',
      'es-ES': '¡Sorprende con un regalo! 🎁'
    };
    if (affTitle) affTitle.textContent = titles[currentLang] || titles['en-US'];
  }

  function updateUI() {
    const t = translations[currentLang] || translations['en-US'];
    if (introEl) introEl.textContent = t.intro;
    if (lineEl) lineEl.textContent = t.initial;
    if (btn) btn.textContent = t.generate;
    if (langLabel) langLabel.textContent = t.langLabel;
    if (commentEl) commentEl.textContent = '';
    if (bmcText) {
      bmcText.textContent = {
        'en-US': 'Support us with a coffee ☕',
        'pt-BR': 'Nos apoie com um café ☕',
        'es-ES': 'Apóyanos con un café ☕'
      }[currentLang] || 'Support us with a coffee ☕';
    }
    renderAffiliate();
  }

  function loadLanguageData(langCode) {
    const file = `${basePath}lines_${langCode.slice(0, 2)}.json`;
    fetch(file)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load ${file}`);
        return res.json();
      })
      .then(data => {
        if (!data || !Array.isArray(data.lines)) throw new Error("Invalid JSON structure");
        linesArray = data.lines;
        commentsArray = Array.isArray(data.comments) ? data.comments : [""];
        updateUI();
      })
      .catch(err => {
        console.warn("Language data error:", err.message);
        linesArray = ["Oops! Couldn't load pickup lines."];
        commentsArray = [""];
        updateUI();
      });
  }

  function handleGenerateClick() {
    if (!linesArray.length) {
      if (commentEl) commentEl.textContent = "No lines available 😢";
      return;
    }
    const line = linesArray[Math.floor(Math.random() * linesArray.length)];
    const comment = commentsArray[Math.floor(Math.random() * commentsArray.length)];
    if (lineEl) lineEl.textContent = line;
    if (commentEl) commentEl.textContent = comment;
  }

  function copyText(text) {
    if (!text) return;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => commentEl && (commentEl.textContent = "Copied! ✅"))
        .catch(() => commentEl && (commentEl.textContent = "Copy failed 😢"));
    }
    setTimeout(() => commentEl && (commentEl.textContent = ""), 1500);
  }

  function shareText(text) {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Cheesy or Not?', text, url }).catch(() => {});
    } else {
      const shareURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)} ${encodeURIComponent(url)}`;
      window.open(shareURL, '_blank', 'noopener');
    }
  }

  if (btn) btn.addEventListener('click', handleGenerateClick);
  if (copyIcon) copyIcon.addEventListener('click', () => copyText(lineEl?.textContent));
  if (shareIcon) shareIcon.addEventListener('click', () => shareText(lineEl?.textContent || ""));

  if (select) {
    select.addEventListener('change', () => {
      const selectedLang = select.value;
      window.location.search = `?lang=${selectedLang}`;
    });
  }

  // Detecta idioma via query param ou browser
  const urlParams = new URLSearchParams(window.location.search);
  const paramLang = urlParams.get('lang');
  const browserLang = paramLang ||
    (navigator.language.startsWith('pt') ? 'pt-BR'
     : navigator.language.startsWith('es') ? 'es-ES'
     : 'en-US');

  if (select) select.value = browserLang;
  currentLang = browserLang;

  if (currentLang === 'pt-BR') {
    affiliateProducts = affiliateProductsBR;
  } else if (currentLang === 'en-US') {
    affiliateProducts = affiliateProductsEN;
  } else {
    affiliateProducts = [];
  }

  loadLanguageData(currentLang);
  updateCarousel();
  setInterval(updateCarousel, 4000);
});
