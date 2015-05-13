// binding an event handler to the toDoItem to check it off
Template.toDoItem.events({
	'click #checked': function(){

		// get the current to do id
		var currentToDoId = this._id;

		// variable to hold the checked off status
		var checkedStatus;
		var taskAccomplished;

		// variable for the date
		var now = new Date();

		// toggle between checked states
		if(this.checked === "is-checked"){
			checkedStatus = "not-checked";
			taskAccomplished = false;
		} else if (this.checked === "not-checked"){
			checkedStatus = "is-checked";
			taskAccomplished = true;
		}

		// create an to_do object
		var to_do_properties = {
			checked: checkedStatus,
			checkedTime: now
		};

		var toDoDay = {
			day: this.day,
			month: this.month,
			year: this.year,
			hour: this.mTime
		};

		// add the day to task accomplished collection
		Meteor.call('update_todo_status', to_do_properties, currentToDoId, toDoDay, function(error,result){
			// display the error the user
			if(error)
				return alert(error.reason);
		});

	},
	'click #item-title': function(event){
		// jQuery target
		var target = $(event.target);

		// slide the div item open
		target.siblings().slideToggle("slow");
	}
});