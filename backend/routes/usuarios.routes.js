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


// GET /usuarios/:correo  se obtendra los usuarios por correo (requiere autenticación)
router.get('/:correo', verificarToken, async (req, res) => {
    try {
        const correo = req.params.correo;

        if (!correo || correo.trim() === '') {
            return res.status(400).json({ mensaje: 'El correo es requerido' });
        }

        const usuario = await Usuario.findOne({ correo })

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


// PUT /usuarios/:correo  se actualizara contrasena, seleccionFav y estadioFav del usuario (requiere autenticación)
router.put('/:correo', verificarToken, async (req, res) => {
    try {
        const correo = req.params.correo;
        const { contrasena, seleccionFav, estadioFav } = req.body;

        if (!correo || correo.trim() === '') {
            return res.status(400).json({ mensaje: 'El correo es requerido' });
        }

        // Objeto para almacenar los campos a actualizar
        const camposActualizar = {};

        // Solo actualizar la contraseña si se proporciona
        if (contrasena !== undefined && contrasena !== null && contrasena.trim() !== '') {
            // Validar longitud de la contraseña
            if (contrasena.length < 8) {
                return res.status(400).json({ mensaje: 'La contraseña debe tener al menos 8 caracteres' });
            }
            // Hacer hash de la contraseña con la librería bcryptjs
            camposActualizar.contrasena = await bcrypt.hash(contrasena, 10);
        }

        // Solo actualizar seleccionFav si se proporciona
        if (seleccionFav !== undefined && seleccionFav !== null) {
            if (typeof seleccionFav !== 'string' || seleccionFav.trim() === '') {
                return res.status(400).json({ mensaje: 'La selección debe ser un texto válido' });
            }
            camposActualizar.seleccionFav = seleccionFav;
        }

        // Solo actualizar estadioFav si se proporciona
        if (estadioFav !== undefined && estadioFav !== null) {
            if (typeof estadioFav !== 'string' || estadioFav.trim() === '') {
                return res.status(400).json({ mensaje: 'El estadio debe ser un texto válido' });
            }
            camposActualizar.estadioFav = estadioFav;
        }

        // Verificar que al menos se esté actualizando un campo
        if (Object.keys(camposActualizar).length === 0) {
            return res.status(400).json({ mensaje: 'Debe proporcionar al menos un campo para actualizar' });
        }

        const usuarioActualizado = await Usuario.findOneAndUpdate(
            { correo },
            camposActualizar,
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


// DELETE /usuarios/:correo para eliminar un usuario (requiere autenticación)
router.delete('/:correo', verificarToken, async (req, res) => {
    try {
        const correo = req.params.correo;

        if (!correo || correo.trim() === '') {
            return res.status(400).json({ mensaje: 'El correo es requerido' });
        }

        const usuarioEliminado = await Usuario.findOneAndDelete({ correo });

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