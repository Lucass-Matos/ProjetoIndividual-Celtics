var express = require("express");
var router = express.Router();

var simulacaoController = require("../controllers/simulacaoController");

// Define a rota "POST" para salvar

router.post("/cadastrar", function (req, res) {
    simulacaoController.salvar(req, res);
});

module.exports = router;