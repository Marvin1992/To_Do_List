Template.toDosEdit.events({
	'submit form': function(e){
		e.preventDefault();

		// get the current to do id
		var currentToDoId = this._id;

		// get the to do properties
		var to_do_properties = {
			title: $(e.target).find('[name=title]').val(),
			description: $(e.target).find('[name=description]').val(),
			time: $(e.target).find('[name=time]').val(),
			day_time: $(e.target).find('[name=dayTime-select]').val()
		}

		// update the To_Dos in the database by updating the to_do_properties of the currentId
		To_Dos.update(currentToDoId, {$set: to_do_properties}, function(error) {
			if(error) {
				// display the error to the user
				alert(error.reason);
			} else {
				// go back to the overview of to dos
				Router.go('toDoList', {_id: currentToDoId});
			}
		});
	},

	'click .delete': function(e){
		e.preventDefault();

		// ask the user a confirmation question whether to delete the to do or not
		if(confirm("Delete this To-Do?")) {
			// get the current to do id
			var currentToDoId = this._id;

			// remove the current to do id from the database
			To_Dos.remove(currentToDoId);

			// go back to the overview of to dos
			Router.go('toDoList');
		}
	}
});