/* eslint-disable no-undef */
import {JetApp, EmptyRouter, HashRouter} from "webix-jet";
import "./styles/app.css";

export default class MyApp extends JetApp {
	constructor(config) {
		const defaults = {
			id: APPNAME,
			version: VERSION,
			router: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug: true,
			start: "/top/startPage"
		};

		super({...defaults, ...config});

		this.attachEvent("app:error:resolve", (err) => {
			webix.delay(() => webix.message(`Catch error: ${err}`));
		});
	}
}

if (!BUILD_AS_MODULE) {
	webix.ready(() => new MyApp().render());
}
