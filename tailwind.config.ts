import type { Config } from "tailwindcss";

// all in fixtures is set to tailwind v3 as interims solutions

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			// Nueva paleta de colores para el tema Coquette
  			'coquette': {
  				'rosa-claro': '#FFD1DC',
  				'rosa-intenso': '#FF69B4',
  				'blanco': '#FFFFFF',
  				'plateado': '#C0C0C0',
  				// Variaciones de rosa claro
  				'rosa-claro-50': '#fffbfc',
  				'rosa-claro-100': '#fff4f6',
  				'rosa-claro-200': '#ffe8ed',
  				'rosa-claro-300': '#FFD1DC',
  				'rosa-claro-400': '#ffb3c1',
  				'rosa-claro-500': '#ff94a6',
  				'rosa-claro-600': '#e6758b',
  				'rosa-claro-700': '#cc5670',
  				'rosa-claro-800': '#b33755',
  				'rosa-claro-900': '#99183a',
  				// Variaciones de rosa intenso
  				'rosa-intenso-50': '#fff0f8',
  				'rosa-intenso-100': '#ffe0f0',
  				'rosa-intenso-200': '#ffc1e1',
  				'rosa-intenso-300': '#ff94cc',
  				'rosa-intenso-400': '#FF69B4',
  				'rosa-intenso-500': '#ff3d9d',
  				'rosa-intenso-600': '#e61185',
  				'rosa-intenso-700': '#cc006e',
  				'rosa-intenso-800': '#b30057',
  				'rosa-intenso-900': '#990040'
  			},
  			plateado: {
  				'50': '#f8f8f8',
  				'100': '#f0f0f0',
  				'200': '#e8e8e8',
  				'300': '#d8d8d8',
  				'400': '#C0C0C0',
  				'500': '#a8a8a8',
  				'600': '#909090',
  				'700': '#787878',
  				'800': '#606060',
  				'900': '#484848'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'shake': {
  				'0%, 100%': { transform: 'translateX(0)' },
  				'20%':       { transform: 'translateX(-6px)' },
  				'40%':       { transform: 'translateX(6px)' },
  				'60%':       { transform: 'translateX(-4px)' },
  				'80%':       { transform: 'translateX(4px)' },
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up':   'accordion-up 0.2s ease-out',
  			'shake':          'shake 0.5s ease-in-out',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
