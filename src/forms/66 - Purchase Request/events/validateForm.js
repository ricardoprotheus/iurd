function validateForm(form){
    var activity   					= getValue("WKNumState");
	var ativProx    				= getValue("WKNextState");
    var indexes     				= form.getChildrenIndexes("table_product");
    var erro        				= "";
    var churches   					= form.getChildrenIndexes("table_church");
    var totalPercent 				= 0;
    var percentLinha 				= 0;
    var churchGrid					= "";
    var churchGridHidden			= "";	
    var ATIV_INICIAL				= ((activity == 0 || activity == 4) && activity != "");
	var ATIV_STATE_LEADER			= (activity == 5);
	var ATIV_NATIONAL				= (activity == 46);
	var ATIV_IT						= (activity == 15);
	var ATIV_DPT_HEADER_APPROVALL	= (activity == 19);
	var ATIV_DIVISION				= (activity == 25);
	var ATIV_VP						= (activity == 33);
	var ATIV_DPT_HEADER_FIM			= (activity == 53);
	var ATIV_ERROR_INT				= (activity == 60);
	var ATIV_FIM					= (activity == 44);
    
    if(ATIV_INICIAL){
    	erro += validSecretary(form);
    }else if(ATIV_STATE_LEADER){
    	erro += validStateLeader(form);
    }else if(ATIV_NATIONAL){
    	erro += validNationalLeader(form);
    }else if(ATIV_IT){
    	erro += validIT(form);
    }else if(ATIV_DPT_HEADER_APPROVALL){
    	erro += validDptHeadApproval(form);
    }else if(ATIV_DIVISION){
    	erro += validDivision(form);
    }else if(ATIV_VP){
    	erro += validVP(form);
    }else if(ATIV_DPT_HEADER_FIM){
    	erro += validDptHead(form);
    }

    if( erro != ""){
		throw erro;
	}

}

function validSecretary(form){
	
	var erro 				= "";
	var indexes     		= form.getChildrenIndexes("table_product");	

	if(form.getValue("orderFor") == "" || form.getValue("orderFor") == null){
        erro += "Please, select the <b>order</b>!" + "<br/>";
    }
    
    if(form.getValue("txt_store") == "" || form.getValue("txt_store") == null){
        erro += "Please, fill in the field <b>Store</b>!" + "<br/>";
    }
    
    if(form.getValue("criteria") == "" || form.getValue("criteria") == null){
        erro += "Please, specify <b>the criteria associated with this Request</b>!" + "<br/>";
    }else{
    	if (form.getValue("criteria") == "hardware"){
    		if( (form.getValue("computer") == "" || form.getValue("computer") == null)
    			&&(form.getValue("networking") == "" || form.getValue("networking") == null)
    			&&(form.getValue("studio") == "" || form.getValue("studio") == null)
    			&&(form.getValue("surveillance") == "" || form.getValue("surveillance") == null)
    			&&(form.getValue("printer") == "" || form.getValue("printer") == null)) {
    			erro += "Please, select the <b>type of Hardware</b> !" + "<br/>";
    		}		
    	}
    }
        
    if(form.getValue("detailFirst") == "" || form.getValue("detailFirst") == null){
        erro += "Please, explain in detail <b>what is the purpose / goal of this Request</b>!" + "<br/>";
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
	
	if(form.getValue("rd_approveState") == "" || form.getValue("rd_approveState") == null){
        erro += "You need to approve or deny this process!" + "<br/>";
    }
    
    if(form.getValue("rd_approveState") == "denied"){
		if(form.getValue("txt_feedbackState") == ""){
			erro += 'enter the <b>Feedback</b> field.<br>';
		}
	}
    
    return erro;
}

function validNationalLeader(form){
	
	var erro = "";
	
	if(form.getValue("rd_approveNational") == "" || form.getValue("rd_approveNational") == null){
        erro += "You need to approve or deny this process!" + "<br/>";
    }
    if(form.getValue("rd_approveNational") == "denied"){
		if(form.getValue("txt_feedbackNational") == ""){
			erro += 'enter the <b>Feedback</b> field.<br>';
		}
	}
    
    return erro;
}

function validIT(form){
	
	var erro = "";
	
	if(form.getValue("rd_IT") == "" || form.getValue("rd_IT") == null){
        erro += "You need to approve or deny this process!" + "<br/>";
    }
    if(form.getValue("rd_IT") == "denied"){
		if(form.getValue("txt_feedbackIT") == ""){
			erro += 'enter the <b>Feedback</b> field.<br>';
		}
	}
    
    return erro;
}

function validDptHeadApproval(form){
	
	var erro = "";
	
	if(form.getValue("rd_deptHead") == "" || form.getValue("rd_deptHead") == null){
        erro += "You need to approve or deny this process!" + "<br/>";
    }
    if(form.getValue("rd_deptHead") == "denied"){
		if(form.getValue("txt_feedbackDeptHead") == ""){
			erro += 'enter the <b>Feedback</b> field.<br>';
		}
	}
    
	return erro;
}

function validDivision(form){
	
	var erro = "";
	
	if(form.getValue("rd_division") == "" || form.getValue("rd_division") == null){
	    erro += "You need to approve or deny this process!" + "<br/>";
	}
	if(form.getValue("rd_division") == "denied"){
		if(form.getValue("txt_feedbackDivision") == ""){
			erro += 'enter the <b>Feedback</b> field.<br>';
		}
	}
	
	return erro;
}

function validVP(form){
	
	var erro = "";

	if(form.getValue("rd_VP") == "" || form.getValue("rd_VP") == null){
        erro += "You need to approve or deny this process!" + "<br/>";
    }
    if(form.getValue("rd_VP") == "denied"){
		if(form.getValue("txt_feedbackVP") == ""){
			erro += 'enter the <b>Feedback</b> field.<br>';
		}
	}
	
	return erro;
}

function validDptHead(form){
	
	var erro 				= "";
	var indexes     		= form.getChildrenIndexes("table_product");	
	var churches    		= form.getChildrenIndexes("table_church");
    var totalPercent 		= 0;
    var percentLinha 		= 0;
    var churchGrid			= "";
    var churchGridHidden	= "";
    var indexes    			= form.getChildrenIndexes("table_product");
	
	if(form.getValue("rateioChurch") == "" || form.getValue("rateioChurch") == null){ 
		erro += "Please, select if there is prorating of expenses in the form (church)!" + "<br/>";
	}else{
		if(form.getValue("rateioChurch") == "yes" ){
			if (churches.length > 0) {
	            for (var i = 0; i < churches.length; i++) { // percorre os campos Pai x Filho
	            	percentLinha = parseFloat(form.getValue('txt_percent_grid___' + churches[i]));
	            	churchGrid	 = form.getValue('requesting_church_grid___' + churches[i]);    	            	
	            	if(churchGrid == null || churchGrid == "") {
	                    erro += "Please, fill in the field <b>Church! Line ("+(i+1)+") </b>" + "<br/>";
	                }
	            	if(percentLinha == null || percentLinha == 0 || isNaN(percentLinha)) {
	                    erro += "Please, fill in the field <b>Percentage! Line ("+(i+1)+")</b>" + "<br/>";
	                }else{
	                	totalPercent += percentLinha;
	                }
	            }
	            if(totalPercent != 100){
	            	if(isNaN(totalPercent)){
	            		totalPercent = 0;
	            	}
	            	erro += "Check the <b>percentage for the churches. The total must be 100%</b>! Total at the moment: "+ totalPercent + "<br/>";
	            }
			}else{
				erro += "You must enter <b>at least one church</b>!" + "<br/>";
			}     

		}else{
			if(form.getValue("requesting_church") == "" || form.getValue("requesting_church") == null){
	            erro += "Please, fill in the field <b>Requesting Church</b>!" + "<br/>";
	        }
		}
	}	
	
	
	if(form.getValue("supplierCode") == "" || form.getValue("supplierCode") == null){
        erro += "Please, fill in the field <b>Vendor</b>!" + "<br/>";
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
    
    if(form.getValue("hd_department") == "" || form.getValue("hd_department") == null){
        erro += "Please, fill in the field <b>Department</b>!" + "<br/>";
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
