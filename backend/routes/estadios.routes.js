const express = require('express');
const router = express.Router();
const { Estadio } = require('../bd/Modelos');

// GET /estadios: obtener todos los estadios con nombre, pais, ciudad y capacidad
router.get('/', async (req, res) => {
    try {
        const estadios = await Estadio.find({}, {
            nombreEstadio: 1,
            pais: 1,
            ciudad: 1,
            capacidad: 1
        });
        
        res.json(estadios);
    } 
    catch (error) {
        console.error('Error al obtener estadios:', error.message);
        res.status(500).json({ mensaje: 'Error al obtener los estadios' });
    }
});

module.exports = router; 