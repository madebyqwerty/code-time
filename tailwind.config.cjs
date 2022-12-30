/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				ctgray: {
					200: '#626262',
					500: '#252525'
				},
				ctgreen: {
					50: '#cdedcd',
					100: '#bee7be',
					200: '#a0dda0',
					300: '#82d282',
					400: '#64c764',
					500: '#46bc46',
					600: '#369436',
					700: '#276b27',
					800: '#184218',
					900: '#091909'
				}
			},
			fontSize: {
				sm: '0.875rem',
				base: '1rem',
				lg: '1.125rem',
				xl: '1.25rem',
				'2xl': '1.5rem',
				'3xl': '2rem',
				'4xl': '3rem',
				'5xl': '4rem'
			},
			fontFamily: {
				silkscreen: 'Silkscreen',
				'fira-code': 'Fira Code'
			}
		}
	},
	plugins: []
};
