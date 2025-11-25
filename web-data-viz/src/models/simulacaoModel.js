var database = require("../database/config");

function salvar(idUsuario, pCeltics, pAdversario, rCeltics, rAdversario, erro) {
    
    // Insere os dados na tabela Simulacao
    var instrucao = `
        INSERT INTO Simulacao (fkUsuario, palpiteCeltics, palpiteAdversario,
         resultadoCeltics, resultadoAdversario, margemErro)
        VALUES (${idUsuario}, ${pCeltics}, ${pAdversario}, ${rCeltics}, ${rAdversario}, ${erro});
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    salvar
};

