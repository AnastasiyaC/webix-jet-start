import {JetView} from "webix-jet";

import contactsCollection from "../../models/contacts";
import countriesCollection from "../../models/countries";
import statusesCollection from "../../models/statuses";

export default class ContactsList extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		return {
			rows: [
				{
					view: "list",
					localId: "contacts_list",
					template: (obj) => {
						const country = countriesCollection.getItem(obj.Country).Name || "country not found";
						const status = statusesCollection.getItem(obj.Status).Name || "country not found";

						return `name: <b>${obj.Name}</b><br>email: ${obj.Email}<br>country: ${country}<br>status: ${status}`;
					},
					select: true,
					type: {
						height: 130
					},
					onClick: {
						"wxi-close": (e, id) => this.deleteContact(id)
					}
				},
				{
					view: "toolbar",
					cols: [
						{ },
						{
							template: `<span>${_("Add new contact")}:</span>`,
							borderless: true,
							css: "template--add_contact"
						},
						{
							view: "button",
							label: _("Add"),
							css: "webix_primary",
							width: 200,
							click: () => {
								this.addNewContact();
							}
						}
					]
				}
			]
		};
	}

	init() {
		const list = this.$$("contacts_list");
		list.parse(contactsCollection);

		this.setIdParam();
		this.on(list, "onAfterSelect", id => this.show(`./startPage?id=${id}`));
	}

	urlChange() {
		const idParam = this.getParam("id");
		const list = this.$$("contacts_list");

		if (idParam) return;
		list.unselect(list.getSelectedId());
	}

	setIdParam() {
		const list = this.$$("contacts_list");
		const idParam = this.getParam("id") || list.getFirstId();

		if (!idParam) {
			this.showEmptyList();
			return;
		}

		this.setParam("id", idParam, true);
		list.select(idParam);
	}

	showEmptyList() {
		const _ = this.app.getService("locale")._;

		webix.message(_("Empty list"));
		this.show("/top/startPage");
	}

	deleteContact(id) {
		const _ = this.app.getService("locale")._;

		webix.confirm({
			title: _("Delete"),
			text: _("Delete contact"),
			ok: _("Yes"),
			cancel: _("No")
		}).then(
			() => {
				const list = this.$$("contacts_list");
				contactsCollection.remove(id);

				const firstId = list.getFirstId();

				if (firstId) {
					list.select(firstId);
				}
				else {
					this.showEmptyList();
				}
			}
		);
	}

	addNewContact() {
		const _ = this.app.getService("locale")._;
		const list = this.$$("contacts_list");
		const newContact = {
			Name: "New Name",
			Email: "newemail@gmail.com",
			Status: 1,
			Country: 1
		};

		list.select(contactsCollection.add(newContact));
		webix.message(_("Add contact"));
	}
}
