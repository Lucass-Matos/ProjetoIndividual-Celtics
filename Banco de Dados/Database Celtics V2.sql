
CREATE DATABASE celticsdb2;
USE celticsdb2;


CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    email VARCHAR(45) UNIQUE NOT NULL,
    senha VARCHAR(45) NOT NULL
);
select * from Usuario;

CREATE TABLE Jogo (
    idJogo INT PRIMARY KEY AUTO_INCREMENT,
    adversario VARCHAR(45),
    dataJogo DATE,
    local VARCHAR(45)
);


CREATE TABLE Simulacao (
    idSimulacao INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT,
    dataSimulacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    

    palpiteCeltics INT,
    palpiteAdversario INT,

    resultadoCeltics INT,
    resultadoAdversario INT,
    

    margemErro DECIMAL(5,2),

    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario)
);

select * from Simulacao;


INSERT INTO Jogo (adversario, dataJogo, local) VALUES 
('Detroit Pistons', '2025-11-26', 'TD Garden'),
('Minnesota Timberwolves', '2025-11-29', 'Target Center'),
('Cleveland Cavaliers', '2025-11-30', 'Rocket Mortgage FieldHouse'),
('New York Knicks', '2025-12-02', 'TD Garden'),
('Washington Wizards', '2025-12-04', 'Capital One Arena'),
('Los Angeles Lakers', '2025-12-05', 'TD Garden');


SELECT * FROM Jogo;