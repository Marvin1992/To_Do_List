// publication: publish only a subset of our database entries to the user 
Meteor.publish('the_to_do_list', function publishFunction(who) {
	return To_Dos.find({author: who});
});

/* publish parts of the database here and subscribe on the client side with the router.js */
