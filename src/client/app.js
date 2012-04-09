
var TodoApp = function() {
	$('body').html('<div id="app"></div>');

	var Run = function() {
		HandleLogin();
	},
	
	HandleLogin = function() {
		AddLogin();
		// Binds success callback to login form
		$("#loginButton").click(function() {
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

	FinishItem = function(id) {
		//$("li").css("border", "2px solid white").add("p").css("background", "green");
		$("li#" + id +"").css("border", "2px solid white").add("p").css("text-decoration", "line-through");		
	},

	PresentTodoList = function(userName) {
		Models.GetData(userName, function(data) {
			var html = Views.ItemList(data);
			$('#app').hide();
			$('#app').html(html);
			$('#app').fadeIn();
			PresentNewItemBox();
		});
	},

	PresentNewItemBox = function() {
		var input = Views.NewItemBox();
		$('#app').append(input);

		$("#newItemButton").click(function() {
			var newItem = $('#newItem').val();
			$('#items').append("<li id=0>"+newItem+"</li>");
		});
		
    };

	return {
		Run : Run,
		PresentTodoList : PresentTodoList,
		AddLogin: AddLogin,
		RemoveLogin : RemoveLogin,
		FinishItem : FinishItem,
		PresentNewItemBox : PresentNewItemBox
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
	itemListControl = '<h2 id="itemsHeader">{{user}}</h2><ul id="items">{{#items}} <li id="{{id}}">{{text}}  <a href="#" onClick="TodoApp.FinishItem(\'{{id}}\');" >[F]</a></li> {{/items}}</ul>',
	loginBox = '<form id="loginForm"><input id="userName" type="text"><input id="loginButton" type="submit" value="Submit" /></form>',
	newItemBox = '<form id="newItemForm"><textarea id="newItem" cols=68 rows=6 /><br><button id="newItemButton" class="button" type="button" value="Create">Create</button></form>',
	
	ItemList = function(data) {
		return render(itemListControl, data);
	},
	
	LoginBox = function() {
		return loginBox;
	},

	NewItemBox = function() {
		return newItemBox;
	},

	render = function(view, data) {
		var html = Mustache.to_html(view, data);
		return html;
	};

	return {
		ItemList : ItemList,
		LoginBox : LoginBox,
		NewItemBox : NewItemBox
	};
}();
