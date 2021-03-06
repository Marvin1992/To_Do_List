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
		var _hour = currentDate.getHours();
		var _day = currentDate.getDate();
		var _month = currentDate.getMonth() + 1;
		var _year = currentDate.getFullYear();

		var _selectedHour;
		var _selectedDay;
		var _selectedMonth; 
		var _selectedYear;

		var itemName;

		// assign today's value to the to-do if the user didn't put a date
		if($(e.target).find('[name=day-select]').val() === 'Day'){
			_selectedDay = _day;
		} else {
			_selectedDay = $(e.target).find('[name=day-select]').val();
		}

		if($(e.target).find('[name=month-select]').val() === 'Month'){
			_selectedMonth = _month;
		} else {
			_selectedMonth = $(e.target).find('[name=month-select]').val();
		}

		if($(e.target).find('[name=year-select]').val() === 'Year'){
			_selectedYear = _year;
		} else {
			_selectedYear = $(e.target).find('[name=year-select]').val();
		}

		if($(e.target).find('[name=time-select]').val() === '' || 
		   $(e.target).find('[name=dayTime-select]').val() === ''){
			_selectedHour = _hour;
		} else {
			_selectedHour = convertTime(
				$(e.target).find('[name=time-select]').val(),
				$(e.target).find('[name=dayTime-select]').val()
			);
		}

		// add a generic title if the user doesn't put a title
		if($(e.target).find('[name=title]').val() === ''){
			itemName = "New Item";
		} else {
			itemName = $(e.target).find('[name=title]').val();
		}

		// create an to_do object
		var to_do = {
			title: itemName,
			description: $(e.target).find('[name=description]').val(),
			time: $(e.target).find('[name=time-select]').val(),
			day_time: $(e.target).find('[name=dayTime-select]').val(),
			mTime: Number(_selectedHour),
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


Template.addToDo.rendered = function(){

	Meteor.setTimeout(function(){
		// run the getData() function to retrieve the data from the url
		var data = getData();

		// ensure that we only insert data into our addToDo properties
		// if the data has been routed here
		if(data.time != null){

			// get the user's day
			var currentDate = new Date();
			var _hour = currentDate.getHours();
			var _day = currentDate.getDate();
			var _month = currentDate.getMonth() + 1;
			var _year = currentDate.getFullYear();

			// prepare the time from the parameter of router.go for the selection
			var newTime = convertTimeBack(data.time); 

			// newTime is undefined for the yearly selection
			if(typeof newTime != 'undefined'){
				var time = newTime.split(" ")[0];
				var dayTime = newTime.split(" ")[1];
			}

			// declare an empty variable
			var inputDay;

			// get the first word from the string
			var dataName = data.name.split("-")[0];

			// convert our string from the router.go into a time reference
			// function that returns corrects week date (32/3/2015 becomes 1/4/2015)
	// WeeklyTimed
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
	// DailyTimed
			} else if(dataName == "dailyTimed"){
				inputDay = _day;
	// MonthlyTimed
			} else if(dataName == "monthlyTimed"){
				inputDay = data.time;
				// fill the fields with the current time
				time = convertTimeBack(_hour).split(" ")[0];
				dayTime = convertTimeBack(_hour).split(" ")[1];
	// YearlyTimed				
			} else if(dataName == "yearlyTimed"){
				inputDay = data.time.split("_")[0];
				_month = data.time.split("_")[1];
				_year = data.time.split("_")[2];

				// fill the fields with the current time
				time = convertTimeBack(_hour).split(" ")[0];
				dayTime = convertTimeBack(_hour).split(" ")[1];
			}


			// convert our numbers to strings in order to insert them
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