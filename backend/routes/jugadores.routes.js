const express = require('express');
const router = express.Router();
const { Confederacion } = require('../bd/Modelos');
const verificarToken = require('../middlewares/auth.middleware');

// GET /jugadores: obtener todos los jugadores con nombre y selección (requiere autenticación)
router.get('/', verificarToken, async (req, res) => {
    try {
        // Traer primero las confederaciones (solo con los campos necesarios)
        const confederaciones = await Confederacion.find({}, {
            selecciones: 1
        });
        
        // Construir el arreglo de jugadores recorriendo confederaciones y selecciones
        const jugadores = [];
        confederaciones.forEach(confederacion => {
            confederacion.selecciones.forEach(seleccion => {
                seleccion.jugadores.forEach(jugador => {
                    jugadores.push({
                        _id: jugador._id,
                        nombreJugador: jugador.nombreJugador,
                        seleccion: seleccion.nombreSeleccion
                    });
                });
            });
        });
        
        res.json(jugadores);
    } 
    catch (error) {
        console.error('Error al obtener jugadores:', error.message);
        res.status(500).json({ mensaje: 'Error al obtener los jugadores' });
    }
});

module.exports = router; 