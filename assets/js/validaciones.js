const dominiosPermitidos = /^[^@\s]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

function mostrarError(campo, mensaje) {
    const error = campo.parentElement.querySelector(".error");

    error.textContent = mensaje;
    campo.setAttribute("aria-invalid", mensaje ? "true" : "false");
    return !mensaje;
}

function validarTexto(campo, maximo, requerido = true) {
    const valor = campo.value.trim();

    if (requerido && !valor) {
        return mostrarError(campo, "Campo obligatorio.");
    }

    if (valor.length > maximo) {
        return mostrarError(campo, `Máximo ${maximo} caracteres.`);
    }

    return mostrarError(campo, "");
}

function validarCodigoProducto(campo) {
    const valor = campo.value.trim();

    if (!valor) {
        return mostrarError(campo, "Campo obligatorio.");
    }

    if (valor.length < 3) {
        return mostrarError(campo, "El código debe tener al menos 3 caracteres.");
    }

    return mostrarError(campo, "");
}

function validarCorreo(correo) {
    const valor = correo.trim();
    return valor.length <= 100 && dominiosPermitidos.test(valor);
}

function validarCorreoCampo(campo, requerido = true) {
    const valor = campo.value.trim();

    if (!valor) {
        return requerido ? mostrarError(campo, "Campo obligatorio.") : mostrarError(campo, "");
    }

    if (!validarCorreo(valor)) {
        return mostrarError(campo, "Correo no válido.");
    }

    return mostrarError(campo, "");
}

function validarContrasena(campo) {
    const valor = campo.value;

    if (!valor) {
        return mostrarError(campo, "Campo obligatorio.");
    }

    if (valor.length < 4 || valor.length > 10) {
        return mostrarError(campo, "La contraseña debe tener entre 4 y 10 caracteres.");
    }

    return mostrarError(campo, "");
}

function validarRun(run) {
    const valor = run.trim();

    if (!/^\d{6,8}[0-9Kk]$/.test(valor)) {
        return false;
    }

    const cuerpo = valor.slice(0, -1);
    const digito = valor.slice(-1).toUpperCase();
    let suma = 0;
    let factor = 2;

    for (let i = cuerpo.length - 1; i >= 0; i -= 1) {
        suma += Number(cuerpo[i]) * factor;
        factor = factor === 7 ? 2 : factor + 1;
    }

    const resto = 11 - (suma % 11);
    const esperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);

    return digito === esperado;
}

function validarRunCampo(campo) {
    if (!campo.value.trim()) {
        return mostrarError(campo, "Campo obligatorio.");
    }

    if (!validarRun(campo.value)) {
        return mostrarError(campo, "RUN no válido.");
    }

    return mostrarError(campo, "");
}

function validarNumero(campo, requerido) {
    const valor = campo.value.trim();

    if (!valor) {
        return requerido ? mostrarError(campo, "Campo obligatorio.") : mostrarError(campo, "");
    }

    const numero = Number(valor);

    if (!Number.isFinite(numero) || numero < 0) {
        return mostrarError(campo, "Debe ser un número mayor o igual a 0.");
    }

    return mostrarError(campo, "");
}

function validarEntero(campo, requerido) {
    const valor = campo.value.trim();

    if (!valor) {
        return requerido ? mostrarError(campo, "Campo obligatorio.") : mostrarError(campo, "");
    }

    if (!/^\d+$/.test(valor)) {
        return mostrarError(campo, "Debe ser un entero mayor o igual a 0.");
    }

    return mostrarError(campo, "");
}

function validarRegionComuna(form) {
    let valido = validarTexto(form.elements.region, 100);
    valido = validarTexto(form.elements.comuna, 100) && valido;
    return valido;
}

function actualizarMensajeStock() {
    const stock = document.querySelector("#stock");
    const stockCritico = document.querySelector("#stock-critico");
    const mensaje = document.querySelector("#mensaje-stock");

    if (!stock || !stockCritico || !mensaje) {
        return;
    }

    mensaje.textContent = stock.value !== "" && stockCritico.value !== "" && Number(stock.value) <= Number(stockCritico.value)
        ? "Stock crítico"
        : "";
}

function validarFormulario(form) {
    let valido = true;

    if (form.id === "form-login") {
        valido = validarCorreoCampo(form.elements.correo) && valido;
        valido = validarContrasena(form.elements.contrasena) && valido;
    }

    if (form.id === "form-contacto") {
        valido = validarTexto(form.elements.nombre, 100) && valido;
        valido = validarCorreoCampo(form.elements.correo, false) && valido;
        valido = validarTexto(form.elements.comentario, 500) && valido;
    }

    if (form.id === "form-registro" || form.id === "form-admin-usuario") {
        valido = validarRunCampo(form.elements.run) && valido;
        valido = validarTexto(form.elements.nombre, 50) && valido;
        valido = validarTexto(form.elements.apellidos, 100) && valido;
        valido = validarCorreoCampo(form.elements.correo) && valido;
        valido = validarTexto(form.elements.direccion, 300) && valido;
        valido = validarRegionComuna(form) && valido;
    }

    if (form.id === "form-registro") {
        valido = validarContrasena(form.elements.contrasena) && valido;
    }

    if (form.id === "form-admin-usuario") {
        valido = validarTexto(form.elements.tipo, 30) && valido;
    }

    if (form.id === "form-producto") {
        valido = validarCodigoProducto(form.elements.codigo) && valido;
        valido = validarTexto(form.elements.nombre, 100) && valido;
        valido = validarTexto(form.elements.descripcion, 500, false) && valido;
        valido = validarNumero(form.elements.precio, true) && valido;
        valido = validarEntero(form.elements.stock, true) && valido;
        valido = validarEntero(form.elements.stockCritico, false) && valido;
        valido = validarTexto(form.elements.categoria, 50) && valido;
        actualizarMensajeStock();
    }

    return valido;
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("form").forEach((form) => {
        form.addEventListener("submit", (evento) => {
            if (form.id === "form-contacto") {
                evento.preventDefault();

                if (validarFormulario(form)) {
                    document.querySelector("#mensaje-contacto").textContent = "Mensaje enviado correctamente.";
                }

                return;
            }

            if (!validarFormulario(form)) {
                evento.preventDefault();
            }
        });
    });
});
