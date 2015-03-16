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
		var currentDate = new Date();
		var _day = currentDate.getDate();
		var _month = currentDate.getMonth() + 1;
		var _year = currentDate.getFullYear();

		// extend the to_do_attributes object with three more properties
		var to_do = _.extend(to_do_attributes, {
			userId: user._id,
			author: user.username,
			day: _day,
			month: _month,
			year: _year
		});

		// insert the new object into the database
		var toDoId = To_Dos.insert(to_do);

		return {
			// return the resulting id to the client
			_id: toDoId
		};
	}
});