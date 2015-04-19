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

Template.registerHelper('uncompletedDailyTasks', function(){
	// get the user's todays date
	var todaysDate = new Date();

	// declare a counter variable
	var counter = 0;

	// get todays items to get its checked status
	var items = To_Dos.find({
		author: Meteor.user().username, 
		month: todaysDate.getMonth() + 1, 
		year: todaysDate.getFullYear(),
		day: todaysDate.getDate()  
	});

	// loop through the items and count how many are not checked
	for(var i=0; i<items.fetch().length; i++){
		if(items.fetch()[i].checked == 'not-checked'){
			counter++;
		}
	}

	return counter;
});

Template.registerHelper('uncompletedWeeklyTasks', function(){
	// get the user's todays date
	var todaysDate = new Date();

	// declare a counter variable
	var counter = 0;

	for(var i= -3; i<=3; i++){
		var items = To_Dos.find({
				author: Meteor.user().username, 
				month: todaysDate.getMonth() + 1, 
				year: todaysDate.getFullYear(),
				day: correctDay(todaysDate.getDate(), 
								todaysDate.getMonth() + 1, 
								todaysDate.getFullYear(), 
								i).day 
		});

		// loop through the items and count how many are not checked
		for(var k=0; k<items.fetch().length; k++){
			if(items.fetch()[k].checked == 'not-checked'){
				counter++;
			}
		}
	}

	return counter;
});

Template.registerHelper('uncompletedMonthlyTasks', function(){
	// get the user's todays date
	var todaysDate = new Date();

	// declare a counter variable
	var counter = 0;

	// get todays items to get its checked status
	var items = To_Dos.find({
		author: Meteor.user().username, 
		month: todaysDate.getMonth() + 1, 
		year: todaysDate.getFullYear() 
	});

	// loop through the items and count how many are not checked
	for(var i=0; i<items.fetch().length; i++){
		if(items.fetch()[i].checked == 'not-checked'){
			counter++;
		}
	}

	return counter;
});