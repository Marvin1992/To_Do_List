Template.dailyList.helpers({
	toDo: function() {
		// get the current user
		var user = Meteor.users.findOne();

		// get the user's day
		var currentDate = new Date();
		var _day = currentDate.getDate();
		var _month = currentDate.getMonth() + 1;
		var _year = currentDate.getFullYear();

		if(user){
			// return the to-dos for today that belong to the current user
			return To_Dos.find({author: user.username, day: _day, month: _month, year: _year});
		}
	}
});