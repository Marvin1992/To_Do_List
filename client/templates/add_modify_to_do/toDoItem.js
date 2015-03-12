Template.toDoItem.helpers({
	// user owns to do
	ownToDo: function() {
		return this.userId === Meteor.userId();
	}
});

// binding an event handler to the toDoItem to check it off
Template.toDoItem.events({
		'click #checked': function(){

		// get the current to do id
		var currentToDoId = this._id;

		// variable to hold the checked off status
		var checkedStatus;

		// toggle between checked states
		if(this.checked === "is-checked"){
			var checkedStatus = "not-checked";
		} else if (this.checked === "not-checked"){
			var checkedStatus = "is-checked";
		}

		// create an to_do object
		var to_do_properties = {
			checked: checkedStatus
		};

		// update the To_Dos in the database by updating the to_do_properties of the currentId
		To_Dos.update(currentToDoId, {$set: to_do_properties}, function(error) {
			if(error) {
				// display the error to the user
				alert(error.reason);
			} else {
				// reload page
				Router.go('dailyTimed', {_id: currentToDoId});
			}
		});

	}
});