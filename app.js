const products = [
  {id:1,name:'Tênis Urban Flow',brand:'Actv',cat:'feminino',price:199.90,old:229.90,badge:'Novidade',stock:true,sizes:[34,35,36,37,38,39],img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',desc:'Tênis leve e versátil para acompanhar a rotina, com visual urbano e acabamento confortável.'},
  {id:2,name:'Tênis Street Black',brand:'Urban',cat:'masculino',price:219.90,old:null,badge:'Mais vendido',stock:true,sizes:[38,39,40,41,42,43],img:'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=900&q=85',desc:'Design contemporâneo, solado confortável e combinação fácil para looks casuais.'},
  {id:3,name:'Sandália Soft Nude',brand:'Bella',cat:'feminino',price:129.90,old:159.90,badge:'Oferta',stock:true,sizes:[34,35,36,37,38,39],img:'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=900&q=85',desc:'Sandália feminina com linhas minimalistas, tom neutro e foco em conforto.'},
  {id:4,name:'Tênis Kids Color',brand:'Mini',cat:'infantil',price:119.90,old:null,badge:'Novo',stock:true,sizes:[22,23,24,25,26,27],img:'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=85',desc:'Conforto para acompanhar as brincadeiras, com visual leve e divertido.'},
  {id:5,name:'Sapatênis Classic',brand:'City',cat:'masculino',price:189.90,old:219.90,badge:'Oferta',stock:true,sizes:[38,39,40,41,42,43],img:'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=900&q=85',desc:'Um clássico versátil para trabalho e lazer, com acabamento sóbrio.'},
  {id:6,name:'Papete Confort Sand',brand:'Leve',cat:'feminino',price:99.90,old:null,badge:'Conforto',stock:true,sizes:[34,35,36,37,38,39],img:'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=900&q=85',desc:'Papete leve para dias quentes, com palmilha macia e ajuste prático.'},
  {id:7,name:'Body Splash Bloom',brand:'Aura',cat:'beleza',price:59.90,old:null,badge:'Beleza',stock:true,sizes:[],img:'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85',desc:'Fragrância leve para o dia a dia com sensação fresca e delicada.'},
  {id:8,name:'Kit Glow Essentials',brand:'Aura',cat:'beleza',price:89.90,old:109.90,badge:'Oferta',stock:true,sizes:[],img:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85',desc:'Seleção de itens de beleza para uma rotina prática e iluminada.'},
  {id:9,name:'Tênis Runner White',brand:'Actv',cat:'feminino',price:239.90,old:null,badge:'Novo',stock:true,sizes:[35,36,37,38,39],img:'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85',desc:'Silhueta esportiva com visual clean e amortecimento para rotina intensa.'},
  {id:10,name:'Chinelo Essential',brand:'Basic',cat:'masculino',price:69.90,old:null,badge:'Essencial',stock:true,sizes:[39,40,41,42,43],img:'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=900&q=85',desc:'Praticidade e conforto para momentos de descanso e lazer.'},
  {id:11,name:'Tênis Mini Play',brand:'Mini',cat:'infantil',price:139.90,old:null,badge:'Novo',stock:false,sizes:[24,25,26,27,28,29],img:'https://images.unsplash.com/photo-1518894781321-630e638d0742?auto=format&fit=crop&w=900&q=85',desc:'Tênis infantil resistente e confortável para acompanhar a rotina escolar.'},
  {id:12,name:'Sandália Chic Black',brand:'Bella',cat:'feminino',price:149.90,old:179.90,badge:'Oferta',stock:true,sizes:[34,35,36,37,38],img:'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=900&q=85',desc:'Modelo elegante para ocasiões especiais, com acabamento minimalista.'}
];

const brl = v => Number(v).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const qs = (s,ctx=document)=>ctx.querySelector(s);
const qsa = (s,ctx=document)=>[...ctx.querySelectorAll(s)];
let cart = JSON.parse(localStorage.getItem('nmCart') || '[]');

function persistCart(){
  localStorage.setItem('nmCart',JSON.stringify(cart));
  renderCart();
  renderCheckout();
}

function productCard(p){
  const old = p.old ? `<del>${brl(p.old)}</del>` : '';
  const badgeClass = /oferta/i.test(p.badge) ? 'sale' : '';
  const actionLabel = !p.stock ? 'Indisponível' : (p.sizes.length ? 'Ver opções' : 'Adicionar à sacola');
  const actionAttr = !p.stock ? 'disabled aria-disabled="true"' : (p.sizes.length ? `data-view="${p.id}"` : `data-add="${p.id}"`);
  return `<article class="product-card${p.stock?'':' is-unavailable'}" data-id="${p.id}">
    <a class="product-image" href="produto.html?id=${p.id}"><img src="${p.img}" alt="${p.name}" loading="lazy"><span class="badge ${badgeClass}">${p.badge}</span></a>
    <div class="product-meta">
      <small>${p.brand}</small>
      <a href="produto.html?id=${p.id}"><h3>${p.name}</h3></a>
      <div class="product-price"><strong>${brl(p.price)}</strong>${old}</div>
      <span class="installment">ou 4x de ${brl(p.price/4)} sem juros</span>
      <button class="quick-add" type="button" ${actionAttr}>${actionLabel}</button>
    </div>
  </article>`;
}

function addToCart(id,size=''){
  const p=products.find(x=>x.id==id);
  if(!p||!p.stock){toast('Produto indisponível no momento.');return;}
  if(p.sizes.length && !size){
    location.href=`produto.html?id=${p.id}`;
    return;
  }
  const existing=cart.find(x=>x.id==id && String(x.size)===String(size));
  if(existing) existing.qty++;
  else cart.push({id:p.id,qty:1,size});
  persistCart();
  toast('Produto adicionado à sacola.');
}

function removeFromCart(index){
  cart.splice(index,1);
  persistCart();
}

function changeCartQty(index,delta){
  const item=cart[index];
  if(!item)return;
  item.qty=Math.max(1,item.qty+delta);
  persistCart();
}

function renderCart(){
  const count=cart.reduce((s,i)=>s+i.qty,0);
  const el=qs('#cartCount'); if(el) el.textContent=count;
  const items=qs('#cartItems'), empty=qs('#cartEmpty'), footer=qs('#cartFooter');
  if(!items)return;
  if(!cart.length){
    items.innerHTML='';
    if(empty) empty.style.display='block';
    if(footer) footer.style.display='none';
    return;
  }
  if(empty) empty.style.display='none';
  if(footer) footer.style.display='block';
  items.innerHTML=cart.map((it,idx)=>{
    const p=products.find(x=>x.id==it.id);
    return `<div class="cart-row">
      <img src="${p.img}" alt="${p.name}">
      <div class="cart-row-info">
        <small>${p.brand}</small><h4>${p.name}</h4>
        ${it.size?`<small>Tam. ${it.size}</small>`:''}
        <div class="cart-qty" aria-label="Quantidade">
          <button type="button" data-cart-minus="${idx}" aria-label="Diminuir quantidade">−</button>
          <span>${it.qty}</span>
          <button type="button" data-cart-plus="${idx}" aria-label="Aumentar quantidade">+</button>
        </div>
        <strong>${brl(p.price*it.qty)}</strong>
      </div>
      <button class="cart-remove" type="button" data-cart-remove="${idx}">Remover</button>
    </div>`;
  }).join('');
  const sub=cart.reduce((s,it)=>{const p=products.find(x=>x.id==it.id);return s+p.price*it.qty},0);
  const subtotal=qs('#cartSubtotal'); if(subtotal) subtotal.textContent=brl(sub);
}

function toast(msg){
  const t=qs('#toast'); if(!t)return;
  t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2200);
}

function goToSearch(){
  const input=qs('#globalSearch');
  const term=input?.value.trim();
  if(term) location.href=`loja.html?q=${encodeURIComponent(term)}`;
}

function bindChrome(){
  const cartBtn=qs('#cartBtn'),close=qs('#closeCart'),drawer=qs('#cartDrawer'),back=qs('#drawerBackdrop');
  const open=()=>{drawer?.classList.add('open');back?.classList.add('open')};
  const shut=()=>{drawer?.classList.remove('open');back?.classList.remove('open')};
  cartBtn?.addEventListener('click',open); close?.addEventListener('click',shut); back?.addEventListener('click',shut);
  qs('#menuBtn')?.addEventListener('click',()=>qs('#mobileMenu')?.classList.toggle('open'));
  qs('#searchBtn')?.addEventListener('click',()=>qs('#searchPanel')?.classList.toggle('open'));
  qs('#doSearch')?.addEventListener('click',goToSearch);
  qs('#globalSearch')?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();goToSearch();}});

  document.addEventListener('click',e=>{
    const add=e.target.closest('[data-add]');
    if(add) addToCart(Number(add.dataset.add));
    const view=e.target.closest('[data-view]');
    if(view) location.href=`produto.html?id=${view.dataset.view}`;
    const minus=e.target.closest('[data-cart-minus]');
    if(minus) changeCartQty(Number(minus.dataset.cartMinus),-1);
    const plus=e.target.closest('[data-cart-plus]');
    if(plus) changeCartQty(Number(plus.dataset.cartPlus),1);
    const remove=e.target.closest('[data-cart-remove]');
    if(remove) removeFromCart(Number(remove.dataset.cartRemove));
  });
}

function initHome(){
  if(!qs('#featuredProducts'))return;
  qs('#featuredProducts').innerHTML=products.slice(0,6).map(productCard).join('');
  qs('#newProducts').innerHTML=products.slice(4,8).map(productCard).join('');
  qs('#prevFeatured')?.addEventListener('click',()=>qs('#featuredProducts').scrollBy({left:-300,behavior:'smooth'}));
  qs('#nextFeatured')?.addEventListener('click',()=>qs('#featuredProducts').scrollBy({left:300,behavior:'smooth'}));
  qs('#newsletterForm')?.addEventListener('submit',e=>{e.preventDefault();toast('Cadastro realizado com sucesso.');e.target.reset()});
}

function initCatalog(){
  const grid=qs('#catalogProducts'); if(!grid)return;
  const params=new URLSearchParams(location.search), cat=params.get('cat'), term=(params.get('q')||'').toLowerCase();
  const titleMap={novidades:'Novidades',feminino:'Feminino',masculino:'Masculino',infantil:'Infantil',beleza:'Beleza & Cosméticos',ofertas:'Ofertas',tenis:'Tênis'};
  if(cat){
    qs('#catalogTitle').textContent=titleMap[cat]||'Produtos';
    qs('#catalogSubtitle').textContent=cat==='ofertas'?'Preços especiais em itens selecionados.':'Seleção pensada para combinar com o seu estilo.';
  }
  if(term){
    qs('#catalogTitle').textContent=`Resultados para “${params.get('q')}”`;
    qs('#catalogSubtitle').textContent='Veja os itens encontrados para sua busca.';
    const search=qs('#globalSearch'); if(search) search.value=params.get('q');
  }
  let activeSize=null;
  function filtered(){
    let list=[...products];
    if(cat&&cat!=='novidades'&&cat!=='ofertas'&&cat!=='tenis')list=list.filter(p=>p.cat===cat);
    if(cat==='ofertas')list=list.filter(p=>p.old);
    if(cat==='tenis')list=list.filter(p=>/tênis/i.test(p.name));
    if(term)list=list.filter(p=>(p.name+' '+p.brand+' '+p.cat).toLowerCase().includes(term));
    const selected=qsa('.catFilter:checked').map(x=>x.value);
    if(selected.length)list=list.filter(p=>selected.includes(p.cat));
    const max=Number(qs('#priceRange')?.value||300); list=list.filter(p=>p.price<=max);
    if(qs('#inStockOnly')?.checked)list=list.filter(p=>p.stock);
    if(activeSize)list=list.filter(p=>p.sizes.includes(activeSize));
    const sort=qs('#sortSelect')?.value;
    if(sort==='low')list.sort((a,b)=>a.price-b.price);
    if(sort==='high')list.sort((a,b)=>b.price-a.price);
    if(sort==='new')list.reverse();
    return list;
  }
  function render(){
    const list=filtered();
    grid.innerHTML=list.length?list.map(productCard).join(''):`<div class="empty-results"><h3>Nenhum produto encontrado</h3><p>Tente remover alguns filtros ou fazer uma nova busca.</p></div>`;
    const count=qs('#resultCount'); if(count) count.textContent=`${list.length} produto${list.length===1?'':'s'}`;
    const price=qs('#priceLabel'); if(price) price.textContent=`até ${brl(Number(qs('#priceRange')?.value||300))}`;
  }
  qsa('.catFilter').forEach(x=>x.addEventListener('change',render));
  qs('#priceRange')?.addEventListener('input',render);
  qs('#inStockOnly')?.addEventListener('change',render);
  qs('#sortSelect')?.addEventListener('change',render);
  qsa('#sizeFilter button').forEach(b=>b.addEventListener('click',()=>{const n=Number(b.textContent);activeSize=activeSize===n?null:n;qsa('#sizeFilter button').forEach(x=>x.classList.toggle('active',Number(x.textContent)===activeSize));render()}));
  qs('#clearFilters')?.addEventListener('click',()=>{qsa('.catFilter').forEach(x=>x.checked=false);if(qs('#inStockOnly'))qs('#inStockOnly').checked=false;if(qs('#priceRange'))qs('#priceRange').value=300;activeSize=null;qsa('#sizeFilter button').forEach(x=>x.classList.remove('active'));render()});
  qs('#filterToggle')?.addEventListener('click',()=>qs('#filtersPanel')?.classList.toggle('open'));
  render();
}

function initProduct(){
  if(!qs('#productMainImage'))return;
  const id=Number(new URLSearchParams(location.search).get('id')||1),p=products.find(x=>x.id===id)||products[0];
  document.title=`${p.name} — NM Calçados`;
  qs('#crumbName').textContent=p.name; qs('#productName').textContent=p.name; qs('#productBrand').textContent=p.brand;
  qs('#productPrice').textContent=brl(p.price); qs('#oldPrice').textContent=p.old?brl(p.old):''; qs('#productDescription').textContent=p.desc;
  qs('#productMainImage').src=p.img;
  const altImgs=[p.img,p.img.replace('w=900','w=800'),p.img.replace('q=85','q=75'),p.img];
  qs('#productThumbs').innerHTML=altImgs.map((src,i)=>`<button type="button" class="${i===0?'active':''}"><img src="${src}" alt="${p.name}"></button>`).join('');
  qsa('#productThumbs button').forEach((b,i)=>b.addEventListener('click',()=>{qs('#productMainImage').src=altImgs[i];qsa('#productThumbs button').forEach(x=>x.classList.remove('active'));b.classList.add('active')}));

  let selectedSize=p.sizes.length?'':'';
  const addButton=qs('#addCurrentProduct');
  const sizesBox=qs('#productSizes');
  if(p.sizes.length){
    sizesBox.innerHTML=p.sizes.map(s=>`<button type="button" data-size="${s}">${s}</button>`).join('');
    addButton.disabled=true;
    addButton.textContent='Selecione um tamanho';
    const hint=document.createElement('p'); hint.className='size-helper'; hint.id='sizeHelper'; hint.textContent='Escolha um tamanho para continuar.'; sizesBox.insertAdjacentElement('afterend',hint);
    qsa('#productSizes button').forEach(b=>b.addEventListener('click',()=>{
      selectedSize=b.dataset.size;
      qsa('#productSizes button').forEach(x=>x.classList.remove('active')); b.classList.add('active');
      addButton.disabled=false; addButton.textContent='Adicionar à sacola';
      qs('#sizeHelper')?.classList.add('is-selected');
      qs('#sizeHelper').textContent=`Tamanho ${selectedSize} selecionado.`;
      updateWhats();
    }));
  }else{
    sizesBox.innerHTML='<span class="single-size">Tamanho único</span>';
    addButton.disabled=!p.stock;
    addButton.textContent=p.stock?'Adicionar à sacola':'Produto indisponível';
  }
  addButton.addEventListener('click',()=>{
    if(p.sizes.length&&!selectedSize){toast('Selecione um tamanho antes de adicionar.');return;}
    addToCart(p.id,selectedSize);
  });
  function updateWhats(){qs('#whatsProduct').href=`https://wa.me/5535998935465?text=${encodeURIComponent(`Olá! Tenho interesse no ${p.name}${selectedSize?' tamanho '+selectedSize:''}.`)}`;}
  updateWhats();
  qs('#relatedProducts').innerHTML=products.filter(x=>x.id!==p.id).slice(0,4).map(productCard).join('');
}

function cartSubtotal(){
  return cart.reduce((s,it)=>{const p=products.find(x=>x.id==it.id);return s+(p?p.price*it.qty:0)},0);
}

function renderCheckout(){
  const box=qs('#checkoutItems'); if(!box)return;
  const subtotalValue=cartSubtotal();
  if(!cart.length){
    box.innerHTML='<div class="checkout-empty"><strong>Sua sacola está vazia.</strong><a href="loja.html">Voltar para a loja</a></div>';
  }else{
    box.innerHTML=cart.map(it=>{const p=products.find(x=>x.id==it.id);return `<div class="checkout-item"><img src="${p.img}" alt="${p.name}"><div><strong>${p.name}</strong><br><small>${it.size?'Tam. '+it.size+' • ':''}Qtd. ${it.qty}</small></div><strong>${brl(p.price*it.qty)}</strong></div>`}).join('');
  }
  const sub=qs('#checkoutSubtotal'); if(sub) sub.textContent=brl(subtotalValue);
  const total=qs('#checkoutTotal'); if(total) total.textContent=brl(subtotalValue);
  const finish=qs('#fakeFinish'); if(finish) finish.disabled=!cart.length;
}

function initCheckout(){
  if(!qs('#fakeFinish'))return;
  renderCheckout();
  const shipping=qs('#checkoutShipping');
  qsa('.delivery-card').forEach(c=>c.addEventListener('click',()=>{
    qsa('.delivery-card').forEach(x=>x.classList.remove('active')); c.classList.add('active');
    const input=qs('input[type="radio"]',c); if(input) input.checked=true;
    const mode=input?.value||'pickup';
    if(shipping) shipping.textContent=mode==='pickup'?'R$ 0,00':'A calcular';
  }));
  qsa('.payment-tabs button').forEach(b=>b.addEventListener('click',()=>{qsa('.payment-tabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active')}));
  qs('#fakeFinish').addEventListener('click',()=>{
    if(!cart.length){toast('Adicione produtos antes de finalizar.');return;}
    const required=qsa('.checkout-form input[required]');
    const invalid=required.find(i=>!i.value.trim());
    if(invalid){invalid.focus();toast('Preencha os dados obrigatórios para continuar.');return;}
    toast('Revise os dados do pedido antes de confirmar o pagamento.');
  });
}

document.addEventListener('DOMContentLoaded',()=>{bindChrome();renderCart();initHome();initCatalog();initProduct();initCheckout();});