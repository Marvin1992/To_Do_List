Template.dailyList.helpers({
	toDo: function() {
		var user = Meteor.users.findOne();

		// get the user's day
		var newDate = new Date();
		var array = String(newDate).split(" ");
		var today = ""+array[0]+array[1]+array[2]+array[3]+"";

		if(user){
			// return the to-dos for today
			return To_Dos.find({author: user.username} ,{day: today});
		}
	}
});