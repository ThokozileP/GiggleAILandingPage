# Giggle AI Innovation Website

Static website for **Giggle AI Innovation**.

The current positioning is **Clinical Agent Runtime Control for Healthcare AI**. The site presents Giggle AI Innovation as a specialist advisory and control-framework company helping healthcare AI companies control, monitor, and reconstruct how clinical agents behave in real clinical workflows.

## Stack

- Pure HTML and CSS, with no framework or build step
- A Vercel serverless function for contact sales email delivery via Resend
- Google Fonts: Cormorant Garamond and Inter
- Vanilla JavaScript for scroll reveal, theme switching, cookie preferences, and consent-based analytics loading

## Structure

```text
GiggleAILandingPage/
├── index.html                    # Homepage
├── frameworks.html               # Runtime control frameworks
├── article-the-runtime-gap.html  # Founder article
├── privacy-policy.html           # Privacy policy
├── cookie-policy.html            # Cookie policy
└── asset/
    ├── Giggleaiinnovation-logo-light.png
    └── Giggleaiinnovation-logo-dark.png
```

## Deployment

Static site. No build step is required.

Vercel: import the repo, set Framework to `Other`, set Output Directory to `.`, and leave Build Command empty. Add `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` (for example, `Giggle AI Website <contact@giggleaiinnovation.com>`) as environment variables. The sender domain must be verified in Resend.

The contact sales form requires a host that runs the `/api/contact-sales.js` serverless function. On a static-only host, the site remains available but form submissions cannot be delivered.

## Contact

[giggleaiinnovation.com](https://giggleaiinnovation.com)
