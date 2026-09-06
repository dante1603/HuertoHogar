const dominiosPermitidos = /^[^@\s]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

function mostrarError(campo, mensaje) {
    const error = campo.parentElement.querySelector(".error");

    error.textContent = mensaje;
    campo.setAttribute("aria-invalid", mensaje ? "true" : "false");

    return !mensaje;
}

function validarTexto(campo, etiqueta, maximo, requerido = true) {
    const valor = campo.value.trim();

    if (requerido && !valor) {
        return mostrarError(campo, `${etiqueta} es obligatorio.`);
    }

    if (valor.length > maximo) {
        return mostrarError(campo, `${etiqueta} debe tener máximo ${maximo} caracteres.`);
    }

    return mostrarError(campo, "");
}

function validarCodigoProducto(campo) {
    const valor = campo.value.trim();

    if (!valor) {
        return mostrarError(campo, "El código es obligatorio.");
    }

    if (valor.length < 3) {
        return mostrarError(campo, "El código debe tener al menos 3 caracteres.");
    }

    return mostrarError(campo, "");
}

function validarCorreo(correo) {
    return dominiosPermitidos.test(correo.trim());
}

function validarCorreoCampo(campo, requerido = true) {
    const valor = campo.value.trim();

    if (!valor && !requerido) {
        return mostrarError(campo, "");
    }

    if (!valor) {
        return mostrarError(campo, "El correo es obligatorio.");
    }

    if (valor.length > 100) {
        return mostrarError(campo, "El correo debe tener máximo 100 caracteres.");
    }

    if (!validarCorreo(valor)) {
        return mostrarError(campo, "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.");
    }

    return mostrarError(campo, "");
}

function validarContrasena(campo) {
    const valor = campo.value;

    if (!valor) {
        return mostrarError(campo, "La contraseña es obligatoria.");
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
    if (!validarRun(campo.value)) {
        return mostrarError(campo, "Ingresa un RUN válido, sin puntos ni guion.");
    }

    return mostrarError(campo, "");
}

function validarRegionComuna(form) {
    const regionValida = validarTexto(form.elements.region, "La región", 100);
    const comunaValida = validarTexto(form.elements.comuna, "La comuna", 100);

    return regionValida && comunaValida;
}

function validarFormulario(form) {
    let valido = true;

    if (form.id === "form-login") {
        valido = validarCorreoCampo(form.elements.correo) && valido;
        valido = validarContrasena(form.elements.contrasena) && valido;
    }

    if (form.id === "form-contacto") {
        valido = validarTexto(form.elements.nombre, "El nombre", 100) && valido;
        valido = validarCorreoCampo(form.elements.correo, false) && valido;
        valido = validarTexto(form.elements.comentario, "El comentario", 500) && valido;
    }

    if (form.id === "form-registro" || form.id === "form-admin-usuario") {
        valido = validarRunCampo(form.elements.run) && valido;
        valido = validarTexto(form.elements.nombre, "El nombre", 50) && valido;
        valido = validarTexto(form.elements.apellidos, "Los apellidos", 100) && valido;
        valido = validarCorreoCampo(form.elements.correo) && valido;
        valido = validarTexto(form.elements.direccion, "La dirección", 300) && valido;
        valido = validarRegionComuna(form) && valido;
    }

    if (form.id === "form-registro") {
        valido = validarContrasena(form.elements.contrasena) && valido;
    }

    if (form.id === "form-admin-usuario") {
        valido = validarTexto(form.elements.tipo, "El tipo de usuario", 30) && valido;
    }

    if (form.id === "form-producto") {
        valido = validarCodigoProducto(form.elements.codigo) && valido;
        valido = validarTexto(form.elements.nombre, "El nombre", 100) && valido;
        valido = validarTexto(form.elements.descripcion, "La descripción", 500, false) && valido;
        valido = validarNumero(form.elements.precio, "El precio", true) && valido;
        valido = validarEntero(form.elements.stock, "El stock", true) && valido;
        valido = validarEntero(form.elements.stockCritico, "El stock crítico", false) && valido;
        valido = validarTexto(form.elements.categoria, "La categoría", 50) && valido;
    }

    return valido;
}

function validarNumero(campo, etiqueta, requerido) {
    const valor = campo.value.trim();

    if (!valor && !requerido) {
        return mostrarError(campo, "");
    }

    if (!valor || Number.isNaN(Number(valor)) || Number(valor) < 0) {
        return mostrarError(campo, `${etiqueta} debe ser un número mayor o igual a 0.`);
    }

    return mostrarError(campo, "");
}

function validarEntero(campo, etiqueta, requerido) {
    const valor = campo.value.trim();

    if (!valor && !requerido) {
        return mostrarError(campo, "");
    }

    if (!/^\d+$/.test(valor)) {
        return mostrarError(campo, `${etiqueta} debe ser un entero mayor o igual a 0.`);
    }

    return mostrarError(campo, "");
}

function validarCampo(form, campo) {
    if (campo.name === "correo") {
        return validarCorreoCampo(campo, form.id !== "form-contacto");
    }

    if (campo.name === "contrasena") {
        return validarContrasena(campo);
    }

    if (campo.name === "run") {
        return validarRunCampo(campo);
    }

    if (form.id === "form-producto") {
        if (campo.name === "precio") {
            return validarNumero(campo, "El precio", true);
        }

        if (campo.name === "stock") {
            return validarEntero(campo, "El stock", true);
        }

        if (campo.name === "stockCritico") {
            return validarEntero(campo, "El stock crítico", false);
        }
    }

    if (campo.name === "nombre") {
        return validarTexto(campo, "El nombre", form.id === "form-contacto" ? 100 : 50);
    }

    if (campo.name === "apellidos") {
        return validarTexto(campo, "Los apellidos", 100);
    }

    if (campo.name === "direccion") {
        return validarTexto(campo, "La dirección", 300);
    }

    if (campo.name === "comentario") {
        return validarTexto(campo, "El comentario", 500);
    }

    if (campo.name === "descripcion") {
        return validarTexto(campo, "La descripción", 500, false);
    }

    if (campo.name === "codigo") {
        return validarCodigoProducto(campo);
    }

    if (campo.name === "categoria" || campo.name === "tipo") {
        return validarTexto(campo, campo.name === "tipo" ? "El tipo de usuario" : "La categoría", 50);
    }

    if (campo.name === "region" || campo.name === "comuna") {
        return validarTexto(campo, campo.name === "region" ? "La región" : "La comuna", 100);
    }

    return true;
}

function actualizarMensajeStock() {
    const stock = document.querySelector("#stock");
    const stockCritico = document.querySelector("#stock-critico");
    const mensaje = document.querySelector("#mensaje-stock");

    if (!stock || !stockCritico || !mensaje) {
        return;
    }

    const tieneValores = stock.value !== "" && stockCritico.value !== "";
    mensaje.textContent = tieneValores && Number(stock.value) <= Number(stockCritico.value)
        ? "Stock crítico"
        : "";
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("form").forEach((form) => {
        form.querySelectorAll("[name]").forEach((campo) => {
            campo.addEventListener("blur", () => validarCampo(form, campo));

            if (["correo", "contrasena", "comentario", "precio", "stock", "stockCritico", "codigo"].includes(campo.name)) {
                campo.addEventListener("input", () => {
                    validarCampo(form, campo);
                    actualizarMensajeStock();
                });
            }
        });

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

    actualizarMensajeStock();
});
