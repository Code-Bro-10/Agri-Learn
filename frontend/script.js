/* ===== AGRILEARN – MAIN SCRIPT ===== */

let currentLang = "en";

// ─── DARK MODE TOGGLE ────────────────────────────────────────────
function toggleTheme() {
  const isLight = document.body.classList.toggle('light-mode');
  localStorage.setItem('agrilearn-theme', isLight ? 'light' : 'dark');
  // Update icon on every toggle button on the page
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.textContent = isLight ? '☀️' : '🌙';
  });
}

// Fill prompt from suggested chips
window.fillPrompt = function(text) {
  const input = document.getElementById('userInput');
  if(!input) return;
  input.value = text;
  input.focus();
};

function applyStoredTheme() {
  const saved = localStorage.getItem('agrilearn-theme');
  if (saved === 'light') {
    document.body.classList.add('light-mode');
    document.querySelectorAll('.theme-toggle').forEach(btn => btn.textContent = '☀️');
  }
}

// ─── TOAST ─────────────────────────────────────────────────
let _toastTimer;
function showToast(msg, duration = 3000) {
  let toast = document.getElementById('agriToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'agriToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  clearTimeout(_toastTimer);
  // Force reflow so re-triggering animation works
  toast.classList.remove('show');
  void toast.offsetWidth;
  toast.classList.add('show');
  _toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
}

// ─── TRANSLATIONS ───────────────────────────────────────────────
const translations = {
  en: {
    heading:         "Learn Farming\nDigitally",
    subheading:      "Smart, modern farming techniques at your fingertips. AI-powered guidance, video lessons, and expert knowledge.",
    exploreCourses:  "Explore Courses",
    askAI:           "Ask AI Assistant",
    categoriesTitle: "What do you want to learn?",
    chatTitle:       "Ask the Farming Assistant 🌾",
    chatSubtitle:    "Powered by AI — ask anything about crops, soil, weather, or pest control",
    botStatus:       "Online & Ready",
    botName:         "AgriBot",
    placeholder:     "Type your farming question here…",
    sug1: "💧 Best irrigation methods?",
    sug2: "🐛 How to control pests?",
    sug3: "🌱 Improve soil quality?",
    sug4: "🌾 Best crops for summer?",
    emptyTitle: "Hi there! I'm AgriBot 🌾",
    emptySub:   "Ask me anything about farming — crops, soil, irrigation, pest control, and more.",
  },
  mr: {
    heading:         "शेती डिजिटली\nशिका",
    subheading:      "स्मार्ट शेतीसाठी तुमच्या हातात सर्वकाही. AI मार्गदर्शन, व्हिडिओ धडे आणि तज्ज्ञांचे ज्ञान.",
    exploreCourses:  "कोर्सेस पहा",
    askAI:           "AI ला विचारा",
    categoriesTitle: "तुम्हाला काय शिकायचे आहे?",
    chatTitle:       "शेती सहाय्यकाला विचारा 🌾",
    chatSubtitle:    "AI द्वारे संचालित — पिके, माती, हवामान किंवा कीड नियंत्रण याबद्दल काहीही विचारा",
    botStatus:       "ऑनलाइन आणि तयार",
    botName:         "AgriBot",
    placeholder:     "इथे तुमचा शेतीचा प्रश्न लिहा…",
    sug1: "💧 सर्वोत्तम सिंचन पद्धती?",
    sug2: "🐛 कीड कसे नियंत्रित करावे?",
    sug3: "🌱 मातीचा दर्जा कसा सुधारावा?",
    sug4: "🌾 उन्हाळ्यात कोणती पिके?",
    emptyTitle: "नमस्कार! मी AgriBot आहे 🌾",
    emptySub:   "शेतीबद्दल काहीही विचारा — पिके, माती, सिंचन, कीड नियंत्रण आणि बरेच काही.",
  },
  hi: {
    heading: "डिजिटल खेती\nसीखें",
    subheading: "स्मार्ट, आधुनिक खेती की तकनीकें आपकी उंगलियों पर। AI-संचालित मार्गदर्शन, वीडियो पाठ और विशेषज्ञ ज्ञान।",
    exploreCourses: "कोर्स खोजें",
    askAI: "AI सहायक से पूछें",
    categoriesTitle: "आप क्या सीखना चाहते हैं?",
    chatTitle: "खेती सहायक से पूछें 🌾",
    chatSubtitle: "AI द्वारा संचालित — फसलों, मिट्टी, मौसम या कीट नियंत्रण के बारे में कुछ भी पूछें",
    botStatus: "ऑनलाइन और तैयार",
    botName: "AgriBot",
    placeholder: "अपना खेती का प्रश्न यहाँ लिखें…",
    sug1: "💧 सर्वोत्तम सिंचाई विधियाँ?",
    sug2: "🐛 कीटों को कैसे नियंत्रित करें?",
    sug3: "🌱 मिट्टी की गुणवत्ता में सुधार?",
    sug4: "🌾 गर्मियों के लिए सर्वोत्तम फसलें?",
    emptyTitle: "नमस्ते! मैं AgriBot हूँ 🌾",
    emptySub: "खेती के बारे में कुछ भी पूछें — फसलें, मिट्टी, सिंचाई, कीट नियंत्रण और बहुत कुछ।",
  },
  ta: {
    heading: "டிஜிட்டல் விவசாயம்\nகற்கவும்",
    subheading: "ஸ்மார்ட், நவீன விவசாய நுட்பங்கள் உங்கள் விரல் நுனியில். AI-ஆல் இயங்கும் வழிகாட்டுதல், வீடியோ பாடங்கள் மற்றும் நிபுணர் அறிவு.",
    exploreCourses: "படிப்புகளை ஆராயுங்கள்",
    askAI: "AI உதவியாளரிடம் கேளுங்கள்",
    categoriesTitle: "நீங்கள் என்ன கற்றுக்கொள்ள விரும்புகிறீர்கள்?",
    chatTitle: "விவசாய உதவியாளரிடம் கேளுங்கள் 🌾",
    chatSubtitle: "AI மூலம் இயக்கப்படுகிறது — பயிர்கள், மண், வானிலை அல்லது பூச்சி கட்டுப்பாடு பற்றி எதையும் கேளுங்கள்",
    botStatus: "ஆன்லைனில் மற்றும் தயார்",
    botName: "AgriBot",
    placeholder: "உங்கள் விவசாய கேள்வியை இங்கே தட்டச்சு செய்யவும்…",
    sug1: "💧 சிறந்த நீர்ப்பாசன முறைகள்?",
    sug2: "🐛 பூச்சிகளை எவ்வாறு கட்டுப்படுத்துவது?",
    sug3: "🌱 மண்ணின் தரத்தை மேம்படுத்துவது எப்படி?",
    sug4: "🌾 கோடைகாலத்திற்கு சிறந்த பயிர்கள்?",
    emptyTitle: "வணக்கம்! நான் AgriBot 🌾",
    emptySub: "விவசாயத்தைப் பற்றி எதையும் கேளுங்கள் — பயிர்கள், மண், நீர்ப்பாசனம், பூச்சி கட்டுப்பாடு மற்றும் பல.",
  },
  te: {
    heading: "డిజిటల్ వ్యవసాయం\nనేర్చుకోండి",
    subheading: "స్మార్ట్, ఆధునిక వ్యవసాయ పద్ధతులు మీ వేలికొనలలో. AI-ఆధారిత మార్గదర్శకత్వం, వీడియో పాఠాలు మరియు నిపుణుల జ్ఞానం.",
    exploreCourses: "కోర్సులను అన్వేషించండి",
    askAI: "AI సహాయకుడిని అడగండి",
    categoriesTitle: "మీరు ఏమి నేర్చుకోవాలనుకుంటున్నారు?",
    chatTitle: "వ్యవసాయ సహాయకుడిని అడగండి 🌾",
    chatSubtitle: "AI ద్వారా నడపబడుతుంది — పంటలు, నేల, వాతావరణం లేదా తెగుళ్ల నియంత్రణ గురించి ఏదైనా అడగండి",
    botStatus: "ఆన్‌లైన్‌లో మరియు సిద్ధంగా ఉంది",
    botName: "AgriBot",
    placeholder: "మీ వ్యవసాయ ప్రశ్నను ఇక్కడ టైప్ చేయండి…",
    sug1: "💧 ఉత్తమ నీటిపారుదల పద్ధతులు?",
    sug2: "🐛 తెగుళ్లను ఎలా నియంత్రించాలి?",
    sug3: "🌱 నేల నాణ్యతను మెరుగుపరచడం ఎలా?",
    sug4: "🌾 వేసవికి ఉత్తమ పంటలు?",
    emptyTitle: "నమస్కారం! నేను AgriBot 🌾",
    emptySub: "వ్యవసాయం గురించి ఏదైనా అడగండి — పంటలు, నేల, నీటిపారుదల, తెగుళ్ల నియంత్రణ మరియు మరిన్ని.",
  }
};

// ─── HOME PAGE – LANGUAGE SWITCH ────────────────────────────────
function changeLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];

  const heading = document.getElementById("heading");
  if (heading) heading.innerHTML = t.heading.replace(/\n/g, "<br>");

  const subheading = document.getElementById("subheading");
  if (subheading) subheading.textContent = t.subheading;

  const exploreBtn = document.getElementById("exploreCourses");
  if (exploreBtn) exploreBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 3l14 9-14 9V3z"/></svg>
    ${t.exploreCourses}`;

  const aiBtn = document.getElementById("askAI");
  if (aiBtn) aiBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
    ${t.askAI}`;

  const catTitle = document.getElementById("categoriesTitle");
  if (catTitle) catTitle.textContent = t.categoriesTitle;
}

// ─── CHATBOT PAGE – LANGUAGE SWITCH ─────────────────────────────
function changeChatLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];

  // Sync both selects
  const selects = ["chatLangSelect", "globalLang"];
  selects.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = lang;
  });

  const chatTitle = document.getElementById("chatTitle");
  if (chatTitle) chatTitle.textContent = t.chatTitle;

  const chatSubtitle = document.getElementById("chatSubtitle");
  if (chatSubtitle) chatSubtitle.textContent = t.chatSubtitle;

  const botStatus = document.getElementById("botStatus");
  if (botStatus) botStatus.textContent = t.botStatus;

  const input = document.getElementById("userInput");
  if (input) input.placeholder = t.placeholder;

  // Update suggestion chips
  ["sug1","sug2","sug3","sug4"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = t[id];
  });

  // Update empty state if visible
  renderEmptyState();
}

// ─── EMPTY STATE ─────────────────────────────────────────────────
function renderEmptyState() {
  const chat = document.getElementById("chat-output");
  if (!chat || chat.children.length > 0) return;

  const t = translations[currentLang];
  const emptyEl = document.getElementById("emptyState");
  if (emptyEl) emptyEl.remove();

  const div = document.createElement("div");
  div.className = "empty-state";
  div.id = "emptyState";
  div.innerHTML = `
    <div class="empty-state-icon">🌾</div>
    <div class="empty-state-title">${t.emptyTitle}</div>
    <div class="empty-state-sub">${t.emptySub}</div>
  `;
  chat.appendChild(div);
}

// ─── SEND MESSAGE ────────────────────────────────────────────────
async function sendMessage() {
  const inputField = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");
  const message = inputField.value.trim();
  if (!message) return;

  // Remove empty state
  const emptyState = document.getElementById("emptyState");
  if (emptyState) emptyState.remove();

  // Hide suggestion chips after first message
  const suggestions = document.getElementById("suggestions");
  if (suggestions) suggestions.style.display = "none";

  // Show user bubble
  addMessage(message, "user");
  inputField.value = "";
  updateCharCount();
  inputField.style.height = "auto";

  // Disable send button while waiting
  if (sendBtn) sendBtn.disabled = true;

  // Show typing indicator
  showTyping();

  try {
    const payload = currentLang === "mr"
      ? `শেতীविषयी मराठीत उत्तर द्या: ${message}`
      : message;

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: payload }),
    });

    removeTyping();

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    addMessage(data.reply || "No response from AI", "bot");
  } catch (error) {
    removeTyping();
    addMessage(
      currentLang === "mr"
        ? "⚠️ सर्व्हर त्रुटी. कृपया बॅकएंड तपासा."
        : "⚠️ Server error. Please check the backend is running.",
      "bot",
      true
    );
  } finally {
    if (sendBtn) sendBtn.disabled = false;
    inputField.focus();
  }
}

// ─── ADD MESSAGE BUBBLE ────────────────────────────────────────────
function addMessage(text, sender, isError = false) {
  const chat = document.getElementById("chat-output");
  if (!chat) return;

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const wrapper = document.createElement("div");
  wrapper.className = `message ${sender}`;

  const avatarEl = document.createElement("div");
  avatarEl.className = "msg-avatar";
  avatarEl.setAttribute("aria-hidden", "true");
  avatarEl.textContent = sender === "bot" ? "🌾" : "👤";

  const contentEl = document.createElement("div");

  const bubble = document.createElement("div");
  bubble.className = "msg-bubble";
  if (isError) bubble.style.borderColor = "rgba(239,68,68,0.3)";

  // Render text with line breaks
  bubble.innerHTML = text.replace(/\n/g, "<br>");

  const timeEl = document.createElement("div");
  timeEl.className = "msg-time";
  timeEl.textContent = timeStr;

  contentEl.appendChild(bubble);
  contentEl.appendChild(timeEl);

  // Speak button for bot messages
  if (sender === 'bot' && !isError) {
    const speakBtn = document.createElement('button');
    speakBtn.className = 'speak-btn';
    speakBtn.textContent = '🔊 Read aloud';
    speakBtn.onclick = () => speakText(bubble.innerText);
    contentEl.appendChild(speakBtn);
    if (autoSpeak) setTimeout(() => speakText(bubble.innerText), 150);
  }

  wrapper.appendChild(avatarEl);
  wrapper.appendChild(contentEl);

  chat.appendChild(wrapper);
  chat.scrollTop = chat.scrollHeight;

  // Auto-save to localStorage (skip errors & typing indicator)
  if (!isError) saveChatHistory();
}

// ─── TYPING INDICATOR ────────────────────────────────────────────
function showTyping() {
  const chat = document.getElementById("chat-output");
  if (!chat) return;

  const wrapper = document.createElement("div");
  wrapper.className = "message bot";
  wrapper.id = "typingIndicator";

  const avatarEl = document.createElement("div");
  avatarEl.className = "msg-avatar";
  avatarEl.textContent = "🌾";

  const bubble = document.createElement("div");
  bubble.className = "msg-bubble";
  bubble.innerHTML = `
    <div class="typing-indicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>`;

  wrapper.appendChild(avatarEl);
  wrapper.appendChild(bubble);
  chat.appendChild(wrapper);
  chat.scrollTop = chat.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById("typingIndicator");
  if (el) el.remove();
}

// ─── CLEAR CHAT ─────────────────────────────────────────────────
function clearChat() {
  const chat = document.getElementById("chat-output");
  if (!chat) return;
  chat.innerHTML = "";
  localStorage.removeItem('agrilearn-chat');

  // Hide restore banner if open
  const banner = document.getElementById('restoreBanner');
  if (banner) banner.style.display = 'none';

  const suggestions = document.getElementById("suggestions");
  if (suggestions) suggestions.style.display = "flex";

  renderEmptyState();
  showToast('🗑️ Chat cleared');
}

// ─── QUICK SUGGESTIONS ───────────────────────────────────────────
function useSuggestion(chipEl) {
  const input = document.getElementById("userInput");
  if (!input) return;
  // Strip emoji prefix: take text after first space
  const text = chipEl.textContent.replace(/^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\s]+/u, "").trim();
  input.value = text;
  updateCharCount();
  input.focus();
}

// ─── KEYBOARD – ENTER TO SEND (Shift+Enter = newline) ────────────
function handleKeydown(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
  // Auto-resize textarea
  setTimeout(() => {
    event.target.style.height = "auto";
    event.target.style.height = Math.min(event.target.scrollHeight, 120) + "px";
  }, 0);
}

// ─── CHARACTER COUNT ─────────────────────────────────────────────
function updateCharCount() {
  const input = document.getElementById("userInput");
  const counter = document.getElementById("charCount");
  if (!input || !counter) return;
  const len = input.value.length;
  counter.textContent = `${len} / 500`;
  counter.style.color = len > 450 ? "#f87171" : "";
}

// ─── CHAT HISTORY (localStorage) ─────────────────────────────────
const CHAT_KEY = 'agrilearn-chat';
const MAX_STORED_MSGS = 60; // keep last 60 messages

function saveChatHistory() {
  const chat = document.getElementById('chat-output');
  if (!chat) return;
  const messages = [];
  chat.querySelectorAll('.message').forEach(wrapper => {
    const sender = wrapper.classList.contains('user') ? 'user' : 'bot';
    const text   = wrapper.querySelector('.msg-bubble')?.innerHTML || '';
    const time   = wrapper.querySelector('.msg-time')?.textContent  || '';
    messages.push({ sender, text, time });
  });
  // Store only the last MAX_STORED_MSGS messages to stay within quota
  const trimmed = messages.slice(-MAX_STORED_MSGS);
  try {
    localStorage.setItem(CHAT_KEY, JSON.stringify(trimmed));
  } catch (e) {
    // Quota exceeded — quietly ignore
  }
}

function loadChatHistory() {
  const raw = localStorage.getItem(CHAT_KEY);
  if (!raw) return;
  let messages;
  try { messages = JSON.parse(raw); } catch { return; }
  if (!messages || messages.length === 0) return;

  // Show restore banner
  const banner = document.getElementById('restoreBanner');
  if (banner) {
    banner.style.display = '';
    banner.classList.add('restore-banner');
    banner.innerHTML = `
      <span>💬 ${messages.length} message${messages.length !== 1 ? 's' : ''} from your last session</span>
      <div style="display:flex;gap:0.5rem;">
        <button class="restore-btn" onclick="restoreHistory()">Restore</button>
        <button class="dismiss-btn" onclick="dismissRestore()">Dismiss</button>
      </div>`;
  }
}

function restoreHistory() {
  const raw = localStorage.getItem(CHAT_KEY);
  if (!raw) return;
  let messages;
  try { messages = JSON.parse(raw); } catch { return; }

  const chat = document.getElementById('chat-output');
  if (!chat) return;

  // Remove empty state
  const emptyState = document.getElementById('emptyState');
  if (emptyState) emptyState.remove();

  // Hide suggestions
  const suggestions = document.getElementById('suggestions');
  if (suggestions) suggestions.style.display = 'none';

  // Rebuild messages from stored HTML
  messages.forEach(({ sender, text, time }) => {
    const avatarEl = document.createElement('div');
    avatarEl.className = 'msg-avatar';
    avatarEl.setAttribute('aria-hidden', 'true');
    avatarEl.textContent = sender === 'bot' ? '🌾' : '👤';

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = text;

    const timeEl = document.createElement('div');
    timeEl.className = 'msg-time';
    timeEl.textContent = time;

    const contentEl = document.createElement('div');
    contentEl.appendChild(bubble);
    contentEl.appendChild(timeEl);

    const wrapper = document.createElement('div');
    wrapper.className = `message ${sender}`;
    wrapper.appendChild(avatarEl);
    wrapper.appendChild(contentEl);
    chat.appendChild(wrapper);
  });

  chat.scrollTop = chat.scrollHeight;

  // Hide banner
  dismissRestore();
  showToast(`✅ Restored ${messages.length} message${messages.length !== 1 ? 's' : ''}`);
}

function dismissRestore() {
  const banner = document.getElementById('restoreBanner');
  if (banner) banner.style.display = 'none';
}

// ─── INIT ────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Apply saved theme first (before paint)
  applyStoredTheme();

  // Toggle Mobile Menu
  window.toggleMenu = function() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.toggle('active');
  };

  // Animate Stats
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target') || 0);
          if (target > 0 && !el.classList.contains('animated')) {
            el.classList.add('animated');
            let count = 0;
            const inc = Math.max(1, Math.floor(target / 40));
            const timer = setInterval(() => {
              count += inc;
              if (count >= target) {
                clearInterval(timer);
                el.innerText = target + (target > 1000 ? 'K+' : (target >= 25 ? '+' : ''));
              } else {
                el.innerText = count + (target > 1000 ? 'K+' : (target >= 25 ? '+' : ''));
              }
            }, 30);
          }
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach(stat => statObserver.observe(stat));
  };

  // Auth & Profile
  initAuthUI();
  updateProfileNav();

  // PWA
  initPWA();

  // Weather widget (homepage only)
  if (document.getElementById('weatherWidget')) fetchWeather();

  // Voice input (chatbot only)
  if (document.getElementById('micBtn')) initVoiceInput();

  // Render empty state for chatbot page
  const chatOutput = document.getElementById("chat-output");
  if (chatOutput) {
    renderEmptyState();
    // Check for saved chat history
    loadChatHistory();
  }

  // Animate cards on scroll (Intersection Observer)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".card, .feature-card, .video-card").forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s, border-color 0.3s, box-shadow 0.3s`;
    observer.observe(el);
  });

  // Auto-focus input on chatbot page
  const userInput = document.getElementById("userInput");
  if (userInput) {
    setTimeout(() => userInput.focus(), 300);
  }
});

// ─── VOICE INPUT ─────────────────────────────────────────────────
let recognition = null;
let isRecording = false;

function initVoiceInput() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return;
  recognition = new SR();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.onresult = e => {
    const t = Array.from(e.results).map(r => r[0].transcript).join('');
    const inp = document.getElementById('userInput');
    if (inp) { inp.value = t; updateCharCount(); }
  };
  recognition.onend = () => {
    isRecording = false; updateMicBtn(false);
    const inp = document.getElementById('userInput');
    if (inp && inp.value.trim()) sendMessage();
  };
  recognition.onerror = () => {
    isRecording = false; updateMicBtn(false);
    showToast('❌ Could not hear you. Try again.');
  };
}

function toggleVoice() {
  if (!recognition) { showToast('❌ Voice input not supported in this browser'); return; }
  if (isRecording) {
    recognition.stop();
  } else {
    recognition.lang = currentLang === 'mr' ? 'mr-IN' : 'en-IN';
    recognition.start(); isRecording = true; updateMicBtn(true);
    showToast('🎤 Listening… speak now');
  }
}

function updateMicBtn(rec) {
  const b = document.getElementById('micBtn');
  if (!b) return;
  b.classList.toggle('recording', rec);
  b.textContent = rec ? '⏹' : '🎤';
  b.title = rec ? 'Stop recording' : 'Voice input';
}

// ─── VOICE OUTPUT (TTS) ─────────────────────────────────────────────
let autoSpeak = false;

function speakText(text) {
  if (!window.speechSynthesis) { showToast('❌ TTS not supported in this browser'); return; }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = currentLang === 'mr' ? 'mr-IN' : 'en-IN';
  u.rate = 0.9;
  const voices = speechSynthesis.getVoices();
  const match = voices.find(v => v.lang.startsWith(currentLang === 'mr' ? 'mr' : 'en'));
  if (match) u.voice = match;
  speechSynthesis.speak(u);
}

function toggleAutoSpeak(checked) {
  autoSpeak = checked;
  showToast(autoSpeak ? '🔊 Auto-speak ON' : '🔇 Auto-speak OFF');
}

// ─── WEATHER WIDGET ─────────────────────────────────────────────────
// WMO Weather Codes for Open-Meteo
const WMO = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
  45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌧️', 55: '🌧️',
  61: '🌧️', 63: '🌧️', 65: '🌧️',
  71: '🌨️', 73: '🌨️', 75: '❄️',
  80: '🌧️', 81: '🌧️', 82: '⛈️',
  95: '⛈️', 96: '⛈️', 99: '⛈️'
};

async function fetchWeather() {
  const w = document.getElementById('weatherWidget');
  if (!w) return;
  try {
    // Open-Meteo API (Free, no rate limits, highly reliable)
    // Defaulting to central India (Nagpur)
    const url = "https://api.open-meteo.com/v1/forecast?latitude=21.1458&longitude=79.0882&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto";
    const r = await fetch(url);
    const d = await r.json();
    
    const curr = d.current;
    // Map WMO code to emoji
    const icon = WMO[curr.weather_code] || '🌤️';
    
    // Determine a simple description based on code
    let desc = "Clear";
    if(curr.weather_code >= 1 && curr.weather_code <= 3) desc = "Cloudy";
    if(curr.weather_code >= 45) desc = "Foggy";
    if(curr.weather_code >= 51) desc = "Rainy";
    if(curr.weather_code >= 71) desc = "Snow";
    if(curr.weather_code >= 95) desc = "Thunderstorm";

    w.innerHTML = `
      <div class="weather-icon">${icon}</div>
      <div class="weather-info">
        <div class="weather-temp">${Math.round(curr.temperature_2m)}°C
          <span style="font-size:0.8rem;font-weight:400;color:var(--text-secondary)">${desc}</span>
        </div>
        <div class="weather-location">📍 Belagavi, Karnataka</div>
      </div>
      <div class="weather-meta">
        <span>💧 ${curr.relative_humidity_2m}%</span>
        <span>💨 ${Math.round(curr.wind_speed_10m)} km/h</span>
      </div>`;
  } catch(e) {
    w.innerHTML = '<span class="weather-loading">🌤️ Weather unavailable</span>';
  }
}

// ─── USER AUTH / PROFILE ──────────────────────────────────────────────
const PROFILE_KEY = 'agrilearn-profile';
const AVATARS = ['👨‍🌾','👩‍🌾','🧑‍🌾','👴','👵','🧑','👦‍🌾','👧‍🌾'];

function initAuthUI() {
  if (document.getElementById('authModal')) return;
  const el = document.createElement('div');
  el.className = 'modal-overlay'; el.id = 'authModal';
  el.onclick = e => { if (e.target === el) closeAuth(); };
  el.innerHTML = `
    <div class="auth-modal">
      <div class="auth-modal-icon">🌱</div>
      <h3 id="authTitle">Welcome to AgriLearn</h3>
      <p id="authSub">Create your farmer profile for a personalized experience</p>
      <input class="auth-input" id="authName" placeholder="Your name (e.g. Ramesh Patil)" maxlength="40"/>
      <div class="avatar-label">Choose your avatar</div>
      <div class="avatar-picker">
        ${AVATARS.map((a, i) => `<button class="avatar-option${i===0?' selected':''}" onclick="pickAvatar(this,'${a}')" data-av="${a}">${a}</button>`).join('')}
      </div>
      <button class="btn btn-primary" style="width:100%" onclick="saveProfile()">Save Profile 🌱</button>
      <button class="auth-dismiss" onclick="closeAuth()">Maybe later</button>
    </div>`;
  document.body.appendChild(el);
}

function openAuth() {
  initAuthUI();
  const p = getProfile();
  if (p) {
    document.getElementById('authTitle').textContent = 'Edit Profile';
    document.getElementById('authSub').textContent = 'Update your name or avatar';
    document.getElementById('authName').value = p.name;
    document.querySelectorAll('.avatar-option').forEach(b => b.classList.toggle('selected', b.dataset.av === p.avatar));
  } else {
    if (document.getElementById('authName')) document.getElementById('authName').value = '';
  }
  document.getElementById('authModal').classList.add('open');
  setTimeout(() => document.getElementById('authName')?.focus(), 100);
}

function closeAuth() { document.getElementById('authModal')?.classList.remove('open'); }

function pickAvatar(el) {
  document.querySelectorAll('.avatar-option').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}

function saveProfile() {
  const name = document.getElementById('authName')?.value.trim();
  if (!name) { showToast('⚠️ Please enter your name'); return; }
  const av = document.querySelector('.avatar-option.selected')?.dataset.av || '👨‍🌾';
  localStorage.setItem(PROFILE_KEY, JSON.stringify({ name, avatar: av }));
  closeAuth();
  updateProfileNav();
  showToast(`✅ Welcome, ${name}! 🌱`);
}

function getProfile() {
  try { return JSON.parse(localStorage.getItem(PROFILE_KEY)); } catch { return null; }
}

function updateProfileNav() {
  document.querySelectorAll('#profileBtn').forEach(btn => {
    const p = getProfile();
    btn.innerHTML = p
      ? `<span>${p.avatar}</span><span class="profile-name">${p.name}</span>`
      : '<span>👤</span><span>Sign In</span>';
  });
}

// ─── PWA ──────────────────────────────────────────────────────────────────
let deferredPWA = null;

function initPWA() {
  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
  // Create install banner DOM
  if (!document.getElementById('pwaBanner')) {
    const b = document.createElement('div');
    b.className = 'pwa-banner'; b.id = 'pwaBanner';
    b.innerHTML = `
      <div class="pwa-banner-text">
        <strong>📲 Install AgriLearn</strong>
        <small>Use offline, anytime on your phone</small>
      </div>
      <div class="pwa-banner-btns">
        <button class="btn btn-primary" style="font-size:0.78rem;padding:0.35rem 0.8rem" onclick="installPWA()">Install</button>
        <button class="btn btn-ghost" style="font-size:0.78rem;padding:0.35rem 0.8rem" onclick="dismissPWA()">✕</button>
      </div>`;
    document.body.appendChild(b);
  }
  // Listen for install prompt
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault(); deferredPWA = e;
    if (!sessionStorage.getItem('pwa-dismissed')) {
      setTimeout(() => document.getElementById('pwaBanner')?.classList.add('show'), 3000);
    }
  });
}

function installPWA() {
  if (!deferredPWA) return;
  deferredPWA.prompt();
  deferredPWA.userChoice.then(r => {
    if (r.outcome === 'accepted') showToast('✅ AgriLearn installed successfully!');
    deferredPWA = null; dismissPWA();
  });
}

function dismissPWA() {
  document.getElementById('pwaBanner')?.classList.remove('show');
  sessionStorage.setItem('pwa-dismissed', '1');
}
