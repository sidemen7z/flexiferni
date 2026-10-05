import { useState } from "react";
import { WHATSAPP_MAIN, waLink } from "../data/site";

export default function Sell(){
  const [f,setF] = useState({name:"",phone:"",item:"Sofa",age:"1-2 years",bill:20000,photo:null,preview:""});
  const buyback = Math.round((+f.bill||0)*0.5);
  const onPhoto = (e)=>{
    const file = e.target.files?.[0];
    if(!file) return;
    setF({...f,photo:file.name,preview:URL.createObjectURL(file)});
  };
  const msg = `Hi FlexiFurni! I want to SELL my furniture.\nName: ${f.name}\nPhone: ${f.phone}\nItem: ${f.item}\nAge: ${f.age}\nBill value: Rs.${f.bill}\nExpected buyback (50%): Rs.${buyback}\nPhoto: ${f.photo||"will send separately"}`;
  return <div className="container section">
    <div className="sec-head"><div><p className="eyebrow">SELL TO US</p><h2>Sell your furniture. Get 50% value back.</h2><p>Two ways: sell outright, or buy from us now and sell back later. Free pickup inspection in Pune.</p></div></div>
    <div className="banner50" style={{marginBottom:18}}>
      <div style={{width:110,height:110,borderRadius:"50%",background:"#fff",color:"#12295e",display:"grid",placeItems:"center",fontWeight:900,textAlign:"center"}}><div><span style={{color:"#f2620f",fontSize:34}}>50%</span><br/>VALUE BACK*</div></div>
      <div><h3 style={{margin:0}}>BUY TODAY, <span style={{color:"#ff7a1a"}}>SELL BACK TOMORROW!</span></h3><p style={{color:"#c9d3ee"}}>Example: buy a ₹40,000 sofa → we buy it back for ~₹20,000. Instant quote on WhatsApp after photo inspection.</p></div>
      <a className="btn btn-orange" href={waLink(WHATSAPP_MAIN,"Hi FlexiFurni! I want a 50% buyback quote for my furniture.")} target="_blank" rel="noreferrer">Get quote</a>
    </div>
    <div className="forms">
      <div className="form">
        <h3 style={{marginTop:0}}>List your furniture (2 min)</h3>
        <label>Your name</label><input value={f.name} onChange={e=>setF({...f,name:e.target.value})} placeholder="e.g. Rahul Patil" />
        <label>Phone</label><input value={f.phone} onChange={e=>setF({...f,phone:e.target.value})} placeholder="98XXXXXXXX" />
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><label>Item</label><select value={f.item} onChange={e=>setF({...f,item:e.target.value})}><option>Sofa</option><option>Bed</option><option>Dining set</option><option>Wardrobe</option><option>Office setup</option><option>Fridge / Washing machine</option><option>Full home lot</option></select></div>
          <div><label>Age / condition</label><select value={f.age} onChange={e=>setF({...f,age:e.target.value})}><option>Under 1 year</option><option>1-2 years</option><option>2-4 years</option><option>4+ years</option></select></div>
        </div>
        <label>Original bill value (₹)</label><input type="number" value={f.bill} onChange={e=>setF({...f,bill:e.target.value})} />
        <div className="note">Estimated buyback now: <b>₹{buyback.toLocaleString("en-IN")}</b> (50% of bill, subject to inspection). Final offer on visit.</div>
        <label>Upload photo</label><input type="file" accept="image/*" onChange={onPhoto} />
        {f.preview&&<img src={f.preview} alt="preview" style={{marginTop:10,borderRadius:12,maxHeight:220,objectFit:"cover",width:"100%"}} />}
        <div style={{display:"flex",gap:10,marginTop:14,flexWrap:"wrap"}}>
          <a className="btn btn-wa" target="_blank" rel="noreferrer" href={waLink(WHATSAPP_MAIN,msg)}>Send to WhatsApp</a>
          <span className="btn btn-ghost" onClick={()=>alert("Saved! Our team will call you for pickup inspection.")}>Request pickup call</span>
        </div>
        <small style={{color:"#667085"}}>Tip: after tapping WhatsApp Send, attach the same photo in chat - our team confirms the offer within hours.</small>
      </div>
      <div>
        <div className="form"><h3 style={{marginTop:0}}>How buyback works</h3><ol style={{color:"#4b587c",lineHeight:1.7}}><li>Buy new / custom furniture from FlexiFurni with bill.</li><li>Use it as long as you want.</li><li>When shifting / upgrading, send photos on WhatsApp.</li><li>We inspect, pick up free & pay <b>up to 50% back</b>.*</li></ol><div className="note">*50% on eligible solid-wood & standard items in good condition. Appliances & damaged goods valued separately. T&C apply.</div></div>
        <img src="/poster-appliances.jpg" alt="Rent Buy Sell poster" style={{borderRadius:20,marginTop:14,border:"1px solid #e9e4d8"}} />
      </div>
    </div>
  </div>;
}
