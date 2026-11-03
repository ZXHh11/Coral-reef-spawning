/* ============================================================
   modules.js — 8 个板块
   ============================================================ */

/* ---------- 小工具 ---------- */
function quizCTA(id, text) {
  return `<div class="quiz-cta">
    <div>
      <h4>🎓 ${text || '学完了？来答题'}</h4>
      <p>答对全部题目，把这组精卵束存进银行。</p>
    </div>
    <button class="btn primary" data-quiz="${id}">开始答题</button>
  </div>`;
}

function collect(key, reward, label) {
  if (!State.parts) State.parts = {};
  if (State.parts[key]) return false;
  State.parts[key] = true;
  saveState();
  addMoney(reward);
  toast('＋' + fmt(reward) + '亿 · ' + label);
  return true;
}

function emit(container, chars, count, cls, extra) {
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = cls;
    el.textContent = chars[Math.floor(Math.random() * chars.length)];
    el.style.left = (Math.random() * 96) + '%';
    el.style.top = (extra && extra.top) || (Math.random() * 30 + 8) + '%';
    el.style.animationDelay = (Math.random() * 0.9) + 's';
    el.style.setProperty('--sx', ((Math.random() - .5) * 80) + 'px');
    container.appendChild(el);
    setTimeout(() => el.remove(), 5200);
  }
}

/* ---------- 月亮图形 ---------- */
function moonSVG(dayAfterFull) {
  const d = Math.max(0, Math.min(14, dayAfterFull));
  const shadowX = 20 + 40 * (1 - d / 14);
  return `<svg viewBox="0 0 40 40" aria-hidden="true">
    <circle cx="20" cy="20" r="18" fill="#f8f2d9"/>
    <circle cx="13" cy="14" r="3.4" fill="#e7dfc2" opacity=".55"/>
    <circle cx="24" cy="26" r="4.2" fill="#e7dfc2" opacity=".4"/>
    <circle cx="26" cy="12" r="2" fill="#e7dfc2" opacity=".45"/>
    <circle cx="${shadowX}" cy="19" r="18" fill="#081a28" opacity=".92"/>
    <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,244,210,.35)" stroke-width="1"/>
  </svg>`;
}

/* ---------- 珊瑚礁场景 ---------- */
function reefSVG() {
  return `<svg class="reef-svg" viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="seaG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0f4f6e"/>
        <stop offset="58%" stop-color="#08283d"/>
        <stop offset="100%" stop-color="#04131f"/>
      </linearGradient>
      <linearGradient id="rayG" x1="0" y1="0" x2="0.2" y2="1">
        <stop offset="0" stop-color="#c4f3ff" stop-opacity=".22"/>
        <stop offset="1" stop-color="#c4f3ff" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="sandG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#173952"/>
        <stop offset="1" stop-color="#0a1c2b"/>
      </linearGradient>
    </defs>
    <rect width="640" height="420" fill="url(#seaG)"/>
    <g opacity=".9">
      <polygon points="70,0 126,0 226,420 142,420" fill="url(#rayG)"/>
      <polygon points="292,0 332,0 392,420 316,420" fill="url(#rayG)"/>
      <polygon points="470,0 508,0 606,420 520,420" fill="url(#rayG)"/>
    </g>
    <g fill="#a8e6f7" opacity=".35">
      <circle cx="112" cy="96" r="1.6"/><circle cx="206" cy="146" r="1.2"/>
      <circle cx="398" cy="108" r="1.4"/><circle cx="556" cy="176" r="1.2"/>
      <circle cx="452" cy="62" r="1.5"/><circle cx="298" cy="72" r="1"/>
    </g>
    <g fill="#8ee0ee" opacity=".32">
      <path d="M486 118 q13 -8 26 0 q-13 8 -26 0z"/>
      <path d="M512 118 l9 -6 v12z"/>
      <path d="M548 158 q10 -6 20 0 q-10 6 -20 0z"/>
      <path d="M568 158 l7 -5 v10z"/>
    </g>
    <path d="M0 366 Q70 342 150 360 T320 352 T500 362 T640 344 L640 420 L0 420Z" fill="url(#sandG)"/>
    <ellipse cx="596" cy="368" rx="52" ry="26" fill="#15405a" opacity=".85"/>
    <g stroke="#2c6d86" stroke-width="2" fill="none" opacity=".55">
      <path d="M556 366 q10 -10 20 0 q10 -10 20 0 q10 -10 20 0"/>
      <path d="M560 374 q12 -9 24 0 q12 -9 24 0"/>
    </g>

    <g class="coral coral-a" stroke="#ff9db1" stroke-linecap="round" fill="none">
      <g class="sway">
        <path d="M80 382 C86 344 66 326 52 302" stroke-width="13"/>
        <path d="M52 330 C40 320 30 314 22 300" stroke-width="9"/>
        <path d="M100 384 C106 348 122 332 120 298" stroke-width="12"/>
        <path d="M114 380 C126 352 148 344 160 318" stroke-width="10"/>
        <path d="M120 336 C130 328 138 326 146 322" stroke-width="7"/>
      </g>
    </g>
    <g class="coral coral-b" stroke="#b7a4ff" stroke-linecap="round" fill="none">
      <g class="sway" style="animation-delay:-1.4s">
        <path d="M330 386 C326 348 302 338 290 308" stroke-width="12"/>
        <path d="M290 340 C278 330 272 322 266 310" stroke-width="8"/>
        <path d="M346 388 C350 346 372 332 366 294" stroke-width="12"/>
        <path d="M358 386 C374 356 402 350 414 326" stroke-width="9"/>
      </g>
    </g>
    <g class="coral coral-c" stroke="#6fd6c4" stroke-linecap="round" fill="none">
      <g class="sway" style="animation-delay:-2.6s">
        <path d="M520 384 L520 330" stroke-width="11"/>
        <path d="M520 342 C500 322 488 304 480 284" stroke-width="6"/>
        <path d="M520 336 C524 312 522 292 520 272" stroke-width="6"/>
        <path d="M520 342 C540 320 552 304 562 286" stroke-width="6"/>
        <path d="M520 344 C544 338 560 330 574 320" stroke-width="5"/>
      </g>
    </g>

    <g class="polyps">
      <g class="polyp" data-polyp="1">
        <circle cx="52" cy="302" r="17" fill="transparent"/>
        <circle class="polyp-core" cx="52" cy="302" r="7.5" fill="#ffd3dd"/>
        <circle class="polyp-eye" cx="52" cy="302" r="3" fill="#ff7d96"/>
      </g>
      <g class="polyp" data-polyp="2">
        <circle cx="22" cy="300" r="15" fill="transparent"/>
        <circle class="polyp-core" cx="22" cy="300" r="6.5" fill="#ffd3dd"/>
        <circle class="polyp-eye" cx="22" cy="300" r="2.6" fill="#ff7d96"/>
      </g>
      <g class="polyp" data-polyp="3">
        <circle cx="120" cy="298" r="17" fill="transparent"/>
        <circle class="polyp-core" cx="120" cy="298" r="7.5" fill="#ffd3dd"/>
        <circle class="polyp-eye" cx="120" cy="298" r="3" fill="#ff7d96"/>
      </g>
      <g class="polyp" data-polyp="4">
        <circle cx="160" cy="318" r="16" fill="transparent"/>
        <circle class="polyp-core" cx="160" cy="318" r="7" fill="#ffd3dd"/>
        <circle class="polyp-eye" cx="160" cy="318" r="2.8" fill="#ff7d96"/>
      </g>
      <g class="polyp" data-polyp="5">
        <circle cx="290" cy="308" r="16" fill="transparent"/>
        <circle class="polyp-core" cx="290" cy="308" r="7" fill="#e6defd"/>
        <circle class="polyp-eye" cx="290" cy="308" r="2.8" fill="#9d86ef"/>
      </g>
      <g class="polyp" data-polyp="6">
        <circle cx="366" cy="294" r="16" fill="transparent"/>
        <circle class="polyp-core" cx="366" cy="294" r="7" fill="#e6defd"/>
        <circle class="polyp-eye" cx="366" cy="294" r="2.8" fill="#9d86ef"/>
      </g>
      <g class="polyp" data-polyp="7">
        <circle cx="414" cy="326" r="15" fill="transparent"/>
        <circle class="polyp-core" cx="414" cy="326" r="6.5" fill="#e6defd"/>
        <circle class="polyp-eye" cx="414" cy="326" r="2.6" fill="#9d86ef"/>
      </g>
      <g class="polyp" data-polyp="8">
        <circle cx="480" cy="284" r="15" fill="transparent"/>
        <circle class="polyp-core" cx="480" cy="284" r="6.5" fill="#c8f5ec"/>
        <circle class="polyp-eye" cx="480" cy="284" r="2.6" fill="#4fbfae"/>
      </g>
      <g class="polyp" data-polyp="9">
        <circle cx="520" cy="272" r="15" fill="transparent"/>
        <circle class="polyp-core" cx="520" cy="272" r="6.5" fill="#c8f5ec"/>
        <circle class="polyp-eye" cx="520" cy="272" r="2.6" fill="#4fbfae"/>
      </g>
      <g class="polyp" data-polyp="10">
        <circle cx="562" cy="286" r="15" fill="transparent"/>
        <circle class="polyp-core" cx="562" cy="286" r="6.5" fill="#c8f5ec"/>
        <circle class="polyp-eye" cx="562" cy="286" r="2.6" fill="#4fbfae"/>
      </g>
    </g>
    <rect class="time-tint" width="640" height="420" fill="transparent"/>
  </svg>`;
}

/* ============================================================
   板块 0：四个条件实验室（线索版 · 不给答案）
   ============================================================ */
const REEF_LOG = [
  { place: '大堡礁 · 外礁', date: '11 月 19 日', moon: '第 4 晚', temp: 27.4, tide: 1.2, time: '日落后 1 小时 40 分', result: '整片产卵' },
  { place: '大堡礁 · 内礁', date: '11 月 6 日', moon: '第 2 晚', temp: 27.0, tide: 1.5, time: '日落后 1 小时 10 分', result: '少量产卵' },
  { place: '大堡礁 · 外礁', date: '10 月 29 日', moon: '满月当晚', temp: 26.9, tide: 3.1, time: '日落后 1 小时 30 分', result: '无' },
  { place: '冲绳 · 瀬底', date: '6 月 12 日', moon: '第 3 晚', temp: 28.2, tide: 1.0, time: '日落后 2 小时', result: '多种同时产卵' },
  { place: '三亚 · 鹿回头', date: '5 月 8 日', moon: '第 6 晚', temp: 26.6, tide: 1.1, time: '日落后 1 小时 20 分', result: '多种同时产卵' },
  { place: '宁加洛 · 西澳', date: '3 月 27 日', moon: '第 5 晚', temp: 26.3, tide: 0.9, time: '日落后 1 小时', result: '产卵' },
  { place: '红海 · 埃拉特', date: '7 月 2 日', moon: '第 4 晚', temp: 24.8, tide: 1.3, time: '日落后 1 小时 30 分', result: '无（当年暖得晚）' },
  { place: '三亚 · 西岛', date: '5 月 10 日', moon: '第 12 晚', temp: 27.5, tide: 2.8, time: '日落后 1 小时 20 分', result: '无' },
  { place: '大堡礁 · 外礁', date: '11 月 20 日', moon: '第 5 晚', temp: 27.2, tide: 1.1, time: '正午 12:00', result: '无' }
];

const LAB = {
  icon: '🧪',
  kicker: '主实验 · 线索推理',
  title: '四个条件实验室',
  desc: '没有人告诉你答案。调条件、下水看、守一夜，自己找出规律。',

  render() {
    return `
    <div class="lab-grid">
      <div class="scene-card">
        <div class="scene t-day" id="labScene">
          ${reefSVG()}
          <div class="bundle-overlay" id="bundleOverlay"></div>
          <div class="slick" id="slick"></div>
          <div class="scene-badge" id="sceneBadge">☀️ 白天 · 24°C</div>
        </div>
        <div class="scene-note" id="labNote">
          海面很平静。先按「下潜观察」，看看珊瑚现在的样子。
        </div>
      </div>

      <div class="panel lab-panel">
        <div class="ctrl">
          <div class="ctrl-head"><label>① 季节</label><span id="seasonVal">春</span></div>
          <div class="seg" id="seasonSeg">
            <button data-v="spring">春</button>
            <button data-v="summer">夏</button>
            <button data-v="autumn">秋</button>
            <button data-v="winter">冬</button>
          </div>
          <p class="readout" id="seasonRead">日照 12 小时 10 分</p>
        </div>

        <div class="ctrl">
          <div class="ctrl-head"><label>② 水温</label><span id="tempVal">24°C</span></div>
          <input type="range" id="tempRange" min="20" max="32" step="0.5" value="24">
          <div class="range-ends"><span>20°C</span><span>32°C</span></div>
          <p class="readout" id="tempRead">水温计：24.0°C</p>
        </div>

        <div class="ctrl">
          <div class="ctrl-head"><label>③ 月相</label><span id="moonVal">满月当天</span></div>
          <div class="moon-line">
            <div class="moon-face" id="moonFace"></div>
            <input type="range" id="moonRange" min="0" max="12" step="1" value="0">
          </div>
          <div class="range-ends"><span>满月</span><span></span><span>第 12 晚</span></div>
          <p class="readout" id="moonRead">潮差：3.1 m</p>
        </div>

        <div class="ctrl">
          <div class="ctrl-head"><label>④ 时间</label><span id="timeVal">白天</span></div>
          <div class="seg" id="timeSeg">
            <button data-v="day">☀️ 白天</button>
            <button data-v="dusk">🌅 黄昏</button>
            <button data-v="night">🌙 夜晚</button>
            <button data-v="deep">🌌 深夜</button>
          </div>
          <p class="readout" id="timeRead">能见度 25 m，鱼群穿梭</p>
        </div>

        <div class="lab-actions">
          <button class="btn" id="btnObserve">🔦 下潜观察</button>
          <button class="btn primary" id="btnSpawn">🌙 守候今晚</button>
          <button class="btn ghost" id="btnArchive">📓 礁区档案</button>
        </div>
      </div>
    </div>
    ${quizCTA('lab')}`;
  },

  init(root) {
    const scene = $('#labScene', root);
    const note = $('#labNote', root);
    const badge = $('#sceneBadge', root);
    const overlay = $('#bundleOverlay', root);
    const slick = $('#slick', root);

    const names = { spring: '春', summer: '夏', autumn: '秋', winter: '冬' };
    const timeNames = { day: '白天', dusk: '黄昏', night: '夜晚', deep: '深夜' };

    const seasonPool = ['spring', 'summer', 'autumn', 'winter'];
    const st = {
      season: seasonPool[Math.floor(Math.random() * 4)],
      temp: 22 + Math.round(Math.random() * 14) / 2,
      moon: Math.floor(Math.random() * 13),
      time: ['day', 'dusk', 'night', 'deep'][Math.floor(Math.random() * 4)]
    };
    let spawnLock = false;
    let attemptCount = 0;
    let archiveSeen = false;

    if (new URLSearchParams(location.search).get('spawn')) {
      st.season = 'summer'; st.temp = 27; st.moon = 3; st.time = 'night';
    }

    /* ---- 判定（内部用，界面上不出现） ---- */
    const okSeason = () => st.season === 'summer';
    const okTemp = () => st.temp >= 26 && st.temp <= 29;
    const okMoon = () => st.moon >= 2 && st.moon <= 6;
    const okTime = () => st.time === 'night';
    const ripe = () => okSeason() && okTemp() && okMoon();

    /* ---- 可观测数据 ---- */
    const SEASON_DATA = {
      spring: { sun: '12 小时 10 分', trend: '+0.4°C / 30 天' },
      summer: { sun: '13 小时 20 分', trend: '+2.3°C / 30 天' },
      autumn: { sun: '11 小时 55 分', trend: '−0.9°C / 30 天' },
      winter: { sun: '10 小时 30 分', trend: '−2.1°C / 30 天' }
    };
    const TIDE = [3.1, 2.6, 2.0, 1.5, 1.2, 1.1, 1.3, 1.7, 2.2, 2.7, 3.0, 3.2, 3.3];
    const timeRead = {
      day: '正午，光柱打穿水面，能见度 25 m',
      dusk: '太阳刚落下，光在几分钟里暗下来',
      night: '日落后约 1.5 小时，只剩月光',
      deep: '日落后 3 小时以上，月亮偏西'
    };

    function moonLabel() {
      return st.moon === 0 ? '满月当天' : '满月后第 ' + st.moon + ' 晚';
    }

    function paint() {
      $$('#seasonSeg button', root).forEach(b => b.classList.toggle('on', b.dataset.v === st.season));
      $$('#timeSeg button', root).forEach(b => b.classList.toggle('on', b.dataset.v === st.time));
      $('#seasonVal', root).textContent = names[st.season];
      $('#timeVal', root).textContent = timeNames[st.time];
      $('#tempVal', root).textContent = st.temp.toFixed(1).replace('.0', '') + '°C';
      $('#moonVal', root).textContent = moonLabel();
      $('#moonFace', root).innerHTML = moonSVG(st.moon);
      $('#tempRange', root).value = st.temp;
      $('#moonRange', root).value = st.moon;

      $('#seasonRead', root).textContent =
        `日照 ${SEASON_DATA[st.season].sun} · 水温 ${SEASON_DATA[st.season].trend}`;
      $('#tempRead', root).textContent = `水温计：${st.temp.toFixed(1)}°C（已持续 30 天）`;
      $('#moonRead', root).textContent = `潮差：${TIDE[st.moon].toFixed(1)} m`;
      $('#timeRead', root).textContent = timeRead[st.time];

      scene.className = 'scene t-' + st.time;
      if (st.season === 'winter') scene.classList.add('season-winter');
      if (st.temp >= 30) scene.classList.add('hot', 'bleached');
      else if (st.temp < 24) scene.classList.add('cold');

      badge.textContent =
        (st.season === 'summer' ? '☀️ ' : st.season === 'winter' ? '❄️ ' : '🌤 ') +
        names[st.season] + ' · ' + timeNames[st.time] + ' · ' + st.temp.toFixed(1).replace('.0', '') + '°C';

      if (st.temp >= 30) triggerBleach();
    }

    /* ---- 下潜观察：只说看到什么，不判对错 ---- */
    function observeText() {
      const parts = [];
      if (st.season === 'winter') parts.push('珊瑚虫缩在骨骼杯里，触手几乎不伸出来。');
      else if (st.season === 'spring') parts.push('珊瑚虫醒着，但动作很慢，组织还是薄薄一层。');

      if (st.temp >= 30) parts.push('颜色明显发淡，像被漂白过，体壁薄得能看见骨骼的纹路。');
      else if (st.temp >= 26) parts.push('口道下面的组织鼓起来了，隔着半透明的体壁能看到密密的小颗粒，一团一团挤在一起。');
      else if (st.temp >= 24) parts.push('组织里只有零星几粒淡色的东西，聚不成团。');
      else parts.push('体壁很薄，什么颗粒都看不到。');

      if (st.moon === 0) parts.push('海面被满月照得发亮，水里的影子很清楚。');
      else if (st.moon <= 6) parts.push('月亮已经缺了一角，夜里比前几天暗。');
      else parts.push('月亮缺了大半，但海面还是亮。');

      if (st.time === 'day') parts.push('阳光直射，珊瑚虫都缩着，鱼在头顶成群地转。');
      if (st.time === 'dusk') parts.push('光正在退，几条鱼开始往礁缝里钻。');
      if (st.time === 'night') parts.push('手电一关就全黑了，浮游小虫在光柱里乱撞。');
      if (st.time === 'deep') parts.push('水下很冷，能见度变差，礁区安静得反常。');

      return parts.join('');
    }

    function observe() {
      note.textContent = observeText();
      const rect = scene.getBoundingClientRect();
      FX.burst(rect.left + rect.width * 0.5, rect.top + rect.height * 0.55, 10);
      if (st.temp >= 30) discover('bleach', '白化警报', '水温超过 30°C，共生藻离开珊瑚，珊瑚失去颜色。', 100);
    }

    /* ---- 守候今晚 ---- */
    function attempt() {
      attemptCount++;
      note.textContent = '你关掉手电，坐在礁石边等。';
      setTimeout(() => {
        if (ripe() && okTime() && st.time !== 'deep') {
          spawn();
          return;
        }
        note.textContent = failText();
        if (st.season === 'winter' && okTemp() && okMoon() && okTime()) {
          triggerWinter();
        } else if (okSeason() && okTemp() && okMoon() && st.time === 'deep') {
          triggerLate();
        } else if (attemptCount >= 3 && !archiveSeen) {
          toast('📓 也许该翻翻别的礁区是怎么记录的', 3600);
        }
      }, 1200);
    }

    function failText() {
      if (st.time === 'day') return '太阳还没落。你在礁边坐到下午，珊瑚虫全缩着，海面什么也没有。';
      if (st.time === 'dusk') return '天刚擦黑，你守到完全暗下来。海面只有几条鱼翻起的水花。';
      if (st.time === 'deep') return '你来的时候已经很晚。守到天亮，海面一直很安静。';
      if (st.moon === 0) return '月亮很圆，海面反着光。守了一夜，没有任何动静。';
      if (st.moon > 6) return '月亮缺得多了。守到后半夜，礁区安静得像没人住。';
      if (!okSeason()) {
        return st.season === 'winter'
          ? '水很冷。珊瑚虫整夜缩着，口道没有张开过。'
          : '守到天亮，海面很安静。珊瑚组织还薄，看不出要产卵的样子。';
      }
      if (st.temp < 26) return '守了一夜，什么也没发生。水温计上的数字一整晚都没怎么动。';
      if (st.temp > 29) return '水有点烫手。珊瑚的颜色比上个月淡，整夜没有动作。';
      return '守到天亮，海面很安静。';
    }

    function spawn() {
      if (spawnLock) return;
      spawnLock = true;
      const first = !State.modules.lab;
      const n = 34;
      for (let i = 0; i < n; i++) {
        const b = document.createElement('div');
        b.className = 'bundle';
        b.style.left = (6 + Math.random() * 88) + '%';
        b.style.bottom = (8 + Math.random() * 26) + '%';
        b.style.setProperty('--rise', -(190 + Math.random() * 300) + 'px');
        b.style.setProperty('--dx', ((Math.random() - .5) * 80) + 'px');
        b.style.setProperty('--dur', (2.4 + Math.random() * 2.6) + 's');
        b.style.animationDelay = (Math.random() * 0.9) + 's';
        overlay.appendChild(b);
        setTimeout(() => b.remove(), 6200);
      }
      slick.classList.add('on');
      setTimeout(() => slick.classList.remove('on'), 6000);
      const r = scene.getBoundingClientRect();
      FX.burst(r.left + r.width / 2, r.top + r.height / 2, 40);

      // 前三次规模递增：5,000 → 7,500 → 11,250；之后只算练习（1,200），把玩家推向其他板块
      const runs = State.spawnRuns || 0;
      State.spawnRuns = runs + 1;
      saveState();
      const capped = runs >= 3;
      const reward = capped ? 1200 : Math.round(5000 * Math.pow(1.5, runs) / 100) * 100;
      note.textContent = `整片礁区在同一分钟里松开。精卵束向上升，像一场倒着下的雪。＋${fmt(reward)}亿` +
        (capped ? '（这片礁区的产卵已经记录满了，别的板块还有更多）' : '');

      addMoney(reward);
      if (runs > 0) {
        toast(capped
          ? '🪸 第 ' + (runs + 1) + ' 次大产卵 · <b style="color:#ffd166">+' + fmt(reward) + '亿</b> · 记录已满'
          : '🪸 第 ' + (runs + 1) + ' 次大产卵 · <b style="color:#ffd166">+' + fmt(reward) + '亿</b>', 3200);
      }

      if (first) {
        markDone('lab');
        setTimeout(() => {
          openModal(`
            <p class="kicker">你守到了 · +${fmt(reward)}亿</p>
            <h2>整片礁区，同一夜</h2>
            <p>成千上万个珊瑚虫在同一时刻释放精卵束。它们向上升，像一场倒着下的雪。</p>
            <p>到海面后束膜破裂，精卵混合，形成一条粉褐色的<b>卵带</b>，可以长达几公里——卫星都拍得到。</p>
            <p class="small muted" style="margin-top:12px">你刚才选的那四个数，不是标准答案。换个海区、换个物种，数字都会变一点。</p>
            <p style="margin-top:12px;color:#ffd166"><b>🔓 另外 7 个板块已解锁</b>——结构、卵细胞、地图、旅程都在等着。</p>
            <p><a href="https://www.bilibili.com/video/BV1f54y1L7wT/" target="_blank" rel="noopener">▶ 看真实的大产卵视频（B 站）</a></p>
            <div class="modal-actions">
              <button class="btn primary" data-home>去看看解锁的板块</button>
              <button class="btn" data-close>留在实验室继续守</button>
            </div>
          `);
        }, 2400);
        discover('lab-spawn', '大产卵现场', '整片珊瑚礁在同一晚释放精卵束，海面形成卵带。', 100);
      } else {
        discover('lab-spawn-again', '又一次守到', '条件对了，礁区就会再来一次——规模会比上一晚更大。', 50);
      }

      if (st.temp === 27 && st.moon === 3 && st.time === 'night' && st.season === 'summer') {
        for (let i = 0; i < 14; i++) {
          const s = document.createElement('div');
          s.className = 'star';
          s.textContent = '✨';
          s.style.left = (5 + Math.random() * 90) + '%';
          s.style.top = (Math.random() * 40) + '%';
          s.style.animationDelay = (Math.random() * 0.8) + 's';
          scene.appendChild(s);
          setTimeout(() => s.remove(), 4200);
        }
        discover('perfect', '黄金时刻', '夏天 27°C、满月后第 3 晚、日落后一个多小时——教科书式的组合。', 100);
      }

      setTimeout(() => { spawnLock = false; }, 4000);
    }

    function triggerBleach() {
      discover('bleach', '白化警报', '水温超过 30°C，共生藻离开珊瑚，珊瑚失去颜色。', 100);
    }
    function triggerWinter() {
      discover('winter', '冬天的珊瑚', '水温不够，精卵束还没成熟，珊瑚只能继续等。', 100);
    }
    function triggerLate() {
      discover('late', '关上的窗', '产卵窗口只有日落后那一小段，错过就要等下一次。', 100);
    }

    /* ---- 礁区档案 ---- */
    function openArchive() {
      const rows = REEF_LOG.map(r => `
        <tr>
          <td>${r.place}</td>
          <td>${r.date}</td>
          <td>${r.moon}</td>
          <td>${r.temp.toFixed(1)}°C</td>
          <td>${r.tide.toFixed(1)} m</td>
          <td>${r.time}</td>
          <td class="${r.result === '无' || r.result.startsWith('无') ? 'neg' : 'pos'}">${r.result}</td>
        </tr>`).join('');
      openModal(`
        <p class="kicker">观测记录</p>
        <h2>别人守过的夜</h2>
        <p style="margin-bottom:14px">这些是各地观测员留下的记录，不是规则。规律要你自己找。</p>
        <div class="log-wrap">
          <table class="log-table">
            <thead><tr><th>礁区</th><th>日期</th><th>满月后</th><th>水温</th><th>潮差</th><th>开始时间</th><th>结果</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <div class="modal-actions"><button class="btn primary" data-close>回去试一晚</button></div>
      `, { wide: true });
      if (!archiveSeen) {
        archiveSeen = true;
        discover('archive', '观测员的手记', '九条来自不同礁区的记录，比任何一条规则都好用。', 100);
      }
    }

    /* ---- 事件 ---- */
    $$('#seasonSeg button', root).forEach(b => b.addEventListener('click', () => {
      st.season = b.dataset.v; paint();
    }));
    $$('#timeSeg button', root).forEach(b => b.addEventListener('click', () => {
      st.time = b.dataset.v; paint();
    }));
    $('#tempRange', root).addEventListener('input', e => {
      st.temp = Number(e.target.value); paint();
    });
    $('#moonRange', root).addEventListener('input', e => {
      st.moon = Number(e.target.value); paint();
    });
    $('#btnObserve', root).addEventListener('click', observe);
    $('#btnSpawn', root).addEventListener('click', attempt);
    $('#btnArchive', root).addEventListener('click', openArchive);

    $$('.polyp', scene).forEach(p => {
      p.addEventListener('click', e => {
        e.stopPropagation();
        const got = discover('inside', '珊瑚虫的产房',
          '精卵束在珊瑚虫体内要准备约半年，卵巢和精囊长在不同的隔膜上。', 100);
        if (!got) return;
        openModal(`
          <p class="kicker">透视模式</p>
          <h2>身体里的半年工程</h2>
          <p>精卵束不是一天做好的。珊瑚虫会在体内慢慢攒上大约半年：</p>
          <ul style="margin:14px 0 0 18px;font-size:13px;line-height:2;color:#8fb3c4">
            <li>卵巢和精囊长在<b style="color:#fff">不同的隔膜</b>上，所以要把精子和卵子打包在一起。</li>
            <li>卵子里囤卵黄和脂滴，脂滴提供浮力。</li>
            <li>一整个冬天低温打底、春夏升温催熟，最后才轮到月光和天黑发令。</li>
          </ul>
          <div class="modal-actions"><button class="btn primary" data-close>原来如此</button></div>
        `);
      });
    });

    if (!State.modules.lab) {
      setTimeout(() => toast('没有提示。先「下潜观察」，再「守候今晚」试试', 4200), 900);
    }

    paint();
  }
};

/* ============================================================
   板块 1：精卵束剖面
   ============================================================ */
const BUNDLE = {
  icon: '📦',
  kicker: '板块 1 · 微观结构',
  title: '精卵束剖面探索',
  desc: '切开一个精卵束，看看精子、卵子和黏液怎么打包。',

  render() {
    return `
    <div class="bundle-wrap">
      <div class="stage-box" id="bundleStage">
        <div class="cover" id="bundleCover">
          <div class="float-bundle">
            ${bundleOrbSVG()}
          </div>
          <p class="small muted" style="margin-top:8px">海面漂着一个粉红色的小球，直径约 1 毫米。</p>
          <button class="btn primary" id="btnCut">✂️ 切开看看</button>
        </div>
        <svg class="bundle-svg hidden" id="bundleSvg" viewBox="0 0 360 360">
          <defs>
            <radialGradient id="eggG" cx="35%" cy="30%">
              <stop offset="0" stop-color="#fff6e2"/>
              <stop offset="60%" stop-color="#ffd9a8"/>
              <stop offset="100%" stop-color="#e5a86a"/>
            </radialGradient>
            <radialGradient id="massG" cx="40%" cy="35%">
              <stop offset="0" stop-color="#ffd3dd"/>
              <stop offset="100%" stop-color="#ff8fa3"/>
            </radialGradient>
          </defs>
          <circle cx="180" cy="180" r="150" fill="rgba(139,224,212,.06)"/>
          <g id="eggRing"></g>
          <circle cx="180" cy="180" r="54" fill="url(#massG)" opacity=".55"/>
          <g id="spermDots"></g>
          <g class="hotspot" data-part="sperm">
            <circle class="hs-ring" cx="180" cy="180" r="54" fill="rgba(255,143,163,.001)" stroke="rgba(255,255,255,.15)" stroke-width="1"/>
          </g>
          <g class="hotspot" data-part="mucus">
            <circle class="hs-ring" cx="180" cy="180" r="150" fill="none" stroke="rgba(139,224,212,.55)" stroke-width="16" pointer-events="stroke"/>
          </g>
          <text x="180" y="18" text-anchor="middle" class="sperm-label">黏液外膜</text>
          <text x="180" y="352" text-anchor="middle" class="sperm-label">卵细胞在外围 · 精子团在中央</text>
        </svg>
        <div class="legend">
          <span><i style="background:#8be0d4"></i>黏液外膜</span>
          <span><i style="background:#ffcf9a"></i>卵细胞</span>
          <span><i style="background:#ff9db1"></i>精子团</span>
        </div>
      </div>

      <div class="part-info" id="bundleInfo">
        <p class="kicker">先切开</p>
        <h3>一个漂在海面的小球</h3>
        <p>它叫精卵束。珊瑚把精子和卵子打包在一起，一次送到海面。</p>
        <p class="small muted" style="margin-top:12px">点击左边的「切开看看」，然后逐层点开它。</p>
      </div>
    </div>
    ${quizCTA('bundle', '结构看懂了？来答题')}`;
  },

  init(root) {
    const stage = $('#bundleStage', root);
    const svg = $('#bundleSvg', root);
    const cover = $('#bundleCover', root);
    const info = $('#bundleInfo', root);
    const opened = new Set();
    let cut = false;

    // 生成卵环
    const ring = $('#eggRing', root);
    const R = 104;
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
      const cx = 180 + Math.cos(a) * R;
      const cy = 180 + Math.sin(a) * R;
      ring.insertAdjacentHTML('beforeend', `
        <g class="hotspot" data-part="egg">
          <circle class="hs-ring" cx="${cx}" cy="${cy}" r="22" fill="url(#eggG)" stroke="rgba(255,255,255,.45)" stroke-width="1.2"/>
          <circle cx="${cx - 6}" cy="${cy - 6}" r="4" fill="#fff" opacity=".45"/>
        </g>`);
    }

    // 精子小点
    const dots = $('#spermDots', root);
    let html = '';
    for (let i = 0; i < 60; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * 46;
      html += `<circle cx="${180 + Math.cos(a) * r}" cy="${180 + Math.sin(a) * r}" r="1.6" fill="#fff" opacity="${.35 + Math.random() * .5}"/>`;
    }
    dots.innerHTML = html;

    function cutOpen() {
      if (cut) return;
      cut = true;
      cover.classList.add('gone');
      svg.classList.remove('hidden');
      setTimeout(() => { cover.style.display = 'none'; }, 400);
      collect('bundle-cut', 300, '切开精卵束');
      info.innerHTML = `
        <p class="kicker">剖面图</p>
        <h3>三层结构</h3>
        <p>从外到内：黏液外膜、卵细胞、精子团。点一点每一层。</p>
        <div class="detail-grid" style="margin-top:16px">
          <button data-jump="mucus">黏液外膜</button>
          <button data-jump="egg">卵细胞</button>
          <button data-jump="sperm">精子团</button>
        </div>`;
      $$('[data-jump]', info).forEach(b => b.addEventListener('click', () => showPart(b.dataset.jump)));
    }

    function showPart(part) {
      $$('.hotspot', svg).forEach(h => h.classList.toggle('active', h.dataset.part === part));
      if (part === 'mucus') {
        info.innerHTML = `
          <p class="kicker">第 1 层</p>
          <h3>黏液外膜</h3>
          <p>珊瑚虫分泌的糖蛋白黏液，把精子和卵子粘成一束。它在上升途中保护配子，到了海面才破裂。</p>
          <ul>
            <li>厚度只有几微米</li>
            <li>破裂后，精子才被海水稀释、激活</li>
            <li>浮力主要来自卵里的蜡酯，不是黏液</li>
          </ul>
          <div class="part-actions">
            <button class="btn" data-jump="egg">下一层：卵细胞 →</button>
            <button class="btn ghost" data-jump="sperm">看精子团</button>
          </div>`;
        collect('bundle-mucus', 300, '黏液外膜');
      }
      if (part === 'egg') {
        info.innerHTML = `
          <p class="kicker">第 2 层</p>
          <h3>卵细胞</h3>
          <p>卵细胞排在外围，一个束里有几枚到十几枚。每颗直径约 0.2–1 毫米，里面塞满卵黄和脂滴。</p>
          <ul>
            <li>卵黄 = 胚胎的口粮</li>
            <li>脂滴 = 浮力，也是后期幼虫的燃料</li>
            <li>颜色因种而异：橙、粉、浅褐</li>
          </ul>
          <div class="part-actions">
            <button class="btn primary" data-module="egg">看卵细胞的装备 →</button>
            <button class="btn ghost" data-jump="sperm">看精子团</button>
          </div>`;
        collect('bundle-egg', 300, '卵细胞');
      }
      if (part === 'sperm') {
        info.innerHTML = `
          <p class="kicker">第 3 层</p>
          <h3>精子团</h3>
          <p>精子被挤在正中央，成百上千个。它们在这里是静止的，要等海水稀释、靠近同种卵子才会被激活。</p>
          <div class="part-actions">
            <button class="btn primary" id="btnSpermZoom">🔬 放大看一个精子</button>
            <button class="btn" id="btnCount">🔢 数一数</button>
            <button class="btn" id="btnSize">📏 大小对比</button>
            <button class="btn" id="btnRace">🏊 游泳比赛</button>
          </div>`;
        collect('bundle-sperm', 300, '精子团');
        $('#btnSpermZoom', info).addEventListener('click', showSperm);
        $('#btnCount', info).addEventListener('click', countEgg);
        $('#btnSize', info).addEventListener('click', sizeEgg);
        $('#btnRace', info).addEventListener('click', raceEgg);
        checkDone();
      }
    }

    function showSperm() {
      info.innerHTML = `
        <p class="kicker">精子特写 · 全长 10–15 微米</p>
        <div class="sperm-stage">
          <svg class="sperm-svg" viewBox="0 0 360 200">
            <defs>
              <linearGradient id="headG" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#eafcff"/><stop offset="100%" stop-color="#9fd8ea"/>
              </linearGradient>
            </defs>
            <path d="M118 100 C140 84 158 116 178 100 C198 84 216 116 236 100 C256 84 274 116 294 100"
              stroke="#bfe9ff" stroke-width="3" fill="none" stroke-linecap="round"/>
            <ellipse cx="86" cy="100" rx="30" ry="21" fill="url(#headG)"/>
            <ellipse cx="86" cy="100" rx="17" ry="13" fill="#7fb8cc" opacity=".55"/>
            <rect x="112" y="92" width="26" height="16" rx="7" fill="#8fe0d0"/>
            <circle cx="120" cy="96" r="2.4" fill="#0b2637"/>
            <circle cx="128" cy="96" r="2.4" fill="#0b2637"/>
            <circle cx="54" cy="92" r="3.4" fill="#ffd166"/>
            <circle cx="50" cy="103" r="2.6" fill="#ffd166"/>
            <circle cx="55" cy="110" r="2" fill="#ffd166"/>
            <text x="86" y="150" text-anchor="middle" class="sperm-label">头部（核）</text>
            <text x="125" y="80" text-anchor="middle" class="sperm-label">中段</text>
            <text x="230" y="130" text-anchor="middle" class="sperm-label">鞭毛</text>
            <text x="54" y="130" text-anchor="middle" class="sperm-label">顶体囊泡</text>
          </svg>
        </div>
        <p class="small muted">点下面的部位，看看它做什么。</p>
        <div class="detail-grid" id="spermParts">
          <button data-p="head">头部</button>
          <button data-p="mid">中段</button>
          <button data-p="tail">鞭毛</button>
          <button data-p="acrosome">顶体囊泡</button>
        </div>
        <div id="spermInfo" style="margin-top:14px"></div>
        <div class="part-actions"><button class="btn ghost" id="backBundle">← 回到精卵束</button></div>`;
      $('#backBundle', info).addEventListener('click', () => showPart('sperm'));
      $$('#spermParts button', info).forEach(b => b.addEventListener('click', () => {
        const key = b.dataset.p;
        b.classList.add('done');
        $('#spermInfo', info).innerHTML = SPERM_PARTS[key].html;
        collect('sperm-' + key, 300, SPERM_PARTS[key].name);
        checkDone();
      }));
    }

    function countEgg() {
      openModal(`
        <p class="kicker">彩蛋 · 数量</p>
        <h2>一束里有多少精子？</h2>
        <p style="font-size:40px;font-weight:700;color:#ff9db1;margin:14px 0">500 – 1,000+</p>
        <p>精子做得便宜：结构简单、数量巨大、寿命只有几小时。珊瑚的策略是用数量堆出受精率。</p>
        <div class="modal-actions"><button class="btn primary" data-close>哇</button></div>
      `);
      discover('bundle-count', '精子数量', '一个精卵束里可以有成百上千个精子。', 200);
    }

    function sizeEgg() {
      const rows = [
        ['精子', '0.012 毫米', 10],
        ['卵细胞', '0.5 毫米', 46],
        ['精卵束', '1 毫米', 92],
        ['一粒米', '6 毫米', 180],
        ['小朋友的手指', '15 毫米', 260]
      ];
      openModal(`
        <p class="kicker">彩蛋 · 尺度</p>
        <h2>到底有多小？</h2>
        <div class="compare-row">
          ${rows.map(r => `<div class="compare-item">
            <div class="bar" style="width:54px;height:${r[2]}px"></div>
            <div style="color:#e9f6fb;font-size:12px">${r[0]}</div>
            <div>${r[1]}</div>
          </div>`).join('')}
        </div>
        <p class="small muted">按比例夸张示意。真实的精卵束只有一粒芝麻那么大。</p>
        <div class="modal-actions"><button class="btn primary" data-close>继续</button></div>
      `, { wide: true });
      discover('bundle-size', '尺度对比', '精子约 0.012 毫米，精卵束约 1 毫米。', 200);
    }

    function raceEgg() {
      const spermers = [0, 1, 2, 3, 4].map(i => {
        const d = document.createElement('div');
        d.className = 'race-sperm';
        d.style.top = (26 + i * 34) + 'px';
        d.style.opacity = i === 0 ? 1 : .7;
        return d;
      });
      openModal(`
        <p class="kicker">彩蛋 · 趋化</p>
        <h2>精子游泳比赛</h2>
        <p>释放时它们不动。被海水稀释后，才开始绕圈、然后突然直线冲向卵子。</p>
        <div class="race-track" id="raceTrack">
          <div class="race-flag">起点</div>
          <div class="race-egg"></div>
        </div>
        <div class="race-result" id="raceResult">准备……</div>
        <div class="modal-actions"><button class="btn primary" id="raceGo">开始比赛</button></div>
      `);
      const track = $('#raceTrack');
      spermers.forEach(s => track.appendChild(s));
      $('#raceGo').addEventListener('click', () => {
        const speeds = spermers.map(() => 0.8 + Math.random() * 0.9);
        const start = performance.now();
        $('#raceResult').textContent = '它们在找同种卵子的化学信号……';
        const timer = setInterval(() => {
          const t = (performance.now() - start) / 1000;
          spermers.forEach((s, i) => {
            const x = Math.min(250, 10 + t * 60 * speeds[i] + Math.sin(t * 6 + i) * 6);
            s.style.left = x + 'px';
          });
          if (t > 4.2) {
            clearInterval(timer);
            $('#raceResult').textContent = '只有一条先到达——但真实海面里，是成千上万条一起冲。';
            addMoney(200);
            discover('bundle-race', '精子比赛', '精子靠化学趋化找到卵子，不是随机乱游。', 0);
          }
        }, 40);
      });
    }

    function checkDone() {
      const need = ['bundle-mucus', 'bundle-egg', 'bundle-sperm',
        'sperm-head', 'sperm-mid', 'sperm-tail', 'sperm-acrosome'];
      if (need.every(k => State.parts && State.parts[k])) {
        if (!State.parts['bundle-all']) {
          State.parts['bundle-all'] = true;
          saveState();
          addMoney(500);
          markDone('bundle');
        }
      }
    }

    if ($('#btnCut', root)) $('#btnCut', root).addEventListener('click', cutOpen);
    $$('.hotspot', svg).forEach(h => h.addEventListener('click', () => {
      if (!cut) return cutOpen();
      showPart(h.dataset.part);
    }));
  }
};

function bundleOrbSVG() {
  return `<svg viewBox="0 0 200 200" width="150" height="150">
    <defs>
      <radialGradient id="orbG" cx="35%" cy="30%">
        <stop offset="0" stop-color="#ffe6ec"/>
        <stop offset="55%" stop-color="#ff9db1"/>
        <stop offset="100%" stop-color="#e8607f"/>
      </radialGradient>
    </defs>
    <circle cx="100" cy="100" r="62" fill="url(#orbG)" opacity=".28"/>
    <circle cx="100" cy="100" r="52" fill="url(#orbG)"/>
    <circle cx="84" cy="82" r="10" fill="#fff" opacity=".28"/>
    <circle cx="118" cy="116" r="6" fill="#ffd9e1" opacity=".5"/>
    <circle cx="110" cy="78" r="4" fill="#ffd9e1" opacity=".55"/>
  </svg>`;
}

const SPERM_PARTS = {
  head: {
    name: '头部',
    html: `<h4 style="font-size:13px;margin-bottom:6px">头部</h4>
      <p style="font-size:12.5px;line-height:1.85;color:#8fb3c4">几乎只是一个高度浓缩的细胞核。DNA 被压得很紧，为的是减小体积、降低游动阻力。</p>`
  },
  mid: {
    name: '中段',
    html: `<h4 style="font-size:13px;margin-bottom:6px">中段</h4>
      <p style="font-size:12.5px;line-height:1.85;color:#8fb3c4">只有 5–6 个线粒体，负责给鞭毛供能。任务只是短距离冲刺，不需要像哺乳动物精子那样囤几十个。</p>`
  },
  tail: {
    name: '鞭毛',
    html: `<h4 style="font-size:13px;margin-bottom:6px">鞭毛</h4>
      <p style="font-size:12.5px;line-height:1.85;color:#8fb3c4">一根标准的 9+2 微管轴丝，长约 9–10 微米。靠它摆动前进。</p>`
  },
  acrosome: {
    name: '顶体囊泡',
    html: `<h4 style="font-size:13px;margin-bottom:6px">顶体囊泡</h4>
      <p style="font-size:12.5px;line-height:1.85;color:#8fb3c4">珊瑚精子没有典型顶体，只有几个高尔基体来源的小囊泡。它不靠"打洞"受精，而是靠分子识别。</p>`
  }
};
