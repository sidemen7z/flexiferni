import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { CATEGORIES, PRODUCTS, FABRICS, WHATSAPP_MAIN, waLink, MAKEOVERS } from "../data/site";
import { ProductCard, CompareSlider } from "../components/ui";

const CAT_SUB = {
  "living-room": "Sofas · Tables", "bedroom": "Beds · Wardrobes", "dining": "Tables · Chairs",
  "home-office": "Desks · Chairs", "appliances": "Fridge · Washers", "wooden-work": "Shelves · Storage",
  "custom-made": "Made to measure", "decor": "Carpets · Grass",
};

function Reveal({ children, delay = 0 }){
  const ref = useRef(null);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    let done = false;
    const show = ()=>{ if(!done){ done = true; el.classList.add("in"); } };
    // Safety net: never leave content invisible (e.g. if observer never fires)
    const fallback = setTimeout(show, 2500);
    if(!("IntersectionObserver" in window)){ show(); clearTimeout(fallback); return; }
    const io = new IntersectionObserver(([e])=>{ if(e.isIntersecting){ show(); clearTimeout(fallback); io.disconnect(); } },{ threshold:0.12 });
    io.observe(el);
    return ()=>{ clearTimeout(fallback); io.disconnect(); };
  },[]);
  return <div ref={ref} className="reveal" style={{transitionDelay:delay+"ms"}}>{children}</div>;
}

/* ---------------- full-screen slideshow hero ---------------- */
const SLIDES = [
  { img:"/img/gen/bright-living-room-with-sofa.jpg", eye:"LIVING ROOMS", h1:["Furniture made","for the way you live."], cap:"Rented, owned, custom-made" },
  { img:"/img/gen/bedroom-furniture-with-solid-woo.jpg", eye:"BEDROOMS", h1:["Solid wood.","Honest prices."], cap:"Factory-direct, delivered free" },
  { img:"/img/gen/modern-apartment-living-room-fur.jpg", eye:"FULL HOMES", h1:["Empty flat to furnished","in 48 hours."], cap:"1BHK combos from ₹3,999/mo" },
  { img:"/img/gen/beige-sectional-and-coffee-table.jpg", eye:"SOFAS", h1:["Sink-in comfort,","custom fabrics."], cap:"8 colours · any size" },
  { img:"/img/gen/living-room-with-carpet.jpg", eye:"DECOR", h1:["Kashmiri carpets.","Green turf."], cap:"Best price in Pune" },
];
function Hero(){
  const [i,setI] = useState(0);
  const [pause,setPause] = useState(false);
  useEffect(()=>{
    if(pause) return;
    const t = setInterval(()=>setI(v=>(v+1)%SLIDES.length), 7000);
    return ()=>clearInterval(t);
  },[pause]);
  const s = SLIDES[i];
  return <section className="hero-cine" onMouseEnter={()=>setPause(true)} onMouseLeave={()=>setPause(false)}>
    {SLIDES.map((s,k)=><div key={s.img} className={"cine-slide"+(k===i?" on":"")}><img src={s.img} alt="" fetchPriority={k===0?"high":"auto"} /></div>)}
    <div className="cine-shade" />
    <div className="container cine-content">
      <div className="cine-rise" key={i}>
        <p className="cine-eyebrow">{s.eye} — FLEXIFURNI PUNE</p>
        <h1>{s.h1[0]}<br/>{s.h1[1]}</h1>
        <div className="hero-cta">
          <Link className="btn btn-light btn-lg" to="/buy">Shop Furniture</Link>
          <Link className="btn btn-ghost btn-lg cine-ghost" to="/rent">Explore Rentals</Link>
        </div>
        <p className="cine-cap">{s.cap}</p>
      </div>
    </div>
    <div className="cine-progress">
      <span>0{i+1}</span>
      <div className="cbar"><div key={i} className={pause?"fill paused":"fill"} /></div>
      <span>0{SLIDES.length}</span>
    </div>
  </section>;
}

const NEEDS = [
  { t:"BUY", d:"New furniture with 50% buyback promise.", img:"/img/gen/solid-wood-king-bed.jpg", l:"/buy", c:"Explore" },
  { t:"RENT", d:"Flexible monthly rental, free swap.", img:"/img/gen/beige-sofa-in-bright-room.jpg", l:"/rent", c:"Explore" },
  { t:"CUSTOM", d:"Made for your space, in our factory.", img:"/img/gen/modular-sofa-with-material-swatches.jpg", l:"/customize", c:"Design yours" },
  { t:"SELL", d:"Sell your furniture, get value back.", img:"/img/gen/tan-leatherette-3-seater-sofa.jpg", l:"/sell", c:"Get started" },
];

function Needs(){
  return <section className="section"><div className="container">
    <Reveal><div className="sec-head"><p className="eyebrow">WHAT DO YOU NEED?</p><h2>Four ways to furnish.</h2></div></Reveal>
    <div className="need4">{NEEDS.map((n,k)=><Reveal key={n.t} delay={k*80}><Link to={n.l} className="needcard">
      <img src={n.img} alt={n.t} loading="lazy" />
      <div className="t"><h3>{n.t}</h3><p>{n.d}</p><span style={{fontWeight:700,color:"var(--orange)",fontSize:14.5}}>{n.c} →</span></div>
    </Link></Reveal>)}</div>
  </div></section>;
}

function Categories(){
  return <section className="section" style={{paddingTop:0}}><div className="container">
    <Reveal><div className="sec-head"><h2>Shop by category</h2><p>Real catalogue, real sizes, delivered across Pune.</p></div></Reveal>
  </div>
  <div className="container"><div className="catrail">
    {CATEGORIES.map(c=><Link key={c.slug} to={`/category/${c.slug}`} className="cattile">
      <img src={c.img} alt={c.name} loading="lazy" />
      <div className="shade" />
      <div className="cap"><h3>{c.name.toUpperCase()}</h3><p>{CAT_SUB[c.slug]||""}</p></div>
    </Link>)}
  </div></div></section>;
}

function Buyback(){
  return <section className="parallax" style={{backgroundImage:"url(/img/gen/beige-sofa-in-bright-room.jpg)"}}>
    <div className="shade" />
    <div className="container parallax-in">
      <Reveal><p className="eyebrow" style={{color:"#FFB37A"}}>THE FLEXIFURNI PROMISE</p>
      <h2>Buy today.<br/>Sell back tomorrow.</h2>
      <p>Love it today. Get value back tomorrow. Buy quality furniture from FlexiFurni and, subject to applicable terms, get up to 50% value back when you sell it back to us.</p>
      <Link className="btn btn-orange btn-lg" to="/sell">Explore Buyback <ArrowRight size={17} /></Link></Reveal>
    </div>
  </section>;
}

const FABRIC_OPTS = [
  { name:"Linen", add:0 }, { name:"Velvet", add:4000 }, { name:"Leatherette", add:6000 },
];
const SIZE_OPTS = [
  { name:"3 Seater", base:32000 }, { name:"L Shape", base:52000 }, { name:"2 Seater", base:24000 },
];

function CustomPreview(){
  const [color,setColor] = useState(FABRICS[1]);
  const [fab,setFab] = useState(FABRIC_OPTS[0]);
  const [size,setSize] = useState(SIZE_OPTS[0]);
  const price = size.base + fab.add;
  const wa = waLink(WHATSAPP_MAIN, `Hi FlexiFurni! My custom sofa: ${size.name}, ${fab.name} fabric, colour ${color.name}. Estimate Rs.${price.toLocaleString("en-IN")}. Please confirm.`);
  return <section className="section"><div className="container customsec">
    <Reveal><div>
      <p className="eyebrow">CUSTOM FURNITURE</p>
      <h2>Design it your way.</h2>
      <p style={{color:"var(--muted)",fontSize:17}}>Built in our own factory, measured for your room. Try it here, then send the design to us.</p>
      {[ "Any size — measured at your home, free", "Solid wood frame, 5-year warranty", "Ready in 10–14 days, delivered + installed" ].map(t=><div className="checkline" key={t}><Check size={18} /><span>{t}</span></div>)}
      <div style={{display:"flex",gap:12,marginTop:22,flexWrap:"wrap"}}>
        <Link className="btn btn-navy" to="/customize">Open Full Customizer</Link>
        <a className="btn btn-ghost" target="_blank" rel="noreferrer" href={wa}>WhatsApp Us</a>
      </div>
    </div></Reveal>
    <Reveal delay={120}><div className="cfgmini">
      <h4>SOFA — PREVIEW</h4>
      <img src="/img/gen/beige-sectional-and-coffee-table.jpg" alt="Custom sofa preview" style={{width:"100%",height:280,objectFit:"cover",borderRadius:12}} />
      <h4 style={{marginTop:14}}>COLOUR — {color.name.toUpperCase()}</h4>
      <div className="dots">{FABRICS.map(f=><button key={f.name} title={f.name} className={"dot"+(color.name===f.name?" on":"")} style={{background:f.hex}} onClick={()=>setColor(f)} />)}</div>
      <h4>FABRIC</h4>
      <div className="fabpills">{FABRIC_OPTS.map(f=><button key={f.name} className={fab.name===f.name?"on":""} onClick={()=>setFab(f)}>{f.name}</button>)}</div>
      <h4>SIZE</h4>
      <div className="fabpills">{SIZE_OPTS.map(s=><button key={s.name} className={size.name===s.name?"on":""} onClick={()=>setSize(s)}>{s.name}</button>)}</div>
      <div className="cfgprice"><b>₹{price.toLocaleString("en-IN")}</b><small>estimate · {size.name} · {fab.name}</small></div>
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        <Link className="btn btn-orange btn-sm" to="/customize">Customize <ArrowRight size={15} /></Link>
        <a className="btn btn-ghost btn-sm" target="_blank" rel="noreferrer" href={wa}>Send design on WhatsApp</a>
      </div>
    </div></Reveal>
  </div></section>;
}

function RentTabs(){
  const [tab,setTab] = useState("living-room");
  const tabs = [["living-room","Living Room"],["bedroom","Bedroom"],["dining","Dining"],["home-office","Office"]];
  const list = useMemo(()=>PRODUCTS.filter(p=>p.category===tab&&(p.type==="rent"||p.type==="both")).slice(0,4),[tab]);
  return <section className="section" style={{paddingTop:0}}><div className="container">
    <Reveal><div className="sec-head"><p className="eyebrow">RENTALS</p><h2>Rent furniture without the commitment.</h2><p>Monthly plans. Free delivery, free swap, free service.</p></div></Reveal>
    <div className="tabs">{tabs.map(([k,l])=><button key={k} className={tab===k?"on":""} onClick={()=>setTab(k)}>{l}</button>)}</div>
    <div className="grid">{list.map(p=><ProductCard key={p.id} p={p} mode="rent" />)}</div>
    <div style={{marginTop:20}}><Link className="btn btn-ghost" to="/rent">View all rentals <ArrowRight size={16} /></Link></div>
  </div></section>;
}

function BuySec(){
  const list = PRODUCTS.filter(p=>p.type==="buy"||p.type==="both").slice(0,4);
  return <section className="section" style={{paddingTop:0}}><div className="container">
    <Reveal><div className="sec-head"><p className="eyebrow">OWN IT</p><h2>Buy it once. Keep it for years.</h2><p>Factory-direct pricing, solid materials, 50% buyback included.</p></div></Reveal>
    <div className="grid">{list.map(p=><ProductCard key={p.id} p={p} mode="buy" />)}</div>
    <div style={{marginTop:20}}><Link className="btn btn-ghost" to="/buy">Shop all furniture <ArrowRight size={16} /></Link></div>
  </div></section>;
}

function Makeovers(){
  if(!MAKEOVERS || MAKEOVERS.length===0) return null;
  return <section className="section" style={{paddingTop:0}}><div className="container">
    <Reveal><div className="sec-head"><p className="eyebrow">REAL WORK</p><h2>Drag it. Before / after.</h2><p>Real FlexiFurni makeovers from Pune homes. Slide the handle.</p></div></Reveal>
    <div className="grid-2">
      {MAKEOVERS.map(m=><CompareSlider key={m.title} before={m.before} after={m.after} title={m.title} tag={m.tag} />)}
    </div>
  </div></section>;
}

function DecorBand(){
  return <section className="section" style={{paddingTop:0}}><div className="container">
    <Reveal><div className="buyback">
      <img src="/img/gen/red-kashmiri-hand-knotted-carpet.jpg" alt="Premium Kashmiri carpet" loading="lazy" />
      <div className="txt">
        <span className="eyebrow">NEW — CARPETS & GRASS</span>
        <h2>Kashmiri carpets.<br/><span>Green turf.</span></h2>
        <p>Authentic luxury carpets for living rooms, bedrooms and offices — plus zero-maintenance grass rolls for balconies, terraces and events. Custom sizes, best price in Pune.</p>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}><Link className="btn btn-orange" to="/category/decor">Shop carpets & grass</Link></div>
      </div>
    </div></Reveal>
  </div></section>;
}

function SellSec(){
  return <section className="section" style={{paddingTop:0}}><div className="container split">
    <Reveal><div>
      <p className="eyebrow">SELL TO US</p>
      <h2>Have furniture you don't need anymore?</h2>
      <p style={{color:"var(--muted)",fontSize:17}}>Sell it to FlexiFurni. Fair price, free pickup across Pune.</p>
      <div className="steps">
        {[["01","Upload photos","Send 2–3 photos on WhatsApp"],["02","Tell us about it","Age, brand, bill value"],["03","Get an estimate","Fixed quote within hours"],["04","Free pickup","We collect, you get paid"]].map(([n,t,s])=><div className="step" key={n}><span className="n">{n}</span><div><b>{t}</b><small>{s}</small></div></div>)}
      </div>
      <Link className="btn btn-orange btn-lg" to="/sell">Sell My Furniture <ArrowRight size={17} /></Link>
    </div></Reveal>
    <Reveal delay={120}><img src="/img/gen/old-torn-brown-sofa.jpg" alt="Old sofa renewed by FlexiFurni" loading="lazy" /></Reveal>
  </div></section>;
}

function RepairSec(){
  return <section className="section" style={{paddingTop:0}}><div className="container split">
    <Reveal><img src="/img/gen/tailor-stitching-sofa-fabric.jpg" alt="Sofa reupholstery craftsmanship" loading="lazy" /></Reveal>
    <div>
      <Reveal><p className="eyebrow">REPAIR</p>
      <h2>Furniture repair, without the hassle.</h2>
      <p style={{color:"var(--muted)",fontSize:17}}>Factory carpenters at your doorstep. Most jobs done in one visit.</p>
      <div className="servicelist">
        {[["Sofa Repair","/repair"],["Wood Repair","/repair"],["Polishing","/repair"],["Carpentry","/repair"],["Upholstery","/repair"],["Appliance Service","/repair"]].map(([t,l])=><Link key={t} to={l}>{t}<ArrowUpRight size={17} /></Link>)}
      </div>
      <Link className="btn btn-navy btn-lg" to="/repair">Book a Repair <ArrowRight size={17} /></Link></Reveal>
    </div>
  </div></section>;
}

export default function Home(){
  return <>
    <Hero />
    <div className="marquee" aria-hidden="true"><div className="mtrack">
      {Array.from({length:2}).map((_,k)=><span key={k}>RENT · BUY · SELL · REPAIR · CUSTOM FURNITURE · 50% VALUE BACK · FREE DELIVERY IN PUNE ·&nbsp;</span>)}
    </div></div>
    <Needs />
    <Categories />
    <Buyback />
    <CustomPreview />
    <RentTabs />
    <BuySec />
    <Makeovers />
    <DecorBand />
    <SellSec />
    <RepairSec />
  </>;
}
