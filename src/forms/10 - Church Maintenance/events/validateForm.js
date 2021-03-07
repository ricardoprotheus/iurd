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
	//var ATIV_NATIONAL_LEADER		= (activity == 19);
	var ATIV_DPT_HEADER_APPROVAL	= (activity == 25);
	var ATIV_DIVISION				= (activity == 29);
	var ATIV_VP						= (activity == 33);
	var ATIV_DPT_HEADER_FIM			= (activity == 37);
	
	
	if(enviar=="true"){
		if(ATIVIDADE_INICIAL){
			if(form.getValue("zoom_state") == "" || form.getValue("zoom_state") == null){
	            erro += "Please, fill in the field <b>State</b>!" + "<br/>";
	        }
			if(form.getValue("zoom_supplier") == "" || form.getValue("zoom_supplier") == null){
	            erro += "Please, fill in the field <b>Supplier</b>!" + "<br/>";
	        }
			if(form.getValue("rd_status") == ""){
				erro += 'enter the <b>Status of the Problem</b> field.<br>';
			}
			if(form.getValue("rd_propriedade") == ""){
				erro += 'enter the <b>Property</b> field.<br>';
			}
			if(form.getValue("associRequisicao") == "" || form.getValue("associRequisicao") == null){
				erro += 'enter the <b>Maintenance Request Associated</b> field.<br>';
			}else{
				if(form.getValue("associRequisicao") == "nenhum" ){
					if(form.getValue("specify") == ""){
						erro +='enter the <b>Specify</b> field.<br>';
					}
				}
			}
			if(form.getValue("vlr_downpayment") != "" || !isNaN(form.getValue("vlr_downpayment")) || (form.getValue("vlr_downpayment") > 0)){
				if(form.getValue("dataDownpayment") == ""){
					erro += 'enter the <b>Date Downpayment</b> field.<br>';
				}
			}
			/*
			if(form.getValue("vlr_downpayment") == "" || isNaN(form.getValue("vlr_downpayment")) || (form.getValue("vlr_downpayment") == 0)){
				erro += 'enter the <b>Downpayment</b> field.<br>';
			}else{
				if(form.getValue("dataDownpayment") == ""){
					erro += 'enter the <b>Date Downpayment</b> field.<br>';
				}
			}
			*/
			if((form.getValue("total") == "") || isNaN(form.getValue("total")) || (form.getValue("total") == 0) ) {
				erro +='enter the <b>Total</b> field.<br>';
			}
			if(form.getValue("dataInstallment") == ""){
				erro +='enter the <b>First Installment</b> field.<br>';
			}
			if(form.getValue("zoom_term") == ""){
				erro +='enter the <b>Term of the new contract provided by test</b> field.<br>';
			}
			if((form.getValue("txt_installment") == "") || isNaN(form.getValue("txt_installment")) || (form.getValue("txt_installment") == 0) ) {
				erro +='enter the <b>How many installments</b> field.<br>';
			}
			/*
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
	        */
			
			
			if((form.getValue("grand_total") == "") || isNaN(form.getValue("grand_total")) || (form.getValue("grand_total") == 0) ) {
				erro += '<b>Grand Total</b> field can not be 0.<br>';
			}
			if(form.getValue("rd_documentos") == ""){
				erro += 'enter the <b>Are there any documents that come attatched with this form?<b> field.<br>';
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
			//ALTERADO BRUNO 20200615
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
			
		    //ALTERADO BRUNO 20200615 - FIM
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
		
		//validando se as datas dos titulos (due dates) sao maiores do que a data atual.
		erro += validateDates(form);

		if(erro != ""){
			throw erro;
		}
	}
}