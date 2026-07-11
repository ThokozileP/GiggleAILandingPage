(function () {
  var CONSENT_KEY = 'giggle_cookie_consent';
  var CONSENT_VERSION = '1.0';

  function getConsent() {
    try {
      var raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      var c = JSON.parse(raw);
      return c.version === CONSENT_VERSION ? c : null;
    } catch (e) { return null; }
  }

  function writeConsent(analytics, marketing) {
    var c = {
      necessary: true,
      analytics: !!analytics,
      marketing: !!marketing,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(c));
    return c;
  }

  function activateConsent(c) {
    if (!window.CARC_ANALYTICS) return;
    if (c.analytics) window.CARC_ANALYTICS.loadAnalytics();
    if (c.marketing) window.CARC_ANALYTICS.loadMarketing();
  }

  var banner = document.getElementById('cookie-banner');
  var overlay = document.getElementById('cookie-modal-overlay');
  if (!banner || !overlay) return;

  var cbAccept = document.getElementById('cb-accept');
  var cbReject = document.getElementById('cb-reject');
  var cbManage = document.getElementById('cb-manage');
  var cmAccept = document.getElementById('cm-accept-all');
  var cmReject = document.getElementById('cm-reject-all');
  var cmSave = document.getElementById('cm-save');
  var cmClose = document.getElementById('cm-close');
  var cmAnalyt = document.getElementById('cm-analytics');
  var cmMarket = document.getElementById('cm-marketing');
  var settBtn = document.getElementById('cookie-settings-btn');

  function showBanner() { banner.classList.add('cb-visible'); }
  function hideBanner() { banner.classList.remove('cb-visible'); }

  function showModal() {
    var c = getConsent();
    cmAnalyt.checked = c ? c.analytics : false;
    cmMarket.checked = c ? c.marketing : false;
    overlay.classList.add('cm-visible');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { cmClose.focus(); });
  }

  function hideModal() {
    overlay.classList.remove('cm-visible');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function acceptAll() {
    activateConsent(writeConsent(true, true));
    hideBanner(); hideModal();
  }

  function rejectAll() {
    writeConsent(false, false);
    hideBanner(); hideModal();
  }

  function savePrefs() {
    activateConsent(writeConsent(cmAnalyt.checked, cmMarket.checked));
    hideBanner(); hideModal();
  }

  cbAccept.addEventListener('click', acceptAll);
  cbReject.addEventListener('click', rejectAll);
  cbManage.addEventListener('click', showModal);
  cmAccept.addEventListener('click', acceptAll);
  cmReject.addEventListener('click', rejectAll);
  cmSave.addEventListener('click', savePrefs);
  cmClose.addEventListener('click', hideModal);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) hideModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('cm-visible')) hideModal();
  });

  if (settBtn) {
    settBtn.addEventListener('click', function (e) {
      e.preventDefault(); showModal();
    });
  }

  document.querySelectorAll('[data-cookie-settings-link]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault(); showModal();
    });
  });

  var existing = getConsent();
  if (!existing) {
    setTimeout(showBanner, 900);
  } else {
    activateConsent(existing);
  }
})();
