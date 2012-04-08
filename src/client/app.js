
var TodoApp = function() {
	$('body').html('<div id="app"></div>');

	var Run = function() {
		HandleLogin();
	},
	
	HandleLogin = function() {
		AddLogin();
		// Binds success callback to login form
		$("form").submit(function() {
			var userName = $('#userName').val();
			RemoveLogin();
			PresentTodoList(userName);
		});		
	},
	
	AddLogin = function() {
		var html = Views.LoginBox();
		$('#app').html(html);
	},
	
	RemoveLogin = function() {
		$('form').remove();
	},

	PresentTodoList = function(userName) {
		Models.GetData(userName, function(data) {
			var html = Views.ItemList(data);
			$('#app').html(html);
		});
	};

	return {
		Run : Run,
		PresentTodoList : PresentTodoList,
		AddLogin: AddLogin,
		RemoveLogin : RemoveLogin
	};
}();


var Models = function() {
	var GetData = function(user, callback) {
		$.ajax({
			url : '/user/' + user,
			success : callback,
			error : function() {
				alert('getting user data failed');
			}
		});
	};

	return {
		GetData : GetData
	};
}();


var Views = function() {
	var itemList = '<h2 id="itemsHeader">{{user}}</h2><ul id="items">{{#items}} <li id="{{id}}">{{text}}</li> {{/items}}</ul>',
	loginBox = '<form><input id="userName" type="text"><input id="loginButton" type="submit" value="Submit" /></form>',
	
	
	ItemList = function(data) {
		return render(itemList, data);
	},
	
	LoginBox = function() {
		return loginBox;
	},

	render = function(view, data) {
		buster.log(data);
		var html = Mustache.to_html(view, data);
		return html;
	};

	return {
		ItemList : ItemList,
		LoginBox : LoginBox
	};
}();
