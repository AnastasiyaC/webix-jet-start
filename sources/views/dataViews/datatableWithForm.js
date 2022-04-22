import {JetView} from "webix-jet";

export default class DatatableWithForm extends JetView {
	constructor(app, data) {
		super(app);
		this._gridData = data;
	}

	config() {
		const _ = this.app.getService("locale")._;

		return {
			rows: [
				{
					view: "form",
					localId: "form_update-datatable",
					elementsConfig: {
						margin: 20
					},
					cols: [
						{
							view: "text",
							name: _("Name"),
							invalidMessage: "Enter name",
							on: {
								onFocus: () => {
									this.clearFormValidation();
								}
							}
						},
						{
							rows: [
								{
									view: "button",
									value: _("Add"),
									width: 200,
									click: () => {
										this.addToDatatable();
									}
								},
								{ }
							]
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
						{id: "Name", header: _("Name"), editor: "text", fillspace: true},
						{id: "delete", header: "", template: "{common.trashIcon()}"}
					],
					onClick: {
						"wxi-trash": (e, id) => {
							this.deleteDatatableItem(id);
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
		this.$$("datatable_main").sync(this._gridData);
	}

	addToDatatable() {
		this._gridData.waitData.then(() => {
			const _ = this.app.getService("locale")._;
			const form = this.$$("form_update-datatable");

			if (form.validate()) {
				const item = form.getValues();

				this._gridData.add(item);
				form.clear();
				webix.message(_("Update datatable"));
			}
		});
	}

	deleteDatatableItem(id) {
		const _ = this.app.getService("locale")._;

		webix.confirm({
			title: _("Delete"),
			text: _("Delete line"),
			ok: _("Yes"),
			cancel: _("No")
		}).then(() => {
			this._gridData.remove(id);
		});
	}

	clearFormValidation() {
		this.$$("form_update-datatable").clearValidation();
	}
}
