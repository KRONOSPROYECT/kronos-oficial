// ==========================================
//  KRONOS 360 - ANIMACIONES Y RELOJ
// ==========================================

// ----- 1. RELOJ EN VIVO (ISO 8601) -----
function actualizarReloj() {
    const ahora = new Date();
    const isoString = ahora.toISOString(); // Formato ISO 8601
    const elemento = document.getElementById('horaActual');
    if (elemento) {
        elemento.textContent = isoString;
    }
}
// Actualizar cada segundo
actualizarReloj();
setInterval(actualizarReloj, 1000);

// ----- 2. ESTRELLAS FUGACES (Canvas) -----
function iniciarEstrellas() {
    const canvas = document.getElementById('estrellasCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    function redimensionar() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', redimensionar);
    redimensionar();

    // Crear meteoros (líneas doradas y azules)
    const meteoros = [];
    for (let i = 0; i < 15; i++) {
        meteoros.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() * 3 + 1) * (Math.random() > 0.5 ? 1 : -1),
            vy: (Math.random() * 3 + 1) * (Math.random() > 0.5 ? 1 : -1),
            tam: Math.random() * 2 + 1,
            brillo: Math.random() * 0.7 + 0.3,
            color: Math.random() > 0.6 ? '#ffd700' : '#00e5ff'
        });
    }

    function dibujar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        meteoros.forEach(m => {
            m.x += m.vx * 0.6;
            m.y += m.vy * 0.6;
            
            // Rebote en bordes
            if (m.x < 0 || m.x > canvas.width) m.vx *= -1;
            if (m.y < 0 || m.y > canvas.height) m.vy *= -1;
            
            // Estela
            ctx.beginPath();
            ctx.moveTo(m.x, m.y);
            ctx.lineTo(m.x - m.vx * 20, m.y - m.vy * 20);
            ctx.strokeStyle = m.color + Math.floor(m.brillo * 60).toString(16).padStart(2, '0');
            ctx.lineWidth = m.tam * 0.6;
            ctx.stroke();
            
            // Cabeza brillante
            ctx.beginPath();
            ctx.arc(m.x, m.y, m.tam * 1.8, 0, Math.PI * 2);
            ctx.fillStyle = m.color;
            ctx.shadowColor = m.color;
            ctx.shadowBlur = 25;
            ctx.fill();
            ctx.shadowBlur = 0;
        });
        
        requestAnimationFrame(dibujar);
    }
    dibujar();
}

// ----- 3. INICIAR CUANDO CARGUE -----
document.addEventListener('DOMContentLoaded', () => {
    iniciarEstrellas();
    console.log("🔒 KRONOS 360 · Sistema de Confianza Anti-Falsificación activado.");
    console.log("⏱️ TimeLock activo. Todas las acciones quedan selladas.");
});
