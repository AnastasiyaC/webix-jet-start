import {JetView} from "webix-jet";

import ContactsForm from "./startViews/contactsForm";
import ContactsList from "./startViews/contactsLst";

export default class Contacts extends JetView {
	config() {
		return {
			cols: [
				ContactsList,
				ContactsForm
			]
		};
	}
}
