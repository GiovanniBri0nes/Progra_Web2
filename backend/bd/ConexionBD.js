const mongoose = require('mongoose');

const conectarseConBD = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/PW2');
        console.log('Conectado a la BD');
        
        // Prueba de inserción
        const coleccionPrueba = mongoose.connection.collection('pruebas');
        const registroPrueba = {
            mensaje: 'Conexión exitosa',
            fecha: new Date(),
            estado: 'funcionando'
        };
        const resultado = await coleccionPrueba.insertOne(registroPrueba);
        console.log('Registro de prueba insertado con ID:', resultado.insertedId);
        
    } catch (error) {
        console.error('Error al conectarse a la BD:', error.message);
    }
};

module.exports = conectarseConBD;
