# Giggle AI Innovation Website

Static website for **Giggle AI Innovation**.

CARC (Consequential Agent Runtime Control): runtime control and audit trails for AI agents in high-stakes decisions.

The site presents Giggle AI Innovation as the company behind CARC, helping teams control, monitor, and reconstruct how AI agents behave in hiring, lending, insurance, healthcare, and other high-stakes workflows.

## Stack

- Pure HTML and CSS, with no framework or build step
- A Cloudflare Pages Function (`functions/api/contact-sales.js`) that delivers contact sales requests by email via Resend
- Google Fonts: Cormorant Garamond and Inter
- Vanilla JavaScript for scroll reveal, theme switching, cookie preferences, and consent-based analytics loading

## Structure

```text
GiggleAILandingPage/
├── index.html                    # Homepage
├── developers.html               # Developer Platform overview
├── api.html                      # Runtime API overview
├── runtime-metrics.html          # Runtime Metrics overview
├── control-console.html          # Control Console overview
├── frameworks.html               # Runtime control frameworks
├── article-the-runtime-gap.html  # Founder article
├── privacy-policy.html           # Privacy policy
├── cookie-policy.html            # Cookie policy
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/                      # Shared design system (tokens, layout, components, themes)
│   ├── js/                       # Shared scripts; config.js holds external platform URLs
│   ├── icons/
│   └── images/
└── functions/
    └── api/
        └── contact-sales.js      # POST /api/contact-sales
```

## Deployment (Cloudflare Pages)

Static site with one Pages Function. No build step is required.

1. In the Cloudflare dashboard, go to Workers & Pages, create a Pages project, and connect this Git repository.
2. Build settings: Framework preset `None`, Build command left empty, Build output directory `/` (the repository root).
3. Under Settings, Variables and Secrets, add for Production (and Preview, if you want the form to work on preview deployments):
   - `RESEND_API_KEY` (type: Secret). Required. Without it the function returns `503` and no email is sent.
   - `CONTACT_FROM_EMAIL` (type: Text). Optional. Defaults to `Giggle AI Website <contact@giggleaiinnovation.com>`. The sender domain must be verified in Resend.
4. Redeploy after changing variables. They only apply to new deployments.

Pages picks up the `functions/` directory automatically, so `functions/api/contact-sales.js` is served at `/api/contact-sales`. It accepts `POST` only (`onRequestPost`), validates the name, company, and work email, silently drops submissions that fill the hidden `website` honeypot field, and sends the request to `info@giggleaiinnovation.com` (set in `SALES_INBOX`) with the visitor's address as reply-to. The email subject is `CARC demo request: <company>`.

On a static-only host, the site remains available but form submissions cannot be delivered.

### Local development

Run the site and the function together with Wrangler:

```sh
npx wrangler pages dev .
```

Put local secrets in a `.dev.vars` file in the repository root (it is git-ignored):

```text
RESEND_API_KEY=re_...
CONTACT_FROM_EMAIL=Giggle AI Website <contact@giggleaiinnovation.com>
```

## Contact

[giggleaiinnovation.com](https://giggleaiinnovation.com)
