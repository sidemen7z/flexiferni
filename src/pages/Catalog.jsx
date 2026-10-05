import { useMemo, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { CATEGORIES, PRODUCTS, subName } from "../data/site";
import { ProductCard } from "../components/ui";
import { useShop } from "../store/ShopContext";

function useCatalog(filterMode){
  const [q,setQ] = useState("");
  const [cat,setCat] = useState("all");
  const [sort,setSort] = useState("pop");
  const [max,setMax] = useState(60000);
  const { tenure, setTenure } = useShop();
  const list = useMemo(()=>{
    let l = PRODUCTS.filter(p=> filterMode==="all" ? true : filterMode==="rent" ? p.type!=="buy"&&p.type!=="custom" : filterMode==="buy" ? p.type!=="rent" : true);
    if(cat!=="all") l = l.filter(p=>p.category===cat);
    if(q) l = l.filter(p=>(p.name+p.desc+p.category).toLowerCase().includes(q.toLowerCase()));
    l = l.filter(p=>(filterMode==="rent"?p.rent:p.buy)<=max);
    const val = (p)=>(filterMode==="rent"?(p.rent||p.buy):p.buy);
    if(sort==="low") l=[...l].sort((a,b)=>val(a)-val(b));
    if(sort==="high") l=[...l].sort((a,b)=>val(b)-val(a));
    if(sort==="rate") l=[...l].sort((a,b)=>b.rating-a.rating);
    return l;
  },[q,cat,sort,max,filterMode]);
  return { q,setQ,cat,setCat,sort,setSort,max,setMax,list,tenure,setTenure };
}

function Toolbar({ t, mode }){
  return <div className="filters">
    <input placeholder="Search sofa, bed, fridge…" value={t.q} onChange={e=>t.setQ(e.target.value)} style={{flex:"1 1 200px"}} />
    <select value={t.cat} onChange={e=>t.setCat(e.target.value)}>{["all",...CATEGORIES.map(c=>c.slug)].map(s=><option key={s} value={s}>{s==="all"?"All categories":s.replace("-"," ")}</option>)}</select>
    <select value={t.sort} onChange={e=>t.setSort(e.target.value)}><option value="pop">Sort: Popular</option><option value="low">Price: Low → High</option><option value="high">Price: High → Low</option><option value="rate">Rating</option></select>
    <select value={t.max} onChange={e=>t.setMax(+e.target.value)}><option value={60000}>Budget: Any</option><option value={1000}>Rent under ₹1000/mo</option><option value={1500}>Rent under ₹1500/mo</option><option value={30000}>Buy under ₹30k</option><option value={50000}>Buy under ₹50k</option></select>
    {mode==="rent"&&<div className="tenure">{["3 mo","6 mo","12 mo","24 mo"].map(x=><button key={x} className={t.tenure===x?"on":""} onClick={()=>t.setTenure(x)}>{x}</button>)}</div>}
  </div>;
}

export function Rent(){
  const t = useCatalog("rent");
  return <div className="container section">
    <div className="sec-head"><div><h2>Rent furniture — flexible monthly plans</h2><p>Free delivery in Pune • Free swap & service • Zero-hassle return. Longer tenure = lower rent.</p></div><Link className="btn btn-ghost btn-sm" to="/combo">1BHK Combos</Link></div>
    <Toolbar t={t} mode="rent" />
    <div className="grid">{t.list.map(p=><ProductCard key={p.id} p={p} mode="rent" />)}</div>
    {t.list.length===0&&<p>No matches. Try clearing filters or <Link to="/customize">custom-make it</Link>.</p>}
  </div>;
}

export function Buy(){
  const t = useCatalog("buy");
  return <div className="container section">
    <div className="sec-head"><div><h2>Buy furniture — factory-direct + 50% buyback</h2><p>Buy today, sell back tomorrow. We give 50% of the value back.* Solid wood, premium finish.</p></div></div>
    <Toolbar t={t} mode="buy" />
    <div className="grid">{t.list.map(p=><ProductCard key={p.id} p={p} mode="buy" />)}</div>
  </div>;
}

export function Categories(){
  return <div className="container section">
    <div className="sec-head"><div><h2>Shop by category</h2><p>Living, bedroom, dining, office, appliances + custom-made.</p></div></div>
    <div className="grid-3">{CATEGORIES.map(c=>{
      const n = PRODUCTS.filter(p=>p.category===c.slug).length;
      return <Link key={c.slug} to={`/category/${c.slug}`} className="card"><div className="ph" style={{height:190}}><img src={c.img} alt={c.name}/></div><div className="bd"><h4>{c.name}</h4><div className="meta">{n} products • Rent + Buy</div><span className="btn btn-navy btn-sm" style={{marginTop:6}}>Explore →</span></div></Link>;
    })}</div>
  </div>;
}

export function CategoryView(){
  const { slug } = useParams();
  const c = CATEGORIES.find(x=>x.slug===slug);
  const list = PRODUCTS.filter(p=>p.category===slug);
  if(!c) return <div className="container section">Category not found.</div>;
  return <div className="container section">
    <div className="hero-mini" style={{marginBottom:18}}><div><h2 style={{margin:0}}>{c.name}</h2><p style={{color:"#c9d3ee"}}>Rent or buy {c.name.toLowerCase()} in Pune with fast delivery. Custom sizes available — talk to us on WhatsApp.</p></div><img src={c.img} alt={c.name}/></div>
    <div className="grid">{list.map(p=><ProductCard key={p.id} p={p} />)}</div>
    {list.length===0&&<div className="note">Nothing listed here yet — but we custom-make {c.name.toLowerCase()} in our factory. <Link to="/customize">Get a quote →</Link></div>}
  </div>;
}

export function SearchView(){
  const [sp] = useSearchParams();
  const q = (sp.get("q")||"").toLowerCase();
  const list = PRODUCTS.filter(p=>(p.name+p.desc+p.category).toLowerCase().includes(q));
  return <div className="container section"><h2>Results for “{sp.get("q")}” ({list.length})</h2><div className="grid" style={{marginTop:14}}>{list.map(p=><ProductCard key={p.id} p={p}/>)}</div></div>;
}

export function SubView(){
  const { slug } = useParams();
  const name = subName(slug);
  const list = name==="Best Deals"
    ? PRODUCTS.filter(p=>p.mrp&&p.buy&&p.mrp>p.buy*1.15)
    : PRODUCTS.filter(p=>p.sub===name);
  return <div className="container section">
    <p className="eyebrow">{name==="Best Deals"?"DISCOUNTED":"SHOP BY TYPE"}</p>
    <div className="sec-head"><div><h2>{name} ({list.length})</h2><p>Rent or buy {name.toLowerCase()} in Pune with free delivery. Custom sizes made in our factory.</p></div></div>
    {list.length>0
      ? <div className="grid">{list.map(p=><ProductCard key={p.id} p={p}/>)}</div>
      : <div className="panel"><h3 style={{marginTop:0}}>Coming to our catalogue soon</h3><p style={{color:"var(--muted)"}}>We don't stock ready {name.toLowerCase()} yet — but our factory builds them to order in 10–14 days. Send us a photo of what you like.</p><div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:8}}><Link className="btn btn-orange" to="/customize">Custom-make it</Link><Link className="btn btn-ghost" to="/contact">Ask on WhatsApp</Link></div></div>}
  </div>;
}
