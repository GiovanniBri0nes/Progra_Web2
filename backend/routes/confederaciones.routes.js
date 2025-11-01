const express = require('express');
const router = express.Router();
const { Confederacion } = require('../bd/Modelos');
const verificarToken = require('../middlewares/auth.middleware');

// GET /confederaciones: obtener todas las confederaciones con su nombre (requiere autenticación)
router.get('/', verificarToken, async (req, res) => {
    try {
        const confederaciones = await Confederacion.find({}, {
            nombreConfederacion: 1
        });
        
        res.json(confederaciones);
    } 
    catch (error) {
        console.error('Error al obtener confederaciones:', error.message);
        res.status(500).json({ mensaje: 'Error al obtener las confederaciones' });
    }
});

module.exports = router; 