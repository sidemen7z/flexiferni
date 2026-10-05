import { Link } from "react-router-dom";
import { Factory, Ruler, Recycle } from "lucide-react";
import { WHATSAPP_MAIN, waLink, waCheckout, ADDRESS, PRODUCTS, AREAS } from "../data/site";
import { useShop } from "../store/ShopContext";

export function About(){
  return <div className="container section">
    <div className="hero-mini"><div>
      <span className="eyebrow">MADE DIRECTLY IN OUR FACTORY</span>
      <h2 style={{margin:"10px 0"}}>Not a reseller. We manufacture.</h2>
      <p style={{color:"#c9d3ee"}}>All kinds of wooden work - beds, wardrobes, sofas, dining, office. Perfect fit for your space, premium quality built to last, designed for your style. That's why we can offer <b>50% buyback</b> and custom sizes at fair prices.</p>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:12}}><a className="btn btn-orange" target="_blank" rel="noreferrer" href={waLink(WHATSAPP_MAIN,"Hi FlexiFurni! I want a factory visit / custom quote.")}>Get custom quote</a><Link className="btn btn-ghost" style={{background:"#fff"}} to="/gallery">See gallery</Link></div>
    </div><img src="/img/gen/craftsman-assembling-bed-frame.jpg" alt="Factory custom furniture" /></div>
    <div className="grid-3" style={{marginTop:18}}>
      {[[Factory,"Factory-direct","No middlemen. Better wood, better price."],[Ruler,"Perfect fit","Made to your exact wall / room size."],[Recycle,"50% value back","Buy today, sell back tomorrow."]].map(([Icon,t,s])=><div className="panel" key={t}><Icon size={30} color="var(--navy)" strokeWidth={1.6} /><h3>{t}</h3><p style={{color:"#4b587c"}}>{s}</p></div>)}
    </div>
    <div className="panel" style={{marginTop:18}}><h3>For agencies: SEO / AEO / GEO-ready + software</h3><p style={{color:"#4b587c"}}>This site ships with clean URLs (/rent, /buy, /sell, /customize, /category/*), meta descriptions, local-business info ({ADDRESS}), WhatsApp conversion paths, and hooks ready for inventory dashboard, cost calculator & digital card. Ask us for the admin build.</p></div>
  </div>;
}

export function Contact(){
  return <div className="container section">
    <div className="sec-head"><div><h2>Visit / call / WhatsApp</h2><p>Fastest reply is WhatsApp - usually within minutes in daytime.</p></div></div>
    <div className="forms">
      <div className="form"><h3>Store</h3><p><b>FlexiFurni</b><br/>{ADDRESS}<br/><br/>Irfan Shah<br/>Phone: +91 99750 75425<br/>Phone: +91 98228 71537<br/>Phone: +91 77090 48937 (carpets & grass)<br/>Instagram: @shah_enterprises_nibm<br/><small style={{color:"#667085"}}>Shah Enterprises - NIBM, Kondhwa, Pune</small></p>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}><a className="btn btn-wa" target="_blank" rel="noreferrer" href={waLink(WHATSAPP_MAIN,"Hi FlexiFurni! I have a question.")}>Chat now</a><a className="btn btn-navy" href="https://www.google.com/maps/search/?api=1&query=Surya+Building+NIBM+Road+Pune" target="_blank" rel="noreferrer">Open in Maps</a></div>
        <div className="note" style={{marginTop:12}}>Digital card: save our numbers. Instagram / Facebook links can be added here when you share handles.</div>
      </div>
      <div className="form"><h3>Quick enquiry</h3><EnqForm/></div>
    </div>
  </div>;
}

function EnqForm(){
  const { say } = useShop();
  const send = (e)=>{
    e.preventDefault();
    const d = new FormData(e.target);
    const text = `Hi FlexiFurni! Enquiry:\nName: ${d.get("n")}\nPhone: ${d.get("p")}\nNeed: ${d.get("need")}\nMessage: ${d.get("m")}`;
    window.open(waLink(WHATSAPP_MAIN, text),"_blank");
    say("Opening WhatsApp with your enquiry…");
  };
  return <form onSubmit={send}><label>Name</label><input name="n" required placeholder="Your name"/><label>Phone</label><input name="p" required placeholder="98XXXXXXXX"/><label>I need</label><select name="need"><option>Rent</option><option>Buy</option><option>Sell / buyback</option><option>Custom-made</option><option>Office setup</option></select><label>Message</label><textarea name="m" rows="4" placeholder="e.g. 3-seater sofa on rent in Kondhwa, budget 1200/mo"/><button className="btn btn-orange" style={{marginTop:12}}>Send via WhatsApp →</button></form>;
}

export function Cart(){
  const { cart, removeLine, clearCart, tenure } = useShop();
  const rentTotal = cart.filter(c=>c.mode==="rent").reduce((a,c)=>a+c.rent*c.qty,0);
  const buyTotal = cart.filter(c=>c.mode==="buy").reduce((a,c)=>a+c.buy*c.qty,0);
  if(cart.length===0) return <div className="container section"><h2>Your cart is empty</h2><p><Link to="/rent">Browse rentals →</Link> or <Link to="/buy">buy →</Link></p></div>;
  return <div className="container section">
    <h2>Cart ({cart.length}) - {tenure} tenure for rentals</h2>
    <div style={{display:"grid",gap:10,marginTop:14}}>{cart.map(c=><div className="cartline" key={c.key}><img src={c.img} alt=""/><div style={{flex:1}}><b>{c.name}</b><div style={{fontSize:13,color:"#667085"}}>{c.mode}{c.mode==="rent"?` • ${tenure}`:""}{c.meta?.color?` • ${c.meta.color}`:""}{c.meta?.L?` • ${c.meta.L}×${c.meta.W}×${c.meta.H}cm`:""}{c.meta?.addon&&c.meta.addon!=="Only product (no add-on)"?` • ${c.meta.addon}`:""} • Qty {c.qty}</div><b>{c.mode==="rent"?`₹${c.rent}/mo`:`₹${c.buy.toLocaleString("en-IN")}`}</b></div><button className="btn btn-ghost btn-sm" onClick={()=>removeLine(c.key)}>Remove</button></div>)}</div>
    <div className="panel" style={{marginTop:14}}><h3>Totals</h3><p>Rent: <b>₹{rentTotal.toLocaleString("en-IN")}/mo</b> • Buy: <b>₹{buyTotal.toLocaleString("en-IN")}</b></p><div style={{display:"flex",gap:10,flexWrap:"wrap"}}><a className="btn btn-wa" target="_blank" rel="noreferrer" href={waCheckout(cart,tenure)}>Checkout on WhatsApp</a><button className="btn btn-ghost" onClick={clearCart}>Clear cart</button></div><small style={{color:"#667085"}}>Checkout sends the order as a WhatsApp message - no payment online. We confirm delivery slot & collect deposit on delivery.</small></div>
  </div>;
}

export function Wishlist(){
  const { wish, toggleWish } = useShop();
  const list = PRODUCTS.filter(p=>wish.includes(p.id));
  if(list.length===0) return <div className="container section"><h2>Wishlist</h2><p>Tap the heart on any product to save it here.</p><Link className="btn btn-navy" to="/rent">Discover rentals</Link></div>;
  return <div className="container section"><h2>Wishlist ({list.length})</h2><div className="grid" style={{marginTop:12}}>{list.map(p=><div className="card" key={p.id}><div className="ph"><img src={p.img} alt={p.name}/></div><div className="bd"><h4>{p.name}</h4><div className="row"><Link className="btn btn-navy btn-sm" to={`/product/${p.id}`}>View</Link><button className="btn btn-ghost btn-sm" onClick={()=>toggleWish(p.id)}>Remove</button></div></div></div>)}</div></div>;
}

export function Account(){
  const { cart, wish, area, setArea } = useShop();
  return <div className="container section">
    <p className="eyebrow">YOUR ACCOUNT</p>
    <div className="sec-head"><div><h2>Hello, guest.</h2><p>No login needed - your choices are saved on this device. Orders happen on WhatsApp.</p></div></div>
    <div className="forms">
      <div className="form"><h3 style={{marginTop:0}}>Delivery area</h3>
        <select value={area} onChange={e=>setArea(e.target.value)}>{AREAS.map(a=><option key={a}>{a}</option>)}</select>
        <p style={{color:"#667085",fontSize:14}}>Free delivery + installation across Pune.</p>
        <h3>Saved items</h3>
        <p style={{fontSize:15}}><Link to="/wishlist" style={{fontWeight:700}}>Wishlist ({wish.length}) →</Link><br/><Link to="/cart" style={{fontWeight:700}}>Cart ({cart.reduce((a,b)=>a+b.qty,0)}) →</Link></p>
      </div>
      <div className="form"><h3 style={{marginTop:0}}>Your orders</h3>
        <p style={{color:"#4b587c"}}>Every order, repair booking and custom design you send goes to our WhatsApp. To reorder or track, just open the chat - we reply within minutes in daytime.</p>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}><a className="btn btn-wa" target="_blank" rel="noreferrer" href={waLink(WHATSAPP_MAIN,"Hi FlexiFurni! This is about my order.")}>Open WhatsApp chat</a><Link className="btn btn-ghost" to="/contact">Store info</Link></div>
      </div>
    </div>
  </div>;
}

