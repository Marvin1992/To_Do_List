// binding an event handler to the submit form in addToDo.html template
Template.addToDo.events({
	'submit form': function(e){
		// prevent the broswer from submitting the form
		e.preventDefault();

		// create an to_do object
		var to_do = {
			title: $(e.target).find('[name=title]').val(),
			description: $(e.target).find('[name=description]').val(),
			time: $(e.target).find('[name=time-select]').val(),
			day_time: $(e.target).find('[name=dayTime-select]').val(),
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

		// get a reference to our day selectors
		var $selectDay = $('#day-select');
		var $selectMonth = $('#month-select');
		var $selectYear = $('#year-select');

		// get the user's day
		var currentDate = new Date();
		var _day = currentDate.getDate();
		var _month = currentDate.getMonth() + 1;
		var _year = currentDate.getFullYear();

		// function to get the days in a month
		function daysInMonth(month, year) {
		    return new Date(year, month, 0).getDate();
		}		

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