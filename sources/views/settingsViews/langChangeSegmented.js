import {JetView} from "webix-jet";

export default class LangChangeSegmented extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const lang = this.app.getService("locale").getLang();

		return {
			view: "segmented",
			localId: "language_change",
			value: lang,
			label: _("Language"),
			options: [
				{id: "en", value: _("English")},
				{id: "ru", value: _("Russian")}
			],
			click: () => this.toggleLanguage()
		};
	}

	toggleLanguage() {
		const langs = this.app.getService("locale");
		const value = this.$$("language_change").getValue();
		langs.setLang(value);
	}
}
