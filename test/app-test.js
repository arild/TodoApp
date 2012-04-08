
buster.testCase("CSI", {
    setUp: function () {
        this.clock = this.useFakeTimers();
        
        this.data = {
            persons: [{firstName: 'firsth0', lastName: 'last0', info: 'info0'},
                      {firstName: 'first1', lastName: 'last1', info: 'info1'}],
                      
              getFullName: function (idx) {
            	  return this.persons[idx].firstName + ' ' + this.persons[idx].lastName;
              },
              getInfo: function(idx) {
				return this.persons[idx].info;
			}
        }
        
        document.body.innerHTML = '<table id="people"><tbody></tbody></table><div id="more_info"></div>';
        TodoApp.run();
    },
    
    'MustacheTest': function() {
		assert.equals(TodoApp.MustacheTest(), 'Joe spends 6');
	},
	
    'getTodoList': function() {
    	buster.log(TodoApp.getTodoList());
    	assert.equals(5, 5);
    }
});


