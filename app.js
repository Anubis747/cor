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

  const introEl    = document.getElementById('intro');
  const lineEl     = document.getElementById('line');
  const btn        = document.getElementById('generate');
  const commentEl  = document.getElementById('comment');
  const select     = document.getElementById('langSelect');
  const langLabel  = document.getElementById('langLabel');
  const affTitle   = document.getElementById('affTitle');
  const carousel   = document.getElementById('carousel');
  const bmcText    = document.getElementById('bmcText');
  const copyIcon   = document.getElementById('copyIcon');
  const shareIcon  = document.getElementById('shareIcon');

  const basePath = window.location.pathname.replace(/\/[^/]*$/, '/');
  let linesArray = [];
  let commentsArray = [];
  let currentLang = select?.value || 'en-US';

  const affiliateProducts = [
    { name: "Flower Bouquet 🌸", link: "https://www.amazon.com/dp/B07QK6C6HB?tag=flirtspark09-20" },
    { name: "Chocolate Gift Box 🍫", link: "https://www.amazon.com/dp/B078H3T7R3?tag=flirtspark09-20" },
    { name: "Romantic Candle 🕯️", link: "https://www.amazon.com/dp/B09G3HRMXY?tag=flirtspark09-20" },
    { name: "Funny Love Mug ☕", link: "https://www.amazon.com/dp/B08QFFG8YZ?tag=flirtspark09-20" },
    { name: "Date Night Card Game 🎴", link: "https://www.amazon.com/dp/B084ZHCZTZ?tag=flirtspark09-20" },
    { name: "Neon Heart Light 💡", link: "https://www.amazon.com/dp/B08BLNNY6P?tag=flirtspark09-20" },
    { name: "Love Coupons 💌", link: "https://www.amazon.com/dp/B078GQZ5ZG?tag=flirtspark09-20" },
    { name: "Romantic Journal 📓", link: "https://www.amazon.com/dp/1646113751?tag=flirtspark09-20" },
    { name: "Plush Bear with Heart 🧸", link: "https://www.amazon.com/dp/B00QH7NZ0E?tag=flirtspark09-20" },
    { name: "Love Necklace 💖", link: "https://www.amazon.com/dp/B074N9FC6X?tag=flirtspark09-20" }
  ];

  let carouselIndex = 0;

  function updateCarousel() {
    if (!carousel) return;
    const product = affiliateProducts[carouselIndex];
    carousel.innerHTML = `<a href="${product.link}" target="_blank" rel="noopener">${product.name}</a>`;
    carouselIndex = (carouselIndex + 1) % affiliateProducts.length;
  }

  function renderAffiliate() {
    if (!affTitle) return;
    const titles = {
      'en-US': 'Surprise with a gift! 🎁',
      'pt-BR': 'Surpreenda com um presente! 🎁',
      'es-ES': '¡Sorprende con un regalo! 🎁'
    };
    affTitle.textContent = titles[currentLang] || titles['en-US'];
  }

  function updateUI() {
    const t = translations[currentLang] || translations['en-US'];
    if (introEl) introEl.textContent = t.intro;
    if (lineEl) lineEl.textContent = t.initial;
    if (btn) btn.textContent = t.generate;
    if (langLabel) langLabel.textContent = t.langLabel;
    if (commentEl) commentEl.textContent = '';
    renderAffiliate();

    if (bmcText) {
      bmcText.textContent = {
        'en-US': 'Support us with a coffee ☕',
        'pt-BR': 'Nos apoie com um café ☕',
        'es-ES': 'Apóyanos con un café ☕'
      }[currentLang] || 'Support us with a coffee ☕';
    }
  }

  function loadLanguageData(langCode) {
    const path = `${basePath}lines_${langCode.slice(0, 2)}.json`;

    fetch(path)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao carregar: ' + path);
        return res.json();
      })
      .then(data => {
        linesArray = data.lines || [];
        commentsArray = data.comments || [];
        updateUI();
        updateCarousel();
        setInterval(updateCarousel, 4000);
      })
      .catch(err => {
        console.error("Erro ao carregar dados:", err);
        linesArray = ["Error loading pickup lines."];
        commentsArray = ["Oops!"];
        updateUI();
        updateCarousel();
        setInterval(updateCarousel, 4000);
      });
  }

  if (btn) {
    btn.addEventListener('click', () => {
      if (!linesArray.length) {
        if (commentEl) commentEl.textContent = "Lines not loaded 😢";
        return;
      }
      const line = linesArray[Math.floor(Math.random() * linesArray.length)];
      const comment = commentsArray[Math.floor(Math.random() * commentsArray.length)];
      if (lineEl) lineEl.textContent = line;
      if (commentEl) commentEl.textContent = comment;
    });
  }

  if (copyIcon) {
    copyIcon.addEventListener('click', () => {
      const text = lineEl?.textContent;
      if (!text) return;
      navigator.clipboard.writeText(text)
        .then(() => commentEl.textContent = "Copied! ✅")
        .catch(() => commentEl.textContent = "Copy failed 😢");
      setTimeout(() => commentEl.textContent = "", 1500);
    });
  }

  if (shareIcon) {
    shareIcon.addEventListener('click', () => {
      const text = lineEl?.textContent;
      const url = window.location.href;
      if (!text) return;
      if (navigator.share) {
        navigator.share({ title: 'Cheesy or Not?', text, url }).catch(() => {});
      } else {
        const shareURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)} ${encodeURIComponent(url)}`;
        window.open(shareURL, '_blank', 'noopener');
      }
    });
  }

  const browserLang = navigator.language.startsWith('pt') ? 'pt-BR'
                    : navigator.language.startsWith('es') ? 'es-ES'
                    : 'en-US';

  if (select) select.value = browserLang;
  currentLang = browserLang;
  loadLanguageData(currentLang);
});
