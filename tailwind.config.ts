import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#27628C',
          50: '#EFF7FB',
          100: '#D8EBF4',
          200: '#B4D8E9',
          300: '#83BEDA',
          400: '#4D9FC7',
          500: '#2F82AD',
          600: '#27628C',
          700: '#21506F',
          800: '#1D415A',
          900: '#1A374C',
          950: '#102433',
        },
        teal: {
          DEFAULT: '#16B8A5',
          50: '#ECFDF9',
          100: '#D0FAF1',
          200: '#A4F4E4',
          300: '#6BE8D3',
          400: '#35D3BC',
          500: '#16B8A5',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        navy: {
          DEFAULT: '#0B2436',
          50: '#F2F6F9',
          100: '#E2EBF1',
          200: '#C3D5E1',
          300: '#94B2C7',
          400: '#5E89A7',
          500: '#3D6B8B',
          600: '#2C5473',
          700: '#24445D',
          800: '#1A3549',
          900: '#0B2436',
          950: '#071B2B',
        },
        sand: {
          50: '#FCFAF5',
          100: '#F7F2E7',
          200: '#EFE6D4',
          300: '#E1D3B8',
        },
        ink: '#0B1F2F',
      },
      boxShadow: {
        soft: '0 18px 50px -24px rgba(11, 36, 54, 0.28)',
        card: '0 12px 34px -20px rgba(11, 36, 54, 0.22)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    }
  }
}
