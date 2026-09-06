const claveCarrito="huertohogar-carrito";
function obtenerCarrito(){return JSON.parse(localStorage.getItem(claveCarrito)||"[]");}
function guardarCarrito(c){localStorage.setItem(claveCarrito,JSON.stringify(c));}
function agregarAlCarrito(codigo){const p=(window.productos||[]).find(x=>x.codigo===codigo);if(!p)return;const c=obtenerCarrito(),e=c.find(x=>x.codigo===codigo);if(e)e.cantidad++;else c.push(Object.assign({},p,{cantidad:1}));guardarCarrito(c);alert("Producto agregado al carrito.");}
function cambiarCantidad(codigo,cambio){const c=obtenerCarrito(),p=c.find(x=>x.codigo===codigo);if(p)p.cantidad+=cambio;guardarCarrito(c.filter(x=>x.cantidad>0));mostrarCarrito();}
function eliminarProducto(codigo){guardarCarrito(obtenerCarrito().filter(x=>x.codigo!==codigo));mostrarCarrito();}
function mostrarCarrito(){const d=document.querySelector("#carrito");if(!d)return;const c=obtenerCarrito();let total=0;d.innerHTML=c.length?c.map(p=>{total+=p.precio*p.cantidad;return "<p>"+p.nombre+" - $"+p.precio+" x "+p.cantidad+" <button onclick=\"cambiarCantidad('"+p.codigo+"',1)\">+</button> <button onclick=\"cambiarCantidad('"+p.codigo+"',-1)\">-</button> <button onclick=\"eliminarProducto('"+p.codigo+"')\">Eliminar</button></p>";}).join(""):"<p>El carrito está vacío.</p>";const t=document.querySelector("#total");if(t)t.textContent=total;}
document.addEventListener("DOMContentLoaded",mostrarCarrito);
