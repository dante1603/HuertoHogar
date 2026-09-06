window.productos = [
 {codigo:"FR001",nombre:"Manzanas Fuji",precio:1200,stock:150,origen:"Valle del Maule",imagen:"assets/img/manzana.jpg"},
 {codigo:"FR002",nombre:"Naranjas Valencia",precio:1000,stock:200,origen:"Valencia",imagen:"assets/img/naranja.jpg"},
 {codigo:"FR003",nombre:"Plátanos Cavendish",precio:800,stock:250,origen:"Sudeste asiático",imagen:"assets/img/platano.jpg"},
 {codigo:"VE001",nombre:"Zanahorias",precio:900,stock:120,origen:"Chile",imagen:"assets/img/zanahoria.jpg"},
 {codigo:"VE002",nombre:"Espinaca",precio:700,stock:80,origen:"Chile",imagen:"assets/img/espinaca.jpg"},
 {codigo:"AB001",nombre:"Miel",precio:3500,stock:60,origen:"Chile",imagen:"assets/img/miel.jpg"},
 {codigo:"AB002",nombre:"Leche",precio:1200,stock:90,origen:"Chile",imagen:"assets/img/leche.jpg"},
 {codigo:"AB003",nombre:"Quinua",precio:2500,stock:70,origen:"Chile",imagen:"assets/img/quinua.jpg"},
 {codigo:"VE003",nombre:"Pimiento",precio:1100,stock:100,origen:"Chile",imagen:"assets/img/pimiento.jpg"}
];
function mostrarProductos(){const lista=document.querySelector("#lista-productos");if(!lista)return;lista.innerHTML=productos.map(p=>"<article class='producto'><img src='"+p.imagen+"' alt='"+p.nombre+"'><h2>"+p.nombre+"</h2><p>$"+p.precio+"</p><a class='boton' href='detalle-producto.html?codigo="+p.codigo+"'>Ver producto</a> <button onclick=\"agregarAlCarrito('"+p.codigo+"')\">Agregar al carrito</button></article>").join("");}
function mostrarDetalle(){const d=document.querySelector("#detalle-producto");if(!d)return;const p=productos.find(x=>x.codigo===new URLSearchParams(location.search).get("codigo"))||productos[0];d.innerHTML="<img src='"+p.imagen+"' alt='"+p.nombre+"'><h1>"+p.nombre+"</h1><p>Código: "+p.codigo+"</p><p>Precio: $"+p.precio+"</p><p>Stock: "+p.stock+"</p><p>Origen: "+p.origen+"</p><button onclick=\"agregarAlCarrito('"+p.codigo+"')\">Agregar al carrito</button>";}
document.addEventListener("DOMContentLoaded",()=>{mostrarProductos();mostrarDetalle();});

