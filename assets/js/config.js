/**
 * Single source of truth for external CARC platform URLs.
 * Hosted subdomains are not live yet — update these when they are.
 * Any element with data-config-url="<key>" gets its href set from here.
 * Any element with data-config-hide-if-missing is removed if the value is falsy
 * (this is how the GitHub link stays hidden until a real repo URL exists).
 */
window.CARC_CONFIG = {
  developerPortalUrl: 'https://developers.giggleaiinnovation.com',
  apiDocsUrl: 'https://api.giggleaiinnovation.com/docs',
  openApiSpecUrl: 'https://api.giggleaiinnovation.com/openapi.json',
  controlConsoleUrl: 'https://console.giggleaiinnovation.com',
  githubUrl: null,
  contactEmail: 'info@giggleaiinnovation.com'
};

function applyConfigLinks() {
  var cfg = window.CARC_CONFIG || {};

  document.querySelectorAll('[data-config-url]').forEach(function (el) {
    var key = el.getAttribute('data-config-url');
    var value = cfg[key];

    if (!value) {
      var hideTarget = el.closest('[data-config-hide-if-missing]');
      if (hideTarget) hideTarget.remove();
      return;
    }

    el.setAttribute('href', value);
  });
}
