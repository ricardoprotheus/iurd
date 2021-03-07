function loadform(){
		
	var activity 					= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
	var ATIV_NATIONAL_LEADER		= $("#ATIV_NATIONAL_LEADER").val();
	var ATIV_DPT_HEAD				= $("#ATIV_DPT_HEAD").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_DPT_HEADER_FIM			= $("#ATIV_DPT_HEADER_FIM").val();
	var tipoFormulario				= $("#txt_tipoRequisicao:checked").val();
	
	if (activity != "" && mode!= "VIEW"){
		addMascaras();
		carregarData();
	}
	
	selectFees("");
	selectDeposit();
	selectLeaseType();
	selectOrigProcess("js");
	cancelOriginal();
	
	if((activity == ATIV_INICIAL) || activity == "0"){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				scrollFocus('txt_solicitante');
				abreColapse('divInfoGeral');
				disableFields("collapseStateLeader");
				disableFields("collapseNational");
				disableFields("collapseDptHead");
				disableFields("collapseDivision");
				disableFields("collapseVP");
				//disableDptHeadZooms();
				//$("#divDepartment").hide();
			},150);
		}
	}else if(activity == ATIV_STATE_LEADER){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				scrollFocus('rd_aprovacaoGestor');
				abreColapse('divStateLeader');
				disableFields("collapse11"); //secretaria
				disableFields("collapseNational");
				disableFields("collapseDptHead");
				disableFields("collapseDivision");
				disableFields("collapseVP");
				//disableSecretary();	
				//disableDptHeadZooms();
				//$("#divDepartment").hide();
			},150);
		}
	}else if(ATIV_NATIONAL_LEADER.includes(activity)){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				scrollFocus('rd_aprovGestor_national_leader');
				abreColapse('divNationalLeader');
				disableFields("collapse11"); //secretaria
				disableFields("collapseStateLeader");
				disableFields("collapseDptHead");
				disableFields("collapseDivision");
				disableFields("collapseVP");
				//disableSecretary();	
				//disableDptHeadZooms();
				
			},150);
		}
	}else if(activity == ATIV_DPT_HEAD){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				scrollFocus('txt_gestor_dpt_head');
				abreColapse('divDptHead');
				disableFields("collapse11"); //secretaria
				disableFields("collapseStateLeader");
				disableFields("collapseNational");
				disableFields("collapseDivision");
				disableFields("collapseVP");
				//disableSecretary();	
				//disableDptHeadZooms();
				disableFields("divDepartment");
				//$("#divDepartment").hide();
				
			},150);
		}
	}else if(ATIV_DIVISION.includes(activity)){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				abreColapse('divDivision');
				scrollFocus('rd_aprovGestor_division');
				disableFields("collapse11"); //secretaria
				disableFields("collapseStateLeader");
				disableFields("collapseDptHead");
				disableFields("collapseNational");
				disableFields("collapseVP");
				//disableSecretary();	
				//disableDptHeadZooms();
			},150);
		}
	}else if(ATIV_VP.includes(activity)){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				abreColapse('divVP');
				scrollFocus('rd_aprovGestor_vp');
				disableFields("collapse11"); //secretaria
				disableFields("collapseStateLeader");
				disableFields("collapseDptHead");
				disableFields("collapseDivision");
				disableFields("collapseNational");
				//disableSecretary();	
				//disableDptHeadZooms();
			},150);
		}
	}else if(activity == ATIV_DPT_HEADER_FIM){
		reloadZoomFilterValues("zoom_igreja", "States," +  $('#code_state').val()); //filtro de Church por State no campo
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				abreColapse('divDptHead');
				disableFields("collapse11"); //secretaria
				disableFields("collapseStateLeader");
				disableFields("collapseNational");
				disableFields("collapseDivision");
				disableFields("collapseVP");
				//disableSecretary();	
				if((tipoFormulario) == "tranfer" || (tipoFormulario) == "renovacao"){
					disableFields("divDptHeadApproval");
					scrollFocus('classes');
				}else{
					scrollFocus('txt_gestor_dpt_head');
				}	
				//$("#divDepartment").hide();
			},150);
		}
	}
	
}

function setSelectedZoomItem(selectedItem) {
	var inputId 					= selectedItem.inputId;
	//var array 						= inputId.split("___");
	//var zoomName 					= array.shift();
	//var idFilho 					= array.pop();
	var array 						= [];
	var zoomName 					= "";
	var idFilho 					= "";
	var activity					= $("#atividade").val();
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
	var ATIV_NATIONAL_LEADER		= $("#ATIV_NATIONAL_LEADER").val();
	var ATIV_DPT_HEAD				= $("#ATIV_DPT_HEAD").val();
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
		 if (zoomName == "zoom_state") {
			var selectDescription = selectedItem.description;
			var selectCode = selectedItem.code;
			$("#zoom_state").val(selectCode);
			$("#name_state").val(selectDescription);
		}else if (zoomName == "zoom_supplier") {
			$("#txt_supplier").val(selectedItem.code);
			$("#txt_unit").val(selectedItem.unit);
			$("#txt_description").val(selectedItem.name);
		}else if (zoomName == "fluig_process_zoom"){
			var valueFormatado	= selectedItem.Value.replace(",","").trim();
			$("#rental_orig_process_value").val(valueFormatado);
			$("#aux_rent_orig_proc_val").val(valueFormatado);
			$("#rental_orig_process_value").maskMoney("mask");
			
			sumDifference();
		}
	}else if(activity == ATIV_DPT_HEADER_FIM){
		if (zoomName == "zoom_igreja") {
			var selectEndereco = selectedItem.address;
			var selectEstado = selectedItem.States;
			$("#txt_endereco").val(selectEndereco);
			$("#txt_estado").val(selectEstado);
		}else if (zoomName == "zoom_department") {
			var selectCodeDpt			= selectedItem.code;
			var selectDescriptionDpt	= selectedItem.descri;
			$("#txt_department_code").val(selectCodeDpt);
			$("#txt_department_description").val(selectDescriptionDpt);
		}else if (zoomName == "classes") {
			var selectCodeClasses		= selectedItem.code;
			var selectDescriptionClasses= selectedItem.descri;
			$("#gl_code").val(selectCodeClasses);
			$("#gl_description").val(selectDescriptionClasses);
		}
	}

}

function removedZoomItem(removedItem) {
	var activity					= $("#atividade").val();
	var inputId 					= removedItem.inputId;
	//var array 						= inputId.split("___");
	//var zoomName 					= array.shift();
	//var idFilho 					= array.pop();
	var array 						= [];
	var zoomName 					= "";
	var idFilho 					= "";
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
	var ATIV_NATIONAL_LEADER		= $("#ATIV_NATIONAL_LEADER").val();
	var ATIV_DPT_HEAD				= $("#ATIV_DPT_HEAD").val();
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
		if (zoomName == "zoom_state") {
			$("#name_state").val("");
		}else if (zoomName == "zoom_supplier") {
			$("#txt_supplier").val("");
			$("#txt_unit").val("");
			$("#txt_description").val("");
		}else if (zoomName == "fluig_process_zoom"){
			$("#rental_orig_process_value").val("0.00");
			$("#aux_rent_orig_proc_val").val("");
		}
	}else if(activity == ATIV_DPT_HEADER_FIM){
		if (zoomName == "zoom_igreja") { //Limpa campos
			$("#txt_endereco").val("");
			$("#txt_estado").val("");
		}else if (zoomName == "zoom_department") {
			$("#txt_department_code").val("");
			$("#txt_department_description").val("");
		}else if (zoomName == "classes") {
			$("#gl_code").val("");
			$("#gl_description").val("");
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

function setDateItem(){
	$("input[id^='item_date___']").each(function(index) {
	    var idCampo = $(this).attr("id");
	    FLUIGC.calendar('#' + idCampo,{
			language: 'en'
		});
	});
}

function addMascaras() {
	$("#application_fee_value").maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	$("#administrative_fee_value").maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	$("#amenity_fee_value").maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	$("#rent_value").maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	$("#deposit_value").maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	$("#grand_total").maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	$("#bedroom_qtd").mask('##000', {reverse: true});
	$("#original_fluig_process").mask('##000', {reverse: true});
	$("#rental_orig_process_value").maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	$("#rental_difference").maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	ajustarBackgroundColor('zoom_state','white');
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

function disableSecretary(){
	disableSecretaryZooms();
	//disableSecretaryCalendar();
}

function disableSecretaryZooms(){
	var zooms 		= [];
	zooms.push("zoom_supplier");
	zooms.push("zoom_state");
	zooms.push("zoom_igreja");
	zooms.push("fluig_process_zoom");
	
	
	for(i = 0; i < zooms.length; i++) {
		window[zooms[i]].disable(true);
		//window[zooms[i]].disabled = true;
	}
	
}

function disableSecretaryCalendar(){
	
	var calendars 	= [];
	
	calendars.push("start_lease_date");
	calendars.push("end_lease_date");
	
	for(i = 0; i < calendars.length; i++) {
		document.getElementById(calendars[i]).style.pointerEvents = 'none';
	}
	
}

//Remove pontos, vírgulas, espaços e marcadores de moeda.
function limpar(x) {
	//var resultado = x.replace(/\,/g, "").replace(/\./g, "").replace(" ", "");
	var resultado = x.replace(/\,/g, "").replace(" ", "");
	console.log(resultado);
	console.log(isNaN(resultado));
	if (!isNaN(resultado) && resultado != "" && resultado != null && resultado != undefined) {
		return resultado;
	} else {
		return 0;
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

function selectFees(fieldChecked){
	
	var feeAplication 				= document.getElementById('fee_application');
	var feeAdministrative			= document.getElementById('fee_administrative');
	var feeAmenity 					= document.getElementById('fee_amenity');
	var feeNone 					= document.getElementById('fee_none');
	var activity 					= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
	var ATIV_NATIONAL_LEADER		= $("#ATIV_NATIONAL_LEADER").val();
	var ATIV_DPT_HEAD				= $("#ATIV_DPT_HEAD").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_DPT_HEADER_FIM			= $("#ATIV_DPT_HEADER_FIM").val();
	var isInitial					= (((activity == ATIV_INICIAL) || activity == "0") && (mode == "MOD" || mode == "ADD"));
	
	//tratativa para verificar se as fees estao ok. Por alguma razao, quando saímos da tarefa da secretaria, as fees estao ficando com os valores incorretos.
	//checkFieldsFees();
	
	//if (fieldChecked == 'fee_none' || fieldChecked == ""){
	if (fieldChecked == 'fee_none'){
		if (feeNone.checked || isInitial){
			feeAplication.checked = false;
			feeAdministrative.checked = false;
			feeAmenity.checked = false;
			//$("#div_fees").hide();
			//$("#row_fee_date").hide();
		}
	}else{
		
		//tiramos o check do fee_none em caso de algum tipo de fee selecionada.
		if(fieldChecked!=""){
			if (feeNone.checked){
				feeNone.checked = false;
			}
		}
		
		$("#div_fees").show();
		if(feeAplication.checked){
			$("#div_fee_application").show();
			//$("#row_fee_date").show();
		}else{
			$("#div_fee_application").hide();
		}
		
		if(feeAdministrative.checked){
			$("#div_fee_administrative").show();
			//$("#row_fee_date").show();
		}else{
			$("#div_fee_administrative").hide();
		}
		
		if(feeAmenity.checked){
			$("#div_amenity_fee").show();
			//$("#row_fee_date").show();
		}else{
			$("#div_amenity_fee").hide();
		}
	}	
	
	if(feeAmenity.checked || feeAplication.checked || feeAdministrative.checked){
		//$("#row_fee_date").show();
		$("#div_fee_date").show();
	}else{
		//$("#row_fee_date").hide();
		$("#div_fees").hide();
		$("#div_fee_date").hide();
	}
	
	
	if(fieldChecked != ""){
		sumTotal();
	}
}

function carregarData(){
	var dataAtual = new Date();
	var mySimpleCalendar = FLUIGC.calendar('#start_lease_date',{
		language: 'en'
	});
	mySimpleCalendar.setMinDate(dataAtual);
	var mySimpleCalendar2 = FLUIGC.calendar('#end_lease_date',{
		language: 'en'
	});
	mySimpleCalendar2.setMinDate(dataAtual);
	
	var mySimpleCalendar3 = FLUIGC.calendar('#deposit_date',{
		language: 'en'
	});
	mySimpleCalendar3.setMinDate(dataAtual);
	
	var mySimpleCalendar4 = FLUIGC.calendar('#date_cancel_financial',{
		language: 'en'
	});
	mySimpleCalendar4.setMinDate(dataAtual);	
	
	var mySimpleCalendar5 = FLUIGC.calendar('#due_date_fee',{
		language: 'en'
	});
	mySimpleCalendar5.setMinDate(dataAtual);	
	
	/*
	var mySimpleCalendar6 = FLUIGC.calendar('#termination_lease_date',{
		language: 'en'
	});
	mySimpleCalendar6.setMinDate(dataAtual);
	*/	
}

function sumTotal(){
	
	var feeAplication 		= document.getElementById('fee_application');
	var feeAdministrative	= document.getElementById('fee_administrative');
	var feeAmenity 			= document.getElementById('fee_amenity');
	//var feeNone 			= document.getElementById('fee_none');
	var applicationFee 		= 0;
	var administrationFee 	= 0;
	var amenity_fee_value 	= 0;
	var qtdInstallments		= parseInt($("#qtd_installments").val());
	var rentValue			= getNumber($("#rent_value").val());
	var depositValue		= 0;
	var radio 				= $("#rd_deposit:checked").val();
	
	//verificando se temos o rateio do deposit
	if (radio == "sim") {
		var qtdItens 		= $("#linha_deposit").val();
		var valueDeposGrid 	= 0; 
		
		for (var i = 1; i <= qtdItens; i++) {
			valueDeposGrid = $("#grid_deposit_value___" + i).val();
			if(valueDeposGrid != null){
				depositValue += getNumber(valueDeposGrid);
			}
		} 
	}else{ 
		depositValue		= getNumber($("#deposit_value").val());
	}
	
	if (feeAplication.checked){
		applicationFee 		= getNumber($("#application_fee_value").val());
	}
	if (feeAdministrative.checked){
		administrationFee 	= getNumber($("#administrative_fee_value").val());
	}
	if (feeAmenity.checked){
		amenity_fee_value 	= getNumber($("#amenity_fee_value").val());
	}
	
	if(typeof(qtdInstallments) == "undefined" || qtdInstallments == null || isNaN(qtdInstallments) || qtdInstallments == ""){
		qtdInstallments = 0;
	}
	
	var total = applicationFee + administrationFee + amenity_fee_value + depositValue + (rentValue * qtdInstallments);
	
	$("#grand_total").val(total);
	$("#grand_total").maskMoney("mask");
	
	//verificando a diferença entre rentals.
	sumDifference();
	
}
function setInstallment(){
	var startDate	= $("#start_lease_date").val();
	var endDate		= $("#end_lease_date").val();
	
	if((startDate != null && startDate != "") && (endDate != null && endDate != "")){
		startDate 		= new Date(startDate);
		endDate			= new Date(endDate);
		
		var anoInicial	= startDate.getFullYear();
		var mesInicial 	= startDate.getMonth();
		var anoFinal	= endDate.getFullYear();
		var mesFinal 	= endDate.getMonth(); 	
		var qtdMeses	= (mesFinal - mesInicial) + 1;
		var qtdAnos		= anoFinal - anoInicial;
		
		var qtdParcelas = qtdMeses + (qtdAnos * 12);
		
		$("#qtd_installments").val(qtdParcelas);
		$("#due_date").val("Every Day "+startDate.getDate());
	}
	
	//recalculando o total.
	sumTotal();
	
}


function checkFieldsFees(){
	
	var ATIV_INICIAL		= $("#ATIV_INICIAL").val();
	var feeAplication 		= document.getElementById('fee_application');
	var feeAdministrative	= document.getElementById('fee_administrative');
	var feeAmenity 			= document.getElementById('fee_amenity');
	var feeNone 			= document.getElementById('fee_none');
	
	if((activity == ATIV_INICIAL) || activity == "0"){
		if(mode == "MOD" || mode == "ADD"){
			
		}
	}else{
		if(mode == "MOD" || mode == "ADD"){
			$("#aux_fee_application").val(feeAplication.checked);
			$("#aux_feeAdministrative").val(feeAdministrative.checked);
			$("#aux_feeAmenity").val(feeAmenity.checked);
			$("#aux_feeNone").val(feeNone.checked);
		}
	}
}

function selectDeposit(){
	var state 						= $("#atividade").val();
	var ATIV_INICIAL				= (state == 0 || state == 4);
	var radio 						= $("#rd_deposit:checked").val();
	
	var radioTpReq = $("#auxtipoRequisicao").val();
	
	if (typeof radio != "undefined"){
		$("#auxDepositGrid").val(radio);
	}else{
		radio = $("#auxDepositGrid").val();
	}
	
	if(radioTpReq == "recisaoAntecip"){
		$("#row_deposit_question").hide();
		$("#div_single_deposit").hide();
		$("#div_table_deposit").hide();
	}else{
		$("#row_deposit_question").show();	
		if (radio == "sim") {
			$("#div_table_deposit").show();
			$("#div_single_deposit").hide();
		} else {
			$("#div_table_deposit").hide();
			$("#div_single_deposit").show();
		}
	}
	sumTotal();
	
}


function addFilho(idtable){
	
	var activity 					= $("#atividade").val() 
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
	var ATIV_NATIONAL_LEADER		= $("#ATIV_NATIONAL_LEADER").val();
	var ATIV_DPT_HEAD				= $("#ATIV_DPT_HEAD").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_DPT_HEADER_FIM			= $("#ATIV_DPT_HEADER_FIM").val();
	
	if (activity != ""){
		if((activity == ATIV_INICIAL) || activity == "0"){
			var linha = wdkAddChild(idtable);
			if (idtable == "table_deposit"){
				//adicionando a quantidade de produtos do grid - gravamos sempre a ultima linha.
			    $('#linha_deposit').val(linha);
			    
			    $("#grid_deposit_value___"+linha).maskMoney({allowZero:false, allowNegative: false, thousands:',', decimal:'.'});
			    var dataAtual = new Date();
				var mySimpleCalendar = FLUIGC.calendar('#grid_deposit_date___'+linha,{
					language: 'en'
				});
				mySimpleCalendar.setMinDate(dataAtual);
			}		
		}
	}
} 

function fnCustomDelete(obj){
	
	var activity 					= $("#atividade").val() 
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
	var ATIV_NATIONAL_LEADER		= $("#ATIV_NATIONAL_LEADER").val();
	var ATIV_DPT_HEAD				= $("#ATIV_DPT_HEAD").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_DPT_HEADER_FIM			= $("#ATIV_DPT_HEADER_FIM").val();
	
	
	if (activity != ""){
		if((activity == ATIV_INICIAL) || activity == "0"){
			var id = obj.id.split("___")[0];
			
			if (id == "spnRemoveChildDeposit"){
				fnWdkRemoveChild(obj);
				sumTotal();
			}	
		}
	}
}

function selectLeaseType() {
	
	var radio = $("#txt_tipoRequisicao:checked").val();
	
	if (typeof radio != "undefined"){
		$("#auxtipoRequisicao").val(radio);
	}else{
		radio = $("#auxtipoRequisicao").val();
	}
	
	if (typeof $("#rental_orig_process_value").val() == "undefined" || $("#rental_orig_process_value").val() == null || $("#rental_orig_process_value").val() == ""){
		if($("#aux_rent_orig_proc_val").val() != null){
			$("#rental_orig_process_value").val($("#aux_rent_orig_proc_val").val());
		}
	}
	
	if (radio == "novo" || radio == "" || radio == null) {
		$("#row_fluig_process").hide();
		$("#col_rental_difference").hide();
		$("#row_cancel_original").hide();
		$("#rental_difference").val("0.00");
		$("#rental_orig_process_value").val("0.00");
		$("#aux_rent_orig_proc_val").val("");
		$("#row_lease_dates").show();
		$("#row_lease_terms").show();
		$("#row_rental_payments").show();
		//$("#row_lease_termination").hide();
		disableValueFields(false);
	}else if(radio == "recisaoAntecip"){
		disableValueFields(true);
		$("#row_fluig_process").show();
		$("#col_rental_difference").hide();
		$("#row_cancel_original").show();
		$("#rental_difference").val("0.00");
		$("#rd_deposit:checked").prop('checked', false);
		
		$("#row_lease_dates").hide();
		$("#row_lease_terms").hide();
		$("#row_rental_payments").hide();
		//$("#row_lease_termination").show();
		$("#column_original_value").hide();
	} else {
		$("#row_fluig_process").show();
		$("#col_rental_difference").show();
		disableValueFields(false);
		$("#row_cancel_original").show();
		$("#row_lease_dates").show();
		$("#row_lease_terms").show();
		$("#row_rental_payments").show();
		//$("#row_lease_termination").hide();
		$("#column_original_value").show();
	}
	
	sumDifference();
	selectDeposit();
	selectOrigProcess("js");

}

function selectOrigProcess(cClique){
	
	var radio 				= $("#rd_orig_proc_gener_fluig:checked").val();
	var textoLabelOriginal	= "";
	
	if (typeof radio != "undefined"){
		$("#auxRdOrigProcGenerFluig").val(radio);
	}else{
		radio = $("#auxRdOrigProcGenerFluig").val();
	}
	
	if (radio == "nao" || radio == "" || radio == null) {
		$("#fluig_orig_input").show();
		$("#fluig_orig_zoom").hide();
		$("#rental_orig_process_value").attr('disabled', false);
		if(cClique != "js"){
			$("#rental_orig_process_value").val("0.00");
			$("#aux_rent_orig_proc_val").val("");
		}
		$("#row_cancel_original").hide();
		textoLabelOriginal	= "Webforms Process";
	} else {
		$("#fluig_orig_input").hide();
		$("#fluig_orig_zoom").show();
		$("#rental_orig_process_value").attr('disabled', true);
		if(cClique != "js"){
			$("#rental_orig_process_value").val("0.00");
			$("#aux_rent_orig_proc_val").val("");
		}	
		$("#row_cancel_original").show();
		textoLabelOriginal	= "Fluig Process";
	}
	
	$("#label_original").text(textoLabelOriginal);
}

function sumDifference(){
	
	var rentalOriginal 	= getNumber($("#rental_orig_process_value").val());
	var newRental		= getNumber($("#rent_value").val());
	var difference		= newRental - rentalOriginal;
	
	$("#rental_difference").val(difference);
	$("#rental_difference").maskMoney("mask");
	
	setNextAtiv();
	
}

function setNextAtiv(){
	var radioTypeForm 		= $("#auxtipoRequisicao").val();
	var difRental			= getNumber($("#rental_difference").val());
	var nextAtiv			= "";
	var feeNone				= document.getElementById('fee_none');
	
	if (radioTypeForm == "novo"){
		nextAtiv	= "22"; //NATIONAL LEADER - NEW
	}else if(radioTypeForm == "tranfer" || radioTypeForm == "renovacao"){
		if(difRental > 1000){
			nextAtiv	= "41"; //NATIONAL LEADER - TRANSFER/RENEW
		}else{
			nextAtiv	= "45"; //DPT HEAD - TRANSFER/RENEW
		}
	}else if(radioTypeForm == "recisaoAntecip"){
		if(feeNone.checked){
			nextAtiv	= "64"; //DIVISION - TERMINATION/NON RENEWAL
		}else{
			nextAtiv	= "62"; //NATIONAL LEADER - TERMINATION/NON RENEWAL
		}
	}
	
	
	$("#NEXT_ATIV").val(nextAtiv);
	
}

function disableValueFields(disable){
	
	if(disable){
		$("#row_deposit_question").hide();
		$("#div_single_deposit").hide();
		$("#div_table_deposit").hide();
		$("#auxDepositGrid").val("nao");
		$("#rental_orig_process_value").val("0.00");
		$("#aux_rent_orig_proc_val").val("");
		$("#rent_value").val("0.00");
		$("#deposit_value").val("0.00");
		$("#qtd_installments").val("");
		$("#due_date").val("");
	}else{
		$("#row_deposit_question").show();
		$("#div_single_deposit").show();
		$("#div_table_deposit").show();
	}
	
	$("#rental_orig_process_value").attr('disabled', disable);
	$("#rent_value").attr('disabled', disable);
	$("#rd_deposit").attr('disabled', disable);
	$("#deposit_value").attr('disabled', disable);
	$("#deposit_date").attr('disabled', disable);
	$("#start_lease_date").attr('disabled', disable);
	$("#end_lease_date").attr('disabled', disable);
	
}

function cancelOriginal(obj){
	
	var radio = $("#rd_cancel_original:checked").val();
	
	if (typeof radio != "undefined"){
		$("#auxCancelOriginal").val(radio);
	}else{
		radio = $("#auxCancelOriginal").val();
	}
	
	if (radio == "nao" || radio == "" || radio == null) {
		$("#date_cancel_financial").attr('disabled', true);
		ajustarBackgroundColor('date_cancel_financial','#f2f2f2');
	}else{
		$("#date_cancel_financial").attr('disabled', false);
		ajustarBackgroundColor('date_cancel_financial','white');
	}
}

function beforeSendValidate(){
	var activity 					= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
	var ATIV_NATIONAL_LEADER		= $("#ATIV_NATIONAL_LEADER").val();
	var ATIV_DPT_HEAD				= $("#ATIV_DPT_HEAD").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_DPT_HEADER_FIM			= $("#ATIV_DPT_HEADER_FIM").val();

	if (activity == ATIV_DPT_HEADER_FIM){
		dadosRest();
	}

	/*-- Alterado Thiago Oliveira INICIO --*/
	
	if (activity == ATIV_INICIAL || activity == "0"){
		//if (activity == ATIV_COMMERCIAL_APPROVAL){
			
			//confirmando se o estado foi preenchido.
			var state = $("#code_state").val();
			//Incluído por Sergio Bruno. Devido a mudança do método, sistema nem sempre popula #code_state
			if(state.trim() == "" || state.trim() == "undefined" || state.trim() == null){
				state = $("#zoom_state").val();
			}
			if(state.trim() == "" || state.trim() == "undefined" || state.trim() == null){
				throw "Please, select the state!";
			}else{
			//	var state 						= $("#code_state").val(); Removido por Sergio Bruno (Reduncância)
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

function dadosRest(){
	var SUPPLIER 		= $("#txt_supplier").val();
	var UNIT 			= $("#txt_unit").val();
	var NUMBER			= "";
	var PROCESSFLUIG	= $("#hd_numProcesso").val(); 
	var TOTAL 			= $("#grand_total").val();
	var NOTES 			= $("#notas").val();
	var DEPARTMENT 		= $("#txt_department_code").val(); //$("#zoom_department").val();
	var RELATORIO		= $("#name_report").val();
	var FEES			= getFees();
	var CHURCHES 		= getChurch();
	var GLCODE			= getGlCode();
	var RENTALS			= getRentals();
	var DEPOSITS		= getDeposits();
	var TYPE			= $("#auxtipoRequisicao").val().toUpperCase();
	var CANCELORIGINAL	= $("#auxCancelOriginal").val().toUpperCase();
	var ORIGINALPROCESS	= "";
	var DUEDATEORIGINAL	= $("#date_cancel_financial").val();
	var radioFluigOrig	= $("#auxCancelOriginal").val();
	//var TERMINATIONDATE	= $("#termination_lease_date").val();
	
	if (radioFluigOrig == "nao" || radioFluigOrig == "" || radioFluigOrig == null) {
		ORIGINALPROCESS = $("#original_fluig_process").val();
	}else{
		ORIGINALPROCESS = $("#fluig_process_zoom").val();
	}
	
	//tirada a TERMINATIONDATE - alinhado isto com Sergio em 20201008
	/*
	var dados = {
	SUPPLIER:SUPPLIER,
	UNIT:UNIT,
	NUMBER:NUMBER,
	PROCESSFLUIG:PROCESSFLUIG,
	TOTAL:TOTAL,
	NOTES:NOTES,
	DEPARTMENT:DEPARTMENT,
	RELATORIO:RELATORIO,
	FEES:FEES,
	CHURCHES:CHURCHES,
	GLCODE:GLCODE,
	RENTALS:RENTALS,
	DEPOSITS:DEPOSITS, 
	TYPE:TYPE,
	CANCELORIGINAL:CANCELORIGINAL,
	ORIGINALPROCESS:ORIGINALPROCESS,
	DUEDATEORIGINAL:DUEDATEORIGINAL,
	TERMINATIONDATE:TERMINATIONDATE
	}
	*/

	var dados = {
	SUPPLIER:SUPPLIER,
	UNIT:UNIT,
	NUMBER:NUMBER,
	PROCESSFLUIG:PROCESSFLUIG,
	TOTAL:TOTAL,
	NOTES:NOTES,
	DEPARTMENT:DEPARTMENT,
	RELATORIO:RELATORIO,
	FEES:FEES,
	CHURCHES:CHURCHES,
	GLCODE:GLCODE,
	RENTALS:RENTALS,
	DEPOSITS:DEPOSITS, 
	TYPE:TYPE,
	CANCELORIGINAL:CANCELORIGINAL,
	ORIGINALPROCESS:ORIGINALPROCESS,
	DUEDATEORIGINAL:DUEDATEORIGINAL
	}
	
	$("#hd_json").val(JSON.stringify(dados))
}


function getFees(){
	
	var feeAplication 		= document.getElementById('fee_application');
	var feeAdministrative	= document.getElementById('fee_administrative');
	var feeAmenity 			= document.getElementById('fee_amenity');
	var feeNone 			= document.getElementById('fee_none');
	var dados 				= [];
	
	if(feeAplication.checked){
		var linha = {
			TYPE:"Application",
			VALUE:$("#application_fee_value").val(),
	        DATEFEE:$("#due_date_fee").val()
		}; 
		dados.push(linha);    		
	}
	
	if(feeAdministrative.checked){
		var linha = {
			TYPE:"Administrative",
			VALUE:$("#administrative_fee_value").val(),
	        DATEFEE:$("#due_date_fee").val()
		}; 
		dados.push(linha);    		
	}
	
	if(feeAmenity.checked){
		var linha = {
			TYPE:"Amenity/Common Area",
			VALUE:$("#amenity_fee_value").val(),
	        DATEFEE:$("#due_date_fee").val()
		}; 
		dados.push(linha);    		
	}
	
	return dados;
}

function getChurch(){
	var dados 	= [];
	
	var linha = {
		CODE:$("#zoom_igreja").val(),
		PERCENTUAL:"100"
	}; 
	dados.push(linha);    		
	
	return dados;
}

function getGlCode(){
	
	var dados 	= [];
	
	var linha = {
		CODE:$("#classes").val(),
		PERCENTUAL:"100"
	}; 
	dados.push(linha);    		
	
	return dados;
}

function getRentals(){
	var dados 		= [];
	var valRental	= getNumber($("#rent_value").val());	
	
	if(valRental > 0){
		//se valor for 0, é porque a linha do grid foi apagada. validateForm nao permite que a rotina chegue aqui se tiver valor.
		if(valRental > 0){
			var linha = {
				TERMS:$("#qtd_installments").val(),
				DUEDATE:$("#start_lease_date").val(),   //"09/20/2020",
			    RENTAMOUNT:valRental.toString()
			}; 
			dados.push(linha);
		}
	}
	return dados;
}

function getDeposits(){
	var dados 			= [];
	var radio 			= $("#rd_deposit:checked").val();
	var valueDeposit	= "";
	
	//verificando se temos o rateio do deposit
	if (radio == "sim") {
		var qtdItens 		= $("#linha_deposit").val(); //linha_deposit.value; 
		
		for (var i = 1; i <= qtdItens; i++) {
			valueDeposit	= getNumber($("#grid_deposit_value___"+i).val()).toString();
			if(valueDeposit > 0){
				var linha = {
						VALUE:valueDeposit,
						DUEDATE:$("#grid_deposit_date___"+i).val()   //"09/20/2020",
					}; 
				dados.push(linha);    
			}
		}
	}else{
		valueDeposit	= getNumber($("#deposit_value").val()).toString();
		if(valueDeposit > 0){
			var linha = {
					VALUE:valueDeposit,
					DUEDATE:$("#deposit_date").val()   //"09/20/2020",
				}; 
			dados.push(linha);   
		}
	}
	return dados; 
}

//function zoomState(obj){
function zoomState(nome){
	
	//var nome = $(obj).prev("input").attr("name");
	var activity 					= $("#atividade").val() 
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
	var ATIV_NATIONAL_LEADER		= $("#ATIV_NATIONAL_LEADER").val();
	var ATIV_DPT_HEAD				= $("#ATIV_DPT_HEAD").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_DPT_HEADER_FIM			= $("#ATIV_DPT_HEADER_FIM").val();
	
	if (activity != ""){
		if((activity == ATIV_INICIAL) || activity == "0"){
	
			tdizoom.open("states", //dataset Id
					"code,States,description,Description", //nome da coluna do dataset virgula (,) seu nome de exibição 
					"code,description", //coluna de retorno
					"States", //titulo do dataset
					"", //filtro do dataset utilizando campo virgula (,) valor ex: colleagueName,Fernando
					nome); // identificador do zoom
		}
	}
}