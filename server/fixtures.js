// if there are no To_Dos found on the server
if(To_Dos.find().count() === 0) {
	
	// insert a to do
	To_Dos.insert({
		title: 'Setting Up the Basic Structure',
		url: "/testing stuff"
	});

	To_Dos.insert({
		title: 'Currently working on pushing to dos on the server',
		url: "/server"
	});
}