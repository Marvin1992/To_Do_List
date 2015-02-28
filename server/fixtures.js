// if there are no To_Dos found on the server
if(To_Dos.find().count() === 0) {

	// insert a to do
	To_Dos.insert({
		title: 'Initial To Do',
		description: 'Will be removed later, just for displaying purposes',
		time: '24/7'
	});

}