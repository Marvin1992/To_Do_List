// publication: publish only a subset of our database entries to the user
Meteor.publish('the_to_do_list', function(){
	// return To_Dos from the database 
	// return To_Dos.find({}, {sort: {date: -1}, limit: 50}); // limit the number of to_dos displayed so the app doesn't crash
	return To_Dos.find();
	//return To_Dos.find({'author': author}); // ***** check router.js
	//return To_Dos.find({author: this.userId});
	//return To_Dos.find({authorId: who._id});
});