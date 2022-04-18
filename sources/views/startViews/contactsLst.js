import {JetView} from "webix-jet";

import contacts from "../../models/contacts";

export default class ContactsList extends JetView {
	config() {
		return {
			view: "list",
			template: "#Name#<br>#Email#<br>from country #Country#",
			select: true,
			data: contacts,
			type: {
				height: 100
			}
		};
	}
}
