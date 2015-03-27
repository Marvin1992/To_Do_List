Template.dailyTimed.helpers({
	hours: function() {
		// get the user's current month
		var currentDate = new Date();
		var _day = currentDate.getDate();
		var _month = currentDate.getMonth();
		var _year = currentDate.getFullYear();

		// array that holds our hours
		var hours = [];
		for (var i = 1; i <= 24; i++) {
			hours.push(new Date(_year, _month, _day, i));
		}

		return hours;
	},
	/*
	toDoToday: function() {
		// get the user's day
		var currentDate = new Date();
		var _hour = currentDate.getHours();
		var _day = currentDate.getDate();
		var _month = currentDate.getMonth() + 1;
		var _year = currentDate.getFullYear();


		// return the to-dos for today that belong to the current user
		return To_Dos.find({
			author: Meteor.user().username, 
			day: _day, 
			month: _month, 
			year: _year
		});
	}
	*/
	toDoToday: function() {
		return To_Dos.find({
			author: Meteor.user().username, 
			mTime: this.getHours(),
			month: this.getMonth() + 1, 
			year: this.getFullYear(),
			day: this.getDate()  
		});
	}

});