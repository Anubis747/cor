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

  const affiliateProductsBR = [
    { names: { 'pt-BR': "Grânulo Inox para Pulseira 🔩" }, link: "https://s.click.aliexpress.com/e/_oDHmV6B" },
    { names: { 'pt-BR': "Anel Zircônia Noiva 💍" }, link: "https://s.click.aliexpress.com/e/_opfjyqx" },
    { names: { 'pt-BR': "Anel Moissanite Ouro 14K ✨" }, link: "https://s.click.aliexpress.com/e/_opABgdD" },
    { names: { 'pt-BR': "Anel Redondo Moissanite 💎" }, link: "https://s.click.aliexpress.com/e/_omVrpM3" },
    { names: { 'pt-BR': "Anel 4.3ct Moissanite 💖" }, link: "https://s.click.aliexpress.com/e/_onzmT6n" },
    { names: { 'pt-BR': "Brincos Pérola Elegantes 🌟" }, link: "https://s.click.aliexpress.com/e/_oEHWhyx" },
    { names: { 'pt-BR': "Broche Estrela Brasil 🇧🇷" }, link: "https://s.click.aliexpress.com/e/_okgRZVH" },
    { names: { 'pt-BR': "Aliança Moissanite 4mm 💍" }, link: "https://s.click.aliexpress.com/e/_oBYwwun" },
    { names: { 'pt-BR': "Camisola com Corações 💕" }, link: "https://s.click.aliexpress.com/e/_olcrcwj" },
    { names: { 'pt-BR': "Sutiã de Renda Feminino 🖤" }, link: "https://s.click.aliexpress.com/e/_oCOV6eT" },
    { names: { 'pt-BR': "Conjunto de Veludo Feminino ❄️" }, link: "https://s.click.aliexpress.com/e/_oBj0fZz" },
    { names: { 'pt-BR': "Calcinha de Cetim Sem Costura 👙" }, link: "https://s.click.aliexpress.com/e/_ooM7v9d" },
    { names: { 'pt-BR': "Cuecas Boxer Masculinas 🩳" }, link: "https://s.click.aliexpress.com/e/_oDaPjd9" },
    { names: { 'pt-BR': "Escultura Mãos de Amor 🖐️❤️" }, link: "https://s.click.aliexpress.com/e/_omkoVt5" },
    { names: { 'pt-BR': "Token Abraço no Bolso 🤗" }, link: "https://s.click.aliexpress.com/e/_okSWqUJ" },
    { names: { 'pt-BR': "Forma Silicone Coração/Vela ❤️" }, link: "https://s.click.aliexpress.com/e/_oFHvQ8n" },
    { names: { 'pt-BR': "Caixa de Presente Floral 🌹" }, link: "https://s.click.aliexpress.com/e/_ong3THz" },
    { names: { 'pt-BR': "Dados do Amor para Casais 🎲" }, link: "https://s.click.aliexpress.com/e/_oD94zp5" },
    { names: { 'pt-BR': "Blocos Rosa 3D Casamento 💐" }, link: "https://s.click.aliexpress.com/e/_opNjHWr" },
    { names: { 'pt-BR': "Broche Anjo do Amor 😇" }, link: "https://s.click.aliexpress.com/e/_oFMNPu3" },
    { names: { 'pt-BR': "Colar Coração Duplo 💕" }, link: "https://s.click.aliexpress.com/e/_oDKU2uP" },
    { names: { 'pt-BR': "Buquê de Sabonete Romântico 💐" }, link: "https://s.click.aliexpress.com/e/_ol9FWiF" },
    { names: { 'pt-BR': "Molde de Urso para Vela 🧸" }, link: "https://s.click.aliexpress.com/e/_omW1LxZ" },
    { names: { 'pt-BR': "Molde de Vela Coração Peônia 🕯️" }, link: "https://s.click.aliexpress.com/e/_oE4gzJh" },
    { names: { 'pt-BR': "Camiseta 'Esposa Incrível' 👕" }, link: "https://s.click.aliexpress.com/e/_opS9mDt" }
  ];

  const affiliateProductsEN = [
    { names: { 'en-US': "100 Date Ideas Scratch Poster 🧡" }, link: "https://www.amazon.com/dp/B081V6W99F?tag=flirtspark09-20" },
    { names: { 'en-US': "Funny Couple Mug Set ☕" }, link: "https://www.amazon.com/dp/B08KFLN3LZ?tag=flirtspark09-20" },
    { names: { 'en-US': "Love Coupons for Him & Her 💌" }, link: "https://www.amazon.com/dp/B0763H38ZD?tag=flirtspark09-20" },
    { names: { 'en-US': "Mini Projector for Date Night 📽️" }, link: "https://www.amazon.com/dp/B09R1HNNB6?tag=flirtspark09-20" },
    { names: { 'en-US': "Heart-Shaped Waffle Maker ❤️" }, link: "https://www.amazon.com/dp/B01N6DC2ZE?tag=flirtspark09-20" },
    { names: { 'en-US': "100 Date Ideas Scratch Poster 🧡" }, link: "https://www.amazon.com/dp/B09TDGTRBH?tag=flirtspark09-20"},
    {names: { 'en-US': "Funny Couple Mug Set ☕" }, link: "https://www.amazon.com/dp/B08KFLN3LZ?tag=flirtspark09-20"},
    {names: { 'en-US': "Love Coupons for Him & Her 💌" }, link: "https://www.amazon.com/dp/B0763H38ZD?tag=flirtspark09-20"},
    {names: { 'en-US': "Mini Projector for Date Night 📽️" }, link: "https://www.amazon.com/dp/B09R1HNNB6?tag=flirtspark09-20"},
    {names: { 'en-US': "Heart-Shaped Waffle Maker ❤️" }, link: "https://www.amazon.com/dp/B01N6DC2ZE?tag=flirtspark09-20"}
  ];

  const $ = id => document.getElementById(id);
  const introEl = $('intro');
  const lineEl = $('line');
  const btn = $('generate');
  const commentEl = $('comment');
  const select = $('langSelect');
  const langLabel = $('langLabel');
  const affTitle = $('affTitle');
  const carousel = $('carousel');
  const bmcText = $('bmcText');
  const copyIcon = $('copyIcon');
  const shareIcon = $('shareIcon');

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
      .then(res => res.ok ? res.json() : Promise.reject(`Failed to load ${file}`))
      .then(data => {
        linesArray = Array.isArray(data.lines) ? data.lines : ["Oops! Couldn't load pickup lines."];
        commentsArray = Array.isArray(data.comments) ? data.comments : [""];
        updateUI();
      })
      .catch(() => {
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
    navigator.clipboard?.writeText(text)
      .then(() => commentEl && (commentEl.textContent = "Copied! ✅"))
      .catch(() => commentEl && (commentEl.textContent = "Copy failed 😢"));
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
