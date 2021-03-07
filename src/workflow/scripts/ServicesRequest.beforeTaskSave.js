function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	var radioAnexo	= hAPI.getCardValue("rd_documentos")
	
	if (radioAnexo == "sim"){
		var anexos = hAPI.listAttachments();
		if (anexos.size() <= 0){
			throw "Please attach a document!!"
		}
	}
}