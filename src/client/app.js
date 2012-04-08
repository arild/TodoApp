
var TodoApp = function() {
	var Run = function() {
		$('body').html('<div id="app"></div>');
		PresentLogin();
	},
	
	PresentLogin = function() {
		var html = Views.LoginBox();
		$('#app').html(html);

		var callback = function(data) {
			RemoveLogin();
			PresentTodoList(user);
		};

		$("form").submit(callback);		
	},
	
	RemoveLogin = function() {
		$('form').remove();
	},

	PresentTodoList = function(user) {
		var callback = function(data) {
			var html = Views.ItemList(data);
			$('#app').html(html);
		};
		Models.GetData(user, callback);
	};

	return {
		Run : Run,
		PresentTodoList : PresentTodoList,
		RemoveLogin : RemoveLogin
	};
}();


var Models = function() {
	
	GetData = function(user, callback) {
		$.ajax({
			url : '/user/' + user,
			success : callback,
			error : function(objRequest) {
				buster.log('FAIL: ' + objRequest);
			}
		});
	};

	return {
		GetData : GetData
	};
}();


var Views = function() {
	var itemList = 'Items:<ul>{{#items}} <li>{{text}}</li> {{/items}}</ul>',
	loginBox = '<form><input type="text"><input id="loginButton" type="submit" value="Submit" /></form>',
	
	
	ItemList = function(data) {
		return render(itemList, data);
	},
	
	LoginBox = function() {
		return loginBox;
	},

	render = function(view, data) {
		var html = Mustache.to_html(view, data);
		return html;
	};

	return {
		ItemList : ItemList,
		LoginBox : LoginBox
	};
}();
