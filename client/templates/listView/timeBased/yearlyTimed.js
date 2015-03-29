// create a tracker dependency
var selection_deps = new Tracker.Dependency;


Template.yearlyTimed.events({
	'change #monthlyTimed-select': function(){
		// get the current user
		var user = Meteor.users.findOne();

		// get the year the used selected
		var userSelection = $('#monthlyTimed-select').val();
		var _month = Number(userSelection);

		// if the _month variable has been filled with the user's selection
		Session.set('selectMonth', _month);

		// notifying everyone that is dependent on _deps that it has changes
		selection_deps.changed();		
	},
	'change #yearlyTimed-select': function(){
		// get the current user
		var user = Meteor.users.findOne();

		// get the year the used selected
		var userSelection = $('#yearlyTimed-select').val();
		var _year = Number(userSelection);

		// if the _year variable has been filled with the user's selection
		Session.set('selectYear', _year);

		// notifying everyone that is dependent on _deps that it has changes
		selection_deps.changed();
	},
	'click #yearlyTimed-ul': function(event){

		// jQuery target
		var target = $(event.target);

		// check if the selected target contains yearlyTimed-li
		if(target.hasClass('yearlyTimed-ul-ul')){
			// if there are to-dos
			if(target.children().length != 0){
				// show our to-dos
				target.children().slideToggle("slow");
			} else {
				// if there are no to-dos redirect the user to create a to-do
				Router.go('addToDo', {foo: 'bar'}, 
					// we also need to pass the year and month *****
					{hash: Number(target.text()), query: target.parent()[0].id } );		
			}
		}
	}
});


Template.yearlyTimed.helpers({
	datesInCurrentMonth: function() {
		// creates a dependency between the accessor of "datesInCurrentMonth" and the _deps
		selection_deps.depend();

		// get the user's selection
		var _month = Session.get('selectMonth');
		var _year = Session.get('selectYear');

		var days = [];
		for (var i = 1; i <= daysInMonth(_month, _year); i++) {
			//console.log(new Date(_year, _month, i));
			days.push(new Date(_year, _month-1, i));
		}

		return days;
	},

	todosForDay: function() {
		// creates a dependency between the accessor of "todosForDay" and the _deps
		selection_deps.depend();

		// get the user's selection
		var _month = Session.get('selectMonth');
		var _year = Session.get('selectYear');

		return To_Dos.find({
			author: Meteor.user().username, 
			month: _month, 
			year: _year,
			day: this.getDate()  
		});
	}
});


Template.yearlyTimed.created = function(){

	Meteor.setTimeout(function(){
		// get a reference to our month selectors
		var $selectedMonth = $('#monthlyTimed-select');

		// get a reference to our year selectors
		var $selectedYear = $('#yearlyTimed-select');

		// get the user's year
		var currentDate = new Date();
		var _year = currentDate.getFullYear();

		// add the possible years to the selector
		for(var i=1; i<13; i++){
			// create new option
			var $option = $('<option>');

			// give the option some text
			$option.text(i);

			// append the option to the selectDay
			$selectedMonth.append($option);
		}

		// add the possible years to the selector
		for(var i=_year; i<_year+10; i++){
			// create new option
			var $option = $('<option>');

			// give the option some text
			$option.text(i);

			// append the option to the selectDay
			$selectedYear.append($option);
		}

	// even a delay of 0ms helps rendering
	}, 0);
}