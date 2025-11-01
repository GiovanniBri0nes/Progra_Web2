const jwt = require('jsonwebtoken');
const { secreto } = require('../config/jwt.config');

// Middleware para verificar el token JWT
const verificarToken = (req, res, next) => {

    // Leer el header de la petición
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    // Extraer el bearer token del header
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }
    
    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, secreto);
        
        // Agregar la información del usuario a la request
        req.usuario = decoded;
        
        next();
    } 
    catch (error) {
        console.error('Error al verificar token:', error.message);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ mensaje: 'Token expirado' });
        }
        
        return res.status(401).json({ mensaje: 'Token inválido' });
    }
};

module.exports = verificarToken;
