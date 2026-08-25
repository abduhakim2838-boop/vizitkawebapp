/* ==========================================================================
   GIFTIFY BUSINESS — INTERACTIVE ENGINE & TELEGRAM INTEGRATION
   ========================================================================== */

// Telegram Bot & Admin Configuration
const TELEGRAM_CONFIG = {
  // Agar Telegram Bot yaratgan bo'lsangiz, Token va Chat ID ni shu yerga kiriting:
  botToken: "", // Masalan: "1234567890:AAH_your_bot_token_here"
  chatId: "",   // Masalan: "123456789" yoki guruh chat_id "-100123456789"
  adminUsername: "botirjonov_social", // Admin telegram lichkasi
  adminPhone: "+998901234567"
};

// Global Product Database for Quick View and Search
const PRODUCTS_DATA = {
  1: {
    id: 1,
    title: "Premium Luxury Gift Box",
    category: "giftbox",
    price: 380000,
    minOrder: 20,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    tag: "🔥 Top Choice",
    desc: "Kompaniya rahbarlari va nufuzli hamkorlar uchun eng ommabop premium sovg'a to'plami. Lazer gravirovka bilan to'liq brendlanadi.",
    items: ["Smart sensorli LED Termos (500ml)", "Italiya eko charmidan A5 Bloknot", "Metall Lazer Gravirovkali Ruchka", "Luks qora mat magnit qadoq"]
  },
  2: {
    id: 2,
    title: "Business Executive Set",
    category: "accessories",
    price: 290000,
    minOrder: 25,
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80",
    tag: "⭐ Bestseller",
    desc: "Kundalik biznes uchrashuvlari va ish faoliyati uchun nafis charmdan ishlangan klassik to'plam.",
    items: ["Eko charm muqovali Bloknot", "Metall siyohli Premium Ruchka", "Metall vizitka saqlovchi g'ilof (Vizitnica)", "Estetik kraft korporativ quti"]
  },
  3: {
    id: 3,
    title: "Tech Gadget 3-in-1 Set",
    category: "accessories",
    price: 420000,
    minOrder: 15,
    image: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=800&q=80",
    tag: "⚡ Tech & Smart",
    desc: "Zamonaviy IT va texnologiya kompaniyalari xodimlari hamda yosh mutaxassislar uchun smart gadjetlar to'plami.",
    items: ["10,000 mAh simsiz tezkor Powerbank", "Universal 3-in-1 o'rilgan USB kabel", "Simsiz shovqinsiz TWS quloqchin", "Qattiq himoyalovchi sovg'a qutisi"]
  },
  4: {
    id: 4,
    title: "Modern Office Welcome Set",
    category: "office",
    price: 260000,
    minOrder: 30,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    tag: "🏢 Ofis Tanlovi",
    desc: "Yangi ishga qabul qilingan xodimlar uchun unutilmas taassurot qoldiruvchi korporativ Welcome Pack.",
    items: ["Matoviy keramika Krujka (brendli)", "A5 formatli korporativ Bloknot", "Lakonik qora mat Ruchka", "Stol uchun metall organayzer"]
  },
  5: {
    id: 5,
    title: "Premium LED Smart Thermos",
    category: "accessories",
    price: 145000,
    minOrder: 30,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
    tag: "🌡️ Smart Thermos",
    desc: "Qopqog'ida sensorli harorat ko'rsatkichi mavjud bo'lgan, zanglamas po'latdan ishlangan smart termos.",
    items: ["Sensorli LED displey qopqoq", "500ml sig'imli zanglamas po'lat korpus", "12 soat issiq/sovuq saqlovchi vakuum", "Lazer gravirovka logotip bilan"]
  },
  6: {
    id: 6,
    title: "Executive Leather Notebook A5",
    category: "accessories",
    price: 120000,
    minOrder: 50,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    tag: "📖 Executive",
    desc: "Har bir sahifasida rejalashtirish uchun qulay chiziqlar va sifatli charm muqovaga ega korporativ kundalik.",
    items: ["A5 format, 96 varaq yuqori sifatli qog'oz", "Yumshoq Italiya eko charmi", "Magnitli qisqich va qalam ushlagich", "Oltin yoki kumush zarbosma logotip"]
  },
  7: {
    id: 7,
    title: "VIP Ambassador Luxury Set",
    category: "vip",
    price: 750000,
    minOrder: 10,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
    tag: "👑 VIP Gold",
    desc: "Eng yuqori darajadagi mehmonlar, investorlar va kompaniya ta'sischilari uchun eksklyuziv hashamatli sovg'a.",
    items: ["Tabiiy teridan ishlangan erkaklar hamyoni", "24k oltin qoplamali peroli ruchka", "Tabiiy yong'oq yog'ochidan luks quti", "Shaxsiy tabriknoma va oltin muhr"]
  },
  8: {
    id: 8,
    title: "Eco Natural Bamboo Pack",
    category: "giftbox",
    price: 310000,
    minOrder: 20,
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80",
    tag: "🌿 Eco Line",
    desc: "Ekologik toza va tabiatga befarq bo'lmagan brendlar uchun tabiiy bambuk va kraft materiallaridan tayyorlangan to'plam.",
    items: ["Tabiiy bambuk qoplamali Termos", "Kraft qayta ishlangan A5 Bloknot", "Bambuk korpusli sharikli Ruchka", "100% ekologik qayta ishlangan qadoq"]
  }
};

let currentQuickViewProduct = null;

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initStatsCounter();
  initProductFilter();
  initMockupVisualizer();
  initScrollAnimations();
  calculateCorporateBudget();
  startLiveSalesTicker();
  initCardTilt();
});

/* --------------------------------------------------------------------------
   1. STICKY HEADER ON SCROLL
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION MENU
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (!toggleBtn || !mainNav) return;

  toggleBtn.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    const isOpen = mainNav.classList.contains('open');
    toggleBtn.innerHTML = isOpen 
      ? '<i class="fa-solid fa-xmark"></i>' 
      : '<i class="fa-solid fa-bars-staggered"></i>';
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      toggleBtn.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
    });
  });
}

/* --------------------------------------------------------------------------
   3. ANIMATED STATISTICS COUNTER
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-count'), 10);
          animateCount(stat, target);
        });
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.getElementById('heroStats');
  if (statsSection) observer.observe(statsSection);
}

function animateCount(element, target) {
  let count = 0;
  const speed = 35;
  const increment = Math.ceil(target / 40);

  const timer = setInterval(() => {
    count += increment;
    if (count >= target) {
      count = target;
      clearInterval(timer);
    }
    element.textContent = count + '+';
  }, speed);
}

/* --------------------------------------------------------------------------
   4. PRODUCT FILTERING & SEARCH SYSTEM
   -------------------------------------------------------------------------- */
function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCat === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease';
            card.style.opacity = '1';
          }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

window.filterByCat = function(category) {
  const productsSection = document.getElementById('products');
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: 'smooth' });
  }

  const targetBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
  if (targetBtn) {
    targetBtn.click();
  } else {
    const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allBtn) allBtn.click();
  }
};

window.handleProductSearch = function(query) {
  const cleanQuery = query.toLowerCase().trim();
  const productCards = document.querySelectorAll('.product-card');
  const clearBtn = document.getElementById('searchClearBtn');

  if (clearBtn) {
    clearBtn.style.display = cleanQuery ? 'block' : 'none';
  }

  productCards.forEach(card => {
    const name = card.getAttribute('data-name').toLowerCase();
    const cat = card.getAttribute('data-category').toLowerCase();
    const text = card.textContent.toLowerCase();

    if (name.includes(cleanQuery) || cat.includes(cleanQuery) || text.includes(cleanQuery)) {
      card.style.display = 'flex';
      card.style.opacity = '1';
    } else {
      card.style.display = 'none';
    }
  });
};

window.clearProductSearch = function() {
  const input = document.getElementById('productSearchInput');
  if (input) {
    input.value = '';
    handleProductSearch('');
  }
};

/* --------------------------------------------------------------------------
   5. QUICK VIEW MODAL
   -------------------------------------------------------------------------- */
window.openQuickView = function(productId) {
  const product = PRODUCTS_DATA[productId];
  if (!product) return;

  currentQuickViewProduct = product;

  document.getElementById('qvImage').src = product.image;
  document.getElementById('qvTag').textContent = product.tag;
  document.getElementById('qvTitle').textContent = product.title;
  document.getElementById('qvPrice').textContent = formatUZS(product.price);
  document.getElementById('qvMinOrder').textContent = `Min: ${product.minOrder} dona`;
  document.getElementById('qvDesc').textContent = product.desc;

  const itemsContainer = document.getElementById('qvItems');
  itemsContainer.innerHTML = '';
  product.items.forEach(item => {
    const pill = document.createElement('span');
    pill.className = 'item-pill';
    pill.innerHTML = `<i class="fa-solid fa-check text-gold"></i> ${item}`;
    itemsContainer.appendChild(pill);
  });

  const modal = document.getElementById('quickViewModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeQuickView = function() {
  const modal = document.getElementById('quickViewModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};

window.orderFromQuickView = function() {
  if (currentQuickViewProduct) {
    closeQuickView();
    openOrderModal(currentQuickViewProduct.title);
  }
};

const qvModalElem = document.getElementById('quickViewModal');
if (qvModalElem) {
  qvModalElem.addEventListener('click', (e) => {
    if (e.target === qvModalElem) closeQuickView();
  });
}

/* --------------------------------------------------------------------------
   6. INTERACTIVE BUDGET & PRICE CALCULATOR
   -------------------------------------------------------------------------- */
window.updateQuantityFromSlider = function(val) {
  document.getElementById('calcQuantityDisplay').textContent = val;
  calculateCorporateBudget();
};

window.calculateCorporateBudget = function() {
  const selectElem = document.getElementById('calcProductSelect');
  const sliderElem = document.getElementById('calcQuantityRange');
  
  if (!selectElem || !sliderElem) return;

  const baseUnitPrice = parseInt(selectElem.value, 10);
  const selectedOption = selectElem.options[selectElem.selectedIndex];
  const productName = selectedOption.getAttribute('data-name') || selectedOption.text;
  const quantity = parseInt(sliderElem.value, 10);

  // Branding cost
  const brandingRadio = document.querySelector('input[name="brandingMethod"]:checked');
  const brandingCost = brandingRadio ? parseInt(brandingRadio.value, 10) : 0;

  // Package cost
  const packageRadio = document.querySelector('input[name="packageType"]:checked');
  const packageCost = packageRadio ? parseInt(packageRadio.value, 10) : 0;

  // Update active card class
  document.querySelectorAll('.calc-radio-card').forEach(card => {
    const input = card.querySelector('input');
    if (input && input.checked) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  // Calculate discount percentage based on quantity
  let discountPercent = 0;
  if (quantity >= 500) {
    discountPercent = 0.15;
  } else if (quantity >= 250) {
    discountPercent = 0.10;
  } else if (quantity >= 100) {
    discountPercent = 0.05;
  }

  const singleFinalUnitCost = baseUnitPrice + brandingCost + packageCost;
  const subtotal = singleFinalUnitCost * quantity;
  const discountSum = subtotal * discountPercent;
  const totalBudget = Math.round(subtotal - discountSum);

  // Update DOM Summary
  document.getElementById('summaryProductName').textContent = productName;
  document.getElementById('summaryQuantity').textContent = `${quantity} dona`;
  document.getElementById('summaryUnitCost').textContent = formatUZS(singleFinalUnitCost);
  document.getElementById('summaryDiscount').textContent = discountPercent > 0 
    ? `-${discountPercent * 100}% (${formatUZS(discountSum)})` 
    : '0% (standart)';
  document.getElementById('calcTotalSum').textContent = formatUZS(totalBudget);
};

window.orderFromCalculator = function() {
  const selectElem = document.getElementById('calcProductSelect');
  const selectedOption = selectElem.options[selectElem.selectedIndex];
  const productName = selectedOption.getAttribute('data-name');
  const quantity = document.getElementById('calcQuantityRange').value;
  const totalSum = document.getElementById('calcTotalSum').textContent;

  openOrderModal(`${quantity} dona ${productName} (Kalkulyator bo'yicha: ${totalSum})`);
};

/* --------------------------------------------------------------------------
   7. LIVE BRANDING STUDIO / MOCKUP VISUALIZER
   -------------------------------------------------------------------------- */
function initMockupVisualizer() {
  const input = document.getElementById('studioLogoInput');
  const logoText = document.getElementById('mockupLogoText');
  const chips = document.querySelectorAll('.model-chip');
  const mockupSvg = document.getElementById('mockupSvg');
  const overlay = document.getElementById('mockupLogoOverlay');

  if (!input || !logoText) return;

  input.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    logoText.textContent = val ? val : 'COMPANY LOGO';
  });

  const models = {
    box: `
      <rect x="25" y="25" width="110" height="110" rx="12" fill="#1a233a" stroke="#dfb141" stroke-width="2"/>
      <line x1="80" y1="25" x2="80" y2="135" stroke="#fae19c" stroke-width="4"/>
      <line x1="25" y1="80" x2="135" y2="80" stroke="#fae19c" stroke-width="4"/>
      <circle cx="80" cy="80" r="14" fill="#dfb141"/>
    `,
    thermos: `
      <rect x="55" y="20" width="50" height="120" rx="10" fill="#0f172a" stroke="#dfb141" stroke-width="2.5"/>
      <rect x="62" y="14" width="36" height="8" rx="2" fill="#fae19c"/>
      <circle cx="80" cy="38" r="8" fill="#0284c7"/>
      <text x="80" y="41" font-size="7" fill="#fff" text-anchor="middle" font-family="sans-serif">55°C</text>
    `,
    notebook: `
      <rect x="35" y="15" width="90" height="130" rx="8" fill="#1e1b4b" stroke="#fae19c" stroke-width="2"/>
      <line x1="48" y1="15" x2="48" y2="145" stroke="#dfb141" stroke-width="4"/>
      <rect x="75" y="55" width="40" height="25" rx="3" fill="none" stroke="#fae19c" stroke-width="1.5"/>
    `,
    pen: `
      <line x1="40" y1="120" x2="120" y2="40" stroke="#fae19c" stroke-width="14" stroke-linecap="round"/>
      <line x1="40" y1="120" x2="30" y2="130" stroke="#dfb141" stroke-width="6" stroke-linecap="round"/>
      <circle cx="110" cy="50" r="4" fill="#080c16"/>
    `
  };

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const modelKey = chip.getAttribute('data-model');
      if (models[modelKey]) {
        mockupSvg.innerHTML = models[modelKey];
        if (modelKey === 'thermos') {
          overlay.style.transform = 'translateY(15px) scale(0.9)';
        } else if (modelKey === 'pen') {
          overlay.style.transform = 'translateY(35px) scale(0.8)';
        } else {
          overlay.style.transform = 'none';
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. SOCIAL PROOF LIVE SALES TICKER (DYNAMIC NOTIFICATIONS)
   -------------------------------------------------------------------------- */
const LIVE_SALES_STREAM = [
  { company: "Orient Holding", product: "120 ta Premium Luxury Gift Box", time: "1 daqiqa oldin" },
  { company: "Artel Electronics", product: "250 ta Modern Office Welcome Set", time: "3 daqiqa oldin" },
  { company: "Apex Insurance", product: "80 ta Premium LED Smart Thermos", time: "5 daqiqa oldin" },
  { company: "Hamkorbank Filiali", product: "50 ta VIP Ambassador Luxury Set", time: "8 daqiqa oldin" },
  { company: "Payme IT Jamoasi", product: "100 ta Tech Gadget 3-in-1 Set", time: "12 daqiqa oldin" },
  { company: "UzAuto Motors", product: "300 ta Executive Leather Notebook", time: "15 daqiqa oldin" }
];

let liveSaleIndex = 0;
let liveToastTimer = null;

function startLiveSalesTicker() {
  const toast = document.getElementById('liveSaleToast');
  if (!toast) return;

  function triggerNextSale() {
    const sale = LIVE_SALES_STREAM[liveSaleIndex];
    liveSaleIndex = (liveSaleIndex + 1) % LIVE_SALES_STREAM.length;

    document.getElementById('liveToastCompany').textContent = sale.company;
    document.getElementById('liveToastText').textContent = `${sale.product} buyurtma qildi`;
    document.getElementById('liveToastTime').textContent = sale.time;

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 6000);
  }

  // First notification after 4 seconds, then every 16 seconds
  setTimeout(() => {
    triggerNextSale();
    liveToastTimer = setInterval(triggerNextSale, 18000);
  }, 4000);
}

window.dismissLiveToast = function() {
  const toast = document.getElementById('liveSaleToast');
  if (toast) toast.classList.remove('show');
};

/* --------------------------------------------------------------------------
   9. MODAL & ORDER WORKFLOW
   -------------------------------------------------------------------------- */
window.openOrderModal = function(productTitle) {
  const modal = document.getElementById('orderModal');
  const targetLabel = document.getElementById('modalProductTarget');
  
  if (modal) {
    if (targetLabel && productTitle) {
      targetLabel.innerHTML = `Tanlangan sovg'a: <strong style="color: #f5cf6d;">${productTitle}</strong>`;
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeOrderModal = function() {
  const modal = document.getElementById('orderModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeOrderModal();
    closeQuickView();
  }
});

const orderModalElem = document.getElementById('orderModal');
if (orderModalElem) {
  orderModalElem.addEventListener('click', (e) => {
    if (e.target === orderModalElem) closeOrderModal();
  });
}

/* --------------------------------------------------------------------------
   10. TELEGRAM BOT API & DIRECT ORDER DISPATCH WITH LOCALSTORAGE SYNC
   -------------------------------------------------------------------------- */
async function dispatchOrderToTelegram(orderData) {
  const { name, phone, company, product, quantity, comments } = orderData;
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 16).replace('T', ' ');

  // 1. Save to Cloud DB (Supabase) and LocalStorage
  const newOrderRecord = {
    id: Date.now() % 100000,
    clientName: name || "Noma'lum mijoz",
    companyName: company || "Ko'rsatilmagan",
    phone: phone || "—",
    product: product || "Umumiy so'rov",
    quantity: quantity ? parseInt(quantity, 10) : 1,
    budget: "Kelishiladi",
    comments: comments || "Sayt formasi orqali yuborildi",
    status: "yangi",
    date: dateStr
  };

  if (typeof dbInsertOrder === 'function') {
    await dbInsertOrder(newOrderRecord);
  } else {
    try {
      const existingOrders = JSON.parse(localStorage.getItem('giftify_orders') || '[]');
      existingOrders.push(newOrderRecord);
      localStorage.setItem('giftify_orders', JSON.stringify(existingOrders));
    } catch (err) {
      console.warn("LocalStorage save error:", err);
    }
  }

  const textMessage = 
`🎁 YANGI SOVG'A BUYURTMASI (Saytdan)

📦 Mahsulot: ${product || "Umumiy so'rov"}
👤 Buyurtmachi: ${name}
📞 Telefon: ${phone}
🏢 Kompaniya: ${company || "Ko'rsatilmagan"}
🔢 Miqdor: ${quantity || "1"} dona
💬 Izoh: ${comments || "Yo'q"}
📅 Vaqt: ${now.toLocaleString('uz-UZ')}

🌐 Manba: Giftify Business`;

  // 2. Agar Telegram Bot Token va Chat ID sozlangan bo'lsa, to'g'ridan-to'g'ri Botga yuboramiz
  if (typeof TELEGRAM_CONFIG !== 'undefined' && TELEGRAM_CONFIG.botToken && TELEGRAM_CONFIG.chatId) {
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`;
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CONFIG.chatId,
          text: textMessage
        })
      });
    } catch (err) {
      console.warn("Telegram Bot API orqali yuborishda xatolik:", err);
    }
  }

  // 3. Foydalanuvchiga Telegram orqali adminga to'g'ridan-to'g'ri o'tish imkonini beruvchi modalni ochamiz
  showTelegramSuccessModal({
    name,
    phone,
    product: product || "Umumiy so'rov",
    quantity: quantity || "1",
    messageText: textMessage
  });
}

function showTelegramSuccessModal(data) {
  const modal = document.getElementById('telegramSuccessModal');
  if (!modal) {
    showToast("Buyurtmangiz qabul qilindi!");
    return;
  }

  document.getElementById('tgSuccessName').textContent = data.name;
  document.getElementById('tgSuccessPhone').textContent = data.phone;
  document.getElementById('tgSuccessProduct').textContent = data.product;
  document.getElementById('tgSuccessQuantity').textContent = `${data.quantity} dona`;

  const tgDirectBtn = document.getElementById('tgDirectSendBtn');
  if (tgDirectBtn) {
    const tgUrl = `https://t.me/${TELEGRAM_CONFIG.adminUsername}?text=${encodeURIComponent(data.messageText)}`;
    tgDirectBtn.href = tgUrl;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

window.closeTelegramSuccessModal = function() {
  const modal = document.getElementById('telegramSuccessModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};

let lastSubmissionTimestamp = 0;

window.handleFormSubmit = async function(event) {
  event.preventDefault();
  
  // Anti-spam flood protection (min 4 seconds between submissions)
  const now = Date.now();
  if (now - lastSubmissionTimestamp < 4000) {
    alert("Iltimos biroz kuting! So'rovingiz ko'rib chiqilmoqda.");
    return;
  }

  const name = document.getElementById('clientName').value.trim();
  const phone = document.getElementById('clientPhone').value.trim();
  const company = document.getElementById('companyName').value.trim();
  const product = document.getElementById('productSelect').value;
  const quantity = document.getElementById('orderQuantity').value;
  const comments = document.getElementById('orderComments').value.trim();

  // Validate phone number
  const digitsOnly = phone.replace(/[^0-9]/g, '');
  if (digitsOnly.length < 9) {
    alert("Iltimos to'g'ri telefon raqamini kiriting (+998 XX XXX XX XX)");
    return;
  }

  const submitBtn = document.getElementById('submitFormBtn');
  if (submitBtn) {
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Yuborilmoqda...';
    submitBtn.disabled = true;
  }

  lastSubmissionTimestamp = Date.now();
  await dispatchOrderToTelegram({ name, phone, company, product, quantity, comments });

  if (submitBtn) {
    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Yuborildi!';
    submitBtn.disabled = false;
  }
  document.getElementById('corporateOrderForm').reset();
};

window.handleModalSubmit = async function(event) {
  event.preventDefault();

  const now = Date.now();
  if (now - lastSubmissionTimestamp < 4000) {
    alert("Iltimos biroz kuting!");
    return;
  }

  const name = document.getElementById('modalName').value.trim();
  const phone = document.getElementById('modalPhone').value.trim();
  const company = document.getElementById('modalCompany').value.trim();
  const quantity = document.getElementById('modalQuantity').value;
  
  const digitsOnly = phone.replace(/[^0-9]/g, '');
  if (digitsOnly.length < 9) {
    alert("Iltimos to'g'ri telefon raqamini kiriting (+998 XX XXX XX XX)");
    return;
  }

  const targetLabel = document.getElementById('modalProductTarget');
  const product = targetLabel ? targetLabel.textContent.replace("Tanlangan sovg'a: ", "").trim() : "Tezkor Buyurtma";

  closeOrderModal();
  document.getElementById('modalOrderForm').reset();

  lastSubmissionTimestamp = Date.now();
  await dispatchOrderToTelegram({ name, phone, company, product, quantity, comments: "Tezkor modal orqali" });
};

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;

  if (message) {
    const textElem = toast.querySelector('p');
    if (textElem) textElem.textContent = message;
  }

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* --------------------------------------------------------------------------
   11. 3D CARD TILT EFFECT (DYNAMIC INTERACTION)
   -------------------------------------------------------------------------- */
function initCardTilt() {
  const cards = document.querySelectorAll('.product-card, .hero-main-card, .calc-summary-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
}

/* --------------------------------------------------------------------------
   12. SCROLL ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.category-card, .product-card, .why-card, .step-card, .portfolio-card, .calculator-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08 });

  animatedElements.forEach(el => {
    el.style.opacity = '0.9';
    el.style.transform = 'translateY(15px)';
    el.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}

/* --------------------------------------------------------------------------
   HELPER UTILITY: Currency Formatter
   -------------------------------------------------------------------------- */
function formatUZS(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' so‘m';
}
