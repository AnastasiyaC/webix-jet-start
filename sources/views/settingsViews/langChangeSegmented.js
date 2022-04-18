import {JetView} from "webix-jet";

export default class LangChangeSegmented extends JetView {
	config() {
		return {
			view: "segmented",
			value: "en",
			options: [
				{id: "en", value: "EN"},
				{id: "ru", value: "RU"}
			]
		};
	}
}
