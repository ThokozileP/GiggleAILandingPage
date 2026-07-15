document.addEventListener('DOMContentLoaded', function () {
  applyConfigLinks();
  initContactSales();
  initTheme();
  initNav();
  initScrollReveal();
  if (window.CARC_ANALYTICS) window.CARC_ANALYTICS.initEventTracking();
});

function initContactSales() {
  var salesEmail = (window.CARC_CONFIG && window.CARC_CONFIG.contactEmail) || 'info@giggleaiinnovation.com';
  var modal = document.createElement('div');
  modal.className = 'sales-modal';
  modal.id = 'contact-sales';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'contact-sales-title');
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = [
    '<div class="sales-modal-panel" role="document">',
      '<button class="sales-modal-close" type="button" aria-label="Close contact sales form">&times;</button>',
      '<p class="sec-label">Contact Sales</p>',
      '<h2 class="sales-modal-title" id="contact-sales-title">See CARC in your clinical AI workflow.</h2>',
      '<p class="sales-modal-intro">Tell us a little about your team and what you are building. We will respond directly to arrange a focused demo.</p>',
      '<form class="sales-form" id="contact-sales-form">',
        '<div class="sales-form-grid">',
          '<div class="sales-field"><label for="sales-name">Name <span aria-hidden="true">*</span></label><input id="sales-name" name="name" type="text" autocomplete="name" required></div>',
          '<div class="sales-field"><label for="sales-email">Work email <span aria-hidden="true">*</span></label><input id="sales-email" name="email" type="email" autocomplete="email" required></div>',
          '<div class="sales-field"><label for="sales-company">Company <span aria-hidden="true">*</span></label><input id="sales-company" name="company" type="text" autocomplete="organization" required></div>',
          '<div class="sales-field"><label for="sales-role">Role</label><input id="sales-role" name="role" type="text" autocomplete="organization-title"></div>',
        '</div>',
        '<div class="sales-field"><label for="sales-interest">What would you like to explore?</label><select id="sales-interest" name="interest"><option value="CARC platform demo">CARC platform demo</option><option value="Developer platform and API">Developer Platform &amp; API</option><option value="Runtime metrics">Runtime Metrics</option><option value="Control Console">Control Console</option><option value="Design partnership">Design partnership</option></select></div>',
        '<div class="sales-field"><label for="sales-message">Tell us about your clinical AI system</label><textarea id="sales-message" name="message" rows="4" placeholder="Where are you in development or deployment, and what runtime control challenge are you solving?"></textarea></div>',
        '<div class="sales-honeypot" aria-hidden="true"><label for="sales-website">Website</label><input id="sales-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>',
        '<label class="sales-consent"><input name="privacy" type="checkbox" required><span>I agree that Giggle AI Innovation may use these details to respond to my request. See the <a href="privacy-policy.html">Privacy Policy</a>.</span></label>',
        '<p class="sales-form-note">We will use your details only to respond to this request. No mailing lists or unsolicited marketing.</p>',
        '<div class="sales-form-actions"><button class="btn btn-gold" type="submit">Contact Sales</button><span class="sales-form-status" role="status" aria-live="polite"></span></div>',
      '</form>',
    '</div>'
  ].join('');
  document.body.appendChild(modal);

  var panel = modal.querySelector('.sales-modal-panel');
  var closeButton = modal.querySelector('.sales-modal-close');
  var form = modal.querySelector('form');
  var status = modal.querySelector('.sales-form-status');
  var lastFocused = null;

  function openModal(event) {
    if (event) event.preventDefault();
    lastFocused = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('sales-modal-open');
    window.setTimeout(function () { modal.querySelector('#sales-name').focus(); }, 0);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('sales-modal-open');
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('[data-contact-sales-open]').forEach(function (trigger) {
    trigger.addEventListener('click', openModal);
  });
  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', function (event) {
    if (event.target === modal) closeModal();
  });
  panel.addEventListener('click', function (event) { event.stopPropagation(); });
  document.addEventListener('keydown', function (event) {
    if (!modal.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeModal();
    if (event.key === 'Tab') {
      var focusable = modal.querySelectorAll('button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), a[href]');
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  if (window.location.hash === '#contact-sales') openModal();

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;

    var data = Object.fromEntries(new FormData(form).entries());
    var submitButton = form.querySelector('[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    status.textContent = '';

    try {
      var response = await fetch('/api/contact-sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      var result = await response.json().catch(function () { return {}; });
      if (!response.ok) throw new Error(result.error || 'Unable to send your request.');

      form.reset();
      status.textContent = 'Thank you — your request has been sent.';
      if (window.CARC_ANALYTICS) window.CARC_ANALYTICS.track('Contact Sales Submit');
    } catch (error) {
      status.innerHTML = 'Could not send. Email us at <a href="mailto:' + salesEmail + '">' + salesEmail + '</a>.';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Contact Sales';
    }
  });
}
