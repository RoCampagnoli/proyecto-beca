const botones = document.querySelectorAll('.navbar .button');
const tarjetas = document.querySelectorAll('.tarjetas');
const audio = document.querySelector('.audio');

let musicaIniciada = false;

botones.forEach(boton => {
    boton.addEventListener('click', (e) => {

        const targetId = boton.dataset.target;

        // solo frenamos navegación si NO es home
        if (targetId) {
            e.preventDefault();
        }

        // 🔊 arrancar música en la primera interacción
        if (!musicaIniciada) {
            audio.play()
                .then(() => musicaIniciada = true)
                .catch(err => console.log("Audio bloqueado:", err));
        }

        // si no hay target, dejamos que navegue
        if (!targetId) return;

        botones.forEach(b => b.classList.remove('activa')); // Quitamos rosa a todos
        boton.classList.add('activa');

        tarjetas.forEach(t => t.classList.remove('activa'));

        const tarjetaActiva = document.getElementById(targetId);
        tarjetaActiva.classList.add('activa');
    });
});

// sección inicial
document.querySelector('.button[data-target="1"]').classList.add('activa');
document.getElementById('1').classList.add('activa');
document.querySelector('.cuadradito.c-celeste').classList.add('seleccionado');
cambiarColor('#9ddae8', document.querySelector('.cuadradito.c-celeste'));

function cambiarColor(colorHex, elemento) {

    const r = parseInt(colorHex.slice(1, 3), 16);
    const g = parseInt(colorHex.slice(3, 5), 16);
    const b = parseInt(colorHex.slice(5, 7), 16);
    const colorTrans=`rgba(${r}, ${g}, ${b}, 0.60)`

    document.body.style.backgroundColor = colorTrans;


    // 1. Cambiar el fondo de todas las secciones
    const secciones = document.querySelectorAll('.tarjetas');
    secciones.forEach(s => s.style.backgroundColor = colorHex);



    // 2. Quitar la X de todos los cuadraditos
    document.querySelectorAll('.cuadradito').forEach(c => {
        c.classList.remove('seleccionado');
    });

    // 3. Poner la X al que tocamos
    elemento.classList.add('seleccionado');
}

function darLike(elemento) {
    elemento.classList.toggle('liked'); // Si no tiene la clase la pone, si la tiene la saca
}