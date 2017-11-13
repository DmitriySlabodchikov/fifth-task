var date = (new Date()).getFullYear();

var filmCollection = new webix.DataCollection({
  data:small_film_set
});

var table = {
	view:"datatable",
	id: "datatable",
	select:true,
	editable:true,
	columns:[
		{ id:"title", editor:"text",	header:["Film title", {content:"textFilter"}], sort:"string", width:200},
		{ id:"year", editor:"text",	header:["Released", {content:"textFilter"}] , sort:"int", width:120 },
		{ id:"votes", editor:"text",	header:["Votes", {content:"textFilter"}], sort:votes, width:120},
		{ id:"rating", editor:"text",	header:["Rating", {content:"textFilter"}], sort:rating, width:80},
		{ id:"rank", editor:"text",	header:["Rank", {content:"textFilter"}], sort:"int", width:80},	
	],
	rules:{
		title: webix.rules.isNotEmpty,
		year: function(value) {
			return value > 1970 && value <= date;
		  },

		votes: function(value) {
			return value > 0 && value < 100000;
		},

		rating: function(value) {
			return value > 0;
		}
	}
};

var dataview = {
	view:"dataview",
	select:true,
	id:"dataview",
	editable:true,
	editor:"text",
	editValue:"title",
    template:"#title#, Year: #year#",
    xCount:3,
	rules:{
		title: webix.rules.isNotEmpty
	}
};
		
var form = {
			gravity: 5,
	view: "form",
	id: "form",
	elements:[
		{view:"template", template:"edit form", type:"section"},
		{ view:"text", value:"Title<input>", name:"title", invalidMessage: "Not empty!", label:"Title"},
		{ view:"text", value:"2017",name:"year",  invalidMessage: "Enter year between 1970 and "+date, label:"Year"},
		{ view:"text", value:"5",name:"rating", invalidMessage: "Number, greater than 0", label:"Rating"},
		{ view:"text",value:"25", name:"votes", invalidMessage: "Must be less than 100000, not empty", label:"Votes"},
		{ cols:[
			{view:"button", value:"Add new", type:"form",
				click: function() {
					if ($$("form").validate()) {

						var item = $$("form").getValues();
						for (key in item){
							item[key] = item[key].replace(/<[^>]+>/g,'');
						}
						filmCollection.add(item);
						
						webix.message("Data entered correctly");
						
					}
				}
			},
			{view:"button", value:"Delete", type:"danger", click: function() {
				var id = $$("dataview").getSelectedId() || $$("datatable").getSelectedId();
				filmCollection.remove(id);
				}
			},
			{view:"button", value:"Clear form",click: function() {
				$$("form").clear();
				$$("form").clearValidation();
			}
		}
	]},
	{}
	], 
	rules:{
		title: webix.rules.isNotEmpty,
		year: function(value) {
			return value > 1970 && value <= date;
		  },

		votes: function(value) {
			return value > 0 && value < 100000;
		},

		rating: function(value) {
			return value > 0;
		}
	}, 
	on:{
		onValidationError: function(key, data) {
			webix.message({
				text: key.data + " field is incorrect",
				type: "error"
			});
		}
	}		
};

function votes(a,b){	
	a = a.votes.toString().replace(",",".");
	b = b.votes.toString().replace(",",".");
	return a > b ? 1 : -1;
};

function rating(a,b){	
	a = a.rating.toString().replace(",",".");
	b = b.rating.toString().replace(",",".");
	return a > b ? 1 : -1;
};

