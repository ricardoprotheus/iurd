function validateForm(form){
	
	var enviar 						= getValue("WKCompletTask");
	var erro 						= "";
	var activity   					= getValue("WKNumState");
	var churches    				= form.getChildrenIndexes("table_church");
    var totalPercent 				= 0;
    var percentLinha 				= 0;
    var churchGrid					= "";
    var churchGridHidden			= "";	
    var ATIVIDADE_INICIAL			= (activity == 0 || activity == 4);
    var ATIV_STATE_LEADER			= (activity == 5);
//	var ATIV_NATIONAL_LEADER		= (activity == 19);
	var ATIV_DPT_HEADER_APPROVAL	= (activity == 22);
	var ATIV_DIVISION				= (activity == 25);
	var ATIV_VP						= (activity == 30);
	var ATIV_DPT_HEADER_FIM			= (activity == 33);
	
	if(enviar!="false"){
		if(ATIVIDADE_INICIAL){
						
			if(form.getValue("rd_aplicacao") == ""){
				erro += 'enter the <b>What type of contract is this</b> field.<br>';
			}
			if(form.getValue("rd_tipoContrato") == ""){
				erro += 'enter the <b>What does this contract apply to</b> field.<br>';
			}
			if(form.getValue("txt_dataInicio") == ""){
				erro +='enter the <b>Start Date</b> field.<br>';
			}
			if(form.getValue("txt_dataFinal") == ""){
				erro +='enter the <b>End Date</b> field.<br>';
			}
			if(form.getValue("zoom_term") == ""){
				erro +='enter the <b>Term of the new contract provided by test</b> field.<br>';
			}
			if((form.getValue("txt_installment") == "") || parseInt(form.getValue("installfee")) == 0) {
				erro +='enter the <b>How many installments</b> field.<br>';
			}
			if(form.getValue("dataInstallment") == ""){
				erro +='enter the <b>First Installment</b> field.<br>';
			}
			if(form.getValue("txt_pessoaContato") == ""){
				erro +='enter the <b>Who is our person of contact?</b> field.<br>';
			}
			if(form.getValue("txt_pagamentoPrograma") == ""){
				erro +='enter the <b>How much will we pay per program/spot?</b> field.<br>';
			}
			if(form.getValue("txt_total") == ""){
				erro +='enter the <b>Grand Total</b> field.<br>';
			}
			if(form.getValue("rd_verificaDesconto") == ""){
				erro +='enter the <b>Has this grand total been verified if there is a 15% discount due to us not having an agency?</b> field.<br>';
			}
			if(form.getValue("txt_regioesBeneficiadas") == ""){
				erro +='enter the <b>What region(s) will be benefited with this request?</b> field.<br>';
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
				erro +='enter the <b>Are there any documents that come attatched with this form?</b> field.<br>';
			}
			
			
		}else if (ATIV_STATE_LEADER){
			if(form.getValue("rd_aprovacaoGestor") == "nao"){
				if(form.getValue("descricao") == null || form.getValue("descricao") == "" ){
					erro += "enter the <b>Inform the reason for Denied - Feedback</b> field.<br>";
				}
			}

			if(form.getValue("rd_aprovacaoGestor") == ""){
				erro += 'enter the <b>Approval</b> field.<br>';
			}
/*
		}else if (ATIV_NATIONAL_LEADER){
			if(form.getValue("rd_aprovGestor_national_leader") == "nao"){
				if(form.getValue("descricao_national_leader") == null || form.getValue("descricao_national_leader") == "" ){
					erro += "enter the <b>Inform the reason for Denied - Feedback</b> field.<br>";
				}
			}

			if(form.getValue("rd_aprovGestor_national_leader") == ""){
				erro += 'enter the <b>Approval</b> field.<br>';
			}
*/
		}else if (ATIV_DPT_HEADER_APPROVAL){			 		
			if(form.getValue("rd_aprovGestor_dpt_head") == "nao"){
				if(form.getValue("descricao_dpt_head") == null || form.getValue("descricao_dpt_head") == "" ){
					erro += "enter the <b>Inform the reason for Denied - Feedback</b> field.<br>";
				}
			}

			if(form.getValue("rd_aprovGestor_dpt_head") == ""){
				erro += 'enter the <b>Approval</b> field.<br>';
			}
		}else if (ATIV_DIVISION){
			if(form.getValue("rd_aprovGestor_division") == "nao"){
				if(form.getValue("descricao_division") == null || form.getValue("descricao_division") == "" ){
					erro += "enter the <b>Inform the reason for Denied - Feedback</b> field.<br>";
				}
			}

			if(form.getValue("rd_aprovGestor_division") == ""){
				erro += 'enter the <b>Approval</b> field.<br>';
			}
		}else if (ATIV_VP){
			if(form.getValue("rd_aprovGestor_vp") == "nao"){
				if(form.getValue("descricao_vp") == null || form.getValue("descricao_vp") == "" ){
					erro += "enter the <b>Inform the reason for Denied - Feedback</b> field.<br>";
				}
			}

			if(form.getValue("rd_aprovGestor_vp") == ""){
				erro += 'enter the <b>Approval</b> field.<br>';
			}
		}else if (ATIV_DPT_HEADER_FIM){
			//ALTERADO BRUNO 20200520 - Movido por Sergio Bruno em 20201031
			if(form.getValue("rateioChurch") == "" || form.getValue("rateioChurch") == null){ 
	    		erro += "Please, <b>select if there is prorating of expenses<b> in the form (church)!" + "<br/>";
	    	}else{
	    		if(form.getValue("rateioChurch") == "yes" ){
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
	    				erro += "<b>You must enter at least one church!</b>" + "<br/>";
	    			}     

	    		}else{
	    			if(form.getValue("zoom_igreja") == "" || form.getValue("zoom_igreja") == null){
	    	            erro += "Please, fill in the field <b>Requesting Church</b>!" + "<br/>";
	    	        }
	    		}
	    	}	
			
		    //ALTERADO BRUNO 20200520 - FIM	- Movido por Sergio Bruno em 20201031
			
			
			if(form.getValue("zoom_supplier") == "" || form.getValue("zoom_supplier") == null){
	            erro += "Please, fill in the field <b>Supplier</b>!" + "<br/>";
	        }
			if(form.getValue("invoiceNumber") == "" || form.getValue("invoiceNumber") == null){
	            erro += "Please, fill in the field <b>Invoice Number</b>!" + "<br/>";
	        }
			if(form.getValue("classes") == "" || form.getValue("classes") == null){
	            erro += "Please, fill in the field <b>GL Code</b>!" + "<br/>";
	        }
			if(form.getValue("zoom_department") == "" || form.getValue("zoom_department") == null){
	            erro += "Please, fill in the field <b>Department</b>!" + "<br/>";
	        }
		}

		if(erro != ""){
			throw erro;
		}
	}
}