/* ============================================================
   core.js — 状态、路由、银行、答题、弹窗、粒子
   ============================================================ */

const GOAL = 100000;                 // 100,000 亿 = 10 万亿
const SAVE_KEY = 'coral-lab-v1';

const State = {
  money: 0,
  eggs: {},
  modules: {},
  quizzes: {},
  finalSeen: false
};

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ---------------- 存档 ---------------- */
function saveState() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(State)); } catch (e) {}
}
function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) Object.assign(State, JSON.parse(raw));
  } catch (e) {}
}

/* ---------------- 数字 ---------------- */
function fmt(n) {
  return Math.round(n).toLocaleString('en-US');
}
function unit(n) {
  if (n >= 10000) return (n / 10000).toFixed(n % 10000 === 0 ? 0 : 1) + '万亿';
  return fmt(n) + '亿';
}

/* ---------------- HUD ---------------- */
function renderHud() {
  const money = $('#moneyText');
  if (money) money.textContent = fmt(State.money);
  const bar = $('#moneyBar');
  if (bar) bar.style.width = Math.min(100, State.money / GOAL * 100) + '%';
  const dex = $('#dexCount');
  if (dex) dex.textContent = Object.keys(State.eggs).length;
  const eggs = $('#eggCount');
  if (eggs) eggs.textContent = Object.keys(State.eggs).length;
  const ex = $('#exploreCount');
  if (ex) ex.textContent = Object.keys(State.modules).filter(k => State.modules[k]).length;

  $$('.module-card[data-module]').forEach(card => {
    const done = !!State.modules[card.dataset.module];
    card.classList.toggle('done', done);
    const st = card.querySelector('.mc-state');
    if (st) st.textContent = done ? '✓ 已探索' : '未探索';
  });
}

function floatMoney(n) {
  const anchor = $('.bank');
  if (!anchor) return;
  const r = anchor.getBoundingClientRect();
  const el = document.createElement('div');
  el.className = 'float-money';
  el.textContent = (n > 0 ? '+' : '') + fmt(n) + '亿';
  el.style.left = (r.left + 12) + 'px';
  el.style.top = (r.bottom + 2) + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1300);
}

function addMoney(n, silent) {
  if (!n) return;
  State.money = Math.max(0, State.money + n);
  saveState();
  renderHud();
  if (!silent) floatMoney(n);
  if (State.money >= GOAL && !State.finalSeen) {
    State.finalSeen = true;
    saveState();
    setTimeout(showFinal, 1100);
  }
}

/* ---------------- 提示 ---------------- */
function toast(msg, ms = 2400) {
  const box = $('#toasts');
  if (!box) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = msg;
  box.appendChild(el);
  while (box.children.length > 3) box.firstChild.remove();
  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 320);
  }, ms);
}

/* ---------------- 弹窗 ---------------- */
function openModal(html, opts = {}) {
  const card = $('#modalCard');
  if (!card) return;
  card.className = 'modal-card' + (opts.wide ? ' wide' : '');
  card.innerHTML = '<button class="modal-close" data-close aria-label="关闭">×</button>' + html;
  $('#modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  card.scrollTop = 0;
}
function closeModal() {
  $('#modal').classList.remove('open');
  document.body.style.overflow = '';
}

/* ---------------- 发现 / 彩蛋 ---------------- */
function discover(id, name, desc, reward = 100) {
  if (State.eggs[id]) return false;
  State.eggs[id] = { name, desc };
  saveState();
  addMoney(reward);
  renderHud();
  showEggCard(name, desc, reward);
  return true;
}

/* 彩蛋卡：触发即弹到屏幕上，不藏进档案 */
function showEggCard(name, desc, reward) {
  let host = document.getElementById('eggCardHost');
  if (!host) {
    host = document.createElement('div');
    host.id = 'eggCardHost';
    host.className = 'egg-card-host';
    document.body.appendChild(host);
  }
  const card = document.createElement('div');
  card.className = 'egg-card';
  card.innerHTML = `
    <div class="egg-card-head">
      <span class="egg-tag">🏅 新发现</span>
      <span class="egg-reward">+${fmt(reward)}亿</span>
    </div>
    <h4>${name}</h4>
    <p>${desc}</p>
    <div class="egg-card-foot">
      <button class="egg-ok">收下</button>
      <button class="egg-dex">放进档案</button>
    </div>`;
  host.appendChild(card);
  requestAnimationFrame(() => card.classList.add('in'));
  setTimeout(() => card.classList.add('in'), 40);

  const close = () => {
    card.classList.remove('in');
    card.classList.add('out');
    setTimeout(() => card.remove(), 380);
  };
  card.querySelector('.egg-ok').addEventListener('click', close);
  card.querySelector('.egg-dex').addEventListener('click', () => { close(); openDex(); });
  const timer = setTimeout(close, 9000);
  card.addEventListener('mouseenter', () => clearTimeout(timer));
  while (host.children.length > 3) host.firstChild.remove();
}

function openDex() {
  const all = Object.values(State.eggs);
  const list = all.length
    ? all.map(e => `<div class="card" style="padding:14px 16px">
        <h4 style="font-size:13px;margin-bottom:4px">🏅 ${e.name}</h4>
        <p style="font-size:12px;line-height:1.7">${e.desc}</p>
      </div>`).join('')
    : '<p class="muted small">还没有发现彩蛋。多点点、多调调，实验室里藏着不少惊喜。</p>';
  openModal(`
    <p class="kicker">探索档案</p>
    <h2>已发现 ${all.length} 个彩蛋</h2>
    <p style="margin-bottom:18px">每个板块都有隐藏彩蛋，找到就会自动记录。</p>
    <div style="display:grid;gap:8px">${list}</div>
    <div class="modal-actions"><button class="btn primary" data-close>继续探索</button></div>
  `);
}

/* ---------------- 路由 ---------------- */
let currentModule = null;

function showScreen(name) {
  $$('.screen').forEach(s => s.classList.toggle('active', s.id === 'screen-' + name));
  const hud = $('#hud');
  if (hud) hud.classList.toggle('hidden', name === 'intro' || name === 'final');
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

function goHome() {
  closeModal();
  currentModule = null;
  renderHome();
  renderHud();
  showScreen('home');
}

function openModule(id) {
  const mod = MODULES[id];
  if (!mod) return;
  closeModal();
  currentModule = id;
  $('#modKicker').textContent = mod.kicker || '';
  $('#modTitle').textContent = mod.title || '';
  const body = $('#moduleBody');
  body.innerHTML = mod.render();
  showScreen('module');
  renderHud();
  if (typeof mod.init === 'function') mod.init(body);
}

function renderHome() {
  const grid = $('#homeGrid');
  if (!grid) return;
  const order = ['lab', 'bundle', 'egg', 'map', 'journey', 'depth', 'moon', 'sunscreen'];
  grid.innerHTML = order.map((id, i) => {
    const m = MODULES[id];
    const done = !!State.modules[id];
    return `<button class="module-card ${id === 'lab' ? 'main' : ''} ${done ? 'done' : ''}" data-module="${id}">
      <span class="mc-icon">${m.icon}</span>
      <h3>${m.title}</h3>
      <p>${m.desc}</p>
      <span class="mc-tag">${id === 'lab' ? '主实验' : '板块 ' + i}</span>
      <span class="mc-state">${done ? '✓ 已探索' : '未探索'}</span>
    </button>`;
  }).join('');
}

function markDone(id) {
  if (State.modules[id]) return;
  State.modules[id] = true;
  saveState();
  renderHud();
  toast('✅ 板块探索完成：' + MODULES[id].title);
}

/* ---------------- 答题引擎 ---------------- */
function openQuiz(modId) {
  const data = QUIZZES[modId];
  if (!data) return;
  const rewards = QUIZ_REWARDS[modId];
  const meta = [
    ['easy', '🟢', '简单', data.easy.length],
    ['medium', '🟡', '中等', data.medium.length],
    ['hard', '🔴', '困难', data.hard.length]
  ];
  const rows = meta.map(([k, ico, name, n]) => {
    const done = !!State.quizzes[modId + ':' + k];
    return `<button class="level ${done ? 'done' : ''}" data-level="${k}">
      <span class="lv-ico">${ico}</span>
      <span class="lv-main"><b>${name}</b><span>${n} 题 · 全部答对才拿奖励</span></span>
      <span class="lv-reward">${fmt(rewards[k])}亿</span>
    </button>`;
  }).join('');

  openModal(`
    <p class="kicker">${MODULES[modId].title}</p>
    <h2>选择难度</h2>
    <p>答对全部题目就能把精卵束存进银行。答错可以重来，但奖励只发一次。</p>
    <div class="level-list">${rows}</div>
    <div class="modal-actions"><button class="btn ghost" data-close>下次再说</button></div>
  `);

  $$('.level', $('#modalCard')).forEach(btn => {
    btn.addEventListener('click', () => startQuiz(modId, btn.dataset.level));
  });
}

function startQuiz(modId, level) {
  const list = QUIZZES[modId][level];
  const reward = QUIZ_REWARDS[modId][level];
  const storeKey = modId + ':' + level;
  const already = !!State.quizzes[storeKey];
  const picks = list.map(() => []);
  let i = 0;
  let perfect = true;
  let phase = 'answer';

  function draw() {
    phase = 'answer';
    const q = list[i];
    const opts = q.options.map((o, k) =>
      `<button class="opt" data-k="${k}"><span class="opt-mark"></span><span>${o}</span></button>`
    ).join('');
    openModal(`
      <div class="quiz">
        <div class="quiz-top">
          <span>${q.multi ? '多选题' : '单选题'}</span>
          <span>第 ${i + 1} / ${list.length} 题</span>
        </div>
        <h3 class="quiz-q">${q.q}</h3>
        <div class="opts">${opts}</div>
        <div class="quiz-foot">
          <span class="quiz-hint">${q.multi ? '选出所有正确选项' : '选一个答案'}</span>
          <button class="btn primary" id="qSubmit" disabled>提交</button>
        </div>
        <div class="quiz-fb" id="qFb"></div>
      </div>
    `);

    const optEls = $$('.opt', $('#modalCard'));
    optEls.forEach(btn => {
      btn.addEventListener('click', () => {
        if (phase !== 'answer') return;
        const k = Number(btn.dataset.k);
        if (q.multi) {
          btn.classList.toggle('sel');
          const at = picks[i].indexOf(k);
          if (at >= 0) picks[i].splice(at, 1); else picks[i].push(k);
        } else {
          optEls.forEach(b => b.classList.remove('sel'));
          btn.classList.add('sel');
          picks[i] = [k];
        }
        $('#qSubmit').disabled = picks[i].length === 0;
      });
    });
    $('#qSubmit').addEventListener('click', submit);
  }

  function submit() {
    if (phase !== 'answer') return;
    const q = list[i];
    const chosen = picks[i].slice().sort((a, b) => a - b);
    const right = q.answer.slice().sort((a, b) => a - b);
    const ok = chosen.join(',') === right.join(',');
    if (!ok) perfect = false;
    phase = 'next';

    $$('.opt', $('#modalCard')).forEach(b => {
      const k = Number(b.dataset.k);
      b.classList.add('locked');
      if (right.includes(k)) b.classList.add('correct');
      else if (chosen.includes(k)) b.classList.add('wrong');
      if (k === q.answer[0] && !q.multi) b.classList.add('correct');
    });

    const fb = $('#qFb');
    fb.className = 'quiz-fb show ' + (ok ? 'ok' : 'no');
    fb.innerHTML = `<b>${ok ? '答对了！' : '再看一眼'}</b> · ${q.why}`;

    const btn = $('#qSubmit');
    btn.disabled = false;
    btn.textContent = i < list.length - 1 ? '下一题 →' : '看结果 →';
    btn.addEventListener('click', () => {
      if (phase !== 'next') return;
      if (i < list.length - 1) { i++; draw(); }
      else finish();
    }, { once: true });
  }

  function finish() {
    const got = perfect && !already;
    if (got) {
      State.quizzes[storeKey] = true;
      saveState();
      addMoney(reward);
    }
    openModal(`
      <div style="text-align:center;padding:8px 0">
        <div style="font-size:46px;margin-bottom:12px">${perfect ? '🎉' : '📘'}</div>
        <h2>${perfect ? '全部答对！' : '答完了'}</h2>
        <p style="max-width:38ch;margin:8px auto 0">
          ${perfect
            ? (got ? `这组题的精卵束已存入银行：<b style="color:#ffd166">+${fmt(reward)}亿</b>` : '这组题你已经拿过奖励了，再练一遍也很棒。')
            : '有几道题没答对，可以再挑战一次。'}
        </p>
        <div class="modal-actions" style="justify-content:center">
          <button class="btn primary" data-close>继续探索</button>
          ${perfect ? '' : `<button class="btn" id="retry">再挑战</button>`}
        </div>
      </div>
    `);
    const retry = $('#retry');
    if (retry) retry.addEventListener('click', () => startQuiz(modId, level));
  }

  draw();
}

/* ---------------- 粒子 ---------------- */
const FX = (() => {
  const canvas = $('#fx');
  const ctx = canvas.getContext('2d');
  let parts = [];
  let raf = null;
  let stormEnd = 0;
  let lastEmit = 0;
  let dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  function tick(t) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    if (t < stormEnd && t - lastEmit > 18) {
      lastEmit = t;
      for (let k = 0; k < 4; k++) {
        parts.push({
          x: Math.random() * innerWidth,
          y: innerHeight + 10,
          r: 1.5 + Math.random() * 3.6,
          vy: -(0.9 + Math.random() * 2.4),
          vx: (Math.random() - .5) * 0.55,
          a: 0.25 + Math.random() * 0.7,
          hue: Math.random() < .82 ? 'pink' : 'gold',
          sway: Math.random() * Math.PI * 2
        });
      }
    }

    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.x += p.vx + Math.sin((t / 900) + p.sway) * 0.35;
      p.y += p.vy;
      p.a *= 0.997;
      if (p.y < -20) { parts.splice(i, 1); continue; }
      ctx.beginPath();
      ctx.globalAlpha = Math.max(0, p.a);
      ctx.fillStyle = p.hue === 'gold' ? '#ffd166' : '#ff9db1';
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    if (parts.length || t < stormEnd) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = null;
    }
  }

  function start() {
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function burst(x, y, n = 24, color = 'pink') {
    for (let i = 0; i < n; i++) {
      parts.push({
        x, y,
        r: 1.5 + Math.random() * 3,
        vy: -(1 + Math.random() * 3),
        vx: (Math.random() - .5) * 2.6,
        a: .9,
        hue: color,
        sway: Math.random() * 6
      });
    }
    start();
  }

  function storm(ms = 9000) {
    stormEnd = performance.now() + ms;
    start();
  }

  return { burst, storm, resize };
})();

/* ---------------- 全局事件 ---------------- */
function bindGlobal() {
  $('#btnHome').addEventListener('click', goHome);
  $('#btnDex').addEventListener('click', openDex);
  $('#btnReset').addEventListener('click', () => {
    openModal(`
      <h2>重置进度？</h2>
      <p>已收集的精卵束、彩蛋和答题记录都会被清空，这个操作不能撤销。</p>
      <div class="modal-actions">
        <button class="btn" data-close>算了</button>
        <button class="btn primary" id="doReset">确认重置</button>
      </div>
    `);
    $('#doReset').addEventListener('click', () => {
      localStorage.removeItem(SAVE_KEY);
      location.reload();
    });
  });

  document.addEventListener('click', e => {
    const mod = e.target.closest('[data-module]');
    if (mod) { openModule(mod.dataset.module); return; }
    const quiz = e.target.closest('[data-quiz]');
    if (quiz) { openQuiz(quiz.dataset.quiz); return; }
    const home = e.target.closest('[data-home]');
    if (home) { goHome(); return; }
    const close = e.target.closest('[data-close]');
    if (close) { closeModal(); return; }
    if (e.target.id === 'modal') closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ---------------- 背景气泡 ---------------- */
function initBubbles() {
  const box = $('#bubbles');
  if (!box) return;
  let html = '';
  for (let i = 0; i < 20; i++) {
    const size = 3 + Math.random() * 9;
    html += `<i style="left:${Math.random() * 100}%;width:${size}px;height:${size}px;
      animation-duration:${14 + Math.random() * 20}s;animation-delay:${-Math.random() * 30}s;
      --dx:${(Math.random() - .5) * 90}px"></i>`;
  }
  box.innerHTML = html;
}
