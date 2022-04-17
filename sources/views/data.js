import {JetView} from "webix-jet";

import {countries} from "../models/countries";
import {statuses} from "../models/statuses";
import DataTable from "./dataTable";


export default class DataView extends JetView {
	config() {
		return {
			rows: [
				{
					view: "tabbar",
					value: "countries",
					multiview: true,
					options: [
						{id: "countries", value: "Countries"},
						{id: "statuses", value: "Statuses"}
					]
				},
				{
					cells: [
						{id: "countries", rows: [new DataTable(this.app, "", countries)]},
						{id: "statuses", rows: [new DataTable(this.app, "", statuses)]}
					]
				}
			]
		};
	}
}
