import {JetView} from "webix-jet";

import contactsCollection from "../../models/contacts";
import countriesCollection from "../../models/countries";
import statusesCollection from "../../models/statuses";

export default class ContactsForm extends JetView {
	config() {
		return {
			view: "form",
			localId: "contacts_form",
			width: 500,
			elements: [
				{
					view: "text",
					label: "Name",
					name: "Name"
				},
				{
					view: "text",
					label: "Email",
					name: "Email"
				},
				{
					view: "combo",
					label: "Country",
					name: "Country",
					options: {
						body: {
							template: "#Name#"
						},
						data: countriesCollection
					}
				},
				{
					view: "combo",
					label: "Status",
					name: "Status",
					options: {
						body: {
							template: "#Name#"
						},
						data: statusesCollection
					}
				},
				{
					cols: [
						{
							view: "button",
							value: "Cancel",
							width: 200
						},
						{ },
						{
							view: "button",
							value: "Save",
							css: "webix_primary",
							width: 200,
							click: () => {
								this.updateContact();
							}
						}
					]},
				{ }
			],
			rules: {
				Name: webix.rules.isNotEmpty,
				Email: webix.rules.isEmail,
				Status: webix.rules.isChecked,
				Country: webix.rules.isChecked
			}
		};
	}

	urlChange(view) {
		const id = this.getParam("id");

		if (id) {
			const item = contactsCollection.getItem(id);
			view.setValues(item);
		}
		else {
			this.$$("contacts_form").clear();
		}
	}

	updateContact() {
		const form = this.$$("contacts_form");
		const formValues = form.getValues();

		if (!form.validate()) {
			webix.message("Form is incomplete!!! Fill it to save the contact!");
			return;
		}
		contactsCollection.updateItem(formValues.id, formValues);
		webix.message("Contact is updated");
	}
}
