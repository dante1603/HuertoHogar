const regiones={"Región Metropolitana":["Santiago","Maipú","Puente Alto"],"Valparaíso":["Valparaíso","Viña del Mar","Quilpué"],"Maule":["Talca","Curicó","Linares"]};
function cargarRegiones(){const r=document.querySelector("#region"),c=document.querySelector("#comuna");if(!r||!c)return;r.innerHTML=Object.keys(regiones).map(x=>"<option>"+x+"</option>").join("");const cargar=()=>{c.innerHTML=regiones[r.value].map(x=>"<option>"+x+"</option>").join("");};r.addEventListener("change",cargar);cargar();}
document.addEventListener("DOMContentLoaded",cargarRegiones);
