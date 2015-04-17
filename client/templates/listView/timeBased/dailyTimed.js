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
	},
	accomplished: function() {
		// get todays date
		var today = new Date();

		// check if "this" date lays in the past
		if(this < today){
			// get the current hour the loop is on
			var current_hour = Number(String(this).split(" ")[4].split(":")[0]);

			// get current item to get its checked status
			var current_item = function() {
				return To_Dos.find({
					author: Meteor.user().username, 
					mTime: this.getHours(),
					month: this.getMonth() + 1, 
					year: this.getFullYear(),
					day: this.getDate()  
				});
			};

			// then something like current_item.checked??

			// *** HERE we need to access the object being return from the database directly ***
			var item = $("#dailyTimed-ul").find("[data-mtime='" + current_hour + "']").find('#checked');

			// check if it has been accomplished or not
			if(item.hasClass('not-checked')) {
				// mark as not accomplished if not
				return 'notAccomplished';
			} 
			else if(item.hasClass('checked')){
				// otherwise mark it as accomplished
				return 'hasAccomplished';
			}
			else {
				return '';
			}
		}
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