Template.toDoItem.helpers({
	// user owns to do
	ownToDo: function() {
		return this.userId === Meteor.userId();
	}
});