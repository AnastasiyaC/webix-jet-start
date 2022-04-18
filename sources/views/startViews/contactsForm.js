import {JetView} from "webix-jet";

export default class ContactsForm extends JetView {
	config() {
		return {
			view: "form",
			width: 500,
			elements: [
				{view: "text", label: "Name", name: "name"},
				{view: "text", label: "Email", name: "email"},
				{view: "text", label: "Country", name: "country"},
				{cols: [
					{view: "button", value: "Cancel", width: 200},
					{ },
					{view: "button", value: "Save", css: "webix_primary", width: 200}
				]},
				{ }
			]
		};
	}
}
