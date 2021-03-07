function validateForm(form){
	
	var enviar 						= getValue("WKCompletTask");
	var erro 						= "";
	var activity 					= getValue("WKNumState");
	var ATIV_INICIAL				= form.getValue("ATIV_INICIAL");
	var ATIV_STATE_LEADER			= form.getValue("ATIV_STATE_LEADER");
//	var ATIV_NATIONAL_LEADER		= form.getValue("ATIV_NATIONAL_LEADER");
	var ATIV_PCH_DPT_HEADER			= form.getValue("ATIV_PCH_DPT_HEADER");
	var ATIV_DIVISION				= form.getValue("ATIV_DIVISION");
	var ATIV_VP						= form.getValue("ATIV_VP");
	var ATIV_PCH_DPT_HEADER_FIM		= form.getValue("ATIV_PCH_DPT_HEADER_FIM");
	
	if(enviar=="true"){
		if((activity == ATIV_INICIAL) || activity == "0"){
			erro += validSecretary(form);
		}else if(activity == ATIV_STATE_LEADER){
			erro += validStateLeader(form);
//		}else if(activity == ATIV_NATIONAL_LEADER){
//			erro += validNationalLeader(form);
		}else if(activity == ATIV_PCH_DPT_HEADER){
			erro += validPchDptHead(form);
		}else if (activity == ATIV_DIVISION){
			erro += validDivision(form);
		}else if (activity == ATIV_VP){
			erro += validVP(form);
		}else if(activity == ATIV_PCH_DPT_HEADER_FIM){
			erro += validDptHead(form);
		}
		
		if(erro != ""){
			throw erro;
		}
	}
	
}

function validSecretary(form){
	
	var erro 				= "";
    var indexes    			= form.getChildrenIndexes("table_product");
        
    if(form.getValue("orderFor") == "" || form.getValue("orderFor") == null){
        erro += "Please, fill in the field <b>select the order</b>!" + "<br/>";
    }
    
    if(form.getValue("txt_store") == "" || form.getValue("txt_store") == null){
        erro += "Please, fill in the field <b>Store</b>!" + "<br/>";
    }
    
    //Campos que secretaria tem que preencher, mas que também sao responsabilitade do dpt head.
	
	if(form.getValue("paymentTerm") == "" || form.getValue("paymentTerm") == null){
        erro += "Please, fill in the field <b>Payment Term</b>!" + "<br/>";
    }
	
	if(form.getValue("rd_shipping") == ""){
		erro += "Please, inform the <b>Is there any charge for Shipping?</b>!" + "<br/>";
	}
	if(form.getValue("rd_shipping") == "sim"){
    	if(form.getValue("txt_shippingCost") == "" || form.getValue("txt_shippingCost") == null || parseFloat(form.getValue("txt_shippingCost")) == 0){
            erro += "Please, inform the <b>Shipping Cost</b>!" + "<br/>";
        }
    }
	
    if(form.getValue("rd_check") == "" || form.getValue("rd_check") == null){
    	erro += "Please, fill in the field <b>Payment Method</b>!" + "<br/>";
    }
    
    if (indexes.length > 0) {
        for (var i = 0; i < indexes.length; i++) { // percorre os campos Pai x Filho
            if(form.getValue('txt_quantity___' + indexes[i]) == null || form.getValue('txt_quantity___' + indexes[i]) == '' || parseInt(form.getValue('txt_quantity___' + indexes[i])) == 0) {
                erro += "Please, fill in the field <b>Quantity</b>! Line ("+(i+1)+")" + "<br/>";
            }

            if(form.getValue('txt_unitValue___' + indexes[i]) == null || form.getValue('txt_unitValue___' + indexes[i]) == '' || parseFloat(form.getValue('txt_unitValue___' + indexes[i])) == 0) {
                erro += "Please, fill in the field <b>Unit Value</b> ! Line ("+(i+1)+")" + "<br/>";
            }
            
            if(form.getValue('requesting_product___' + indexes[i]) == null || form.getValue('requesting_product___' + indexes[i]) == '') {
                erro += "Please, fill in the field <b>Product</b>! Line ("+(i+1)+")" + "<br/>";
            }
            
            if(form.getValue('txt_total___' + indexes[i]) == null || form.getValue('txt_total___' + indexes[i]) == '' || parseFloat(form.getValue('txt_total___' + indexes[i])) == 0) {
                erro += "Please, fill in the field <b>Total</b> ! Line ("+(i+1)+")" + "<br/>";
            }
        }
    }else{
    	erro += "<b>You must enter at least one product!</b>" + "<br/>";
    }    
    
    if(form.getValue("rd_documentos") == ""){
		erro += 'Please, enter the <b>Are there any documents that come attatched with this form?</b> field.<br>';
	}
    
	return erro;
}

function validStateLeader(form){
	
	var erro = "";
	
	if(form.getValue("rd_aprovacaoGestor") == "nao"){
		if(form.getValue("descricao") == null || form.getValue("descricao") == "" ){
			erro += "enter the <b>Feedback</b> field.<br>";
		}
	}

	if(form.getValue("rd_aprovacaoGestor") == ""){
		erro += 'enter the <b>Approval</b> field.<br>';
	}
	
	
	return erro;
}

/*
function validNationalLeader(form){
	
	var erro = "";
	
	if(form.getValue("rd_aprovGestor_national_leader") == "nao"){
		if(form.getValue("descricao_national_leader") == null || form.getValue("descricao_national_leader") == "" ){
			erro += "enter the <b>Feedback</b> field.<br>";
		}
	}

	if(form.getValue("rd_aprovGestor_national_leader") == ""){
		erro += 'enter the <b>Approval</b> field.<br>';
	}
	
	
	return erro;
}
*/

function validDptHead(form){
	
	var erro 				= "";
	var indexes     		= form.getChildrenIndexes("table_product");
	var churches    		= form.getChildrenIndexes("table_church");
    var totalPercent 		= 0;
    var percentLinha 		= 0;
    var churchGrid			= "";
    var churchGridHidden	= "";
	
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
    
	if(form.getValue("supplierCode") == "" || form.getValue("supplierCode") == null){
        erro += "Please, fill in the field <b>Vendor</b>!" + "<br/>";
    }
	//Incluido Sergio Bruno - 20201102
	if(form.getValue("department") == "" || form.getValue("department") == null){
        erro += "Please, fill in the field <b>Department</b>!" + "<br/>";
    }
	
	/*
	if(form.getValue("deliveryCity") == "" || form.getValue("deliveryCity") == null){
        erro += "Please, fill in the field <b>Delivery City</b>!" + "<br/>";
    }
	
	if(form.getValue("issueCity") == "" || form.getValue("issueCity") == null){
        erro += "Please, fill in the field <b>Issue City</b>!" + "<br/>";
    }
	*/
	
	if(form.getValue("paymentTerm") == "" || form.getValue("paymentTerm") == null){
        erro += "Please, fill in the field <b>Payment Term</b>!" + "<br/>";
    }
	
    if(form.getValue("invoiceNumber") == "" || form.getValue("invoiceNumber") == null){
        erro += "Please, fill in the field <b>Invoice Number</b>!" + "<br/>";
    }

    if(form.getValue("rd_check") == "CREDIT CARD (PHONE)" || form.getValue("rd_check") == "CREDIT CARD (ONLINE)"){
        if(form.getValue("bank") == "" || form.getValue("bank") == null){
            erro += "Please, fill in the field <b>Bank</b>!" + "<br/>";
        }
    }
    
    if (indexes.length > 0) {
        for (var i = 0; i < indexes.length; i++) { // percorre os campos Pai x Filho
            
        	if(form.getValue('txt_quantity___' + indexes[i]) == null || form.getValue('txt_quantity___' + indexes[i]) == '' || parseInt(form.getValue('txt_quantity___' + indexes[i])) == 0) {
                erro += "Please, fill in the field <b>Quantity</b>! Line ("+(i+1)+")" + "<br/>";
            }
        	 	
            if(form.getValue('txt_unitValue___' + indexes[i]) == null || form.getValue('txt_unitValue___' + indexes[i]) == '' || parseFloat(form.getValue('txt_unitValue___' + indexes[i])) == 0) {
                erro += "Please, fill in the field <b>Unit Value</b> ! Line ("+(i+1)+")" + "<br/>";
            }

            if(form.getValue("txt_inflowType___" + indexes[i]) == null || form.getValue("txt_inflowType___" + indexes[i]) == ""){
                erro += "Please, fill in the field <b>Inflow Type</b>! Line ("+(i+1)+")" + "<br/>";
            }
            
            if(form.getValue('classes___' + indexes[i]) == null || form.getValue('classes___' + indexes[i]) == '') {
                erro += "Please, fill in the field <b>Gl Code</b>! Line ("+(i+1)+")" + "<br/>";
            }
            
            if(form.getValue('requesting_product___' + indexes[i]) == null || form.getValue('requesting_product___' + indexes[i]) == '') {
                erro += "Please, fill in the field <b>Product</b>! Line ("+(i+1)+")" + "<br/>";
            }
            
            if(form.getValue('txt_total___' + indexes[i]) == null || form.getValue('txt_total___' + indexes[i]) == '' || parseFloat(form.getValue('txt_total___' + indexes[i])) == 0) {
            	erro += "Please, fill in the field <b>Total</b> ! Line ("+(i+1)+")" + "<br/>";
            }
            
        }
    }
    
    if (indexes.length == 0){
        erro += "<b>You must enter at least one product!</b>" + "<br/>";
    }
	
	return erro;
}

function validPchDptHead(form){
	
	var erro = "";
	
	if(form.getValue("rd_pchDptHead") == ""){
		erro += 'enter the <b>Approval</b> field.<br>';
	}else if(form.getValue("rd_pchDptHead") == "nao"){
		if(form.getValue("txt_feedbackPchDptHead") == null || form.getValue("txt_feedbackPchDptHead") == "" ){
			erro += "enter the <b>Feedback</b> field.<br>";
		}
	}
	
	return erro;
}

function validDivision(form){
	
	var erro = "";
	
	if(form.getValue("rd_aprovGestor_division") == ""){
		erro += 'enter the <b>Approval</b> field.<br>';
	}else if(form.getValue("rd_aprovGestor_division") == "nao"){
		if(form.getValue("descricao_division") == null || form.getValue("descricao_division") == "" ){
			erro += "enter the <b>Feedback</b> field.<br>";
		}
	}
	
	return erro;
}

function validVP(form){
	
	var erro = "";
	
	if(form.getValue("rd_aprovGestor_vp") == ""){
		erro += 'enter the <b>Approval</b> field.<br>';
	}else if(form.getValue("rd_aprovGestor_vp") == "nao"){
		if(form.getValue("descricao_vp") == null || form.getValue("descricao_vp") == "" ){
			erro += "enter the <b>Feedback</b> field.<br>";
		}
	}
	
	return erro;
}