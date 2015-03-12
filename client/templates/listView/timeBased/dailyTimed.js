Template.dailyTimed.helpers({
	toDo: function() {
		var user = Meteor.users.findOne();
		var today = new Date();
		if(user){
			// return the daily To_Dos later here
			return To_Dos.find({author: user.username});
		}
	}
});


// if the list has been rendered
// Template rendered callback
Template.toDoItem.rendered = function(){

/* HAS TO BE EXECUTED AFTER DOM HAS RENDERED */
	Meteor.setTimeout(function(){

		// get a reference to the dailyList-ul
		var $dailyTimed_ul = $('.dailyTimed-ul');

		// get a reference to the current list elements (to-dos) created from the database
		var $dailyTimed_li = $('.daily-li'); 

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
			} else if(m > 12){
				newTime = m-12 + " pm";
			}

			return newTime;
		}

		// write data attributes of the list into array
		for(var i=0; i< $dailyTimed_li.length; i++){
			// first split the data set into two and convert the pm time to the 24:00 system
			// and then write the assigned value into data values
			data_values[i] = convertTime(
				$dailyTimed_li[i].dataset.timeslot.split(" ")[0],
				$dailyTimed_li[i].dataset.timeslot.split(" ")[1]
				);
		}

		// check if the inserted to-do from the server matches the current li dataslot value
		var check_elem = function(i){
			for(var j=0; j< $dailyTimed_li.length; j++){
				if(i == data_values[j]){
					return true;
				}
			}
			return false;
		}

		// move the element to its specific point within the list
		var moveElement = function(i){
			// find the to-do
			var $currentToDo = $("ul").find("[data-timeslot='"+convertTimeBack(i)+"']");

			// move the to-do to its right place
			$dailyTimed_ul.append($currentToDo);
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
				$dailyTimed_ul.append($li_item);
			}
		} 

		// check for existing To_Dos coming from the server
		if(typeof data_values[0] !== 'undefined' && data_values[0] !== null){
			// create an empty list around the existing to dos
			create_empty_list();
		} else {
			// log the data values to console
			console.log(data_values[0]);

			// create a completely empty list
			create_empty_list();
		}

	// even a delay of 0ms helps rendering the list
	}, 0);
}