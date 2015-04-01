Template.emptyTemplate.helpers({
	userName: function() {
		return Meteor.user().username;
	},
	today: function(){
		// get the user's current month
		var currentDate = new Date();
		var _day = currentDate.getDate();
		var _month = currentDate.getMonth()+1;
		var _year = currentDate.getFullYear();

		var newDate = ""+_day+"/"+_month+"/"+_year +"";

		return newDate;
	},
	todayUs: function(){
		// get the user's current month
		var currentDate = new Date();
		var _day = currentDate.getDate();
		var _month = currentDate.getMonth()+1;
		var _year = currentDate.getFullYear();

		var newDate = ""+_month+"/"+_day+"/"+_year +"";

		return newDate;
	}
});