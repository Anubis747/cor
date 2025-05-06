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

  const introEl    = document.getElementById('intro');
  const lineEl     = document.getElementById('line');
  const btn        = document.getElementById('generate');
  const commentEl  = document.getElementById('comment');
  const select     = document.getElementById('langSelect');
  const langLabel  = document.getElementById('langLabel');
  const affTitle   = document.getElementById('affTitle');
  const carousel   = document.getElementById('carousel');
  const bmcText    = document.getElementById('bmcText');

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
  const product = affiliateProducts[carouselIndex];
  if (carousel && product) {
    carousel.innerHTML = `<a href="${product.link}" target="_blank" rel="noopener">${product.name}</a>`;
    carouselIndex = (carouselIndex + 1) % affiliateProducts.length;
  }
}

  function loadLanguageData(langCode) {
    fetch(`${basePath}lines_${langCode.slice(0, 2)}.json`)
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
  const titles = {
    'en-US': 'Surprise with a gift! 🎁',
    'pt-BR': 'Surpreenda com um presente! 🎁',
    'es-ES': '¡Sorprende con un regalo! 🎁'
  };
  if (affTitle) {
    affTitle.textContent = titles[currentLang] || titles['en-US'];
  }
}
  function updateUI() {
    const t = translations[currentLang] || translations['en-US'];
    introEl.textContent   = t.intro;
    lineEl.textContent    = t.initial;
    btn.textContent       = t.generate;
    langLabel.textContent = t.langLabel;
    commentEl.textContent = '';
    renderAffiliate();

    if (bmcText) {
      bmcText.textContent = {
        'en-US': 'Support us with a coffee ☕',
        'pt-BR': 'Nos apoie com um café ☕',
        'es-ES': 'Apóyanos con un café ☕'
      }[currentLang] || 'Support us with a coffee ☕';
    }
  }

  setInterval(updateCarousel, 4000);
  updateCarousel();

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

  const copyIcon  = document.getElementById('copyIcon');
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

  const browserLang = navigator.language.startsWith('pt') ? 'pt-BR'
                    : navigator.language.startsWith('es') ? 'es-ES'
                    : 'en-US';

  select.value = browserLang;
  currentLang  = browserLang;
  loadLanguageData(currentLang);
});
