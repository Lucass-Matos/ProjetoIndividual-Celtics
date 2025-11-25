//  Lista dos times adversários e onde estão as imagens deles.
var listaDeTimes = {
    pistons: { nome: 'Detroit Pistons', logo: 'img/LogoAdv/PistonsLogo.png' },
    wolves: { nome: 'Minnesota Timberwolves', logo: 'img/LogoAdv/WolvesLogo.png' },
    cavaliers: { nome: 'Cleveland Cavaliers', logo: 'img/LogoAdv/ClevelandLogo.png' },
    knicks: { nome: 'New York Knicks', logo: 'img/LogoAdv/KnicksLogo.png' },
    wizards: { nome: 'Washington Wizards', logo: 'img/LogoAdv/WizardsLogo.png' },
    lakers: { nome: 'Los Angeles Lakers', logo: 'img/LogoAdv/LakersLogo.png' }
};

// Criação dos vetores 
var palpitesC = []; 
var palpitesV = []; 
var resultadoC = []; 
var resultadoV = []; 




function validarSessao() {

    //  Verifica se o usuário fez login antes de entrar aqui
    var logado = sessionStorage.getItem('usuario_logado');
    
    if (logado != 'true') {
        alert("Você precisa fazer login para palpitar!");
        window.location.href = 'login1.html'; // Mando ele voltar pro login
    } else {
        carregarTime(); // Se tiver logado, carrego o time adversário
    }
}

function carregarTime() {

    // Aqui eu pego o nome do time que veio da URL 
    var parametros = new URLSearchParams(window.location.search);
    var timeEscolhido = parametros.get('time');

    // Se o time existir na minha lista, eu coloco o nome e a foto na tela
    if (listaDeTimes[timeEscolhido]) {
        var dados = listaDeTimes[timeEscolhido];
        
        document.getElementById('nome_adversario_titulo').innerHTML = dados.nome;
        document.getElementById('nome_adversario_box').innerHTML = dados.nome;
        document.getElementById('img_adversario').src = dados.logo;
        document.getElementById('img_adversario_placar').src = dados.logo;
    }
}

function sair() {
    sessionStorage.clear(); // Limpa a memória da sessão
    window.location.href = 'index.html'; // Volta pro começo
}


// SIMULAÇÃO DO JOGO 

function realizarSimulacao() {
    // Pego os valores que digitei nas inputs
    var c1 = Number(document.getElementById('palpite_c1').value);
    var c2 = Number(document.getElementById('palpite_c2').value);
    var c3 = Number(document.getElementById('palpite_c3').value);
    var c4 = Number(document.getElementById('palpite_c4').value);
    
    var v1 = Number(document.getElementById('palpite_v1').value);
    var v2 = Number(document.getElementById('palpite_v2').value);
    var v3 = Number(document.getElementById('palpite_v3').value);
    var v4 = Number(document.getElementById('palpite_v4').value);

    // Verificação se o usuário esqueceu de preencher algum campo
    if (c1 == 0 || c2 == 0 || c3 == 0 || c4 == 0 || v1 == 0 || v2 == 0 || v3 == 0 || v4 == 0) {
        alert("Preencha todos os campos antes de simular!");
        return; 
    }

    // Guarda os palpites nos vetores globais
    palpitesC = [c1, c2, c3, c4];
    palpitesV = [v1, v2, v3, v4];

    // Limpa os resultados anteriores
    resultadoC = [];
    resultadoV = [];
    
    // A função faz o computador "jogar" os 4 quartos
    for(var i = 0; i < 4; i++) {
        // Gera um número aleatório entre 20 e 35 pontos por quarto
        var pontosCeltics = parseInt(Math.random() * 16) + 20;
        var pontosVisitante = parseInt(Math.random() * 16) + 20;
        
        // Adiciono nos vetores de resultado
        resultadoC.push(pontosCeltics);
        resultadoV.push(pontosVisitante);
    }

    // Soma o total de pontos do jogo inteiro
    var totalC = 0;
    var totalV = 0;

    for(var i = 0; i < 4; i++) {
        totalC = totalC + resultadoC[i];
        totalV = totalV + resultadoV[i];
    }

    // Mostro o placar na tela
    document.getElementById('placar_celtics').innerHTML = totalC;
    document.getElementById('placar_visitante').innerHTML = totalV;


    //  DEFINO QUEM GANHOU E MUDO A COR 
    var mensagem = document.getElementById('msg_resultado');

    if(totalC > totalV) {
        mensagem.innerHTML = "VITÓRIA DOS CELTICS!";
        mensagem.className = "msg-vencedor texto-verde";  
    } else if (totalV > totalC) {
        mensagem.innerHTML = "VITÓRIA DO ADVERSÁRIO!";
        mensagem.className = "msg-vencedor texto-vermelho"; 
    } else {
        mensagem.innerHTML = "EMPATE!";
        mensagem.className = "msg-vencedor"; 
    }

    // Escondo a tela de palpite e mostro o resultado
    document.getElementById('etapa_palpite').style.display = 'none';
    document.getElementById('etapa_placar').style.display = 'block';
}


// DASHBOARD E CÁLCULOS FINAIS 

function verDashboard() {
    // Mudo de tela de novo de  Placar para a Dashboard
    document.getElementById('etapa_placar').style.display = 'none';
    document.getElementById('etapa_dashboard').style.display = 'flex';

    var totalPalpiteC = 0;
    var totalPalpiteV = 0;
    var totalRealC = 0;
    var totalRealV = 0;

    // Faz as somas de tudo de novo para calcular a estatística
    for(var i = 0; i < 4; i++) {
        totalPalpiteC += palpitesC[i];
        totalPalpiteV += palpitesV[i];
        totalRealC += resultadoC[i];
        totalRealV += resultadoV[i];
    }

    var somaPalpite = totalPalpiteC + totalPalpiteV;
    var somaReal = totalRealC + totalRealV;
    
    // Calcula a diferença para saber o erro
    var diferenca = somaReal - somaPalpite;

    // Se o numero for negativo, transformo em positivo
    if (diferenca < 0) {
        diferenca = diferenca * -1;
    }
    
    // Calcula a porcentagem de acerto
    var erro = (diferenca / somaReal) * 100;
    var acerto = 100 - erro;

    if (acerto < 0) acerto = 0; // Para não ficar negativo

    // Coloco os valores nos cards (KPIs)
    document.getElementById('kpi_palpite').innerHTML = somaPalpite;
    document.getElementById('kpi_real').innerHTML = somaReal;
    document.getElementById('kpi_acerto').innerHTML = acerto.toFixed(1) + "%";


    // SALVAR NO BANCO DE DADOS 
    // Pego o ID do usuário e envio tudo pro servidor via FETCH
    var idUser = sessionStorage.ID_USUARIO;

    fetch("/simulacao/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            idUsuarioServer: idUser,
            pCelticsServer: totalPalpiteC,
            pAdversarioServer: totalPalpiteV,
            rCelticsServer: totalRealC,
            rAdversarioServer: totalRealV,
            erroServer: erro
        })
    }).then(function(resposta) {
        if (resposta.ok) {
            console.log("Salvo no banco com sucesso!");
        } else {
            console.log("Erro ao salvar.");
        }
    });

    // Por fim, desenho os gráficos
    gerarGraficos();
}


//  CONFIGURAÇÃO DOS GRÁFICOS (Chart.js) 

function gerarGraficos() {
    // Gráfico do Celtics
    new Chart(document.getElementById("chartCeltics"), {
        type: "bar",
        data: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            datasets: [
                { label: "Seu Palpite", data: palpitesC, backgroundColor: "#ba9653" },
                { label: "Resultado Real", data: resultadoC, backgroundColor: "#007a33" },
            ],
        },
    });

    // Gráfico do Adversário
    new Chart(document.getElementById("chartVisitante"), {
        type: "bar",
        data: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            datasets: [
                { label: "Seu Palpite", data: palpitesV, backgroundColor: "#999" },
                { label: "Resultado Real", data: resultadoV, backgroundColor: "#d00" },
            ],
        },
    });
}