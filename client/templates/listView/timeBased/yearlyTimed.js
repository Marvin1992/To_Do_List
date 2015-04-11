// function that sends the user selection via query string and updates the page
function updateRouteFromSelectInputs () {
	// get the month & year the used selected
	var month = $('#monthlyTimed-select').val();
	var year = $('#yearlyTimed-select').val();
	
	var queryString = 'month=' + month + '&year=' + year; 

	Router.go('yearlyTimed', null, {query: queryString});
}

Template.yearlyTimed.events({
	'change #monthlyTimed-select': updateRouteFromSelectInputs,
	'change #yearlyTimed-select': updateRouteFromSelectInputs,
	'click #yearlyTimed-ul': function(event){

		// jQuery target
		var target = $(event.target);

		// check if the selected target contains yearlyTimed-li
		if(target.hasClass('yearlyTimed-ul-ul')){
			// if there are to-dos
			if(target.children().length != 0){
				// show our to-dos
				target.children().slideToggle("slow");

				// check if the slide toggle is open
				if(target.hasClass('ul-ul-open')){
					target.removeClass('ul-ul-open');
				} else if(target.is(':visible')){
					target.addClass('ul-ul-open');
				}

			} else {
				// if there are no to-dos redirect the user to create a to-do
				Router.go('addToDo', {foo: 'bar'}, 
					// pass the day, the month, the year and what list we are coming from
					{hash: Number(target.text()) + "_" +
						$('#monthlyTimed-select').val() + "_" +
						$('#yearlyTimed-select').val(), 
					query: target.parent()[0].id } );		
			}
		}
	}
});


Template.yearlyTimed.helpers({
	todosForDay: function() {
		return To_Dos.find({
			author: Meteor.user().username, 
			month: this.getMonth()+1, 
			year: this.getFullYear(),
			day: this.getDate()  
		});
	},
	checkedStatus: function(){
		// get a reference to this
		var $this = $(this);

		// get the current i we are on from the javascript date object
		var current_i = Number(String($this[0]).split(" ")[2]);

		// get the current element
		var current_elem = $(".yearlyTimed-ul-ul").eq(current_i-1);

		// if the yearly timed has a to-do add a class that can be styled
		if(current_elem.children().length != 0){
			if(current_elem.find('#checked').hasClass('not-checked')){
				return 'unchecked';
			} else {
				return 'checked';
			}
		} else {
			return '';
		}
	}
});