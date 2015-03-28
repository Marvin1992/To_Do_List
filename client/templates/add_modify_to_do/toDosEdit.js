Template.toDosEdit.events({
	'submit form': function(e){
		e.preventDefault();

		// get the current to do id
		var currentToDoId = this._id;

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

		if($(e.target).find('[name=time-select]').val() === '' || 
		   $(e.target).find('[name=dayTime-select]').val() === ''){
			_selectedHour = _hour;
		} else {
			_selectedHour = convertTime(
				$(e.target).find('[name=time-select]').val(),
				$(e.target).find('[name=dayTime-select]').val()
			);
		}

		// create an to_do object
		var to_do = {
			title: $(e.target).find('[name=title]').val(),
			description: $(e.target).find('[name=description]').val(),
			time: $(e.target).find('[name=time-select]').val(),
			day_time: $(e.target).find('[name=dayTime-select]').val(),
			mTime: Number(_selectedHour),
			day: Number(_selectedDay),
			month: Number(_selectedMonth),
			year: Number(_selectedYear)
		};

		// update the To_Dos in the database by updating the to_do_properties of the currentId
		To_Dos.update(currentToDoId, {$set: to_do}, function(error) {
			if(error) {
				// display the error to the user
				alert(error.reason);
			} else {
				// go back to the overview of to dos
				Router.go('emptyTemplate', {_id: currentToDoId});
			}
		});
	},

	'click .delete': function(e){
		e.preventDefault();

		// ask the user a confirmation question whether to delete the to do or not
		if(confirm("Delete this To-Do?")) {
			// get the current to do id
			var currentToDoId = this._id;

			// remove the current to do id from the database
			To_Dos.remove(currentToDoId);

			// go back to the overview of to dos
			Router.go('emptyTemplate');
		}
	}
});


Template.toDosEdit.rendered = function(){

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