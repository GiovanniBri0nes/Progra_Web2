use PW2

// Confederaciones
db.createCollection("confederaciones", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombreConfederacion"],
      properties: {
        nombreConfederacion: { bsonType: "string" }
      }
    }
  }
})

// Selecciones
db.createCollection("selecciones", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombreSeleccion", "confederacion"],
      properties: {
        nombreSeleccion: { bsonType: "string" },
        confederacion: { bsonType: "objectId" } // referencia a confederaciones
      }
    }
  }
})

// Jugadores
db.createCollection("jugadores", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombreJugador", "seleccion"],
      properties: {
        nombreJugador: { bsonType: "string" },
        seleccion: { bsonType: "objectId" } // referencia a selecciones
      }
    }
  }
})

// Estadios
db.createCollection("estadios", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombreEstadio", "pais", "ciudad"],
      properties: {
        nombreEstadio: { bsonType: "string" },
        pais: { bsonType: "string" },
        ciudad: { bsonType: "string" },
        capacidad: { bsonType: "int" }
      }
    }
  }
})

// Partidos
db.createCollection("partidos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["fecha", "estadio"],
      properties: {
        fecha: { bsonType: "date" },
        estadio: { bsonType: "objectId" } // referencia a estadios
      }
    }
  }
})

// Usuarios
db.createCollection("usuarios", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["correo", "contrasena"],
      properties: {
        correo: { bsonType: "string" },
        contrasena: { bsonType: "string" },
        seleccionFav: { bsonType: "objectId" }, // referencia a selecciones
        estadioFav: { bsonType: "objectId" }    // referencia a estadios
      }
    }
  }
})
