Accounts.ui.config({
	passwordSignupFields: 'USERNAME_ONLY'
});

// function that returns the total amount of days in a month
daysInMonth = function (month, year) {
    return new Date(year, month, 0).getDate();
};

// function to convert the pm system to the 24 time system
convertTime = function(number, meriediem){
	var m = meriediem;

	// check if the number string is not empty
	if(number){
		var n = Number(number);
	} else { 
		// if its empty return undefined
		return newTime = undefined;
	}

	// variable for the new time system
	var newTime;

	// check the number value and the meriediem
	if(n<12 && m === "am"){
		newTime = n;
	} else if(n === 12 && m === "pm"){
		newTime = n;
	} else if(n < 12 && m === "pm"){
		newTime = n + 12;
	} else if(n === 12 && m === "am"){
		newTime = n + 12;
	} else {
		newTime = undefined;
	}

	// return new time
	return newTime;
};

// function to convert back from military time to US time
convertTimeBack = function(militaryTime){
	var m = militaryTime;
	var newTime;

	if(m < 12){
		newTime = m + " am";
	} else if(m == 12){
		newTime = m + " pm";
	} else if(m > 12 && m != 24){
		newTime = m-12 + " pm";
	} else if(m == 24){
		newTime = m-12 + " am";
	}

	return newTime;
};

// function that returns corrects week date (32/3/2015 becomes 1/4/2015)
correctDay = function(_day, _month, _year, _count){
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
};