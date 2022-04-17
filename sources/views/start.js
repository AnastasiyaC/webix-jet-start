import {JetView} from "webix-jet";

import {contacts} from "../models/contacts";

export default class Contacts extends JetView {
	config() {
		return {
			cols: [
				{
					view: "list",
					template: "#Name#<br>#Email#<br>from country #Country#",
					select: true,
					data: contacts,
					type: {
						height: 100
					}
				},
				{
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
				}
			]
		};
	}
}
