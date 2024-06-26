import type { Config } from "tailwindcss";

export default {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}"
	],
	theme: {
		fontSize: {
			xs: "0.6rem",
			sm: "0.8rem",
			base: "1rem",
			regular: "1.5rem",
			lg: "1.8rem",
			xl: "2rem"
		},
		colors: {
			white: "#fff",
			black: "#fff",

			primary: "#343C43",
			secondary: "#AF6545",
			tertiary: "#4C8362",

			green: {
				DEFAULT: "#4C8362",
				semi: "#60B766",
				light: "#edf3ef"
			},
			red: {
				DEFAULT: "#FF1A1A",
				light: "#ffe8e8"
			},
			brown: {
				DEFAULT: "#EADABE",
				dark: "#AF6545",
				semi: "#EEE2CC",
				light: "#f7f0e4",
				hover: "#a57560",

				input: "#FAF6EF",
				inputBorder: "#EADABE",
				inputText: "#A19685"
			},
			gray: {
				DEFAULT: "#D9D9D9",
				dark: "#999999",
				black: "#232C34",
				light: "#F6F6F6",

				$text: "#9A9DA1",
				$hover: "#949393"
			},
			yellow: {
				DEFAULT: "#cfa204",
				light: "#faf6e6"
			}
		},
		extend: {
			fontFamily: {
				body: [
					"\"Roboto Slab\"",
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
					"\"Apple Color Emoji\"",
					"\"Segoe UI Emoji\"",
					"\"Segoe UI Symbol\"",
					"\"Noto Color Emoji\""
				]
			}
		}
	},
	plugins: []
} satisfies Config;
