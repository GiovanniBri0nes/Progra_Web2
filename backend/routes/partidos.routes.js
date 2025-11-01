const express = require('express');
const router = express.Router();
const { Estadio } = require('../bd/Modelos');
const verificarToken = require('../middlewares/auth.middleware');

// GET /partidos: obtener todos los partidos con fecha y estadio (requiere autenticación)
router.get('/', verificarToken, async (req, res) => {
    try {
        
        // Traer primero los estadios (solo con los campos necesarios)
        const estadios = await Estadio.find({}, {
            nombreEstadio: 1,
            partidos: 1
        });
        
        // Construir el arreglo de partidos recorriendo los estadios
        const partidos = [];
        estadios.forEach(estadio => {
            estadio.partidos.forEach(partido => {
                partidos.push({
                    _id: partido._id,
                    fase: partido.fase,
                    fecha: partido.fecha,
                    estadio: estadio.nombreEstadio
                });
            });
        });
        
        res.json(partidos);
    } 
    catch (error) {
        console.error('Error al obtener partidos:', error.message);
        res.status(500).json({ mensaje: 'Error al obtener los partidos' });
    }
});

module.exports = router; 