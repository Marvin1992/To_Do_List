// create new mongo collection
Days_Done = new Mongo.Collection('bonus');

Meteor.methods({
	update_todo_status: function(to_do_properties, todoID, toDoDay){
		check(Meteor.userId(), String);
		check(to_do_properties, {
			checked: String,
			checkedTime: Date
		});

		// update the To_Dos in the database by updating the to_do_properties of the currentId
		To_Dos.update(todoID, {$set: to_do_properties}, function(error) {
			if(error) {
				// display the error to the user
				alert(error.reason);
			}
		});

		// add a user id to the object
		toDoDay.userId = Meteor.userId();

		// add the donetime to the object
		toDoDay.checkedTime = to_do_properties.checkedTime;

		// find the day in the collection
		var dayRecord = Days_Done.findOne(toDoDay);
		
		// if there is no dayRecord create one otherwise the id matches the incoming id
		if(!dayRecord){
			var days_done_id = Days_Done.insert(toDoDay);
		} else {
			days_done_id = dayRecord._id;
		}

		// add an additional query parameter
		toDoDay.checked = 'not-checked';

		// update the collection's bonus to false, 
		// if there is a not-checked toDoDay in the To_Dos collection
		if(To_Dos.findOne(toDoDay)){
			Days_Done.update(days_done_id, {$set: {bonus: false}})
		} else {
			Days_Done.update(days_done_id, {$set: {bonus: true}})
		}

		// if the today lay within the window set bonus to true

		// else to false

	}
});