use PW2

// Confederaciones con selecciones y jugadores embebidos
db.createCollection("confederaciones", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombreConfederacion", "selecciones"],
      properties: {
        nombreConfederacion: { bsonType: "string" },
        selecciones: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["nombreSeleccion", "jugadores"],
            properties: {
              nombreSeleccion: { bsonType: "string" },
              jugadores: {
                bsonType: "array",
                items: {
                  bsonType: "object",
                  required: ["nombreJugador"],
                  properties: {
                    nombreJugador: { bsonType: "string" }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
})

// Estadios con partidos embebidos
db.createCollection("estadios", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombreEstadio", "pais", "ciudad", "partidos"],
      properties: {
        nombreEstadio: { bsonType: "string" },
        pais: { bsonType: "string" },
        ciudad: { bsonType: "string" },
        capacidad: { bsonType: "int" },
        partidos: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["fecha"],
            properties: {
              fecha: { bsonType: "date" }
            }
          }
        }
      }
    }
  }
})

// Usuarios con referencias por ID
db.createCollection("usuarios", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["correo", "contrasena", "seleccionFav", "estadioFav"],
      properties: {
        correo: { bsonType: "string" },
        contrasena: { bsonType: "string" },
        seleccionFav: { bsonType: "int" }, // referencia por ID
        estadioFav: { bsonType: "int" }    // referencia por ID
      }
    }
  }
})
