// function to get the total days in a month in the specified year
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

// function that returns correct week day
var correctDay = function(_day, _month, _year, _count){
	// get the day number (limit) of the input month
	var limit = daysInMonth(_month, _year);

	// get the parameters as new variables
	var day = _day;
	var count = _count;
	var month = _month;
	var year = _year;

	// create a new object that holds our date
	var newDate = {
		day: _day,
		month: _month,
		year: _year
	};


	// if count is 0 we don't need to perform changes on our day
	if(count != 0){
		// check if the input day is less than the beginning of the month
		if(day + count == 0){
			newDate.day = daysInMonth(_month-1, _year);
			newDate.month = _month - 1;
		} else if (day + count == -1){
			newDate.day = daysInMonth(_month-1, _year) - 1;
			newDate.month = _month - 1;
		} else if (day + count == -2){
			newDate.day = daysInMonth(_month-1, _year) - 2;
			newDate.month = _month - 1;
		} 
		// check if the input day exceeds the end of the month
		else if (day + count == limit+1){
			newDate.day = 1;
			newDate.month = _month + 1;
		} else if (day + count == limit+2){
			newDate.day = 2;
			newDate.month = _month + 1;
		} else if (day + count == limit+3){
			newDate.day = 3;
			newDate.month = _month + 1;
		}
		else {
			// return the new date with same month and changed day
			newDate.day = day + count;
			newDate.month = _month;
		}

		// check around yearly breaks
		if(newDate.month == 13){
			newDate.month = 1;
			newDate.year = year+1;
		} 
		else if (newDate.month == 0){
			newDate.month = 12;
			newDate.year = year-1;
		}
	}

	// return day and month as an object
	return newDate;
}


function daysMaker(count){
	return function() {
		// get the current user
		var user = Meteor.users.findOne();

		// get the user's day
		var currentDate = new Date();
		var _day = currentDate.getDate();
		var _month = currentDate.getMonth() + 1;
		var _year = currentDate.getFullYear();

		// check if the days count crosses a monthly or yearly breakpoint
		var adjustedDate = correctDay(_day, _month, _year, count);

		if(user){
			// return the to-dos for today that belong to the current user
			return To_Dos.find({author: user.username, day: adjustedDate.day, 
								month: adjustedDate.month, year: adjustedDate.year});
		}
	};
}

Template.weeklyList.helpers({
	/* create our weeklyList */
	threeDaysAgo: daysMaker(-3),
	twoDaysAgo: daysMaker(-2),
	yesterday: daysMaker(-1),
	toDoToday: daysMaker(0),
	tomorrow: daysMaker(1),
	inTwoDays: daysMaker(2),
	inThreeDays: daysMaker(3)
});