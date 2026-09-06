const dominiosPermitidos=/^[^@\s]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
function validarCorreo(c){return dominiosPermitidos.test(c);}
function validarRun(run){const x=run.replace(/[.-]/g,"");if(!/^\d{7,9}$/.test(x))return false;const cuerpo=x.slice(0,-1),digito=x.slice(-1).toUpperCase();let suma=0,f=2;for(let i=cuerpo.length-1;i>=0;i--){suma+=Number(cuerpo[i])*f;f=f===7?2:f+1;}const r=11-(suma%11),esperado=r===11?"0":r===10?"K":String(r);return digito===esperado;}
function validarFormulario(form){const c=form.elements.correo;if(c&&!validarCorreo(c.value)){alert("Correo no permitido.");return false;}const r=form.elements.run;if(r&&!validarRun(r.value)){alert("RUN no válido.");return false;}return true;}
document.addEventListener("DOMContentLoaded",()=>document.querySelectorAll("form").forEach(f=>f.addEventListener("submit",e=>{if(!validarFormulario(f))e.preventDefault();})));
