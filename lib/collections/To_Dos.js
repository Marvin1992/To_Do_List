// create new mongo collection
To_Dos = new Mongo.Collection('toDos');

// ensuring no outer person can change your to dos
To_Dos.allow({
	update: function(userId, to_do) { return ownsDocument(userId, to_do); },
	remove: function(userId, to_do) { return ownsDocument(userId, to_do); },
});

Meteor.methods({
	add_to_do: function(to_do_attributes){
		check(Meteor.userId(), String);
		check(to_do_attributes, {
			title: String,
			description: String,
			time: String,
			day_time : String,
			checked: String
		});

		var user = Meteor.user();

		// get the user's day
		var newDate = new Date();
		var array = String(newDate).split(" ");
		var today = ""+array[0]+array[1]+array[2]+array[3]+"";

		// extend the to_do_attributes object with three more properties
		var to_do = _.extend(to_do_attributes, {
			userId: user._id,
			author: user.username,
			submitted: newDate,
			day: today
		});

		// insert the new object into the database
		var toDoId = To_Dos.insert(to_do);

		return {
			// return the resulting id to the client
			_id: toDoId
		};
	}
});