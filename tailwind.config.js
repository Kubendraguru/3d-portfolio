/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: 'hsl(var(--secondary))',
        muted: 'hsl(var(--muted))',
        accent: 'hsl(var(--accent))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        darkBg: '#0C0C0C',
        textLight: '#D7E2EA',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Instrument Serif', 'serif'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
        kanit: ['Kanit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
