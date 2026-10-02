# Global color theme

Edit the :root variables in app/globals.css to update the site palette. --brand-50 through --brand-950 define the logo-inspired gold range; --neutral-50 through --neutral-950 define warm whites and charcoal. Semantic surface, background, foreground, border and accent variables reference those ranges.

Tailwind v4 theme entries expose these variables as bg-brand-700, text-brand-400, border-neutral-200, bg-surface-dark and related utilities. All site pages, navigation and interactive components use the shared tokens. Dark gold is used for white-text buttons and small links; lighter gold is used on dark surfaces. Original logos, product packaging and embedded map-provider styles retain their own colors.
