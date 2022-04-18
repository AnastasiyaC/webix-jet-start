import {JetView} from "webix-jet";

export default class DatatableWithForm extends JetView {
	constructor(app, name, data) {
		super(app, name);
		this._gridData = data;
	}

	config() {
		return {
			rows: [
				{
					view: "form",
					localId: "form_update-datatable",
					elementsConfig: {
						margin: 10
					},
					cols: [
						{
							view: "text",
							name: "Name",
							invalidMessage: "Enter name"
						},
						{
							view: "button",
							value: "Add",
							width: 200,
							click: () => {
								this.addToDatatable();
							}
						}
					],
					rules: {
						Name: webix.rules.isNotEmpty
					}
				},
				{
					view: "datatable",
					localId: "datatable_main",
					editable: true,
					scrollX: false,
					select: true,
					columns: [
						{id: "id", header: "", width: 50},
						{id: "Name", header: "Name", editor: "text", fillspace: true},
						{id: "delete", header: "", template: "{common.trashIcon()}"}
					],
					onClick: {
						"wxi-trash": function (e, id) {
							webix.confirm({
								title: "Delete...",
								text: "Do you still want delete this line?"
							}).then(() => {
								this.remove(id);
							});
						}
					},
					rules: {
						Name: webix.rules.isNotEmpty
					}
				}
			]
		};
	}

	init() {
		this.$$("datatable_main").parse(this._gridData);
	}

	addToDatatable() {
		const form = this.$$("form_update-datatable");
		const datatable = this.$$("datatable_main");

		if (form.validate()) {
			const item = form.getValues();

			datatable.add(item);
			form.clear();
			webix.message("Datatable was updated!");
		}
	}
}
