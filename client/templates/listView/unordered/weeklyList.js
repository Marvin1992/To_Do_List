function daysMaker(count){
	return function() {
		// get the current user
		var user = Meteor.users.findOne();

		// get the user's day
		var currentDate = new Date();
		var _day = currentDate.getDate();
		var _month = currentDate.getMonth() + 1;
		var _year = currentDate.getFullYear();

		if(user){
			// return the to-dos for today that belong to the current user
			return To_Dos.find({author: user.username, day: _day-count, month: _month, year: _year});
		}
	};
}

Template.weeklyList.helpers({
	/* create our weeklyList */
	threeDaysAgo: daysMaker(3),
	twoDaysAgo: daysMaker(2),
	yesterday: daysMaker(1),
	toDoToday: daysMaker(0),
	tomorrow: daysMaker(-1),
	inTwoDays: daysMaker(-2),
	inThreeDays: daysMaker(-3)
});