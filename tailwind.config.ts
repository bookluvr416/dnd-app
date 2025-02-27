import plugin from 'tailwindcss/plugin';
import type { Config } from 'tailwindcss';
const {heroui} = require("@heroui/react");

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        quintessential : ['Quintessential','cursive']
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
        addUtilities({
            '.scrollbar-width-auto': {
                'scrollbar-width': 'auto',
            },

            '.scrollbar-none': {
                'scrollbar-width': 'none',
                '&::-webkit-scrollbar': {
                    'display': 'none'
                }
            },

            '.scrollbar-thin': {
                'scrollbar-width': 'thin',
            },

            '.scrollbar-light': {
                '&::-webkit-scrollbar': {
                    width: '5px',
                    height: '8px',
                    background: '#374151',
                    border: '4px solid transparent',
                    borderRadius: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#4f46e5',
                    border: '4px solid transparent',
                    borderRadius: '8px',
                    backgroundClip: 'paddingBox',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: '#6366f1',
                },
            }
        })
    }),
    heroui()
  ],
} satisfies Config;
