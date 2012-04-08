buster.testCase("TodoApp Run", {
	setUp : function() {
		this.clock = this.useFakeTimers();
		this.server = sinon.fakeServer.create();
	},

	tearDown : function() {
		this.server.restore();
	},

	'Run - should add some content when application is executed' : function() {
		assert.equals($('#app').html(), '');
		TodoApp.Run();
		refute.equals($('#app').html(), '');
	},

	'AddRemoveLogin' : function() {
		TodoApp.AddLogin();
		assert.defined($('form'));
		TodoApp.RemoveLogin();
		assert.isNull($('form').html());		
	},
	
	'HandleLogin - should remove login dom' : function() {
		TodoApp.Run();
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
		assert.equals($('li:eq(0)').attr('id'), '1');
		assert.equals($('li:eq(1)').html(), 'do stuff again');		
		assert.equals($('li:eq(1)').attr('id'), '3');
		assert.equals($('#itemsHeader').html(), 'arild');
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
