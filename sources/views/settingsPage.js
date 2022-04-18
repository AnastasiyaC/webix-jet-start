import {JetView} from "webix-jet";

import LangChangeSegmented from "./settingsViews/langChangeSegmented";

class Settings extends JetView {
	config() {
		return {
			rows: [
				LangChangeSegmented,
				{ }
			]
		};
	}
}

export default Settings;
