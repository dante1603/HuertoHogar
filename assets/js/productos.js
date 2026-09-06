window.productos = [
    {
        codigo: "FR001",
        nombre: "Manzanas Fuji",
        precio: 1200,
        stock: 150,
        origen: "Valle del Maule",
        imagen: "assets/img/manzana.jpg"
    },
    {
        codigo: "FR002",
        nombre: "Naranjas Valencia",
        precio: 1000,
        stock: 200,
        origen: "Valencia",
        imagen: "assets/img/naranja.jpg"
    },
    {
        codigo: "FR003",
        nombre: "Plátanos Cavendish",
        precio: 800,
        stock: 250,
        origen: "Sudeste asiático",
        imagen: "assets/img/platano.jpg"
    },
    {
        codigo: "VE001",
        nombre: "Zanahorias",
        precio: 900,
        stock: 120,
        origen: "Chile",
        imagen: "assets/img/zanahoria.jpg"
    },
    {
        codigo: "VE002",
        nombre: "Espinaca",
        precio: 700,
        stock: 80,
        origen: "Chile",
        imagen: "assets/img/espinaca.jpg"
    },
    {
        codigo: "AB001",
        nombre: "Miel",
        precio: 3500,
        stock: 60,
        origen: "Chile",
        imagen: "assets/img/miel.jpg"
    },
    {
        codigo: "AB002",
        nombre: "Leche",
        precio: 1200,
        stock: 90,
        origen: "Chile",
        imagen: "assets/img/leche.jpg"
    },
    {
        codigo: "AB003",
        nombre: "Quinua",
        precio: 2500,
        stock: 70,
        origen: "Chile",
        imagen: "assets/img/quinua.jpg"
    },
    {
        codigo: "VE003",
        nombre: "Pimiento",
        precio: 1100,
        stock: 100,
        origen: "Chile",
        imagen: "assets/img/pimiento.jpg"
    }
];

function tarjetaProducto(producto, incluirAcciones = true) {
    const acciones = incluirAcciones
        ? `<a class="boton" href="detalle-producto.html?codigo=${producto.codigo}">Ver producto</a>
            <button type="button" onclick="agregarAlCarrito('${producto.codigo}')">Agregar al carrito</button>`
        : "";

    return `<article class="producto">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h2>${producto.nombre}</h2>
        <p>$${producto.precio}</p>
        ${acciones}
    </article>`;
}

function mostrarDestacados() {
    const contenedor = document.querySelector("#productos-destacados");

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = productos
        .slice(0, 3)
        .map((producto) => tarjetaProducto(producto, false))
        .join("");
}

function mostrarProductos() {
    const lista = document.querySelector("#lista-productos");

    if (!lista) {
        return;
    }

    lista.innerHTML = productos
        .map((producto) => tarjetaProducto(producto))
        .join("");
}

function mostrarDetalle() {
    const contenedor = document.querySelector("#detalle-producto");

    if (!contenedor) {
        return;
    }

    const codigo = new URLSearchParams(window.location.search).get("codigo");
    const producto = productos.find((item) => item.codigo === codigo);

    if (!producto) {
        contenedor.innerHTML = "<p>Producto no encontrado.</p>";
        return;
    }

    contenedor.innerHTML = `<article class="producto">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h1>${producto.nombre}</h1>
        <p>Código: ${producto.codigo}</p>
        <p>Precio: $${producto.precio}</p>
        <p>Stock: ${producto.stock}</p>
        <p>Origen: ${producto.origen}</p>
        <button type="button" onclick="agregarAlCarrito('${producto.codigo}')">Agregar al carrito</button>
    </article>`;
}

function mostrarProductosAdmin() {
    const lista = document.querySelector("#lista-productos-admin");

    if (!lista) {
        return;
    }

    lista.innerHTML = productos
        .map((producto) => `<tr>
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>${producto.stock}</td>
            <td><a href="admin-producto.html">Editar</a></td>
        </tr>`)
        .join("");
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarDestacados();
    mostrarProductos();
    mostrarDetalle();
    mostrarProductosAdmin();
});
