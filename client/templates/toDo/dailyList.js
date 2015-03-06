Template.dailyList.helpers({
	toDo: function() {
		var user = Meteor.users.findOne();
		if(user){
			return To_Dos.find({author: user.username});
		}
	},
	getTime: function(){
		
	},
});