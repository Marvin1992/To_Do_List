// create a tracker dependency
var selectedYear_deps = new Tracker.Dependency;


Template.yearlyList.events({
	'change #yearly-select': function(){
		// get the current user
		var user = Meteor.users.findOne();

		// get the year the used selected
		var userSelection = $('#yearly-select').val();
		var _year = Number(userSelection);

		// if the _year variable has been filled with the user's selection
		Session.set('selectedYear', _year);

		// notifying everyone that is dependent on _deps that it has changes
		selectedYear_deps.changed();
	}
});


Template.yearlyList.helpers({
	yearly: function() {

		// creates a dependency between the accessor of "yearly" and the _deps
		selectedYear_deps.depend();

		// get the current user
		var user = Meteor.users.findOne();

		// get the year the used selected
		var userSelection = $('#yearly-select').val();
		var _year = Number(userSelection);

		// if the _year variable has been filled with the user's selection
		if(_year){
			if(user){
				// return the to-dos for today that belong to the current user
				return To_Dos.find({author: user.username, year: Session.get('selectedYear')});
			}
		}
	}
});


Template.yearlyList.created = function(){

	Meteor.setTimeout(function(){

		// get a reference to our day selectors
		var $selectedYear = $('#yearly-select');

		// get the user's year
		var currentDate = new Date();
		var _year = currentDate.getFullYear();

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