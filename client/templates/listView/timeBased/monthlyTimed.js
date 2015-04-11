Template.monthlyTimed.helpers({
	todosForDay: function() {
		return To_Dos.find({
			author: Meteor.user().username, 
			month: this.getMonth() + 1, 
			year: this.getFullYear(),
			day: this.getDate()  
		});
	},
	checkedStatus: function(){
		// get a reference to this
		var $this = $(this);

		// if the monthly timed has a to-do add a class that can be styled
		if($this.children().length != 0){
			if($this.find('#checked').hasClass('not-checked')){
				return 'unchecked';
			} else {
				return 'checked';
			}
		} 
	}
});


Template.monthlyTimed.events({
	'click #monthlyTimed-ul': function(event){

		// jQuery target
		var target = $(event.target);

		// check if the selected target contains monthlyTimed-li
		if(target.hasClass('monthlyTimed-ul-ul')){
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
					{hash: Number(target.text()), query: target.parent()[0].id } );		
			}
		}
	}
});