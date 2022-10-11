import Home from "./views/Home.vue";
import Beatmung from "./views/Beatmung.vue";
import Haemostaseologie from "./views/Haemostaseologie.vue";
import Dosis from "./views/Dosis.vue";
import Impressum from "./views/Impressum.vue";

export const routes = [
	{
		path: "/",
		name: "home",
		component: Home
	},
	{
		path: "/Navigation",
		name: "Navigation",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "./components/Navigation.vue")
	},
	{
		path: "/Beatmung",
		name: "Beatmung",
		component: Beatmung
	},
	{
		path: "/Haemostaseologie",
		name: "Haemostaseologie",
		component: Haemostaseologie
	},
	{
		path: "/Dosis",
		name: "Dosis",
		component: Dosis
	},
	{
		path: "/Impressum",
		name: "Impressum",
		component: Impressum
	}
];
