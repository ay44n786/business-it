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
| `restaurant.html` | Problem-Solving Page | Ember & Oak case study: menu with steak cooking guide, booking/feedback form, contact details, social links, GDPR and cookies, design choices |

## Folder structure

```
/
├── index.html, contact.html, skills.html, showcase.html, restaurant.html
├── css/style.css        One shared stylesheet, organised into numbered sections
├── js/main.js           Shared: mobile nav, cookie notice, footer year, copy email
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
6. Client-side validation with accessible inline error messages, including booking checks against opening hours, closed days and times that have already passed
7. Email builder that turns the form into a ready-to-send `mailto:` message, with an on-page preview

## Testing

- HTML checked with the W3C Markup Validation Service: https://validator.w3.org/
- CSS checked with the W3C CSS Validation Service: https://jigsaw.w3.org/css-validator/
- Tested at phone (375px), tablet (768px) and desktop widths
- Internal links and images checked on all five pages

## Generative AI statement

- **Tools used:** Claude (Anthropic)
- **Purpose:** planning the site structure, generating a first draft of the HTML, CSS and JavaScript, suggesting the visual redesign, and testing (validation, broken links, mobile layout and form edge cases).
- **How I adapted it:** I rewrote all of the personal text on every page in my own words (summary, interests, goals, project outcomes, the restaurant context and the reasons behind the restaurant page layout), and corrected details so they are accurate, such as my real outreach results and the barbershop outcome. I changed my future goal to a business or data analyst role and added my Fiverr freelancing and a Power BI coursework dashboard. I replaced the skill percentages with plain levels I can explain. From my own experience waiting tables at Hot Rock Steakhouse, I added a steak cooking guide, an allergies box on the booking form and a table linking real problems I saw to features on the site.

## References

- Fonts: Bricolage Grotesque and Atkinson Hyperlegible from Google Fonts (SIL Open Font License)
- Ember & Oak, its address and email are fictional. The phone number is from the Ofcom range reserved for fiction (0161 496 0xxx)
- Social media icons are simplified, hand-drawn SVG versions of each platform's logo, used only to label links to those platforms
