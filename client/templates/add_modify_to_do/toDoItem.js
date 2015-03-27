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

	}
});


// Template rendered callback
Template.toDoItem.rendered = function(){
	// is executed after DOM has rendered
	Meteor.setTimeout(function(){

		// get a reference to our list elements
		var weeklyTimed_li = $('.weeklyTimed-li');
		var dailyTimed_li = $('.dailyTimed-li');

		// change the 24 hour display to the US time system
		for(var i=0; i<weeklyTimed_li.length; i++){
			// set the time slot attribute for each weekly item that we pass later with router.go
			weeklyTimed_li[i].setAttribute('timeslot', Number(weeklyTimed_li[i].innerHTML));

			// change the appearance of the 24 to US time
			//weeklyTimed_li[i].innerHTML = convertTimeBack(Number(weeklyTimed_li[i].innerHTML));
		}


	// even a delay of 0ms helps rendering the list
	}, 0);
}