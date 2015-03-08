Router.configure({
	// use the layout.html as our default layout
	layoutTemplate: 'layout',

	// use a loading template to have some visual feedback
	loadingTemplate: 'loading',

	// use a not found template if the router can't route to the requested url
	notFoundTemplate: 'notFound',

	// subscribe to the publication on the server side
	// Publication: Any data you subscribe will be mirrored on the client with the help of the MiniMongo
	// see publication.js for reference
	waitOn: function() { 
		var user = Meteor.users.findOne();
		if(user){
			return Meteor.subscribe('the_to_do_list' , user.username ); 
		}
	} 
});


// route to the toDoList template
Router.route('/', {name: 'toDoList'});

// route to the timeBased template
Router.route('/timeBased', {name: 'timeBased'});
Router.route('/timeBased/daily', {name: 'dailyTimed'});
Router.route('/timeBased/weekly', {name: 'weeklyTimed'});
Router.route('/timeBased/monthly', {name: 'monthlyTimed'});

// route to the listView template
Router.route('/listView', {name: 'listView'});
Router.route('/listView/daily', {name: 'dailyList'});
Router.route('/listView/weekly', {name: 'weeklyList'});
Router.route('/listView/monthly', {name: 'monthlyList'});


// route to the edit template 
Router.route('/toDos/:_id/edit', {
	// name of the corresponding template
	name: 'toDosEdit',
	data: function() { return To_Dos.findOne(this.params._id); } 
});

// new route to add to-do's
Router.route('/createToDo', {name: 'addToDo'});

// function to make sure user is logged to gain access to the to do list
var requireLogin = function(){
	if(! Meteor.user()){
		if(Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied')
		}
	} else {
		this.next();
	}
}

// function to show the loading Template
var showLoading = function(){
	this.render(this.loadingTemplate);
}

// show not found page whenever the data function returns false
Router.onBeforeAction('dataNotFound', {only: 'main'});
Router.onBeforeAction(requireLogin, {only: 'addToDo'});
Router.onBeforeAction(requireLogin, {only: 'toDosEdit'});