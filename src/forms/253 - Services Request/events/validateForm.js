function validateForm(form){
	
	var ativAtual   				= getValue("WKNumState");
	var ativProx   	 				= getValue("WKNextState");
	var erro        				= "";
	
	//ALTERADO BRUNO 20200520
	var churches    				= form.getChildrenIndexes("table_church");
    var totalPercent 				= 0;
    var percentLinha 				= 0;
    var churchGrid					= "";
    var churchGridHidden			= "";	
    var ATIVIDADE_INICIAL			= (ativAtual == 0 || ativAtual == 4);
    var ATIV_STATE_LEADER			= (ativAtual == 5);
	var ATIV_DPT_HEADER_APPROVALL	= (ativAtual == 17);
	var ATIV_DIVISION				= (ativAtual == 37);
	var ATIV_SUPERVISOR				= (ativAtual == 19);
	var ATIV_VP						= (ativAtual == 21);
	var ATIV_DPT_HEADER_FIM			= (ativAtual == 23);
	var aprovacao					= ""
	var motivoRecusa				= ""
		
    if(ATIVIDADE_INICIAL){
        
	
	    //ALTERADO BRUNO 20200520 - FIM
		
        if(form.getValue("zoom_department") == "" || form.getValue("zoom_department") == null){
            erro += "Please, select the department!" + "<br/>";
        }
        
        if(form.getValue("rd_service") == "" || form.getValue("rd_service") == null){
            erro += "Please, select the type of service!" + "<br/>";
        }
        
        if(form.getValue("zoom_company") == "" || form.getValue("zoom_company") == null){
            erro += "Please, select the company!" + "<br/>";
        }
        
        if(form.getValue("txt_term") == "" || form.getValue("txt_term") == null){
            erro += "Please, select the term of contract!" + "<br/>";
        }
        
        if(form.getValue("txt_installment") == "" || form.getValue("txt_installment") == null || parseInt(form.getValue("txt_installment")) == 0) {
        	erro += "Please, inform how many terms will this contract consist of!" + "<br/>";
        }
        
        if(form.getValue("rd_fee") == "" || form.getValue("rd_fee") == null){
            erro += "Please, inform if there is an installation fee!" + "<br/>";
        }
                
        if(form.getValue("txt_amount") == "" || form.getValue("txt_amount") == null){
            erro += "Please, inform how much will we pay monthly in this new contract!" + "<br/>";
        }
        
        if(form.getValue("rd_fee") == "sim"){
        	if(form.getValue("installfee") == "" || form.getValue("installfee") == null || parseFloat(form.getValue("installfee")) == 0){
                erro += "Please, inform the installment fee!" + "<br/>";
            }
        	if(form.getValue("dataInstallFee") == "" || form.getValue("dataInstallFee") == null){
                erro += "Please, inform the installment fee date!" + "<br/>";
            }
        }
        
        if(form.getValue("txt_gran_total") == "" || form.getValue("txt_gran_total") == null || parseFloat(form.getValue("txt_gran_total")) == 0) {
        	erro += "Please, inform how many terms will this contract consist of!" + "<br/>";
        }
        
        if(form.getValue("rd_documentos") == "" || form.getValue("rd_documentos") == null){
        	erro += "Please, inform if there are any attachment!" + "<br/>";
        }
    }else if(ATIV_STATE_LEADER){
    	aprovacao	= form.getValue("rd_aprovGestor_state_leader")
    	motivoRecusa= form.getValue("descricao_state_leader")
    	if(aprovacao == "" || aprovacao == null){
        	erro += "Please, select one of the options: approve or deny." + "<br/>";
    	}else if(aprovacao == "nao"){
    		if (motivoRecusa == "" || motivoRecusa == null){
    			erro += "Please, inform the reason for deny it (Feedback)." + "<br/>";
    		}
    	}
    }else if(ATIV_DPT_HEADER_APPROVALL){
    	aprovacao	= form.getValue("rd_deptHead")
    	motivoRecusa= form.getValue("txt_feedbackDeptHead")
    	if(aprovacao == "" || aprovacao == null){
        	erro += "Please, select one of the options: approve or deny." + "<br/>";
    	}else if(aprovacao == "nao"){
    		if (motivoRecusa == "" || motivoRecusa == null){
    			erro += "Please, inform the reason for deny it (Feedback)." + "<br/>";
    		}
    	}
    }else if(ATIV_DIVISION){
    	aprovacao	= form.getValue("rd_aprovacaoGestor_division")
    	motivoRecusa= form.getValue("descricao_division")
    	if(aprovacao == "" || aprovacao == null){
        	erro += "Please, select one of the options: approve or deny." + "<br/>";
    	}else if(aprovacao == "nao"){
    		if (motivoRecusa == "" || motivoRecusa == null){
    			erro += "Please, inform the reason for deny it (Feedback)." + "<br/>";
    		}
    	}
    }else if(ATIV_SUPERVISOR){
    	aprovacao	= form.getValue("rd_aprovacaoGestor_supervisor")
    	motivoRecusa= form.getValue("descricao_supervisor")
    	if(aprovacao == "" || aprovacao == null){
        	erro += "Please, select one of the options: approve or deny." + "<br/>";
    	}else if(aprovacao == "nao"){
    		if (motivoRecusa == "" || motivoRecusa == null){
    			erro += "Please, inform the reason for deny it (Feedback)." + "<br/>";
    		}
    	}
    }else if(ATIV_VP){
    	aprovacao	= form.getValue("rd_aprovacaoGestor_vp")
    	motivoRecusa= form.getValue("descricao_vp")
    	if(aprovacao == "" || aprovacao == null){
        	erro += "Please, select one of the options: approve or deny." + "<br/>";
    	}else if(aprovacao == "nao"){
    		if (motivoRecusa == "" || motivoRecusa == null){
    			erro += "Please, inform the reason for deny it (Feedback)." + "<br/>";
    		}
    	}
    }else if(ATIV_DPT_HEADER_FIM){
    	if(form.getValue("invoiceNumber") == "" || form.getValue("invoiceNumber") == null ){
            erro += "Please, inform the invoice number!" + "<br/>";
        }
    	if(form.getValue("classes") == "" || form.getValue("classes") == null ){
            erro += "Please, inform the GL Code!" + "<br/>";
        }
        
    	//Movido por Sergio Bruno em 20201105
    	//ALTERADO BRUNO 20200520
		if(form.getValue("rateioChurch") == "" || form.getValue("rateioChurch") == null){ 
    		erro += "Please, select if there is prorating of expenses in the form (church)!" + "<br/>";
    	}else{
    		if(form.getValue("rateioChurch") == "yes" ){
    			if (churches.length > 0) {
    	            for (var i = 0; i < churches.length; i++) { // percorre os campos Pai x Filho
    	            	percentLinha = parseFloat(form.getValue('txt_percent_grid___' + churches[i]));
    	            	churchGrid	 = form.getValue('requesting_church_grid___' + churches[i]);    	            	
    	            	if(churchGrid == null || churchGrid == "") {
    	                    erro += "Please, fill in the field Church! Line ("+(i+1)+")" + "<br/>";
    	                }
    	            	if(percentLinha == null || percentLinha == 0 || isNaN(percentLinha)) {
    	                    erro += "Please, fill in the field Percentage! Line ("+(i+1)+")" + "<br/>";
    	                }else{
    	                	totalPercent += percentLinha;
    	                }
    	            }
    	            if(totalPercent != 100){
    	            	if(isNaN(totalPercent)){
    	            		totalPercent = 0;
    	            	}
    	            	erro += "Check the percentage for the churches. The total must be 100%! Total at the moment: "+ totalPercent + "<br/>";
    	            }
    			}else{
    				erro += "You must enter at least one church!" + "<br/>";
    			}     

    		}else{
    			if(form.getValue("zoom_igreja") == "" || form.getValue("zoom_igreja") == null){
    	            erro += "Please, fill in the field Requesting Church!" + "<br/>";
    	        }
    		}
    	}	
    
    
    
    
    }
    	
	if( erro != ""){
		throw erro;
	}
	
}