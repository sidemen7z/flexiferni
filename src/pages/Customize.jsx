import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FABRICS, PRODUCTS, WHATSAPP_MAIN, waLink, DEMO_HIDE_COMMERCE, DEMO_HIDE_INTERACTIVE } from "../data/site";
import { useShop } from "../store/ShopContext";

// Interactive sofa/bed customizer: colour, size, legs, fabric -> live SVG preview + price + downloadable design card -> WhatsApp
export default function Customize(){
  const [sp] = useSearchParams();
  const base = PRODUCTS.find(p=>p.id===sp.get("product")) || PRODUCTS[0];
  const { addCart, say } = useShop();
  const [shape,setShape] = useState("3-Seater");
  const [fabric,setFabric] = useState(FABRICS[0]);
  const [dims,setDims] = useState({...base.dims, L:base.dims.L||210});
  const [legs,setLegs] = useState("Wooden");
  const [cushion,setCushion] = useState("Medium-soft");
  const cardRef = useRef(null);

  const price = useMemo(()=>{
    const vol = (dims.L*dims.W)/(210*90);
    const shapeX = shape.includes("L-Shape")?1.45:shape.includes("2-Seater")?0.8:shape==="Single Chair"?0.55:1;
    return Math.round(28000*vol*shapeX + (legs==="Premium metal"?2500:0) + (cushion==="Feather-luxury"?4000:0));
  },[dims,shape,legs,cushion]);

  const sendText = `Hi FlexiFurni! My CUSTOM design:\nShape: ${shape}\nFabric: ${fabric.name}\nSize: ${dims.L} x ${dims.W} x ${dims.H} cm\nLegs: ${legs}\nCushion: ${cushion}\nEstimate: Rs.${price.toLocaleString("en-IN")}\nRef product: ${base.name}`;

  const downloadCard = ()=>{
    const c = document.createElement("canvas"); c.width=1080; c.height=640;
    const x = c.getContext("2d");
    x.fillStyle="#12295e"; x.fillRect(0,0,1080,640);
    x.fillStyle="#ffffff"; x.fillRect(24,24,1032,592);
    x.fillStyle="#12295e"; x.font="900 54px sans-serif"; x.fillText("FlexiFurni • Custom Design",60,110);
    x.fillStyle="#f2620f"; x.font="800 34px sans-serif"; x.fillText(`${shape} - ${fabric.name}`,60,165);
    // sofa illustration block
    x.fillStyle=fabric.hex; const sx=80,sy=220,sw=560,sh=200;
    x.fillRect(sx,sy,sw,sh); x.fillStyle="rgba(0,0,0,.18)"; x.fillRect(sx,sy+sh-40,sw,40);
    x.fillStyle="#333"; x.fillRect(sx+20,sy+sh,20,40); x.fillRect(sx+sw-40,sy+sh,20,40);
    x.fillStyle="#12295e"; x.font="700 30px sans-serif";
    x.fillText(`Size: ${dims.L} x ${dims.W} x ${dims.H} cm`,680,260);
    x.fillText(`Legs: ${legs}`,680,310); x.fillText(`Cushion: ${cushion}`,680,360);
    x.fillStyle="#f2620f"; x.font="900 52px sans-serif"; x.fillText(`Rs.${price.toLocaleString("en-IN")}*`,680,440);
    x.fillStyle="#667085"; x.font="400 24px sans-serif"; x.fillText("*Estimate. Final quote after measurement.",60,580);
    x.fillText("+91 99750 75425 | NIBM Road, Pune",60,545);
    const a=document.createElement("a"); a.download="flexifurni-custom-design.png"; a.href=c.toDataURL("image/png"); a.click();
    say("Design card downloaded - attach it in WhatsApp chat.");
  };

  if(DEMO_HIDE_INTERACTIVE){
    return <div className="container section">
      <div className="panel" style={{textAlign:"center",padding:"48px 24px"}}>
        <h2 style={{margin:"0 0 10px"}}>Custom designs - coming soon in demo</h2>
        <p style={{color:"var(--muted)",maxWidth:"52ch",margin:"0 auto 20px"}}>Our Design Your Room customizer (colour, size, fabric) is hidden for this demo. Tell us what you need on WhatsApp and we will custom-make it in our factory.</p>
        <a className="btn btn-wa" target="_blank" rel="noreferrer" href={waLink(WHATSAPP_MAIN,"Hi FlexiFurni! I want a custom furniture quote.")}>Ask for custom quote on WhatsApp</a>
      </div>
    </div>;
  }

  return <div className="container section">
    <div className="sec-head"><div><h2>Design your sofa - live customizer</h2><p>Fewer words, more play: change colour, size, legs. Price updates instantly. Send the design to WhatsApp.</p></div></div>
    <div className="detail">
      <div className="panel" ref={cardRef}>
        <b>Design preview</b>
        <div style={{marginTop:8}}>
          <img src="/img/gen/modular-sofa-with-material-swatches.jpg" alt="Custom sofa design" style={{width:"100%",height:340,objectFit:"cover",borderRadius:12}} />
        </div>
        <div style={{fontSize:13,marginTop:8}}>{shape} • {dims.L}cm wide • {fabric.name}</div>
        <div className="kv"><span>Shape: <b>{shape}</b></span><span>Fabric: <b>{fabric.name}</b></span><span>Size: <b>{dims.L}×{dims.W}×{dims.H}</b></span><span>Estimate: <b>₹{price.toLocaleString("en-IN")}*</b></span></div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button className="btn btn-navy btn-sm" onClick={downloadCard}>Download design card</button>
          <a className="btn btn-wa btn-sm" target="_blank" rel="noreferrer" href={waLink(WHATSAPP_MAIN,sendText)}>Send design on WhatsApp</a>
        </div>
      </div>
      <div className="panel">
        <label>1 • Shape</label>
        <div className="tenure">{["Single Chair","2-Seater","3-Seater","L-Shape"].map(s=><button key={s} className={shape===s?"on":""} onClick={()=>setShape(s)}>{s}</button>)}</div>
        <label>2 • Fabric colour (tap)</label>
        <div className="swatches">{FABRICS.map(f=><button key={f.name} title={f.name} className={"sw"+(fabric.name===f.name?" on":"")} style={{background:f.hex}} onClick={()=>setFabric(f)} />)}</div>
        <div style={{fontSize:13}}>Selected: <b>{fabric.name}</b> - free swatch on request.</div>
        <label>3 • Size (cm) - width drives price</label>
        <div className="dimrow">{["L","W","H"].map(k=><div key={k}><label>{k}</label><input type="range" min={k==="L"?120:50} max={k==="L"?320:220} value={dims[k]} onChange={e=>setDims({...dims,[k]:+e.target.value})} style={{width:"100%"}} /><input type="number" value={dims[k]} onChange={e=>setDims({...dims,[k]:+e.target.value})} /></div>)}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><label>4 • Legs</label><select value={legs} onChange={e=>setLegs(e.target.value)} style={{width:"100%",border:"1px solid #e9e4d8",borderRadius:10,padding:10}}><option>Wooden</option><option>Premium metal</option><option>Hidden / plinth</option></select></div>
          <div><label>5 • Cushion</label><select value={cushion} onChange={e=>setCushion(e.target.value)} style={{width:"100%",border:"1px solid #e9e4d8",borderRadius:10,padding:10}}><option>Medium-soft</option><option>Firm (orthopedic)</option><option>Feather-luxury</option></select></div>
        </div>
        <div className="price" style={{marginTop:12}}><b style={{fontSize:28}}>₹{price.toLocaleString("en-IN")}*</b><span style={{fontSize:13,color:"#667085"}}>making in 10-14 days • {base.name} base</span></div>
        <div style={{display:"flex",gap:10,marginTop:10,flexWrap:"wrap"}}>
          {!DEMO_HIDE_COMMERCE && <button className="btn btn-orange" onClick={()=>addCart({...base,name:`Custom ${shape} (${fabric.name})`,buy:price}, "buy",1,{color:fabric.name,...dims})}>Add custom to cart</button>}
          <button className="btn btn-ghost" onClick={()=>{setDims({...base.dims});setFabric(FABRICS[0]);setShape("3-Seater");}}>Reset</button>
        </div>
        <div className="note" style={{marginTop:10}}>How WhatsApp ordering works: tap <b>Download design card</b> → tap <b>Send design on WhatsApp</b> → attach the downloaded image in chat → we confirm measurement visit.</div>
      </div>
    </div>
  </div>;
}
