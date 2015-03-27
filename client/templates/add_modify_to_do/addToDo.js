var getData = function(){
	// get the data from the URL
	var listName = Router.current().params.query;
	var timeSlot = Router.current().params.hash;

	// get the key name of the listName object
	for(property in listName){
		// write the key name into the listName variable
		listName = property;
	}

    return {
        name: listName,
        time: timeSlot
    };
}


// binding an event handler to the submit form in addToDo.html template
Template.addToDo.events({
	'submit form': function(e){
		// prevent the broswer from submitting the form
		e.preventDefault();

		// get the user's day
		var currentDate = new Date();
		var _day = currentDate.getDate();
		var _month = currentDate.getMonth() + 1;
		var _year = currentDate.getFullYear();

		var _selectedDay;
		var _selectedMonth; 
		var _selectedYear;

		// assign today's value to the to-do if the user didn't put a date
		if($(e.target).find('[name=day-select]').val() === ''){
			_selectedDay = _day;
		} else {
			_selectedDay = $(e.target).find('[name=day-select]').val();
		}

		if($(e.target).find('[name=month-select]').val() === ''){
			_selectedMonth = _month;
		} else {
			_selectedMonth = $(e.target).find('[name=month-select]').val();
		}

		if($(e.target).find('[name=year-select]').val() === ''){
			_selectedYear = _year;
		} else {
			_selectedYear = $(e.target).find('[name=year-select]').val();
		}

		var _militaryTime = convertTime(
			$(e.target).find('[name=time-select]').val(),
			$(e.target).find('[name=dayTime-select]').val()
		);

		// create an to_do object
		var to_do = {
			title: $(e.target).find('[name=title]').val(),
			description: $(e.target).find('[name=description]').val(),
			time: $(e.target).find('[name=time-select]').val(),
			day_time: $(e.target).find('[name=dayTime-select]').val(),
			mTime: _militaryTime,
			day: Number(_selectedDay),
			month: Number(_selectedMonth),
			year: Number(_selectedYear),
			checked: "not-checked"
		};

		Meteor.call('add_to_do', to_do, function(error,result){
			// display the error the user and abort
			if(error)
				return alert(error.reason);

			Router.go('emptyTemplate', {_id: result._id});
		});

	}
});


Template.addToDo.created = function(){

	Meteor.setTimeout(function(){

		// get a reference to our day selectors
		var $selectDay = $('#day-select');
		var $selectMonth = $('#month-select');
		var $selectYear = $('#year-select');

		// get the user's day
		var currentDate = new Date();
		var _day = currentDate.getDate();
		var _month = currentDate.getMonth() + 1;
		var _year = currentDate.getFullYear();	

		// get the total days in the current month
		var totalDays = daysInMonth(_month, _year);

		// add the days to the selector
		for(var i=1; i<totalDays+1; i++){
			// create new option
			var $option = $('<option>');

			// give the option some text
			$option.text(i);

			// append the option to the selectDay
			$selectDay.append($option);
		}

		// add the month to the selector
		for(var i=1; i<13; i++){
			// create new option
			var $option = $('<option>');

			// give the option some text
			$option.text(i);

			// append the option to the selectDay
			$selectMonth.append($option);
		}

		// add the possible years to the selector
		for(var i=_year; i<_year+10; i++){
			// create new option
			var $option = $('<option>');

			// give the option some text
			$option.text(i);

			// append the option to the selectDay
			$selectYear.append($option);
		}

	// even a delay of 0ms helps rendering
	}, 0);

}


Template.addToDo.rendered = function(){

	Meteor.setTimeout(function(){
		// run the getData() function to retrieve the data from the url
		var data = getData();

		// ensure that we only insert data into our addToDo properties
		// if the data has been routed here
		if(data.time != null){

			// get the user's day
			var currentDate = new Date();
			var _day = currentDate.getDate();
			var _month = currentDate.getMonth() + 1;
			var _year = currentDate.getFullYear();

			// prepare the time from the parameter of router.go for the selection
			var newTime = convertTimeBack(data.time); 
			var time = newTime.split(" ")[0];
			var dayTime = newTime.split(" ")[1];

			// declare an empty variable
			var inputDay;

			// get the first word from the string
			var dataName = data.name.split("-")[0];

			// convert our string into a time reference
			// function that returns corrects week date (32/3/2015 becomes 1/4/2015)
			if(dataName == "threeDaysAgo") { 
				inputDay = correctDay(_day, _month, _year, -3).day;
				_month = correctDay(_day, _month, _year, -3).month;
				_year = correctDay(_day, _month, _year, -3).year;
			} else if(dataName == "twoDaysAgo"){
				inputDay = correctDay(_day, _month, _year, -2).day;
				_month = correctDay(_day, _month, _year, -2).month;
				_year = correctDay(_day, _month, _year, -2).year;
			} else if(dataName == "yesterday"){
				inputDay = correctDay(_day, _month, _year, -1).day;
				_month = correctDay(_day, _month, _year, -1).month;
				_year = correctDay(_day, _month, _year, -1).year;
			} else if(dataName == "toDoToday"){
				inputDay = _day;
			} else if(dataName == "tomorrow"){
				inputDay = correctDay(_day, _month, _year, 1).day;
				_month = correctDay(_day, _month, _year, 1).month;
				_year = correctDay(_day, _month, _year, 1).year;
			} else if(dataName == "inTwoDays"){
				inputDay = correctDay(_day, _month, _year, 2).day;
				_month = correctDay(_day, _month, _year, 2).month;
				_year = correctDay(_day, _month, _year, 2).year;
			} else if(dataName == "inThreeDays"){
				inputDay = correctDay(_day, _month, _year, 3).day;
				_month = correctDay(_day, _month, _year, 3).month;
				_year = correctDay(_day, _month, _year, 3).year;
			}

			// convert our numbers to string in order to insert them
			var sInputDay = inputDay.toString();
			var s_month = _month.toString();
			var s_year = _year.toString();

			// fill our form with the information coming from the router.go parameters
			$('#day-select').val(sInputDay);
			$('#month-select').val(s_month);
			$('#year-select').val(s_year);

			// time clicked on
			$('#time-select').val(time);
			$('#dayTime-select').val(dayTime);
		}

	// even a delay of 0ms helps rendering
	}, 0);
}