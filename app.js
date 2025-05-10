document.addEventListener('DOMContentLoaded', () => {
  // Multilingual content for various sections
  const data = {
    'en-US': {
      siteDesc: "Generate cheesy (but charming) pick-up lines and find the perfect gift to match.",
      intro: "Click to generate a cheesy pick-up line!",
      generate: "Generate",
      initial: "Ready for a pick-up line?",
      langLabel: "Choose another language:",
      affTitle: "Surprise with a gift! 🎁",
      bmcText: "Support us with a coffee ☕",
      aboutHeading: "About Cheesy or Not?",
      aboutText: "At Cheesy or Not? we blend humor and gift-giving to make your chats unforgettable. Click to generate a fresh pick-up line, then scroll down for hand-picked gift ideas that match the tone. No forms, no fees—just fun and charm in one place!",
      howHeading: "How It Works",
      howList: [
        "<strong>Generate:</strong> click “Generate” to get a fresh pick-up line.",
        "<strong>Browse Gifts:</strong> our carousel shows gifts that fit the tone.",
        "<strong>Share or Shop:</strong> copy the line or click through to buy the perfect present."
      ],
      useHeading: "Use Cases",
      useList: [
        "Perfect for Valentine’s Day messages.",
        "Great ice-breaker at parties and events.",
        "Fun way to send birthday greetings."
      ]
    },
    'pt-BR': {
      siteDesc: "Gere cantadas vergonhosas (mas divertidas) e descubra o presente ideal para acompanhar.",
      intro: "Clique para gerar uma cantada!",
      generate: "Gerar cantada",
      initial: "Que tal uma cantada divertida?",
      langLabel: "Escolha outro idioma:",
      affTitle: "Surpreenda com um presente! 🎁",
      bmcText: "Nos apoie com um café ☕",
      aboutHeading: "Sobre o Cheesy or Not?",
      aboutText: "No Cheesy or Not? unimos humor e presentes para tornar suas conversas inesquecíveis. Clique para gerar uma nova cantada e, em seguida, explore nossa seleção de presentes que combinam com o tom da mensagem. Sem formulários, sem taxas—apenas diversão e charme em um só lugar!",
      howHeading: "Como Funciona",
      howList: [
        "<strong>Gerar:</strong> clique em 'Gerar cantada' para receber uma frase única.",
        "<strong>Ver Presentes:</strong> nosso carrossel mostra sugestões que combinam.",
        "<strong>Compartilhar ou Comprar:</strong> copie a cantada ou clique para adquirir o presente ideal."
      ],
      useHeading: "Sugestões de Uso",
      useList: [
        "Perfeito para mensagens no Dia dos Namorados.",
        "Ótimo para quebrar o gelo em festas e eventos.",
        "Jeito divertido de enviar felicitações de aniversário."
      ]
    },
    'es-ES': {
      siteDesc: "Genera frases cursis (pero con encanto) y encuentra el regalo perfecto para acompañar.",
      intro: "¡Haz clic para una frase divertida!",
      generate: "Generar frase",
      initial: "¿Listo para sonreír?",
      langLabel: "Elige otro idioma:",
      affTitle: "¡Sorprende con un regalo! 🎁",
      bmcText: "Apóyanos con un café ☕",
      aboutHeading: "Acerca de Cheesy or Not?",
      aboutText: "En Cheesy or Not? combinamos humor y regalos para hacer tus conversaciones inolvidables. Haz clic para generar una frase divertida y luego explora nuestra selección de regalos acorde al tono. Sin formularios, sin costos—¡solo diversión y encanto en un solo lugar!",
      howHeading: "Cómo Funciona",
      howList: [
        "<strong>Generar:</strong> haz clic en 'Generar frase' para recibir una línea única.",
        "<strong>Ver Regalos:</strong> nuestro carrusel muestra sugerencias que encajan.",
        "<strong>Compartir o Comprar:</strong> copia la frase o haz clic para adquirir el regalo perfecto."
      ],
      useHeading: "Casos de Uso",
      useList: [
        "Perfecto para mensajes de San Valentín.",
        "Ideal para romper el hielo en fiestas y eventos.",
        "Manera divertida de enviar felicitaciones de cumpleaños."
      ]
    }
  };

  // Affiliate product lists
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
    { names: { 'pt-BR': "Token Abraço no Bolso 🤗" }, link: "https://s.click.aliexpress.com/e/_окSWqUJ" },
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
    { names: { 'en-US': "Couples Conversation Cards 💬" }, link: "https://www.amazon.com/dp/B07Z5Z5RZ5?tag=flirtspark09-20" },
    { names: { 'en-US': "Romantic Bath Bomb Gift Set 🛁" }, link: "https://www.amazon.com/dp/B07Y5P9QJ9?tag=flirtspark09-20" },
    { names: { 'en-US': "His & Hers Pillowcases 😴" }, link: "https://www.amazon.com/dp/B07Y5N653J?tag=flirtspark09-20" },
    { names: { 'en-US': "Date Night Jar with Ideas 🎲" }, link: "https://www.amazon.com/dp/B07Y5MRDWF?tag=flirtspark09-20" },
    { names: { 'en-US': "Matching Bracelets for Couples 💑" }, link: "https://www.amazon.com/dp/B07Y5MGDBQ?tag=flirtspark09-20" }
  ];

  const affiliateProductsES = [
    { names: { 'es-ES': "Pantuflas peluche mujer invierno 2024 ❄️" }, link: "https://s.click.aliexpress.com/e/_oFsMUoj" },
    { names: { 'es-ES': "Rosa negra con luz nocturna DIY 🌹✨" }, link: "https://s.click.aliexpress.com/e/_olHebLN" },
    { names: { 'es-ES': "Conjunto de pijama de lana acanalada 2025 🛌" }, link: "https://s.click.aliexpress.com/e/_oBSBvjl" },
    { names: { 'es-ES': "Anillo moissanita 3.5mm plata 925 💍" }, link: "https://s.click.aliexpress.com/e/_ol4Qgrp" },
    { names: { 'es-ES': "Molde de silicona corazón para postres ❤️🍫" }, link: "https://s.click.aliexpress.com/e/_ookux5p" },
    { names: { 'es-ES': "Bloques rosas eternas 3D Día San Valentín 🌹🧱" }, link: "https://s.click.aliexpress.com/e/_onVPIjD" },
    { names: { 'es-ES': "Conjunto anillos circonia cubica lujo 💎" }, link: "https://s.click.aliexpress.com/e/_onAupaj" },
    { names: { 'es-ES': "Camisón satinado labios rojos 💋" }, link: "https://s.click.aliexpress.com/e/_omZKxhZ" },
    { names: { 'es-ES': "Pijama franela rayas inverno mujer 🐻" }, link: "https://s.click.aliexpress.com/e/_oDu9Pth" },
    { names: { 'es-ES': "Mini rosa eterna DIY regalo pareja 🌸" }, link: "https://s.click.aliexpress.com/e/_opMGBcR" }
  ];

  // State variables
  let linesArray = [];
  let commentsArray = [];
  let affiliateProducts = [];
  let carouselIndex = 0;

  // Elements
  const siteDescription = document.getElementById('siteDescription');
  const introEl = document.getElementById('intro');
  const lineEl = document.getElementById('line');
  const generateBtn = document.getElementById('generate');
  const commentEl = document.getElementById('comment');
  const copyIcon = document.getElementById('copyIcon');
  const shareIcon = document.getElementById('shareIcon');
  const carouselEl = document.getElementById('carousel');
  const selectEl = document.getElementById('langSelect');
  const langLabelEl = document.getElementById('langLabel');
  const affTitleEl = document.getElementById('affTitle');
  const bmcTextEl = document.getElementById('bmcText');
  const aboutHeadingEl = document.getElementById('aboutHeading');
  const aboutTextEl = document.getElementById('aboutText');
  const howHeadingEl = document.getElementById('howHeading');
  const howListEl = document.getElementById('howList');
  const useHeadingEl = document.getElementById('useHeading');
  const useListEl = document.getElementById('useList');

  // Determine current language
  let currentLang = new URLSearchParams(window.location.search).get('lang') ||
    (navigator.language.startsWith('pt') ? 'pt-BR' : navigator.language.startsWith('es') ? 'es-ES' : 'en-US');
  if (!data[currentLang]) currentLang = 'en-US';
  selectEl.value = currentLang;

  // Helper: sanitize HTML
  function sanitizeText(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Populate affiliate carousel
  function updateCarousel() {
    if (!carouselEl || !affiliateProducts.length) return;
    const product = affiliateProducts[carouselIndex];
    const name = product.names[currentLang] || product.names['en-US'] || product.names['pt-BR'];
    carouselEl.innerHTML = `<a href="${encodeURI(product.link)}" target="_blank" rel="noopener">${sanitizeText(name)}</a>`;
    carouselIndex = (carouselIndex + 1) % affiliateProducts.length;
  }

  // Load pick-up lines JSON
  function loadLanguageData(langCode) {
    const basePath = window.location.pathname.replace(/\\/[^/]*$/, '/');
    const file = `${basePath}lines_${langCode.slice(0, 2)}.json`;
    fetch(file)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(dataJson => {
        linesArray = Array.isArray(dataJson.lines) ? dataJson.lines : ["Oops! Couldn't load pickup lines."];
        commentsArray = Array.isArray(dataJson.comments) ? dataJson.comments : [''];
        // initialize display
        lineEl.textContent = data[currentLang].initial;
      })
      .catch(() => {
        linesArray = ["Oops! Couldn't load pickup lines."];
        commentsArray = [''];
      });
  }

  // Generate pick-up line
  function handleGenerateClick() {
    if (!linesArray.length) {
      commentEl.textContent = "No lines available 😢";
      return;
    }
    const line = linesArray[Math.floor(Math.random() * linesArray.length)];
    const comment = commentsArray[Math.floor(Math.random() * commentsArray.length)];
    lineEl.textContent = line;
    commentEl.textContent = comment;
  }

  // Copy text
  function copyText(text) {
    if (!text) return;
    navigator.clipboard.writeText(text)
      .then(() => {
        commentEl.textContent = "Copied! ✅";
        setTimeout(() => commentEl.textContent = '', 1500);
      })
      .catch(() => {
        commentEl.textContent = "Copy failed 😢";
        setTimeout(() => commentEl.textContent = '', 1500);
      });
  }

  // Share text
  function shareText(text) {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Cheesy or Not?', text, url }).catch(() => {});
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}%20${encodeURIComponent(url)}`, '_blank');
    }
  }

  // Update all UI elements
  function updateUI() {
    const cfg = data[currentLang];
    siteDescription.textContent = cfg.siteDesc;
    introEl.textContent        = cfg.intro;
    lineEl.textContent         = cfg.initial;
    generateBtn.textContent    = cfg.generate;
    langLabelEl.textContent    = cfg.langLabel;
    affTitleEl.textContent     = cfg.affTitle;
    bmcTextEl.textContent      = cfg.bmcText;
    aboutHeadingEl.textContent = cfg.aboutHeading;
    aboutTextEl.textContent    = cfg.aboutText;
    howHeadingEl.textContent   = cfg.howHeading;
    howListEl.innerHTML        = cfg.howList.map(item => `<li>${item}</li>`).join('');
    useHeadingEl.textContent   = cfg.useHeading;
    useListEl.innerHTML        = cfg.useList.map(item => `<li>${item}</li>`).join('');

    // Set affiliate products array
    if (currentLang === 'pt-BR') affiliateProducts = affiliateProductsBR;
    else if (currentLang === 'es-ES') affiliateProducts = affiliateProductsES;
    else affiliateProducts = affiliateProductsEN;

    // Initialize carousel
    updateCarousel();
  }

  // Event listeners
  generateBtn.addEventListener('click', handleGenerateClick);
  copyIcon.addEventListener('click', () => copyText(lineEl.textContent));
  shareIcon.addEventListener('click', () => shareText(lineEl.textContent));
  selectEl.addEventListener('change', () => {
    window.location.search = `?lang=${selectEl.value}`;
  });

  // Initial load
  updateUI();
  loadLanguageData(currentLang);
  setInterval(updateCarousel, 4000);
});
