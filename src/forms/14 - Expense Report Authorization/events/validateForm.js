function validateForm(form){
	var enviar 						= getValue("WKCompletTask");
	var erro 						= "";
	var state   					= getValue("WKNumState");
    var totalPercent 				= 0;
    var percentLinha 				= 0;

    var ATIVIDADE_INICIAL			= (state == 0 || state == 4); 
	var ATIV_STATE_LEADER			= (state == 5);
	var ATIV_DPT_HEADER_APPROVAL	= (state == 16);
	var ATIV_DIVISION				= (state == 18);
	var ATIV_DPT_HEADER_FIM			= (state == 20);
	
	if(enviar=="true"){
		if(ATIVIDADE_INICIAL){
			
			if(form.getValue("zoom_supplier") == ""){
				erro += 'enter the <b>Pastor/Employee Name</b> field.<br>';
			}
			if(form.getValue("rd_tipoSolicitacao") == ""){
				erro += 'enter the <b>Please select 1 that applies to this request</b> field.<br>';
			}else{
				if(form.getValue("rd_tipoSolicitacao") == "despesasMilhas"){
					if(form.getValue("rd_tipo") == ""){
						erro += 'enter the <b>"Is this a:"</b> field.<br>';
					}
					if(form.getValue("txt_marcaCarro") == ""){
						erro += 'enter the <b>Car Make</b> field.<br>';
					}
					if(form.getValue("txt_modeloCarro") == ""){
						erro += 'enter the <b>Car Model</b> field.<br>';
					}
					if(form.getValue("txt_placaCarro") == ""){
						erro += 'enter the <b>License Plate</b> field.<br>';
					}
					if(form.getValue("txt_total") == ""){
						erro += 'enter the <b>Grand Total Expense</b> field.<br>';
					}
				}else{
					if(form.getValue("txt_pagamentoPrograma") == "" || form.getValue("txt_pagamentoPrograma") == null || parseFloat(form.getValue("txt_pagamentoPrograma")) == 0){
						erro +='enter the <b>How much is the total? Please inform the total for the expense!</b> field.<br>';
					}
				}
			}
			/*
			if(form.getValue("zoom_term") == ""){
				erro +='enter the <b>Term of the new contract provided by test</b> field.<br>';
			}
			if((form.getValue("txt_installment") == "") || isNaN(form.getValue("txt_installment")) || (form.getValue("txt_installment") == 0) ) {
				erro +='enter the <b>How many installments</b> field.<br>';
			}*/
			if(form.getValue("dataInstallment") == ""){
				erro +='enter the <b>Date Accounts Payable</b> field.<br>';
			}
			if(form.getValue("txt_total") == ""){
				erro +='enter the <b>Grand Total</b> field.<br>';
			}
			if(form.getValue("rd_fee") == ""){
				erro += "Please, inform the <b>Is there an installation fee?</b>!" + "<br/>";
			}
			if(form.getValue("rd_fee") == "sim"){
	        	if(form.getValue("installfee") == "" || form.getValue("installfee") == null || parseFloat(form.getValue("installfee")) == 0){
	                erro += "Please, inform the <b>installment fee</b>!" + "<br/>";
	            }
	        	if(form.getValue("dataInstallFee") == "" || form.getValue("dataInstallFee") == null){
	                erro += "Please, inform the <b>installment fee date</b>!" + "<br/>";
	            }
	        }
			
			if(form.getValue("rd_documentos") == ""){
				erro += 'enter the <b>Are there any documents that come attatched with this form?</b> field.<br>';
			}
		} else if (ATIV_STATE_LEADER){
			if(form.getValue("rd_aprovacaoGestor") == ""){
				erro += 'enter the <b>Approval</b> field.<br>';
			}

			if(form.getValue("rd_aprovacaoGestor") == "nao"){
				if(form.getValue("descricao") == ""){
					erro += 'enter the <b>Feedback</b> field.<br>';
				}
			}
		} else if (ATIV_DPT_HEADER_APPROVAL){
			if(form.getValue("rd_aprovGestor_dpt_head") == ""){
				erro += 'enter the <b>Approval</b> field.<br>';
			}

			if(form.getValue("rd_aprovGestor_dpt_head") == "nao"){
				if(form.getValue("descricao_dpt_head") == ""){
					erro += 'enter the <b>Feedback</b> field.<br>';
				}
			}
		}else if (ATIV_DIVISION){
			if(form.getValue("rd_aprovGestor_division") == ""){
				erro += 'enter the <b>Approval</b> field.<br>';
			}

			if(form.getValue("rd_aprovGestor_division") == "nao"){
				if(form.getValue("descricao_division") == ""){
					erro += 'enter the <b>Feedback</b> field.<br>';
				}
			}
		}else if (ATIV_DPT_HEADER_FIM){
			
			//ALTERADO BRUNO 20200604
			if(form.getValue("rateioChurch") == "" || form.getValue("rateioChurch") == null){ 
	    		erro += "Please, <b>select if there is prorating of expenses<b> in the form (church)!" + "<br/>";
	    	}else{
	    		if(form.getValue("rateioChurch") == "yes" ){
	    			var churches    		= form.getChildrenIndexes("table_church");
	    			var churchGrid			= "";
	    		    var churchGridHidden	= "";
	    			if (churches.length > 0) {	
	    	            for (var i = 0; i < churches.length; i++) { // percorre os campos Pai x Filho
	    	            	percentLinha = parseFloat(form.getValue('txt_percent_grid___' + churches[i]));
	    	            	churchGrid	 = form.getValue('requesting_church_grid___' + churches[i]);    	            	
	    	            	if(churchGrid == null || churchGrid == "") {
	    	                    erro += "Please, <b>fill in the field Church</b>! Line ("+(i+1)+")" + "<br/>";
	    	                }
	    	            	if(percentLinha == null || percentLinha == 0 || isNaN(percentLinha)) {
	    	                    erro += "Please, <b>fill in the field Percentage</b>! Line ("+(i+1)+")" + "<br/>";
	    	                }else{
	    	                	totalPercent += percentLinha;
	    	                }
	    	            }
	    	            if(totalPercent != 100){
	    	            	if(isNaN(totalPercent)){
	    	            		totalPercent = 0;
	    	            	}
	    	            	erro += "<b>Check the percentage for the churches</b>. The total must be 100%! Total at the moment: "+ totalPercent + "<br/>";
	    	            }
	    			}else{
	    				erro += "enter <b>at least one church!</b>" + "<br/>";
	    			}     

	    		}else{
	    			if(form.getValue("zoom_igreja") == "" || form.getValue("zoom_igreja") == null){
	    	            erro += "Please, fill in the field <b>Requesting Church</b>!" + "<br/>";
	    	        }
	    		}
	    	}	
			
		    //ALTERADO BRUNO 20200604 - FIM
			
			totalPercent = 0;
			
			if(form.getValue("rateioGlCode") == "" || form.getValue("rateioGlCode") == null){ 
	    		erro += "Please, <b>select if there is prorating of expenses<b> in the form (GL Code)!" + "<br/>";
	    	}else{
	    		if(form.getValue("rateioGlCode") == "yes" ){
	    			var glCodes    			= form.getChildrenIndexes("table_gl_code");
	    			var glCodeGrid			= "";
	    		    var glCodeGridHidden	= "";
	    			if (glCodes.length > 0) {
	    	            for (var i = 0; i < glCodes.length; i++) { // percorre os campos Pai x Filho
	    	            	percentLinha = parseFloat(form.getValue('txt_percent_grid_gl_code___' + glCodes[i]));
	    	            	glCodeGrid	 = form.getValue('zoom_classes_grid___' + glCodes[i]);    	            	
	    	            	if(glCodeGrid == null || glCodeGrid == "") {
	    	                    erro += "Please, <b>fill in the field Gl Code</b>! Line ("+(i+1)+")" + "<br/>";
	    	                }
	    	            	if(percentLinha == null || percentLinha == 0 || isNaN(percentLinha)) {
	    	                    erro += "Please, <b>fill in the field Percentage</b>! Line ("+(i+1)+")" + "<br/>";
	    	                }else{
	    	                	totalPercent += percentLinha;
	    	                }
	    	            }
	    	            if(totalPercent != 100){
	    	            	if(isNaN(totalPercent)){
	    	            		totalPercent = 0;
	    	            	}
	    	            	erro += "<b>Check the percentage for the Gl Code</b>. The total must be 100%! Total at the moment: "+ totalPercent + "<br/>";
	    	            }
	    			}else{
	    				erro += "<b>You must enter at least one Gl Code!</b>" + "<br/>";
	    			}     	
	    		}else{
	    			if(form.getValue("classes") == "" || form.getValue("classes") == null){
	    	            erro += "Please, fill in the field <b>Gl Code</b>!" + "<br/>";
	    	        }
	    		}
	    	}
			
			if(form.getValue("zoom_department") == "" || form.getValue("zoom_department") == null){
	            erro += "Please, fill in the field <b>Department</b>!" + "<br/>";
	        }
			if(form.getValue("invoiceNumber") == "" || form.getValue("invoiceNumber") == null){
	            erro += "Please, fill in the field <b>Invoice Number</b>!" + "<br/>";
	        }
		}
		
		if(erro != ""){
			throw erro;
		}
	}
}