// Crear/usar base de datos de programación web 2
use PW2

// Limpiar colecciones (si ya existen)
db.confederaciones.drop();
db.estadios.drop();
db.usuarios.drop();

// Crear coleccion de confederaciones
db.createCollection("confederaciones");

// Insertar datos de CONMEBOL - Sudamerica
db.confederaciones.insertOne({
  nombreConfederacion: "CONMEBOL",
  selecciones: [
    {
      _id: ObjectId(),
      nombreSeleccion: "Argentina",
      jugadores: [
        { _id: ObjectId(), nombreJugador: "Emiliano Martinez" },
        { _id: ObjectId(), nombreJugador: "Cristian Romero" },
        { _id: ObjectId(), nombreJugador: "Nicolas Otamendi" },
        { _id: ObjectId(), nombreJugador: "Nahuel Molina" },
        { _id: ObjectId(), nombreJugador: "Angel Di Maria" },
        { _id: ObjectId(), nombreJugador: "Rodrigo De Paul" },
        { _id: ObjectId(), nombreJugador: "Enzo Fernandez" },
        { _id: ObjectId(), nombreJugador: "Lionel Messi" },
        { _id: ObjectId(), nombreJugador: "Lautaro Martinez" },
        { _id: ObjectId(), nombreJugador: "Julian Alvarez" },
        { _id: ObjectId(), nombreJugador: "Alexis Mac Allister" }
      ]
    },
    {
      _id: ObjectId(),
      nombreSeleccion: "Brasil",
      jugadores: [
        { _id: ObjectId(), nombreJugador: "Alisson Becker" },
        { _id: ObjectId(), nombreJugador: "Marquinhos" },
        { _id: ObjectId(), nombreJugador: "Eder Militao" },
        { _id: ObjectId(), nombreJugador: "Danilo" },
        { _id: ObjectId(), nombreJugador: "Casemiro" },
        { _id: ObjectId(), nombreJugador: "Lucas Paqueta" },
        { _id: ObjectId(), nombreJugador: "Neymar Jr" },
        { _id: ObjectId(), nombreJugador: "Vinicius Jr" },
        { _id: ObjectId(), nombreJugador: "Rodrygo" },
        { _id: ObjectId(), nombreJugador: "Raphinha" },
        { _id: ObjectId(), nombreJugador: "Richarlison" }
      ]
    },
    {
      _id: ObjectId(),
      nombreSeleccion: "Uruguay",
      jugadores: [
        { _id: ObjectId(), nombreJugador: "Sergio Rochet" },
        { _id: ObjectId(), nombreJugador: "Jose Gimenez" },
        { _id: ObjectId(), nombreJugador: "Ronald Araujo" },
        { _id: ObjectId(), nombreJugador: "Mathias Olivera" },
        { _id: ObjectId(), nombreJugador: "Federico Valverde" },
        { _id: ObjectId(), nombreJugador: "Manuel Ugarte" },
        { _id: ObjectId(), nombreJugador: "Rodrigo Bentancur" },
        { _id: ObjectId(), nombreJugador: "Facundo Pellistri" },
        { _id: ObjectId(), nombreJugador: "Darwin Nunez" },
        { _id: ObjectId(), nombreJugador: "Luis Suarez" },
        { _id: ObjectId(), nombreJugador: "Maximiliano Araujo" }
      ]
    },
    {
      _id: ObjectId(),
      nombreSeleccion: "Colombia",
      jugadores: [
        { _id: ObjectId(), nombreJugador: "Camilo Vargas" },
        { _id: ObjectId(), nombreJugador: "Davinson Sanchez" },
        { _id: ObjectId(), nombreJugador: "Carlos Cuesta" },
        { _id: ObjectId(), nombreJugador: "Daniel Munoz" },
        { _id: ObjectId(), nombreJugador: "Jefferson Lerma" },
        { _id: ObjectId(), nombreJugador: "Richard Rios" },
        { _id: ObjectId(), nombreJugador: "James Rodriguez" },
        { _id: ObjectId(), nombreJugador: "Luis Diaz" },
        { _id: ObjectId(), nombreJugador: "Juan Cuadrado" },
        { _id: ObjectId(), nombreJugador: "Rafael Santos Borre" },
        { _id: ObjectId(), nombreJugador: "Jhon Duran" }
      ]
    },
    {
      _id: ObjectId(),
      nombreSeleccion: "Ecuador",
      jugadores: [
        { _id: ObjectId(), nombreJugador: "Alexander Dominguez" },
        { _id: ObjectId(), nombreJugador: "Piero Hincapie" },
        { _id: ObjectId(), nombreJugador: "Felix Torres" },
        { _id: ObjectId(), nombreJugador: "Pervis Estupinan" },
        { _id: ObjectId(), nombreJugador: "Moises Caicedo" },
        { _id: ObjectId(), nombreJugador: "Jeremy Sarmiento" },
        { _id: ObjectId(), nombreJugador: "Kendry Paez" },
        { _id: ObjectId(), nombreJugador: "Alan Franco" },
        { _id: ObjectId(), nombreJugador: "Enner Valencia" },
        { _id: ObjectId(), nombreJugador: "Kevin Rodriguez" },
        { _id: ObjectId(), nombreJugador: "Gonzalo Plata" }
      ]
    },
    {
      _id: ObjectId(),
      nombreSeleccion: "Paraguay",
      jugadores: [
        { _id: ObjectId(), nombreJugador: "Carlos Coronel" },
        { _id: ObjectId(), nombreJugador: "Gustavo Gomez" },
        { _id: ObjectId(), nombreJugador: "Fabian Balbuena" },
        { _id: ObjectId(), nombreJugador: "Junior Alonso" },
        { _id: ObjectId(), nombreJugador: "Miguel Almiron" },
        { _id: ObjectId(), nombreJugador: "Mathias Villasanti" },
        { _id: ObjectId(), nombreJugador: "Richard Sanchez" },
        { _id: ObjectId(), nombreJugador: "Angel Romero" },
        { _id: ObjectId(), nombreJugador: "Julio Enciso" },
        { _id: ObjectId(), nombreJugador: "Alex Arce" },
        { _id: ObjectId(), nombreJugador: "Ramon Sosa" }
      ]
    }
  ]
});

// Insertar datos de CONCACAF - Norte y Centroamerica
db.confederaciones.insertOne({
  nombreConfederacion: "CONCACAF",
  selecciones: [
    {
      _id: ObjectId(),
      nombreSeleccion: "Mexico",
      jugadores: [
        { _id: ObjectId(), nombreJugador: "Guillermo Ochoa" },
        { _id: ObjectId(), nombreJugador: "Cesar Montes" },
        { _id: ObjectId(), nombreJugador: "Johan Vasquez" },
        { _id: ObjectId(), nombreJugador: "Jorge Sanchez" },
        { _id: ObjectId(), nombreJugador: "Edson Alvarez" },
        { _id: ObjectId(), nombreJugador: "Luis Chavez" },
        { _id: ObjectId(), nombreJugador: "Hector Herrera" },
        { _id: ObjectId(), nombreJugador: "Hirving Lozano" },
        { _id: ObjectId(), nombreJugador: "Alexis Vega" },
        { _id: ObjectId(), nombreJugador: "Raul Jimenez" },
        { _id: ObjectId(), nombreJugador: "Santiago Gimenez" }
      ]
    },
    {
      _id: ObjectId(),
      nombreSeleccion: "Estados Unidos",
      jugadores: [
        { _id: ObjectId(), nombreJugador: "Matt Turner" },
        { _id: ObjectId(), nombreJugador: "Sergino Dest" },
        { _id: ObjectId(), nombreJugador: "Chris Richards" },
        { _id: ObjectId(), nombreJugador: "Antonee Robinson" },
        { _id: ObjectId(), nombreJugador: "Tyler Adams" },
        { _id: ObjectId(), nombreJugador: "Weston McKennie" },
        { _id: ObjectId(), nombreJugador: "Yunus Musah" },
        { _id: ObjectId(), nombreJugador: "Christian Pulisic" },
        { _id: ObjectId(), nombreJugador: "Gio Reyna" },
        { _id: ObjectId(), nombreJugador: "Timothy Weah" },
        { _id: ObjectId(), nombreJugador: "Folarin Balogun" }
      ]
    },
    {
      _id: ObjectId(),
      nombreSeleccion: "Canada",
      jugadores: [
        { _id: ObjectId(), nombreJugador: "Milan Borjan" },
        { _id: ObjectId(), nombreJugador: "Alistair Johnston" },
        { _id: ObjectId(), nombreJugador: "Steven Vitoria" },
        { _id: ObjectId(), nombreJugador: "Kamal Miller" },
        { _id: ObjectId(), nombreJugador: "Alphonso Davies" },
        { _id: ObjectId(), nombreJugador: "Stephen Eustaquio" },
        { _id: ObjectId(), nombreJugador: "Jonathan Osorio" },
        { _id: ObjectId(), nombreJugador: "Tajon Buchanan" },
        { _id: ObjectId(), nombreJugador: "Jonathan David" },
        { _id: ObjectId(), nombreJugador: "Cyle Larin" },
        { _id: ObjectId(), nombreJugador: "Ismael Kone" }
      ]
    }
  ]
});

// Insertar datos de UEFA - Europa
db.confederaciones.insertOne({
  nombreConfederacion: "UEFA",
  selecciones: [
    {
      _id: ObjectId(),
      nombreSeleccion: "Espana",
      jugadores: [
        { _id: ObjectId(), nombreJugador: "Unai Simon" },
        { _id: ObjectId(), nombreJugador: "Dani Carvajal" },
        { _id: ObjectId(), nombreJugador: "Aymeric Laporte" },
        { _id: ObjectId(), nombreJugador: "Pau Torres" },
        { _id: ObjectId(), nombreJugador: "Jordi Alba" },
        { _id: ObjectId(), nombreJugador: "Rodri" },
        { _id: ObjectId(), nombreJugador: "Gavi" },
        { _id: ObjectId(), nombreJugador: "Pedri" },
        { _id: ObjectId(), nombreJugador: "Ferran Torres" },
        { _id: ObjectId(), nombreJugador: "Alvaro Morata" },
        { _id: ObjectId(), nombreJugador: "Ansu Fati" }
      ]
    },
    {
      _id: ObjectId(),
      nombreSeleccion: "Francia",
      jugadores: [
        { _id: ObjectId(), nombreJugador: "Hugo Lloris" },
        { _id: ObjectId(), nombreJugador: "Jules Kounde" },
        { _id: ObjectId(), nombreJugador: "Raphael Varane" },
        { _id: ObjectId(), nombreJugador: "Dayot Upamecano" },
        { _id: ObjectId(), nombreJugador: "Theo Hernandez" },
        { _id: ObjectId(), nombreJugador: "Aurelien Tchouameni" },
        { _id: ObjectId(), nombreJugador: "Eduardo Camavinga" },
        { _id: ObjectId(), nombreJugador: "Antoine Griezmann" },
        { _id: ObjectId(), nombreJugador: "Kylian Mbappe" },
        { _id: ObjectId(), nombreJugador: "Ousmane Dembele" },
        { _id: ObjectId(), nombreJugador: "Kingsley Coman" }
      ]
    },
    {
      _id: ObjectId(),
      nombreSeleccion: "Inglaterra",
      jugadores: [
        { _id: ObjectId(), nombreJugador: "Jordan Pickford" },
        { _id: ObjectId(), nombreJugador: "Kyle Walker" },
        { _id: ObjectId(), nombreJugador: "Harry Maguire" },
        { _id: ObjectId(), nombreJugador: "John Stones" },
        { _id: ObjectId(), nombreJugador: "Luke Shaw" },
        { _id: ObjectId(), nombreJugador: "Declan Rice" },
        { _id: ObjectId(), nombreJugador: "Jude Bellingham" },
        { _id: ObjectId(), nombreJugador: "Phil Foden" },
        { _id: ObjectId(), nombreJugador: "Bukayo Saka" },
        { _id: ObjectId(), nombreJugador: "Harry Kane" },
        { _id: ObjectId(), nombreJugador: "Marcus Rashford" }
      ]
    },
    {
      _id: ObjectId(),
      nombreSeleccion: "Alemania",
      jugadores: [
        { _id: ObjectId(), nombreJugador: "Manuel Neuer" },
        { _id: ObjectId(), nombreJugador: "Joshua Kimmich" },
        { _id: ObjectId(), nombreJugador: "Antonio Rudiger" },
        { _id: ObjectId(), nombreJugador: "Niklas Sule" },
        { _id: ObjectId(), nombreJugador: "David Raum" },
        { _id: ObjectId(), nombreJugador: "Ilkay Gundogan" },
        { _id: ObjectId(), nombreJugador: "Leon Goretzka" },
        { _id: ObjectId(), nombreJugador: "Jamal Musiala" },
        { _id: ObjectId(), nombreJugador: "Leroy Sane" },
        { _id: ObjectId(), nombreJugador: "Kai Havertz" },
        { _id: ObjectId(), nombreJugador: "Serge Gnabry" }
      ]
    },
    {
      _id: ObjectId(),
      nombreSeleccion: "Portugal",
      jugadores: [
        { _id: ObjectId(), nombreJugador: "Diogo Costa" },
        { _id: ObjectId(), nombreJugador: "Joao Cancelo" },
        { _id: ObjectId(), nombreJugador: "Ruben Dias" },
        { _id: ObjectId(), nombreJugador: "Pepe" },
        { _id: ObjectId(), nombreJugador: "Nuno Mendes" },
        { _id: ObjectId(), nombreJugador: "Joao Palhinha" },
        { _id: ObjectId(), nombreJugador: "Bruno Fernandes" },
        { _id: ObjectId(), nombreJugador: "Bernardo Silva" },
        { _id: ObjectId(), nombreJugador: "Rafael Leao" },
        { _id: ObjectId(), nombreJugador: "Cristiano Ronaldo" },
        { _id: ObjectId(), nombreJugador: "Goncalo Ramos" }
      ]
    }
  ]
});

// Insertar datos de AFC - Asia
db.confederaciones.insertOne({
  nombreConfederacion: "AFC",
  selecciones: [
    {
      _id: ObjectId(),
      nombreSeleccion: "Japon",
      jugadores: [
        { _id: ObjectId(), nombreJugador: "Shuichi Gonda" },
        { _id: ObjectId(), nombreJugador: "Hiroki Sakai" },
        { _id: ObjectId(), nombreJugador: "Maya Yoshida" },
        { _id: ObjectId(), nombreJugador: "Ko Itakura" },
        { _id: ObjectId(), nombreJugador: "Yuto Nagatomo" },
        { _id: ObjectId(), nombreJugador: "Wataru Endo" },
        { _id: ObjectId(), nombreJugador: "Daichi Kamada" },
        { _id: ObjectId(), nombreJugador: "Takefusa Kubo" },
        { _id: ObjectId(), nombreJugador: "Takumi Minamino" },
        { _id: ObjectId(), nombreJugador: "Kaoru Mitoma" },
        { _id: ObjectId(), nombreJugador: "Junya Ito" }
      ]
    },
    {
      _id: ObjectId(),
      nombreSeleccion: "Corea del Sur",
      jugadores: [
        { _id: ObjectId(), nombreJugador: "Kim Seung-gyu" },
        { _id: ObjectId(), nombreJugador: "Kim Min-jae" },
        { _id: ObjectId(), nombreJugador: "Kim Young-gwon" },
        { _id: ObjectId(), nombreJugador: "Kim Moon-hwan" },
        { _id: ObjectId(), nombreJugador: "Kim Jin-su" },
        { _id: ObjectId(), nombreJugador: "Jung Woo-young" },
        { _id: ObjectId(), nombreJugador: "Hwang In-beom" },
        { _id: ObjectId(), nombreJugador: "Lee Kang-in" },
        { _id: ObjectId(), nombreJugador: "Son Heung-min" },
        { _id: ObjectId(), nombreJugador: "Hwang Hee-chan" },
        { _id: ObjectId(), nombreJugador: "Cho Gue-sung" }
      ]
    },
    {
      _id: ObjectId(),
      nombreSeleccion: "Iran",
      jugadores: [
        { _id: ObjectId(), nombreJugador: "Alireza Beiranvand" },
        { _id: ObjectId(), nombreJugador: "Sadegh Moharrami" },
        { _id: ObjectId(), nombreJugador: "Hossein Kanaani" },
        { _id: ObjectId(), nombreJugador: "Shoja Khalilzadeh" },
        { _id: ObjectId(), nombreJugador: "Milad Mohammadi" },
        { _id: ObjectId(), nombreJugador: "Saeid Ezatolahi" },
        { _id: ObjectId(), nombreJugador: "Ahmad Nourollahi" },
        { _id: ObjectId(), nombreJugador: "Alireza Jahanbakhsh" },
        { _id: ObjectId(), nombreJugador: "Mehdi Taremi" },
        { _id: ObjectId(), nombreJugador: "Sardar Azmoun" },
        { _id: ObjectId(), nombreJugador: "Karim Ansarifard" }
      ]
    },
    {
      _id: ObjectId(),
      nombreSeleccion: "Australia",
      jugadores: [
        { _id: ObjectId(), nombreJugador: "Mathew Ryan" },
        { _id: ObjectId(), nombreJugador: "Nathaniel Atkinson" },
        { _id: ObjectId(), nombreJugador: "Harry Souttar" },
        { _id: ObjectId(), nombreJugador: "Kye Rowles" },
        { _id: ObjectId(), nombreJugador: "Aziz Behich" },
        { _id: ObjectId(), nombreJugador: "Aaron Mooy" },
        { _id: ObjectId(), nombreJugador: "Jackson Irvine" },
        { _id: ObjectId(), nombreJugador: "Ajdin Hrustic" },
        { _id: ObjectId(), nombreJugador: "Riley McGree" },
        { _id: ObjectId(), nombreJugador: "Mathew Leckie" },
        { _id: ObjectId(), nombreJugador: "Mitchell Duke" }
      ]
    }
  ]
});

// Insertar datos de CAF - Africa
db.confederaciones.insertOne({
  nombreConfederacion: "CAF",
  selecciones: [
    {
      _id: ObjectId(),
      nombreSeleccion: "Marruecos",
      jugadores: [
        { _id: ObjectId(), nombreJugador: "Yassine Bounou" },
        { _id: ObjectId(), nombreJugador: "Achraf Hakimi" },
        { _id: ObjectId(), nombreJugador: "Nayef Aguerd" },
        { _id: ObjectId(), nombreJugador: "Romain Saiss" },
        { _id: ObjectId(), nombreJugador: "Noussair Mazraoui" },
        { _id: ObjectId(), nombreJugador: "Sofyan Amrabat" },
        { _id: ObjectId(), nombreJugador: "Azzedine Ounahi" },
        { _id: ObjectId(), nombreJugador: "Hakim Ziyech" },
        { _id: ObjectId(), nombreJugador: "Youssef En-Nesyri" },
        { _id: ObjectId(), nombreJugador: "Sofiane Boufal" },
        { _id: ObjectId(), nombreJugador: "Amine Harit" }
      ]
    },
    {
      _id: ObjectId(),
      nombreSeleccion: "Egipto",
      jugadores: [
        { _id: ObjectId(), nombreJugador: "Mohamed El Shenawy" },
        { _id: ObjectId(), nombreJugador: "Ahmed Hegazi" },
        { _id: ObjectId(), nombreJugador: "Mohamed Abdelmonem" },
        { _id: ObjectId(), nombreJugador: "Omar Kamal" },
        { _id: ObjectId(), nombreJugador: "Mohamed Hany" },
        { _id: ObjectId(), nombreJugador: "Mohamed Elneny" },
        { _id: ObjectId(), nombreJugador: "Hamdi Fathi" },
        { _id: ObjectId(), nombreJugador: "Mahmoud Hassan" },
        { _id: ObjectId(), nombreJugador: "Mohamed Salah" },
        { _id: ObjectId(), nombreJugador: "Omar Marmoush" },
        { _id: ObjectId(), nombreJugador: "Mostafa Mohamed" }
      ]
    },
    {
      _id: ObjectId(),
      nombreSeleccion: "Tunez",
      jugadores: [
        { _id: ObjectId(), nombreJugador: "Aymen Dahmen" },
        { _id: ObjectId(), nombreJugador: "Ali Maaloul" },
        { _id: ObjectId(), nombreJugador: "Dylan Bronn" },
        { _id: ObjectId(), nombreJugador: "Montassar Talbi" },
        { _id: ObjectId(), nombreJugador: "Wajdi Kechrida" },
        { _id: ObjectId(), nombreJugador: "Aissa Laidouni" },
        { _id: ObjectId(), nombreJugador: "Ellyes Skhiri" },
        { _id: ObjectId(), nombreJugador: "Youssef Msakni" },
        { _id: ObjectId(), nombreJugador: "Anis Ben Slimane" },
        { _id: ObjectId(), nombreJugador: "Wahbi Khazri" },
        { _id: ObjectId(), nombreJugador: "Naim Sliti" }
      ]
    }
  ]
});

// Insertar datos de OFC - Oceania
db.confederaciones.insertOne({
  nombreConfederacion: "OFC",
  selecciones: [
    {
      _id: ObjectId(),
      nombreSeleccion: "Nueva Zelanda",
      jugadores: [
        { _id: ObjectId(), nombreJugador: "Oliver Sail" },
        { _id: ObjectId(), nombreJugador: "Liberato Cacace" },
        { _id: ObjectId(), nombreJugador: "Tommy Smith" },
        { _id: ObjectId(), nombreJugador: "Winston Reid" },
        { _id: ObjectId(), nombreJugador: "Dane Ingham" },
        { _id: ObjectId(), nombreJugador: "Joe Bell" },
        { _id: ObjectId(), nombreJugador: "Marko Stamenic" },
        { _id: ObjectId(), nombreJugador: "Matthew Garbett" },
        { _id: ObjectId(), nombreJugador: "Marco Rojas" },
        { _id: ObjectId(), nombreJugador: "Chris Wood" },
        { _id: ObjectId(), nombreJugador: "Elijah Just" }
      ]
    }
  ]
});

print("Confederaciones insertadas exitosamente");

// Crear coleccion de estadios
db.createCollection("estadios");

// Insertar estadios de Mexico
db.estadios.insertMany([
  {
    nombreEstadio: "Estadio Azteca",
    pais: "Mexico",
    ciudad: "Ciudad de Mexico",
    capacidad: 83264,
    partidos: [
      { _id: ObjectId(), fecha: new Date("2026-06-11"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-17"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-24"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-30"), fase: "Eliminatorias" },
      { _id: ObjectId(), fecha: new Date("2026-07-05"), fase: "Eliminatorias" }
    ]
  },
  {
    nombreEstadio: "Estadio Akron",
    pais: "Mexico",
    ciudad: "Guadalajara",
    capacidad: 46232,
    partidos: [
      { _id: ObjectId(), fecha: new Date("2026-06-11"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-18"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-23"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-26"), fase: "Grupos" }
    ]
  },
  {
    nombreEstadio: "Estadio BBVA",
    pais: "Mexico",
    ciudad: "Monterrey",
    capacidad: 51348,
    partidos: [
      { _id: ObjectId(), fecha: new Date("2026-06-14"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-20"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-24"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-29"), fase: "Eliminatorias" }
    ]
  }
]);

// Insertar estadios de Estados Unidos
db.estadios.insertMany([
  {
    nombreEstadio: "MetLife Stadium",
    pais: "Estados Unidos",
    ciudad: "Nueva York/Nueva Jersey",
    capacidad: 82500,
    partidos: [
      { _id: ObjectId(), fecha: new Date("2026-06-13"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-16"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-22"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-25"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-27"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-30"), fase: "Eliminatorias" },
      { _id: ObjectId(), fecha: new Date("2026-07-05"), fase: "Eliminatorias" },
      { _id: ObjectId(), fecha: new Date("2026-07-19"), fase: "Final" }
    ]
  },
  {
    nombreEstadio: "SoFi Stadium",
    pais: "Estados Unidos",
    ciudad: "Los Angeles",
    capacidad: 70000,
    partidos: [
      { _id: ObjectId(), fecha: new Date("2026-06-12"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-15"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-18"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-21"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-25"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-28"), fase: "Eliminatorias" },
      { _id: ObjectId(), fecha: new Date("2026-07-02"), fase: "Eliminatorias" },
      { _id: ObjectId(), fecha: new Date("2026-07-10"), fase: "Eliminatorias" }
    ]
  },
  {
    nombreEstadio: "AT&T Stadium",
    pais: "Estados Unidos",
    ciudad: "Dallas",
    capacidad: 80000,
    partidos: [
      { _id: ObjectId(), fecha: new Date("2026-06-14"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-17"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-22"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-25"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-27"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-30"), fase: "Eliminatorias" },
      { _id: ObjectId(), fecha: new Date("2026-07-03"), fase: "Eliminatorias" },
      { _id: ObjectId(), fecha: new Date("2026-07-06"), fase: "Eliminatorias" },
      { _id: ObjectId(), fecha: new Date("2026-07-14"), fase: "Eliminatorias" }
    ]
  },
  {
    nombreEstadio: "Hard Rock Stadium",
    pais: "Estados Unidos",
    ciudad: "Miami",
    capacidad: 75540,
    partidos: [
      { _id: ObjectId(), fecha: new Date("2026-06-15"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-21"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-24"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-27"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-07-03"), fase: "Eliminatorias" },
      { _id: ObjectId(), fecha: new Date("2026-07-11"), fase: "Eliminatorias" },
      { _id: ObjectId(), fecha: new Date("2026-07-18"), fase: "Eliminatorias" }
    ]
  }
]);

// Insertar estadios de Canada
db.estadios.insertMany([
  {
    nombreEstadio: "BC Place",
    pais: "Canada",
    ciudad: "Vancouver",
    capacidad: 54500,
    partidos: [
      { _id: ObjectId(), fecha: new Date("2026-06-13"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-18"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-21"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-24"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-26"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-07-02"), fase: "Eliminatorias" },
      { _id: ObjectId(), fecha: new Date("2026-07-07"), fase: "Eliminatorias" }
    ]
  },
  {
    nombreEstadio: "BMO Field",
    pais: "Canada",
    ciudad: "Toronto",
    capacidad: 30000,
    partidos: [
      { _id: ObjectId(), fecha: new Date("2026-06-12"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-17"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-20"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-23"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-06-26"), fase: "Grupos" },
      { _id: ObjectId(), fecha: new Date("2026-07-02"), fase: "Eliminatorias" }
    ]
  }
]);

print("Estadios insertados exitosamente");

// Crear coleccion de usuarios
db.createCollection("usuarios");

// Insertar usuarios de prueba
db.usuarios.insertMany([
  {
    correo: "prueba@gmail.com",
    contrasena: "admin1234",
    seleccionFav: ObjectId("68e8bd92f28b549379cebeed"), // Reemplazar con un ObjectId válido de una selección
    estadioFav: ObjectId("68e8b875d51209951ecebfbf"), // Reemplazar con un ObjectId válido de un estadio
  },
  {
    correo: "prueba2@gmail.com",
    contrasena: "admin1234",
    seleccionFav: ObjectId("68e8bd91f28b549379cebea4"), // Reemplazar con un ObjectId válido de una selección
    estadioFav: ObjectId("68e8aa2be961bb4591cebfc0"), // Reemplazar con un ObjectId válido de un estadio
  }
]);

print("Usuarios insertados exitosamente");

print("Todas las colecciones creadas exitosamente");