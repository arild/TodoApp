var TodoApp = function() {
	var eqCtl,

	Run = function() {
		$('body').html('<div id="app"></div>');
		$('#app').html(PresentTodoList());
		//get data
		//push data to app div
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

	PresentTodoList = function() {
		var data = Models.GetData('Arild');

		return Views.ItemList(data);
	};

	return {
		Run: Run,
		MustacheTest: MustacheTest,
		PresentTodoList: PresentTodoList
	};
}();

var Models = function() {
	var userData,				

	GetData = function (user) {
		if (userData == null) return null;
		return userData;
	};

	return {
		GetData: GetData
	};
}();

var Views = function () {
	var itemList = "Items:<ul>{{#items}} <li>{{text}}</li> {{/items}}</ul>",



	ItemList = function (data) {
		return render(itemList, data);
	},

	render = function (view, data) {
		var html = Mustache.to_html(view, data);
		return html;		
	};

	return {
		ItemList: ItemList
	};

}();