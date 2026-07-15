var SALES_INBOX = 'info@giggleaiinnovation.com';

function clean(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

module.exports = async function contactSales(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('Contact sales form is missing RESEND_API_KEY.');
    return res.status(503).json({ error: 'Email delivery is not configured.' });
  }

  var body = req.body || {};
  if (body.website) return res.status(200).json({ ok: true });

  var name = clean(body.name, 120);
  var email = clean(body.email, 254);
  var company = clean(body.company, 160);
  var role = clean(body.role, 160);
  var interest = clean(body.interest, 160);
  var message = clean(body.message, 4000);

  if (!name || !company || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Please provide your name, company, and a valid work email.' });
  }

  var text = [
    'New CARC demo request',
    '',
    'Name: ' + name,
    'Work email: ' + email,
    'Company: ' + company,
    'Role: ' + (role || 'Not provided'),
    'Interest: ' + (interest || 'CARC platform demo'),
    '',
    'Clinical AI system / request:',
    message || 'No additional details provided.'
  ].join('\n');

  try {
    var response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + process.env.RESEND_API_KEY,
        'Content-Type': 'application/json',
        'Idempotency-Key': 'contact-sales-' + Date.now() + '-' + Math.random().toString(36).slice(2)
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'Giggle AI Website <contact@giggleaiinnovation.com>',
        to: [SALES_INBOX],
        reply_to: email,
        subject: 'CARC demo request — ' + company,
        text: text
      })
    });

    if (!response.ok) {
      console.error('Resend rejected contact sales email:', response.status, await response.text());
      return res.status(502).json({ error: 'We could not send your request. Please try again.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact sales email failed:', error);
    return res.status(502).json({ error: 'We could not send your request. Please try again.' });
  }
};
