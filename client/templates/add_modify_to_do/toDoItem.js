Template.toDoItem.helpers({
	// user owns to do
	ownToDo: function() {
		return this.userId === Meteor.userId();
	}
});

// binding an event handler to the toDoItem to check it off
Template.toDoItem.events({
		'click #checked': function(){

		// get the current to do id
		var currentToDoId = this._id;

		// variable to hold the checked off status
		var checkedStatus;

		// toggle between checked states
		if(this.checked === "is-checked"){
			var checkedStatus = "not-checked";
		} else if (this.checked === "not-checked"){
			var checkedStatus = "is-checked";
		}

		// create an to_do object
		var to_do_properties = {
			checked: checkedStatus
		};

		// update the To_Dos in the database by updating the to_do_properties of the currentId
		To_Dos.update(currentToDoId, {$set: to_do_properties}, function(error) {
			if(error) {
				// display the error to the user
				alert(error.reason);
			} else {
				// reload page
				// Router.go('dailyTimed', {_id: currentToDoId});
			}
		});

	}
});


// if the list has been rendered
// Template rendered callback
Template.toDoItem.rendered = function(){

// HAS TO BE EXECUTED AFTER DOM HAS RENDERED 
	Meteor.setTimeout(function(){

		// get a reference to the ul lists
		var $threeDaysAgo_ul = $('#threeDaysAgo-timed-ul');
		var $twoDaysAgo_ul = $('#twoDaysAgo-timed-ul');
		var $yesterday_ul = $('#yesterday-timed-ul');
		var $today_ul = $('#toDoToday-timed-ul');
		var $tomorrow_ul = $('#tomorrow-timed-ul');
		var $inTwoDays_ul = $('#inTwoDays-timed-ul');
		var $inThreeDays_ul = $('#inThreeDays-timed-ul');

		// get the user's current day
		var currentDate = new Date();
		var _day = currentDate.getDate();

		// get a reference to the daily list <li>
		var $dailyTimed_li = $('.daily-li');

		// get a reference to the dailyList-ul
		var $dailyTimed_ul = $('.dailyTimed-ul');

		// day variables
		var _threeDaysAgo = _day-3;
		var _twoDaysAgo = _day-2;
		var _yesterday = _day-1;
		var _tomorrow = _day+1;
		var _inTwoDays = _day+2;
		var _inThreeDays = _day+3;

		// get a reference to the <li> to-dos from this week
		var $threeDaysAgo = $threeDaysAgo_ul.find("li[data-date*='"+_threeDaysAgo+"']");
		var $twoDaysAgo = $twoDaysAgo_ul.find("li[data-date*='"+_twoDaysAgo+"']");
		var $yesterday = $yesterday_ul.find("li[data-date*='"+_yesterday+"']");
		var $today = $today_ul.find("li[data-date*='"+_day+"']");
		var $tomorrow = $tomorrow_ul.find("li[data-date*='"+_tomorrow+"']");
		var $inTwoDays = $inTwoDays_ul.find("li[data-date*='"+_inTwoDays+"']");
		var $inThreeDays = $inThreeDays_ul.find("li[data-date*='"+_inThreeDays+"']");

		// get a reference to the <li> in the to-do from today of dailyTimed
		// var $dailyTimed = $dailyTimed_ul.find("li[data-date*='"+_day+"']"); ****


	// function that creates our time ordered layout and puts to dos in the right list
		var makeLists = function($_li, $_ul){
			// store data attributes in array
			var data_values = [];

			// function to convert our pm system to the 24 time system
			var convertTime = function(number, meriediem){
				var m = meriediem;

				// check if the number string is not empty
				if(number){
					var n = Number(number);
				} else { 
					// if its empty return undefined
					return newTime = undefined;
				}

				// variable for the new time system
				var newTime;

				// check the number value and the meriediem
				if(n<12 && m === "am"){
					newTime = n;
				} else if(n === 12 && m === "pm"){
					newTime = n;
				} else if(n < 12 && m === "pm"){
					newTime = n + 12;
				} else if(n === 12 && m === "am"){
					newTime = n + 12;
				} else {
					newTime = undefined;
				}

				// return new time
				return newTime;
			}

			// function to convert back from military time to US time
			var convertTimeBack = function(militaryTime){
				var m = militaryTime;
				var newTime;

				if(m < 12){
					newTime = m + " am";
				} else if(m == 12){
					newTime = m + " pm";
				} else if(m > 12 && m != 24){
					newTime = m-12 + " pm";
				} else if(m == 24){
					newTime = m-12 + " am";
				}

				return newTime;
			}

			// write data attributes of the list into array
			for(var i=0; i< $_li.length; i++){
				/*
				if(typeof $_li[i].dataset.timeslot === 'undefined'){
					continue;
				}*/
				// first split the data set into two and convert the pm time to the 24:00 system
				// and then write the assigned value into data values
				data_values[i] = convertTime(
					$_li[i].dataset.timeslot.split(" ")[0],
					$_li[i].dataset.timeslot.split(" ")[1]
					);
			}

			// check if the inserted to-do from the server matches the current li dataslot value
			var check_elem = function(i){
				for(var j=0; j< $_li.length; j++){
					if(i == data_values[j]){
						return true;
					}
				}
				return false;
			}

			// move the element to its specific point within the list
			var moveElement = function(i){
				// find the to-do
				var $currentToDo = $_ul.find("[data-timeslot='"+convertTimeBack(i)+"']");

				// move the to-do to its right place
				$_ul.append($currentToDo);
			}

			// create the missing list items dynamically
			var create_empty_list = function(){
				for(var i=1; i < 25; i++){

					// if check_elem is true, do not insert a new element
					if(check_elem(i)){
						// call function that moves existing to do element here
						moveElement(i);
						continue;
					}

					// create new empty list item
					$li_item = $('<li>');

					// add the class to the element
					$li_item.addClass('daily-li');

					// add data attribute to list item
					$li_item.data("timeslot", i);

					// add empty time slot
					$li_item.text(convertTimeBack(i)); 

					// military time 
					//$li_item.text(i + ":00"); 

					// append the li items to the unodered list
					$_ul.append($li_item);
				}
			} 

		// create the list placeholders and set to-do from server to right place
		create_empty_list();

		} // end of makeLists function

	// make our dailyView
	makeLists($dailyTimed_li, $dailyTimed_ul);

	// make our 7 day lists for the weekly timed view
	makeLists($threeDaysAgo, $threeDaysAgo_ul);
	makeLists($twoDaysAgo, $twoDaysAgo_ul);
	makeLists($yesterday, $yesterday_ul);
	makeLists($today, $today_ul);
	makeLists($tomorrow, $tomorrow_ul);
	makeLists($inTwoDays, $inTwoDays_ul);
	makeLists($inThreeDays, $inThreeDays_ul);

	// even a delay of 0ms helps rendering the list
	}, 0);
}