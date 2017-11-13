var bar = {
	view:"chart",
	type:"bar",
	value:"#age#",
	label:"#age#",
	barWidth:35,
	radius:10,
	gradient:"falling",
	data: users
};

var userFilter = {
	view: "form",
	id: "userForm",
	elements:[
		{ view:"text", id:"list_input", label:"User",
			on:{
				"onTimedKeyPress":function(){
					var value = this.getValue().toLowerCase();
					$$("list").filter(function(obj){
						return obj.name.toLowerCase().indexOf(value)==0;
					})
				}
			}
		},
		{ 
			cols:[
				{view:"button", value:"Name ASC",
					click: function() {
						$$('list').sort('#name#','asc');
					}
				},
				{view:"button", value:"Name DESC",
					click: function() {
						$$('list').sort('#name#','desc');
					}
				}
			]
		},
		{}
	]

};

var listUsers = {
	view:"list",
	id:"list",
	height:300,
	template:"#id#. <b>#name#</b> <div style='padding-left:18px'> Age: #age#, Country: #country# </div>",
	type:{
		height:62
	},
	select:true,
	data: users,
	editable:true,
	editor:"text",
	editValue:"name",
	rules:{
		name: function(value) {
			if(!value.match(/^\d+$/)&&value!=""){return value;}
		}
	}
};