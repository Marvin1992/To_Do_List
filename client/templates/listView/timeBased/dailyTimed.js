Template.dailyTimed.helpers({
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
	toDoToday: function() {
		return To_Dos.find({
			author: Meteor.user().username, 
			mTime: this.getHours(),
			month: this.getMonth() + 1, 
			year: this.getFullYear(),
			day: this.getDate()  
		});
	}
});

Template.dailyTimed.rendered = function(){
	// is executed after DOM has rendered
	Meteor.setTimeout(function(){

		// get a reference to our list elements
		var dailyTimed_li = $('.dailyTimed-li');

		// change the daily view
		changeTimeDisplay(dailyTimed_li);

	// even a delay of 0ms helps rendering the list
	}, 0);
}

Template.dailyTimed.events({
	'click #dailyTimed-ul': function(event){

		// jQuery target
		var target = $(event.target);

		// check if the selected target contains weeklyTimed-li
		if(target.hasClass('dailyTimed-li')){
			// pass onlick the selected time and list to the addToDo template
			Router.go('addToDo', {foo: 'bar'}, {hash: target.attr("timeslot"), query: target.parent()[0].id } );
		}
	}
});