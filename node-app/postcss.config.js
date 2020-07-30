module.exports = {
	plugins: [
		"tailwindcss",
		...(process.env.NODE_ENV === "production" ? ["autoprefixer"] : []),
	],
};

// module.exports = {
// 	plugins: {
// 		tailwindcss: {},
// 		autoprefixer: {},
// 		...(process.env.NODE_ENV === "production"
// 			? {
// 					"@fullhuman/postcss-purgecss": {
// 						content: [
// 							"./client/components/*.tsx",
// 							"./client/forms/*.tsx",
// 							"./client/components/*.tsx",
// 							"./pages/**/*.ts",
// 						],
// 						defaultExtractor: (content) =>
// 							content.match(/[\w-/:]+(?<!:)/g) || [],
// 					},
// 			  }
// 			: {}),
// 	},
// };
