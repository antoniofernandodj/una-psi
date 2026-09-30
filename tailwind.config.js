/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: { extend: {
  "colors": {
      "on-secondary-fixed-variant": "rgb(var(--c-on-secondary-fixed-variant) / <alpha-value>)",
      "surface-bright": "rgb(var(--c-surface-bright) / <alpha-value>)",
      "outline-variant": "rgb(var(--c-outline-variant) / <alpha-value>)",
      "primary-fixed": "rgb(var(--c-primary-fixed) / <alpha-value>)",
      "background": "rgb(var(--c-background) / <alpha-value>)",
      "on-secondary-container": "rgb(var(--c-on-secondary-container) / <alpha-value>)",
      "surface": "rgb(var(--c-surface) / <alpha-value>)",
      "on-primary-container": "rgb(var(--c-on-primary-container) / <alpha-value>)",
      "primary": "rgb(var(--c-primary) / <alpha-value>)",
      "on-surface": "rgb(var(--c-on-surface) / <alpha-value>)",
      "on-tertiary-fixed": "rgb(var(--c-on-tertiary-fixed) / <alpha-value>)",
      "secondary": "rgb(var(--c-secondary) / <alpha-value>)",
      "surface-container-lowest": "rgb(var(--c-surface-container-lowest) / <alpha-value>)",
      "on-background": "rgb(var(--c-on-background) / <alpha-value>)",
      "on-secondary-fixed": "rgb(var(--c-on-secondary-fixed) / <alpha-value>)",
      "surface-container": "rgb(var(--c-surface-container) / <alpha-value>)",
      "surface-container-highest": "rgb(var(--c-surface-container-highest) / <alpha-value>)",
      "inverse-surface": "rgb(var(--c-inverse-surface) / <alpha-value>)",
      "on-error": "rgb(var(--c-on-error) / <alpha-value>)",
      "outline": "rgb(var(--c-outline) / <alpha-value>)",
      "secondary-fixed": "rgb(var(--c-secondary-fixed) / <alpha-value>)",
      "on-tertiary-container": "rgb(var(--c-on-tertiary-container) / <alpha-value>)",
      "inverse-on-surface": "rgb(var(--c-inverse-on-surface) / <alpha-value>)",
      "secondary-container": "rgb(var(--c-secondary-container) / <alpha-value>)",
      "on-primary": "rgb(var(--c-on-primary) / <alpha-value>)",
      "surface-container-low": "rgb(var(--c-surface-container-low) / <alpha-value>)",
      "error-container": "rgb(var(--c-error-container) / <alpha-value>)",
      "on-primary-fixed-variant": "rgb(var(--c-on-primary-fixed-variant) / <alpha-value>)",
      "error": "rgb(var(--c-error) / <alpha-value>)",
      "surface-container-high": "rgb(var(--c-surface-container-high) / <alpha-value>)",
      "secondary-fixed-dim": "rgb(var(--c-secondary-fixed-dim) / <alpha-value>)",
      "on-secondary": "rgb(var(--c-on-secondary) / <alpha-value>)",
      "on-tertiary": "rgb(var(--c-on-tertiary) / <alpha-value>)",
      "tertiary-container": "rgb(var(--c-tertiary-container) / <alpha-value>)",
      "on-primary-fixed": "rgb(var(--c-on-primary-fixed) / <alpha-value>)",
      "on-surface-variant": "rgb(var(--c-on-surface-variant) / <alpha-value>)",
      "on-error-container": "rgb(var(--c-on-error-container) / <alpha-value>)",
      "on-tertiary-fixed-variant": "rgb(var(--c-on-tertiary-fixed-variant) / <alpha-value>)",
      "surface-tint": "rgb(var(--c-surface-tint) / <alpha-value>)",
      "surface-dim": "rgb(var(--c-surface-dim) / <alpha-value>)",
      "tertiary-fixed": "rgb(var(--c-tertiary-fixed) / <alpha-value>)",
      "primary-container": "rgb(var(--c-primary-container) / <alpha-value>)",
      "tertiary": "rgb(var(--c-tertiary) / <alpha-value>)",
      "surface-variant": "rgb(var(--c-surface-variant) / <alpha-value>)",
      "tertiary-fixed-dim": "rgb(var(--c-tertiary-fixed-dim) / <alpha-value>)",
      "primary-fixed-dim": "rgb(var(--c-primary-fixed-dim) / <alpha-value>)",
      "inverse-primary": "rgb(var(--c-inverse-primary) / <alpha-value>)"
  },
  "borderRadius": {
    "DEFAULT": "0.25rem",
    "lg": "0.5rem",
    "xl": "0.75rem",
    "full": "9999px"
  },
  "spacing": {
    "space-xs": "0.25rem",
    "margin": "3rem",
    "space-xl": "2.5rem",
    "space-lg": "1.5rem",
    "space-sm": "0.5rem",
    "gutter-mobile": "1rem",
    "space-md": "1rem",
    "gutter": "1.5rem",
    "margin-mobile": "1.25rem"
  },
  "fontFamily": {
    "headline-lg-mobile": [
      "Plus Jakarta Sans"
    ],
    "body-sm": [
      "Plus Jakarta Sans"
    ],
    "headline-lg": [
      "Plus Jakarta Sans"
    ],
    "body-lg": [
      "Plus Jakarta Sans"
    ],
    "label-sm": [
      "Plus Jakarta Sans"
    ],
    "label-lg": [
      "Plus Jakarta Sans"
    ],
    "body-md": [
      "Plus Jakarta Sans"
    ],
    "display-hero-mobile": [
      "Plus Jakarta Sans"
    ],
    "headline-sm": [
      "Plus Jakarta Sans"
    ],
    "title-md": [
      "Plus Jakarta Sans"
    ],
    "label-md": [
      "Plus Jakarta Sans"
    ],
    "headline-md": [
      "Plus Jakarta Sans"
    ],
    "display-hero": [
      "Plus Jakarta Sans"
    ]
  },
  "fontSize": {
    "headline-lg-mobile": [
      "26px",
      {
        "lineHeight": "34px",
        "fontWeight": "600"
      }
    ],
    "body-sm": [
      "14px",
      {
        "lineHeight": "20px",
        "fontWeight": "400"
      }
    ],
    "headline-lg": [
      "32px",
      {
        "lineHeight": "40px",
        "fontWeight": "600"
      }
    ],
    "body-lg": [
      "18px",
      {
        "lineHeight": "28px",
        "fontWeight": "400"
      }
    ],
    "label-sm": [
      "11px",
      {
        "lineHeight": "14px",
        "fontWeight": "500"
      }
    ],
    "label-lg": [
      "14px",
      {
        "lineHeight": "20px",
        "fontWeight": "600"
      }
    ],
    "body-md": [
      "16px",
      {
        "lineHeight": "24px",
        "fontWeight": "400"
      }
    ],
    "display-hero-mobile": [
      "32px",
      {
        "lineHeight": "40px",
        "fontWeight": "700"
      }
    ],
    "headline-sm": [
      "20px",
      {
        "lineHeight": "28px",
        "fontWeight": "600"
      }
    ],
    "title-md": [
      "18px",
      {
        "lineHeight": "26px",
        "fontWeight": "600"
      }
    ],
    "label-md": [
      "12px",
      {
        "lineHeight": "16px",
        "fontWeight": "600"
      }
    ],
    "headline-md": [
      "24px",
      {
        "lineHeight": "32px",
        "fontWeight": "600"
      }
    ],
    "display-hero": [
      "44px",
      {
        "lineHeight": "54px",
        "fontWeight": "700"
      }
    ]
  }
} },
  plugins: [],
};
