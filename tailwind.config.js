/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'col-span-4',
    'col-span-5',
    'col-span-6',
  ],
  theme: {
    extend: {}
  },
  plugins: [],
}
