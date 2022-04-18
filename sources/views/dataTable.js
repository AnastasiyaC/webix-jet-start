import {JetView} from "webix-jet";

export default class DataTable extends JetView {
	constructor(app, name, data) {
		super(app, name);
		this._gridData = data;
	}

	config() {
		return {
			rows: [
				{
					view: "form",
					localId: "form",
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
					localId: "datatable",
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

	init(view) {
		view.queryView("datatable").parse(this._gridData);
	}

	addToDatatable() {
		const form = this.$$("form");

		if (form.validate()) {
			const item = form.getValues();

			this.$$("datatable").add(item);
			form.clear();
			webix.message("Datatable was updated!");
		}
	}
}
