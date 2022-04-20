import {JetView} from "webix-jet";

import countriesCollection from "../models/countries";
import statusesCollection from "../models/statuses";
import DatatableWithForm from "./dataViews/datatableWithForm";


export default class DataView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		return {
			rows: [
				{
					view: "tabbar",
					value: "countries",
					multiview: true,
					options: [
						{id: "countries", value: _("Countries")},
						{id: "statuses", value: _("Statuses")}
					]
				},
				{
					cells: [
						{id: "countries", rows: [new DatatableWithForm(this.app, countriesCollection)]},
						{id: "statuses", rows: [new DatatableWithForm(this.app, statusesCollection)]}
					]
				}
			]
		};
	}
}
