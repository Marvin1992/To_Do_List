Template.dailyList.helpers({
	toDo: function() {
		// get the current user
		var user = Meteor.users.findOne();

		// get the user's day
		var newDate = new Date();
		var array = String(newDate).split(" ");
		var today = ""+array[0]+array[1]+array[2]+array[3]+"";

		// debugging purposes
		console.log(today);

		if(user){
			// return the to-dos for today that belong to the current user
			return To_Dos.find({author: user.username, day: today});
		}
	}
});