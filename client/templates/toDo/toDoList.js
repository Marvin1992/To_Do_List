// grab the To_Dos from the server and send them to the toDoList.html template
Template.toDoList.helpers({
	toDo: function() {
		return To_Dos.find();
	}
});