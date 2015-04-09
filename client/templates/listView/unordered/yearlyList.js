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
				return To_Dos.find({author: user.username, year: Session.get('selectedYear')}, {sort: {month: -1, day: -1}});
			}
		}
	}
});