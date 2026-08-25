/* ==========================================================================
   GIFTIFY BUSINESS — SUPABASE CLOUD DATABASE CLIENT (100% FREE TIER)
   ========================================================================== */

// SUPABASE CONFIGURATION
// Foydalanuvchi o'zining Supabase loyiha URL va Anon kalitini shu yerga yozishi mumkin
// Agar bu parametrlar bo'sh bo'lsa, tizim avtomatik tarzda LocalStorage orqali xatosiz ishlaydi (Graceful Fallback).
const SUPABASE_CONFIG = {
  url: localStorage.getItem('giftify_supabase_url') || '',
  anonKey: localStorage.getItem('giftify_supabase_key') || ''
};

let supabaseClient = null;

// Initialize Supabase if credentials are provided and CDN library is loaded
function initSupabase() {
  if (typeof supabase !== 'undefined' && SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey) {
    try {
      supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
      console.log('✅ Supabase bulutli bazasiga muvaffaqiyatli ulandi!');
    } catch (e) {
      console.warn('⚠️ Supabase ulanishida xatolik, lokal rejimda davom etilmoqda:', e);
      supabaseClient = null;
    }
  }
}

// Check if Cloud is active
function isCloudDbActive() {
  return supabaseClient !== null;
}

// --------------------------------------------------------------------------
// 1. ORDERS API (ARIZALAR BULUTLI VA LOKAL OPERATSIYALARI)
// --------------------------------------------------------------------------
async function dbFetchOrders() {
  if (isCloudDbActive()) {
    try {
      const { data, error } = await supabaseClient
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        // Transform Supabase snake_case to app camelCase
        return data.map(item => ({
          id: item.id,
          clientName: item.client_name,
          companyName: item.company_name || '—',
          phone: item.phone,
          product: item.product,
          quantity: item.quantity,
          budget: item.budget,
          comments: item.comments,
          status: item.status || 'yangi',
          date: item.created_at ? new Date(item.created_at).toLocaleString('uz-UZ') : 'Hozirgina'
        }));
      }
    } catch (err) {
      console.warn('Supabase fetch error, fallback to localStorage:', err);
    }
  }

  // Fallback to LocalStorage
  return JSON.parse(localStorage.getItem('giftify_orders') || '[]');
}

async function dbInsertOrder(order) {
  // Always save to LocalStorage first for instant local responsiveness
  try {
    const local = JSON.parse(localStorage.getItem('giftify_orders') || '[]');
    local.push(order);
    localStorage.setItem('giftify_orders', JSON.stringify(local));
  } catch (e) {}

  // If Supabase is connected, insert to PostgreSQL table
  if (isCloudDbActive()) {
    try {
      const { data, error } = await supabaseClient
        .from('orders')
        .insert([{
          client_name: order.clientName,
          company_name: order.companyName,
          phone: order.phone,
          product: order.product,
          quantity: parseInt(order.quantity, 10) || 1,
          budget: order.budget,
          comments: order.comments,
          status: order.status || 'yangi'
        }])
        .select();

      if (!error) {
        console.log('✅ Ariza Supabase bulutli bazasiga saqlandi:', data);
        return { success: true, cloud: true, data };
      } else {
        console.warn('Supabase insert xatosi:', error);
      }
    } catch (err) {
      console.warn('Supabase insert network error:', err);
    }
  }

  return { success: true, cloud: false };
}

async function dbUpdateOrderStatus(orderId, newStatus) {
  if (isCloudDbActive()) {
    try {
      await supabaseClient
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);
    } catch (err) {
      console.warn('Supabase update status error:', err);
    }
  }

  // Also update local storage
  try {
    const orders = JSON.parse(localStorage.getItem('giftify_orders') || '[]');
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx !== -1) {
      orders[idx].status = newStatus;
      localStorage.setItem('giftify_orders', JSON.stringify(orders));
    }
  } catch (e) {}
}

async function dbDeleteOrder(orderId) {
  if (isCloudDbActive()) {
    try {
      await supabaseClient
        .from('orders')
        .delete()
        .eq('id', orderId);
    } catch (err) {
      console.warn('Supabase delete error:', err);
    }
  }

  // Also delete from local
  try {
    let orders = JSON.parse(localStorage.getItem('giftify_orders') || '[]');
    orders = orders.filter(o => o.id !== orderId);
    localStorage.setItem('giftify_orders', JSON.stringify(orders));
  } catch (e) {}
}

// --------------------------------------------------------------------------
// 2. PRODUCTS API (MAHSULOTLAR BULUTLI VA LOKAL OPERATSIYALARI)
// --------------------------------------------------------------------------
async function dbFetchProducts() {
  if (isCloudDbActive()) {
    try {
      const { data, error } = await supabaseClient
        .from('products')
        .select('*')
        .order('id', { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map(p => ({
          id: p.id,
          title: p.title,
          category: p.category,
          price: p.price,
          minOrder: p.min_order,
          image: p.image,
          tag: p.tag,
          desc: p.description,
          items: p.items
        }));
      }
    } catch (err) {
      console.warn('Supabase products fetch error:', err);
    }
  }

  return JSON.parse(localStorage.getItem('giftify_products') || '[]');
}

async function dbSaveProduct(product) {
  // Save local
  let products = JSON.parse(localStorage.getItem('giftify_products') || '[]');
  const idx = products.findIndex(p => p.id === product.id);
  if (idx !== -1) {
    products[idx] = product;
  } else {
    products.push(product);
  }
  localStorage.setItem('giftify_products', JSON.stringify(products));

  // Save to Supabase if active
  if (isCloudDbActive()) {
    try {
      const payload = {
        title: product.title,
        category: product.category,
        price: product.price,
        min_order: product.minOrder,
        image: product.image,
        tag: product.tag,
        description: product.desc,
        items: product.items
      };

      if (product.id && typeof product.id === 'number' && product.id < 100000) {
        await supabaseClient.from('products').upsert({ id: product.id, ...payload });
      } else {
        await supabaseClient.from('products').insert([payload]);
      }
    } catch (err) {
      console.warn('Supabase product save error:', err);
    }
  }
}

// Run init
initSupabase();
