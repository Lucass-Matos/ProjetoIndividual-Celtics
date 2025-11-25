
CREATE DATABASE celticsdbvfinal;
USE celticsdbvfinal;

-- Tabela de Usuários (Para Login e Cadastro)
CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    email VARCHAR(45) UNIQUE NOT NULL,
    senha VARCHAR(45) NOT NULL
);

select * from Usuario;

-- Tabela de Jogos (Para listar na Home e no Menu)
-- Serve para saber quais jogos existem, data e local.

CREATE TABLE Jogo (
    idJogo INT PRIMARY KEY AUTO_INCREMENT,
    adversario VARCHAR(45),
    dataJogo DATE,
    local VARCHAR(45)
);


-- Tabela de Simulação 
-- Armazena NÚMEROS (INT/DECIMAL) para gerar os gráficos na Dashboard.

CREATE TABLE Simulacao (
    idSimulacao INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT,
    dataSimulacao DATETIME DEFAULT CURRENT_TIMESTAMP,

    -- O que o usuário digitou (Soma dos 4 quartos)
    palpiteCeltics INT,
    palpiteAdversario INT,
    
    -- O que o Math.random() gerou (Soma dos 4 quartos)
    resultadoCeltics INT,
    resultadoAdversario INT,
    
    -- A métrica principal da Dashboard
    margemErro DECIMAL(5,2),
    
 
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario)
);

select * from Simulacao;


-- INSERTS OBRIGATÓRIOS 

INSERT INTO Jogo (adversario, dataJogo, local) VALUES 
('Detroit Pistons', '2025-11-26', 'TD Garden'),
('Minnesota Timberwolves', '2025-11-29', 'Target Center'),
('Cleveland Cavaliers', '2025-11-30', 'Rocket Mortgage FieldHouse'),
('New York Knicks', '2025-12-02', 'TD Garden'),
('Washington Wizards', '2025-12-04', 'Capital One Arena'),
('Los Angeles Lakers', '2025-12-05', 'TD Garden');

-- Conferindo se está tudo certo
SELECT * FROM Jogo;



