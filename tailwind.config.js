/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary:      'var(--c-primary)',
        'primary-deep':'var(--c-primary-deep)',
        secondary:    'var(--c-secondary)',
        point:        'var(--c-point)',
        support:      'var(--c-support)',
        surface:      'var(--c-surface)',
        'surface-alt':'var(--c-surface-alt)',
        'on-surface': 'var(--c-on-surface)',
        muted:        'var(--c-on-surface-muted)',
        stroke:       'var(--c-border)',
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
        logo: ['Fredoka', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1400px',
      },
    },
  },
  plugins: [],
}
