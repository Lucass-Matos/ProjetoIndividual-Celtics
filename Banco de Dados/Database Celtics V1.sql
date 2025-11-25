CREATE DATABASE celticsdb;
USE celticsdb;

CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    email VARCHAR(45) unique not null,
    senha VARCHAR(45) not null
);


select * from Usuario;

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
