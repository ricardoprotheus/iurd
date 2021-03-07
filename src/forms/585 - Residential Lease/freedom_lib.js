/*
FREEDOM TECNOLOGIA
Biblioteca de funÃ§Ãµes JavaScript para projetos do padrÃ£o FDS-ECMTOTVS
ResponsÃ¡vel pelo Arquivo: Gabriel MagalhÃ£es

*********************
HistÃ³rico de RevisÃµes
*********************
20-06-2012: (ADEMIR) VersÃ£o 1 - InserÃ§Ã£o das funÃ§Ãµes buscaIdFilhos, toMoney. PublicaÃ§Ã£o do documento no SVN
*/


/* FunÃ§Ã£o que retorna todos os id's de filhos de um determinado formulÃ¡rio que possui pai e filho */
/* Entrada: idCampoBase: Id de algum campo que compoe o pai e filho para ser a referÃªncia das buscas do ID 
			idDivFilhos: Id da DIV que compoe o modelo de pai e filho
   Saida  : Array com os nÃºmeros que cada ID dos filhos
*/
/****************************************************************************************************************************/
function buscaIdFilhos(idCampoBase,idDivFilhos){
	var div = document.getElementById(idDivFilhos);	   
	var elements = div.getElementsByTagName('input');
	var vlCom = "";
	var total = 0;
	var aux = new Array();
	var aux2 = new Array();
	for(i = 0; i < elements.length; i++){
		var element = elements[i];		
		subStr = element.id;
		subStr = subStr.substring(0,idCampoBase.length+3);
		//alert(subStr);
		if (subStr == (idCampoBase+"___")){
			vlCom = element.id;
			aux = vlCom.split("___");
			aux2.push(aux[1]);					
		}
	}
	return aux2;
}
/****************************************************************************************************************************/

/* FunÃ§Ã£o que retorna pega um string e formata a mesma para um valor monetÃ¡rio */
/* Entrada: String a ser formatada
   Saida  : String formatada
*/
/****************************************************************************************************************************/
function toMoney(nStr) {
	nStr += '';
	if (nStr.indexOf('.') == -1)
		nStr += '.00';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? ',' + x[1] : '';
	while (x2.length <= 2)
		x2 = x2 + "0";
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '.' + '$2');
	}
	return x1 + x2;
}

/****************************************************************************************************************************/
/* FunÃ§Ã£o que desabilita todos os campos , conforme a div (String) passada no parametro  */
/* Entrada: String da div que fara a varredura para desabilitar os campos
   Saida  : Nenhum.
    Autor  : Eliezer Laufer em 2/6/2012
*/
/****************************************************************************************************************************/
function disableFields(vDiv) {
	var div = document.getElementById(vDiv);
	var elements  = div.getElementsByTagName('input');
	/*Elementos Tipo Input*/
		
	for(i = 0; i < elements.length; i++) {
		
		var element = elements[i];
		
		if(element.type == "radio" && element.checked != true) {
			element.disabled = true;
		}
			
		if(element.type == "checkbox") {
			element.onclick = function Gclicar(){this.checked = !this.checked; alert("You can't change this value in this task.");};
			//element.readOnly = true;
		}  
		
		if(element.type == "select") {
			element.readOnly = true;
		} 
		if(element.type == "number") {
			element.readOnly = true;
		}
		
		//if(element.type == "text" && element.getAttribute("data-zoom") == undefined) {
		if(element.type == "text") {
			element.readOnly = true;
			element.onblur = false;
			element.style.pointerEvents = 'none';
		}
		
		//if(element.type == "text" && element.getAttribute("data-zoom") == undefined) {
		if(element.type == "zoom") {
			element.readOnly = true;
			element.onblur = false;
		}
		
	}
	 
	if (vDiv == "div_cadastro"){
		$("#sl_posicaoMolde").prop("disabled",true);
	}

	/*Elementos Tipo TextArea*/
	
	var elementsArea = div.getElementsByTagName('textarea');
	for(i = 0; i < elementsArea.length; i++) {
		var element = elementsArea[i];
		element.readOnly = true;
	}
	
	/*Elementos Tipo Select*/
	var elementsSelect = div.getElementsByTagName('select');
    for(i = 0; i < elementsSelect.length; i++) {
     var element = elementsSelect[i];
     var id = element.id;
     var myList = document.getElementById(id);
     for(var count = myList.options.length - 1; count >= 0; count--) {
      if (document.getElementById(id).selectedIndex != count) {
       myList.options[count] = null;
      }   
     }
    }
    
}

function desabilitaCampoCExecao(vDiv, execao1, execao2) {
	var div = document.getElementById(vDiv);
	var elements  = div.getElementsByTagName('input');
	/*Elementos Tipo Input*/
		
		for(i = 0; i < elements.length; i++) {
			var element = elements[i];
			if(element.type == "radio" && element.checked != true  && element.id != execao1 && element.id != execao2) {
			element.disabled = true;
		}
			
//		if(element.type == "checkbox") {
//			element.onclick = function Gclicar(){this.checked = !this.checked; alert("Voc\u00EA n\u00E3o pode alterar este campo.");};
//		}  
		
		if(element.type == "select") {
			element.readOnly = true;
		} 
		if(element.type == "number") {
			element.readOnly = true;
		}
		
		if(element.type == "text" && element.getAttribute("data-zoom") == undefined) {
			element.readOnly = true;
			element.onblur = false;
		}
	}

	if (vDiv == "div_cadastro"){
		$("#sl_posicaoMolde").prop("disabled",true);
	}

	/*Elementos Tipo TextArea*/
	var elementsArea = div.getElementsByTagName('textarea');
	for(i = 0; i < elementsArea.length; i++) {
		var element = elementsArea[i];
		element.readOnly = true;
		if (element.id.substring(0, 20) == "txt_descricaoDespesa"){
			//element.className = "FRE-TextArea-Disable imprimir";
		} else {
			//element.className = "FRE-TextArea-Disable";
		}
	}
	//element.id.indexOf("sel_recebido___") >-1
	/*Elementos Tipo Select*/
	var elementsSelect = div.getElementsByTagName('select');
	for(i = 0; i < elementsSelect.length; i++) {
		var element = elementsSelect[i];
		if(element.className != "form-control nao"){
			var id = element.id;
			var myList = document.getElementById(id);
			for(var count = myList.options.length - 1; count >= 0; count--) {
				if (document.getElementById(id).selectedIndex != count) {
					myList.options[count] = null;
				}   
			}
		}
	}
}

function bootstrapDisableFields(idDiv, ExcecaoRadioValores, ExcecaoText, ExcecaoSelect, ExcecaoCheck){
	//console.log("desabilita campos FL");
	$("#" + idDiv).each(function(){
		//input number
		if($(this).find(":input[type=number]").hasClass("form-control")){
			$(this).find(":input[type=number]").attr('readonly', 'readonly').attr('onblur','return false').attr('onkeypress','return false').attr('onkeyup','return false').attr('onchange','return false');
		}
		
		//input text
		if(ExcecaoText == undefined || ExcecaoText == ""){
			if($(this).find(":input[type=text]").hasClass("form-control")){
				$(this).find(":input[type=text]").attr('readonly', 'readonly').attr('onblur','return false').attr('onkeypress','return false').attr('onkeyup','return false').attr('onchange','return false');
			}
		}else{
			var campos = "input[type=text]";
			for(var i = 0 ; i < ExcecaoText.length; i++){
				campos += "[name!='"+ExcecaoText[i]+"']";
			}
			if($(this).find(campos)){
				$(this).find(campos).attr('readonly', 'readonly').attr('onblur','return false').attr('onkeypress','return false').attr('onkeyup','return false').attr('onchange','return false');
			}
		}
		
		//textarea
		if($(this).find("textarea").hasClass("form-control")){
			$(this).find("textarea").prop('readonly', true);
		}
		
		//checkbox
		if(ExcecaoCheck == undefined || ExcecaoCheck == ""){
			if($(this).find("input[type=checkbox]")){
				$(this).find("input[type=checkbox]").attr('onclick','return false;');
			}
		}else{
			var campos = "input[type=checkbox]";
			for(var i = 0 ; i < ExcecaoCheck.length; i++){
				campos += "[id!='"+ExcecaoCheck[i]+"']";
			}
		}
		
		
		//radio button
		if(ExcecaoRadioValores == undefined || ExcecaoRadioValores == ""){
			if($(this).find("input[type=radio]")){
				$(this).find("input[type=radio]").attr('onclick','return false;');
			}
		}else{
			var campos = "input[type=radio]";
			for(var i = 0 ; i < ExcecaoRadioValores.length; i++){
				campos += "[value!='"+ExcecaoRadioValores[i]+"']";
			}
			if($(this).find(campos)){
				$(this).find(campos).attr('onclick','return false;');
			}
		}
		
		//select
		if(ExcecaoSelect == undefined || ExcecaoSelect == ""){
			if($(this).find("select")){
				$(this).find("select").css('pointer-events', 'none');
				$(this).find("select").css('background-color', '#eee');
			}
		}else{
			var campos = "select";
			for(var i = 0 ; i < ExcecaoSelect.length; i++){
				campos += "[name!='"+ExcecaoSelect[i]+"']";
			}
			if($(this).find(campos)){
				$(this).find(campos).css('pointer-events', 'none');
				$(this).find(campos).css('background-color', '#eee');
			}
		}
		
		//zoom
		if($(this).find("select[type=zoom]")){
			var zoom = $(this).find("select[type=zoom]").toArray(); 
			for (var i = 0 ; i < zoom.length ; i++ ) {
				window[zoom[i].name].disable(true);
			}
		}
		
		if($(this).find(":input[type=file]").hasClass("form-control")){
			$(this).find(":input[type=file]").attr('readonly', 'readonly').attr('onblur','return false').attr('onclick','return false').attr('onkeypress','return false').attr('onkeyup','return false').attr('onchange','return false');
		}
		
	});
}

function enableFields(id) {
	$('#'+id+' img, #'+id+' button').show();
    $('#'+id+' input, #'+id+' textarea, #'+id+' img, #'+id+' select').removeAttr('readonly');
   // $('#'+id+' input, #'+id+' textarea, #'+id+' select, #'+id+' span, #'+id+' div').attr("onclick", true);
    $('#'+id+' .statusReadonly').attr('readonly','readonly');
}
function enableField(id) {
    $('#'+id).removeAttr('readonly');
}

function disableFields2(id) {
    $('#'+id+' input, #'+id+' textarea, #'+id+' select').attr('readonly','readonly');
    $('#'+id+' input, #'+id+' textarea, #'+id+' select').attr('onclick','return false');
    $('#'+id+' img, #'+id+' .cpointer').hide();
	$('#'+id+' button, #'+id+' span').attr('disabled', true);
}


/****************************************************************************************************************************/
/* FunÃ§Ã£o que esconde as imagens , conforme a div (String) passada no parametro */
/* Entrada: String da div que fara a varredura para esconder as imagens
   Saida  : Nenhum
   Autor  : Eliezer Laufer em 2/6/2012
*/
/****************************************************************************************************************************/
function hiddenImg(idDiv) {
    var div = document.getElementById(idDiv);
    var elements = div.getElementsByTagName('img');
    var elements2 = div.getElementsByTagName('i');
    for(i = 0; i < elements.length; i++) {
        var element = elements[i];
        element.style.display = 'none';
    }
    for(i = 0; i < elements2.length; i++) {
        var element2 = elements2[i];
        element2.style.display = 'none';
    }

}

/****************************************************************************************************************************/

/* FunÃ§Ã£o que seta automaticamente os id's das imagens que fazem parte de um pai e filho. NecessÃ¡rio esta funÃ§Ã£o pelo fato do ECM perder a referencia desses componentes ao executar o validateForm por exemplo.
/* Entrada: div: DIV que compoe o pai e filho
			campo_referencia: campo usado para buscar os id dos filhos. 
			item_mudar_id: campo a ser setado o novo ID
			tipo: tipo da tag que iremos mudar o ID
			finalSubString: tamanhho do campo referencia
   Saida  : Nenhuma
   Exemplo: adcionarId("divTeste","input1___","zoom_familia","img",9);
   Autor: Silvano
*/
/****************************************************************************************************************************/
function adcionarId(div,campo_referencia,item_mudar_id,tipo,finalSubString){
	 var prevName = "";
	 var div1 = document.getElementById(div);
	 var elements = div1.getElementsByTagName('input');
	 var idFilhos = new Array();			
	 var element = "";
	 var id = "";
	 var subString = "";
		
	 for(i = 0; i < elements.length; i++) {
	       	element = elements[i];
		   	prevName = element.name;
		   	id = element.id;
			subString = id.substr(0,finalSubString);		
			if (subString == campo_referencia) {
		 	   idFilhos.push(prevName.substr(prevName.indexOf("___"), prevName.length));
		   	}
	 }
	 //============== ALTERAÃ?Ã?ES ID ZOOM ===============
	  var m = 0;
	  var cont = 0;
	  var div2 = document.getElementById(div);	   
	  var elements4 = div2.getElementsByTagName(tipo);
	  for(i = 0; i < elements4.length; i++) {
			var element = elements4[i];
			if(element.id == item_mudar_id){
				if (cont != 0) {
				  element.setAttribute('id',item_mudar_id+idFilhos[m]);
				  element.setAttribute('name',item_mudar_id+idFilhos[m]);
				  m++;
				}
				cont = 1;
			}
	  }
	  //============ FIM ===================// JavaScript Document
}
/****************************************************************************************************************************/



/* FunÃ§Ã£o que insere mascara monetÃ¡ria em um determinado campo do formulÃ¡rio */
/* Entrada: 
   Saida  : Campo formatado.
   Exemplo: onKeyPress="return(MascaraMoeda(this,'.',',',event));"
   Autor: Silvano
*/
/****************************************************************************************************************************/
function MascaraMoeda(objTextBox, SeparadorMilesimo, SeparadorDecimal, e){
	var id = objTextBox.id;
	if(!document.getElementById(id).readOnly){
		var sep = 0;
		var key = '';
		var i = j = 0;
		var len = len2 = 0;
		var strCheck = '0123456789';
		var aux = aux2 = '';
		var whichCode = (window.Event) ? e.which : e.keyCode;
		if (whichCode == 13) return true;
		key = String.fromCharCode(whichCode); // Valor para o cÃ³digo da Chave
		if (strCheck.indexOf(key) == -1) return false; // Chave invÃ¡lida
		len = objTextBox.value.length;
		for(i = 0; i < len; i++)
			if ((objTextBox.value.charAt(i) != '0') && (objTextBox.value.charAt(i) != SeparadorDecimal)) break;
		aux = '';
		for(; i < len; i++)
			if (strCheck.indexOf(objTextBox.value.charAt(i))!=-1) aux += objTextBox.value.charAt(i);
		aux += key;
		len = aux.length;
		if (len == 0) objTextBox.value = '';
		if (len == 1) objTextBox.value = '0'+ SeparadorDecimal + '0' + aux;
		if (len == 2) objTextBox.value = '0'+ SeparadorDecimal + aux;
		if (len > 2) {
			aux2 = '';
			for (j = 0, i = len - 3; i >= 0; i--) {
				if (j == 3) {
					aux2 += SeparadorMilesimo;
					j = 0;
				}
				aux2 += aux.charAt(i);
				j++;
			}
			objTextBox.value = '';
			len2 = aux2.length;
			for (i = len2 - 1; i >= 0; i--)
			objTextBox.value += aux2.charAt(i);
			objTextBox.value += SeparadorDecimal + aux.substr(len - 2, len);
		}	
		return false;
	}
}