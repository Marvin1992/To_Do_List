Template.registerHelper('datesInMonth', function(optionalMonth, optionalYear) {
	// get the user's current month
	var currentDate = new Date();
	var month = optionalMonth || currentDate.getMonth();
	var year = optionalYear || currentDate.getFullYear();

	var days = [];
	for (var i = 1; i <= daysInMonth(month+1, year); i++) {
		days.push(new Date(year, month, i));
	}

	return days;
});

Template.registerHelper('NYearsFromNow', function(numberOfYears) {
	var currentYear = new Date().getFullYear(),
		years = [];

	for(var i = currentYear; i < currentYear + numberOfYears; i++){
		years.push(i);
	}

	return years;
});

Template.registerHelper('selectedIfEquals', function(left, right){
	return left == right ? 'selected' : '';
});