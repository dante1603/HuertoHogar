const claveCarrito = "huertohogar-carrito";

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem(claveCarrito) || "[]");
}

function guardarCarrito(carrito) {
    localStorage.setItem(claveCarrito, JSON.stringify(carrito));
}

function agregarAlCarrito(codigo) {
    const producto = (window.productos || []).find((item) => item.codigo === codigo);

    if (!producto) {
        return;
    }

    const carrito = obtenerCarrito();
    const productoEnCarrito = carrito.find((item) => item.codigo === codigo);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito(carrito);
    alert("Producto agregado al carrito.");
}

function cambiarCantidad(codigo, cambio) {
    const carrito = obtenerCarrito();
    const producto = carrito.find((item) => item.codigo === codigo);

    if (producto) {
        producto.cantidad += cambio;
    }

    guardarCarrito(carrito.filter((item) => item.cantidad > 0));
    mostrarCarrito();
}

function eliminarProducto(codigo) {
    const carrito = obtenerCarrito().filter((item) => item.codigo !== codigo);

    guardarCarrito(carrito);
    mostrarCarrito();
}

function mostrarCarrito() {
    const contenedor = document.querySelector("#carrito");

    if (!contenedor) {
        return;
    }

    const carrito = obtenerCarrito();
    let total = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío.</p>";
    } else {
        contenedor.innerHTML = carrito
            .map((producto) => {
                total += producto.precio * producto.cantidad;

                return `<p>${producto.nombre} - $${producto.precio} x ${producto.cantidad}
                    <button type="button" onclick="cambiarCantidad('${producto.codigo}', 1)">+</button>
                    <button type="button" onclick="cambiarCantidad('${producto.codigo}', -1)">-</button>
                    <button type="button" onclick="eliminarProducto('${producto.codigo}')">Eliminar</button>
                </p>`;
            })
            .join("");
    }

    const totalElemento = document.querySelector("#total");

    if (totalElemento) {
        totalElemento.textContent = total;
    }
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);
