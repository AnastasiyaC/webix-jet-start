import {JetView} from "webix-jet";

import contactsCollection from "../../models/contacts";
import countriesCollection from "../../models/countries";
import statusesCollection from "../../models/statuses";

export default class ContactsForm extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		return {
			view: "form",
			localId: "contacts_form",
			width: 500,
			elements: [
				{
					view: "text",
					label: _("Name"),
					name: "Name",
					on: {
						onFocus: () => {
							this.clearFormValidation();
						}
					}
				},
				{
					view: "text",
					label: _("Email"),
					name: "Email",
					on: {
						onFocus: () => {
							this.clearFormValidation();
						}
					}
				},
				{
					view: "combo",
					label: _("Country"),
					name: "Country",
					options: {
						body: {
							template: "#Name#"
						},
						data: countriesCollection
					},
					on: {
						onFocus: () => {
							this.clearFormValidation();
						}
					}
				},
				{
					view: "combo",
					label: _("Status"),
					name: "Status",
					options: {
						body: {
							template: "#Name#"
						},
						data: statusesCollection
					},
					on: {
						onFocus: () => {
							this.clearFormValidation();
						}
					}
				},
				{
					cols: [
						{
							view: "button",
							value: _("Cancel"),
							width: 200,
							click: () => {
								this.calcelContactListUpdate();
							}
						},
						{ },
						{
							view: "button",
							value: _("Save"),
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

	urlChange() {
		this.setFormValues();
	}

	setFormValues() {
		const id = this.getParam("id");
		const form = this.$$("contacts_form");

		if (id) {
			const item = contactsCollection.getItem(id);
			form.setValues(item);
		}
		else {
			form.clear();
		}
	}

	updateContact() {
		const _ = this.app.getService("locale")._;
		const form = this.$$("contacts_form");
		const formValues = form.getValues();

		if (!form.validate()) {
			webix.message(_("Incomplete form"));
			return;
		}
		contactsCollection.updateItem(formValues.id, formValues);
		webix.message(_("Update contact"));
	}

	clearFormValidation() {
		this.$$("contacts_form").clearValidation();
	}

	calcelContactListUpdate() {
		this.setFormValues();
	}
}
