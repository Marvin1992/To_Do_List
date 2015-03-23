// function to get the days in a month
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

// binding an event handler to the toDoItemMonthly to check it off
Template.toDoItemMonthly.events({
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
			} 
		});

	}
});

// after the toDos have been rendered rearrange and modify them
Template.toDoItemMonthly.rendered = function(){

	Meteor.setTimeout(function(){
		// get a reference to the monthly list
		var $monthlyTimed_ul = $('#monthlyTimed-ul');

		// get the user's current month
		var currentDate = new Date();
		var _month = currentDate.getMonth() + 1;
		var _year = currentDate.getFullYear();

		// empty day array
		var day = [];

		// function accepting the month, year and the $_list that we append the <ul> elements to 
		// as parameters
		var createCalendar = function(month, year, $_list){
			// calculate how many days there are in this current year
			var calenderLength = daysInMonth(month, year); 

			// reference our new list
			var $dynamicList;

			// server to-dos
			var $serverToDos;

			// create number of calendar slots matching the calenderLength variable
			for(var i=1; i<calenderLength+1; i++){
				// create new <ul> element and append it to the $monthyTimed_ul
				var $ul = $('<ul>');

				// add class to <ul> element
				$ul.addClass('day-slot-ul placeholder');

				$ul.text(i); // temp

				// add a date to the data attribute of the list
				$ul.data("date-day", i);
				$ul.data("date-month", month);

				// append the created <ul> to our $_list
				$_list.append($ul);
			}

			// get the just dynamically created <ul> list
			$dynamicList = $('.day-slot-ul');

			// find the monthly To-Dos from the server
			$serverToDos = $dynamicList.find('.monthly-li');

			// loop through the to dos from the server
			for(var i=0; i< $serverToDos.length; i++){
				// find the day via the data attribute from the dynamic list <ul>
				day[i] = $serverToDos[i].dataset.day;

				// find the listElement
				var listElement = $dynamicList[0].children[i];

				// and append the to-do from the server to this <ul> element
				if(typeof listElement != undefined){
					$dynamicList[day].appendChild(listElement);
				} 
			}
		};

		// remove all elements from the list
		var removePlaceholders = function($_list){
			// get the first node of the day slot list
			var dynamicList = $('.day-slot-ul');

			// first node of the dynamic list
			var firstNode = dynamicList[0];

			// loop through the to-dos
			for(var i=0; i<day.length; i++){
				firstNode.appendChild($dynamicList[day[i]].children);
			}

			// remove all placeholders
			$_list.children('.placeholder').remove();		
		};

		// remove any additonal rendered placeholders, before rendering a newly list
		removePlaceholders($monthlyTimed_ul);
		createCalendar(_month, _year, $monthlyTimed_ul); 

	// even a delay of 0ms helps rendering
	}, 0);
}