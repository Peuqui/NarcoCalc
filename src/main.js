import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import { routes } from "./routes";
import "./registerServiceWorker";

import VueI18n from "vue-i18n";
import FlagIcon from "vue-flag-icon";
Vue.use(VueI18n);
Vue.use(FlagIcon);

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
	routes: routes
	/* mode: "history" */
});

const i18n = new VueI18n({
	locale: "de",
	messages: {
		de: {}
	}
});

new Vue({
	i18n,
	router: router,
	render: h => h(App),
	mounted() {
		// GoatCounter Analytics (datenschutzfreundlich, keine Cookies)
		const script = document.createElement("script");
		script.async = true;
		script.dataset.goatcounter = "https://peuqui.goatcounter.com/count";
		script.src = "//gc.zgo.at/count.js";
		document.body.appendChild(script);
	}
}).$mount("#app");
