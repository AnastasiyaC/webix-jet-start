import {JetView} from "webix-jet";

import contactsCollection from "../../models/contacts";

export default class ContactsList extends JetView {
	config() {
		return {
			rows: [
				{
					view: "list",
					localId: "contacts_list",
					template: "name: <b>#Name#</b><br>email: #Email#<br>country: <br>status: <span style=\"float: right;\" class=\"webix_icon wxi-close\"></span>",
					select: true,
					type: {
						height: 130
					},
					onClick: {
						"wxi-close": (e, id) => this.deleteContact(id)
					}
				},
				{
					view: "button",
					label: "Add",
					css: "webix_primary",
					click: () => {
						this.addNewContact();
					}
				},
				{ }
			]
		};
	}

	init() {
		const list = this.$$("contacts_list");
		list.parse(contactsCollection);

		this.setIdParam(list);
		this.on(list, "onAfterSelect", id => this.show(`./startPage?id=${id}`));
	}

	setIdParam(list) {
		const idParam = this.getParam("id") || list.getFirstId();

		if (!idParam) {
			this.showEmptyList();
			return;
		}

		this.setParam("id", idParam, true);
		list.select(idParam);
	}

	showEmptyList() {
		webix.message("Contact list is empty...");
		this.show("/top/startPage");
	}

	deleteContact(id) {
		webix.confirm({
			title: "Delete...",
			text: "Do you still want to delete this contact?"
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
		const list = this.$$("contacts_list");
		const newContact = {
			Name: "New Name",
			Email: "newemail@gmail.com",
			Status: 1,
			Country: 1
		};

		contactsCollection.add(newContact);
		list.select(list.getLastId());
	}
}
