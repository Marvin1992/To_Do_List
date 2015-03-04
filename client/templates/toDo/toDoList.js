// grab the To_Dos from the server and send them to the toDoList.html template
Template.toDoList.helpers({
	toDo: function() {
		var user = Meteor.users.findOne();
		if(user){
			return To_Dos.find({author: user.username});
		}
	}
});