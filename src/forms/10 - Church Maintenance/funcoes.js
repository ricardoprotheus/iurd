function loadform(){
	var activity 					= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= ((activity == 0 || activity == 4) && activity != "");
	var ATIV_STATE_LEADER			= (activity == 5);
	//var ATIV_NATIONAL_LEADER		= (activity == 19);
	var ATIV_DPT_HEADER_APPROVAL	= (activity == 25);
	var ATIV_DIVISION				= (activity == 29);
	var ATIV_VP						= (activity == 33);
	var ATIV_DPT_HEADER_FIM			= (activity == 37);
	
	selectChurch();
	setDownPayment();
	setAssociated();
	
	//ajuste em razao de erro de quando cai na atividade MOVE. Fica com error log no inspect object porque nao consegue ler as bibliotecas de calendar nesta etapa.
	if (activity != "" && mode!= "VIEW")
	{
		addmascara();
		carregaData();
	} 
	
	//ALTERADO  por Sergio Bruno 20201030
	if(!(ATIV_DPT_HEADER_FIM) || activity == ""){
		hideButtonChurch();
	}
	
	if(ATIV_INICIAL){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				scrollFocus('txt_solicitante');
				abreColapse('divInfoGeral');
				$("#divDepartment").hide();
			},150);
		}
	}else if(ATIV_STATE_LEADER){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				scrollFocus('txt_gestor');
				abreColapse('divAprovacao');
				$("#divDepartment").hide();
			},150);
		}
	/*
	}else if(ATIV_NATIONAL_LEADER){
		
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){//abre aba de Aprovação
				scrollFocus('txt_gestor_national_leader');
				abreColapse('divNationalLeader');
				$("#divDepartment").hide();
			},150);
		}
		*/
	}else if(ATIV_DPT_HEADER_APPROVAL){
		
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){//abre aba de Aprovação
				scrollFocus('txt_gestor_dpt_head');
				abreColapse('divDptHead');
				$("#divDepartment").hide();
			},150);
		}
	}else if(ATIV_DIVISION){
		
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){//abre aba de Aprovação
				scrollFocus('txt_gestor_division');
				abreColapse('divDivision');
				$("#divDepartment").hide();
			},150);
		}
	}else if(ATIV_VP){
		
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){//abre aba de Aprovação
				scrollFocus('txt_gestor_vp');
				abreColapse('divVP');
				$("#divDepartment").hide();
			},150);
		}
	}else if(ATIV_DPT_HEADER_FIM){
		reloadZoomFilterValues("zoom_igreja", "States," +  $('#code_state').val()); //filtro de Church por State no campo
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){//abre aba de Aprovação
				$("#divDepartment").show();
				scrollFocus('zoom_supplier');
				abreColapse('divDptHead');
			},150);
		}
	}
}

function setSelectedZoomItem(selectedItem) {
	
	var inputId 					= selectedItem.inputId;
	var array 						= inputId.split("___");
	var zoomName 					= array.shift();
	var idFilho 					= array.pop();
	var activity					= $("#atividade").val();
	var ATIV_INICIAL				= (activity == 0 || activity == 4);
	var ATIV_STATE_LEADER			= (activity == 5);
	//var ATIV_NATIONAL_LEADER		= (activity == 19);
	var ATIV_DPT_HEADER_APPROVAL	= (activity == 25);
	var ATIV_DIVISION				= (activity == 29);
	var ATIV_VP						= (activity == 33);
	var ATIV_DPT_HEADER_FIM			= (activity == 37);
	
	if(ATIV_INICIAL){
		if (zoomName == "zoom_supplier") {
			$("#txt_supplier").val(selectedItem.code);
			$("#txt_unit").val(selectedItem.unit);
			$("#txt_description").val(selectedItem.name);	
		}else if (zoomName == "zoom_term") {
			$("#txt_term_days").val(selectedItem.days);
		}else if (zoomName == "zoom_state") {
			var selectCode 			= selectedItem.code;
			var selectDescription 	= selectedItem.Description;
			$("#code_state").val(selectCode);
			$("#name_state").val(selectDescription);
		}
	}else if (ATIV_DPT_HEADER_FIM){
		if (zoomName == "zoom_department") {
			$("#txt_department_code").val(selectedItem.code);
			$("#txt_department_description").val(selectedItem.descri);
		}else if (zoomName == "classes") {
			$("#gl_code").val(selectedItem.code);
		}else if (zoomName == "zoom_igreja") {
			var selectEndereco = selectedItem.address;
			var selectEstado = selectedItem.States;
			$("#txt_endereco").val(selectEndereco);
			$("#txt_estado").val(selectEstado); 
		}else if (zoomName == "requesting_church_grid") {
			$("#hd_requesting_church_grid___"+ idFilho).val(selectedItem.Church);
			$("#txt_state_grid___"+ idFilho).val(selectedItem.States);
			$("#txt_address_grid___"+ idFilho).val(selectedItem.address);
		}	
	}
	 
}
function removedZoomItem(removedItem) {
	
	var activity					= $("#atividade").val();
	var inputId 					= removedItem.inputId;
	var array 						= inputId.split("___");
	var zoomName 					= array.shift();
	var idFilho 					= array.pop();
	var ATIV_INICIAL				= (activity == 0 || activity == 4);
	var ATIV_STATE_LEADER			= (activity == 5);
	//var ATIV_NATIONAL_LEADER		= (activity == 19);
	var ATIV_DPT_HEADER_APPROVAL	= (activity == 25);
	var ATIV_DIVISION				= (activity == 29);
	var ATIV_VP						= (activity == 33);
	var ATIV_DPT_HEADER_FIM			= (activity == 37);
	
	if(ATIV_INICIAL){
		if (removedItem.inputId == "zoom_supplier") {
			$("#txt_supplier").val("");
			$("#txt_unit").val("");
			$("#txt_description").val("");
		}else if (zoomName == "zoom_term") {
			$("#txt_term_days").val("");
		}else if (zoomName == "zoom_state") {
			$("#code_state").val("");
			$("#name_state").val("");
		}
	}else if (ATIV_DPT_HEADER_FIM){
		if (zoomName == "zoom_department") {
			$("#txt_department_code").val("");
			$("#txt_department_description").val("");
		}else if (zoomName == "classes") {
			$("#gl_code").val("");
		}else if (zoomName == "zoom_igreja") { //Limpa campos
			$("#txt_endereco").val("");
			$("#txt_estado").val("");
		}else if (zoomName == "requesting_church_grid") { //Limpa campos
			$("#hd_requesting_church_grid___"+ idFilho).val("");
			$("#txt_state_grid___"+ idFilho).val("");
			$("#txt_address_grid___"+ idFilho).val("");
			$("#txt_percent_grid___" + idFilho).val("0.00");
			$("#txt_percent_grid___" + idFilho).mask('##0.00%', {reverse: true});
		} 
	}
}
function addmascara(){
	$("#vlr_downpayment").maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	$("#total").maskMoney({ allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	$("#grand_total").maskMoney({ allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	$("#installfee").maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	$("#txt_installment").mask('##0000', {reverse: true});
}
function scrollFocus(input){
	$('html,body').animate({scrollTop: $('#'+input).offset().top}, 500, function() {
    	$('#'+input).focus();
	});
}
function abreColapse(idDiv) {
	$('#' + idDiv + ' .collapse').collapse('show');
}

function selectChurch() {
	
	var radio = $("#rateioChurch:checked").val();
	
	if (typeof radio != "undefined"){
		$("#auxRadioChurch").val(radio);
	}else{
		radio = $("#auxRadioChurch").val();
	}
	
	if (radio == "yes") {
		$("#div_table_church").show();
		$("#div_church").hide();
	} else {
		$("#div_table_church").hide();
		$("#div_church").show();
	}
}

//funcao para adicionar produtos no grid e fazer também a contagem de produtos do grid.
function addChurch(idtable){
	
	var activity 					= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= ((activity == 0 || activity == 4) && activity != "");
	var ATIV_STATE_LEADER			= (activity == 5);
	//var ATIV_NATIONAL_LEADER		= (activity == 19);
	var ATIV_DPT_HEADER_APPROVAL	= (activity == 25);
	var ATIV_DIVISION				= (activity == 29);
	var ATIV_VP						= (activity == 33);
	var ATIV_DPT_HEADER_FIM			= (activity == 37);
	
	if (activity != "")
	{
		var linha = wdkAddChild(idtable);
		
		if(ATIV_DPT_HEADER_FIM){
			//adicionando a quantidade de produtos do grid - gravamos sempre a ultima linha.
		    $('#linha_church').val(linha);
		    
		    $("#txt_percent_grid___"+linha).maskMoney({allowZero:false, allowNegative: false, thousands:'', decimal:'.'});
		    reloadZoomFilterValues("requesting_church_grid___"+linha, "States," +  $('#code_state').val()); //filtro de Church por State no grid
		}
	}
} 

function fnCustomDelete(oElement){
	var activity 					= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= ((activity == 0 || activity == 4) && activity != "");
	var ATIV_STATE_LEADER			= (activity == 5);
	//var ATIV_NATIONAL_LEADER		= (activity == 19);
	var ATIV_DPT_HEADER_APPROVAL	= (activity == 25);
	var ATIV_DIVISION				= (activity == 29);
	var ATIV_VP						= (activity == 33);
	var ATIV_DPT_HEADER_FIM			= (activity == 37);
	
	if (activity != "")
	{
		if(ATIV_DPT_HEADER_FIM){ 
			fnWdkRemoveChild(oElement);
		}
	}
}

function sumPercent(obj) {
	
	var qtdItens 			= linha_church.value;
	var totalPercent 		= 0;
	var linhaAtual 			= obj.id.split("___")[1];
	
	//varificando a somatoria de todas as linhas do grid.
	for (var i = 1; i <= qtdItens; i++) {
		var percentLinha = parseFloat($("#txt_percent_grid___" + i).val());
		if(percentLinha != null && !isNaN(percentLinha)){
			totalPercent += percentLinha;
		}
		if(totalPercent > 100){
			alert("Check the percentage. Maximum needs to be 100.00%")
			$("#txt_percent_grid___" + linhaAtual).val("0.00");
			$("#txt_percent_grid___" + linhaAtual).maskMoney({allowZero:false, allowNegative: false, thousands:'', decimal:'.'});
			$("#txt_percent_grid___" + linhaAtual).focus();
		}	
	}
}

function ajustarBackgroundColor(campo, color){
	$('#'+campo).attr('style', 'background-color: '+color+' !important');
}

function carregaData(){
	var dataAtual = new Date();
	var mySimpleCalendar = FLUIGC.calendar('#dataDownpayment',{
		language: 'en'
	});
	mySimpleCalendar.setMinDate(dataAtual);
	var mySimpleCalendar2 = FLUIGC.calendar('#dataInstallment',{
		language: 'en'
	});
	mySimpleCalendar2.setMinDate(dataAtual);
}

function somarTotalForm(){
	
	var vlrDownpayment 	= ($("#vlr_downpayment").val());
	var total 			= ($("#total").val());
	
	vlrDownpayment		= vlrDownpayment.replace(",","");
	vlrDownpayment 		= parseFloat(vlrDownpayment);
	total				= total.replace(",","");
	total 				= parseFloat(total);
	
	if (isNaN(vlrDownpayment)){
		vlrDownpayment = 0;
	}
	
	if (isNaN(total)){
		total = 0;
	}
	
	var granTotal = total + vlrDownpayment;
	$("#grand_total").val(granTotal);
	$("#grand_total").maskMoney("mask");
	
}

function setAssociated(){

	var radio 	= $("#associRequisicao:checked").val();
	
	if (typeof radio != "undefined"){
		$("#auxRadioAssociated").val(radio);
	}else{
		radio = $("#auxRadioAssociated").val();
	}
	
	if (radio == "nenhum") {
		$("#div_specify").show();
	}else{
		$("#div_specify").hide();
	}
}

function setDownPayment(){
	
	var vlrDownPayment 	= ($("#vlr_downpayment").val());
	if (vlrDownPayment != null && !isNaN(vlrDownPayment) && vlrDownPayment == 0){
		//ALTERADO 20200619 - disable comecou a causar erro. Calendario passou a nao mais carregar.
		//$("#dataDownpayment").attr('disabled', true);
		$("#dataDownpayment").val("");
		ajustarBackgroundColor('dataDownpayment','#f2f2f2');
	}else{
		$("#dataDownpayment").attr('disabled', false);
		ajustarBackgroundColor('dataDownpayment','white');
	}
	somarTotalForm();
}

function hideButtonChurch(idButton){
	
	var qtdItens 	= $("#linha_church").val();
	
	for (var i = 1; i <= qtdItens; i++) {
		var igreja = $("#requesting_church_grid___" + i).val();
		if(igreja != null){
			$("#spnRemoveChild___"+ i).hide();
		}
	}
	$("#add_church").hide();
	
}

function beforeSendValidate(){
	var activity 					= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= ((activity == 0 || activity == 4) && activity != "");
	var ATIV_STATE_LEADER			= (activity == 5);
	//var ATIV_NATIONAL_LEADER		= (activity == 19);
	var ATIV_DPT_HEADER_APPROVAL	= (activity == 25);
	var ATIV_DIVISION				= (activity == 29);
	var ATIV_VP						= (activity == 33);
	var ATIV_DPT_HEADER_FIM			= (activity == 37);
	
	
	if (ATIV_INICIAL){
		
		//confirmando se o estado foi preenchido.
		var state = $("#code_state").val();
		if(state.trim() == "" || state.trim() == "undefined" || state.trim() == null){
			throw "Please, select the state!";
		}else{
			var state 						= $("#code_state").val();
			var mailUserLogado				= $("#emailSecretary").val();
			var mailNextResponsible			= getMailRespons(mailUserLogado,state);
			
			if(mailNextResponsible.trim() == "undefined" || mailNextResponsible.trim() == ""){
				var msgThrow = "If was not possible to find the user responsible for the next Task.";
				msgThrow	 += " Please, check with the IT Team if the register on protheus is ok (table ZRL). Secretary mail: "+mailUserLogado;
				msgThrow	 += " (Check also the state leader and state for the secretary) - State "+state.trim()+".";
				throw msgThrow;
			}else{
				var nextResponsible				= getResponsible(mailNextResponsible);
				if(nextResponsible.trim() == "undefined" || nextResponsible.trim() == ""){
					var msgThrow = "If was not possible to find the user responsible on fluig for the next Task.";
					msgThrow	 += " Please, check with the IT Team if the register on fluig for the email "+mailNextResponsible.trim() + " exists.";
					throw msgThrow;
				}else{	
					$("#nextResponsible").val(nextResponsible);
				}	
			}
		}	
	}
}

function getMailRespons(mailUserLogado,state){
	
	//criamos a constraint, informando que vamos filtrar o campo mail (mail é uma coluna do dataset Colleague)
	var c1 				= DatasetFactory.createConstraint("secretary", mailUserLogado, mailUserLogado, ConstraintType.MUST);
	var c2 				= DatasetFactory.createConstraint("states", state, state, ConstraintType.MUST);
	var constraints 	= new Array(c1,c2);
	
	//aqui fazemos a consulta no dataset colleague, passando nossa constraint para que retorne somente um usuario através do email.
	var colleagueMap	= DatasetFactory.getDataset("roles", null, constraints, null);
	
	//aqui pegamos o valor retornado do dataset.
	var mailStateLeader = "";
	if(colleagueMap.values.length == 1){
		//tivemos um erro que no filtro nao existia o email passado, e a funcao retornou todos os registros do dataset, ao inves de nenhum. 
		//Por isto, reforçamos a verificacao abaixo, alem do filtro da constraints.
		if (colleagueMap.values[0]["secretary"].trim() == mailUserLogado.trim()){
			mailStateLeader = colleagueMap.values[0]["stateleader"];
		}
	}
	//return "oliveira.bruno"; //chumbando um id para testes.
	return mailStateLeader;
}

function getResponsible(mailNextRespons){
	
	//criamos a constraint, informando que vamos filtrar o campo mail (mail é uma coluna do dataset Colleague)
	var c1 				= DatasetFactory.createConstraint("mail", mailNextRespons, mailNextRespons, ConstraintType.MUST);
	var constraints 	= new Array(c1);
	
	//aqui fazemos a consulta no dataset colleague, passando nossa constraint para que retorne somente um usuario através do email.
	var colleagueMap	= DatasetFactory.getDataset("colleague", null, constraints, null);
	
	//aqui pegamos o valor retornado do dataset.
	var idUserFluig = "";
	if(colleagueMap.values.length == 1){
		//tivemos um erro que no filtro nao existia o email passado, e a funcao retornou todos os registros do dataset, ao inves de nenhum. 
		//Por isto, reforçamos a verificacao abaixo, alem do filtro da constraints.
		if (colleagueMap.values[0]["mail"].trim() == mailNextRespons.trim()){
			idUserFluig 	= colleagueMap.values[0]["colleaguePK.colleagueId"];
		}
	}
	//return "oliveira.bruno"; //chumbando um id para testes.
	return idUserFluig;
}