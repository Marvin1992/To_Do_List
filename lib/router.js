Router.configure({
	// use the layout.html as our default layout
	layoutTemplate: 'layout',

	// use a loading template to have some visual feedback
	loadingTemplate: 'loading',

	// use a not found template if the router can't route to the requested url
	notFoundTemplate: 'notFound',

	// subscribe to the publication on the server side
	// Publication: Any data you subscribe will be mirrored on the client with the help of the MiniMongo
	waitOn: function() { return Meteor.subscribe('the_to_do_list'); }
});

// route to the toDoList template
Router.route('/', {name: 'toDoList'})

// route to the detail page if user clicked on a to do item
Router.route('/toDos/:_id', {
	// go to the toDoDetail.html template
	name: 'toDoDetail',

	// every time the user accesses this route, find the appropriate to do item
	data: function() { return Posts.findOne(this.params._id); }
});

// new route to add to-do's
Router.route('/createToDo', {name: 'addToDo'});

// show not found page whenever the data function returns false
Router.onBeforeAction('dataNotFound', {only: 'postPage'});