const express = require('express');
const router = express.Router();
const { Usuario } = require('../bd/Modelos');

// POST para crear un nuevo usuario //
router.post('/', async (req, res) => {
    try {
        const { correo, contrasena, seleccionFav, estadioFav } = req.body;

        // Validar ObjectId
        if (!mongoose.Types.ObjectId.isValid(seleccionFav)) {
            return res.status(400).json({ mensaje: 'ID de selección inválido' });
        }
        if (!mongoose.Types.ObjectId.isValid(estadioFav)) {
            return res.status(400).json({ mensaje: 'ID de estadio inválido' });
        }

        const nuevoUsuario = new Usuario({
            correo,
            contrasena,
            seleccionFav,
            estadioFav
        });

        await nuevoUsuario.save();

        res.status(201).json({ mensaje: 'Usuario creado', usuario: nuevoUsuario });

    } catch (error) {
        console.error('Error al crear usuario:', error.message);
        res.status(500).json({ mensaje: 'Error al crear usuario' });
    }
});


// GET /usuarios/:id  se obtendra los usuarios por id //
const mongoose = require('mongoose');

router.get('/:id', async (req, res) => {
    try {
        const usuarioId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(usuarioId)) {
            return res.status(400).json({ mensaje: 'ID de usuario inválido' });
        }

        const usuario = await Usuario.findById(usuarioId)

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json(usuario);

    } catch (error) {
        console.error('Error al obtener usuario:', error.message);
        res.status(500).json({ mensaje: 'Error al obtener el usuario' });
    }
});


// PUT /usuarios/:id  se actualizara contrasena, seleccionFav y estadioFav del usuario
router.put('/:id', async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const { contrasena, seleccionFav, estadioFav } = req.body;

        if (!mongoose.Types.ObjectId.isValid(usuarioId)) {
            return res.status(400).json({ mensaje: 'ID de usuario inválido' });
        }

        // Validar ObjectId de selección y estadio
        if (!mongoose.Types.ObjectId.isValid(seleccionFav)) {
            return res.status(400).json({ mensaje: 'ID de selección inválido' });
        }
        if (!mongoose.Types.ObjectId.isValid(estadioFav)) {
            return res.status(400).json({ mensaje: 'ID de estadio inválido' });
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


// DELETE /usuarios/:id para eliminar un usuario
router.delete('/:id', async (req, res) => {
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