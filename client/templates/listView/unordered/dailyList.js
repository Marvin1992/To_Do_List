Template.dailyList.helpers({
	toDo: function() {
		var user = Meteor.users.findOne();
		if(user){
			// return the daily To_Dos later here
			return To_Dos.find({author: user.username});
		}
	}
});