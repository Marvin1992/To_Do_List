// publication: publish only a subset of our database entries to the user
Meteor.publish('the_to_do_list', function(){
	// return To_Dos from the database //*** currently we return the entire to do list
	return To_Dos.find();
});