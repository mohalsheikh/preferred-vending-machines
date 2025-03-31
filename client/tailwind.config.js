/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      /* 
         1) Use var(--primary-500) etc. so your site reads from
            the color variables set by SiteSettings or default in index.css.
      */
      colors: {
        primary: {
          500: 'var(--primary-500, #22c55e)',
          600: 'var(--primary-600, #16a34a)',
          700: 'var(--primary-700, #15803d)',
        },
        secondary: {
          500: 'var(--secondary-500, #3b82f6)',
          600: 'var(--secondary-600, #2563eb)',
        },
        accent: {
          500: 'var(--accent-500, #8b5cf6)',
        },
        dark: {
          800: 'var(--dark-800, #1f2937)',
          900: 'var(--dark-900, #111827)',
        },
        gray: {
          50: 'var(--gray-50, #F9FAFB)',
          100: 'var(--gray-100, #F3F4F6)',
          200: 'var(--gray-200, #E5E7EB)',
          300: 'var(--gray-300, #D1D5DB)',
          600: 'var(--gray-600, #4B5563)',
          700: 'var(--gray-700, #374151)',
          800: 'var(--gray-800, #1F2937)',
          900: 'var(--gray-900, #111827)',
        },
      },

      /* 
         2) Let Tailwind "font-sans" read var(--font-family).
         So className="font-sans" = user-chosen font from SiteSettings.
      */
      fontFamily: {
        sans: ['var(--font-family)', 'Inter', 'system-ui', '-apple-system'],
      },

      /* 
         3) Custom font sizes referencing your user-chosen variables.
         text-heading => var(--heading-size)
         text-basevar => var(--base-size)
      */
      fontSize: {
        basevar: 'var(--base-size)',
        heading: 'var(--heading-size)',
      },

      /*
         4) Custom shadow classes referencing your user-chosen variables.
         shadow-button => var(--button-shadow)
         shadow-card => var(--card-shadow)
      */
      boxShadow: {
        button: 'var(--button-shadow, 0 8px 32px -4px rgba(0,0,0,0.1))',
        card: 'var(--card-shadow, 8px 8px 16px rgba(0,0,0,0.1), -8px -8px 16px rgba(255,255,255,0.5))',

        // Additional named shadows if desired
        '3d': '0 8px 32px -4px rgba(0, 0, 0, 0.1)',
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
        neumorphic:
          '8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255,255,255,0.5)',
        'dark-neumorphic':
          '8px 8px 16px rgba(0, 0, 0, 0.5), -8px -8px 16px rgba(255, 255, 255, 0.05)',
      },

      /* 
         5) Other animations, keyframes, background images, etc.
         No change needed unless you want to remove or modify them.
      */
      animation: {
        gradient: 'gradient 5s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      backgroundImage: {
        'gradient-text': 'linear-gradient(to right, #4ade80, #3b82f6)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'gradient-glass':
          'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),

    // Additional custom utilities (gradient-text, etc.)
    function ({ addUtilities }) {
      const newUtilities = {
        '.gradient-text': {
          background: 'linear-gradient(to right, #4ade80, #3b82f6)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.gradient-border': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            padding: '2px',
            borderRadius: 'inherit',
            background: 'linear-gradient(45deg, #4ade80, #3b82f6)',
            '-webkit-mask':
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            '-webkit-mask-composite': 'xor',
            maskComposite: 'exclude',
          },
        },
        '.custom-cursor': {
          cursor:
            'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'><circle cx=\'16\' cy=\'16\' r=\'8\' fill=\'%234ade80\' /></svg>"), auto',
        },
        '.scrollbar-hide': {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.glass-effect': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        },
        '.dark-glass-effect': {
          background: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        },
        '.text-shadow': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-dark': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover', 'dark']);
    },
  ],
};
