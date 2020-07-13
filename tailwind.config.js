module.exports = {
	purge: [
		"./client/components/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "var(--color-primary)",
				secondary: "var(--color-secondary)",
				default: "var(--color-default)",
				"default-inverted": "var(--color-default-inverted)",
				"secondary-soft": "var(--color-secondary-soft)",
				warning: "var(--color-warning)",
				background: "var(--color-background)",
			},
		},
	},
	variants: {
		variants: {},
	},
	plugins: [],
};
