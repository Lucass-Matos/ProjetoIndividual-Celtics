CREATE DATABASE celticsdb;
USE celticsdb;

CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(45),
    Palpites_idPalpites INT
);

CREATE TABLE Perfil (
    idPerfil INT PRIMARY KEY AUTO_INCREMENT,
    anosTorcendo INT,
    nivelTorcedor INT,
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Jogo (
    idJogo INT PRIMARY KEY AUTO_INCREMENT,
    adversario VARCHAR(45),
    dataJogo DATE,
    local VARCHAR(45)
);

CREATE TABLE Palpites (
    idPalpites INT PRIMARY KEY AUTO_INCREMENT,
    vencedor VARCHAR(45),
    placarCeltics VARCHAR(45),
    placarOponente VARCHAR(45),
    dataPalpite DATE,
    fkJogo INT,
    FOREIGN KEY (fkJogo) REFERENCES Jogo(idJogo)
);

CREATE TABLE EstatisticasEspeciais (
    idEstatisticasEspeciais INT PRIMARY KEY AUTO_INCREMENT,
    nomeEstatistica VARCHAR(45)
);

CREATE TABLE jogoEstatistica (
    EstatisticasEspeciais_idEstatisticasEspeciais INT,
    Jogo_idJogo INT,
    valor VARCHAR(45),
    FOREIGN KEY (EstatisticasEspeciais_idEstatisticasEspeciais) REFERENCES EstatisticasEspeciais(idEstatisticasEspeciais),
    FOREIGN KEY (Jogo_idJogo) REFERENCES Jogo(idJogo)
);

INSERT INTO Usuario (nome, email, senha) VALUES
('Lucas', 'lucas@gmail.com', '123'),
('Marcos', 'marcos@gmail.com', 'abc'),
('Ana', 'ana@gmail.com', 'senha');

INSERT INTO Perfil (anosTorcendo, nivelTorcedor, fkUsuario) VALUES
(5, 3, 1),
(10, 5, 2),
(2, 1, 3);

INSERT INTO Jogo (adversario, dataJogo, local) VALUES
('Lakers', '2025-01-10', 'Boston'),
('Heat', '2025-02-20', 'Miami'),
('Bulls', '2025-03-15', 'Chicago');

INSERT INTO Palpites (vencedor, placarCeltics, placarOponente, dataPalpite, fkJogo) VALUES
('Celtics', '110', '102', '2025-01-08', 1),
('Heat', '98', '105', '2025-02-18', 2),
('Celtics', '120', '115', '2025-03-10', 3);

INSERT INTO EstatisticasEspeciais (nomeEstatistica) VALUES
('Rebotes'),
('Assistencias'),
('Tocos');

INSERT INTO jogoEstatistica (EstatisticasEspeciais_idEstatisticasEspeciais, Jogo_idJogo, valor) VALUES
(1, 1, '55'),
(2, 1, '28'),
(3, 1, '7'),
(1, 2, '48'),
(2, 2, '22'),
(1, 3, '60');

CREATE VIEW view_palpites_jogos AS
SELECT p.idPalpites, p.vencedor, p.placarCeltics, p.placarOponente, j.adversario, j.dataJogo
FROM Palpites p
JOIN Jogo j ON j.idJogo = p.fkJogo;

CREATE VIEW view_estatisticas AS
SELECT j.adversario, e.nomeEstatistica, je.valor
FROM jogoEstatistica je
JOIN EstatisticasEspeciais e ON e.idEstatisticasEspeciais = je.EstatisticasEspeciais_idEstatisticasEspeciais
JOIN Jogo j ON j.idJogo = je.Jogo_idJogo;

SELECT u.nome, COUNT(p.idPalpites) AS totalPalpites
FROM Usuario u
LEFT JOIN Palpites p ON u.Palpites_idPalpites = p.idPalpites
GROUP BY u.idUsuario;

SELECT j.adversario, AVG(je.valor) AS mediaValor
FROM jogoEstatistica je
JOIN Jogo j ON j.idJogo = je.Jogo_idJogo
GROUP BY j.idJogo;

SELECT j.adversario, MIN(je.valor) AS menorValor, MAX(je.valor) AS maiorValor
FROM jogoEstatistica je
JOIN Jogo j ON j.idJogo = je.Jogo_idJogo
GROUP BY j.idJogo;

SELECT * FROM view_palpites_jogos;
SELECT * FROM view_estatisticas;
