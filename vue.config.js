// vue.config.js

module.exports = {
	pwa: {
		appleMobileWebAppCapable: "yes"
	},
	// options...
	devServer: {
		https: false,
		host: '0.0.0.0',
		disableHostCheck: true,
		port: 8080
	},
	chainWebpack: config => {
		config.module
			.rule("i18n")
			.resourceQuery(/blockType=i18n/)
			.type("javascript/auto")
			.use("i18n")
			.loader("@kazupon/vue-i18n-loader")
			.end();
	},
	// GitHub Pages braucht /NarcoCalc/ als Pfad
	publicPath: process.env.NODE_ENV === "production" 
		? "/NarcoCalc/"
		: "/"
};
