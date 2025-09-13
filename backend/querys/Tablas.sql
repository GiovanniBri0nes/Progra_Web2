

-- confederaciones
 CREATE TABLE Confederaciones ( 
 Id_Confederacion INT PRIMARY KEY AUTO_INCREMENT, 
 NombreConfederacion VARCHAR(100) NOT NULL
 );
 
 -- Selecciones
 CREATE TABLE Selecciones ( 
 Id_Seleccion INT PRIMARY KEY AUTO_INCREMENT, 
 Nombre_Seleccion VARCHAR(100) NOT NULL, 
 Confederacion INT NOT NULL, 
 FOREIGN KEY (Confederacion) REFERENCES Confederaciones(Id_Confederacion)
 );
 
 -- Jugadores
 CREATE TABLE Jugadores ( 
 Id_Jugador INT PRIMARY KEY AUTO_INCREMENT,
 Nombre_Jugador VARCHAR(150) NOT NULL,
 Seleccion INT NOT NULL, 
 FOREIGN KEY (Seleccion) REFERENCES Selecciones(Id_Seleccion)
 );
 
 -- Estadios
 CREATE TABLE Estadios ( 
 Id_Estadio INT PRIMARY KEY AUTO_INCREMENT, 
 Nombre_Estadio VARCHAR(120) NOT NULL, 
 Pais VARCHAR(80) NOT NULL, 
 Ciudad VARCHAR(80) NOT NULL, 
 Capacidad INT ); 
 
 -- Partidos 
 CREATE TABLE Partidos ( 
 Id_Partido INT PRIMARY KEY AUTO_INCREMENT,
 Fecha DATETIME NOT NULL, Estadio INT NOT NULL, 
 FOREIGN KEY (Estadio) REFERENCES Estadios(Id_Estadio)
 ); 
 
 -- Usuarios 
 CREATE TABLE Usuarios ( 
 Id_Usuario INT PRIMARY KEY AUTO_INCREMENT, 
 Correo VARCHAR(150) NOT NULL UNIQUE, 
 Contrasena VARCHAR(256) NOT NULL, 
 Seleccion_Fav INT, Estadio_Fav INT,
 FOREIGN KEY (Seleccion_Fav) REFERENCES Selecciones(Id_Seleccion), 
 FOREIGN KEY (Estadio_Fav) REFERENCES Estadios(Id_Estadio)
 );