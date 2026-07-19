/* ==========================================================================
   共通アプリメニュー  (appmenu.js)
   各ページで <script src="appmenu.js"></script> を </body> 直前に読み込むだけ。
   アプリを増やすときは下の APPS 配列に1行追加する（soon:true で「準備中」表示）。
   ========================================================================== */
(function () {
  // ---- ここを編集するだけでメニューが更新される ----
  var APPS = [
    { icon: '⚾', name: 'センバツ(春) ドラフト', url: 'index.html' },
    { icon: '📊', name: '歴代実績DB',           url: 'draft_db.html' },
    { icon: '🌻', name: '夏の甲子園 ドラフト',   url: 'summer.html', soon: true },
    { icon: '🏃', name: '箱根駅伝 ドラフト',     url: 'hakone.html', soon: true }
  ];
  // -------------------------------------------------

  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  var css = ''
    + '.appmenu-btn{position:fixed;top:12px;left:12px;z-index:100000;width:42px;height:42px;'
    + 'border-radius:10px;background:rgba(18,18,18,.88);border:1px solid #3a3a3a;color:#fff;'
    + 'font-size:20px;cursor:pointer;line-height:1;display:flex;align-items:center;justify-content:center;'
    + '-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);box-shadow:0 2px 8px rgba(0,0,0,.4);transition:background .15s,border-color .15s;}'
    + '.appmenu-btn:hover{background:#E50914;border-color:#E50914;}'
    + '.appmenu-panel{position:fixed;top:62px;left:12px;z-index:100000;background:#181818;border:1px solid #333;'
    + 'border-radius:12px;padding:8px;min-width:250px;box-shadow:0 10px 34px rgba(0,0,0,.65);'
    + 'opacity:0;visibility:hidden;transform:translateY(-8px);transition:opacity .15s,transform .15s,visibility .15s;'
    + "font-family:'Noto Sans JP',-apple-system,sans-serif;}"
    + '.appmenu-panel.open{opacity:1;visibility:visible;transform:translateY(0);}'
    + '.appmenu-title{font-weight:700;font-size:11px;color:#888;padding:6px 10px 8px;letter-spacing:1.5px;}'
    + '.appmenu-item{display:flex;align-items:center;gap:11px;padding:11px 10px;border-radius:8px;'
    + 'color:#e8e8e8;text-decoration:none;font-size:14px;font-weight:500;}'
    + '.appmenu-item:hover{background:#2a2a2a;}'
    + '.appmenu-item .ic{width:22px;text-align:center;font-size:17px;}'
    + '.appmenu-item.current{background:rgba(229,9,20,.16);color:#fff;cursor:default;}'
    + '.appmenu-item.soon{color:#666;cursor:default;}'
    + '.appmenu-badge{margin-left:auto;font-size:10px;background:#333;color:#aaa;padding:2px 7px;border-radius:5px;font-weight:600;}'
    + '.appmenu-badge.cur{background:#E50914;color:#fff;}';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var btn = document.createElement('button');
  btn.className = 'appmenu-btn';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'アプリメニュー');
  btn.textContent = '☰'; // ☰

  var panel = document.createElement('div');
  panel.className = 'appmenu-panel';

  var html = '<div class="appmenu-title">APP MENU</div>';
  APPS.forEach(function (a) {
    var isCur = a.url.toLowerCase() === here;
    var inner = '<span class="ic">' + a.icon + '</span><span>' + a.name + '</span>';
    if (a.soon) {
      html += '<div class="appmenu-item soon">' + inner + '<span class="appmenu-badge">準備中</span></div>';
    } else if (isCur) {
      html += '<div class="appmenu-item current">' + inner + '<span class="appmenu-badge cur">表示中</span></div>';
    } else {
      html += '<a class="appmenu-item" href="' + a.url + '">' + inner + '</a>';
    }
  });
  panel.innerHTML = html;

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    panel.classList.toggle('open');
  });
  panel.addEventListener('click', function (e) { e.stopPropagation(); });
  document.addEventListener('click', function () { panel.classList.remove('open'); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') panel.classList.remove('open'); });

  document.body.appendChild(btn);
  document.body.appendChild(panel);
})();
