function initTheme() {
  var themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  var html = document.documentElement;
  var logos = [document.getElementById('navLogo'), document.getElementById('footerLogo')];
  var DARK_LOGO = 'assets/images/giggleaiinnovation-logo-dark.png';
  var LIGHT_LOGO = 'assets/images/giggleaiinnovation-logo-light.png';

  function applyTheme(light) {
    if (light) { html.setAttribute('data-theme', 'light'); }
    else { html.removeAttribute('data-theme'); }
    logos.forEach(function (el) { if (el) el.src = light ? LIGHT_LOGO : DARK_LOGO; });
  }

  applyTheme(localStorage.getItem('giggleTheme') !== 'dark');

  themeToggle.addEventListener('click', function () {
    var isLight = html.getAttribute('data-theme') === 'light';
    localStorage.setItem('giggleTheme', isLight ? 'dark' : 'light');
    applyTheme(!isLight);
  });
}
