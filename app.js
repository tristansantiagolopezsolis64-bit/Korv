const O='#5f7034',O2='#859942',O3='#3d4727';

/* Contenido */
const heroData=[
 ['Talento local','Estudiantes con ganas de empezar','Perfiles curados a mano de universidades de Guadalajara.'],
 ['Comercio de barrio','Negocios que crecen contigo','Vitrinas simples para marcas locales que merecen verse.'],
 ['Ofertas','Vacantes de medio tiempo','Trabajos que se acomodan a tu horario de clases.'],
 ['Colaboraciones','Proyectos entre dos mundos','Estudiantes y negocios resolviendo problemas reales.']
];
const shapes=[
 c=>`<circle cx="78%" cy="45%" r="26%" fill="none" stroke="${O}" stroke-width="2"/><circle cx="78%" cy="45%" r="14%" fill="${O3}" opacity=".5"/><path d="M0 85%H100%" stroke="${O}" stroke-width="1"/>`,
 c=>`<rect x="60%" y="14%" width="26%" height="52%" fill="none" stroke="${O}" stroke-width="2"/><rect x="68%" y="26%" width="26%" height="52%" fill="${O3}" opacity=".45"/>`,
 c=>`<path d="M62% 78% 78% 14% 94% 78%Z" fill="none" stroke="${O}" stroke-width="2"/><path d="M70% 78% 78% 40% 86% 78%Z" fill="${O3}" opacity=".5"/>`,
 c=>`<g stroke="${O}" stroke-width="2" fill="none"><rect x="58%" y="16%" width="16%" height="30%"/><rect x="76%" y="16%" width="16%" height="30%" fill="${O3}" fill-opacity=".5"/><rect x="58%" y="50%" width="16%" height="30%" fill="${O3}" fill-opacity=".5"/><rect x="76%" y="50%" width="16%" height="30%"/></g>`
];
const grid='<defs><pattern id="gp" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#1e2318" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#gp)"/>';
hero.innerHTML=heroData.map((d,i)=>`<article class="slide" tabindex="0" data-h="${i}"><svg preserveAspectRatio="none">${grid}${shapes[i%4]()}</svg><div class="tx"><span class="tag">${d[0]}</span><h2>${d[1]}</h2><p>${d[2]}</p></div></article>`).join('');
dots.innerHTML=heroData.map(()=>'<i></i>').join('');

const mini=(i)=>{const v=i%6;return [
 `<circle cx="50%" cy="50%" r="24%" fill="none" stroke="${O}" stroke-width="2"/><circle cx="50%" cy="50%" r="9%" fill="${O2}"/>`,
 `<rect x="28%" y="22%" width="44%" height="56%" fill="none" stroke="${O}" stroke-width="2"/><rect x="38%" y="32%" width="24%" height="36%" fill="${O3}"/>`,
 `<path d="M26% 76% 50% 24% 74% 76%Z" fill="none" stroke="${O}" stroke-width="2"/><circle cx="50%" cy="60%" r="5%" fill="${O2}"/>`,
 `<path d="M20% 70%H80%M20% 50%H65%M20% 30%H50%" stroke="${O}" stroke-width="3"/><circle cx="76%" cy="30%" r="5%" fill="${O2}"/>`,
 `<rect x="24%" y="24%" width="24%" height="52%" fill="${O3}"/><rect x="52%" y="24%" width="24%" height="52%" fill="none" stroke="${O}" stroke-width="2"/>`,
 `<circle cx="38%" cy="50%" r="18%" fill="none" stroke="${O}" stroke-width="2"/><circle cx="62%" cy="50%" r="18%" fill="${O3}" fill-opacity=".6"/>`][v]};
rows.innerHTML=Array.from({length:5},()=>"<section class='row'><h3></h3><button class='arrow p'></button><div class='track'></div><button class='arrow n'></button></section>").join('');

/* Arrastre con mouse (táctil usa swipe nativo) */
function drag(el){
  let down=false,x0=0,s0=0;
  el.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;down=true;el._m=0;x0=e.clientX;s0=el.scrollLeft;el.classList.add('drag')});
  addEventListener('pointermove',e=>{if(down){if(Math.abs(e.clientX-x0)>5)el._m=1;el.scrollLeft=s0-(e.clientX-x0)}});
  addEventListener('pointerup',()=>{if(!down)return;down=false;el.classList.remove('drag')});
  el.addEventListener('dragstart',e=>e.preventDefault());
  el.addEventListener('click',e=>{if(el._m){e.stopPropagation();e.preventDefault();el._m=0}},true);
}
function wire(box,step){
  const tr=box.querySelector('.track');drag(tr);
  box.querySelector('.arrow.p').onclick=()=>tr.scrollBy({left:-step(tr),behavior:'smooth'});
  box.querySelector('.arrow.n').onclick=()=>tr.scrollBy({left:step(tr),behavior:'smooth'});
}
const hb=document.querySelector('.hero');
wire(hb,t=>t.clientWidth+14);
document.querySelectorAll('.row').forEach(r=>wire(r,t=>t.clientWidth*.8));
const ds=[...dots.children];
function upd(){const i=Math.round(hero.scrollLeft/(hero.clientWidth+14));ds.forEach((d,k)=>d.classList.toggle('on',k===i))}
hero.addEventListener('scroll',upd);upd();

/* Utilidades y datos */
const V=document.getElementById('view'),$=i=>document.getElementById(i);
const E=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const ini=n=>n.split(' ').slice(0,2).map(w=>w[0]).join('');
const av=(n,s=72)=>`<div class='av' style='--s:${s}px'>${E(ini(n))}</div>`;
const art=i=>`<svg preserveAspectRatio='none' style='background:linear-gradient(${135+i*25}deg,#1d231a,#0f1210)'>${mini(i)}</svg>`;
const bar=`<div class='vb'><button class='back' data-x>← Volver</button><span class='logo'>KORV</span></div>`;
const MX=n=>Number(n).toLocaleString('es-MX',{style:'currency',currency:'MXN'});
const AUR={pr:'Vendedor',g:'Buscador de talentos',p:'Talento'};
const TREE=[['Comida',['Snacks','Platillos','Bebidas','Postres']],['Ropa y Accesorios',['Hombre','Mujer','Calzado','Accesorios']],['Electrónica',['Celulares','Computación','Audio','Otros accesorios']],['Útiles y Libros Escolares',['Libros escolares','Papelería','Material de estudio']],['Otros / Servicios',['Servicios','Hogar','Varios']]];
const ROLES={comprador:{n:'Comprador',d:'Descubre y compra productos locales',see:'pr'},buscador:{n:'Buscador de talentos',d:'Encuentra estudiantes para tus proyectos',see:'p',k:'g',lb:'Vacante',pb:'Publicar una vacante',ft:'Perfiles de talentos'},vendedor:{n:'Vendedor',d:'Publica y vende tus productos',see:'pr',k:'pr',lb:'Producto',pb:'Publicar un producto'},talento:{n:'Talento',d:'Ofrece tus servicios y tu portafolio',see:'g',k:'p',lb:'Servicio',pb:'Publicar mi perfil de talento',ft:'Vacantes de empleo'}};
const ld=k=>{try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}};
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7),norm=s=>s.trim().toLowerCase(),REG=()=>ld('korv_users')||{},ACC=()=>ld('korv_acc')||{};
let U=null,AU=null,sb=null,pend='',IMG='',IMGB=0,CAT=-1,SUB='',P=ld('korv_posts');
if(!Array.isArray(P))P=[];
P=P.filter(p=>p.k!=='pr'||(p.img&&p.sub)).map(p=>({...p,id:p.id||uid(),o:p.o||String(p.name||'').toLowerCase()}));
const save=()=>{try{if(U){const R=REG();R[U.id]=U;localStorage.setItem('korv_users',JSON.stringify(R))}localStorage.setItem('korv_posts',JSON.stringify(P));return true}catch(e){return false}};
const own=p=>!!U&&p.o===U.id,deny=()=>toast('Acción no permitida: esta publicación pertenece a otra cuenta');
function toast(m){const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),2200)}
function show(h){V.className='';V.innerHTML=h;V.hidden=false;V.scrollTop=0;document.body.style.overflow='hidden';V.focus()}
function closeV(){V.hidden=true;V.innerHTML='';document.body.style.overflow=''}

/* Tarjetas y vistas de detalle: solo lo que escribió el usuario */
const AP=`<button class='arrow p' aria-label='Anterior'><svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke-width='2'><path d='m15 5-7 7 7 7'/></svg></button>`,AN=`<button class='arrow n' aria-label='Siguiente'><svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke-width='2'><path d='m9 5 7 7-7 7'/></svg></button>`;
function cardP(p,j){const pr=p.k==='pr';return `<div class='card' tabindex='0' data-f='${p.id}' data-c='${pr?TREE.findIndex(t=>t[0]===p.cat):''}' data-s='${E(p.sub||'')}' data-d='${E(p.desc||'')}'>${pr?`<img class='cim' src='${p.img}' alt=''>`:art(j)}<div class='m'>${pr?`<i class='cp'>${MX(p.price)}</i>`:''}<b>${E(p.title)}</b><em class='tg'>${E(pr?p.sub:p.k==='p'?'Servicio':p.lb||'Vacante')}</em><span class='au'>${E(p.name)} · ${AUR[p.k]}</span></div></div>`}
const ctb=(p,t)=>own(p)?'':`<p style='margin-top:26px'><button class='btn' data-ct data-s='${E(p.name)}'>${t}</button></p>`;
const who=p=>`<div class='ph'>${av(p.name,48)}<b style='font-weight:400'>${E(p.name)}</b></div>`;
const dprod=p=>bar+`<div class='wrap'><img class='dimg' src='${p.img}' alt='${E(p.title)}'><div class='dpr'>${MX(p.price)}</div><h1>${E(p.title)}</h1><div class='chips'><span class='hl'>${E(p.cat)}</span><span>${E(p.sub)}</span></div><h2>Descripción</h2><div class='dds'>${E(p.desc)}</div><h2>Vendedor</h2>${who(p)}${ctb(p,'Contactar al vendedor')}</div>`;
const dprof=p=>bar+`<div class='wrap'><div class='ph'>${av(p.name,96)}<div><h1>${E(p.name)}</h1><p class='sub'>${E(p.title)}</p></div></div>${p.price?`<div class='kv'><div><small>Tarifa</small>${E(p.price)}</div></div>`:''}<h2>Descripción</h2><div class='dds'>${E(p.desc)}</div>${ctb(p,'Contactar')}</div>`;
const dgig=p=>bar+`<div class='wrap'><span class='tag'>${E(p.lb||'Vacante')}</span><h1>${E(p.title)}</h1>${p.price?`<div class='kv'><div><small>Pago</small>${E(p.price)}</div></div>`:''}<h2>Descripción</h2><div class='dds'>${E(p.desc)}</div><h2>Publicado por</h2>${who(p)}${ctb(p,'Postularme')}</div>`;
const info=d=>bar+`<div class='wrap'><span class='tag'>${d[0]}</span><h1>${d[1]}</h1><div style='height:200px;margin:22px 0;border:1px solid var(--line);border-radius:14px;overflow:hidden'>${art(d[1].length)}</div><p>${d[2]}</p></div>`;
const contact=s=>bar+`<div class='wrap vfw'><div class='ph' style='justify-content:center'>${av(s,72)}</div><h1 style='margin-top:16px'>${E(s)}</h1><p class='sub'>Escribe tu mensaje</p><textarea id='cm' class='fi' rows='4' placeholder='Escribe tu mensaje'></textarea><button class='btn vgo' data-msg data-s='${E(s)}'>Enviar mensaje</button></div>`;
function openP(id){const p=P.find(x=>x.id===id);if(p)show(p.k==='pr'?dprod(p):p.k==='p'?dprof(p):dgig(p))}

/* Formulario de publicación (obligatorio, sin autocompletar) */
function form(r,p){p=p||{};const L=r.k==='p'?['Nombre de tu servicio o portafolio','Tarifa (opcional)']:r.k==='g'?['Título de la vacante','Pago (opcional)']:['Título del producto','Costo exacto en MXN'];
let h=`<label class='lb'>${L[0]}</label><input id='pt' class='fi' maxlength='80' value='${E(p.title)}'>`;
if(r.k==='pr')h+=`<label class='lb'>Categoría</label><select id='pc' class='fi'><option value=''>Selecciona</option>${TREE.map(t=>`<option${p.cat===t[0]?' selected':''}>${E(t[0])}</option>`).join('')}</select><label class='lb'>Subcategoría</label><select id='ps' class='fi'></select>`;
h+=`<label class='lb'>${L[1]}</label><input id='pp' class='fi' ${r.k==='pr'?"type='number' min='0' step='0.01' inputmode='decimal'":''} value='${E(p.price)}'>`;
if(r.k==='pr')h+=`<label class='lb'>Imagen del producto</label><div class='ur'><button type='button' class='btn' id='pib'>${p.img?'Cambiar imagen':'Subir imagen'}</button><span class='un' id='pin'></span></div><input id='pi' class='vh' type='file' accept='image/*' tabindex='-1'><img id='pv' class='pv' alt='Vista previa' ${p.img?`src='${p.img}'`:'hidden'}>`;
return h+`<label class='lb'>Descripción</label><textarea id='pd' class='fi' rows='5' maxlength='1000'>${E(p.desc)}</textarea><div class='err' id='perr'></div>`}
function imgDown(f){return new Promise((ok,no)=>{const r=new FileReader();r.onerror=no;r.onload=()=>{const i=new Image();i.onerror=no;i.onload=()=>{const s=Math.min(1,900/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=Math.round(i.width*s);c.height=Math.round(i.height*s);c.getContext('2d').drawImage(i,0,0,c.width,c.height);ok(c.toDataURL('image/jpeg',.82))};i.src=r.result};r.readAsDataURL(f)})}
function wireForm(p){IMG='';const pc=V.querySelector('#pc');if(!pc)return;const ps=V.querySelector('#ps'),er=V.querySelector('#perr'),fill=()=>{const t=TREE.find(x=>x[0]===pc.value);ps.innerHTML=`<option value=''>Selecciona</option>`+(t?t[1].map(s=>`<option${p&&p.cat===pc.value&&p.sub===s?' selected':''}>${E(s)}</option>`).join(''):'')};fill();pc.onchange=fill;
const fi=V.querySelector('#pi'),pv=V.querySelector('#pv'),pb=V.querySelector('#pib'),pn=V.querySelector('#pin');let tp=0;pb.onclick=()=>{tp++;fi.click();if(tp>1&&!IMG&&!fi.files[0])er.textContent='Si el selector no se abre, revisa los permisos de archivos o fotos de tu navegador'};fi.onchange=()=>{const f=fi.files&&fi.files[0];if(!f)return;if(f.type&&!/^image\//.test(f.type)){er.textContent='El archivo debe ser una imagen';fi.value='';return}er.textContent='';IMGB=1;pb.disabled=true;pn.textContent='Procesando imagen...';imgDown(f).then(u=>{IMG=u;pv.src=u;pv.hidden=false;pn.textContent=f.name;pb.textContent='Cambiar imagen'}).catch(()=>{pn.textContent='';er.textContent='No se pudo leer la imagen. Usa un archivo JPG o PNG'}).finally(()=>{IMGB=0;pb.disabled=false;fi.value=''})}}
function readForm(r,old){const g=s=>V.querySelector(s).value.trim(),ti=g('#pt'),ds=g('#pd');if(!ti)return{err:'El título es obligatorio'};
if(r.k==='pr'){const ci=V.querySelector('#pc').value,si=V.querySelector('#ps').value,pr=g('#pp'),n=Number(pr),im=IMG||(old&&old.img);if(IMGB)return{err:'Procesando la imagen, espera un momento'};if(!ci)return{err:'Selecciona una categoría'};if(!si)return{err:'Selecciona una subcategoría'};if(pr===''||!isFinite(n)||n<=0)return{err:'Ingresa un costo numérico mayor a 0'};if(!im)return{err:'Sube una imagen del producto'};if(!ds)return{err:'La descripción es obligatoria'};return{post:{k:'pr',lb:r.lb,title:ti,desc:ds,cat:ci,sub:si,price:Math.round(n*100)/100,img:im}}}
if(!ds)return{err:'La descripción es obligatoria'};return{post:{k:r.k,lb:r.lb,title:ti,desc:ds,price:g('#pp')}}}
const mine=r=>P.filter(p=>own(p)&&p.k===r.k).map(p=>`<div class='mi'><span>${E(p.title)}</span><button class='back' data-ed='${p.id}'>Editar</button><button class='back' data-dl='${p.id}'>Eliminar</button></div>`).join('')||"<p class='note'>Aún no has publicado nada</p>";
function panel(){const r=ROLES[U.r];show(bar+`<div class='wrap' style='max-width:640px'><div class='ph'>${av(U.n,64)}<div><h1 style='font-size:28px'>${E(U.n)}</h1><p class='sub'>${r.n} · ${U.email?'Cuenta registrada':'Cuenta no registrada'}</p></div></div><h2>Tu descripción</h2><textarea id='bio' class='fi' rows='4' maxlength='400' placeholder='Cuéntanos quién eres y a qué te dedicas'>${E(U.b)}</textarea><p><button class='btn' data-sv>Guardar descripción</button></p>${r.k?`<div class='box' style='margin-top:26px'><h2 style='margin-top:0'>${r.pb}</h2>${form(r)}<button class='btn' data-pub>Publicar</button><p class='note'>Al publicar se te pedirá iniciar sesión con tu correo y contraseña.</p><h2>Tus publicaciones</h2>${mine(r)}</div>`:''}<p><button class='back' data-out>Cerrar sesión</button></p></div>`);wireForm()}
function doPub(p){if(!U)return;p.o=U.id;p.id=uid();p.name=U.n;P.unshift(p);if(!save()){P.shift();toast('No hay espacio suficiente para guardar la publicación');panel();return}IMG='';rfAll();closeV();scrollTo({top:0,behavior:'smooth'});toast('Publicado en la plataforma')}

/* Autenticación con correo: solo en acciones críticas */
const SB_URL='',SB_KEY=''; /* Supabase: URL del proyecto y anon key */
const LIVE=!!(SB_URL&&SB_KEY),DUP='Este correo electrónico ya está vinculado a otra cuenta';
if(LIVE){const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js';s.onload=()=>{sb=window.supabase.createClient(SB_URL,SB_KEY,{auth:{persistSession:false}})};document.head.appendChild(s)}
const hx=async t=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t)))].map(b=>b.toString(16).padStart(2,'0')).join('');
function emailOwner(k){k=k.toLowerCase();const o=Object.values(REG()).find(u=>u.email===k);if(o)return o.id;const a=ACC()[k];return a?(typeof a==='string'?'?':a.u):null}
async function authDo(mode,em,pw){const k=em.toLowerCase();
if(LIVE){if(!sb)throw new Error('Servicio no disponible');const r=mode==='up'?await sb.auth.signUp({email:em,password:pw}):await sb.auth.signInWithPassword({email:em,password:pw});if(r.error){if(/registered|already/i.test(r.error.message))throw new Error(DUP);throw r.error}if(mode==='up'&&!r.data.session)throw new Error('Confirma tu correo y luego inicia sesión');U.email=k;return}
const A=ACC(),h=await hx(k+'|'+pw),o=emailOwner(k);
if(mode==='up'){if(o&&o!==U.id)throw new Error(DUP);if(U.email&&U.email!==k)throw new Error('Esta cuenta ya tiene otro correo vinculado');A[k]={h,u:U.id};localStorage.setItem('korv_acc',JSON.stringify(A))}
else{if(U.email&&k!==U.email)throw new Error('Este correo no corresponde a esta cuenta');if(!o)throw new Error('No existe una cuenta con ese correo. Registra uno para esta cuenta');if(o!==U.id){const e=new Error(DUP+'. Esta cuenta requiere un correo único y libre');e.force=1;throw e}const rc=A[k],hh=typeof rc==='string'?rc:rc&&rc.h;if(hh!==h)throw new Error('Correo o contraseña incorrectos')}
U.email=k}
function authGate(msg,ok){if(AU===U.id){ok();return}const lk=!!U.email;let mode=lk?'in':'up';
const draw=()=>{const li=mode==='in';show(bar+`<div class='wrap vfw'><h1>${li?'Inicia sesión':'Registra tu correo'}</h1><p class='sub'>${msg}</p><input id='ae' class='fi' type='email' placeholder='Correo electrónico' autocomplete='email' ${lk?`value='${E(U.email)}' readonly`:''}><input id='ap' class='fi' type='password' placeholder='Contraseña' autocomplete='${li?'current-password':'new-password'}'><button class='btn vgo' id='ago'>${li?'Iniciar sesión':'Crear cuenta'}</button><div class='vst' id='ast'></div>${lk?'':`<p><button class='back' id='asw'>${li?'Registrar un correo para esta cuenta':'Ya tengo cuenta'}</button></p>`}${LIVE?'':`<p class='note'>Modo local de demostración: las cuentas se guardan solo en este navegador.</p>`}</div>`);
if(!lk)$('asw').onclick=()=>{mode=li?'up':'in';draw()};
$('ae').oninput=()=>{if(mode!=='up'||lk)return;const em=$('ae').value.trim(),o=/^\S+@\S+\.\S+$/.test(em)?emailOwner(em):null,bad=!!o&&o!==U.id;$('ast').textContent=bad?DUP:'';$('ago').disabled=bad};
$('ago').onclick=async()=>{const em=$('ae').value.trim(),pw=$('ap').value,st=$('ast');if(!/^\S+@\S+\.\S+$/.test(em)||pw.length<6){st.textContent='Ingresa un correo válido y una contraseña de 6 o más caracteres';return}$('ago').disabled=true;st.innerHTML=`<div class='spin'></div><span>Verificando...</span>`;try{await authDo(mode,em,pw);AU=U.id;save();ok()}catch(e){if(e.force){mode='up';draw();$('ast').textContent=e.message;return}st.textContent=e.message||'No se pudo iniciar sesión';$('ago').disabled=false}}};draw()}

/* Acciones sobre vistas: cada cuenta solo administra lo suyo */
V.addEventListener('click',e=>{const t=e.target,q=s=>t.closest(s),find=a=>P.find(x=>x.id===q(a).dataset[a.slice(6,8)==='ed'?'ed':a.slice(6,8)==='dl'?'dl':'es']);
if(q('[data-x]'))closeV();
if(q('[data-ct]'))show(contact(q('[data-ct]').dataset.s));
if(q('[data-msg]')){const m=V.querySelector('#cm').value.trim(),s=q('[data-msg]').dataset.s;if(!m){toast('Escribe un mensaje');return}authGate('Inicia sesión para enviar tu mensaje',()=>show(bar+`<div class='wrap vfw'><h1>${LIVE?'Mensaje enviado':'Mensaje registrado'}</h1><p class='sub'>${LIVE?E(s)+' recibirá tu mensaje.':'Modo demostración: el mensaje aún no se entrega a nadie.'}</p></div>`))}
if(q('[data-sv]')){U.b=V.querySelector('#bio').value.trim();save();toast('Descripción guardada')}
if(q('[data-pub]')){const r=ROLES[U.r],f=readForm(r);if(f.err){V.querySelector('#perr').textContent=f.err;return}authGate('Inicia sesión para publicar',()=>doPub(f.post))}
if(q('[data-out]')){U=null;AU=null;closeV();openOnb()}
if(q('[data-ed]')){const p=find('[data-ed]');if(!p||!own(p))return deny();show(bar+`<div class='wrap vfw'><h1>Editar publicación</h1>${form(ROLES[U.r],p)}<button class='btn vgo' data-es='${p.id}'>Guardar cambios</button></div>`);wireForm(p)}
if(q('[data-dl]')){const b=q('[data-dl]'),p=find('[data-dl]');if(!p||!own(p))return deny();if(!b.dataset.arm){b.dataset.arm=1;b.textContent='Confirmar';return}P=P.filter(x=>x.id!==p.id);save();rfAll();panel()}
if(q('[data-es]')){const p=find('[data-es]');if(!p||!own(p))return deny();const f=readForm(ROLES[U.r],p);if(f.err){V.querySelector('#perr').textContent=f.err;return}Object.assign(p,f.post);if(!save()){toast('No hay espacio suficiente para guardar los cambios');return}IMG='';rfAll();closeV();toast('Cambios guardados')}});

/* Categorías, subcategorías y búsqueda */
$('cats').innerHTML=TREE.map(([c],i)=>`<button class='cat' data-c='${i}'>${E(c)}</button>`).join('');
function setSubs(){const s=$('subs'),pr=!!U&&ROLES[U.r].see==='pr';document.body.classList.toggle('hc',pr);if(!pr||CAT<0){s.hidden=true;s.innerHTML='';document.body.classList.remove('hs');return}s.innerHTML=TREE[CAT][1].map(x=>`<button class='cat${x===SUB?' on':''}' data-s='${E(x)}'>${E(x)}</button>`).join('');s.hidden=false;document.body.classList.add('hs')}
$('cats').addEventListener('click',e=>{const b=e.target.closest('.cat');if(!b)return;const i=+b.dataset.c;CAT=CAT===i?-1:i;SUB='';document.querySelectorAll('#cats .cat').forEach(x=>x.classList.toggle('on',+x.dataset.c===CAT));setSubs();applyF()});
$('subs').addEventListener('click',e=>{const b=e.target.closest('.cat');if(!b)return;SUB=SUB===b.dataset.s?'':b.dataset.s;setSubs();applyF()});
drag($('cats'));drag($('subs'));
function applyF(){const qv=$('q').value.trim().toLowerCase(),pr=!!U&&ROLES[U.r].see==='pr';let n=0,tot=0;
document.querySelectorAll('#feed .card,#rows .card').forEach(c=>{if(c.closest('section').hidden)return;tot++;const ok=(!pr||CAT<0||+c.dataset.c===CAT)&&(!pr||!SUB||c.dataset.s===SUB)&&(!qv||c.querySelector('b').textContent.toLowerCase().includes(qv)||(c.dataset.d||'').toLowerCase().includes(qv));c.classList.toggle('fh',!ok);if(ok)n++});
document.querySelectorAll('#feed section,#rows section').forEach(s=>s.classList.toggle('fh',!s.hidden&&!s.querySelector('.card:not(.fh)')));
const m=$('nores');m.hidden=n>0||!U;m.textContent=!tot?'Aún no hay publicaciones':qv?(pr?'No se encontraron productos para tu búsqueda':'No se encontraron resultados para tu búsqueda'):'No hay productos en esta categoría'}
$('q').addEventListener('input',applyF);

/* Filas y feed */
const SEC=[...rows.children],feedEl=$('feed');
function renderRows(){const pr=!!U&&ROLES[U.r].see==='pr';SEC.forEach((s,j)=>{if(!pr){s.hidden=true;s.innerHTML='';return}s.innerHTML=`<h3>${E(TREE[j][0])}</h3>${AP}<div class='track'>${P.filter(p=>p.k==='pr'&&p.cat===TREE[j][0]).map((p,i)=>cardP(p,i+j)).join('')}</div>${AN}`;wire(s,w=>w.clientWidth*.8);s.hidden=false})}
function rf(){const R=U&&ROLES[U.r],L=R&&R.see!=='pr'?P.filter(p=>p.k===R.see):[];if(!L.length){feedEl.innerHTML='';return}feedEl.innerHTML=`<section class='row'><h3>${R.ft}</h3>${AP}<div class='track'>${L.map((p,j)=>cardP(p,j+2)).join('')}</div>${AN}</section>`;wire(feedEl.firstChild,w=>w.clientWidth*.8)}
function rfAll(){renderRows();rf();applyF()}
[rows,feedEl].forEach(c=>{c.addEventListener('click',e=>{const k=e.target.closest('.card');if(k)openP(k.dataset.f)});c.addEventListener('keydown',e=>{if(e.key==='Enter'){const k=e.target.closest('.card');if(k)openP(k.dataset.f)}})});
hero.addEventListener('click',e=>{const s=e.target.closest('.slide');if(s)show(info(heroData[+s.dataset.h]))});

/* Acceso: usuario primero, sin sesión persistente */
const s0=$('s0'),s1=$('s1'),s2=$('s2'),nmI=$('nmI'),ob=$('onb'),meB=$('meB');
$('rolesB').innerHTML=Object.entries(ROLES).map(([k,r])=>`<button class='role' data-role='${k}'><b>${r.n}</b><small>${r.d}</small></button>`).join('');
function openOnb(){ob.hidden=false;document.body.style.overflow='hidden';document.querySelector('header').inert=document.querySelector('main').inert=true;s0.hidden=false;s1.hidden=true;s2.hidden=true;nmI.value='';pend='';setTimeout(()=>nmI.focus(),60)}
s0.addEventListener('submit',e=>{e.preventDefault();const n=nmI.value.trim();if(!n)return;const a=REG()[norm(n)];if(a){U=a;enterApp()}else{pend=n;$('s2t').textContent=n;s0.hidden=true;s2.hidden=false}});
$('yes').onclick=()=>{s2.hidden=true;s1.hidden=false};
$('no').onclick=()=>{s2.hidden=true;s0.hidden=false;nmI.focus()};
ob.addEventListener('click',e=>{const b=e.target.closest('[data-role]');if(b&&pend){const id=norm(pend),R=REG();if(R[id])U=R[id];else{U={id,n:pend,r:b.dataset.role,b:''};save()}enterApp()}if(e.target.closest('[data-bk]')){s1.hidden=true;s2.hidden=false}});
function enterApp(){ob.hidden=true;document.querySelector('header').inert=document.querySelector('main').inert=false;document.body.style.overflow='';meB.innerHTML=av(U.n,34);meB.title=U.n+' · '+ROLES[U.r].n;CAT=-1;SUB='';document.querySelectorAll('#cats .cat').forEach(x=>x.classList.remove('on'));$('cats').hidden=ROLES[U.r].see!=='pr';setSubs();$('pubB').hidden=!ROLES[U.r].k;$('q').value='';rfAll();scrollTo(0,0)}
$('pubB').onclick=()=>U&&panel();meB.onclick=()=>U&&panel();
addEventListener('keydown',e=>{if(e.key==='Escape'&&!V.hidden)closeV()});
addEventListener('pageshow',e=>{if(e.persisted)location.reload()});

/* Autoplay del hero cada 5 s */
let hp=0,timer;
function step(){if(hp||document.hidden||!V.hidden)return;const w=hero.clientWidth+14,i=(Math.round(hero.scrollLeft/w)+1)%ds.length;hero.scrollTo({left:i*w,behavior:'smooth'})}
hb.addEventListener('mouseenter',()=>hp=1);hb.addEventListener('mouseleave',()=>hp=0);
hb.addEventListener('touchstart',()=>hp=1,{passive:true});hb.addEventListener('touchend',()=>setTimeout(()=>hp=0,3000));

/* Entrar */
enter.onclick=()=>{splash.classList.add('out');setTimeout(()=>splash.remove(),950);timer=setInterval(step,5000);openOnb()};
