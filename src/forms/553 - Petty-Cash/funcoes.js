function loadform(){
		
	var activity 					= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
	var ATIV_DPT_HEADER_APPROVAL	= $("#ATIV_DPT_HEADER_APPROVAL").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_DPT_HEADER_FIM			= $("#ATIV_DPT_HEADER_FIM").val();
	
	if (activity != "" && mode!= "VIEW"){
		addMascaras();
	}
	
	if((activity == ATIV_INICIAL) || activity == "0"){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				scrollFocus('txt_solicitante');
				abreColapse('divInfoGeral');
				disableFields("collapseStateLeader");
				disableFields("collapseDptHead");
				disableFields("collapseDivision");
				disableFields("collapseVP");
				disableDptHeadZooms();
				$("#divDepartment").hide();
			},150);
		}
	}else if(activity == ATIV_STATE_LEADER){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				scrollFocus('txt_gestor');
				abreColapse('divAprovacao');
				disableFields("collapse11"); //secretaria
				disableFields("collapseDptHead");
				disableFields("collapseDivision");
				disableFields("collapseVP");
				disableSecretaryZooms();	
				disableDptHeadZooms();
				$("#divDepartment").hide();
			},150);
		}
	}else if(activity == ATIV_DPT_HEADER_APPROVAL){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				scrollFocus('rd_aprovGestor_dpt_head');
				abreColapse('divDptHead');
				disableFields("collapse11"); //secretaria
				disableFields("collapseStateLeader");
				disableFields("collapseDivision");
				disableFields("collapseVP");
				disableSecretaryZooms();	
				disableDptHeadZooms();
				$("#divDepartment").hide();
			},150);
		}
	}else if(activity == ATIV_DIVISION){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				scrollFocus('rd_aprovGestor_division');
				abreColapse('divDivision');
				disableFields("collapse11"); //secretaria
				disableFields("collapseStateLeader");
				disableFields("collapseDptHead");
				disableFields("collapseVP");
				disableSecretaryZooms();	
				disableDptHeadZooms();
				$("#divDepartment").hide();
			},150);
		}
	}else if(activity == ATIV_VP){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				scrollFocus('rd_aprovGestor_vp');
				abreColapse('divVP');
				disableFields("collapse11"); //secretaria
				disableFields("collapseStateLeader");
				disableFields("collapseDivision");
				disableFields("collapseDptHead");
				disableSecretaryZooms();	
				disableDptHeadZooms();
				$("#divDepartment").hide();
			},150);
		}
	}else if(activity == ATIV_DPT_HEADER_FIM){
		reloadZoomFilterValues("zoom_igreja", "States," +  $('#code_state').val()); //filtro de Church por State no campo
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				scrollFocus('classes');
				abreColapse('divDptHead');
				disableFields("collapse11"); //secretaria
				disableFields("collapseStateLeader");
				disableFields("divDpt");
				disableSecretaryZooms();	
			},150);
		}
	}
	
}

function setSelectedZoomItem(selectedItem) {
	var inputId 					= selectedItem.inputId;
	var activity					= $("#atividade").val();
	var array 						= [];
	var zoomName 					= "";
	var idFilho 					= "";
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
	var ATIV_DPT_HEADER_APPROVAL	= $("#ATIV_DPT_HEADER_APPROVAL").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_DPT_HEADER_FIM			= $("#ATIV_DPT_HEADER_FIM").val();
	
	if(inputId == undefined  ){
		var info = selectedItem.type.split("___");
		
		//verificando se estamos em um pai filho
		if(info.length > 1){
			zoomName = info[0];
		}else{
			zoomName = selectedItem.type;
		}
	}else{
		array 						= inputId.split("___");
		zoomName 					= array.shift();
		idFilho 					= array.pop();
	}
	
	if((activity == ATIV_INICIAL) || activity == "0"){
		if (zoomName == "zoom_igreja") {
			var selectEndereco 	= selectedItem.address;
			var selectEstado 	= selectedItem.States;
			var selectBalance 	= selectedItem.Balance.replace(",","").trim();;
			$("#txt_endereco").val(selectEndereco);
			$("#txt_estado").val(selectEstado);
			
			$("#label_hq").text(selectEndereco);
			$("#label_hq").css("font-weight","Bold");
			
			selectBalance = parseFloat(selectBalance);
			var vlr_amount_authorized 	= formatarMoeda(selectBalance);
			$("#label_amount_authorized").text(vlr_amount_authorized);
			//setando a label como bold
			$("#label_amount_authorized").css("font-weight","Bold");
			
			$("#amount_authorized").val(vlr_amount_authorized);
			$("#label_currrently_petty_cash").text(vlr_amount_authorized);
			
		}else if (zoomName == "zoom_supplier") {
			//$("#zoom_supplier").val(selectedItem.code);
			$("#txt_supplier").val(selectedItem.code);
			$("#txt_unit").val(selectedItem.unit);
			$("#txt_description").val(selectedItem.name);
		 }
	}else if(activity == ATIV_DPT_HEADER_FIM){
		if (zoomName == "zoom_department") {
			var selectCodeDpt			= selectedItem.code;
			var selectDescriptionDpt	= selectedItem.descri;
			$("#txt_department_code").val(selectCodeDpt);
			$("#txt_department_description").val(selectDescriptionDpt);
		}else if (zoomName == "classes") {
			var selectCodeClasses	= selectedItem.code;
			$("#gl_code").val(selectCodeClasses);
		}	
		
	}

}

function removedZoomItem(removedItem) {
	var activity					= $("#atividade").val();
	var inputId 					= removedItem.inputId;
	var array 						= inputId.split("___");
	var zoomName 					= array.shift();
	var idFilho 					= array.pop();
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
	var ATIV_DPT_HEADER_APPROVAL	= $("#ATIV_DPT_HEADER_APPROVAL").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_DPT_HEADER_FIM			= $("#ATIV_DPT_HEADER_FIM").val();
		
	if((activity == ATIV_INICIAL) || activity == "0"){
		if (zoomName == "zoom_igreja") { //Limpa campos
			$("#txt_endereco").val("");
			$("#txt_estado").val("");
			$("#label_hq").text("HQ");
			//$("#label_hq").css("font-weight","Bold");
			$("#label_amount_authorized").text("0.0");
			$("#label_currrently_petty_cash").text("0.0");
			$("#amount_authorized").val("0.0");
			$("#current_balance").val(0);
			somar();
		}else if (zoomName == "zoom_supplier") { //Limpa campos
			$("#txt_supplier").val("");
			$("#txt_unit").val("");
			$("#txt_description").val("");
		}
	}else if(activity == ATIV_DPT_HEADER_FIM){
		if (zoomName == "zoom_department") {
			$("#txt_department_code").val("");
			$("#txt_department_description").val("");
		}else if (zoomName == "classes") {
			$("#gl_code").val("");
		}	
	}
	
}

function scrollFocus(input){
	$('html,body').animate({scrollTop: $('#'+input).offset().top}, 500, function() {
    	$('#'+input).focus();
	});
}
function abreColapse(idDiv) {
	$('#' + idDiv + ' .collapse').collapse('show');
}

function ajustarBackgroundColor(campo, color){
	$('#'+campo).attr('style', 'background-color: '+color+' !important');
}

function customWdkAddChild(idtable) {
	var activity 					= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
	var ATIV_DPT_HEADER_APPROVAL	= $("#ATIV_DPT_HEADER_APPROVAL").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_DPT_HEADER_FIM			= $("#ATIV_DPT_HEADER_FIM").val();
	
	if (activity != "")
	{	
		if((activity == ATIV_INICIAL || activity == "0") && mode != "VIEW"){
			var id = wdkAddChild(idtable);
			setDateItem()
			$("#item_debit___"+id).maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
			$("#item_balance___"+id).maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
			$('#linha_produto').val(id);
			somar();
		} else {
			msg4ever("You can't add table information in this activity", "danger");
		}
	}
}

function setDateItem(){
	$("input[id^='item_date___']").each(function(index) {
	    var idCampo = $(this).attr("id");
	    FLUIGC.calendar('#' + idCampo,{
			language: 'en'
		});
	});
	
}

function fnCustomDelete(obj){
	
	var activity 					= $("#atividade").val(); 
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
	var ATIV_DPT_HEADER_APPROVAL	= $("#ATIV_DPT_HEADER_APPROVAL").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_DPT_HEADER_FIM			= $("#ATIV_DPT_HEADER_FIM").val();
	
	if (activity != "")
	{	
		if (mode != "VIEW"){
			var id = obj.id.split("___")[0];	
			if((activity == ATIV_INICIAL) || activity == "0" ){
				if (id == "spnRemoveChild" ){
					fnWdkRemoveChild(obj);
					somar();
				}
			}
		}
	}
}

function addMascaras() {
	$("#current_amount_petty_cash").maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	$("#txt_total").maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	ajustarBackgroundColor('zoom_supplier','white');
}

function msg4ever(errorMsg, urgencia) {

	if (errorMsg != "") {
		if (urgencia == "success") {
			FLUIGC.toast({
				message: errorMsg,
				type: 'success'
			});
		}

		if (urgencia == "danger") {
			FLUIGC.toast({
				message: errorMsg,
				type: 'danger'
			});
		}
	}
}

/*
 * Funcao criada manualmente para desabilitar os campos zoom, pois na funcao disableFields os campos zoom vem sem id, o que impossoibilita fazer o disable.
 * Obs.: os campos entram com o type "search" e sem id.
 */
function disableDptHeadZooms(){
	var zooms 		= [];
	
	zooms.push("classes");
	zooms.push("zoom_department");
	
	for(i = 0; i < zooms.length; i++) {
		window[zooms[i]].disable(true);
	}
	
}

function disableSecretaryZooms(){
	var zooms 		= [];
	
	zooms.push("zoom_supplier");
	zooms.push("zoom_igreja");
	
	for(i = 0; i < zooms.length; i++) {
		window[zooms[i]].disable(true);
		//window[zooms[i]].disabled = true;
	}
	
}

function somar() {
	
	var qtdLinhas	= linha_produto.value;
	var debit		= 0;
	var soma		= 0;
	var saldoTotal	= $("#current_balance").val();
	
	for (var i = 1; i <= qtdLinhas; i++) {
		debit = $("#item_debit___" + i).val();
		if(debit!= null){
			debit = parseFloat(limpar(debit), 10);
			
			//calculando o valor do total final.
			soma += debit;
			
			//verificando o saldo restante para a linha.
			saldoTotal -= debit;
			
			//setando o saldo após a subtracao na linha do item.
			$("#item_balance___" + i).val(saldoTotal);
			$("#item_balance___" + i).maskMoney("mask");
		}
	}
	
	$("#txt_total").val(soma);
	$("#txt_total").maskMoney("mask");
}

//Remove pontos, vírgulas, espaços e marcadores de moeda.
function limpar(x) {
	var resultado = x.replace(/\,/g, "").replace(" ", "");
	console.log(resultado);
	console.log(isNaN(resultado));
	if (!isNaN(resultado) && resultado != "" && resultado != null && resultado != undefined) {
		return resultado;
	} else {
		return 0;
	}
}

function setBalance(){
	
	var maximumMoney 	= getNumber($("#amount_authorized").val());
	var debit 			= getNumber($("#current_amount_petty_cash").val());
	var balance			= 0;
	if(maximumMoney == 0 ){
		alert("Please, select a church and check the balance for this church.");
		$("#current_amount_petty_cash").val("0.00");
		$("#current_amount_petty_cash").maskMoney("mask");
		scrollFocus('zoom_igreja');
	}else{
		if(debit >= maximumMoney){
			$("#current_amount_petty_cash").val(0);
			$("#current_amount_petty_cash").maskMoney("mask");
			var msgVld	= "";
			if(debit == maximumMoney){
				msgVld 	=  "You already have the maximum authorized ("+formatarMoeda(maximumMoney)+"). Operation not authorized! "
			}else{
				msgVld 	=  "You can not exceed more than the maximum authorized.\n"
				msgVld		+= "Your Maximum Authorized: "+formatarMoeda(maximumMoney)+".\n" 
				msgVld		+= "Petty cash amount you digit: "+ formatarMoeda(debit)
			}
			alert(msgVld);
			scrollFocus('current_amount_petty_cash');
			$("#current_balance").val(0);
			somar();
		}else{
			balance = (maximumMoney - debit);
			$("#current_balance").val(balance);
			somar();
		}
	}
	
}

function formatarMoeda(numero) {

	if (isNaN(numero)) return "0.0";

	// Descobre se o valor é negativo e extrai o sinal.
	var negativo = numero < 0;
	numero = Math.abs(numero);

	// Usado para produzir a resposta, caractere por caractere.
	var resposta = "";

	// Converte o número para string.
	var numero 	= numero.toString();
	
	//procurando pelo ponto, para verificar os decimais.
	var ponto 	= numero.indexOf(".");
	if (ponto < 0){
		numero += ".00";
	}else{
		var posPonto	= numero.substr(ponto+1,numero.length);
		while(posPonto.length < 2){
			numero 		+= "0";
			ponto 		= numero.indexOf(".");
			posPonto	= numero.substr(ponto+1,numero.length);
		}
	}
	
	return numero;
}

function getNumber(number){
	
	//tirando as virgulas, ou o valor é interpretado como NaN
	if(typeof(number) == "string"){
		//tirando as virgulas para nao atrapalhar na conversao para float
		while(number.indexOf(",") >= 0){
			number = number.replace(",","");
		}
	}
	
	if(typeof(number) == "undefined" || number == null || isNaN(number) || number == ""){
		number = 0;
	}
	
	number = parseFloat(number);
	
	return number;
}

function zoomSupplier(obj){
	
	var nome = $(obj).prev("input").attr("name");
	//var filtro = "teste";
	
	tdizoom.open("supplier", //dataset Id
			"code,Code,unit,Unit,name,Name", //nome da coluna do dataset virgula (,) seu nome de exibição 
			"code,unit,name", //coluna de retorno
			"Pastor", //titulo do dataset
			"", //filtro do dataset utilizando campo virgula (,) valor ex: colleagueName,Fernando
			nome); // identificador do zoom
	
	/*
	tdizoom.open("supplier", //dataset Id
			"code,Code,unit,Unit,name,Name", //nome da coluna do dataset virgula (,) seu nome de exibição 
			"code,unit,name", //coluna de retorno
			"Pastor", //titulo do dataset
			"code,"+filtro, //filtro do dataset utilizando campo virgula (,) valor ex: colleagueName,Fernando
			nome); // identificador do zoom
	*/
}

function beforeSendValidate(){
	var activity 					= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
	var ATIV_DPT_HEADER_APPROVAL	= $("#ATIV_DPT_HEADER_APPROVAL").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_DPT_HEADER_FIM			= $("#ATIV_DPT_HEADER_FIM").val();
	
	
	if (activity == ATIV_INICIAL || activity == "0"){
	//if (activity == ATIV_COMMERCIAL_APPROVAL){
		
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

/*-- Alterado Thiago Oliveira FIM --*/