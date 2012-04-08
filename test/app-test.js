buster.testCase("TodoApp", {
	setUp : function() {
		this.clock = this.useFakeTimers();
		this.server = sinon.fakeServer.create();
		TodoApp.Run();
	},

	tearDown : function() {
		this.server.restore();
	},

	'Run' : function() {
		refute.equals($('#app').html(), '');
	},

	'PresentLogin' : function() {
		assert.defined($('form'));
		TodoApp.RemoveLogin();
		assert.isNull($('form').html());		
	},
	
	'PresentLoginSubmit' : function() {
		$('#loginButton').click();
		assert.isNull($('form').html());
	},
	
	'PresentTodoList' : function() {
		this.server.respondWith("GET", "/user/arild", [ 200, {
			"Content-Type" : "application/json"
				
		}, '{ "user" : "arild", "items" : [ {"id" : "1", "text" : "do stuff"}, {"id" : "3", "text" : "do stuff again"} ]}' ]);
		TodoApp.PresentTodoList('arild');
		this.server.respond();
		
		assert.equals($('li:eq(0)').html(), 'do stuff');
		assert.equals($('li:eq(1)').html(), 'do stuff again');		
	}
	
});


buster.testCase("Views", {
	setUp : function() {
	},

	'ItemList' : function() {
		var data = {
			items : [ {
				text : "item 1"
			}, {
				text : "item 2"
			} ]
		};
		
		var html = Views.ItemList(data);
		assert.equals($('li:eq(0)', html).html(), 'item 1');
		assert.equals($('li:eq(1)', html).html(), 'item 2');
	}
});
