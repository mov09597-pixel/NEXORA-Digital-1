// =======================
// Demo User Setup
// =======================
if (!localStorage.getItem('user_id')) {
  localStorage.setItem('user_id', 'demo_user'); // ID تجريبي
}

// =======================
// Helper Functions
// =======================
function getOrders() {
  return JSON.parse(localStorage.getItem('orders') || '[]');
}

function saveOrders(orders) {
  localStorage.setItem('orders', JSON.stringify(orders));
}

function getWallet() {
  return Number(localStorage.getItem('wallet_balance') || 0);
}

function setWallet(amount) {
  localStorage.setItem('wallet_balance', amount);
  document.getElementById('wallet_balance').textContent = amount;
}

function getOwnerWallet() {
  return Number(localStorage.getItem('owner_wallet_balance') || 0);
}

function setOwnerWallet(amount) {
  localStorage.setItem('owner_wallet_balance', amount);
  document.getElementById('owner_wallet').textContent = amount;
}

// =======================
// Create Order + Bots
// =======================
export function createOrder() {
  const user_id = localStorage.getItem('user_id');
  if (!user_id) { alert('Please login first!'); return; }

  const project_name = document.getElementById('project_name').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  const price = Number(document.getElementById('price').value) || 0;

  if (!project_name || !description || !category || price <= 0) {
    alert('Please fill all fields with valid values!');
    return;
  }

  const orders = getOrders();
  const order = {
    id: Date.now(),
    user_id,
    project_name,
    description,
    category,
    price,
    status: 'pending'
  };

  orders.unshift(order);
  saveOrders(orders);

  // تحديث المحفظة الخاصة بالعميل
  setWallet(getWallet() + price);

  // تحديث المحفظة الخاصة بالمالك
  setOwnerWallet(getOwnerWallet() + price);

  alert('Order submitted! Wallet updated + Bot is processing...');
  displayOrders();

  // تشغيل البوتات
  designBot(order);
  websiteBot(order);
}

// =======================
// Display Orders
// =======================
export function displayOrders() {
  const user_id = localStorage.getItem('user_id');
  const orders = getOrders().filter(o => o.user_id === user_id);
  const ul = document.getElementById('order_list');
  ul.innerHTML = '';

  orders.forEach(o => {
    const li = document.createElement('li');
    li.textContent = `${o.project_name} - ${o.category} - $${o.price} - ${o.status}`;
    if(o.designLink) li.innerHTML += ` - <a href="${o.designLink}" target="_blank">Design</a>`;
    if(o.websiteLink) li.innerHTML += ` - <a href="${o.websiteLink}" target="_blank">Website</a>`;
    ul.appendChild(li);
  });
}

// =======================
// Design Bot
// =======================
function designBot(order) {
  console.log(`🤖 Bot: Creating design for "${order.project_name}"...`);
  setTimeout(() => {
    console.log(`✅ Design ready for "${order.project_name}"`);
    order.designLink = `https://example.com/designs/${order.id}`;
    saveOrders(getOrders());
    displayOrders();
  }, 5000);
}

// =======================
// Website Bot
// =======================
function websiteBot(order) {
  console.log(`🤖 Bot: Building website for "${order.project_name}"...`);
  setTimeout(() => {
    console.log(`✅ Website ready for "${order.project_name}"`);
    order.websiteLink = `https://example.com/websites/${order.id}`;
    order.status = 'completed';
    saveOrders(getOrders());
    displayOrders();
  }, 8000);
}

// =======================
// Initialize Page
// =======================
displayOrders();
setWallet(getWallet());
setOwnerWallet(getOwnerWallet());

// Make global for buttons
window.createOrder = createOrder;
window.displayOrders = displayOrders;
