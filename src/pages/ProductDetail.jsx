import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Truck } from "lucide-react";
import { FABRICS, PRODUCTS, WHATSAPP_MAIN, priceFor, waLink, ADDONS, OFFER, DEMO_HIDE_COMMERCE, DEMO_HIDE_INTERACTIVE } from "../data/site";
import { useShop } from "../store/ShopContext";
import { ProductCard } from "../components/ui";

export default function ProductDetail(){
  const { id } = useParams();
  const p = PRODUCTS.find(x=>x.id===id);
  const { addCart, tenure, setTenure } = useShop();
  const [mode,setMode] = useState(p?.type==="buy"?"buy":"rent");
  const [img,setImg] = useState(0);
  const [color,setColor] = useState(FABRICS[0]);
  const [dims,setDims] = useState(p?{...p.dims}:{L:200,W:90,H:85});
  const [addon,setAddon] = useState(ADDONS[0]);
  const [pin,setPin] = useState("411052");
  const [pinMsg,setPinMsg] = useState("");
  const related = useMemo(()=>PRODUCTS.filter(x=>x.id!==id&&(x.category===p?.category)).slice(0,4),[id,p]);
  if(!p) return <div className="container section">Product not found. <Link to="/rent">Back</Link></div>;
  const base = priceFor(p, mode, tenure);
  const price = base + (mode==="buy"?addon.add:0);
  const checkPin = ()=>{
    if(/^[1-9][0-9]{5}$/.test(pin)) setPinMsg(`Delivery + installation available at ${pin} in 48-72 hrs. Free.`);
    else setPinMsg("Enter a valid 6-digit pincode.");
  };
  return <div className="container section">
    <Link to={mode==="rent"?"/rent":"/buy"}>← Back</Link>
    <div className="detail" style={{marginTop:12}}>
      <div className="gallery">
        <div className="main"><img src={p.gallery[img]} alt={p.name} /></div>
        <div className="thumbs">{p.gallery.map((g,i)=><img key={i} src={g} className={i===img?"on":""} onClick={()=>setImg(i)} alt="" />)}</div>
        <div style={{padding:"0 14px 14px",fontSize:13,color:"#667085"}}>For exact shade and size, talk to us on WhatsApp - free swatch and measurement.</div>
      </div>
      <div className="panel">
        <div style={{display:"flex",gap:8,fontSize:11,fontWeight:800,letterSpacing:"1.5px",color:"var(--navy)"}}><span>RENT</span><span style={{color:"#C9CFD9"}}>|</span><span>BUY</span><span style={{color:"#C9CFD9"}}>|</span><span>50% BUYBACK</span></div>
        <h1 className="serif" style={{margin:"10px 0 4px",color:"var(--navy)",fontSize:34}}>{p.name}</h1>
        <div style={{color:"#667085",fontSize:14}}>★ {p.rating} • {p.reviews} reviews • {p.category.replace("-"," ")}</div>
        <div className="tenure" style={{marginTop:12}}><button className={mode==="rent"?"on":""} onClick={()=>setMode("rent")}>Rent</button><button className={mode==="buy"?"on":""} onClick={()=>setMode("buy")}>Buy</button></div>
        {!DEMO_HIDE_INTERACTIVE && mode==="rent"&&<div className="tenure" style={{marginTop:8}}>{["3 mo","6 mo","12 mo","24 mo"].map(x=><button key={x} className={tenure===x?"on":""} onClick={()=>setTenure(x)}>{x}</button>)}</div>}
        <div className="price" style={{marginTop:10}}><b style={{fontSize:30}}>{mode==="rent"?`₹${price.toLocaleString("en-IN")}/mo`:`₹${price.toLocaleString("en-IN")}`}</b>{mode==="buy"&&p.mrp&&<s>₹{p.mrp.toLocaleString("en-IN")}</s>}</div>
        <p style={{color:"#4b587c"}}>{p.desc}</p>
        {!DEMO_HIDE_INTERACTIVE && <>
        <b>Fabric / colour</b>
        <div className="swatches">{FABRICS.map(f=><button key={f.name} title={f.name} className={"sw"+(color.name===f.name?" on":"")} style={{background:f.hex}} onClick={()=>setColor(f)} />)}</div>
        <div style={{fontSize:13}}>Selected: <b>{color.name}</b></div>
        <div className="dimrow">{["L","W","H"].map(k=><div key={k}><label>{k==="L"?"Length":k==="W"?"Width":"Height"} (cm)</label><input type="number" value={dims[k]} onChange={e=>setDims({...dims,[k]:+e.target.value})} /></div>)}</div>
        </>}
        <div className="kv"><span>Free delivery in Pune</span><span>Free installation</span><span>Easy swap / return</span><span>50% buyback on purchase*</span></div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          {!DEMO_HIDE_COMMERCE && <button className="btn btn-orange" onClick={()=>addCart(p,mode,1,{color:color.name,...dims,addon:addon.name})}>{mode==="rent"?"Rent now":"Add to cart"}</button>}
          <a className="btn btn-wa" target="_blank" rel="noreferrer" href={waLink(WHATSAPP_MAIN,`Hi FlexiFurni! I want this: ${p.name} (${mode.toUpperCase()} @ Rs.${price}/ ${mode==="rent"?"per month "+tenure:""})`)}>WhatsApp Order</a>
        </div>
        {!DEMO_HIDE_INTERACTIVE && <div className="note" style={{marginTop:12}}>Customize further? <Link to={`/customize?product=${p.id}`}>Open full customizer →</Link></div>}

        {!DEMO_HIDE_INTERACTIVE && <div style={{marginTop:18}}>
          <b style={{fontSize:13,letterSpacing:"1.5px",color:"var(--muted)"}}>ADD-ONS</b>
          <div className="tenure" style={{marginTop:8}}>{ADDONS.map(a=><button key={a.name} className={addon.name===a.name?"on":""} onClick={()=>setAddon(a)}>{a.name}{a.add>0?` +₹${a.add.toLocaleString("en-IN")}`:""}</button>)}</div>
        </div>}

        <div className="panel" style={{marginTop:16,background:"var(--orange-soft)",borderColor:"#F3D9B8"}}>
          <b style={{fontSize:14}}>Offer: {OFFER.title}</b>
          <p style={{margin:"6px 0 0",fontSize:13.5,color:"#7A4A12"}}>Code <b>{OFFER.code}</b> - mention it on WhatsApp checkout and we apply it. {OFFER.sub}.</p>
        </div>

        <div style={{marginTop:16}}>
          <b style={{fontSize:13,letterSpacing:"1.5px",color:"var(--muted)"}}>DELIVERY & ASSEMBLY</b>
          <div style={{display:"flex",gap:8,marginTop:8}}>
            <input value={pin} onChange={e=>setPin(e.target.value.replace(/\D/g,"").slice(0,6))} placeholder="Pincode" style={{flex:1,border:"1px solid var(--line)",borderRadius:10,padding:"10px 12px",fontSize:14}} />
            <button className="btn btn-navy btn-sm" onClick={checkPin}>Check</button>
          </div>
          {pinMsg&&<div style={{fontSize:13.5,marginTop:6,display:"flex",gap:6,alignItems:"center"}}><Truck size={15} />{pinMsg}</div>}
        </div>

        <div style={{marginTop:18}}>
          <b style={{fontSize:13,letterSpacing:"1.5px",color:"var(--muted)"}}>SPECIFICATIONS</b>
          <div className="kv" style={{gridTemplateColumns:"1fr"}}>
            <span><b>Type:</b> {p.sub||p.category.replace("-"," ")}</span>
            <span><b>Dimensions:</b> {p.dims.L?`${p.dims.L} × ${p.dims.W} × ${p.dims.H} cm (L×W×H)`:"Made to your size"}</span>
            <span><b>Material:</b> {(p.tags&&p.tags.includes("wooden"))?"Seasoned solid wood, factory finish":"Premium frame + fabric, solid build"}</span>
            <span><b>Care:</b> Wipe with dry cloth. Free service during rental.</span>
          </div>
        </div>
      </div>
    </div>
    <h3 style={{marginTop:30}}>You may also like</h3>
    <div className="grid">{related.map(r=><ProductCard key={r.id} p={r}/>)}</div>
  </div>;
}
