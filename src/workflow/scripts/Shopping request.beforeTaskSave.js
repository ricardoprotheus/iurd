function beforeTaskSave(colleagueId,nextSequenceId,userList){
	var atv      			= getValue("WKNumState");
    var nextAtv  			= getValue("WKNextState");
    var ATIVIDADE_INICIAL	= (atv == 0 || atv == 4);
    
    if (ATIVIDADE_INICIAL) {
    	
    	//var radioAnexo	= hAPI.getCardValue("rd_documentos")
    	
    	//if (radioAnexo == "sim"){
	    	var anexos = hAPI.listAttachments();
	    	if (anexos.size() <= 0){
	    		throw "Please attach a document!!"
	    	}
    	//}
    }	
}