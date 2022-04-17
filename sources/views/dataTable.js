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
					elementsConfig: {
						margin: 10
					},
					cols: [
						{
							view: "text",
							name: "name"
						},
						{
							view: "button",
							value: "Add",
							width: 200
						}
					]
				},
				{
					view: "datatable",
					editable: true,
					scrollX: false,
					select: true,
					columns: [
						{id: "id", header: "", width: 50},
						{id: "Name", header: "Name", fillspace: true},
						{id: "delete", header: "", template: "{common.trashIcon()}"}
					]
				}
			]
		};
	}

	init(view) {
		view.queryView("datatable").parse = this._gridData;
	}
}
