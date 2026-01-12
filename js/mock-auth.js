// =======================
// Mock Auth System
// =======================

// تسجيل مستخدم جديد
export function registerUser(email, password) {
  if (!email || !password) {
    alert('Please enter both email and password!');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');

  // تحقق لو المستخدم موجود
  if (users.find(u => u.email === email)) {
    alert('This email is already registered!');
    return;
  }

  // إضافة مستخدم جديد
  users.push({ email, password });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registered successfully! Please login.');
}

// تسجيل الدخول
export function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert('Email or password incorrect!');
    return;
  }

  // حفظ بيانات المستخدم الحالي
  localStorage.setItem('user_id', email);
  localStorage.setItem('user_email', email);
  alert('Login successful!');
  location.href = 'dashboard.html';
}

// إذا تحب تستخدم كود مباشر مع أزرار HTML
window.registerUser = registerUser;
window.loginUser = loginUser;
