// publication: publish only a subset of our database entries to the user
Meteor.publish('the_to_do_list', function(){
	// return To_Dos from the database 
	// *** currently we return the entire to do list
	// *** later something like To_Dos.find({'author: loggedInUser'}); maybe??? 
	// *** or maybe regulating content with user.ownsDocument
	return To_Dos.find();
});