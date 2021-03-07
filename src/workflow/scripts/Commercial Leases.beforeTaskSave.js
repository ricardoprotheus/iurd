function beforeTaskSave(colleagueId, nextSequenceId, userList) {

    var atv      		= getValue("WKNumState");
    var nextAtv  		= getValue("WKNextState");
	 ATIVIDADE_INICIAL	= (atv == 0 || atv == 4);
    
    if (ATIVIDADE_INICIAL) {
    	
    	//var radioAnexo	= hAPI.getCardValue("rd_documentos")
    	
    	//if (radioAnexo == "sim"){
	        var anexos   = hAPI.listAttachments();
	        var temAnexo = false;
	
	        if (anexos.size() > 0) {
	            temAnexo = true;
	        }
	
	        if (!temAnexo) {
	            throw "<br><br><b>You must attach a document to continue the process!</b>";
	        }
    	//} 	
    }
}