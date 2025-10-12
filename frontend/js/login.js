// Botón de bypass - Acceso directo al dashboard
document.getElementById('bypassBtn').addEventListener('click', () => {
    // Crear sesión demo
    const demoUser = {
        nombre: 'Usuario demo',
        email: 'demo@mundial2026.com'
    };
    
    // Guardar sesión demo
    localStorage.setItem('token', 'demo-token-bypass');
    localStorage.setItem('user', JSON.stringify(demoUser));
    
    // Redirigir al dashboard inmediatamente
    window.location.href = 'dashboard.html';
});

// Opcional: Si quieres que el formulario de login también funcione (sin backend)

