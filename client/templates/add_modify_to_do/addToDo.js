// binding an event handler to the submit form in addToDo.html template
Template.addToDo.events({
	'submit form': function(e){
		// prevent the broswer from submitting the form
		e.preventDefault();

		// create an to_do object
		var to_do = {
			title: $(e.target).find('[name=title]').val(),
			description: $(e.target).find('[name=description]').val(),
			time: $(e.target).find('[name=time-select]').val(),
			day_time: $(e.target).find('[name=dayTime-select]').val(),
			checked: "not-checked"
		};

		Meteor.call('add_to_do', to_do, function(error,result){
			// display the error the user and abort
			if(error)
				return alert(error.reason);

			Router.go('emptyTemplate', {_id: result._id});
		});

	}
});