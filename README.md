# Ayaan Khan: Digital Portfolio

Personal portfolio website for the Web App Development module (CRN 59135), University of Salford, 2026-27.
It includes a Problem-Solving Page for a fictional restaurant, **Ember & Oak**, showing how web technology can support a restaurant's digital transformation.

- **Live site:** https://ay44n786.github.io/business-it/
- **Repository:** https://github.com/ay44n786/business-it

## Pages

| File | Page | What it shows |
|---|---|---|
| `index.html` | Home | Professional summary, career background, interests and goals |
| `contact.html` | Contact | Email and links to professional profiles |
| `skills.html` | Skills | Qualifications table, work experience timeline, digital skills |
| `showcase.html` | Business Showcase | Four projects, including the rationale for the Problem-Solving Page |
| `restaurant.html` | Problem-Solving Page | Ember & Oak case study: menu, booking/feedback form, contact details, social links, GDPR and cookies, design choices |

## Folder structure

```
/
├── index.html, contact.html, skills.html, showcase.html, restaurant.html
├── css/style.css        One shared stylesheet, organised into numbered sections
├── js/main.js           Shared: mobile nav, cookie notice, footer year, skill bars, copy email
├── js/restaurant.js     Restaurant: open-now status, menu filter, form validation, email builder
└── images/              Hand-written SVG logo, illustrations and icons
```

## Technologies

- HTML5 (semantic elements: header, nav, main, section, article, footer, address)
- CSS3 (custom properties, Flexbox, Grid, media queries, reduced-motion support)
- Vanilla JavaScript (no frameworks or libraries)
- Git, GitHub and GitHub Pages

## JavaScript features

1. Responsive navigation toggle with Escape-key support
2. Cookie consent notice that remembers the visitor's choice in localStorage
3. Live "open now" status worked out from the opening hours
4. Menu filter by dietary type, with a live count of dishes
5. One form for booking, feedback and loyalty sign-up, with fields that change by type
6. Client-side validation with accessible inline error messages
7. Email builder that turns the form into a ready-to-send `mailto:` message, with an on-page preview

## Testing

- HTML checked with the W3C Markup Validation Service: https://validator.w3.org/
- CSS checked with the W3C CSS Validation Service: https://jigsaw.w3.org/css-validator/
- Tested at phone (375px), tablet (768px) and desktop widths
- Internal links and images checked on all five pages

## Generative AI statement

- **Tools used:** Claude (Anthropic)
- **Purpose:** planning the site structure, generating a first draft of the HTML, CSS and JavaScript, and checking for bugs and broken links.
- **How I adapted it:** EDIT THIS SECTION. Say what you changed yourself, for example rewriting the text in your own words, changing the design, adding your own projects or photos, and fixing or extending the code.

## References

- Fonts: Inter and Outfit from Google Fonts (SIL Open Font License)
- Ember & Oak, its address, phone number and email are fictional
