/* ============================================================
   modules3.js — 深浅水 / 满月 / 防晒霜 / 题库 / 模块表
   ============================================================ */

/* ============================================================
   板块 5：浅水 vs 深水
   ============================================================ */
const DEPTH = {
  icon: '☀️',
  kicker: '板块 5 · 小实验',
  title: '浅水 vs 深水：防晒大作战',
  desc: '同样受紫外线照射，为什么浅水的卵活得更久？',

  render() {
    return `
    <div class="depth-layout">
      <div class="depth-stage">
        <div class="tank" id="tankShallow">
          <div class="uv"></div>
          <div class="tank-label"><b>浅水 · 3 米</b><span>MAA 高</span></div>
          <div class="eggs-field" id="eggsShallow"></div>
          <div class="maa">防晒物质 MAA<b>高</b>
            <div class="maa-bar"><i style="width:95%"></i></div>
          </div>
        </div>
        <div class="tank deep" id="tankDeep">
          <div class="uv"></div>
          <div class="tank-label"><b>深水 · 24 米</b><span>MAA 低</span></div>
          <div class="eggs-field" id="eggsDeep"></div>
          <div class="maa">防晒物质 MAA<b>低</b>
            <div class="maa-bar"><i style="width:32%"></i></div>
          </div>
        </div>
      </div>

      <div class="panel result-panel">
        <h3>紫外线实验</h3>
        <p>把两批卵同时放到海面，接受同样的紫外线。看看谁撑得住。</p>
        <div class="result-row"><span>紫外线</span><b id="uvState">关闭</b></div>
        <div class="result-row"><span>浅水卵存活</span><b id="resShallow">—</b></div>
        <div class="result-row"><span>深水卵存活</span><b id="resDeep">—</b></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px">
          <button class="btn" id="btnUV">打开紫外线</button>
          <button class="btn primary" id="btnRun">开始实验</button>
        </div>
        <p class="small muted" style="margin-top:4px">简化模拟，比例参考 MAA 深度差异研究。</p>
        <button class="btn ghost" id="btnResetTank" style="align-self:flex-start">重置卵</button>
      </div>
    </div>

    <div class="note">
      <b>结论：</b>浅水母体的卵，MAA 更多，在强紫外下存活率更高。
      这也意味着——<b>礁区补充的新个体，多半来自浅水母体</b>。
      而浅水，恰恰是最容易受变暖冲击的地方。
    </div>
    ${quizCTA('depth', '实验结果记住了？来答题')}`;
  },

  init(root) {
    const shallowField = $('#eggsShallow', root);
    const deepField = $('#eggsDeep', root);
    const tankS = $('#tankShallow', root);
    const tankD = $('#tankDeep', root);
    let uvOn = false;
    let ranUV = false;
    let ranDark = false;
    let busy = false;

    function fill(field, n) {
      field.innerHTML = '';
      for (let i = 0; i < n; i++) {
        const d = document.createElement('div');
        d.className = 'egg-dot';
        field.appendChild(d);
      }
      return Array.from(field.children);
    }

    function reset() {
      if (busy) return;
      fill(shallowField, 48);
      fill(deepField, 48);
      $('#resShallow', root).textContent = '—';
      $('#resDeep', root).textContent = '—';
      tankS.classList.remove('uv-on');
      tankD.classList.remove('uv-on');
      uvOn = false;
      $('#uvState', root).textContent = '关闭';
      $('#btnUV', root).textContent = '打开紫外线';
    }

    function run() {
      if (busy) return;
      const shallowEggs = $$('.egg-dot', shallowField);
      const deepEggs = $$('.egg-dot', deepField);
      shallowEggs.forEach(e => e.classList.remove('dead'));
      deepEggs.forEach(e => e.classList.remove('dead'));

      const sRate = uvOn ? 0.88 : 0.98;
      const dRate = uvOn ? 0.44 : 0.97;
      busy = true;

      shallowEggs.forEach((e, i) => {
        if (Math.random() > sRate) setTimeout(() => e.classList.add('dead'), 300 + i * 18);
      });
      deepEggs.forEach((e, i) => {
        if (Math.random() > dRate) setTimeout(() => e.classList.add('dead'), 300 + i * 18);
      });

      setTimeout(() => {
        const sAlive = shallowEggs.filter(e => !e.classList.contains('dead')).length;
        const dAlive = deepEggs.filter(e => !e.classList.contains('dead')).length;
        $('#resShallow', root).textContent = sAlive + ' / 48 · ' + Math.round(sAlive / 48 * 100) + '%';
        $('#resDeep', root).textContent = dAlive + ' / 48 · ' + Math.round(dAlive / 48 * 100) + '%';
        busy = false;

        if (uvOn) {
          if (!ranUV) {
            ranUV = true;
            collect('depth-first', 200, '第一次紫外线实验');
          }
          if (!State.parts['depth-uv']) {
            State.parts['depth-uv'] = true;
            saveState();
            addMoney(100);
            toast('☀️ 紫外线开着：深水卵死得明显更多');
          }
          if (ranDark && !State.parts['depth-all']) {
            State.parts['depth-all'] = true;
            saveState();
            addMoney(500);
            markDone('depth');
          }
        } else {
          if (!ranDark) {
            ranDark = true;
            collect('depth-dark', 200, '关灯对照组');
            toast('🌑 没有紫外线，两批卵几乎都活着');
          }
          if (ranUV && !State.parts['depth-all']) {
            State.parts['depth-all'] = true;
            saveState();
            addMoney(500);
            markDone('depth');
          }
        }

        if (uvOn && dAlive < sAlive - 10) {
          discover('depth-gap', '防晒的差距', '同样强紫外下，浅水卵的存活率明显高于深水卵。', 100);
        }
      }, 1500);
    }

    $('#btnUV', root).addEventListener('click', () => {
      uvOn = !uvOn;
      tankS.classList.toggle('uv-on', uvOn);
      tankD.classList.toggle('uv-on', uvOn);
      $('#uvState', root).textContent = uvOn ? '开' : '关闭';
      $('#btnUV', root).textContent = uvOn ? '关闭紫外线' : '打开紫外线';
    });

    $('#btnRun', root).addEventListener('click', run);
    $('#btnResetTank', root).addEventListener('click', reset);

    fill(shallowField, 48);
    fill(deepField, 48);
  }
};

/* ============================================================
   板块 6：为什么是满月
   ============================================================ */
const MOON = {
  icon: '🌕',
  kicker: '板块 6 · 月相',
  title: '为什么是满月之后？',
  desc: '月亮不只是照亮海面，它还是珊瑚的同步时钟。',

  render() {
    return `
    <div class="moon-layout">
      <div class="moon-hero">
        <div class="big-moon" id="bigMoon"></div>
        <div class="moon-caption" id="moonCap">满月当天 · 潮差最大</div>
        <div class="tide-box" style="width:100%">
          <div class="tide-track"><i id="tideBar"></i></div>
          <div class="tide-labels"><span>潮差小 · 水流缓</span><span>潮差大</span></div>
        </div>
      </div>

      <div class="panel">
        <h3>满月不是开关，是时钟</h3>
        <p>满月前，月光一夜夜变亮，珊瑚用体内的光敏蛋白"对表"。等到满月之后，月光开始变弱，产卵的窗口打开。</p>
        <div class="ctrl" style="margin-top:14px">
          <div class="ctrl-head"><label>满月之后第几天</label><span id="moonDay">0 天</span></div>
          <input type="range" id="moonSlider" min="0" max="14" step="1" value="0">
        </div>
        <div class="cal-strip" id="calStrip"></div>
        <div class="note" id="moonNote">满月当天潮差最大、水流最急。精卵束容易被冲散，所以珊瑚会再等几天。</div>
      </div>
    </div>

    <div class="two-col" style="margin-top:20px">
      <div class="card">
        <p class="kicker">两个作用</p>
        <h3>光对表，潮水选日子</h3>
        <ul style="margin:12px 0 0 18px;font-size:13px;line-height:2;color:#8fb3c4">
          <li><b style="color:#fff">月光</b>：满月前逐渐增强，作为同步信号，让整片礁区对到同一天。</li>
          <li><b style="color:#fff">潮汐</b>：满月后进入小潮期，潮差变小、水流变缓，精卵才能在海面停留、混合。</li>
        </ul>
      </div>
      <div class="card">
        <p class="kicker">一个反例</p>
        <h3>新月也会产卵，但不是大爆发</h3>
        <p>少数种类会在新月前后产卵。但规模最大的"大产卵"，通常锚定在满月之后的 1–9 天。</p>
        <button class="btn" style="margin-top:12px" id="btnNewMoon">如果改成新月会怎样？</button>
      </div>
    </div>
    ${quizCTA('moon', '月相搞懂了？来答题')}`;
  },

  init(root) {
    let day = 0;

    function tideValue(d) {
      return Math.abs(Math.cos(Math.PI * d / 14.8));
    }

    function label(d) {
      if (d === 0) return '满月当天 · 潮差最大';
      if (d >= 1 && d <= 9) return '满月后第 ' + d + ' 天 · 产卵窗口内';
      if (d === 7) return '满月后第 7 天 · 下弦，潮差最小';
      if (d >= 10) return '满月后第 ' + d + ' 天 · 窗口已过';
      return '满月后第 ' + d + ' 天';
    }

    function paint() {
      $('#bigMoon', root).innerHTML = moonSVG(day);
      $('#moonDay', root).textContent = day + ' 天';
      $('#tideBar', root).style.width = Math.round(tideValue(day) * 100) + '%';
      let cap = label(day);
      if (day === 7) cap = '满月后第 7 天 · 下弦 · 潮差最小';
      $('#moonCap', root).textContent = cap;

      $$('#calStrip .cal-day', root).forEach(el => {
        const d = Number(el.dataset.d);
        el.classList.toggle('sel', d === day);
        el.classList.toggle('full', d === 0);
        el.classList.toggle('win', d >= 1 && d <= 9 && d !== day);
      });

      const note = $('#moonNote', root);
      if (day === 0) {
        note.innerHTML = '满月当天潮差最大、水流最急。精卵束容易被冲散，所以珊瑚会再等几天。';
      } else if (day >= 1 && day <= 6) {
        note.innerHTML = '第 <b>' + day + '</b> 天：月光还够亮，潮差在变小。这是产卵窗口的前半段。';
      } else if (day === 7) {
        note.innerHTML = '第 <b>7</b> 天：下弦，潮差最小、水流最缓。精卵束最容易在海面停留、混合。';
      } else if (day === 8 || day === 9) {
        note.innerHTML = '第 <b>' + day + '</b> 天：窗口的尾巴。再晚，月光太弱，同步信号就散了。';
      } else {
        note.innerHTML = '第 <b>' + day + '</b> 天：窗口已经过去。下一次，要等下一个满月。';
      }

      if (day === 3) discover('moon-delay', '为什么不选满月当天', '满月当天潮差最大、水流最急，精卵束容易被冲散。', 100);
      if (day === 7) discover('moon-neap', '小潮', '满月后约一周是下弦，潮差最小、水流最缓。', 100);
      if (day === 9) discover('moon-edge', '窗口边缘', '满月后 9 天左右，产卵窗口逐渐关闭。', 100);
      if (['moon-delay', 'moon-neap', 'moon-edge'].every(k => State.eggs[k]) && !State.parts['moon-all']) {
        State.parts['moon-all'] = true;
        saveState();
        addMoney(500);
        markDone('moon');
      }
    }

    $('#calStrip', root).innerHTML = Array.from({ length: 15 }, (_, d) =>
      `<button class="cal-day" data-d="${d}">${d}</button>`).join('');

    $$('#calStrip .cal-day', root).forEach(el => el.addEventListener('click', () => {
      day = Number(el.dataset.d);
      $('#moonSlider', root).value = day;
      paint();
    }));

    $('#moonSlider', root).addEventListener('input', e => {
      day = Number(e.target.value);
      paint();
    });

    $('#btnNewMoon', root).addEventListener('click', () => {
      openModal(`
        <p class="kicker">反例</p>
        <h2>新月也能产卵，但规模不同</h2>
        <p>新月同样有大潮。少数珊瑚会在新月前后产卵，但那种"整片礁区同一夜"的大爆发，通常发生在满月之后。</p>
        <p>原因之一是：满月前那段逐渐变亮的月光，是更稳定的同步信号。所有珊瑚都能"看见"它。</p>
        <div class="modal-actions"><button class="btn primary" data-close>明白了</button></div>
      `);
      discover('moon-new', '新月的例外', '少数珊瑚在新月产卵，但大爆发通常在满月后。', 100);
    });

    paint();
  }
};

/* ============================================================
   板块 7：防晒霜与珊瑚
   ============================================================ */
const MYTHS = [
  {
    q: '防晒霜是珊瑚白化的主要原因。',
    truth: false,
    why: '白化的主因是<b>海水变暖</b>。防晒霜是局部压力，在游客密集的海湾会更明显，但它不是全球白化的主因。把责任全推给防晒霜，会掩盖真正的问题。'
  },
  {
    q: '氧苯酮（oxybenzone）等成分会伤害珊瑚幼虫。',
    truth: true,
    why: '实验显示，这类化学防晒成分可造成珊瑚白化、DNA 损伤、内分泌干扰，以及幼虫畸形。在旅游区海水中确实能检测到。'
  },
  {
    q: '只要涂了防晒霜下水，珊瑚就一定会死。',
    truth: false,
    why: '要看成分、浓度、停留时间和水体交换。不需要恐慌，但可以选更友好的方式：物理遮挡、矿物防晒。'
  },
  {
    q: '穿防晒衣、选礁石友好防晒，比什么都不涂更保护珊瑚。',
    truth: true,
    why: '物理遮挡最稳。矿物防晒（非纳米氧化锌、二氧化钛）通常被认为更友好。所谓"reef-safe"标签各国监管不一，仍要看成分。'
  }
];

const SUNSCREEN = {
  icon: '🧴',
  kicker: '板块 7 · 真相',
  title: '防晒霜与珊瑚：真相还是误会？',
  desc: '哪些说法是真的，哪些只是把责任推给了游客？',

  render() {
    return `
    <div class="myth-list" id="mythList">
      ${MYTHS.map((m, i) => `<div class="myth" data-i="${i}">
        <div class="myth-head">
          <span class="q">Q${i + 1}</span>
          <h4>${m.q}</h4>
        </div>
        <div class="myth-btns">
          <button data-v="1">真相</button>
          <button data-v="0">误会</button>
        </div>
        <div class="myth-fb"></div>
      </div>`).join('')}
    </div>

    <div class="card" style="margin-top:20px">
      <p class="kicker">换你选</p>
      <h3>明天去浮潜，你怎么办？</h3>
      <p style="margin-top:6px">选一个方案，看看它对珊瑚和皮肤分别意味着什么。</p>
      <div class="choice-grid" id="choiceGrid">
        <button class="choice" data-c="0"><b>穿长袖防晒衣 + 帽子</b>物理遮挡，不下水也晒不到。</button>
        <button class="choice" data-c="1"><b>涂非纳米氧化锌防晒</b>矿物防晒，相对更友好。</button>
        <button class="choice" data-c="2"><b>涂含氧苯酮的化学防晒</b>清爽好推，但成分有争议。</button>
        <button class="choice" data-c="3"><b>什么都不涂</b>觉得"不涂最环保"。晒伤警告。</button>
      </div>
      <div class="note" id="choiceNote" style="display:none"></div>
    </div>
    ${quizCTA('sunscreen', '真相分清了？来答题')}`;
  },

  init(root) {
    let answered = 0;

    function answer(card, idx, val) {
      if (card.classList.contains('answered')) return;
      const m = MYTHS[idx];
      const ok = (val === 1) === m.truth;
      card.classList.add('answered', ok ? 'right' : 'wrong');
      card.querySelector('.myth-fb').innerHTML =
        `<b style="color:${ok ? '#6ee7a8' : '#ff8fa3'}">${ok ? '判断正确' : '再想想'}</b> · ${m.why}
         <div style="margin-top:6px;color:#ffd166">正确答案：${m.truth ? '真相' : '误会'}</div>`;
      if (!card.dataset.done) {
        card.dataset.done = '1';
        answered++;
        addMoney(200);
        if (ok) toast('✅ 判断正确 · +200亿');
      }
      if (answered === MYTHS.length) {
        markDone('sunscreen');
        discover('sunscreen-all', '分清主次', '气候变化才是珊瑚白化的主因，防晒霜是局部压力。', 100);
      }
    }

    $$('.myth', root).forEach(card => {
      const idx = Number(card.dataset.i);
      $$('.myth-btns button', card).forEach(b => {
        b.addEventListener('click', () => answer(card, idx, Number(b.dataset.v)));
      });
    });

    const outcomes = [
      { t: '最佳选择', d: '不往水里加任何东西，也保护了自己。防晒衣是珊瑚礁最友好的"防晒霜"。', cls: 'good' },
      { t: '不错的选择', d: '矿物防晒对珊瑚相对友好。注意选"非纳米"配方，减少颗粒被摄取的可能。', cls: 'good' },
      { t: '有风险', d: '氧苯酮在旅游区海水中被检出，与珊瑚白化、幼虫畸形有关。能换就换。', cls: 'bad' },
      { t: '不推荐', d: '不涂会晒伤。晒伤脱皮之后，你可能更不想下水——但对珊瑚来说，这不算保护。', cls: 'bad' }
    ];

    $$('.choice', root).forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.choice', root).forEach(b => b.classList.remove('pick', 'good', 'bad'));
        const o = outcomes[Number(btn.dataset.c)];
        btn.classList.add('pick', o.cls);
        const note = $('#choiceNote', root);
        note.style.display = 'block';
        note.innerHTML = `<b>${o.t}：</b>${o.d}`;
        discover('sunscreen-choice', '你的选择', '物理遮挡 + 礁石友好防晒，是更稳妥的组合。', 100);
      });
    });
  }
};

/* ============================================================
   题库
   ============================================================ */
const QUIZZES = {
  lab: {
    easy: [{
      q: '珊瑚产卵需要几个条件同时满足？',
      options: ['1 个', '2 个', '4 个', '10 个'],
      answer: [2],
      why: '日照、水温、月相、时间，四个条件缺一不可。'
    }],
    medium: [{
      q: '下面哪些是珊瑚产卵的必要条件？',
      multi: true,
      options: ['日照变长', '下大雨', '水温回升到 26–28°C', '刮台风'],
      answer: [0, 2],
      why: '日照变长代表进入繁殖季；水温回升是精卵成熟的信号。下雨和台风都不是条件。'
    }, {
      q: '下面哪些属于"对的时间"？',
      multi: true,
      options: ['新月', '满月后 1–9 天', '日落后 1–2 小时', '中午时分'],
      answer: [1, 2],
      why: '大产卵发生在满月之后的几个夜晚，具体时刻是日落后 1–2 小时。'
    }],
    hard: [{
      q: '为什么是"满月后"，而不是满月当天？',
      options: ['满月当天太亮了', '满月后潮汐更稳定、水流更缓', '满月后水温更高', '随便选的'],
      answer: [1],
      why: '满月当天潮差最大、水流最急。满月后进入小潮期，精卵束才能在海面停留、混合。'
    }, {
      q: '为什么是"日落后 1–2 小时"？',
      multi: true,
      options: ['天黑了，捕食者看不见', '此时潮流最弱，精卵束不易被冲散', '白天太热', '珊瑚喜欢夜晚'],
      answer: [0, 1],
      why: '黑暗能避开白天活跃的捕食者；傍晚水流也相对平缓，利于精卵相遇。'
    }, {
      q: '如果只满足 3 个条件，会发生什么？',
      options: ['珊瑚会产卵，但数量少', '珊瑚不会产卵', '珊瑚会死亡', '没有影响'],
      answer: [1],
      why: '四个条件是"与"的关系，缺一个就不触发。这是珊瑚避免在错误时间浪费配子的策略。'
    }]
  },

  bundle: {
    easy: [{
      q: '精卵束里，精子团在什么位置？',
      options: ['外围', '正中央', '表面', '最外面'],
      answer: [1],
      why: '卵细胞排在外围，精子团被挤在正中央。'
    }],
    medium: [{
      q: '珊瑚精子没有下面哪个结构？',
      options: ['细胞核', '线粒体', '鞭毛', '典型顶体'],
      answer: [3],
      why: '珊瑚精子没有典型顶体，只有几个高尔基体来源的小囊泡。'
    }],
    hard: [{
      q: '为什么精子刚释放时不动？',
      options: ['还没长好', '要等海水稀释和卵子的化学信号', '在睡觉', '被黏液粘住了'],
      answer: [1],
      why: '精子在束里是静止的，被海水稀释、靠近同种卵子后才被激活，先绕圈再直线冲刺。'
    }]
  },

  egg: {
    easy: [{
      q: '卵细胞里提供浮力的主要是？',
      options: ['细胞核', '脂滴', '微绒毛', '皮层颗粒'],
      answer: [1],
      why: '脂滴以蜡酯为主，比水轻，把卵托向海面。'
    }],
    medium: [{
      q: 'MAA（防晒物质）主要来自？',
      options: ['珊瑚自己合成', '共生藻', '海水', '食物'],
      answer: [1],
      why: '动物没有合成 MAA 的莽草酸途径，只能靠共生藻合成，再由母体转运。'
    }],
    hard: [{
      q: '多数造礁珊瑚的卵带共生藻吗？',
      options: ['带，母体直接给', '不带，幼虫附着后从海水获取', '带，但会排掉', '只有深水种带'],
      answer: [1],
      why: '多数是水平传递：卵和幼虫都不带藻，附着后才从海水里获取。少数种类才垂直传递。'
    }]
  },

  map: {
    easy: [{
      q: '大堡礁的大产卵通常发生在几月？',
      options: ['3–4 月', '6–7 月', '10–12 月', '全年'],
      answer: [2],
      why: '大堡礁在南半球的春末夏初，10–12 月，峰值通常在 11 月。'
    }],
    medium: [{
      q: '南北半球产卵月份不同，共同点是？',
      options: ['都在冬天', '都在暖季的满月后', '都在新月', '都在中午'],
      answer: [1],
      why: '月份随半球变，但"暖季 + 满月后"这个组合不变。'
    }],
    hard: [{
      q: '为什么同一片大堡礁，内礁常常比外礁早产卵？',
      options: ['内礁水浅，升温更快', '内礁鱼更多', '外礁没有珊瑚', '内礁月光更强'],
      answer: [0],
      why: '浅水升温更快，更早达到产卵所需的水温阈值。'
    }]
  },

  journey: {
    easy: [{
      q: '精卵束从哪里被释放出来？',
      options: ['珊瑚虫的口道', '触手', '骨骼', '共生藻'],
      answer: [0],
      why: '精卵束从珊瑚虫的口道排出，然后向上浮。'
    }],
    medium: [{
      q: '受精后多久变成能游动的浮浪幼虫？',
      options: ['10 分钟', '2 小时', '24–36 小时', '1 个月'],
      answer: [2],
      why: '大约 24–36 小时，胚胎发育成有纤毛、能游动的浮浪幼虫。'
    }],
    hard: [{
      q: '浮浪幼虫靠什么找到落脚点？',
      options: ['阳光', '珊瑚藻的化学信号', '磁场', '同伴叫声'],
      answer: [1],
      why: '珊瑚藻（crustose coralline algae）释放化学信号，诱导幼虫附着、变态。'
    }]
  },

  depth: {
    easy: [{
      q: '浅水母体的卵，防晒物质通常？',
      options: ['更多', '更少', '一样', '没有'],
      answer: [0],
      why: '浅水紫外线更强，母体会给卵存更多 MAA。'
    }],
    medium: [{
      q: '把深水卵放到强紫外下，通常会？',
      options: ['活得更好', '死亡率更高', '马上孵化', '变成藻'],
      answer: [1],
      why: '深水卵 MAA 少，抗紫外能力弱，死亡率明显更高。'
    }],
    hard: [{
      q: '这个差异说明，礁区补充的新个体多来自？',
      options: ['深水母体', '浅水母体', '外海', '实验室'],
      answer: [1],
      why: '浅水母体的卵防晒更好、存活率更高，所以更容易补充到礁区。'
    }]
  },

  moon: {
    easy: [{
      q: '大产卵通常在满月后几天？',
      options: ['0 天', '1–9 天', '15 天', '不确定'],
      answer: [1],
      why: '满月之后的 1–9 天，是大多数造礁珊瑚的产卵窗口。'
    }],
    medium: [{
      q: '满月后一周左右，潮水有什么特点？',
      options: ['潮差最大', '潮差最小、水流最缓', '完全不动', '每天涨两次'],
      answer: [1],
      why: '满月后约一周是下弦，潮差最小，水流最缓，利于精卵停留。'
    }],
    hard: [{
      q: '珊瑚怎么"知道"月亮的变化？',
      options: ['看日历', '光敏蛋白感知月光', '听声音', '靠水温'],
      answer: [1],
      why: '珊瑚体内的光敏蛋白（如隐花色素）能感知月光强弱的变化，用来对表。'
    }]
  },

  sunscreen: {
    easy: [{
      q: '珊瑚白化的主要原因是？',
      options: ['防晒霜', '海水变暖', '游客触摸', '海浪'],
      answer: [1],
      why: '气候变化导致的海水变暖，是珊瑚白化的主因。'
    }],
    medium: [{
      q: '哪种防晒成分被研究认为对珊瑚有害？',
      options: ['氧化锌', '氧苯酮', '二氧化钛', '甘油'],
      answer: [1],
      why: '氧苯酮等化学滤光剂与珊瑚白化、DNA 损伤、幼虫畸形有关。'
    }],
    hard: [{
      q: '去珊瑚礁浮潜，最推荐的做法是？',
      options: ['不涂任何防晒', '涂含氧苯酮的防晒', '穿防晒衣 + 礁石友好防晒', '中午暴晒'],
      answer: [2],
      why: '物理遮挡最稳，再配合非纳米矿物防晒，既保护皮肤也减少对珊瑚的压力。'
    }]
  }
};

const QUIZ_REWARDS = {
  // 主实验是主线，奖励给得最重：三档全过 ≈ 28,000 亿
  lab: { easy: 4000, medium: 8000, hard: 16000 },
  bundle: { easy: 2500, medium: 5000, hard: 10000 },
  egg: { easy: 2500, medium: 5000, hard: 10000 },
  map: { easy: 2500, medium: 5000, hard: 10000 },
  journey: { easy: 2500, medium: 5000, hard: 10000 },
  depth: { easy: 2500, medium: 5000, hard: 10000 },
  moon: { easy: 2500, medium: 5000, hard: 10000 },
  sunscreen: { easy: 2500, medium: 5000, hard: 10000 }
};

const MODULES = {
  lab: LAB,
  bundle: BUNDLE,
  egg: EGG,
  map: MAP,
  journey: JOURNEY_MOD,
  depth: DEPTH,
  moon: MOON,
  sunscreen: SUNSCREEN
};
