var TodoApp = function() {
	var eqCtl,

	run = function() {
	},

	MustacheTest = function() {
		var view = {
			title : "Joe",
			calc : function() {
				return 2 + 4;
			}
		};
			
		var template = "{{title}} spends {{calc}}";
		var html = Mustache.to_html(template, view);
		return html;
	},

	getTodoList = function() {
		var data = {
			items : [ {text : "item 1"}, {text : "item 2"} ]
		};
		
		var template = "Items:<ul>{{#items}}"
				+ "<li>{{text}}</li>" + "{{/items}}</ul>";
		var html = Mustache.to_html(template, data);
		return html;
	};

	return {
		run : run,
		add : add,
		MustacheTest: MustacheTest,
		getTodoList : getTodoList
	};
}();