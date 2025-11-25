var simulacaoModel = require("../models/simulacaoModel");

function salvar(req, res) {
    // Recuperando valores enviados pelo front-end
    var idUsuario = req.body.idUsuarioServer;
    var pCeltics = req.body.pCelticsServer;
    var pAdversario = req.body.pAdversarioServer;
    var rCeltics = req.body.rCelticsServer;
    var rAdversario = req.body.rAdversarioServer;
    var erro = req.body.erroServer;

    // Validação básica
    if (idUsuario == undefined) {
        res.status(400).send("Seu ID de usuário está undefined!");
    } else {
        
        // Passando os valores para o Model
        simulacaoModel.salvar(idUsuario, pCeltics, pAdversario, rCeltics, rAdversario, erro)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    salvar
}