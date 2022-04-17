import {JetView} from "webix-jet";

class Settings extends JetView {
	config() {
		return {
			rows: [
				{
					view: "segmented",
					value: "en",
					options: [
						{id: "en", value: "EN"},
						{id: "ru", value: "RU"}
					]
				},
				{ }
			]
		};
	}
}

export default Settings;
