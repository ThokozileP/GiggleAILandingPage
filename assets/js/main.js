document.addEventListener('DOMContentLoaded', function () {
  applyConfigLinks();
  initTheme();
  initNav();
  initScrollReveal();
  if (window.CARC_ANALYTICS) window.CARC_ANALYTICS.initEventTracking();
});
