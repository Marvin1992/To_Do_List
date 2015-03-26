Template.monthlyTimed.helpers({
	
	datesInCurrentMonth: function() {
		// get the user's current month
		var currentDate = new Date();
		var _month = currentDate.getMonth();
		var _year = currentDate.getFullYear();

		var days = [];
		for (var i = 1; i <= daysInMonth(_month+1, _year); i++) {
			//console.log(new Date(_year, _month, i));
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