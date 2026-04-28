# GAMM — AI Decision Control Operating System

Landing page for **GAMM by Giggle AI Innovation**.

GAMM installs a control layer over AI-driven decisions in production, making every decision visible, owned, and interruptible. Built for healthcare AI organisations operating under EU AI Act and MDR pressure.

## Stack

- Pure HTML + CSS — no framework, no build step
- Google Fonts (Cormorant Garamond + Inter)
- Vanilla JavaScript (scroll reveal, smooth scroll)

## Structure

```
GiggleAILandingPage/
├── index.html        # Single-page site (all CSS and JS embedded)
└── asset/
    ├── GAMM-logo-trans.png     # Transparent logo (used on site)
    ├── GAMM-Logo.png           # White-background logo
    └── GAMM Linkedin Cover.png # OG/social preview image
```

## Deployment

Static site — no build step required.

**Vercel:** Import repo, set Framework to `Other`, Output Directory to `.`, leave Build Command empty.

**Any static host:** Upload `index.html` and the `asset/` folder. Done.

## Contact

[giggleaiinnovation.com](https://giggleaiinnovation.com)
