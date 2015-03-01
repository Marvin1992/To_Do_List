// check that the userId specified owns the documents (to dos)
ownsDocument = function(userId, doc){
	return doc && doc.userId === userId;
}
