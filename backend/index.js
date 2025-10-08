// Importar dependencias
const cors = require('cors');
const express = require('express');
const conectarseConBD = require('./bd/ConexionBD');

// Importar rutas
const rutasAuth = require('./routes/auth.routes');
const rutasConfederaciones = require('./routes/confederaciones.routes');
const rutasEstadios = require('./routes/estadios.routes');
const rutasJugadores = require('./routes/jugadores.routes');
const rutasPartidos = require('./routes/partidos.routes');
const rutasSelecciones = require('./routes/selecciones.routes');
const rutasUsuarios = require('./routes/usuarios.routes');

const app = express();

// Conectarse a MongoDB
conectarseConBD();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', rutasAuth);
app.use('/api/confederaciones', rutasConfederaciones);
app.use('/api/estadios', rutasEstadios);
app.use('/api/jugadores', rutasJugadores);
app.use('/api/partidos', rutasPartidos);
app.use('/api/selecciones', rutasSelecciones);
app.use('/api/usuarios', rutasUsuarios);

// Ruta default de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.json({ mensaje: 'API del proyecto de progra web 2 funcionando' });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
