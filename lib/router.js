Router.configure({
	// use the layout.html as our default layout
	layoutTemplate: 'layout',

	// use a loading template to have some visual feedback
	loadingTemplate: 'loading',

	// subscribe to the publication on the server side
	// Publication: Any data you subscribe will be mirrored on the client with the help of the MiniMongo
	waitOn: function() { return Meteor.subscribe('the_to_do_list'); }
});

// route to the toDoList template
Router.route('/', {name: 'toDoList'})