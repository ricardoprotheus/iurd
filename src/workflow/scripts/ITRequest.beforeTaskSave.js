function beforeTaskSave(colleagueId,nextSequenceId,userList){
	var activity      				= getValue("WKNumState");
    var nextAtv  					= getValue("WKNextState");
    var ATIV_INICIAL				= hAPI.getCardValue("ATIV_INICIAL");
    
    if((activity == ATIV_INICIAL) || activity == "0"){
    	
    	var radioAnexo	= hAPI.getCardValue("rd_documentos")
    	
    	if (radioAnexo == "sim"){
	        var anexos   = hAPI.listAttachments();
	        var temAnexo = false;
	
	        if (anexos.size() > 0) {
	            temAnexo = true;
	        }
	
	        if (!temAnexo) {
	            throw "<br><br><b>You must attach a document to continue the process!</b>";
	        }
    	} 	
    }
}