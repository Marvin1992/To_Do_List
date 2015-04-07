// binding an event handler to the toDoItemMonthly to check it off
Template.toDoItemMonthly.events({
	'click #checked': function(){

		// get the current to do id
		var currentToDoId = this._id;

		// variable to hold the checked off status
		var checkedStatus;

		// toggle between checked states
		if(this.checked === "is-checked"){
			checkedStatus = "not-checked";
		} else if (this.checked === "not-checked"){
			checkedStatus = "is-checked";
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

// after yearly or monthly to-dos have been rendered check if their checkedStatus
Template.toDoItemMonthly.rendered = function(){
	$(".yearlyTimed-ul-ul").each(function() {
		// get a reference to this
		var $this = $(this);

		// if the yearly timed has a to-do add a class that can be styled
		if($this.children().length != 0){
			if($this.find('#checked').hasClass('not-checked')){
				$this.addClass("unchecked");
			} else {
				$this.addClass('checked');
			} 
		} else {
			$this.removeClass('checked');
			$this.removeClass('unchecked');
		}
	});	

	$(".monthlyTimed-ul-ul").each(function() {
		// get a reference to this
		var $this = $(this);

		// if the monthly timed has a to-do add a class that can be styled
		if($this.children().length != 0){
			if($this.find('#checked').hasClass('not-checked')){
				$this.addClass('unchecked');
			} else {
				$this.addClass('checked');
			}
		} else {
			$this.removeClass('checked');
			$this.removeClass('unchecked');
		}
	});	
}