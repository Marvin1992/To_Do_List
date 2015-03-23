Template.monthlyTimed.helpers({
	toDoMonthly: function() {
		// get the current user
		var user = Meteor.user();

		// get the user's day
		var currentDate = new Date();
		var _month = currentDate.getMonth() + 1;
		var _year = currentDate.getFullYear();

		if(user){
			// return the to-dos for this month and sort them ascending
			return To_Dos.find({author: user.username, month: _month, year: _year}, {sort: {day: 1}});
		}
	}
});