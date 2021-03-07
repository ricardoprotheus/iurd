function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	var anexos = hAPI.listAttachments();
	if (anexos.size() <= 0){
		throw "Favor anexar os documentos !!!"
	}
	
}