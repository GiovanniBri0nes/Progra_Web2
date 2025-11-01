const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Usuario } = require('../bd/Modelos');

// POST /login para autenticar usuario con JWT (simulado)
router.post('/', async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        // Validar que se envien los datos requeridos
        if (!correo || !contrasena) {
            return res.status(400).json({ mensaje: 'Faltan datos de inicio de sesión' });
        }

        // Buscar usuario por correo
        const usuario = await Usuario.findOne({ correo: correo });

        if (!usuario) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

        // Validar contraseña comparando el hash generado con el de la base de datos
        const contraseñaValida = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!contraseñaValida) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

        // Generar token JWT simulado (JWT_ + Id de usuario + hora ISO)
        const tokenSimulado = `JWT_${usuario._id}_${new Date().toISOString()}`;

        res.json({
            mensaje: 'Usuario autenticado',
            usuario: {
                id: usuario._id,
                correo: usuario.correo,
                seleccionFav: usuario.seleccionFav,
                estadioFav: usuario.estadioFav
            },
            token: tokenSimulado
        });

    } catch (error) {
        console.error('Error al autenticar usuario:', error.message);
        res.status(500).json({ mensaje: 'Error al autenticar usuario' });
    }
});

module.exports = router;