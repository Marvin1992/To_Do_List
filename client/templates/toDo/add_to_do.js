// binding an event handler to the submit form in add_to_do.html template
Template.add_to_do.events({
	'submit form': function(e){
		// prevent the broswer from submitting the form
		e.preventDefault();

		// create an to_do object
		var to_do = {
			title: $(e.target).find('[name=title').val(),
			description: $(e.target).find('[name=description]').val(),
			time: $(e.target).find('[name=time]').val()
		};

		// the insert function returns a generated _id that has been inserted into the e
		to_do._id = To_Dos.insert(to_do);
		Router.go('toDoList', to_do);
	}
});