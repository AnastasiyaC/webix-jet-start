const statuses = [
	{id: 1, Name: "Busy", Icon: "cogs"},
	{id: 2, Name: "Open", Icon: "user"}
];

const statusesCollection = new webix.DataCollection({
	data: statuses
});

export default statusesCollection;
