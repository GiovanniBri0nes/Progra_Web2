const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../bd/Modelos');
const { secreto, tiempoExpiracion } = require('../config/jwt.config');
const verificarToken = require('../middlewares/auth.middleware');

// POST /login para autenticar usuario con correo y contraseña //
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

        // Generar token JWT
        const payload = {
            id: usuario._id,
            correo: usuario.correo
        };
        
        const token = jwt.sign(payload, secreto, { expiresIn: tiempoExpiracion });

        res.json({
            mensaje: 'Usuario autenticado',
            usuario: {
                id: usuario._id,
                correo: usuario.correo,
                seleccionFav: usuario.seleccionFav,
                estadioFav: usuario.estadioFav
            },
            token: token
        });

    } catch (error) {
        console.error('Error al autenticar usuario:', error.message);
        res.status(500).json({ mensaje: 'Error al autenticar usuario' });
    }
});

// GET /verificar para verificar que el token sea válido
router.get('/verificar', verificarToken, (req, res) => {
    try {
        res.json({
            mensaje: 'Token válido',
            usuario: req.usuario
        });
    } catch (error) {
        console.error('Error al verificar token:', error.message);
        res.status(500).json({ mensaje: 'Error al verificar token' });
    }
});

module.exports = router;