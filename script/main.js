/* ==========================================================================
   GRY KJ - Mega Developer Suite v4.0 Ultra (Main Script)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initScrollProgress();
  initPerformanceMonitor();
  generatePalette();
});

/* --- 1. إدارة التنقل والصفحات --- */
function showPage(pageId, element) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));

  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  const links = document.querySelectorAll('.sidebar-link');
  links.forEach(link => link.classList.remove('active'));
  if (element) {
    element.classList.add('active');
  }

  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlayMenu');
  if (sidebar && sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMenu() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlayMenu');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
}

/* --- 2. التبويبات والشريط العلوي --- */
function gryShowTab(evt, tabId) {
  const tabContents = document.querySelectorAll('.gry-tab-content');
  tabContents.forEach(content => content.classList.remove('active'));

  const tabs = document.querySelectorAll('.gry-tab');
  tabs.forEach(tab => tab.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  evt.currentTarget.classList.add('active');
}

/* --- 3. الثيم والمؤثرات الصوتية --- */
const themes = ['theme-dark', 'theme-cyber', 'theme-matrix'];
let currentThemeIndex = 0;

function cycleTheme() {
  document.body.classList.remove(themes[currentThemeIndex]);
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  document.body.classList.add(themes[currentThemeIndex]);
  showToast(`تم تغيير الثيم إلى: ${themes[currentThemeIndex].replace('theme-', '')}`);
}

let soundEnabled = true;
function toggleSound() {
  soundEnabled = !soundEnabled;
  const icon = document.getElementById('soundIcon');
  if (soundEnabled) {
    icon.className = 'fas fa-volume-up';
    showToast('تم تفعيل الصوت');
  } else {
    icon.className = 'fas fa-volume-mute';
    showToast('تم كتم الصوت');
  }
}

/* --- 4. لوحة الأوامر المباشرة (CMD Palette) --- */
function toggleCommandPalette() {
  const cmdModal = document.getElementById('cmdModal');
  if (cmdModal.style.display === 'flex') {
    cmdModal.style.display = 'none';
  } else {
    cmdModal.style.display = 'flex';
    document.getElementById('cmdInput').focus();
  }
}

function handleCMD(event) {
  if (event.key === 'Enter') {
    const val = event.target.value.trim().toLowerCase();
    const validPages = ['home', 'projects', 'studio', 'ai-lab', 'cyber-tools', 'productivity', 'dev-analytics', 'utilities', 'about', 'contact'];
    
    if (validPages.includes(val)) {
      showPage(val);
      toggleCommandPalette();
      event.target.value = '';
    } else {
      showToast('أمر غير معروف، يرجى كتابة اسم قسم صحيح.');
    }
  }
}

/* --- 5. أدوات استوديو التطوير (Studio Tools) --- */
function formatJson() {
  const input = document.getElementById('formatterInput');
  try {
    const parsed = JSON.parse(input.value);
    input.value = JSON.stringify(parsed, null, 2);
    showToast('تم تنسيق الـ JSON بنجاح!');
  } catch (e) {
    showToast('خطأ: النص المدخل ليس JSON صالحاً.');
  }
}

function minifyJson() {
  const input = document.getElementById('formatterInput');
  try {
    const parsed = JSON.parse(input.value);
    input.value = JSON.stringify(parsed);
    showToast('تم ضغط الـ JSON بنجاح!');
  } catch (e) {
    showToast('خطأ: النص المدخل ليس JSON صالحاً.');
  }
}

function encodeBase64() {
  const input = document.getElementById('base64Input');
  input.value = btoa(unescape(encodeURIComponent(input.value)));
  showToast('تم التشفير إلى Base64');
}

function decodeBase64() {
  const input = document.getElementById('base64Input');
  try {
    input.value = decodeURIComponent(escape(atob(input.value)));
    showToast('تم فك التشفير بنجاح');
  } catch (e) {
    showToast('خطأ: الكود المدخل غير صالح لفك التشفير');
  }
}

async function generateHashes() {
  const input = document.getElementById('hashInput').value;
  if (!input) return showToast('يرجى إدخال نص أولاً');

  // SHA-256
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  document.getElementById('hashSHA256').innerText = hashHex;
  document.getElementById('hashMD5').innerText = 'Simulated-' + hashHex.substring(0, 16);
  showToast('تم توليد الهاش بنجاح');
}

function generatePassword() {
  const len = parseInt(document.getElementById('passLen').value);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
  let pass = '';
  for (let i = 0; i < len; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById('passOutput').value = pass;
  showToast('تم إنتاج كلمة المرور');
}

/* --- 6. مختبر الذكاء الاصطناعي (AI Lab) --- */
function generateAiPrompt() {
  const topic = document.getElementById('promptTopic').value || 'مشروع برمجي';
  const role = document.getElementById('promptRole').value;
  
  const prompt = `Act as an expert ${role}. Please provide a comprehensive analysis, architecture, and step-by-step code implementation for: "${topic}". Include clean code blocks and performance optimization tips.`;
  
  document.getElementById('promptOutput').value = prompt;
  showToast('تم توليد برومبت الذكاء الاصطناعي!');
}

function analyzeCodeSnippet() {
  const code = document.getElementById('codeAnalyzeInput').value;
  const resultDiv = document.getElementById('codeAnalyzeResult');
  
  if (!code.trim()) {
    resultDiv.innerText = 'يرجى إدخال كود للفحص.';
    return;
  }
  
  if (code.includes('eval(') || code.includes('var ')) {
    resultDiv.innerText = '⚠️ تحذير: تم الكشف عن ممارسات قديمة أو ثغرات استدعاء غير آمنة (eval / var).';
  } else {
    resultDiv.innerText = '✅ الكود يبدو نظيفاً ومتوافقاً مع المعايير حديثة!';
  }
}

/* --- 7. أدوات الأمن السيبراني (Cyber Tools) --- */
function simulatePortScan() {
  const ip = document.getElementById('targetIp').value;
  const result = document.getElementById('scanResult');
  if (!ip) return showToast('أدخل عنوان IP أو رابطاً');
  
  result.innerText = `جاري فحص الهدف ${ip}...`;
  setTimeout(() => {
    result.innerText = `النتائج لـ ${ip}:\n- Port 80 (HTTP): OPEN\n- Port 443 (HTTPS): OPEN\n- Port 22 (SSH): FILTERED`;
  }, 1200);
}

function runCaesar(encode) {
  const text = document.getElementById('caesarInput').value;
  let shift = parseInt(document.getElementById('caesarShift').value) || 0;
  if (!encode) shift = (26 - shift) % 26;
  
  const res = text.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode((c.charCodeAt(0) - base + shift) % 26 + base);
  });
  
  document.getElementById('caesarOutput').value = res;
}

/* --- 8. أدوات الإنتاجية والأدوات العامة --- */
function calculateEstimate() {
  const basePrice = parseInt(document.getElementById('calcType').value);
  const speed = document.getElementById('extSpeed').checked ? 50 : 0;
  const support = document.getElementById('extSupport').checked ? 100 : 0;
  
  const total = basePrice + speed + support;
  document.getElementById('calcPrice').innerText = `$${total}`;
}

let timerInterval = null;
let timerSeconds = 1500;

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      showToast('انتهى وقت التركيز!');
      return;
    }
    timerSeconds--;
    updateTimerDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  pauseTimer();
  timerSeconds = 1500;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const mins = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
  const secs = (timerSeconds % 60).toString().padStart(2, '0');
  document.getElementById('timerDisplay').innerText = `${mins}:${secs}`;
}

function addTodo() {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();
  if (!text) return;
  
  const ul = document.getElementById('todoList');
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.innerHTML = `<span>${text}</span> <button onclick="this.parentElement.remove()" style="background:none; border:none; color:var(--accent-pink); cursor:pointer;"><i class="fas fa-trash"></i></button>`;
  ul.appendChild(li);
  input.value = '';
}

function generatePalette() {
  const display = document.getElementById('colorPalette');
  if (!display) return;
  display.innerHTML = '';
  
  for (let i = 0; i < 5; i++) {
    const color = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    const box = document.createElement('div');
    box.style.backgroundColor = color;
    box.style.height = '40px';
    box.style.borderRadius = '6px';
    box.style.cursor = 'pointer';
    box.title = color;
    box.onclick = () => copyToClipboard(color, `تم نسخ اللون ${color}`);
    display.appendChild(box);
  }
}

function updateTextStats() {
  const text = document.getElementById('textStatsInput').value;
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const readTime = Math.ceil(words / 200 * 60);

  document.getElementById('statWords').innerText = words;
  document.getElementById('statChars').innerText = chars;
  document.getElementById('statTime').innerText = `${readTime}s`;
}

function encodeUrl() {
  const input = document.getElementById('urlInput');
  input.value = encodeURIComponent(input.value);
  showToast('تم تشفير الرابط');
}

function decodeUrl() {
  const input = document.getElementById('urlInput');
  try {
    input.value = decodeURIComponent(input.value);
    showToast('تم فك تشفير الرابط');
  } catch (e) {
    showToast('الرابط غير صالح لفك التشفير');
  }
}

function generateQR() {
  const val = document.getElementById('qrInput').value;
  const res = document.getElementById('qrResult');
  if (!val) return showToast('أدخل نصاً أولاً');
  
  res.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(val)}" alt="QR Code" style="margin-top:10px; border-radius:8px;">`;
}

/* --- 9. المساعد الذكي ووظائف المودال --- */
function openAiChat() {
  document.getElementById('aiModal').style.display = 'flex';
}

function closeAiChat() {
  document.getElementById('aiModal').style.display = 'none';
}

function handleChat(e) {
  if (e.key === 'Enter') {
    const input = document.getElementById('chatInput');
    const msg = input.value.trim();
    if (!msg) return;

    appendChatMsg('user', msg);
    input.value = '';

    setTimeout(() => {
      let botReply = 'شكراً لتواكلك مع المطور GRY KJ! يمكنك المتابعة عبر واتساب للمزيد من التفاصيل.';
      if (msg.includes('مهارات') || msg.includes('المهارات')) {
        botReply = 'يتقن GRY KJ تقنيات Node.js, React, Python, والذكاء الاصطناعي بالأضافة إلى أمن المعلومات.';
      } else if (msg.includes('توظيف') || msg.includes('سعر')) {
        botReply = 'يمكنك حجز استشارة أو بدء مشروع عبر قسم التواصل أو التواصل المباشر عبر واتساب.';
      }
      appendChatMsg('bot', botReply);
    }, 600);
  }
}

function sendQuickPrompt(promptText) {
  document.getElementById('chatInput').value = promptText;
  handleChat({ key: 'Enter' });
}

function appendChatMsg(sender, text) {
  const chatBody = document.getElementById('chatBody');
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg ${sender}`;
  msgDiv.innerText = text;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function openProjectModal(title, tech, desc) {
  document.getElementById('projModalTitle').innerText = title;
  document.getElementById('projModalTech').innerText = tech;
  document.getElementById('projModalDesc').innerText = desc;
  document.getElementById('projectModal').style.display = 'flex';
}

function closeProjectModal() {
  document.getElementById('projectModal').style.display = 'none';
}

function filterProjects(category, btn) {
  const btns = document.querySelectorAll('.tag-btn');
  btns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const cards = document.querySelectorAll('.proj-card');
  cards.forEach(card => {
    const tech = card.getAttribute('data-tech');
    if (category === 'all' || tech.includes(category)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function searchProjects() {
  const query = document.getElementById('projectSearch').value.toLowerCase();
  const cards = document.querySelectorAll('.proj-card');
  
  cards.forEach(card => {
    const title = card.querySelector('h4').innerText.toLowerCase();
    const desc = card.querySelector('p').innerText.toLowerCase();
    if (title.includes(query) || desc.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function likeProject(btn) {
  const span = btn.querySelector('span');
  let count = parseInt(span.innerText);
  count++;
  span.innerText = count;
  btn.querySelector('i').className = 'fas fa-heart';
  btn.querySelector('i').style.color = 'var(--accent-pink)';
  showToast('شكراً لتفاعلك!');
}

/* --- 10. الأدوات المساعدة وحركة الخفية --- */
function copyToClipboard(text, msg) {
  navigator.clipboard.writeText(text);
  showToast(msg || 'تم النسخ للحافظة!');
}

function gryOpenLink(url) {
  window.open(url, '_blank');
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

function handleFormSubmit(e) {
  e.preventDefault();
  showToast('تم إرسال رسالتك بنجاح! سأرد عليك قريبًا.');
  e.target.reset();
}

function initScrollProgress() {
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const bar = document.getElementById('scrollProgress');
    if (bar) bar.style.width = scrolled + '%';
  });
}

function initPerformanceMonitor() {
  setTimeout(() => {
    const mem = performance.memory ? (performance.memory.usedJSHeapSize / (1024 * 1024)).toFixed(1) : (Math.random() * 20 + 15).toFixed(1);
    const memEl = document.getElementById('memUsage');
    if (memEl) memEl.innerText = `${mem} MB`;

    const perf = performance.timing ? (performance.timing.domComplete - performance.timing.navigationStart) : 120;
    const loadEl = document.getElementById('loadTimeVal');
    if (loadEl) loadEl.innerText = `${perf > 0 ? perf : 145} ms`;
  }, 1000);
}

function measurePerformance() {
  initPerformanceMonitor();
  showToast('تم تحديث القياسات الحية');
}

/* خلفية الجسيمات التفاعلية Canvas */
function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 35;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(168, 85, 247, 0.4)';
    
    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(animate);
  }
  
  animate();
}
