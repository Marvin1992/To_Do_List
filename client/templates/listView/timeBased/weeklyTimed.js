function daysMaker(count){
	return function() {
		// get the user's day
		var currentDate = new Date();
		var _day = currentDate.getDate();
		var _month = currentDate.getMonth() + 1;
		var _year = currentDate.getFullYear();

		// check if the days count crosses a monthly or yearly breakpoint
		var adjustedDate = correctDay(_day, _month, _year, count);

		return To_Dos.find({
			author: Meteor.user().username, 
			mTime: this.getHours(),
			month: adjustedDate.month, 
			year: adjustedDate.year,
			day: adjustedDate.day  
		});
	};
}


Template.weeklyTimed.helpers({
	hours: function() {
		// get the user's current month
		var currentDate = new Date();
		var _day = currentDate.getDate();
		var _month = currentDate.getMonth();
		var _year = currentDate.getFullYear();

		// array that holds our hours
		var hours = [];
		for (var i = 1; i <= 24; i++) {
			hours.push(new Date(_year, _month, _day, i));
		}

		return hours;
	},
	/* create our weeklyTimed templates */ 
	threeDaysAgo: daysMaker(-3),
	twoDaysAgo: daysMaker(-2),
	yesterday: daysMaker(-1),
	toDoToday: daysMaker(0),
	tomorrow: daysMaker(1),
	inTwoDays: daysMaker(2),
	inThreeDays: daysMaker(3)	
});


Template.weeklyTimed.events({
	'click #weeklyTimed-section': function(event){

		// jQuery target
		var target = $(event.target);

		// check if the selected target is a dailyelement
		if(target.hasClass('daily-li')){
			// pass onlick the selected time and list to the addToDo template
			Router.go('addToDo', {foo: 'bar'}, {hash: target.data("timeslot"), query: target.parent()[0].id } );
		}
	}
});