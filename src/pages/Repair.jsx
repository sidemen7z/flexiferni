import { useState } from "react";
import { Armchair, Sparkles, Paintbrush, BedDouble, DoorClosed, Refrigerator } from "lucide-react";
import { WHATSAPP_MAIN, waLink } from "../data/site";
import { useShop } from "../store/ShopContext";

const SERVICES = [
  { Icon:Armchair, name:"Sofa Repair & Reupholstery", price:"from ₹4,999", desc:"Foam replacement, new fabric, spring & frame fixing. Old sofa becomes new." },
  { Icon:Sparkles, name:"Sofa Dry-Cleaning", price:"from ₹999", desc:"Deep shampoo wash for fabric sofas, stain & smell removal at home." },
  { Icon:Paintbrush, name:"Wood Polish & Touch-up", price:"from ₹799", desc:"Melamine / PU polish, scratch removal for beds, tables, wardrobes." },
  { Icon:BedDouble, name:"Bed & Dining Fixing", price:"from ₹499", desc:"Loose joints, broken slats, wobbly chairs — tightened & strengthened." },
  { Icon:DoorClosed, name:"Wardrobe Channels & Hinges", price:"from ₹399", desc:"Sliding noise, stuck drawers, loose hinges fixed same visit." },
  { Icon:Refrigerator, name:"Appliance Basic Service", price:"from ₹499", desc:"Fridge, washing machine & cooler check-up, minor repair, gas check." },
];

export default function Repair(){
  const { say } = useShop();
  const [f,setF] = useState({name:"",phone:"",service:SERVICES[0].name,item:"Sofa (3-seater)",address:"",date:""});
  const [picked,setPicked] = useState(SERVICES[0].name);
  const svc = SERVICES.find(s=>s.name===picked);
  const msg = `Hi FlexiFurni! I want REPAIR service.%0AService: ${picked} (${svc.price})%0AItem: ${f.item}%0AName: ${f.name}%0APhone: ${f.phone}%0AAddress: ${f.address}%0APreferred date: ${f.date}%0A(I will send item photos in chat)`;
  const book = (e)=>{
    e.preventDefault();
    window.open(waLink(WHATSAPP_MAIN,`${f.name?`Name: ${f.name}\nPhone: ${f.phone}\n`:""}Service: ${picked} (${svc.price})\nItem: ${f.item}\nAddress: ${f.address}\nPreferred date: ${f.date}\n(I will send item photos in chat)`),"_blank");
    say("Opening WhatsApp — attach item photos in chat.");
  };
  return <div className="container section">
    <div className="sec-head"><div>
      <h2>Furniture Repair — at your doorstep</h2>
      <p>4th FlexiFurni service: <b>BUY • SELL • RENT • REPAIR.</b> Don't throw old furniture — we fix, polish & renew it. Free inspection in Pune.</p>
    </div></div>

    <div className="grid-3" style={{marginBottom:18}}>
      {SERVICES.map(s=><div key={s.name} className="card" style={{borderColor:picked===s.name?"var(--orange)":"var(--line)",boxShadow:picked===s.name?"0 0 0 2px var(--orange)":"none"}}>
        <div className="bd"><s.Icon size={30} color="var(--navy)" strokeWidth={1.6} /><h4>{s.name}</h4>
        <div className="price"><b>{s.price}</b></div>
        <p style={{color:"#4b587c",fontSize:13.5,margin:"4px 0 10px"}}>{s.desc}</p>
        <button className={picked===s.name?"btn btn-orange btn-sm":"btn btn-ghost btn-sm"} onClick={()=>{setPicked(s.name);setF({...f,service:s.name});}}>{picked===s.name?"Selected":"Book this"}</button></div>
      </div>)}
    </div>

    <div className="forms">
      <form className="form" onSubmit={book}>
        <h3 style={{marginTop:0}}>Book repair visit — {picked}</h3>
        <label>Service</label>
        <select value={picked} onChange={e=>setPicked(e.target.value)}>{SERVICES.map(s=><option key={s.name}>{s.name}</option>)}</select>
        <label>Which item? (e.g. Sofa 3-seater, Sheesham bed)</label>
        <input value={f.item} onChange={e=>setF({...f,item:e.target.value})} required placeholder="Sofa (3-seater)" />
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><label>Your name</label><input value={f.name} onChange={e=>setF({...f,name:e.target.value})} required placeholder="Name" /></div>
          <div><label>Phone</label><input value={f.phone} onChange={e=>setF({...f,phone:e.target.value})} required placeholder="98XXXXXXXX" /></div>
        </div>
        <label>Address in Pune</label>
        <input value={f.address} onChange={e=>setF({...f,address:e.target.value})} required placeholder="Flat, area (e.g. Kondhwa)" />
        <label>Preferred date</label>
        <input type="date" value={f.date} onChange={e=>setF({...f,date:e.target.value})} />
        <button className="btn btn-wa" style={{marginTop:14}}>Book on WhatsApp</button>
        <div className="note" style={{marginTop:10}}>After booking, <b>send 2–3 photos</b> of the damaged part in chat → we confirm exact price before visiting. No advance needed.</div>
      </form>
      <div>
        <div className="form"><h3 style={{marginTop:0}}>How repair works</h3>
          <ol style={{color:"#4b587c",lineHeight:1.8}}><li>Book + send photos on WhatsApp.</li><li>We confirm fixed price ({svc.price} slab).</li><li>Carpenter visits with material.</li><li>Most jobs done in 1–3 hours at home.</li><li>Pay after work. 30-day service warranty.*</li></ol>
          <div className="note">Wooden furniture is our speciality — factory craftsmen, same team that builds new furniture.</div>
        </div>
        <div className="banner50" style={{marginTop:14,gridTemplateColumns:"1fr"}}>
          <div><h3 style={{margin:0}}>Old sofa? <span style={{color:"#ff7a1a"}}>Renew, don't replace.</span></h3>
          <p style={{color:"#c9d3ee"}}>Reupholstery costs ~40% of a new sofa. Pick any fabric from our customizer.</p>
          <a className="btn btn-orange btn-sm" href="#/customize">Pick new fabric</a></div>
        </div>
      </div>
    </div>
  </div>;
}
