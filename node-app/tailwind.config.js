module.exports = {
	purge: ["./client/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			animation: {
				"spin-slow": "spin 3s linear infinite",
				pulse: "2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				bounce: "1s infinite",
				ping: "1s cubic-bezier(0, 0, 0.2, 1) infinite",
			},
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
