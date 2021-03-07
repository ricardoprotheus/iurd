function beforeTaskComplete(colleagueId, nextSequenceId, userList) {
    var user = getValue("WKUser");
    var atividade = getValue("WKNumState");

    var html = "";

    if (atividade == 0 || atividade == 4) {
        html += "Solicitante: " + hAPI.getCardValue("txt_Titulo") + "<br/>";
        html += "Descrição/Mensagem: " + hAPI.getCardValue("txtA_DescricaoMensagem") + "<br/>";
        html += "Equipamento com problema?: " + hAPI.getCardValue("problema_equipamento") + "<br/>";
        hAPI.setTaskComments(userId, numProcesso, 0, html);
    }
}