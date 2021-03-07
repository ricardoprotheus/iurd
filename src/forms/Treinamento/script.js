
$(document).ready(function(){
	
});

//Função chamada pelo display fields sempre que abre o formulário
function exibeCampos(){
	
	//identificando se a tarefa está no início - temos que colocar o mode porque no primeiro preenchimento do relatorio, o state vem como null.
	//mode == ADD -> significa que está iniciando um preenchimento pela primeira vez.
	//state - verifica o codigo da tarefa, olhando o processo.
	if(mode == "ADD" || state == "4"){
		alert("Voce esta no inicio.");
	}else{
		//se nao estiver no início, desabilitamos os campos do formulario - somente leitura.
		gdfunctions.setReadOnly(".form-control"); //gdFunctions faz parte do pacote que o GIlmar enviou.
		
		//desabilitando o botao de incluir
		$("#add_produto").hide();
		
	}
	
}


//Função chamada sempre que o usuario clica em enviar formulário, serve para validação de campos utilizando throw para barrar o progresso
var beforeSendValidate = function(numState,nextState){  
    
	//alert("aqui faz a validacao de campo");
	
	//procura por todos os elementos do HTML que tenham a classe valida-valor e simula um for - percorre todos estes elementos.
	$(".valida-valor").each(function(){
			//quebrando a linha do Pai Filho
			var info = $(this).attr("name").split("___"); 
			if(info.length > 1){
				if($(this).val().trim() == "" || $(this).val().trim() == "0" ){
					throw "Formulario possui valores em branco. Favor verificar a linha "+info[1]+"."
				} 
			} 
	});
	
	return true;
	
}




//Função de Exmplo de zoom
function zoomFornecedor(){
	tdizoom.open("colleague", //dataset Id
			"colleagueName,Nome", //nome da coluna do dataset virgula (,) seu nome de exibição 
			"colleagueName", //coluna de retorno
			"Titulo", //titulo do dataset
			"", //filtro do dataset utilizando campo virgula (,) valor ex: colleagueName,Fernando
			"Identificador"); // identificador do zoom
}

//Função de Exmplo de zoom
function zoomProduto(obj){
	
	var nome = $(obj).prev("input").attr("name");
	
	tdizoom.open("cliente_rest_get", //dataset Id
			"produto,Produto,valor,Valor", //nome da coluna do dataset virgula (,) seu nome de exibição 
			"produto,item,valor", //coluna de retorno
			"Produtos", //titulo do dataset
			"", //filtro do dataset utilizando campo virgula (,) valor ex: colleagueName,Fernando
			nome); // identificador do zoom
}

//Função de retorno do zoom, sempre que vc escolher um registro no zoom será chamado está função
function setSelectedZoomItem(selectedItem){
	
	var info = selectedItem.type.split("___");
	
	//verificando se estamos em um pai filho
	if(info.length > 1){
		if (info[0] == "produto") {
			//alert("EXEMPLO - NOME "+ selectedItem.colleagueName);
			$("#produto___"+info[1]).val(selectedItem["produto"]);
			$("#item___"+info[1]).val(selectedItem["item"]);
			$("#valor___"+info[1]).val(selectedItem["valor"]);
		}
	}else{
		//verificando o identificado para saber quais campos vou utilizar
		if (selectedItem.type == "Identificador") {
			//alert("EXEMPLO - NOME "+ selectedItem.colleagueName);
			$("#fornecedor").val(selectedItem["colleagueName"]);
		}
	}
	
}

function fnCustomDelete(oElement){
	 
    //Customização
    alert ("Eliminando filho!");
 
    // Chamada a funcao padrao, NAO RETIRAR
    fnWdkRemoveChild(oElement);
 
    //Customização
    alert ("Filho eliminado!");
}    

function addProduto(){
	
	linha = wdkAddChild('produtos');
    $('#linha_produto').val(linha);
    
}    