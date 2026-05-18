/* ══════════════════════════════════════════════════════
   AYUSHI SHIVHARE PORTFOLIO — script.js
   ══════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────
   1. CUSTOM CURSOR
───────────────────────────────────────── */
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

// Smooth trailing ring
(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
})();

// Cursor grow on hover
document.querySelectorAll('a, button, .chip, .skill-pill, .bento-card, .project-card, .nav-cta').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// Hide cursor dot when leaving window
document.addEventListener('mouseleave', () => {
  cursorDot.style.opacity  = '0';
  cursorRing.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursorDot.style.opacity  = '1';
  cursorRing.style.opacity = '0.4';
});


/* ─────────────────────────────────────────
   2. NAV — scroll state + hamburger
───────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});


/* ─────────────────────────────────────────
   3. SCROLL REVEAL (IntersectionObserver)
───────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));


/* ─────────────────────────────────────────
   4. TYPEWRITER EFFECT
───────────────────────────────────────── */
const roles = [
  'Frontend Developer',
  'React Specialist',
  'Open Source Contributor',
  'National Volleyball Player 🏐',
];
const typeEl = document.getElementById('typewriter-text');
let roleIdx = 0, charIdx = 0, isDeleting = false;

function typeWriter() {
  const current = roles[roleIdx];
  if (isDeleting) {
    typeEl.textContent = current.slice(0, charIdx--);
  } else {
    typeEl.textContent = current.slice(0, charIdx++);
  }

  let delay = isDeleting ? 55 : 90;

  if (!isDeleting && charIdx > current.length) {
    isDeleting = true;
    delay = 1600; // pause at end
  } else if (isDeleting && charIdx < 0) {
    isDeleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    delay = 300;
  }

  setTimeout(typeWriter, delay);
}
setTimeout(typeWriter, 900);


/* ─────────────────────────────────────────
   5. MAGNETIC BUTTONS
───────────────────────────────────────── */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) * 0.28;
    const dy = (e.clientY - cy) * 0.28;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.transition = 'transform .4s cubic-bezier(.4,0,.2,1)';
    setTimeout(() => { btn.style.transition = ''; }, 400);
  });
});


/* ─────────────────────────────────────────
   6. 3D TILT ON PROJECT CARDS
───────────────────────────────────────── */
const MAX_TILT = 8; // degrees

document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect  = card.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const rotX  =  ((e.clientY - cy) / (rect.height / 2)) * -MAX_TILT;
    const rotY  =  ((e.clientX - cx) / (rect.width  / 2)) *  MAX_TILT;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;
    card.style.boxShadow = `${-rotY * 1.5}px ${rotX * 1.5}px 40px rgba(99,102,241,0.18)`;
    card.style.transition = 'box-shadow .1s';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform  = '';
    card.style.boxShadow  = '';
    card.style.transition = 'transform .5s cubic-bezier(.4,0,.2,1), box-shadow .5s';
  });
});


/* ─────────────────────────────────────────
   7. PROJECT CARD EXPAND / COLLAPSE
───────────────────────────────────────── */
document.querySelectorAll('.pc-expand-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const details = btn.nextElementSibling;
    const isOpen  = details.classList.contains('open');
    // Close all others
    document.querySelectorAll('.pc-details.open').forEach(d => {
      d.classList.remove('open');
      d.previousElementSibling.classList.remove('open');
    });
    if (!isOpen) {
      details.classList.add('open');
      btn.classList.add('open');
    }
  });
});


/* ─────────────────────────────────────────
   8. TIMELINE LINE DRAW ON SCROLL
───────────────────────────────────────── */
const timelineLine = document.getElementById('timelineLine');
if (timelineLine) {
  const tlObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        timelineLine.classList.add('animated');
        tlObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  tlObserver.observe(timelineLine.closest('.timeline'));
}


/* ─────────────────────────────────────────
   9. AI CHATBOT — Claude API
───────────────────────────────────────── */
const chatMessages = document.getElementById('chatMessages');
const chatInput    = document.getElementById('chatInput');
const chatSend     = document.getElementById('chatSend');
const chatChips    = document.getElementById('chatChips');

const SYSTEM_PROMPT = `You are Ayushi Shivhare's portfolio assistant. Answer questions about her skills (React, TypeScript, Tailwind CSS, Vite, React Query, JavaScript ES6+), projects (Smart Resume Analyzer — AI career platform with 90+ Lighthouse score; FinSight — finance analytics dashboard with Recharts; Exam Buddy — RGPV exam resource hub with OpenAI chatbot for 1000+ students), experience (TechnoHacks EduTech web developer internship Dec 2025–Jan 2026, 4 merged PRs), and background (B.Tech CSE at Adina Institute 2024–2028, national volleyball player, open source contributor). Keep answers short (2-4 sentences), friendly, and confident. If asked about availability, say she is open to internships, freelance projects, and full-time opportunities. If asked something unrelated, redirect to her professional profile with charm.`;

const conversationHistory = [];

function appendMessage(role, text) {
  const msgEl = document.createElement('div');
  msgEl.className = `chat-msg ${role}`;
  msgEl.innerHTML = `<div class="msg-bubble">${escapeHTML(text)}</div>`;
  chatMessages.appendChild(msgEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return msgEl;
}

function appendTypingIndicator() {
  const el = document.createElement('div');
  el.className = 'chat-msg assistant';
  el.id = 'typing-indicator';
  el.innerHTML = `<div class="msg-bubble typing-dots"><span></span><span></span><span></span></div>`;
  chatMessages.appendChild(el);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
  const el = document.getElementById('typing-indicator');
  if (el) el.remove();
}

function escapeHTML(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

async function sendMessage(question) {
  const text = question || chatInput.value.trim();
  if (!text) return;
  chatInput.value = '';
  chatSend.disabled = true;

  // Hide chips after first use
  chatChips.style.display = 'none';

  appendMessage('user', text);
  conversationHistory.push({ role: 'user', content: text });

  appendTypingIndicator();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: conversationHistory,
      }),
    });

    const data = await response.json();
    removeTypingIndicator();

    let reply = '';
    if (data.content && data.content.length > 0) {
      reply = data.content.map(b => b.type === 'text' ? b.text : '').join('');
    } else if (data.error) {
      reply = `Sorry, I ran into an issue: ${data.error.message || 'Unknown error'}. Try again!`;
    } else {
      reply = "Hmm, I didn't get a proper response. Please try again!";
    }

    conversationHistory.push({ role: 'assistant', content: reply });
    appendMessage('assistant', reply);
  } catch (err) {
    removeTypingIndicator();
    const errMsg = "I couldn't connect to the AI right now. Please make sure the API is configured, or try again shortly!";
    appendMessage('assistant', errMsg);
    console.error('Chat API error:', err);
  }

  chatSend.disabled = false;
  chatInput.focus();
}

chatSend.addEventListener('click', () => sendMessage());
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});

chatChips.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => sendMessage(chip.dataset.q));
});


/* ─────────────────────────────────────────
   10. SMOOTH ACTIVE NAV HIGHLIGHT
───────────────────────────────────────── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));

// Active nav style
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--indigo); } .nav-links a.active::after { width: 100%; }`;
document.head.appendChild(style);


/* ─────────────────────────────────────────
   11. PAGE LOAD STAGGER (already handled
       by CSS delay classes + reveal-up,
       but trigger hero immediately)
───────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  // Trigger hero reveals immediately (no scroll needed)
  document.querySelectorAll('#hero .reveal-up').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 120 + 200);
  });
});


/* ─────────────────────────────────────────
   12. SUBTLE PARALLAX ON BLOBS
───────────────────────────────────────── */
document.addEventListener('mousemove', (e) => {
  const blobs = document.querySelectorAll('.blob');
  const px = (e.clientX / window.innerWidth  - 0.5) * 2;
  const py = (e.clientY / window.innerHeight - 0.5) * 2;
  blobs.forEach((blob, i) => {
    const factor = (i + 1) * 8;
    blob.style.transform = `translate(${px * factor}px, ${py * factor}px)`;
  });
});
