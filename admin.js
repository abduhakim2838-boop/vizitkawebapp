/* ==========================================================================
   GIFTIFY BUSINESS — ADMIN PANEL LOGIC & DATA ENGINE
   ========================================================================== */

// Initial Seed Data for Demo & Real Usage
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    title: "Premium Luxury Gift Box",
    category: "giftbox",
    price: 380000,
    minOrder: 20,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    tag: "🔥 Top Choice",
    desc: "Kompaniya rahbarlari va nufuzli hamkorlar uchun eng ommabop premium sovg'a to'plami.",
    items: "LED Termos (500ml), A5 Bloknot, Lazer Ruchka, Luks Quti"
  },
  {
    id: 2,
    title: "Business Executive Set",
    category: "accessories",
    price: 290000,
    minOrder: 25,
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80",
    tag: "⭐ Bestseller",
    desc: "Kundalik biznes uchrashuvlari va ish faoliyati uchun nafis charmdan ishlangan klassik to'plam.",
    items: "Charm Bloknot, Lazer Ruchka, Vizitnica, Korporativ Quti"
  },
  {
    id: 3,
    title: "Tech Gadget 3-in-1 Set",
    category: "accessories",
    price: 420000,
    minOrder: 15,
    image: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=800&q=80",
    tag: "⚡ Tech & Smart",
    desc: "Zamonaviy IT va texnologiya kompaniyalari xodimlari uchun smart gadjetlar to'plami.",
    items: "10,000 mAh Powerbank, 3-in-1 Kabel, TWS Quloqchin"
  },
  {
    id: 4,
    title: "Modern Office Welcome Set",
    category: "office",
    price: 260000,
    minOrder: 30,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    tag: "🏢 Ofis Tanlovi",
    desc: "Yangi ishga qabul qilingan xodimlar uchun unutilmas taassurot qoldiruvchi korporativ Welcome Pack.",
    items: "Mat Keramika Krujka, A5 Bloknot, Ruchka, Organayzer"
  },
  {
    id: 5,
    title: "Premium LED Smart Thermos",
    category: "accessories",
    price: 145000,
    minOrder: 30,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
    tag: "🌡️ Smart Thermos",
    desc: "Qopqog'ida sensorli harorat ko'rsatkichi mavjud bo'lgan, zanglamas po'latdan ishlangan smart termos.",
    items: "LED Sensor, 500ml Po'lat Inox, Lazer Gravirovka"
  },
  {
    id: 6,
    title: "Executive Leather Notebook A5",
    category: "accessories",
    price: 120000,
    minOrder: 50,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    tag: "📖 Executive",
    desc: "Har bir sahifasida rejalashtirish uchun qulay chiziqlar va sifatli charm muqovaga ega korporativ kundalik.",
    items: "A5 format, 96 varaq, Eko charm, Zarbosma"
  },
  {
    id: 7,
    title: "VIP Ambassador Luxury Set",
    category: "vip",
    price: 750000,
    minOrder: 10,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
    tag: "👑 VIP Gold",
    desc: "Eng yuqori darajadagi mehmonlar va kompaniya ta'sischilari uchun eksklyuziv hashamatli sovg'a.",
    items: "Charm Hamyon, 24k Oltin Pero Ruchka, Yog'och Luks Quti"
  },
  {
    id: 8,
    title: "Eco Natural Bamboo Pack",
    category: "giftbox",
    price: 310000,
    minOrder: 20,
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80",
    tag: "🌿 Eco Line",
    desc: "Ekologik toza tabiiy bambuk va kraft materiallaridan tayyorlangan to'plam.",
    items: "Bambuk Termos, Kraft Bloknot, Yog'och Ruchka, Eko Qadoq"
  }
];

const DEFAULT_ORDERS = [
  {
    id: 101,
    clientName: "Botirjonov G.",
    companyName: "Botirjonov Social Group",
    phone: "+998 90 123 45 67",
    product: "Premium Luxury Gift Box",
    quantity: 50,
    budget: "19 000 000 so‘m",
    comments: "Boshliqqa ko'rsatish uchun 50 ta VIP to'plam. Logotip lazer gravirovka bo'lishi kerak.",
    status: "yangi",
    date: "2026-08-25 18:57"
  },
  {
    id: 102,
    clientName: "Alisher Qodirov",
    companyName: "Orient Holding",
    phone: "+998 97 765 43 21",
    product: "VIP Ambassador Luxury Set",
    quantity: 20,
    budget: "15 000 000 so‘m",
    comments: "Xorijiy investorlar delegatsiyasi uchun oltin zarbosmali qadoq.",
    status: "jarayonda",
    date: "2026-08-25 15:20"
  },
  {
    id: 103,
    clientName: "Nodira Karimova",
    companyName: "Payme IT",
    phone: "+998 93 555 11 22",
    product: "Tech Gadget 3-in-1 Set",
    quantity: 100,
    budget: "39 900 000 so‘m",
    comments: "Yangi dasturchilar va jamoa a'zolari uchun Welcome Pack.",
    status: "bajarildi",
    date: "2026-08-24 11:30"
  }
];

let leadsChartInstance = null;
let productsChartInstance = null;
let currentFilterStatus = 'all';

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  checkAuth();
});

/* --------------------------------------------------------------------------
   SECURITY UTILITIES: SHA-256, XSS SANITIZATION & BRUTE FORCE PROTECTION
   -------------------------------------------------------------------------- */

// SHA-256 Hashing using Web Crypto API
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "_giftify_secure_salt_2026");
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Robust XSS Sanitizer for all dynamic user inputs
function sanitizeHTML(str) {
  if (str === null || str === undefined) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(str).replace(/[&<>"']/g, (m) => map[m]);
}

// Brute force state
let loginAttempts = 0;
const MAX_ATTEMPTS = 5;
let lockoutTimer = null;
let lockoutSeconds = 0;

// Session Inactivity Tracker (15 Minutes Auto-Logout)
const INACTIVITY_TIMEOUT = 15 * 60 * 1000;
let lastActivityTime = Date.now();
let activityCheckInterval = null;

function resetInactivityTimer() {
  lastActivityTime = Date.now();
}

function startInactivityMonitor() {
  ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(evt => {
    window.addEventListener(evt, resetInactivityTimer, { passive: true });
  });

  if (activityCheckInterval) clearInterval(activityCheckInterval);
  activityCheckInterval = setInterval(() => {
    const isLogged = sessionStorage.getItem('giftify_admin_logged');
    if (isLogged === 'true' && (Date.now() - lastActivityTime > INACTIVITY_TIMEOUT)) {
      sessionStorage.removeItem('giftify_admin_logged');
      alert('Xavfsizlik yuzasidan: 15 daqiqa faoliyatsizlik sababli tizimdan avtomatik chiqildi.');
      checkAuth();
    }
  }, 10000);
}

/* --------------------------------------------------------------------------
   1. STORAGE & STATE MANAGEMENT WITH SECURITY INITIALIZATION
   -------------------------------------------------------------------------- */
async function initStorage() {
  if (!localStorage.getItem('giftify_products')) {
    localStorage.setItem('giftify_products', JSON.stringify(DEFAULT_PRODUCTS));
  }
  if (!localStorage.getItem('giftify_orders')) {
    localStorage.setItem('giftify_orders', JSON.stringify(DEFAULT_ORDERS));
  }
  if (!localStorage.getItem('giftify_calc_settings')) {
    localStorage.setItem('giftify_calc_settings', JSON.stringify({
      disc100: 5, disc250: 10, disc500: 15,
      uvPrint: 15000, foilStamp: 20000,
      luxBox: 25000, woodBox: 50000
    }));
  }
  
  // Initialize salted SHA-256 hashed default admin credentials
  if (!localStorage.getItem('giftify_admin_creds_v2')) {
    const defaultHash = await hashPassword('admin123');
    localStorage.setItem('giftify_admin_creds_v2', JSON.stringify({
      user: 'admin',
      passHash: defaultHash
    }));
  }
}

function getOrders() {
  try {
    return JSON.parse(localStorage.getItem('giftify_orders') || '[]');
  } catch (e) {
    return [];
  }
}

function saveOrders(orders) {
  localStorage.setItem('giftify_orders', JSON.stringify(orders));
  renderDashboard();
  renderOrdersTable();
}

function getProducts() {
  try {
    return JSON.parse(localStorage.getItem('giftify_products') || '[]');
  } catch (e) {
    return [];
  }
}

function saveProducts(products) {
  localStorage.setItem('giftify_products', JSON.stringify(products));
  renderProducts();
}

/* --------------------------------------------------------------------------
   2. AUTHENTICATION & LOGIN (RATE LIMITING & HASH VALIDATION)
   -------------------------------------------------------------------------- */
function checkAuth() {
  const isLogged = sessionStorage.getItem('giftify_admin_logged');
  const authScreen = document.getElementById('authScreen');
  const adminApp = document.getElementById('adminApp');

  if (isLogged === 'true') {
    authScreen.style.display = 'none';
    adminApp.style.display = 'flex';
    initDashboard();
    startInactivityMonitor();
  } else {
    authScreen.style.display = 'flex';
    adminApp.style.display = 'none';
  }
}

window.handleAdminLogin = async function(e) {
  e.preventDefault();

  // Check lockout
  if (lockoutSeconds > 0) {
    alert(`Xavfsizlik blokirovkasi! Iltimos ${lockoutSeconds} soniyadan keyin qayta urinib ko‘ring.`);
    return;
  }

  const uInput = document.getElementById('adminUsername').value.trim();
  const pInput = document.getElementById('adminPassword').value.trim();
  const loginBtn = document.getElementById('loginBtn');

  if (!uInput || !pInput) {
    alert('Iltimos login va parolni to‘liq kiriting!');
    return;
  }

  loginBtn.disabled = true;
  loginBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Tekshirilmoqda...';

  const inputHash = await hashPassword(pInput);
  const creds = JSON.parse(localStorage.getItem('giftify_admin_creds_v2') || '{}');

  // Small delay to prevent timing attacks
  await new Promise(r => setTimeout(r, 400));

  loginBtn.disabled = false;
  loginBtn.innerHTML = '<i class="fa-solid fa-arrow-right-to-bracket"></i> Tizimga Kirish';

  if (uInput === creds.user && inputHash === creds.passHash) {
    loginAttempts = 0;
    sessionStorage.setItem('giftify_admin_logged', 'true');
    showAdminToast('Tizimga muvaffaqiyatli xavfsiz kirdingiz!');
    checkAuth();
  } else {
    loginAttempts++;
    const remaining = MAX_ATTEMPTS - loginAttempts;

    if (loginAttempts >= MAX_ATTEMPTS) {
      lockoutSeconds = 60;
      loginBtn.disabled = true;
      
      lockoutTimer = setInterval(() => {
        lockoutSeconds--;
        loginBtn.innerHTML = `<i class="fa-solid fa-lock"></i> Bloklandi (${lockoutSeconds}s)`;
        if (lockoutSeconds <= 0) {
          clearInterval(lockoutTimer);
          loginAttempts = 0;
          loginBtn.disabled = false;
          loginBtn.innerHTML = '<i class="fa-solid fa-arrow-right-to-bracket"></i> Tizimga Kirish';
        }
      }, 1000);

      alert(`Xavfsizlik qoidasi: 5 marta noto‘g‘ri kiritildi. Tizim 60 soniyaga bloklandi!`);
    } else {
      alert(`Noto‘g‘ri login yoki parol! Qolgan urinishlar: ${remaining} ta.`);
    }
  }
};

window.handleAdminLogout = function() {
  if (confirm('Admin panelidan xavfsiz chiqishni tasdiqlaysizmi?')) {
    sessionStorage.removeItem('giftify_admin_logged');
    checkAuth();
  }
};

window.togglePasswordVisibility = function() {
  const pwdInput = document.getElementById('adminPassword');
  const icon = document.getElementById('pwdEyeIcon');
  if (pwdInput.type === 'password') {
    pwdInput.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    pwdInput.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
};

/* --------------------------------------------------------------------------
   3. NAVIGATION & TABS
   -------------------------------------------------------------------------- */
window.switchTab = function(tabName) {
  document.querySelectorAll('.tab-view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const targetView = document.getElementById(`tab-${tabName}`);
  const targetNav = document.querySelector(`.nav-item[data-tab="${tabName}"]`);

  if (targetView) targetView.classList.add('active');
  if (targetNav) targetNav.classList.add('active');

  const titles = {
    'dashboard': { h: 'Boshqaruv Paneli', s: 'Kompaniya statistikasi va so\'nggi arizalar' },
    'orders': { h: 'Arizalar & Buyurtmalar', s: 'Barcha kelib tushgan korporativ arizalar' },
    'products': { h: 'Mahsulotlar Katalogi', s: 'Saytdagi barcha sovg\'a to\'plamlarini boshqarish' },
    'calculator-config': { h: 'Kalkulyator Sozlamalari', s: 'Ulgurji chegirmalar va xizmatlar narxi' },
    'settings': { h: 'Tizim Sozlamalari', s: 'Kompaniya aloqa ma\'lumotlari va parollar' }
  };

  if (titles[tabName]) {
    document.getElementById('pageHeading').textContent = titles[tabName].h;
    document.getElementById('pageSubHeading').textContent = titles[tabName].s;
  }

  // Close mobile sidebar if open
  const sidebar = document.getElementById('adminSidebar');
  if (sidebar) sidebar.classList.remove('open');
};

window.toggleMobileSidebar = function() {
  const sidebar = document.getElementById('adminSidebar');
  if (sidebar) sidebar.classList.toggle('open');
};

/* --------------------------------------------------------------------------
   4. DASHBOARD & KPIS
   -------------------------------------------------------------------------- */
function initDashboard() {
  renderDashboard();
  renderOrdersTable();
  renderProducts();
  loadCalcSettings();
  loadGeneralSettings();
  initCharts();
}

function renderDashboard() {
  const orders = getOrders();
  const products = getProducts();

  const totalCount = orders.length;
  const newCount = orders.filter(o => o.status === 'yangi').length;

  // Calculate approximate revenue
  let revenueSum = 0;
  orders.forEach(o => {
    if (o.budget) {
      const num = parseInt(o.budget.replace(/[^0-9]/g, ''), 10);
      if (!isNaN(num)) revenueSum += num;
    }
  });

  document.getElementById('kpiTotalOrders').textContent = totalCount;
  document.getElementById('kpiNewOrders').textContent = newCount;
  document.getElementById('newOrdersBadge').textContent = newCount;
  document.getElementById('kpiTotalRevenue').textContent = formatCurrency(revenueSum);
  document.getElementById('kpiActiveProducts').textContent = products.length;

  // Render recent 5 orders on dashboard table
  const tbody = document.getElementById('dashboardOrdersTbody');
  tbody.innerHTML = '';

  const recentOrders = [...orders].reverse().slice(0, 5);

  if (recentOrders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 30px;">Hozircha arizalar mavjud emas</td></tr>`;
    return;
  }

  recentOrders.forEach(order => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div style="font-weight: 700; color: #fff;">${sanitizeHTML(order.clientName)}</div>
        <div style="font-size: 0.75rem; color: var(--gold-400);">${sanitizeHTML(order.companyName)}</div>
      </td>
      <td><strong>${sanitizeHTML(order.phone)}</strong></td>
      <td>${sanitizeHTML(order.product)}</td>
      <td><span class="badge-live" style="background: rgba(255,255,255,0.05); border-color: var(--border-subtle); color: #fff;">${sanitizeHTML(order.quantity)} dona</span></td>
      <td>${getStatusBadge(order.status)}</td>
      <td style="font-size: 0.8rem; color: var(--text-muted);">${sanitizeHTML(order.date)}</td>
      <td>
        <div class="table-btn-group">
          <button class="btn-action" onclick="viewOrderDetails(${order.id})" title="Ko'rish"><i class="fa-solid fa-eye"></i></button>
          <a href="https://t.me/${encodeURIComponent(order.phone.replace(/[^0-9]/g, ''))}" target="_blank" class="btn-action" title="Telegramda yozish"><i class="fa-brands fa-telegram"></i></a>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function getStatusBadge(status) {
  const s = sanitizeHTML(status);
  if (s === 'yangi') return `<span class="status-badge status-yangi"><i class="fa-solid fa-circle-dot"></i> Yangi</span>`;
  if (s === 'jarayonda') return `<span class="status-badge status-jarayonda"><i class="fa-solid fa-spinner fa-spin"></i> Jarayonda</span>`;
  if (s === 'bajarildi') return `<span class="status-badge status-bajarildi"><i class="fa-solid fa-check"></i> Bajarildi</span>`;
  return `<span class="status-badge">${s}</span>`;
}

/* --------------------------------------------------------------------------
   5. CHARTS (CHART.JS)
   -------------------------------------------------------------------------- */
function initCharts() {
  const leadsCtx = document.getElementById('leadsTrendChart');
  const productsCtx = document.getElementById('productsShareChart');

  if (!leadsCtx || !productsCtx) return;

  if (leadsChartInstance) leadsChartInstance.destroy();
  if (productsChartInstance) productsChartInstance.destroy();

  // 1. Leads Trend Chart
  leadsChartInstance = new Chart(leadsCtx, {
    type: 'line',
    data: {
      labels: ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'],
      datasets: [{
        label: 'Arizalar soni',
        data: [4, 7, 5, 11, 9, 14, 12],
        borderColor: '#dfb141',
        backgroundColor: 'rgba(223, 177, 65, 0.12)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#fae19c',
        pointBorderColor: '#080c16',
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8', stepSize: 2 } }
      }
    }
  });

  // 2. Product Share Chart
  productsChartInstance = new Chart(productsCtx, {
    type: 'doughnut',
    data: {
      labels: ['Luxury Gift Box', 'VIP Ambassador', 'Tech Gadget', 'Office Set', 'Bambuk Pack'],
      datasets: [{
        data: [40, 25, 15, 12, 8],
        backgroundColor: [
          '#dfb141',
          '#3b82f6',
          '#10b981',
          '#a855f7',
          '#f43f5e'
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#cbd5e1', font: { size: 11 }, padding: 12 }
        }
      },
      cutout: '70%'
    }
  });
}

/* --------------------------------------------------------------------------
   6. ORDERS MANAGEMENT (WITH XSS ESCAPING)
   -------------------------------------------------------------------------- */
function renderOrdersTable() {
  const orders = getOrders();
  const tbody = document.getElementById('allOrdersTbody');
  const emptyState = document.getElementById('ordersEmptyState');

  // Update counts
  const total = orders.length;
  const newC = orders.filter(o => o.status === 'yangi').length;
  const procC = orders.filter(o => o.status === 'jarayonda').length;
  const doneC = orders.filter(o => o.status === 'bajarildi').length;

  document.getElementById('countStatusAll').textContent = total;
  document.getElementById('countStatusNew').textContent = newC;
  document.getElementById('countStatusProcess').textContent = procC;
  document.getElementById('countStatusDone').textContent = doneC;

  let filtered = orders;
  if (currentFilterStatus !== 'all') {
    filtered = orders.filter(o => o.status === currentFilterStatus);
  }

  tbody.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.style.display = 'block';
    return;
  } else {
    emptyState.style.display = 'none';
  }

  [...filtered].reverse().forEach(order => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-family: var(--font-heading); font-weight: 700; color: var(--gold-400);">#${order.id}</td>
      <td style="font-weight: 700; color: #fff;">${sanitizeHTML(order.clientName)}</td>
      <td><span style="color: #cbd5e1;">${sanitizeHTML(order.companyName)}</span></td>
      <td><strong>${sanitizeHTML(order.phone)}</strong></td>
      <td>${sanitizeHTML(order.product)}</td>
      <td><strong>${sanitizeHTML(order.quantity)}</strong> dona</td>
      <td style="max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${sanitizeHTML(order.comments || order.budget)}">
        ${sanitizeHTML(order.budget || order.comments || '—')}
      </td>
      <td>
        <select class="status-changer-select" onchange="updateOrderStatus(${order.id}, this.value)">
          <option value="yangi" ${order.status === 'yangi' ? 'selected' : ''}>🔴 Yangi</option>
          <option value="jarayonda" ${order.status === 'jarayonda' ? 'selected' : ''}>🟡 Jarayonda</option>
          <option value="bajarildi" ${order.status === 'bajarildi' ? 'selected' : ''}>🟢 Bajarildi</option>
        </select>
      </td>
      <td style="font-size: 0.8rem; color: var(--text-muted);">${sanitizeHTML(order.date)}</td>
      <td style="text-align: right;">
        <div class="table-btn-group">
          <button class="btn-action" onclick="viewOrderDetails(${order.id})" title="To'liq ko'rish"><i class="fa-solid fa-eye"></i></button>
          <button class="btn-action btn-action-del" onclick="deleteOrder(${order.id})" title="O'chirish"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

window.filterOrdersByStatus = function(status) {
  currentFilterStatus = status;
  document.querySelectorAll('.status-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-status') === status) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  renderOrdersTable();
};

window.updateOrderStatus = function(orderId, newStatus) {
  let orders = getOrders();
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx !== -1) {
    orders[idx].status = newStatus;
    saveOrders(orders);
    showAdminToast(`Ariza #${orderId} holati yangilandi!`);
  }
};

window.deleteOrder = function(orderId) {
  if (confirm(`Haqiqatan ham #${orderId} arizani o'chirmoqchimisiz?`)) {
    let orders = getOrders().filter(o => o.id !== orderId);
    saveOrders(orders);
    showAdminToast(`Ariza #${orderId} o'chirildi.`);
  }
};

window.addMockLead = function() {
  const names = ["Jamshid Aliyev", "Shahzod Ergashev", "Dilnoza Rahimova", "Akmal Yusupov"];
  const comps = ["Artel Corp", "Orient Holding", "Ucell Telecom", "TBC Bank"];
  const prods = ["Premium Luxury Gift Box", "Business Executive Set", "Tech Gadget 3-in-1 Set", "VIP Ambassador Luxury Set"];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomComp = comps[Math.floor(Math.random() * comps.length)];
  const randomProd = prods[Math.floor(Math.random() * prods.length)];

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 16).replace('T', ' ');

  const newOrder = {
    id: Date.now() % 100000,
    clientName: randomName,
    companyName: randomComp,
    phone: "+998 (90) " + Math.floor(1000000 + Math.random() * 9000000),
    product: randomProd,
    quantity: (Math.floor(Math.random() * 8) + 2) * 10,
    budget: formatCurrency((Math.floor(Math.random() * 20) + 5) * 1000000),
    comments: "Sayt orqali yangi arizani simulyatsiya qilish.",
    status: "yangi",
    date: dateStr
  };

  const orders = getOrders();
  orders.push(newOrder);
  saveOrders(orders);
  showAdminToast('Yangi sinov arizasi qo‘shildi!');
};

window.viewOrderDetails = function(orderId) {
  const order = getOrders().find(o => o.id === orderId);
  if (!order) return;

  document.getElementById('detailOrderId').textContent = order.id;
  const content = document.getElementById('orderDetailContent');
  content.innerHTML = `
    <div class="detail-row"><span class="detail-lbl">Mijoz Ismi:</span><span class="detail-val">${sanitizeHTML(order.clientName)}</span></div>
    <div class="detail-row"><span class="detail-lbl">Kompaniya Nomi:</span><span class="detail-val">${sanitizeHTML(order.companyName)}</span></div>
    <div class="detail-row"><span class="detail-lbl">Telefon Raqami:</span><span class="detail-val">${sanitizeHTML(order.phone)}</span></div>
    <div class="detail-row"><span class="detail-lbl">Tanlangan Sovg'a:</span><span class="detail-val">${sanitizeHTML(order.product)}</span></div>
    <div class="detail-row"><span class="detail-lbl">Buyurtma Soni:</span><span class="detail-val">${sanitizeHTML(order.quantity)} dona</span></div>
    <div class="detail-row"><span class="detail-lbl">Byudjet / Qiymat:</span><span class="detail-val" style="color: var(--gold-400);">${sanitizeHTML(order.budget || 'Kelishiladi')}</span></div>
    <div class="detail-row"><span class="detail-lbl">Holati:</span><span class="detail-val">${getStatusBadge(order.status)}</span></div>
    <div class="detail-row"><span class="detail-lbl">Ariza Sanasi:</span><span class="detail-val">${sanitizeHTML(order.date)}</span></div>
    <div style="margin-top: 14px;">
      <span class="detail-lbl">Mijoz Izohi / Maxsus talablari:</span>
      <div style="background: rgba(10,15,28,0.8); border: 1px solid var(--border-subtle); padding: 12px; border-radius: var(--radius-md); margin-top: 6px; font-size: 0.88rem; color: #fff;">
        ${sanitizeHTML(order.comments || 'Izoh qoldirilmagan')}
      </div>
    </div>
  `;

  const cleanPhone = order.phone.replace(/[^0-9]/g, '');
  document.getElementById('detailTelegramLink').href = `https://t.me/${cleanPhone}`;

  const modal = document.getElementById('orderDetailsModal');
  modal.classList.add('active');
};

window.closeOrderDetailsModal = function() {
  document.getElementById('orderDetailsModal').classList.remove('active');
};

window.exportOrdersToCSV = function() {
  const orders = getOrders();
  if (!orders.length) {
    alert('Eksport qilish uchun arizalar yo\'q!');
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8,ID,Mijoz Ismi,Kompaniya,Telefon,Sovg'a,Soni,Byudjet,Holat,Sana\n";
  orders.forEach(o => {
    csvContent += `"${o.id}","${o.clientName.replace(/"/g, '""')}","${o.companyName.replace(/"/g, '""')}","${o.phone}","${o.product.replace(/"/g, '""')}","${o.quantity}","${o.budget}","${o.status}","${o.date}"\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `giftify_orders_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showAdminToast('Arizalar Excel CSV formatida yuklab olindi!');
};

window.handleGlobalSearch = function(query) {
  const q = query.toLowerCase().trim();
  const rows = document.querySelectorAll('#allOrdersTbody tr');

  rows.forEach(r => {
    const text = r.textContent.toLowerCase();
    r.style.display = text.includes(q) ? '' : 'none';
  });
};

/* --------------------------------------------------------------------------
   7. PRODUCT CRUD MANAGEMENT
   -------------------------------------------------------------------------- */
function renderProducts() {
  const products = getProducts();
  const grid = document.getElementById('adminProductsGrid');
  if (!grid) return;

  grid.innerHTML = '';

  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'admin-prod-card';
    card.innerHTML = `
      <div class="admin-prod-img-box">
        <img src="${sanitizeHTML(p.image)}" alt="${sanitizeHTML(p.title)}" class="admin-prod-img" onerror="this.src='https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'">
        ${p.tag ? `<span class="admin-prod-badge">${sanitizeHTML(p.tag)}</span>` : ''}
      </div>
      <div class="admin-prod-body">
        <div class="admin-prod-price">${formatCurrency(p.price)}</div>
        <h4 class="admin-prod-title">${sanitizeHTML(p.title)}</h4>
        <div class="admin-prod-min">Min buyurtma: ${p.minOrder} dona • Toifa: ${sanitizeHTML(p.category)}</div>
        <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 12px;">${sanitizeHTML(p.desc)}</p>
        <div class="admin-prod-footer">
          <button class="btn-action" onclick="openEditProductModal(${p.id})" title="Tahrirlash"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="btn-action btn-action-del" onclick="deleteProduct(${p.id})" title="O'chirish"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

window.openNewProductModal = function() {
  document.getElementById('productModalHeading').textContent = "Yangi Sovg'a To'plami Qo'shish";
  document.getElementById('editProductId').value = '';
  document.getElementById('productForm').reset();
  previewProductImage('');
  document.getElementById('productModal').classList.add('active');
};

window.openEditProductModal = function(id) {
  const product = getProducts().find(p => p.id === id);
  if (!product) return;

  document.getElementById('productModalHeading').textContent = "Mahsulotni Tahrirlash";
  document.getElementById('editProductId').value = product.id;
  document.getElementById('prodTitle').value = product.title;
  document.getElementById('prodCategory').value = product.category;
  document.getElementById('prodPrice').value = product.price;
  document.getElementById('prodMinOrder').value = product.minOrder;
  document.getElementById('prodTag').value = product.tag || '';
  document.getElementById('prodImage').value = product.image;
  document.getElementById('prodDesc').value = product.desc;
  document.getElementById('prodItems').value = product.items || '';
  previewProductImage(product.image);

  document.getElementById('productModal').classList.add('active');
};

window.closeProductModal = function() {
  document.getElementById('productModal').classList.remove('active');
  previewProductImage('');
};

/* Image Preview & Quick Picker Helpers */
window.previewProductImage = function(url) {
  const img = document.getElementById('prodImagePreview');
  const placeholder = document.getElementById('prodImagePlaceholder');
  if (!img || !placeholder) return;
  if (url && url.startsWith('http')) {
    img.src = url;
    img.style.display = 'block';
    placeholder.style.display = 'none';
    img.onerror = () => {
      img.style.display = 'none';
      placeholder.style.display = 'flex';
    };
  } else {
    img.style.display = 'none';
    img.src = '';
    placeholder.style.display = 'flex';
  }
};

window.selectQuickImage = function(url) {
  const input = document.getElementById('prodImage');
  if (input) {
    input.value = url;
    previewProductImage(url);
  }
  // Highlight selected quick image
  document.querySelectorAll('.quick-img-item').forEach(el => el.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
};

window.handleProductFormSubmit = function(e) {
  e.preventDefault();
  const editId = document.getElementById('editProductId').value;
  let products = getProducts();

  const productData = {
    id: editId ? parseInt(editId, 10) : Date.now(),
    title: document.getElementById('prodTitle').value.trim(),
    category: document.getElementById('prodCategory').value,
    price: parseInt(document.getElementById('prodPrice').value, 10),
    minOrder: parseInt(document.getElementById('prodMinOrder').value, 10),
    tag: document.getElementById('prodTag').value.trim(),
    image: document.getElementById('prodImage').value.trim(),
    desc: document.getElementById('prodDesc').value.trim(),
    items: document.getElementById('prodItems').value.trim()
  };

  if (editId) {
    const idx = products.findIndex(p => p.id === parseInt(editId, 10));
    if (idx !== -1) products[idx] = productData;
    showAdminToast('Mahsulot muvaffaqiyatli yangilandi!');
  } else {
    products.push(productData);
    showAdminToast('Yangi mahsulot katalogga qo‘shildi!');
  }

  saveProducts(products);
  closeProductModal();
};

window.deleteProduct = function(id) {
  if (confirm('Haqiqatan ham ushbu mahsulotni o\'chirmoqchimisiz?')) {
    let products = getProducts().filter(p => p.id !== id);
    saveProducts(products);
    showAdminToast('Mahsulot o\'chirildi.');
  }
};

/* --------------------------------------------------------------------------
   8. CALCULATOR & SYSTEM SETTINGS WITH SECURE PASSWORD HASHING
   -------------------------------------------------------------------------- */
function loadCalcSettings() {
  const cfg = JSON.parse(localStorage.getItem('giftify_calc_settings') || '{}');
  if (cfg.disc100) document.getElementById('discount100').value = cfg.disc100;
  if (cfg.disc250) document.getElementById('discount250').value = cfg.disc250;
  if (cfg.disc500) document.getElementById('discount500').value = cfg.disc500;
  if (cfg.uvPrint) document.getElementById('costUvPrint').value = cfg.uvPrint;
  if (cfg.foilStamp) document.getElementById('costFoilStamp').value = cfg.foilStamp;
  if (cfg.luxBox) document.getElementById('costLuxuryBox').value = cfg.luxBox;
  if (cfg.woodBox) document.getElementById('costWoodenBox').value = cfg.woodBox;
}

window.saveCalcSettings = function(e) {
  e.preventDefault();
  const cfg = {
    disc100: parseInt(document.getElementById('discount100').value, 10),
    disc250: parseInt(document.getElementById('discount250').value, 10),
    disc500: parseInt(document.getElementById('discount500').value, 10),
    uvPrint: parseInt(document.getElementById('costUvPrint').value, 10),
    foilStamp: parseInt(document.getElementById('costFoilStamp').value, 10),
    luxBox: parseInt(document.getElementById('costLuxuryBox').value, 10),
    woodBox: parseInt(document.getElementById('costWoodenBox').value, 10)
  };
  localStorage.setItem('giftify_calc_settings', JSON.stringify(cfg));
  showAdminToast('Kalkulyator parametrlari saqlandi!');
};

function loadGeneralSettings() {
  const sbUrl = localStorage.getItem('giftify_supabase_url') || '';
  const sbKey = localStorage.getItem('giftify_supabase_key') || '';
  const urlInput = document.getElementById('settingSupabaseUrl');
  const keyInput = document.getElementById('settingSupabaseKey');
  if (urlInput) urlInput.value = sbUrl;
  if (keyInput) keyInput.value = sbKey;
}

window.saveGeneralSettings = async function(e) {
  e.preventDefault();
  const newLogin = document.getElementById('newAdminLogin').value.trim();
  const newPass = document.getElementById('newAdminPassword').value.trim();
  const sbUrl = document.getElementById('settingSupabaseUrl').value.trim();
  const sbKey = document.getElementById('settingSupabaseKey').value.trim();

  // Save Supabase credentials
  localStorage.setItem('giftify_supabase_url', sbUrl);
  localStorage.setItem('giftify_supabase_key', sbKey);
  SUPABASE_CONFIG.url = sbUrl;
  SUPABASE_CONFIG.anonKey = sbKey;
  initSupabase();

  if (newPass) {
    if (newPass.length < 6) {
      alert('Xavfsizlik talabi: Yangi parol kamida 6 ta belgidan iborat bo‘lishi shart!');
      return;
    }
    const creds = JSON.parse(localStorage.getItem('giftify_admin_creds_v2') || '{}');
    const userToSet = newLogin || creds.user || 'admin';
    const passHashToSet = await hashPassword(newPass);

    localStorage.setItem('giftify_admin_creds_v2', JSON.stringify({
      user: userToSet,
      passHash: passHashToSet
    }));

    document.getElementById('newAdminPassword').value = '';
    showAdminToast('Admin sozlamalari va yangi parol saqlandi!');
  } else if (newLogin) {
    const creds = JSON.parse(localStorage.getItem('giftify_admin_creds_v2') || '{}');
    creds.user = newLogin;
    localStorage.setItem('giftify_admin_creds_v2', JSON.stringify(creds));
    showAdminToast('Admin logini va bulutli baza parametrlari yangilandi!');
  } else {
    showAdminToast('Barcha sozlamalar muvaffaqiyatli saqlandi!');
  }
};

window.testSupabaseConnection = async function() {
  const sbUrl = document.getElementById('settingSupabaseUrl').value.trim();
  const sbKey = document.getElementById('settingSupabaseKey').value.trim();

  if (!sbUrl || !sbKey) {
    alert('Iltimos avval Supabase Project URL va Anon Key maydonlarini to‘ldiring!');
    return;
  }

  try {
    const testClient = supabase.createClient(sbUrl, sbKey);
    const { data, error } = await testClient.from('orders').select('count', { count: 'exact', head: true });
    
    if (!error) {
      showAdminToast('✅ Supabase bulutli bazasiga ulanish muvaffaqiyatli!');
      alert('Ajoyib! Supabase PostgreSQL bulutli bazasiga ulanish 100% muvaffaqiyatli o‘rnatildi.');
    } else {
      alert('Ulanishda xatolik: ' + error.message + '\nIltimos, Supabase SQL jadval yaratilganini tekshiring.');
    }
  } catch (err) {
    alert('Supabase ulanish xatoligi: ' + err.message);
  }
};

/* --------------------------------------------------------------------------
   9. TOAST & UTILITIES
   -------------------------------------------------------------------------- */
function showAdminToast(msg) {
  const toast = document.getElementById('adminToast');
  if (!toast) return;
  document.getElementById('adminToastMsg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

function formatCurrency(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' so‘m';
}

