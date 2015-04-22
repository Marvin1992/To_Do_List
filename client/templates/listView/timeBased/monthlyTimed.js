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
		// get the items for "this" day to further check their checked status
		var items = To_Dos.find({
			author: Meteor.user().username, 
			month: this.getMonth() + 1, 
			year: this.getFullYear(),
			day: this.getDate()  
		});

		if(items.fetch().length != 0){
			// loop through the items and count how many are not checked
			for(var i=0; i<items.fetch().length; i++){
				if(items.fetch()[i].checked == 'not-checked'){
					return 'unchecked';
				}
			}

			return 'checked';
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