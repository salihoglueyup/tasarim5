---
name: Modern Enterprise Professional
colors:
  surface: '#FFFFFF'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#3755c3'
  on-secondary: '#ffffff'
  secondary-container: '#708cfd'
  on-secondary-container: '#00217a'
  tertiary: '#784b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#996100'
  on-tertiary-container: '#ffeedd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dde1ff'
  secondary-fixed-dim: '#b8c4ff'
  on-secondary-fixed: '#001453'
  on-secondary-fixed-variant: '#173bab'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#F8FAFC'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
  heading-text: '#1E293B'
  border-light: '#E2E8F0'
  subtle-blue: '#DBEAFE'
  success-green: '#24BB44'
typography:
  hero-lg:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  hero-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  section-h1:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: '1.3'
  section-h2:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.7'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.7'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  button-text:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '500'
    lineHeight: '1.0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  section-gap-lg: 120px
  section-gap-sm: 80px
  gutter: 24px
  margin-mobile: 16px
  stack-gap: 12px
---

## Brand & Style
This design system is built for a professional B2B facility management context, emphasizing trust, longevity (since 2009), and operational excellence. The aesthetic follows a **Corporate / Modern** movement, drawing heavy inspiration from high-end technology firms.

The design narrative focuses on:
- **Clarity and Precision:** High use of white space to reduce cognitive load and reflect the organized nature of facility management.
- **Trustworthy Innovation:** Combining a classic corporate blue palette with the slick, functional minimalism of modern SaaS (Software as a Service) platforms.
- **Turkish Professionalism:** Tailored for a domestic market in Istanbul that values both heritage and modern efficiency.

## Colors
The palette is rooted in a "Trust Blue" foundation, utilizing varied saturations to create hierarchy without visual clutter. 

- **Primary & Secondary:** Used for action-oriented elements and deep-tone structural backgrounds (Navbars/Footers).
- **Neutral & Background:** The system relies on `#F8FAFC` for page-level backgrounds to make white `#FFFFFF` surface cards "pop" with clean definition.
- **Accent:** Amber is used exclusively for high-priority calls to action or urgent status indicators to maintain its visual impact.
- **Legacy Touch:** A subtle inclusion of the legacy brand green is maintained for success states and sustainability-related facility features.

## Typography
The system utilizes **Inter** exclusively to achieve a systematic, utilitarian, yet modern feel. 

- **Scale:** High contrast between headings and body text ensures clear information architecture.
- **Readability:** A generous line height of 1.7 is applied to body text to facilitate reading longer service descriptions and corporate reports.
- **Localization:** Font weights and letter spacing are optimized for Turkish characters, ensuring "İ", "ğ", and "ş" do not disrupt the visual rhythm.
- **Alignment:** Hero text uses tight letter-spacing to mimic the premium "Stripe-like" editorial feel.

## Layout & Spacing
This design system employs a **Fixed Grid** model for desktop and a fluid, margin-based approach for mobile.

- **Grid:** 12-column desktop grid with a maximum width of 1280px.
- **Vertical Rhythm:** Sections are separated by large white space (80px to 120px) to give the brand an "executive" and "unhurried" feel.
- **Alignment:** All internal card padding should follow a base-8 scale (typically 24px or 32px) to maintain a consistent internal density.
- **Mobile:** Margins shrink to 16px, and section spacing reduces to 60px to maintain momentum while scrolling.

## Elevation & Depth
The system uses **Tonal Layers** and **Low-contrast Outlines** rather than heavy shadows to convey depth.

- **Default State:** Cards and containers use a 1px solid border (`#E2E8F0`) with no shadow. This creates a "flat-modern" look seen in Linear.
- **Hover State:** When a user interacts with a card, a very soft, ambient shadow (Light Blue tint) is applied to simulate the element lifting off the page.
- **Surfaces:** Use `#FFFFFF` for interactive or content-heavy cards to distinguish them from the `#F8FAFC` background.
- **Navigation:** The navbar uses a subtle blur (Backdrop Filter) or a solid Dark Blue (`#1E40AF`) to anchor the layout.

## Shapes
The shape language is "Rounded-Soft," balancing professional rigidity with modern friendliness.

- **Primary Elements:** Cards and main containers use a 12px or 16px radius (`rounded-lg` or `rounded-xl`).
- **Interactive Elements:** Buttons use a tighter 8px radius. This differentiation helps the user instantly distinguish between "Containers" (Information) and "Buttons" (Action).
- **Icons:** Icons should be placed within subtle-blue circles or soft-edged squares to create a cohesive visual language.

## Components

### Buttons
- **Primary:** Bright Blue (`#2563EB`) background, white text, 8px radius. Use a subtle brightness shift on hover.
- **Secondary:** White background, 1px border (`#E2E8F0`), Dark Text.
- **CTA:** Amber (`#F59E0B`) background for "Request Quote" or "Emergency Support" buttons.

### Cards
- **Structure:** White background, 1px border (`#E2E8F0`), 12px-16px corner radius.
- **Content:** 32px internal padding. Use `section-h2` for titles and `body-md` for descriptions.

### Input Fields
- **Default:** White background, 1px border, 8px radius. Use `#2563EB` for the focus border color.
- **Labels:** Use `label-caps` sitting above the input field for a technical, organized look.

### Chips & Badges
- **Status:** Use Light Blue (`#DBEAFE`) backgrounds with Primary Blue text for "Active" or "Standard" services.
- **Highlight:** Use the legacy green for "Completed" or "Secure" statuses.

### Lists
- Use horizontal dividers (1px solid `#E2E8F0`) between list items in administrative panels. Use icons as bullet points to reinforce the "Facility Management" service category (e.g., a shield icon for security, a leaf for cleaning).