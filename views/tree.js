var tree = {
	id:"tree",	
	view:"treetable",
	editable:true,
	columns:[ 
		{ id:"id", header:"", width:50}, 
		{ id:"title", editor:"text", header:"Film title", width:250, 
		template:"{common.treetable()} #title#"}, 
		{ id:"price", editor:"text", header:"Price", width:200} 
	],
	rules:{
		title: function(value) {
			if(!value.match(/^\d+$/)&&value!=""){return value;}
		},
		price: function(value) {
			return value > 0;
		}
	},

	select:true,

	data: treeInfo,
	
	on:{
		"onAfterLoad":function(){
			$$("tree").openAll();
		}
	}
		
};
