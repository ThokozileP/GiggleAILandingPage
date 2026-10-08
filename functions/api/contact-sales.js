const SALES_INBOX = 'info@giggleaiinnovation.com';

function clean(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.RESEND_API_KEY) {
    console.error('Contact sales form is missing RESEND_API_KEY.');
    return json({ error: 'Email delivery is not configured.' }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch (error) {
    return json({ error: 'Invalid request body.' }, 400);
  }

  if (body.website) return json({ ok: true }, 200);

  const name = clean(body.name, 120);
  const email = clean(body.email, 254);
  const company = clean(body.company, 160);
  const role = clean(body.role, 160);
  const interest = clean(body.interest, 160);
  const message = clean(body.message, 4000);

  if (!name || !company || !/^\S+@\S+\.\S+$/.test(email)) {
    return json({ error: 'Please provide your name, company, and a valid work email.' }, 400);
  }

  const text = [
    'New CARC demo request',
    '',
    'Name: ' + name,
    'Work email: ' + email,
    'Company: ' + company,
    'Role: ' + (role || 'Not provided'),
    'Interest: ' + (interest || 'CARC platform demo'),
    '',
    'AI system / request:',
    message || 'No additional details provided.'
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + env.RESEND_API_KEY,
        'Content-Type': 'application/json',
        'Idempotency-Key': 'contact-sales-' + Date.now() + '-' + Math.random().toString(36).slice(2)
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL || 'Giggle AI Website <contact@giggleaiinnovation.com>',
        to: [SALES_INBOX],
        reply_to: email,
        subject: 'CARC demo request: ' + company,
        text: text
      })
    });

    if (!response.ok) {
      console.error('Resend rejected contact sales email:', response.status, await response.text());
      return json({ error: 'We could not send your request. Please try again.' }, 502);
    }

    return json({ ok: true }, 200);
  } catch (error) {
    console.error('Contact sales email failed:', error);
    return json({ error: 'We could not send your request. Please try again.' }, 502);
  }
}
