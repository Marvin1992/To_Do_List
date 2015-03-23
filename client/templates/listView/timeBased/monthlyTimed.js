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
	},

	datesInCurrentMonth: function() {
		// get the user's current month
		var currentDate = new Date();
		var _month = currentDate.getMonth();
		var _year = currentDate.getFullYear();

		var days = [];
		for (var i = 1; i <= daysInMonth(_month, _year); i++) {
			days.push(new Date(_year, _month, i));
		}

		return days;
	},

	todosForDay: function() {
		return To_Dos.find({
			author: Meteor.user().username, 
			month: this.getMonth() + 1, 
			year: this.getFullYear(),
			day: this.getDate()  
		});
	}
});