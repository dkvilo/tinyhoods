const config = require("./shared/config");

module.exports = {
	excludeFile: (str) => /\*.{spec,test,config}.js/.test(str),
	env: {
		...config,
	},
	images: {
		domains: ["tinyhoods.net"],
	},
};
