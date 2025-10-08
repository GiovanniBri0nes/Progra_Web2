**Integrantes del equipo:**  
DANIEL GIOVANNI CARRILLO BRIONES 2014405  
GABRIEL ALONSO SANABRIA CERVANTES 1863450  
EDUARDO MARTÍNEZ TREVIÑO 1804305  

**Descripción de la aplicación:**  
Sitio web que permite a los usuarios registrarse e iniciar sesión para acceder a una experiencia personalizada con temática del Mundial 2026. El sitio web proporcionará información detallada sobre equipos, jugadores, estadios, partidos y permitirá a los usuarios: 
- Explorar selecciones: Visualizar la selección, jugadores y la confederación a la que pertenece.
- Conocer estadios: Consultar el nombre, ciudad, país y capacidad de cada estadio.
- Revisar partidos: Consultar la fecha y el estadio de cada partido.
- Editar perfil: Podrá modificar la contraseña, así como su equipo y estadio favorito y poder darse de baja.
- Experimentar AR: Acceder a una experiencia AR que permita escanear banderas o escudos de las selecciones, mostrando información como participaciones en anteriores mundiales o platillos típicos.

**Tecnologías escogidas:**  
- Frontend: Bootstrap
- Backend: Node.js
- ODM: Mongoose
- Base de datos: MongoDB

**Descripción de las carpetas contenidas:**
- backend: estará todo lo relacionado al backend del proyecto como lo es el tema de las API, base de datos, etc.
  - node_modules: contiene todas las dependencias de Node.js instaladas (Express, Mongoose, CORS, etc.).
  - bd: se encuentra el script de conexión con la base de datos de MongoDB, el script de creación de las colecciones en la base de datos y el archivo de modelos de datos de mongoose para cada entidad.
  - routes: se encuentra las rutas de los endpoints de la API.
- frontend: estará todo lo relacionado al diseño y las páginas.
  - css: contiene los estilos personalizados del proyecto.
  - js: contiene el código JavaScript del frontend.
  - lib: contiene las librerías utilizadas en el proyecto para la parte del frontend.

**Árbol de carpetas:**
```
Progra_Web2/
├── backend/
│   ├── node_modules/
│   ├── bd/
│   └── routes/
└── frontend/
    ├── css/
    ├── js/
    └── lib/
```

---

## Requisitos para correr el proyecto

1. **Node.js** (versión 14 o superior)
2. **MongoDB con MongoDB Compass** (versión 4 o superior)

---

## Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/GiovanniBri0nes/Progra_Web2.git
```

### 2. Instalar librerías y paquetes necesarios (Express, Mongoose, CORS)
```bash
cd backend
npm install
```

### 3. Configurar MongoDB
- Abre MongoDB Compass y asegúrate de que MongoDB esté corriendo
- Ejecuta el script de colecciones para crear la base de datos `PW2` y sus colecciones:
```powershell
cd backend
Get-Content bd/Colecciones.js | mongosh
```

### 4. Iniciar el backend
```bash
cd backend
node index.js
```

## Verificar funcionamiento del backend
- Abre tu navegador en: http://localhost:3000
- Debería verse: `{"mensaje":"API del proyecto de progra web 2 funcionando"}`

### 5. Iniciar el frontend
Abre `frontend/index.html` en tu navegador

---
