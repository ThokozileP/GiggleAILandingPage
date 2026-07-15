window.CARC_ANALYTICS = (function () {
  function loadAnalytics() {
    if (window.clarity) return;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', 'wpvlzt1dr4');
  }

  function loadMarketing() { /* MARKETING_PLACEHOLDER */ }

  function pe(name) {
    if (window.clarity) window.clarity('event', name);
  }

  function initEventTracking() {
    document.querySelectorAll('[data-contact-sales-open]').forEach(function (el) {
      el.addEventListener('click', function () { pe('Demo Request Click'); });
    });

    document.querySelectorAll('a[href^="mailto:"]').forEach(function (el) {
      el.addEventListener('click', function () { pe('Contact Email Click'); });
    });

    document.querySelectorAll('a[href*="linkedin.com"]').forEach(function (el) {
      el.addEventListener('click', function () { pe('LinkedIn Click'); });
    });

    document.querySelectorAll('[data-config-url]').forEach(function (el) {
      var key = el.getAttribute('data-config-url');
      el.addEventListener('click', function () { pe('Platform Link Click: ' + key); });
    });
  }

  return { loadAnalytics: loadAnalytics, loadMarketing: loadMarketing, initEventTracking: initEventTracking, track: pe };
})();
