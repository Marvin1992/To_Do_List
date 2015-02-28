// create new mongo collection
To_Dos = new Mongo.Collection('toDos');


To_Dos.allow({
	insert: function(userId, doc){
		// only allow adding to dos if you are logged in
		return !! userId;
	}
});