Template.weeklyTimed.helpers({
	/* use some kind of for loop ... ***** */ 
	threeDaysAgo: function() {
		// get the current user
		var user = Meteor.users.findOne();

		// get the user's day
		var currentDate = new Date();
		var _day = currentDate.getDate();
		var _month = currentDate.getMonth() + 1;
		var _year = currentDate.getFullYear();

		if(user){
			// return the to-dos for today that belong to the current user
			return To_Dos.find({author: user.username, day: _day-3, month: _month, year: _year});
		}
	},	
	twoDaysAgo: function() {
		// get the current user
		var user = Meteor.users.findOne();

		// get the user's day
		var currentDate = new Date();
		var _day = currentDate.getDate();
		var _month = currentDate.getMonth() + 1;
		var _year = currentDate.getFullYear();

		if(user){
			// return the to-dos for today that belong to the current user
			return To_Dos.find({author: user.username, day: _day-2, month: _month, year: _year});
		}
	},
	yesterday: function() {
		// get the current user
		var user = Meteor.users.findOne();

		// get the user's day
		var currentDate = new Date();
		var _day = currentDate.getDate();
		var _month = currentDate.getMonth() + 1;
		var _year = currentDate.getFullYear();

		if(user){
			// return the to-dos for today that belong to the current user
			return To_Dos.find({author: user.username, day: _day-1, month: _month, year: _year});
		}
	},
	toDoToday: function() {
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
	},
	tomorrow: function() {
		// get the current user
		var user = Meteor.users.findOne();

		// get the user's day
		var currentDate = new Date();
		var _day = currentDate.getDate();
		var _month = currentDate.getMonth() + 1;
		var _year = currentDate.getFullYear();

		if(user){
			// return the to-dos for today that belong to the current user
			return To_Dos.find({author: user.username, day: _day+1, month: _month, year: _year});
		}
	},	
	inTwoDays: function() {
		// get the current user
		var user = Meteor.users.findOne();

		// get the user's day
		var currentDate = new Date();
		var _day = currentDate.getDate();
		var _month = currentDate.getMonth() + 1;
		var _year = currentDate.getFullYear();

		if(user){
			// return the to-dos for today that belong to the current user
			return To_Dos.find({author: user.username, day: _day+2, month: _month, year: _year});
		}
	},
	inThreeDays: function() {
		// get the current user
		var user = Meteor.users.findOne();

		// get the user's day
		var currentDate = new Date();
		var _day = currentDate.getDate();
		var _month = currentDate.getMonth() + 1;
		var _year = currentDate.getFullYear();

		if(user){
			// return the to-dos for today that belong to the current user
			return To_Dos.find({author: user.username, day: _day+3, month: _month, year: _year});
		}
	}	
});