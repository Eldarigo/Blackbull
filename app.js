const R=n=>"R"+n.toLocaleString("en-ZA",{minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\u00a0/g," ");
const P=[
{id:1,n:"Whey Protein",short:"Whey",cat:"Build muscle",p:649,d:"25 g protein per scoop with 5.5 g BCAAs. Mixes clean in water or milk.",v:["Vanilla 1 kg","Chocolate 1 kg","Vanilla 2 kg"],tag:"Bestseller"},
{id:2,n:"Creatine Monohydrate",short:"Creatine",cat:"Strength",p:299,d:"Micronised creatine, 5 g per serving. One scoop a day, training or rest.",v:["300 g","600 g"]},
{id:3,n:"Pre-Workout",short:"Pre",cat:"Energy",p:379,d:"Caffeine, citrulline and beta-alanine. Take 20 minutes before training.",v:["Berry 300 g","Citrus 300 g"],tag:"New"},
{id:4,n:"Mass Gainer",short:"Gainer",cat:"Build muscle",p:549,d:"50 g protein and 600 calories a serving for hard gainers.",v:["Chocolate 2 kg","Vanilla 2 kg"]},
{id:5,n:"BCAA Recovery",short:"BCAA",cat:"Recovery",p:269,d:"2:1:1 amino acids for muscle recovery between sessions.",v:["Watermelon 400 g","Lemon 400 g"]},
{id:6,n:"Electrolyte Mix",short:"Lytes",cat:"Recovery",p:189,d:"Sodium, potassium and magnesium for long, hot sessions.",v:["Orange 300 g"]},
{id:7,n:"Pump Stim-Free",short:"Pump",cat:"Energy",p:339,d:"Caffeine-free pre-workout for evening training.",v:["Grape 300 g"]},
{id:8,n:"Glutamine",short:"Gluta",cat:"Strength",p:249,d:"Unflavoured L-glutamine for recovery and gut health.",v:["300 g","500 g"]}];
const cats=["All",...new Set(P.map(x=>x.cat))];
let cat="All",cart=[],open=null;
try{cart=JSON.parse(localStorage.getItem("bb-cart")||"[]")}catch(e){cart=[]}
const $=s=>document.querySelector(s);
const save=()=>{try{localStorage.setItem("bb-cart",JSON.stringify(cart))}catch(e){}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ART={1:["bag","#e3201b","#fff"],2:["jar","#f2b705","#0c0c0d"],3:["jar","#7a3cff","#fff"],4:["bag","#1e88e5","#fff"],5:["can","#00a884","#fff"],6:["can","#ff8a00","#0c0c0d"],7:["jar","#e84393","#fff"],8:["jar","#9aa5b1","#0c0c0d"]};
function tub(p){const[s,c,t]=ART[p.id],n=p.short.toUpperCase(),cat=p.cat.toUpperCase(),B="#1b1b1e";
 const label=(y,h)=>`<rect x="0" y="${y}" width="120" height="${h}" fill="${c}"/><path d="M0 ${y}l60 ${h*.55} 60-${h*.55}v${h*.22}L60 ${y+h*.78} 0 ${y+h*.22}z" fill="#000" opacity=".22"/>`;
 let g;
 if(s==="bag")g=`<defs><clipPath id="b${p.id}"><path d="M26 14h68l5 10v104a6 6 0 0 1-6 6H27a6 6 0 0 1-6-6V24z"/></clipPath></defs><g clip-path="url(#b${p.id})"><rect width="120" height="140" fill="${B}"/><rect y="14" width="120" height="10" fill="#2c2c30"/>${label(56,56)}<rect x="28" y="30" width="5" height="100" fill="#fff" opacity=".07"/></g><text x="60" y="46" text-anchor="middle" font-size="11" fill="#f2f0ec" font-family="Barlow Condensed,sans-serif" font-weight="800" letter-spacing="1.5">BLACK BULL</text><text x="60" y="92" text-anchor="middle" font-size="${n.length>6?20:26}" fill="${t}" font-family="Barlow Condensed,sans-serif" font-weight="800">${n}</text><text x="60" y="125" text-anchor="middle" font-size="9" fill="#a09d97" font-family="Barlow,sans-serif">${cat}</text>`;
 else if(s==="jar")g=`<rect x="22" y="10" width="76" height="24" rx="5" fill="${c}"/><rect x="22" y="26" width="76" height="6" fill="#000" opacity=".25"/><svg x="16" y="34" width="88" height="100" viewBox="0 0 120 100" preserveAspectRatio="none"><rect width="120" height="100" rx="10" fill="${B}"/></svg><svg x="16" y="58" width="88" height="46" viewBox="0 0 120 56" preserveAspectRatio="none"><svg>${label(0,56)}</svg></svg><text x="60" y="52" text-anchor="middle" font-size="10" fill="#f2f0ec" font-family="Barlow Condensed,sans-serif" font-weight="800" letter-spacing="1.5">BLACK BULL</text><text x="60" y="88" text-anchor="middle" font-size="${n.length>6?19:25}" fill="${t}" font-family="Barlow Condensed,sans-serif" font-weight="800">${n}</text><text x="60" y="122" text-anchor="middle" font-size="9" fill="#a09d97" font-family="Barlow,sans-serif">${cat}</text>`;
 else g=`<rect x="44" y="6" width="32" height="10" rx="3" fill="#cfcfd2"/><rect x="36" y="14" width="48" height="120" rx="12" fill="${B}"/><svg x="36" y="54" width="48" height="56" viewBox="0 0 120 56" preserveAspectRatio="none"><svg>${label(0,56)}</svg></svg><rect x="42" y="24" width="5" height="100" fill="#fff" opacity=".1"/><text x="60" y="40" text-anchor="middle" font-size="8" fill="#f2f0ec" font-family="Barlow Condensed,sans-serif" font-weight="800" letter-spacing="1">BLACK BULL</text><text x="60" y="88" text-anchor="middle" font-size="15" fill="${t}" font-family="Barlow Condensed,sans-serif" font-weight="800">${n}</text><text x="60" y="124" text-anchor="middle" font-size="7" fill="#a09d97" font-family="Barlow,sans-serif">${cat}</text>`;
 return `<div class="thumb"><svg viewBox="0 0 120 140" role="img" aria-label="${p.n} pack">${g}</svg></div>`}
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("on"),1800)}
function renderChips(){$("#chips").innerHTML=cats.map(c=>`<button class="chip" aria-pressed="${c===cat}" data-c="${c}">${c}</button>`).join("")}
function renderGrid(){
 const q=$("#q").value.trim().toLowerCase(),s=$("#sort").value;
 let l=P.filter(p=>(cat==="All"||p.cat===cat)&&p.n.toLowerCase().includes(q));
 if(s==="lo")l.sort((a,b)=>a.p-b.p);if(s==="hi")l.sort((a,b)=>b.p-a.p);
 $("#grid").innerHTML=l.length?l.map(p=>`<div class="card">${p.tag?`<span class="badge">${p.tag}</span>`:""}<button class="thumb" data-view="${p.id}" aria-label="View ${p.n}">${tub(p).replace(/^<div class="thumb">|<\/div>$/g,"")}</button><div class="info"><h3>${p.n}</h3><span>${p.cat}</span><span class="price">${R(p.p)}</span></div><button class="qa" data-qa="${p.id}">Quick add</button></div>`).join(""):`<div class="empty" style="grid-column:1/-1">Nothing matches “${esc(q)}”. Clear the search or choose another goal.</div>`}
function show(el){["prod","cart"].forEach(i=>{const e=$("#"+i);if(e!==el){e.classList.remove("on");e.hidden=true}});
 if(el){el.hidden=false;requestAnimationFrame(()=>el.classList.add("on"));$("#scrim").classList.add("on");open=el;(el.querySelector("button,input")||el).focus()}
 else{$("#scrim").classList.remove("on");open=null}}
const close=()=>show(null);
function viewProd(id){
 const p=P.find(x=>x.id===id);let v=0,q=1;const el=$("#prod");
 const draw=()=>{el.innerHTML=`<div class="ph"><h2>${p.n}</h2><button class="btn ghost" data-close>Close</button></div>
 <div class="pb">${tub(p)}<div class="row"><b style="font-size:1.6rem">${R(p.p)}</b><span class="muted">${p.cat}</span></div><p class="muted" style="margin:0">${p.d}</p>
 <div><div class="muted" style="margin-bottom:6px">Size and flavour</div><div class="opts">${p.v.map((x,i)=>`<button aria-pressed="${i===v}" data-v="${i}">${x}</button>`).join("")}</div></div>
 <div class="qty" style="width:max-content"><button data-q="-1" aria-label="Decrease quantity">−</button><span>${q}</span><button data-q="1" aria-label="Increase quantity">+</button></div></div>
 <div class="pf"><button class="btn" data-add>Add to cart – ${R(p.p*q)}</button></div>`};
 el.onclick=e=>{const t=e.target.closest("button");if(!t)return;
  if(t.dataset.close!==undefined)close();
  else if(t.dataset.v)v=+t.dataset.v,draw();
  else if(t.dataset.q){q=Math.max(1,Math.min(10,q+ +t.dataset.q));draw()}
  else if(t.dataset.add!==undefined){add(p.id,p.v[v],q);toast("Added to cart");renderCart();show($("#cart"))}};
 draw();show(el)}
function add(id,variant,q){const k=id+"|"+variant,l=cart.find(x=>x.k===k);if(l)l.q=Math.min(10,l.q+q);else cart.push({k,id,variant,q});save();updCount()}
const total=()=>cart.reduce((s,l)=>s+P.find(p=>p.id===l.id).p*l.q,0);
const updCount=()=>{$("#count").textContent=cart.reduce((s,l)=>s+l.q,0)};
function renderCart(step="cart",msg=""){
 const el=$("#cart"),t=total(),FREE=800,ship=t===0||t>=FREE?0:75,pct=Math.min(100,t/FREE*100);
 if(step==="done"){el.innerHTML=`<div class="ph"><h2>Order placed</h2><button class="btn ghost" data-close>Close</button></div><div class="pb"><p>Order <b>${msg}</b> is confirmed. Your receipt is on its way.</p><p class="muted">This is a demo, so nothing was charged.</p></div>`;return}
 if(step==="checkout"){el.innerHTML=`<div class="ph"><h2>Checkout</h2><button class="btn ghost" data-back>Back</button></div>
 <form id="co" novalidate class="pb"><label>Email<input name="email" type="email" autocomplete="email"><span class="err"></span></label>
 <label>Full name<input name="name" autocomplete="name"><span class="err"></span></label>
 <label>Street address<input name="addr" autocomplete="street-address"><span class="err"></span></label>
 <label>City<input name="city" autocomplete="address-level2"><span class="err"></span></label>
 <label>Postal code<input name="zip" inputmode="numeric" maxlength="4" autocomplete="postal-code"><span class="err"></span></label>
 <div class="row"><span>Total</span><b>${R(t+ship)}</b></div><button class="btn" type="submit">Pay ${R(t+ship)}</button></form>`;
  $("#co").onsubmit=e=>{e.preventDefault();const f=e.target,d=Object.fromEntries(new FormData(f)),bad={};
   if(!/^\S+@\S+\.\S+$/.test(d.email))bad.email="Enter a valid email, like name@example.com.";
   if(d.name.trim().length<2)bad.name="Enter your full name.";
   if(d.addr.trim().length<4)bad.addr="Enter your street address.";
   if(!d.city.trim())bad.city="Enter your city.";
   if(!/^\d{4}$/.test(d.zip))bad.zip="Postal codes have 4 digits.";
   f.querySelectorAll("input").forEach(i=>{const m=bad[i.name];i.setAttribute("aria-invalid",!!m);i.nextElementSibling.textContent=m||""});
   const first=Object.keys(bad)[0];if(first){f.elements[first].focus();return}
   const no="BB-"+Math.floor(10000+Math.random()*90000);cart=[];save();updCount();renderCart("done",no)};
  return}
 el.innerHTML=`<div class="ph"><h2>Your cart</h2><button class="btn ghost" data-close>Close</button></div>
 <div class="pb">${cart.length?`<div><div class="bar2"><i style="width:${pct}%"></i></div><p class="muted" style="margin:6px 0 0;font-size:.85rem">${t>=FREE?"Free delivery unlocked.":`Add ${R(FREE-t)} more for free delivery.`}</p></div>`+cart.map(l=>{const p=P.find(x=>x.id===l.id);return `<div class="line">${tub(p)}<div><b>${p.n}</b><div class="muted" style="font-size:.85rem">${l.variant}</div><div class="qty"><button data-d="${l.k}|-1" aria-label="Decrease">−</button><span>${l.q}</span><button data-d="${l.k}|1" aria-label="Increase">+</button></div> <button class="link" data-rm="${l.k}">Remove</button></div><b>${R(p.p*l.q)}</b></div>`}).join(""):`<div class="empty">Your cart is empty.<br>Pick a product to get started.</div>`}</div>
 ${cart.length?`<div class="pf"><div class="row"><span class="muted">Subtotal</span><span>${R(t)}</span></div><div class="row"><span class="muted">Delivery</span><span>${ship?R(ship):"Free"}</span></div><div class="row"><b>Total</b><b>${R(t+ship)}</b></div><button class="btn" data-co>Continue to checkout</button></div>`:""}`}
$("#cart").onclick=e=>{const t=e.target.closest("button");if(!t)return;
 if(t.dataset.close!==undefined)close();
 else if(t.dataset.back!==undefined)renderCart();
 else if(t.dataset.co!==undefined)renderCart("checkout");
 else if(t.dataset.rm){cart=cart.filter(l=>l.k!==t.dataset.rm);save();updCount();renderCart()}
 else if(t.dataset.d){const[k,n]=t.dataset.d.split("|"),l=cart.find(x=>x.k===k);if(!l)return;l.q=Math.min(10,l.q+ +n);if(l.q<1)cart=cart.filter(x=>x!==l);save();updCount();renderCart()}};
$("#grid").onclick=e=>{const v=e.target.closest("[data-view]"),a=e.target.closest("[data-qa]");
 if(v)viewProd(+v.dataset.view);
 else if(a){const p=P.find(x=>x.id===+a.dataset.qa);add(p.id,p.v[0],1);toast(p.n+" added")}};
$("#chips").onclick=e=>{const b=e.target.closest("[data-c]");if(b){cat=b.dataset.c;renderChips();renderGrid()}};
$("#q").oninput=renderGrid;$("#sort").onchange=renderGrid;
$("#shop").onclick=()=>$("#shopTop").scrollIntoView({behavior:"smooth"});
$("#openCart").onclick=()=>{renderCart();show($("#cart"))};
$("#scrim").onclick=close;
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&open)close()});
$("#theme").onclick=()=>{const r=document.documentElement,light=getComputedStyle(r).getPropertyValue("--bg").trim()==="#f4f2ee";r.dataset.theme=light?"dark":"light"};
renderChips();renderGrid();updCount();
$("#heroArt").innerHTML=tub(P[0])+tub(P[2]);
