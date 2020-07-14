const config = require("./shared/config");
const withPWA = require("next-pwa");

module.exports = withPWA({
	excludeFile: (str) => /\*.{spec,test,config}.js/.test(str),
	env: {
		...config,
	},
	pwa: {
		dest: "public",
	},
});

// module.exports = {
// 	excludeFile: (str) => /\*.{spec,test,config}.js/.test(str),
// 	env: {
// 		...config,
// 	},
// };
