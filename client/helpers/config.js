Accounts.ui.config({
	passwordSignupFields: 'USERNAME_ONLY'
});

daysInMonth = function (month, year) {
    return new Date(year, month, 0).getDate();
};

// function to convert our pm system to the 24 time system
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