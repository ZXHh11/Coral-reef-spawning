/* ============================================================
   main.js — 启动
   ============================================================ */

function showFinal() {
  showScreen('final');
  FX.storm(16000);
  setTimeout(() => {
    if ($('#screen-final').classList.contains('active')) FX.storm(6000);
  }, 9000);
}

(function boot() {
  loadState();
  initBubbles();
  bindGlobal();
  renderHud();
  renderHome();
  const introBg = $('#introBg');
  if (introBg && typeof reefSVG === 'function') introBg.innerHTML = reefSVG();
  showScreen('intro');

  const start = $('#btnStart');
  if (start) start.addEventListener('click', () => {
    showScreen('home');
    renderHud();
    openModule('lab');
    if (!State.money) {
      setTimeout(() => toast('先自己找出规律：调条件、下水看、守一夜', 4200), 600);
    }
  });

  const hint = $('.scroll-hint');
  if (hint) hint.addEventListener('click', () => showScreen('home'));

  let flipped = false;
  window.addEventListener('wheel', e => {
    if (!flipped && $('#screen-intro').classList.contains('active') && e.deltaY > 24) {
      flipped = true;
      showScreen('home');
    }
  }, { passive: true });

  const play = $('#btnFinalPlay');
  if (play) play.addEventListener('click', () => FX.storm(14000));

  // 直接打开某个板块（便于分享/调试）：?m=lab
  const params = new URLSearchParams(location.search);
  const jump = params.get('m');
  if (jump && MODULES[jump]) {
    showScreen('home');
    openModule(jump);
  } else if (params.get('final')) {
    showFinal();
  } else if (params.get('s') === 'home') {
    showScreen('home');
  }
  if (params.get('x')) {
    setTimeout(() => { const b = $('#btnCut'); if (b) b.click(); }, 120);
  }
  if (params.get('act') && currentModule === 'lab') {
    const map = { observe: '#btnObserve', archive: '#btnArchive', spawn: '#btnSpawn' };
    const sel = map[params.get('act')];
    if (sel) setTimeout(() => { const b = $(sel); if (b) b.click(); }, 200);
  }
  if (params.get('st') && currentModule === 'journey') {
    const st = Number(params.get('st'));
    setTimeout(() => {
      const items = $$('#timeline .tl-item');
      if (items[st]) items[st].click();
    }, 150);
  }
  if (params.get('quiz') && params.get('level')) {
    startQuiz(params.get('quiz'), params.get('level'));
  }

  // 键盘：Esc 已在 core 绑定
  window.addEventListener('keydown', e => {
    if (e.key === 'Home' && !$('#screen-intro').classList.contains('active')) goHome();
  });
})();
