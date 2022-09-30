/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./public/**/*.html",
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			gridTemplateColumns: {
				"auto-fit": "repeat(auto-fit, minmax(16rem, 1fr))",
				"auto-fill":
					"repeat(auto-fill, minmax(16rem, 1fr))",
			},
			backgroundImage: {
				"hero-background":
					"url('/public/img/background.jpg')",
			},
			fontFamily: {
				poppins: "'Poppins', sans-serif",
				roboto: "'Roboto', sans-serif",
				raleway: "'Raleway', sans-serif",
				lato: "'Lato', sans-serif",
			},
			animation: {
				"spin-slow": "spin 20s linear infinite",
				"pulse-slow":
					"pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite",
			},
		},
	},
	plugins: [],
};
