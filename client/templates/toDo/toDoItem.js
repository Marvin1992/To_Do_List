Template.toDoItem.helpers({
	// user owns to do
	ownToDo: function() {
		return this.userId === Meteor.userId();
	},
	// this anonymous function fills in the {{domain}} in toDoItem.html
	domain: function() {
		var a = document.createElement('a');
		a.href = this.url
		return a.hostname;
	}
});