const mongoose = require('mongoose');

async function conectarseConBD() {
    try {
        await mongoose.connect('mongodb://localhost:27017/PW2');
        console.log('Conectado exitosamente a la BD');
    } 
    catch (error) {
        console.error('Error al conectarse a la BD:', error.message);
    }
}

module.exports = conectarseConBD;
