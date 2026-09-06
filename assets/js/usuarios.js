function usuariosGuardados() {
    return JSON.parse(localStorage.getItem("huertohogar-usuarios") || "[]");
}

function guardarUsuario(usuario) {
    const usuarios = usuariosGuardados();

    usuarios.push(usuario);
    localStorage.setItem("huertohogar-usuarios", JSON.stringify(usuarios));
}

function mostrarMensaje(id, texto) {
    const mensaje = document.querySelector(`#${id}`);

    if (mensaje) {
        mensaje.textContent = texto;
    }
}

function mostrarUsuarios() {
    const lista = document.querySelector("#lista-usuarios");

    if (!lista) {
        return;
    }

    const usuarios = usuariosGuardados();

    if (usuarios.length === 0) {
        lista.innerHTML = '<tr><td colspan="5">No hay usuarios registrados.</td></tr>';
        return;
    }

    lista.innerHTML = "";

    usuarios.forEach((usuario) => {
        const fila = document.createElement("tr");
        const nombre = `${usuario.nombre || ""} ${usuario.apellidos || ""}`.trim();

        [usuario.run, nombre, usuario.correo, usuario.tipo || "Cliente"].forEach((valor) => {
            const celda = document.createElement("td");
            celda.textContent = valor || "";
            fila.appendChild(celda);
        });

        const accion = document.createElement("td");
        accion.innerHTML = '<a href="usuario.html">Editar</a>';
        fila.appendChild(accion);
        lista.appendChild(fila);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const registro = document.querySelector("#form-registro");

    if (registro) {
        registro.addEventListener("submit", (evento) => {
            evento.preventDefault();

            if (!validarFormulario(registro)) {
                return;
            }

            const usuario = Object.fromEntries(new FormData(registro));
            usuario.tipo = "Cliente";
            guardarUsuario(usuario);
            mostrarMensaje("mensaje-registro", "Registro guardado.");
            registro.reset();
        });
    }

    const login = document.querySelector("#form-login");

    if (login) {
        login.addEventListener("submit", (evento) => {
            evento.preventDefault();

            if (!validarFormulario(login)) {
                return;
            }

            const datos = Object.fromEntries(new FormData(login));
            const existe = usuariosGuardados().some(
                (usuario) => usuario.correo === datos.correo && usuario.contrasena === datos.contrasena
            );

            mostrarMensaje(
                "mensaje-login",
                existe ? "Inicio de sesión correcto." : "Correo o contraseña incorrectos."
            );
        });
    }

    const adminUsuario = document.querySelector("#form-admin-usuario");

    if (adminUsuario) {
        adminUsuario.addEventListener("submit", (evento) => {
            evento.preventDefault();

            if (!validarFormulario(adminUsuario)) {
                return;
            }

            guardarUsuario(Object.fromEntries(new FormData(adminUsuario)));
            window.location.href = "usuarios.html";
        });
    }

    mostrarUsuarios();
});
