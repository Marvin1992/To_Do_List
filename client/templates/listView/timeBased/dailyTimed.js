Template.dailyTimed.helpers({
	toDo: function() {
		var user = Meteor.users.findOne();
		if(user){
			return To_Dos.find({author: user.username});
		}
	}
});


// if the list has been rendered
// Template rendered callback
Template.toDoItem.rendered = function(){

/* HAS TO BE EXECUTED AFTER DOM HAS RENDERED */
	$(function() {

		// get a reference to the dailyList-ul
		var $dailyList_ul = $('.dailyList-ul');

		// get a reference to the current list elements (to-dos) created from the database
		var $dailyList_li = $('.dailyList-li');

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

		// write data attributes of the list into array
		for(var i=0; i< $dailyList_li.length; i++){
			// first split the data set into two and convert the pm time to the 24:00 system
			// and then write the assigned value into data values
			data_values[i] = convertTime(
				$dailyList_li[i].dataset.timeslot.split(" ")[0],
				$dailyList_li[i].dataset.timeslot.split(" ")[1]
				);
		}

		// check if the inserted to-do from the server matches the current li dataslot value
		var check_elem = function(i){
			for(var j=0; j< $dailyList_li.length; j++){
				if(i == data_values[j]){
					return true;
				}
			}
			return false;
		}

		var moveElement = function(i){
			//alert(i);
			$("ul").find("[data-timeslot='5 pm']");
			// move to specific spot
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
				$li_item.addClass('dailyList-li');

				// add data attribute to list item
				$li_item.data("timeslot", i);

				$li_item.text(i+':00'); // currently used for debugging ****

				// append the li items to the unodered list
				$dailyList_ul.append($li_item);
			}
		} 

		// check for existing To_Dos coming from the server
		if(typeof data_values[0] !== 'undefined' && data_values[0] !== null){
			// create an empty list around the existing to dos
			create_empty_list();
		} else {
			console.log(data_values[0]);
		}

	});
}