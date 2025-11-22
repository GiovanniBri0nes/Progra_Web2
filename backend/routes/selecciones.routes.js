const express = require('express');
const router = express.Router();
const { Confederacion } = require('../bd/Modelos');

// GET /selecciones: obtener todas las selecciones con nombre y confederación
router.get('/', async (req, res) => {
    try {
        // Traer primero las confederaciones (solo con los campos necesarios)
        const confederaciones = await Confederacion.find({}, {
            nombreConfederacion: 1,
            selecciones: 1
        });
        
        // Construir el arreglo de selecciones recorriendo las confederaciones
        const selecciones = [];
        confederaciones.forEach(confederacion => {
            confederacion.selecciones.forEach(seleccion => {
                selecciones.push({
                    _id: seleccion._id,
                    nombreSeleccion: seleccion.nombreSeleccion,
                    confederacion: confederacion.nombreConfederacion
                });
            });
        });
        
        res.json(selecciones);
    } 
    catch (error) {
        console.error('Error al obtener selecciones:', error.message);
        res.status(500).json({ mensaje: 'Error al obtener las selecciones' });
    }
});

// GET para los jugadores de una selección específica
router.get('/:nombre/jugadores', async (req,res) =>{
    try {
        const nombreSeleccion = req.params.nombre;
        const confederacion = await Confederacion.findOne({
            'selecciones.nombreSeleccion': nombreSeleccion
        });
    
        if (!confederacion){
            return res.status(404).json({ mensaje: 'Selección no encontrada' });
        }

        const seleccion = confederacion.selecciones.find(sel => sel.nombreSeleccion === nombreSeleccion);
        res.json(seleccion.jugadores || []);
    } catch (error) {
        console.error('Error al obtener jugadores de la selección:', error.message);
        res.status(500).json({ mensaje: 'Error al obtener jugadores de la selección' });
    }
});

module.exports = router; 