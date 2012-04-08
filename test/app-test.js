
buster.testCase("TodoApp", {
    setUp: function () {
        this.clock = this.useFakeTimers();
        
        TodoApp.Run();
    },
    
    'MustacheTest': function() {
		  assert.equals(TodoApp.MustacheTest(), 'Joe spends 6');
    },

    'Run' : function() {
      buster.log(document.body.innerHTML);
      refute.equals($('#app').html(), '');
    },    
	
    'PresentTodoList': function() {
    	 var arild = {
              'user' : 'Arild',
              'items' : [ 
                  { 'id' : '1', 'text' : 'do stuff'  },
                  { 'id' : '3', 'text' : 'do stuff again'  }
                ]},

            gaute = {
                'user' : 'Gaute',
                'items' : [ 
                    { 'id' : '2', 'text' : 'do stuff OMG'  },
                    { 'id' : '4', 'text' : 'do stuff again OMG'  }
                  ]};
      Models.userData = arild;
      buster.log(TodoApp.PresentTodoList());

    }
});

buster.testCase("Views", {
    setUp: function () {
    },

    'ItemList': function () {
        var data = { items : [ {text : "item 1"}, {text : "item 2"} ] };
        var html = Views.ItemList(data);
        buster.log(html);
        assert.equals($('li:eq(0)', html).html(), 'item 1' );
        assert.equals($('li:eq(1)', html).html(), 'item 2' );
    }
});