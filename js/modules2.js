/* ============================================================
   modules2.js — 卵细胞 / 全球地图 / 漂流旅程
   ============================================================ */

const EGG_PARTS = {
  membrane: {
    name: '卵黄膜', tag: '防盗门',
    desc: '最外面的一层糖蛋白外壳。受精的瞬间它会立刻硬化，把后来的精子挡在外面。功能上相当于哺乳动物的透明带。',
    points: ['保护卵细胞', '受精后硬化，防止多精入卵', '表面有识别同种精子的分子']
  },
  microvilli: {
    name: '微绒毛', tag: '吸收器',
    desc: '卵黄膜下伸出的一圈细小突起。它们负责从母体吸收营养，也参与受精过程。',
    points: ['增加表面积，方便吸收', '帮助精子与卵膜接触']
  },
  yolk: {
    name: '卵黄体', tag: '口粮',
    desc: '蛋白质为主的营养包。胚胎在还不能吃东西的那些天，就靠它供能。',
    points: ['占卵体积的一大半', '够用到幼虫附着']
  },
  lipid: {
    name: '脂滴', tag: '救生圈',
    desc: '以蜡酯为主的油滴。它比水轻，把卵托向海面；也是幼虫后期的重要燃料。',
    points: ['提供浮力', 'A. millepora 的卵和幼虫干重里近 70% 是脂质', '脂滴越大，漂得越久']
  },
  cortical: {
    name: '皮层颗粒', tag: '锁门装置',
    desc: '排在卵膜下的一圈小囊。精子进入后，它们会把内容物倒出来，让卵膜硬化——这叫皮质反应。',
    points: ['几秒内完成', '确保只有一个精子进入']
  },
  nucleus: {
    name: '细胞核', tag: '另一半基因',
    desc: '单倍体的核，只有一套染色体。受精后与精子的核融合，组成新个体。',
    points: ['位于卵的一侧', '由减数分裂产生']
  },
  algae: {
    name: '共生藻', tag: '选配太阳能板',
    desc: '只有少数珊瑚把共生藻直接放进卵里（垂直传递）。多数造礁珊瑚的卵是"空"的，幼虫附着后才从海水里获取。',
    points: ['垂直传递：母体直接给', '水平传递：幼虫自己捡', '带藻的卵脂滴更小']
  }
};

const EGG = {
  icon: '🥚',
  kicker: '板块 2 · 卵细胞',
  title: '卵细胞的生存装备',
  desc: '一颗卵要带什么，才能在海上漂几天、再长成珊瑚？',

  render() {
    return `
    <div class="two-col">
      <div class="stage-box">
        <p class="kicker">卵细胞剖面 · 直径约 0.5 毫米</p>
        <svg class="egg-svg" viewBox="0 0 360 360">
          <defs>
            <radialGradient id="eggBody" cx="38%" cy="32%">
              <stop offset="0" stop-color="#fff8e8"/>
              <stop offset="55%" stop-color="#ffe3b8"/>
              <stop offset="100%" stop-color="#e9b476"/>
            </radialGradient>
            <radialGradient id="lipidG" cx="35%" cy="30%">
              <stop offset="0" stop-color="#fffdf2"/>
              <stop offset="60%" stop-color="#ffe9a8"/>
              <stop offset="100%" stop-color="#e8b45c"/>
            </radialGradient>
          </defs>

          <g data-hl="microvilli">
            <g stroke="#ffd9a8" stroke-width="2" opacity=".75">
              <line x1="180" y1="18" x2="180" y2="8"/><line x1="205" y1="22" x2="209" y2="12"/>
              <line x1="155" y1="22" x2="151" y2="12"/><line x1="228" y1="31" x2="235" y2="22"/>
              <line x1="132" y1="31" x2="125" y2="22"/><line x1="247" y1="46" x2="256" y2="39"/>
              <line x1="113" y1="46" x2="104" y2="39"/><line x1="261" y1="66" x2="271" y2="61"/>
              <line x1="99" y1="66" x2="89" y2="61"/><line x1="268" y1="88" x2="279" y2="85"/>
              <line x1="92" y1="88" x2="81" y2="85"/><line x1="270" y1="112" x2="281" y2="112"/>
              <line x1="90" y1="112" x2="79" y2="112"/>
            </g>
          </g>

          <circle cx="180" cy="180" r="144" fill="url(#eggBody)"/>

          <g data-hl="membrane">
            <circle cx="180" cy="180" r="150" fill="none" stroke="#ffd9a8" stroke-width="10"/>
            <circle cx="180" cy="180" r="150" fill="none" stroke="#fff3d8" stroke-width="2" opacity=".7"/>
          </g>

          <g data-hl="cortical" opacity=".9" fill="#ffb7a0">
            <circle cx="180" cy="54" r="3.4"/><circle cx="210" cy="58" r="3.4"/><circle cx="150" cy="58" r="3.4"/>
            <circle cx="238" cy="70" r="3.4"/><circle cx="122" cy="70" r="3.4"/><circle cx="260" cy="90" r="3.4"/>
            <circle cx="100" cy="90" r="3.4"/><circle cx="274" cy="116" r="3.4"/><circle cx="86" cy="116" r="3.4"/>
            <circle cx="280" cy="146" r="3.4"/><circle cx="80" cy="146" r="3.4"/><circle cx="278" cy="176" r="3.4"/>
            <circle cx="82" cy="176" r="3.4"/><circle cx="270" cy="206" r="3.4"/><circle cx="90" cy="206" r="3.4"/>
            <circle cx="256" cy="234" r="3.4"/><circle cx="104" cy="234" r="3.4"/><circle cx="236" cy="258" r="3.4"/>
            <circle cx="124" cy="258" r="3.4"/><circle cx="210" cy="274" r="3.4"/><circle cx="150" cy="274" r="3.4"/>
            <circle cx="180" cy="278" r="3.4"/>
          </g>

          <g data-hl="yolk">
            <ellipse cx="145" cy="225" rx="42" ry="30" fill="#ffcf86" opacity=".85"/>
            <ellipse cx="222" cy="228" rx="34" ry="26" fill="#ffd79a" opacity=".8"/>
            <ellipse cx="170" cy="120" rx="30" ry="22" fill="#ffd79a" opacity=".7"/>
            <ellipse cx="112" cy="170" rx="24" ry="18" fill="#ffcf86" opacity=".7"/>
          </g>

          <g data-hl="lipid">
            <circle cx="128" cy="132" r="17" fill="url(#lipidG)"/>
            <circle cx="205" cy="170" r="13" fill="url(#lipidG)"/>
            <circle cx="168" cy="262" r="15" fill="url(#lipidG)"/>
            <circle cx="238" cy="130" r="10" fill="url(#lipidG)"/>
            <circle cx="110" cy="252" r="9" fill="url(#lipidG)"/>
            <circle cx="255" cy="200" r="8" fill="url(#lipidG)"/>
            <circle cx="150" cy="178" r="7" fill="url(#lipidG)"/>
          </g>

          <g data-hl="nucleus">
            <circle cx="222" cy="120" r="27" fill="#f6cfd7" stroke="#e9a7b4" stroke-width="2"/>
            <circle cx="228" cy="116" r="9" fill="#d97e93" opacity=".65"/>
          </g>

          <g data-hl="algae" fill="#7ce0a8">
            <circle cx="112" cy="290" r="4"/><circle cx="124" cy="298" r="3.4"/>
            <circle cx="101" cy="300" r="3"/><circle cx="118" cy="308" r="3.6"/>
          </g>

          <text x="180" y="342" text-anchor="middle" class="sperm-label">卵黄膜 · 微绒毛 · 皮层颗粒 · 卵黄体 · 脂滴</text>
        </svg>
      </div>

      <div>
        <div class="panel part-info" id="eggInfo">
          <p class="kicker">装备清单</p>
          <h3>一颗自带行李的细胞</h3>
          <p>卵不只是一个细胞核。它要在海上漂、要防晒、要供电，所以母体提前几个月就给它装好了全套装备。</p>
          <p class="small muted" style="margin-top:10px">点下面的装备，看它做什么。</p>
        </div>
        <div class="equip-list" id="eggEquip">
          ${Object.keys(EGG_PARTS).map(k => `<button class="equip" data-part="${k}">
            <b>${EGG_PARTS[k].name}</b>${EGG_PARTS[k].tag}
          </button>`).join('')}
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:20px">
      <p class="kicker">为什么自带防晒</p>
      <h3>卵要去的地方，是全海洋紫外线最强的地方</h3>
      <div class="two-col" style="margin-top:14px;grid-template-columns:1fr 1fr">
        <div>
          <p>卵浮在海面，正值热带夏季，紫外线最强。更麻烦的是，胚胎此时正在高速分裂、复制 DNA，损伤风险成倍放大。</p>
          <p style="margin-top:10px">珊瑚给卵装了两道防线：</p>
          <ul style="margin:10px 0 0 18px;font-size:13px;line-height:1.9;color:#8fb3c4">
            <li><b style="color:#fff">MAA</b>：水溶性小分子，专门吸收 UVB</li>
            <li><b style="color:#fff">荧光蛋白</b>：像一层光学屏蔽，挡住多余的光</li>
          </ul>
        </div>
        <div>
          <div class="supply">
            <div class="supply-node"><b>共生藻</b>合成 MAA</div>
            <span class="supply-arrow">→</span>
            <div class="supply-node"><b>母体组织</b>转运</div>
            <span class="supply-arrow">→</span>
            <div class="supply-node hi"><b>卵细胞</b>存起来</div>
          </div>
          <p class="small muted" style="margin-top:12px">关键：动物自己<strong style="color:#ffd166">没有</strong>合成 MAA 的莽草酸途径。所以防晒物质的原料，只能由共生藻提供。</p>
          <button class="btn" style="margin-top:12px" id="btnSupply">这条链说明了什么？</button>
        </div>
      </div>
      <div class="note">
        <b>证据：</b>浅水（3 米）母体的卵，MAA 浓度高，在 UVB 下存活率也高；深水（24 米）母体的卵，MAA 少、死亡率明显更高。卵里的 MAA 浓度和母体一致——说明这是母体提前存进去的。
      </div>
    </div>

    <div class="card" style="margin-top:20px">
      <p class="kicker">为什么带共生藻</p>
      <h3>多数珊瑚的卵，其实是"空"的</h3>
      <div class="transfer">
        <button class="transfer-card" data-transfer="horizontal">
          <h4>水平传递 · 大多数造礁珊瑚</h4>
          <p>卵和幼虫都不带藻。幼虫附着变态后，才从海水里"捡"共生藻。</p>
          <p style="margin-top:6px;color:#5fe0d0">好处：子代能挑选适合新环境的藻株。</p>
        </button>
        <button class="transfer-card" data-transfer="vertical">
          <h4>垂直传递 · 少数种类</h4>
          <p>母体直接把藻打包进卵，比如 <i>Montipora incrassata</i>。</p>
          <p style="margin-top:6px;color:#5fe0d0">好处：一出生自带太阳能板；代价：脂滴更小。</p>
        </button>
      </div>
    </div>
    ${quizCTA('egg', '装备认全了？来答题')}`;
  },

  init(root) {
    const info = $('#eggInfo', root);
    const svg = $('.egg-svg', root);
    const seen = new Set();

    function select(key) {
      const p = EGG_PARTS[key];
      $$('.equip', root).forEach(b => b.classList.toggle('on', b.dataset.part === key));
      $$('[data-hl]', svg).forEach(g => g.classList.toggle('hl', g.dataset.hl === key));
      info.innerHTML = `
        <p class="kicker">${p.tag}</p>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <ul>${p.points.map(x => `<li>${x}</li>`).join('')}</ul>
        <div class="part-actions">
          <button class="btn primary" data-module="depth">看深浅水的防晒差别 →</button>
        </div>`;
      if (!seen.has(key)) {
        seen.add(key);
        collect('egg-' + key, 200, p.name);
      }
      if (key === 'lipid') {
        discover('egg-float', '浮力从哪来', '卵里的蜡酯脂滴比水轻，把卵托到海面。', 100);
      }
      if (key === 'algae') {
        discover('egg-algae', '自带太阳能板', '少数珊瑚把共生藻直接放进卵里，叫垂直传递。', 100);
      }
      if (seen.size >= 7 && !State.parts['egg-all']) {
        State.parts['egg-all'] = true;
        saveState();
        addMoney(500);
        markDone('egg');
      }
    }

    $$('.equip', root).forEach(b => b.addEventListener('click', () => select(b.dataset.part)));

    $('#btnSupply', root).addEventListener('click', () => {
      openModal(`
        <p class="kicker">彩蛋 · 供应链</p>
        <h2>防晒物质的原料，来自共生藻</h2>
        <p>珊瑚自己不会造 MAA。它要靠体内的共生藻合成，再由母体转运到卵里。</p>
        <p>所以：<b>没有健康的共生藻，就没有防晒好的卵。</b>白化，不只是颜色问题。</p>
        <div class="modal-actions"><button class="btn primary" data-close>明白了</button></div>
      `);
      discover('egg-supply', '防晒供应链', 'MAA 只能由共生藻合成，再由母体转运进卵。', 100);
    });

    $$('.transfer-card', root).forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('pick');
        const v = card.dataset.transfer;
        collect('egg-transfer-' + v, 150, v === 'vertical' ? '垂直传递' : '水平传递');
        if (State.parts['egg-transfer-vertical'] && State.parts['egg-transfer-horizontal']) {
          discover('egg-transfer', '两种传递方式', '多数珊瑚水平传递，少数垂直传递。', 100);
        }
      });
    });

    select('membrane');
  }
};

/* ============================================================
   板块 3：全球产卵时间地图
   ============================================================ */
const REEFS = [
  { id: 'gbr', name: '大堡礁', x: 884, y: 338, months: [10, 11, 12], peak: '11 月', lx: 892, ly: 330,
    note: '全球最有名的大产卵。内礁通常比外礁早约一个月，因为浅水升温更快。',
    fact: '整片礁区的高潮通常只持续 2–3 个夜晚。' },
  { id: 'ningaloo', name: '宁加洛礁', x: 806, y: 328, months: [3, 4], peak: '3–4 月', lx: 700, ly: 320,
    note: '西澳的裙礁。产卵与浮游生物爆发同步，鲸鲨也在这时出现。',
    fact: '南北半球季节相反，但都锚定在"暖季 + 满月后"。' },
  { id: 'sanya', name: '三亚 · 南海', x: 800, y: 214, months: [4, 5, 6], peak: '4–6 月', lx: 742, ly: 206,
    note: '中科院南海海洋研究所已能预报产卵日，一夜可收集数十万粒精卵用于育苗修复。',
    fact: '鹿角珊瑚等常见种多在 4–6 月的满月后产卵。' },
  { id: 'okinawa', name: '冲绳', x: 852, y: 190, months: [5, 6], peak: '5–6 月', lx: 862, ly: 182,
    note: '琉球群岛的礁区，产卵集中在梅雨结束后的暖水期。',
    fact: '同一纬度带，产卵月份会随当年水温前后浮动。' },
  { id: 'palau', name: '帕劳', x: 868, y: 244, months: [3, 4, 5], peak: '3–5 月', lx: 878, ly: 250,
    note: '热带西太平洋的高多样性礁区，多种珊瑚分批产卵。',
    fact: '不同种会错开几天，减少杂交。' },
  { id: 'redsea', name: '红海', x: 598, y: 204, months: [6, 7], peak: '6–7 月', lx: 540, ly: 196,
    note: '水温最高的海域之一。变暖正在打乱这里的产卵同步性。',
    fact: '已有研究记录到配子释放时间变得紊乱、不可预测。' },
  { id: 'florida', name: '佛罗里达', x: 274, y: 194, months: [8, 9], peak: '8–9 月', lx: 214, ly: 186,
    note: '加勒比海北缘。产卵通常在 8–9 月的满月后几个夜晚。',
    fact: '和澳洲的 10–12 月刚好错开半年。' },
  { id: 'curacao', name: '库拉索', x: 306, y: 232, months: [9, 10], peak: '9–10 月', lx: 246, ly: 240,
    note: '加勒比海南部，常见种在秋季满月后产卵。',
    fact: '同一片海域，不同礁点的日期也会差几天。' },
  { id: 'moorea', name: '莫雷阿岛', x: 86, y: 312, months: [10, 11], peak: '10–11 月', lx: 96, ly: 304,
    note: '法属波利尼西亚。南半球的春季，对应北半球的 4–5 月。',
    fact: '越靠近赤道，季节信号越弱，产卵越依赖月相。' }
];

const MAP = {
  icon: '🗺️',
  kicker: '板块 3 · 全球视野',
  title: '全球产卵时间地图',
  desc: '同一种珊瑚，在南北半球会在完全不同的月份产卵。',

  render() {
    return `
    <div class="map-wrap">
      <svg viewBox="0 0 1000 520" class="world-map">
        <g stroke="rgba(120,190,210,.07)" stroke-width="1">
          ${[80, 160, 240, 320, 400].map(y => `<line x1="0" y1="${y}" x2="1000" y2="${y}"/>`).join('')}
          ${[100, 200, 300, 400, 500, 600, 700, 800, 900].map(x => `<line x1="${x}" y1="0" x2="${x}" y2="520"/>`).join('')}
        </g>
        <g fill="rgba(110,190,215,.10)" stroke="rgba(140,215,235,.26)" stroke-width="1.2">
          <path d="M95 78 L150 58 L210 66 L262 92 L286 124 L268 152 L236 166 L244 196 L214 218 L188 196 L172 164 L140 150 L118 118 Z"/>
          <path d="M258 228 L300 216 L326 240 L334 288 L322 330 L306 372 L288 402 L276 362 L266 318 L254 274 Z"/>
          <path d="M452 96 L500 84 L534 96 L540 120 L520 140 L494 150 L470 136 L458 116 Z"/>
          <path d="M470 166 L548 158 L572 192 L566 244 L548 300 L526 340 L504 302 L492 250 L478 206 Z"/>
          <path d="M542 78 L620 62 L706 70 L772 92 L800 124 L780 158 L746 172 L716 196 L686 212 L656 200 L628 174 L590 160 L558 128 Z"/>
          <path d="M780 330 L848 322 L872 348 L858 382 L816 392 L786 368 Z"/>
          <path d="M900 396 L940 392 L952 418 L920 430 L898 414 Z"/>
          <path d="M330 70 L366 62 L382 82 L362 98 L332 92 Z"/>
          <path d="M348 250 L372 244 L378 258 L356 264 Z"/>
        </g>
        <g id="mapMarkers"></g>
        <text x="24" y="506" style="font-size:10px;fill:#4e7184">示意图，仅表示大致位置与月份</text>
      </svg>
      <div class="month-strip" id="monthStrip"></div>
    </div>

    <div class="map-detail">
      <div class="panel" id="mapInfo"></div>
      <div>
        <div class="reef-list" id="reefList"></div>
        <div class="note" style="margin-top:14px">
          <b>共同点：</b>不管在南半球还是北半球，大产卵都发生在<b>暖季</b>的<b>满月之后</b>。
          月份会变，月相不会。
        </div>
      </div>
    </div>
    ${quizCTA('map', '地图看完了？来答题')}`;
  },

  init(root) {
    const markers = $('#mapMarkers', root);
    const list = $('#reefList', root);
    const info = $('#mapInfo', root);
    const strip = $('#monthStrip', root);
    const visited = new Set();

    markers.innerHTML = REEFS.map(r => `
      <g class="map-marker" data-id="${r.id}">
        <circle class="pulse" cx="${r.x}" cy="${r.y}" r="5" fill="rgba(255,143,163,.45)"/>
        <circle cx="${r.x}" cy="${r.y}" r="4.6" fill="#ff8fa3" stroke="#fff" stroke-width="1.4"/>
        <text x="${r.lx}" y="${r.ly}" text-anchor="${r.lx < r.x ? 'end' : 'start'}">${r.name}</text>
      </g>`).join('');

    list.innerHTML = REEFS.map(r => `<button data-id="${r.id}">${r.name}</button>`).join('');
    strip.innerHTML = Array.from({ length: 12 }, (_, i) =>
      `<span data-m="${i + 1}">${i + 1}月</span>`).join('');

    function select(id) {
      const r = REEFS.find(x => x.id === id);
      $$('.map-marker', root).forEach(m => m.classList.toggle('sel', m.dataset.id === id));
      $$('#reefList button', root).forEach(b => b.classList.toggle('on', b.dataset.id === id));

      info.innerHTML = `
        <p class="kicker">${r.peak} · 大产卵</p>
        <h3>${r.name}</h3>
        <p class="sub">${r.months.map(m => m + '月').join(' · ')}</p>
        <p>${r.note}</p>
        <div class="note" style="margin-top:12px">${r.fact}</div>`;

      $$('#monthStrip span', root).forEach(s => {
        const m = Number(s.dataset.m);
        s.classList.toggle('on', r.months.includes(m));
        s.classList.toggle('core', m === r.months[Math.floor(r.months.length / 2)]);
      });

      if (!visited.has(id)) {
        visited.add(id);
        collect('map-' + id, 200, r.name);
        if (visited.size >= 5 && !State.parts['map-all']) {
          State.parts['map-all'] = true;
          saveState();
          addMoney(500);
          markDone('map');
        }
      }
    }

    $$('.map-marker', root).forEach(m => m.addEventListener('click', () => select(m.dataset.id)));
    $$('#reefList button', root).forEach(b => b.addEventListener('click', () => select(b.dataset.id)));

    select('gbr');
  }
};

/* ============================================================
   板块 4：精卵束的漂流旅程
   ============================================================ */
const JOURNEY = [
  { t: 'T+0 · 日落之后', title: '释放', emoji: '🪸',
    text: '天黑后 1–2 小时，珊瑚虫把精卵束从口道推出来。整片礁区像约好了一样，同时开始。' },
  { t: '几分钟内', title: '上浮', emoji: '🎈',
    text: '卵里的蜡酯比水轻，像小气球一样把整束托向海面。精子在束里一动不动。' },
  { t: '到达海面 · 30 分钟内', title: '破裂受精', emoji: '💥',
    text: '束膜破裂，精子被海水稀释后激活，开始绕圈、然后直线冲向同种卵子。卵立即硬化，挡住后来的精子。' },
  { t: '2–4 小时', title: '第一次分裂', emoji: '🧫',
    text: '受精卵开始分裂。到第二天清晨，它已经变成一个会动的胚胎。' },
  { t: '24–36 小时', title: '浮浪幼虫', emoji: '🐟',
    text: '长出纤毛，能自己游动。它随洋流漂几天到几周，这段时间几乎不进食，靠卵里的脂质供能。' },
  { t: '数天–数周', title: '附着变态', emoji: '🪨',
    text: '被珊瑚藻（crustose coralline algae）的化学信号"点名"，落到礁石上，变态成一个珊瑚虫，再不断出芽长成群体。' }
];

const JOURNEY_MOD = {
  icon: '🌊',
  kicker: '板块 4 · 生活史',
  title: '精卵束的漂流旅程',
  desc: '跟着一束精卵，从珊瑚口道一路走到新礁石。',

  render() {
    const wave = Array.from({ length: 14 }, (_, k) => `T ${k * 60} 48`).join(' ');
    const bubbles = [[90,10],[210,7],[330,12],[450,8],[540,14],[640,9],[280,16],[600,18]]
      .map(([x, r], i) => `<circle cx="${x}" cy="570" r="${r}" style="animation-duration:${8 + (i % 4) * 2}s;animation-delay:${-i * 1.7}s"/>`).join('');
    return `
    <div class="journey-layout">
      <div class="journey-visual">
        <div class="j-scene-wrap">
          <svg id="jScene" viewBox="0 0 720 560">
            <defs>
              <linearGradient id="jWater" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#0e3d59"/>
                <stop offset="45%" stop-color="#082840"/>
                <stop offset="100%" stop-color="#03101d"/>
              </linearGradient>
            </defs>
            <rect width="720" height="560" fill="url(#jWater)"/>
            <rect width="720" height="48" fill="#060d19"/>
            <circle cx="636" cy="24" r="11" fill="#f4eed6"/>
            <circle cx="632" cy="21" r="3" fill="#e2dab8" opacity=".6"/>
            <circle cx="80" cy="18" r="1.4" fill="#cfe6ff" class="j-star"/>
            <circle cx="180" cy="30" r="1.1" fill="#cfe6ff" class="j-star" style="animation-delay:-1s"/>
            <circle cx="420" cy="14" r="1.2" fill="#cfe6ff" class="j-star" style="animation-delay:-2s"/>
            <g class="j-waveband"><path d="M-60 48 Q -30 40 0 48 ${wave}" fill="rgba(127,212,255,.16)"/></g>
            <g opacity=".5">
              <polygon class="j-ray" points="150,48 230,48 190,560 120,560" fill="rgba(160,220,255,.05)"/>
              <polygon class="j-ray" points="420,48 480,48 520,560 440,560" fill="rgba(160,220,255,.04)" style="animation-delay:-2s"/>
            </g>
            <g class="j-bubbles" fill="rgba(170,220,255,.28)">${bubbles}</g>
            <path d="M0 522 Q 180 502 360 516 T 720 512 L720 560 0 560 Z" fill="#0a1f2e"/>
            <ellipse cx="560" cy="514" rx="78" ry="20" fill="#133043"/>

            <g id="jCoral" transform="translate(140,524)">
              <rect x="-32" y="-38" width="14" height="40" rx="7" fill="#8f4258"/>
              <rect x="-9" y="-52" width="17" height="54" rx="8" fill="#b5576f"/>
              <rect x="16" y="-32" width="14" height="34" rx="7" fill="#8f4258"/>
              <g id="jCoralMouth" transform="translate(0,-54)">
                <ellipse cx="0" cy="0" rx="12" ry="6" fill="#e98aa6"/>
                <g class="j-tents" stroke="#f3a9bf" stroke-width="2.4" stroke-linecap="round">
                  <line x1="-9" y1="-2" x2="-13" y2="-11"/>
                  <line x1="0" y1="-4" x2="0" y2="-14"/>
                  <line x1="9" y1="-2" x2="13" y2="-11"/>
                </g>
              </g>
            </g>

            <g id="jBundle" class="j-actor">
              <g class="j-wobble">
                <circle cx="0" cy="0" r="11" fill="#ff9fb4" stroke="#ffd3de" stroke-width="1.4"/>
                <circle cx="-10" cy="-7" r="7.5" fill="#ffb3c5" stroke="#ffd3de" stroke-width="1.2"/>
                <circle cx="10" cy="-8" r="7.5" fill="#ffb3c5" stroke="#ffd3de" stroke-width="1.2"/>
                <circle cx="-9" cy="8" r="7" fill="#ff8fa9" stroke="#ffd3de" stroke-width="1.2"/>
                <circle cx="10" cy="8" r="7" fill="#ff8fa9" stroke="#ffd3de" stroke-width="1.2"/>
              </g>
            </g>

            <g id="jBurst" class="j-actor" opacity="0">
              <circle cx="-30" cy="-12" r="14" fill="#ffc9d6"/>
              <circle cx="20" cy="10" r="14" fill="#ffc9d6"/>
              <circle class="j-hardring" cx="20" cy="10" r="14" fill="none" stroke="#9fe8ff" stroke-width="2.5"/>
              <g class="j-sperm" fill="#bfeaff">
                <circle cx="-62" cy="-4" r="2.2"/>
                <circle cx="-48" cy="16" r="2.2" class="j-dart-a"/>
                <circle cx="-40" cy="-20" r="2.2"/>
                <circle cx="-18" cy="26" r="2.2"/>
                <circle cx="50" cy="-18" r="2.2" class="j-dart-b"/>
                <circle cx="62" cy="6" r="2.2"/>
                <circle cx="44" cy="22" r="2.2"/>
                <circle cx="24" cy="-32" r="2.2"/>
              </g>
            </g>

            <g id="jEmbryo" class="j-actor" opacity="0">
              <g class="j-div j-div1 on"><circle r="14" fill="#ffe0ea" stroke="#ffd3de" stroke-width="1.4"/></g>
              <g class="j-div j-div2" opacity="0">
                <circle cx="-10" cy="0" r="11" fill="#ffe0ea" stroke="#ffd3de" stroke-width="1.4"/>
                <circle cx="10" cy="0" r="11" fill="#ffe0ea" stroke="#ffd3de" stroke-width="1.4"/>
              </g>
              <g class="j-div j-div4" opacity="0">
                <circle cx="-10" cy="-10" r="9" fill="#ffe0ea" stroke="#ffd3de" stroke-width="1.3"/>
                <circle cx="10" cy="-10" r="9" fill="#ffe0ea" stroke="#ffd3de" stroke-width="1.3"/>
                <circle cx="-10" cy="10" r="9" fill="#ffe0ea" stroke="#ffd3de" stroke-width="1.3"/>
                <circle cx="10" cy="10" r="9" fill="#ffe0ea" stroke="#ffd3de" stroke-width="1.3"/>
              </g>
            </g>

            <g id="jLarva" class="j-actor" opacity="0">
              <g class="j-swim">
                <g class="j-cilia" stroke="#ffe2ae" stroke-width="1.6" stroke-linecap="round">
                  <line x1="-17" y1="0" x2="-23" y2="0"/><line x1="17" y1="0" x2="23" y2="0"/>
                  <line x1="-14" y1="-7" x2="-19" y2="-11"/><line x1="14" y1="-7" x2="19" y2="-11"/>
                  <line x1="-14" y1="7" x2="-19" y2="11"/><line x1="14" y1="7" x2="19" y2="11"/>
                  <line x1="0" y1="-11" x2="0" y2="-17"/><line x1="0" y1="11" x2="0" y2="17"/>
                </g>
                <ellipse rx="17" ry="11" fill="#ffd28f" stroke="#ffe6bd" stroke-width="1.4"/>
                <circle cx="-5" cy="-3" r="4" fill="#ffefc4"/>
              </g>
            </g>

            <g id="jPolyp" transform="translate(560,508)" opacity="0">
              <rect x="-6" y="-16" width="12" height="18" rx="6" fill="#d97fa0"/>
              <g class="j-tents2" stroke="#f3a9bf" stroke-width="2" stroke-linecap="round">
                <line x1="-6" y1="-14" x2="-10" y2="-24"/>
                <line x1="0" y1="-16" x2="0" y2="-27"/>
                <line x1="6" y1="-14" x2="10" y2="-24"/>
                <line x1="-10" y1="-10" x2="-17" y2="-17"/>
                <line x1="10" y1="-10" x2="17" y2="-17"/>
              </g>
              <g class="j-buds" opacity="0">
                <circle cx="-12" cy="-6" r="3" fill="#e98aa6"/>
                <circle cx="12" cy="-5" r="3" fill="#e98aa6"/>
              </g>
            </g>

            <text x="16" y="548" style="font-size:10px;fill:#3f6478">满月后的夜晚 · 礁区水层剖面（示意）</text>
          </svg>
          <div class="j-caption">
            <div class="jv-time" id="jvTime"></div>
            <div class="jv-title" id="jvTitle"></div>
          </div>
        </div>
        <div class="j-controls">
          <button class="btn primary" id="btnPlayJourney">▶ 自动播放</button>
          <button class="btn" id="btnJourneyStep">下一站 →</button>
          <button class="btn" id="btnJourneyReset">↺ 回到起点</button>
        </div>
        <p class="jv-text" id="jvText" style="text-align:center;max-width:60ch;margin:10px auto 0"></p>
      </div>
      <div class="timeline" id="timeline">
        ${JOURNEY.map((s, i) => `<div class="tl-item ${i === 0 ? 'on' : ''}" data-i="${i}">
          <span class="tl-dot"></span>
          <div class="tl-card">
            <h4>${s.title}<span>${s.t}</span></h4>
            <p>${s.text}</p>
          </div>
        </div>`).join('')}
      </div>
    </div>
    ${quizCTA('journey', '旅程记住了？来答题')}`;
  },

  init(root) {
    const bundle = $('#jBundle', root);
    const burst = $('#jBurst', root);
    const embryo = $('#jEmbryo', root);
    const larva = $('#jLarva', root);
    const polyp = $('#jPolyp', root);
    const coral = $('#jCoral', root);
    const seen = new Set();
    let current = 0;
    let timer = null;
    let stageTimers = [];

    const POS = {
      mouth: [140, 448],
      surface: [360, 96],
      embryo: [420, 150],
      larva: [430, 185],
      settle: [560, 468]
    };

    function clearStage() {
      stageTimers.forEach(clearTimeout);
      stageTimers = [];
    }
    const later = (fn, ms) => stageTimers.push(setTimeout(fn, ms));

    function place(el, x, y, ms = 2200) {
      el.style.transition = `transform ${ms}ms ease-in-out, opacity .5s`;
      el.style.transform = `translate(${x}px, ${y}px)`;
    }
    function setVis(el, on = true) {
      el.style.transition = el.style.transition || 'opacity .5s';
      el.style.opacity = on ? 1 : 0;
    }

    function show(i) {
      clearStage();
      current = i;
      const s = JOURNEY[i];
      $('#jvTime', root).textContent = s.t;
      $('#jvTitle', root).textContent = s.title;
      $('#jvText', root).textContent = s.text;
      $$('.tl-item', root).forEach((el, k) => {
        el.classList.toggle('on', k === i);
        el.classList.toggle('done', seen.has(k) && k !== i);
      });

      if (i === 0) {
        setVis(burst, false); setVis(embryo, false); setVis(larva, false); setVis(polyp, false);
        setVis(bundle, false);
        place(bundle, POS.mouth[0], POS.mouth[1], 0);
        coral.classList.add('spawning');
        later(() => { setVis(bundle, true); place(bundle, POS.mouth[0], POS.mouth[1] - 28, 800); }, 650);
      }
      if (i === 1) {
        coral.classList.remove('spawning');
        setVis(burst, false); setVis(embryo, false); setVis(larva, false);
        place(bundle, POS.mouth[0], POS.mouth[1] - 28, 0);
        setVis(bundle, true);
        later(() => place(bundle, POS.surface[0], POS.surface[1], 2800), 350);
      }
      if (i === 2) {
        setVis(bundle, false); setVis(embryo, false); setVis(larva, false);
        place(burst, POS.surface[0], POS.surface[1], 0);
        setVis(burst, true);
        const ring = $('.j-hardring', root);
        if (ring) {
          ring.classList.remove('go');
          later(() => ring.classList.add('go'), 1500);
        }
      }
      if (i === 3) {
        setVis(burst, false); setVis(larva, false);
        place(embryo, POS.embryo[0], POS.embryo[1], 0);
        setVis(embryo, true);
        const d1 = $('.j-div1', root), d2 = $('.j-div2', root), d4 = $('.j-div4', root);
        d1.classList.add('on'); d2.classList.remove('on'); d4.classList.remove('on');
        later(() => { d1.classList.remove('on'); d2.classList.add('on'); }, 1500);
        later(() => { d2.classList.remove('on'); d4.classList.add('on'); }, 3000);
      }
      if (i === 4) {
        setVis(embryo, false);
        place(larva, POS.larva[0], POS.larva[1], 0);
        setVis(larva, true);
      }
      if (i === 5) {
        place(larva, POS.settle[0], POS.settle[1], 2600);
        later(() => { setVis(larva, false); setVis(polyp, true); }, 2700);
        later(() => { const b = $('.j-buds', root); if (b) b.style.opacity = 1; }, 3900);
      }

      if (!seen.has(i)) {
        seen.add(i);
        collect('journey-' + i, 200, s.title);
      }
      if (seen.size === JOURNEY.length && !State.parts['journey-all']) {
        State.parts['journey-all'] = true;
        saveState();
        addMoney(500);
        markDone('journey');
      }
    }

    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
      const b = $('#btnPlayJourney', root);
      if (b) b.textContent = '▶ 自动播放';
    }

    $$('.tl-item', root).forEach(el => el.addEventListener('click', () => {
      stop();
      show(Number(el.dataset.i));
    }));

    $('#btnPlayJourney', root).addEventListener('click', () => {
      if (timer) { stop(); return; }
      $('#btnPlayJourney', root).textContent = '⏸ 暂停';
      show(0);
      timer = setInterval(() => {
        if (current >= JOURNEY.length - 1) { stop(); return; }
        show(current + 1);
      }, 5200);
    });

    $('#btnJourneyStep', root).addEventListener('click', () => {
      stop();
      show(Math.min(current + 1, JOURNEY.length - 1));
    });

    $('#btnJourneyReset', root).addEventListener('click', () => {
      stop();
      show(0);
    });

    larva.addEventListener('click', () => {
      if (current !== 4) return;
      const swim = $('.j-swim', larva);
      if (swim) {
        swim.classList.add('dash');
        later(() => swim.classList.remove('dash'), 950);
      }
      discover('journey-swim', '纤毛快艇', '浮浪幼虫靠全身纤毛摆动游泳，还能感应洋流方向。', 150);
    });

    show(0);
  }
};
