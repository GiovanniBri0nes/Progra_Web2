const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Usuario } = require('../bd/Modelos');
const verificarToken = require('../middlewares/auth.middleware');

// POST para crear un nuevo usuario //
router.post('/', async (req, res) => {
    try {
        const { correo, contrasena, seleccionFav, estadioFav } = req.body;

        // Validar que se envíen todos los datos requeridos
        if (!correo || !contrasena || !seleccionFav || !estadioFav) {
            // Código 400: petición incorrecta
            return res.status(400).json({ mensaje: 'Todos los campos son requeridos' }); 
        }

        // Verificar si el correo ya existe
        const usuarioExistente = await Usuario.findOne({ correo });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El correo es invalido' });
        }

        // Validar longitud de la contraseña
        if (contrasena.length < 8) {
            return res.status(400).json({ mensaje: 'La contraseña debe tener al menos 8 caracteres' });
        }

        // Hacer hash de la contraseña con la librería bcryptjs
        const contraseñaHash = await bcrypt.hash(contrasena, 10);

        const nuevoUsuario = new Usuario({
            correo,
            contrasena: contraseñaHash,
            seleccionFav,
            estadioFav
        });

        await nuevoUsuario.save();

        // Código 201: Creación exitosa
        res.status(201).json({ mensaje: 'Usuario creado', usuario: nuevoUsuario });

    } catch (error) {
        // Código 500: Error interno del servidor
        console.error('Error al crear usuario:', error.message);
        res.status(500).json({ mensaje: 'Error al crear usuario' });
    }
});


// GET /usuarios/:id  se obtendra los usuarios por id (requiere autenticación)
router.get('/:id', verificarToken, async (req, res) => {
    try {
        const usuarioId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(usuarioId)) {
            return res.status(400).json({ mensaje: 'ID de usuario inválido' });
        }

        const usuario = await Usuario.findById(usuarioId)

        if (!usuario) {
            // Código 404: No encontrado
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json(usuario);

    } catch (error) {
        console.error('Error al obtener usuario:', error.message);
        res.status(500).json({ mensaje: 'Error al obtener el usuario' });
    }
});


// PUT /usuarios/:id  se actualizara contrasena, seleccionFav y estadioFav del usuario (requiere autenticación)
router.put('/:id', verificarToken, async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const { contrasena, seleccionFav, estadioFav } = req.body;

        if (!mongoose.Types.ObjectId.isValid(usuarioId)) {
            return res.status(400).json({ mensaje: 'ID de usuario inválido' });
        }

        // Validar que seleccionFav y estadioFav sean strings
        if (typeof seleccionFav !== 'string' || seleccionFav.trim() === '') {
            return res.status(400).json({ mensaje: 'La selección debe ser un texto válido' });
        }
        if (typeof estadioFav !== 'string' || estadioFav.trim() === '') {
            return res.status(400).json({ mensaje: 'El estadio debe ser un texto válido' });
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            usuarioId,
            { contrasena, seleccionFav, estadioFav },
            { new: true } // Devuelve el documento actualizado
        );

        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json({ mensaje: 'Usuario actualizado', usuario: usuarioActualizado });

    } catch (error) {
        console.error('Error al actualizar usuario:', error.message);
        res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
    }
});


// DELETE /usuarios/:id para eliminar un usuario (requiere autenticación)
router.delete('/:id', verificarToken, async (req, res) => {
    try {
        const usuarioId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(usuarioId)) {
            return res.status(400).json({ mensaje: 'ID de usuario inválido' });
        }

        const usuarioEliminado = await Usuario.findByIdAndDelete(usuarioId);

        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json({ mensaje: 'Usuario eliminado', usuario: usuarioEliminado });

    } catch (error) {
        console.error('Error al eliminar usuario:', error.message);
        res.status(500).json({ mensaje: 'Error al eliminar el usuario' });
    }
});

module.exports = router;