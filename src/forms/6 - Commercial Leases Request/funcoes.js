function loadform() {
	
	var activity 					= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
	//var ATIV_NATIONAL_LEADER		= $("#ATIV_NATIONAL_LEADER").val();
	var ATIV_COMMERCIAL_APPROVAL	= $("#ATIV_COMMERCIAL_APPROVAL").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_COMMERCIAL_FIM			= $("#ATIV_COMMERCIAL_FIM").val();

	checkCOReason();
	checkZoneArea();
	checkContract();
	checkFees();
	checkConcessions();
	checkResponsible();
	addProratImprov('table_prorat_improv');
	checkBuildDetails();
	
	selectDeposit();
	selectOrigProcess("js");
	selectLeaseType();
	
	//ajuste em razao de erro de quando cai na atividade MOVE. Fica com error log no inspect object porque nao consegue ler as bibliotecas de calendar nesta etapa.
	if (activity != "" && mode!= "VIEW")
	{
		addmascara();
		carregaData();
	}
	
	if((((activity != ATIV_INICIAL)&& (activity != "0")) || activity == "") || (mode == "VIEW")){
		hideButtonChurch();
	}
	
	if((activity == ATIV_INICIAL) || activity == "0"){
		if (mode == "MOD" || mode == "ADD") {
			setTimeout(function () {
				scrollFocus('txt_solicitante');
				abreColapse('divInfoGeral');
			}, 150);
		}
	}else if(activity == ATIV_STATE_LEADER){
		
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){//abre aba de Aprovação
				scrollFocus('txt_gestor');
				abreColapse('divAprovacao');
			},150);
		}
	}else if(activity == ATIV_COMMERCIAL_APPROVAL){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){//abre aba de Aprovação
				scrollFocus('rd_aprovGestor_cl');
				abreColapse('divCL');
			},150);
		}
	}else if(activity == ATIV_DIVISION){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){//abre aba de Aprovação
				scrollFocus('txt_gestor_division');
				abreColapse('divDivision');
			},150);
		}
	}else if(activity == ATIV_VP){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){//abre aba de Aprovação
				scrollFocus('txt_gestor_vp');
				abreColapse('divVP');
			},150);
		}
	}else if(activity == ATIV_COMMERCIAL_FIM){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){//abre aba de Aprovação
				scrollFocus('zoom_igreja');
				abreColapse('divCL');
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
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
	//var ATIV_NATIONAL_LEADER		= $("#ATIV_NATIONAL_LEADER").val();
	var ATIV_COMMERCIAL_APPROVAL	= $("#ATIV_COMMERCIAL_APPROVAL").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_COMMERCIAL_FIM			= $("#ATIV_COMMERCIAL_FIM").val();
	
	
	if((activity == ATIV_INICIAL) || activity == "0"){
		/*
		if(zoomName == "prorating_church_grid"){
			$("#prorating_church_state___"+ idFilho).val(selectedItem.States);
			$("#prorating_church_address___"+ idFilho).val(selectedItem.address);
		}*/
		if (zoomName == "zoom_state") {
			var selectCode 			= selectedItem.code;
			var selectDescription 	= selectedItem.Description;
			$("#code_state").val(selectCode);
			$("#name_state").val(selectDescription);
		}
	}
	 
	if(activity == ATIV_COMMERCIAL_FIM){
		if (zoomName == "zoom_igreja") {
			var selectEndereco = selectedItem.address;
			var selectEstado = selectedItem.States;
			$("#txt_endereco").val(selectEndereco);
			$("#txt_estado").val(selectEstado);
		}else if (zoomName == "zoom_supplier") {
			$("#txt_supplier").val(selectedItem.code);
			$("#txt_unit").val(selectedItem.unit);
			$("#txt_description").val(selectedItem.name);
		}
		if (zoomName == "zoom_department") {
			$("#txt_department_code").val(selectedItem.code);
			$("#txt_department_description").val(selectedItem.descri);
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
	//var ATIV_NATIONAL_LEADER		= $("#ATIV_NATIONAL_LEADER").val();
	var ATIV_COMMERCIAL_APPROVAL	= $("#ATIV_COMMERCIAL_APPROVAL").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_COMMERCIAL_FIM			= $("#ATIV_COMMERCIAL_FIM").val();
	
	if((activity == ATIV_INICIAL) || activity == "0"){
		if (zoomName == "zoom_state") {
			$("#code_state").val("");
			$("#name_state").val("");
		}
	}
	
	if(activity == ATIV_COMMERCIAL_FIM){
		//if (removedItem.inputId == "zoom_igreja") { //Limpa campos
		if (zoomName == "zoom_igreja") { //Limpa campos
			$("#txt_endereco").val("");
			$("#txt_estado").val("");
		//}else if (removedItem.inputId == "zoom_supplier") {
		}else if (zoomName == "zoom_supplier") {	
			$("#txt_supplier").val("");
			$("#txt_unit").val("");
			$("#txt_description").val("");
		}
		//if (removedItem.inputId == "zoom_department") {
		if (zoomName == "zoom_department") {
			$("#txt_department_code").val("");
			$("#txt_department_description").val("");
		}else if (zoomName == "classes") {
			var selectCodeClasses	= selectedItem.code;
			$("#gl_code").val("");
		}	
	}
}
function addmascara() {
	$("#txt_dataContrato").mask("99/99/9999")
	$("#txt_taxaMudanca").maskMoney({ allowZero: true, allowNegative: true, thousands: ',', decimal: '.' });
	$("#txt_valorPago").maskMoney({ allowZero: true, allowNegative: true, thousands: ',', decimal: '.' });
	$("#txt_depositoSeguranca").maskMoney({ allowZero: true, allowNegative: true, thousands: ',', decimal: '.' });
	//$("#txt_aluguelPrePago").maskMoney({ allowZero: true, allowNegative: true, thousands: ',', decimal: '.' });
	$("#grand_total").maskMoney({ allowZero: true, allowNegative: true, thousands: ',', decimal: '.' });
	
	$("#concessions_qtd_months").mask('##000', {reverse: true});
	$("#txt_propriedade").mask('##000', {reverse: true});
	$("#application_fee_value").maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
}
function carregaData() {
	var dataAtual = new Date();
	var mySimpleCalendar = FLUIGC.calendar('#txt_data_contrato_inicio', {
		language: 'en'
	});
	mySimpleCalendar.setMinDate(dataAtual);
	
	/*
	var mySimpleCalendar2 = FLUIGC.calendar('#txt_data_contrato_fim', {
		language: 'en'
	});
	mySimpleCalendar2.setMinDate(dataAtual);
	*/
	var mySimpleCalendar3 = FLUIGC.calendar('#txt_data_deposit', {
		language: 'en'
	});
	mySimpleCalendar3.setMinDate(dataAtual);
	
	var mySimpleCalendar4 = FLUIGC.calendar('#due_date_fee',{
		language: 'en'
	});
	mySimpleCalendar4.setMinDate(dataAtual);	
	
	var mySimpleCalendar5 = FLUIGC.calendar('#date_cancel_financial',{
		language: 'en'
	});
	mySimpleCalendar5.setMinDate(dataAtual);
}
function scrollFocus(input) {
	$('html,body').animate({ scrollTop: $('#' + input).offset().top }, 500, function () {
		$('#' + input).focus();
	});
}
function abreColapse(idDiv) {
	$('#' + idDiv + ' .collapse').collapse('show');
}

//funcao para adicionar produtos no grid e fazer também a contagem de produtos do grid.
function addChurch(idtable){
	
	var activity 					= $("#atividade").val() 
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
	//var ATIV_NATIONAL_LEADER		= $("#ATIV_NATIONAL_LEADER").val();
	var ATIV_COMMERCIAL_APPROVAL	= $("#ATIV_COMMERCIAL_APPROVAL").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_COMMERCIAL_FIM			= $("#ATIV_COMMERCIAL_FIM").val();
	
	if (activity != "")
	{	
		if((activity == ATIV_INICIAL) || activity == "0"){
			var linha = wdkAddChild(idtable);
			if(idtable == 'table_prorating_church'){
				$('#linha_prorating_church').val(linha);
				$("#prorating_church_value___"+linha).maskMoney({allowZero:false, allowNegative: false, thousands:',', decimal:'.'});
				$("#prorating_total___"+linha).maskMoney({allowZero:false, allowNegative: false, thousands:',', decimal:'.'});
				var dataAtual = new Date();
				var mySimpleCalendar = FLUIGC.calendar("#prorating_start_date___"+linha,{
					language: 'en'
				});
				
				mySimpleCalendar.setMinDate(dataAtual);
				var mySimpleCalendar2 = FLUIGC.calendar("#prorating_end_date___"+linha,{
					language: 'en'
				});
				
				mySimpleCalendar2.setMinDate(dataAtual);
				
				ajustarBackgroundColor("prorating_start_date___"+linha,'white');
				ajustarBackgroundColor("prorating_end_date___"+linha,'white');
				
			}
		}
	}
} 

function fnCustomDelete(oElement){
	var activity 					= $("#atividade").val() 
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
	//var ATIV_NATIONAL_LEADER		= $("#ATIV_NATIONAL_LEADER").val();
	var ATIV_COMMERCIAL_APPROVAL	= $("#ATIV_COMMERCIAL_APPROVAL").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_COMMERCIAL_FIM			= $("#ATIV_COMMERCIAL_FIM").val();
	
	if (activity != "")
	{
		if((activity == ATIV_INICIAL) || activity == "0"){
			fnWdkRemoveChild(oElement);
			sumTotal();
		}
	}
}

function ajustarBackgroundColor(campo, color){
	$('#'+campo).attr('style', 'background-color: '+color+' !important');
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

function checkCOReason() {
	
	var radio = $("#txt_confirmACO:checked").val();
	
	if (typeof radio != "undefined"){
		$("#auxRadioCOReason").val(radio);
	}else{
		radio = $("#auxRadioCOReason").val();
	}
	
	if (radio == "no") {
		$("#co_reason").attr('disabled', false);
	} else {
		$("#co_reason").attr('disabled', true);
	}
}

function checkZoneArea(){
	
	var radio = $("#txt_confirArea:checked").val();
	
	if (typeof radio != "undefined"){
		$("#auxZoneArea").val(radio);
	}else{
		radio = $("#auxZoneArea").val();
	}
	
	if (radio == "no") {
		$("#zone_area_reason").attr('disabled', false);
	} else {
		$("#zone_area_reason").attr('disabled', true);
	}
}

function checkContract(){
	
	var radio = $("#contratoMensal:checked").val();
	
	if (typeof radio != "undefined"){
		$("#auxContract").val(radio);
	}else{
		radio = $("#auxContract").val();
	}
	
	if (radio == "no") {
		$("#txt_data_contrato_inicio").attr('disabled', false);
		//$("#txt_data_contrato_fim").attr('disabled', false);
		ajustarBackgroundColor('txt_data_contrato_inicio','white');
		//ajustarBackgroundColor('txt_data_contrato_fim','white');
	} else {
		//TODO - campos de data, quando desabilitados pelo comando abaixo, perdem a mascara de data. Mesmo que façamos a chamada do carregarData(), a mascara dos campos nao volta mais.
		//$("#txt_data_contrato_inicio").attr('disabled', true);
		//$("#txt_data_contrato_fim").attr('disabled', true);
		$("#txt_data_contrato_inicio").val("")
		ajustarBackgroundColor('txt_data_contrato_inicio','#f2f2f2');
		//$("#txt_data_contrato_fim").val("")
		//ajustarBackgroundColor('txt_data_contrato_fim','#f2f2f2');
	}
}

function ajustarBackgroundColor(campo, color){
	$('#'+campo).attr('style', 'background-color: '+color+' !important');
}

function retVlrFormatCalculo(cCampo){
	var valor 	= $("#"+cCampo).val();
	valor		= valor.replace(",","");
	valor		= parseFloat(valor); 
	
	if (isNaN(valor)){
		valor = 0;
	}
	
	return valor;
}

function vldDay(obj){
	
	var qtdItens 			= linha_prorating_church.value;
	var linhaAtual 			= obj.id.split("___")[1];
	
	var day 	= parseInt($("#prorating_church_day___" + linhaAtual).val());
	if(day != null && !isNaN(day)){
		if(day > 31){
			alert("The day is incorrect. Please check it.")
			$("#prorating_church_day___" + linhaAtual).focus();
			$("#prorating_church_day___" + linhaAtual).val("");
		}
	}
}

function vldYear(obj){
	
	var qtdItens 			= linha_prorating_church.value;
	var linhaAtual 			= obj.id.split("___")[1];
	var dataAtual		 	= new Date();
    var currentYear 		= dataAtual.getFullYear();
	
	var year 	= parseInt($("#prorating_church_year___" + linhaAtual).val());
	if(year != null && !isNaN(year)){
		if(year < currentYear){
			alert("The year is incorrect (YYYY). The minimum year is "+currentYear+".Please check it.")
			$("#prorating_church_year___" + linhaAtual).focus();
			$("#prorating_church_year___" + linhaAtual).val("");
		}
	}
}

function setInstallment(obj){
	
	var idFilho 	= obj.id.split("___")[1];	
	var startDate	= $("#prorating_start_date___"+idFilho).val();
	var endDate		= $("#prorating_end_date___"+idFilho).val();
	
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
		
		$("#prorating_qtd_installments___"+idFilho).val(qtdParcelas);
		$("#prorating_due_date___"+idFilho).val(startDate.getDate());
	}
		
	//recalculando o total.
	sumTotalLine(obj);
	
}

function sumTotalLine(obj){
	var idFilho 	= obj.id.split("___")[1];	
	var qtdParcelas	= $("#prorating_qtd_installments___"+idFilho).val();
	var valorMensal	= retVlrFormatCalculo("prorating_church_value___"+idFilho);
	
	if(qtdParcelas == null || isNaN(qtdParcelas) || qtdParcelas == "undefined"){
		qtdParcelas = 0;
	}
	
	var totalLine	= valorMensal * qtdParcelas;
	
	$("#prorating_total___"+idFilho).val(totalLine);
	$("#prorating_total___"+idFilho).maskMoney("mask");
	
	//calculando o total final do formulario.
	sumTotal();
	
}

function checkFees(){
	var radio = $("#mudancaCO:checked").val();
	
	if (typeof radio != "undefined"){
		$("#auxMudancaCO").val(radio);
	}else{
		radio = $("#auxMudancaCO").val();
	}
	
	if (radio == "nao") {
		$("#txt_taxaMudanca").attr('disabled', true);
		$("#txt_taxaMudanca").val("");
	} else {
		$("#txt_taxaMudanca").attr('disabled', false);
	}
}

function checkConcessions(){
	
	var radio = $("#agendamento:checked").val();
	
	if (typeof radio != "undefined"){
		$("#auxAgendamento").val(radio);
	}else{
		radio = $("#auxAgendamento").val();
	}
	
	if (radio == "nao") {
		$("#concessions_qtd_months").attr('disabled', true);
		$("#concessions_qtd_months").val("");
	} else {
		$("#concessions_qtd_months").attr('disabled', false);
	}
}


function checkResponsible(){
	
	var radio = $("#responsavelMelhorias:checked").val();
	
	if (typeof radio != "undefined"){
		$("#auxResponsible").val(radio);
	}else{
		radio = $("#auxResponsible").val();
	}


	if($("#auxtipoRequisicao").val() != "recisaoAntecip"){
		if (radio == "shared") {
			$("#grid_prorat_improv").show();
		} else {
			$("#grid_prorat_improv").hide();
		}
	}else{
		$("#grid_prorat_improv").hide();
	}	
}

function addProratImprov(idtable){
	
	var activity 					= $("#atividade").val() 
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var aPayers						= [];
		
	aPayers.push("Tenant");
	aPayers.push("Landlord");
	
	if (activity != "")
	{	
		//if((activity == ATIV_INICIAL) || activity == "0"){ //somente activity 0, pois em caso de recusa o formulario iria voltar e seriam incluídas duas novas linhas.
		if(activity == "0"){
			var linha = 0;
			
			//adicionamos duas linhas ao GRID, onde a primeira recebe o valor de tenant e a segunda de landlord
			for (var i = 0; i <= 1; i++) {
				linha = wdkAddChild(idtable);
				//if(idtable == 'table_prorat_improv'){
				$('#linha_prorat_improv').val(linha);
				$("#pror_improv_respons___"+linha).val(aPayers[i]);
				$("#pror_improv_respons___"+linha).css("font-weight","Bold");
				//$("#pror_improv_respons___"+linha).css("color","black");
				$("#pror_improv_respons___"+linha).css("color","#58595b !important");
				//ajustarBackgroundColor('pror_improv_respons___'+linha,'white');
				
				$("#pror_improv_percent___"+linha).maskMoney({allowZero:false, allowNegative: false, thousands:',', decimal:'.'});
				$("#pror_improv_value___"+linha).maskMoney({allowZero:false, allowNegative: false, thousands:',', decimal:'.'});
				//}
			}	
		}
	}
} 

function checkBuildDetails(){
	
	var radio = $("#txt_tipoAplicacao:checked").val();
	
	if (typeof radio != "undefined"){
		$("#auxTipoAplicacao").val(radio);
	}else{
		radio = $("#auxTipoAplicacao").val();
	}
	
	if (radio == "igreja") {
		if ($("#auxtipoRequisicao").val()!= "recisaoAntecip"){
			$("#building_details").show();
		}else{
			$("#building_details").hide();
		}
	} else {
		$("#building_details").hide();
	}
}

function beforeSendValidate(){
	var activity 					= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
	//var ATIV_NATIONAL_LEADER		= $("#ATIV_NATIONAL_LEADER").val();
	var ATIV_COMMERCIAL_APPROVAL	= $("#ATIV_COMMERCIAL_APPROVAL").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_COMMERCIAL_FIM			= $("#ATIV_COMMERCIAL_FIM").val();
	
	
	//if (activity == ATIV_INICIAL || activity == "0"){
	if (activity == ATIV_COMMERCIAL_APPROVAL){
		
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
		
	if (activity == ATIV_COMMERCIAL_FIM){
		dadosRest();
	}
	
	
}

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
	var RENTALS			= [];
	var DEPOSITS		= [];
	var TYPE			= $("#auxtipoRequisicao").val().toUpperCase();
	var CANCELORIGINAL	= $("#auxCancelOriginal").val().toUpperCase();
	var ORIGINALPROCESS	= "";
	var DUEDATEORIGINAL	= $("#date_cancel_financial").val();
	var radioFluigOrig	= $("#auxCancelOriginal").val();
	var TERMINATIONDATE	= $("#termination_lease_date").val();
	
	if (radioFluigOrig == "nao" || radioFluigOrig == "" || radioFluigOrig == null) {
		ORIGINALPROCESS = $("#original_fluig_process").val();
	}else{
		ORIGINALPROCESS = $("#fluig_process_zoom").val();
	}
	
	if ($("#txt_tipoRequisicao:checked").val() != "recisaoAntecip"){
		RENTALS			= getRentals();
		DEPOSITS		= getDeposits();
	}
	
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
	
	$("#hd_json").val(JSON.stringify(dados))
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
		CODE:$("#gl_code").val(),
		PERCENTUAL:"100"
	}; 
	dados.push(linha);    		
	
	return dados;
}

function getRentals(){
	var dados 		= [];
	var qtdItens 	= $("#linha_prorating_church").val(); //linha_deposit.value; 
	var valRental	= 0; //getNumber($("#rent_value").val());	
	
	for (var i = 1; i <= qtdItens; i++) {
		valRental 	= getNumber($("#prorating_church_value___"+i).val()).toString();
		//se valor for 0, é porque a linha do grid foi apagada. validateForm nao permite que a rotina chegue aqui se tiver valor.
		if(valRental > 0){
			var linha = {
					TERMS:$("#prorating_qtd_installments___"+i).val(),
					RENTAMOUNT:valRental.toString(),
					DUEDATE:$("#prorating_start_date___"+i).val()   //"09/20/2020",
				}; 
			dados.push(linha);  
		}
	}
	
	return dados;
}

function getDeposits(){
	var dados 			= [];
	var valueDeposit	= "";
	
	//verificando se temos o rateio do deposit
	valueDeposit	= getNumber($("#txt_depositoSeguranca").val()).toString();
	if(valueDeposit > 0){
		var linha = {
				VALUE:valueDeposit,
				DUEDATE:$("#txt_data_deposit").val()   //"09/20/2020",
			}; 
		dados.push(linha);   
	}
	
	return dados; 
}

function sumTotal(){
	
	var depositValue		= getNumber($("#txt_depositoSeguranca").val());
	var feeValue			= getNumber($("#application_fee_value").val());
	var qtdItens 			= linha_prorating_church.value;
	//var linhaAtual 			= obj.id.split("___")[1];
	var total				= 0;
	
	var radioTpReq = $("#auxtipoRequisicao").val();
	
	if(radioTpReq == "recisaoAntecip"){
		total += feeValue;
	}else{
		for (var i = 1; i <= qtdItens; i++) {
			total	+= getNumber($("#prorating_total___"+i).val());
		}
		
		//somando o total dos rentals com o deposito.
		total += (depositValue + feeValue);
	}
	
	$("#grand_total").val(total);
	$("#grand_total").maskMoney("mask");
	
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

function selectLeaseType() {
	
	var radio = $("#txt_tipoRequisicao:checked").val();
	
	if (typeof radio != "undefined"){
		$("#auxtipoRequisicao").val(radio);
	}else{
		radio = $("#auxtipoRequisicao").val();
	}
	
	/*
	if (typeof $("#rental_orig_process_value").val() == "undefined" || $("#rental_orig_process_value").val() == null || $("#rental_orig_process_value").val() == ""){
		if($("#aux_rent_orig_proc_val").val() != null){
			$("#rental_orig_process_value").val($("#aux_rent_orig_proc_val").val());
		}
	}
	*/
	
	if(radio == "recisaoAntecip"){
		disableValueFields(true);
		$("#row_fluig_process").show();
		$("#col_rental_difference").hide();
		$("#row_cancel_original").show();
		$("#rental_difference").val("0.00");
		$("#rd_deposit:checked").prop('checked', false);
		$("#row_lease_dates").hide();
		$("#row_lease_terms").hide();
		$("#row_rental_payments").hide();
		$("#row_lease_termination").show();
		
		$("#divDetalhesPagamento").hide();
		$("#divRentals").hide();
		$("#div_square").hide();
		//$("#grid_prorat_improv").hide();
		$("#div_responsible").hide();
		$("#div_month_to_month").hide();
	}else { //if (radio == "novo" || radio == "" || radio == null) {
		$("#row_fluig_process").hide();
		$("#col_rental_difference").hide();
		$("#row_cancel_original").hide();
		$("#rental_difference").val("0.00");
		//$("#rental_orig_process_value").val("0.00");
		//$("#aux_rent_orig_proc_val").val("");
		$("#row_lease_dates").show();
		$("#row_lease_terms").show();
		$("#row_rental_payments").show();
		$("#row_lease_termination").hide();
		disableValueFields(false);
		
		$("#divDetalhesPagamento").show();
		$("#divRentals").show();
		$("#div_square").show();
		//$("#grid_prorat_improv").show();
		$("#div_responsible").show();
		$("#div_month_to_month").show();
	}
	
	//sumDifference();
	selectDeposit();
	selectOrigProcess("js");
	
	sumTotal();
	checkBuildDetails();
	checkResponsible();
}

function getFees(){
	
	var dados 				= [];
	var vlrFee				= $("#application_fee_value").val();
	
	if(vlrFee != "" && vlrFee == null && parseFloat(vlrFee) > 0){
		var linha = {
			TYPE:$("#desc_fee").val(),
			VALUE:$("#application_fee_value").val(),
	        DATEFEE:$("#due_date_fee").val()
		}; 
		dados.push(linha);    		
	}
	
	return dados;
}

function selectDeposit(){
	var state 						= $("#atividade").val();
	var ATIV_INICIAL				= (state == 0 || state == 4);
	
	var radioTpReq = $("#auxtipoRequisicao").val();
	
	if(radioTpReq == "recisaoAntecip"){
		$("#div_single_deposit").hide();
	}else{
		$("#div_single_deposit").show();
	}
	sumTotal();
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
		/*
		$("#rental_orig_process_value").attr('disabled', false);
		if(cClique != "js"){
			$("#rental_orig_process_value").val("0.00");
			$("#aux_rent_orig_proc_val").val("");
		}
		*/
		$("#row_cancel_original").hide();
		textoLabelOriginal	= "Webforms Process";
	} else {
		$("#fluig_orig_input").hide();
		$("#fluig_orig_zoom").show();
		/*
		$("#rental_orig_process_value").attr('disabled', true);
		if(cClique != "js"){
			$("#rental_orig_process_value").val("0.00");
			$("#aux_rent_orig_proc_val").val("");
		}
		*/	
		$("#row_cancel_original").show();
		textoLabelOriginal	= "Fluig Process";
	}
	
	$("#label_original").text(textoLabelOriginal);
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

function disableValueFields(disable){
	
	if(disable){
		$("#txt_depositoSeguranca").val("0.00");
		$("#txt_data_deposit").val("");
	}
	
	$("#txt_depositoSeguranca").attr('disabled', disable);
	$("#txt_data_deposit").attr('disabled', disable);

}

/*
function getResponsibleTst(mailUserLogado){
	
	//no momento estamos usando um email de testes, mas vamos receber o email por parametro.
	var testeEmail = "bricardoliveira@gmail.com";//"oliveira.bruno@totvs.com.br"
	
	//var c1 				= DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
	//criamos a constraint, informando que vamos filtrar o campo mail (mail é uma coluna do dataset Colleague)
	var c1 				= DatasetFactory.createConstraint("mail", testeEmail, testeEmail, ConstraintType.MUST);
	var constraints 	= new Array(c1);
	//aqui fazemos a consulta no dataset colleague, passando nossa constraint para que retorne somente um usuario através do email.
	var colleagueMap	= DatasetFactory.getDataset("colleague", null, constraints, null);
	//aqui pegamos o valor retornado do dataset.
	var idUserFluig 	= colleagueMap.values[0]["colleaguePK.colleagueId"];

	//return "oliveira.bruno"; //chumbando um id para testes.
	return idUserFluig;
}
*/

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