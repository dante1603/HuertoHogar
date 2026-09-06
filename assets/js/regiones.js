// TODO: reemplazar por arreglo oficial de regiones/comunas entregado por la asignatura.
const regiones = {
    "Región Metropolitana": ["Santiago", "Maipú", "Puente Alto"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"],
    "Maule": ["Talca", "Curicó", "Linares"]
};

function cargarRegiones() {
    const region = document.querySelector("#region");
    const comuna = document.querySelector("#comuna");

    if (!region || !comuna) {
        return;
    }

    region.innerHTML = Object.keys(regiones)
        .map((nombre) => `<option value="${nombre}">${nombre}</option>`)
        .join("");

    function actualizarComunas() {
        comuna.innerHTML = regiones[region.value]
            .map((nombre) => `<option value="${nombre}">${nombre}</option>`)
            .join("");
    }

    region.addEventListener("change", actualizarComunas);
    actualizarComunas();
}

document.addEventListener("DOMContentLoaded", cargarRegiones);
