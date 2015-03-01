// create new mongo collection
To_Dos = new Mongo.Collection('toDos');


Meteor.methods({
	add_to_do: function(to_do_attributes){
		check(Meteor.userId(), String);
		check(to_do_attributes, {
			title: String,
			description: String,
			time: String
		});

		var user = Meteor.user();

		// extend the to_do_attributes object with three more properties
		var to_do = _.extend(to_do_attributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		// insert the new object into the database
		var toDoId = To_Dos.insert(to_do);

		return {
			// return the resulting id to the client
			_id: toDoId
		};
	}
});