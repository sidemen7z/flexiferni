import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Search, Heart, ShoppingBag, ArrowRight, ArrowUpRight, X, Phone, Home, LayoutGrid } from "lucide-react";
import { useShop } from "../store/ShopContext";
import { ADDRESS, OFFER, waCheckout } from "../data/site";

export function Topbar(){
  const { area } = useShop();
  return <div className="topbar"><div className="container">
    <span>Deliver to {area}, Pune — Free delivery on every order</span>
    <span>{OFFER.code}: {OFFER.title}</span>
  </div></div>;
}

export function Navbar(){
  const { cart, wish } = useShop();
  const [q,setQ] = useState("");
  const [open,setOpen] = useState(false);
  const [scrolled,setScrolled] = useState(false);
  const loc = useLocation();
  const nav = useNavigate();
  useEffect(()=>{
    const fn = ()=>setScrolled(window.scrollY > 30);
    fn(); window.addEventListener("scroll", fn, { passive:true });
    return ()=>window.removeEventListener("scroll", fn);
  },[loc.pathname]);
  useEffect(()=>{ setOpen(false); },[loc.pathname]);
  const go = (e)=>{ e.preventDefault(); setOpen(false); nav(q?`/search?q=${encodeURIComponent(q)}`:"/rent"); };
  const cartN = cart.reduce((a,b)=>a+b.qty,0);
  const over = loc.pathname==="/" && !scrolled && !open;
  return <>
  <nav className={"nav"+(over?" over":"")+(open?" menuopen":"")}><div className="container nav-inner">
    <Link to="/" className="logo"><img src="/logo.png" alt="FlexiFurni" /></Link>
    <div className="links">
      <NavLink to="/buy" className={({isActive})=>isActive?"active":""}>Buy</NavLink>
      <NavLink to="/rent" className={({isActive})=>isActive?"active":""}>Rent</NavLink>
      <NavLink to="/customize" className={({isActive})=>isActive?"active":""}>Custom</NavLink>
      <NavLink to="/sell" className={({isActive})=>isActive?"active":""}>Sell</NavLink>
      <NavLink to="/gallery" className={({isActive})=>isActive?"active":""}>Gallery</NavLink>
      <NavLink to="/about" className={({isActive})=>isActive?"active":""}>About</NavLink>
      <NavLink to="/contact" className={({isActive})=>isActive?"active":""}>Contact</NavLink>
    </div>
    <div className="nav-actions">
      <form className="searchbar" onSubmit={go}><Search size={16} /><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search furniture..." aria-label="Search" /></form>
      <Link className="icon-btn" to="/wishlist" aria-label="Wishlist"><Heart size={18} />{wish.length>0&&<span className="count">{wish.length}</span>}</Link>
      <Link className="icon-btn" to="/cart" aria-label="Cart"><ShoppingBag size={18} />{cartN>0&&<span className="count">{cartN}</span>}</Link>
      <button className={"hamb"+(open?" open":"")} onClick={()=>setOpen(!open)} aria-label="Menu"><span/><span/><span/></button>
    </div>
  </div></nav>
  <div className={"moverlay"+(open?" open":"")}>
    <button className="mclose" onClick={()=>setOpen(false)} aria-label="Close"><X size={26} /></button>
    <form className="msearch" onSubmit={go}><Search size={17} /><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search furniture..." aria-label="Search" /></form>
    <div className="mlinks">
      {[["/buy","Buy"],["/rent","Rent"],["/customize","Custom"],["/sell","Sell"],["/gallery","Gallery"],["/repair","Repair"],["/room-view","Room Preview"],["/categories","Collections"],["/about","About"],["/contact","Contact"],["/account","Account"]].map(([l,t],i)=><Link key={l} to={l} onClick={()=>setOpen(false)} style={{transitionDelay:(0.04*i)+"s"}}>{t}</Link>)}
    </div>
    <div className="mfoot">
      <a className="btn btn-orange" href="https://wa.me/919975075425" target="_blank" rel="noreferrer"><Phone size={16} /> WhatsApp Us</a>
      <span>Free delivery across Pune</span>
    </div>
  </div>
  </>;
}

export function Footer(){
  return <footer className="footer"><div className="container">
    <div>
      <img src="/logo.png" alt="FlexiFurni" style={{height:52,background:"#fff",borderRadius:10,padding:4}} />
      <p style={{margin:"14px 0",maxWidth:36+"ch"}}>Rent. Buy. Sell. Live Easy. Quality furniture for every home and office — flexible options, factory-direct prices, hassle-free experience.</p>
      <p style={{color:"#8FA0C4",fontSize:13}}>Buy today, sell back tomorrow — up to 50% value back, subject to terms.</p>
    </div>
    <div><h4>SHOP</h4><p><Link to="/buy">Buy furniture</Link><br/><Link to="/rent">Rent furniture</Link><br/><Link to="/sell">Sell / 50% buyback</Link><br/><Link to="/repair">Repair service</Link><br/><Link to="/customize">Custom-made</Link><br/><Link to="/categories">All categories</Link><br/><Link to="/gallery">Photo gallery</Link></p></div>
    <div><h4>COMPANY</h4><p><Link to="/about">About + Factory</Link><br/><Link to="/contact">Contact</Link><br/><Link to="/room-view">View in your room</Link><br/><Link to="/cart">Cart & checkout</Link></p></div>
    <div><h4>OUR STORE</h4><p><b style={{color:"#fff"}}>FlexiFurni</b><br/>{ADDRESS}<br/><br/>Irfan Shah<br/><a href="https://wa.me/919975075425">WhatsApp: +91 99750 75425</a><br/><a href="https://wa.me/919822871537">WhatsApp: +91 98228 71537</a><br/><a href="https://wa.me/917709048937">WhatsApp: +91 77090 48937</a><br/><span style={{color:"#8FA0C4"}}>Instagram: @shah_enterprises_nibm</span></p></div>
  </div>
  <div style={{borderTop:"1px solid #22345F"}}><div className="container" style={{display:"flex",justifyContent:"space-between",padding:"14px 0",fontSize:13,color:"#8FA0C4",flexWrap:"wrap",gap:8}}><span>© 2026 FlexiFurni, Pune.</span><span>Rent · Buy · Sell · Repair · Custom</span></div></div></footer>;
}

export function WhatsFloat(){
  return <div className="wafloat">
    <a title="Chat on WhatsApp" style={{background:"#1FA855"}} href="https://wa.me/919975075425?text=Hi%20FlexiFurni!%20I%20want%20furniture." target="_blank" rel="noreferrer">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.4 14.1c-.2.7-1.3 1.3-1.8 1.4-.5 0-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.3.6-.6.8-.4 1.1.7 1.2 1.6 2 2.8 2.6.3.2.5.1.7-.1l.8-.9c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .7-.6 1.1z"/></svg>
    </a>
  </div>;
}

export function CartDrawer(){
  const { cart, cartOpen, setCartOpen, updateQty, removeLine, tenure } = useShop();
  const rent = cart.filter(c=>c.mode==="rent").reduce((a,c)=>a+c.rent*c.qty,0);
  const buy = cart.filter(c=>c.mode==="buy").reduce((a,c)=>a+c.buy*c.qty,0);
  const n = cart.reduce((a,b)=>a+b.qty,0);
  return <div className={"drawerwrap"+(cartOpen?" open":"")} aria-hidden={!cartOpen}>
    <div className="scrim" onClick={()=>setCartOpen(false)} />
    <aside className="drawer">
      <div className="dhead"><b>Your Cart ({n})</b><button onClick={()=>setCartOpen(false)} aria-label="Close cart"><X size={20} /></button></div>
      <div className="dbody">
        {cart.length===0 && <p style={{color:"var(--muted)"}}>Empty. Add sofas, beds, appliances — checkout on WhatsApp.</p>}
        {cart.map(c=><div className="dline" key={c.key}>
          <img src={c.img} alt="" />
          <div style={{flex:1}}><b style={{fontSize:14}}>{c.name}</b>
            <div style={{fontSize:12.5,color:"var(--muted)"}}>{c.mode}{c.mode==="rent"?` · ${tenure}`:""} · {c.mode==="rent"?`₹${c.rent}/mo`:`₹${c.buy.toLocaleString("en-IN")}`}</div>
            <div className="qty"><button onClick={()=>updateQty(c.key,-1)}>−</button><span>{c.qty}</span><button onClick={()=>updateQty(c.key,1)}>+</button></div>
          </div>
          <button className="rm" onClick={()=>removeLine(c.key)} aria-label="Remove"><X size={15} /></button>
        </div>)}
      </div>
      {cart.length>0 && <div className="dfoot">
        <div style={{display:"flex",justifyContent:"space-between",fontSize:14}}><span>Rent total</span><b>₹{rent.toLocaleString("en-IN")}/mo</b></div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:14}}><span>Buy total</span><b>₹{buy.toLocaleString("en-IN")}</b></div>
        <a className="btn btn-wa" style={{marginTop:10}} target="_blank" rel="noreferrer" href={waCheckout(cart,tenure)}>Checkout on WhatsApp</a>
        <Link className="btn btn-ghost btn-sm" style={{marginTop:8}} to="/cart" onClick={()=>setCartOpen(false)}>View full cart</Link>
      </div>}
    </aside>
  </div>;
}

export function BottomNav(){
  const { cart, wish } = useShop();
  const n = cart.reduce((a,b)=>a+b.qty,0);
  return <nav className="bottomnav">
    <NavLink to="/" end className={({isActive})=>isActive?"on":""}><Home size={21} /><small>Home</small></NavLink>
    <NavLink to="/categories" className={({isActive})=>isActive?"on":""}><LayoutGrid size={21} /><small>Categories</small></NavLink>
    <NavLink to="/wishlist" className={({isActive})=>isActive?"on":""}><span className="nbadge"><Heart size={21} />{wish.length>0&&<i>{wish.length}</i>}</span><small>Wishlist</small></NavLink>
    <NavLink to="/cart" className={({isActive})=>isActive?"on":""}><span className="nbadge"><ShoppingBag size={21} />{n>0&&<i>{n}</i>}</span><small>Cart</small></NavLink>
  </nav>;
}

export function ProductCard({ p, mode }){
  const { addCart, toggleWish, wish, tenure } = useShop();
  const m = mode || (p.type==="rent"?"rent":p.type==="custom"?"buy":"buy");
  const isRent = m==="rent";
  const price = isRent ? Math.round(p.rent*(tenure==="3 mo"?1.25:tenure==="6 mo"?1.1:tenure==="12 mo"?1:0.85)) : p.buy;
  const wished = wish.includes(p.id);
  return <div className="card">
    <div className="ph">
      <Link to={`/product/${p.id}`}><img src={p.img} alt={p.name} loading="lazy" /></Link>
      <span className="ptype">{p.type==="custom"?"CUSTOM-MADE":isRent?"RENT":"BUY"}</span>
      <button className={"wish"+(wished?" on":"")} onClick={()=>toggleWish(p.id)} aria-label="Wishlist">
        <Heart size={17} fill={wished?"currentColor":"none"} />
      </button>
    </div>
    <div className="bd">
      <h4><Link to={`/product/${p.id}`}>{p.name}</Link></h4>
      <div className="meta">{p.rating} / 5 · {p.reviews} reviews</div>
      <div className="price"><b>{isRent?`₹${price.toLocaleString("en-IN")} / month`:`₹${price.toLocaleString("en-IN")}`}</b>{p.mrp&&!isRent&&<s>₹{p.mrp.toLocaleString("en-IN")}</s>}</div>
      <div className="row">
        <button className="btn btn-navy btn-sm" style={{flex:1}} onClick={()=>addCart(p,isRent?"rent":"buy")}>{isRent?"Rent now":"Add to cart"}</button>
        <Link className="btn btn-ghost btn-sm" to={`/product/${p.id}`} aria-label="View details"><ArrowRight size={16} /></Link>
      </div>
    </div>
  </div>;
}

export function CompareSlider({ before, after, title, tag }){
  const ref = useRef(null);
  const [pos,setPos] = useState(50);
  const set = (clientX)=>{
    const r = ref.current.getBoundingClientRect();
    setPos(Math.min(94, Math.max(6, ((clientX-r.left)/r.width)*100)));
  };
  return <div>
    <div className="compare" ref={ref}
      onPointerDown={e=>{ ref.current.setPointerCapture(e.pointerId); set(e.clientX); }}
      onPointerMove={e=>{ if(e.buttons) set(e.clientX); }}>
      <img src={after} alt={title+" after"} draggable={false} />
      <div className="cmp-top" style={{clipPath:`inset(0 ${100-pos}% 0 0)`}}>
        <img src={before} alt={title+" before"} draggable={false} />
      </div>
      <span className="cmp-tag cmp-before">BEFORE</span>
      <span className="cmp-tag cmp-after">AFTER</span>
      <div className="cmp-handle" style={{left:`${pos}%`}}><span>‹ ›</span></div>
      <span className="cmp-hint">DRAG TO COMPARE</span>
    </div>
    <div style={{marginTop:10}}><b style={{fontSize:12,letterSpacing:"1.5px",color:"var(--orange)"}}>{tag}</b>
    <h3 className="serif" style={{margin:"4px 0 0",fontSize:22,color:"var(--navy)"}}>{title}</h3></div>
  </div>;
}

export { ArrowRight, ArrowUpRight };
