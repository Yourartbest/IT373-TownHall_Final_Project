/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{njk,md,html,js}'
  ],
  theme: {
    extend: {
      colors: {
        'bauhaus-red': '#E63946',
        'bauhaus-blue': '#1D3557',
        'bauhaus-yellow': '#F1C40F'
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      spacing: {
        'grid': '8px',
        'grid-2': '16px',
        'grid-3': '24px',
        'grid-4': '32px',
        'grid-6': '48px',
        'grid-8': '64px',
        'grid-12': '96px',
        'touch': '56px'
      },
      borderWidth: {
        'bauhaus': '4px'
      },
      boxShadow: {
        'bauhaus': '8px 8px 0 #000000',
        'bauhaus-sm': '4px 4px 0 #000000'
      }
    }
  },
  plugins: []
}
