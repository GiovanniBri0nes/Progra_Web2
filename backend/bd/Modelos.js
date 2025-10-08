const mongoose = require('mongoose');

// Modelo de Estadio
const esquemaEstadio = new mongoose.Schema({
    nombreEstadio: String,
    pais: String,
    ciudad: String,
    capacidad: Number,
    partidos: [{
        _id: mongoose.Schema.Types.ObjectId,
        fecha: Date,
        fase: String
    }]
}, { collection: 'estadios' });

const Estadio = mongoose.model('Estadio', esquemaEstadio);

// Modelo de Confederación
const esquemaConfederacion = new mongoose.Schema({
    nombreConfederacion: String,
    selecciones: [{
        _id: mongoose.Schema.Types.ObjectId,
        nombreSeleccion: String,
        jugadores: [{
            _id: mongoose.Schema.Types.ObjectId,
            nombreJugador: String
        }]
    }]
}, { collection: 'confederaciones' });

const Confederacion = mongoose.model('Confederacion', esquemaConfederacion);

// Modelo de Usuario
const esquemaUsuario = new mongoose.Schema({
    correo: String,
    contrasena: String,
    seleccionFav: mongoose.Schema.Types.ObjectId,
    estadioFav: mongoose.Schema.Types.ObjectId
}, { collection: 'usuarios' });

const Usuario = mongoose.model('Usuario', esquemaUsuario);

module.exports = {
    Estadio,
    Confederacion,
    Usuario
};
