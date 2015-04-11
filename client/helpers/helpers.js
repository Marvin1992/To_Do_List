// helper that returns an array of dates of a full month
Template.registerHelper('datesInMonth', function(optionalMonth, optionalYear) {
	var currentDate = new Date();
	var month = optionalMonth || currentDate.getMonth()+1;
	var year = optionalYear || currentDate.getFullYear();

	var days = [];
	for (var i = 1; i <= daysInMonth(month, year); i++) {
		days.push(new Date(year, month-1, i));
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

// helper that compares two inputs and if they equal it returns the selected property
Template.registerHelper('selectedIfEquals', function(left, right){
	return left == right ? 'selected' : '';
});