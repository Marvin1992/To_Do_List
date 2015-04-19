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
	currentTime: function(){
		// get the current time
		var now = new Date();

		// if now matches "this" element
		if(this.getHours() === now.getHours()){
			return 'currentTimeStyle';
		} else {
			return '';
		}
	},
	accomplished: function() {
		// get todays date
		var today = new Date();

		// check if "this" date lays in the past
		if(this < today){

			// get current item to get its checked status
			var item = To_Dos.find({
				author: Meteor.user().username, 
				mTime: this.getHours(),
				month: this.getMonth() + 1, 
				year: this.getFullYear(),
				day: this.getDate()  
			});

			// get the total length of items that are present in "this" hour
			var todos_this_hour = item.fetch().length;

			// if there are to dos for "this" hour, get their checked status
			if(todos_this_hour != 0){
				var checkedStatus = [];

				for(var i=0; i<todos_this_hour; i++){
					checkedStatus[i] = item.fetch()[i].checked;
				}

				// if any status is not-checked, return notAccomplished
				for(var i = 0; i<checkedStatus.length; i++){
					if(checkedStatus[i] == 'not-checked'){
						return 'notAccomplished';
					}
				}

				// if none have been unchecked
				return 'hasAccomplished';
			}

			return '';
		}
	},
	uncompletedTasks: function(){
		// get the user's todays date
		var todaysDate = new Date();

		// declare a counter variable
		var counter = 0;

		// get todays items to get its checked status
		var items = To_Dos.find({
			author: Meteor.user().username, 
			month: todaysDate.getMonth() + 1, 
			year: todaysDate.getFullYear(),
			day: todaysDate.getDate()  
		});

		// loop through the items and count how many are not checked
		for(var i=0; i<items.fetch().length; i++){
			if(items.fetch()[i].checked == 'not-checked'){
				counter++;
			}
		}

		
		return counter;
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