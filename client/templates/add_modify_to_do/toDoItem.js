// binding an event handler to the toDoItem to check it off
Template.toDoItem.events({
	'click #checked': function(){

		// get the current to do id
		var currentToDoId = this._id;

		// variable to hold the checked off status
		var checkedStatus;

		// toggle between checked states
		if(this.checked === "is-checked"){
			checkedStatus = "not-checked";
		} else if (this.checked === "not-checked"){
			checkedStatus = "is-checked";
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
			}
		});
	},
	'click #item-title': function(event){
		// jQuery target
		var target = $(event.target);

		// slide the div item open
		target.siblings().slideToggle("slow");
	}
});