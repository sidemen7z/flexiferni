import { PRODUCTS } from "../data/site";

export function Gallery(){
  const craft = [
    ["/img/gen/furniture-factory-floor-with-wor.jpg","Our factory floor"],
    ["/img/gen/craftsman-assembling-bed-frame.jpg","Assembling a bed"],
    ["/img/gen/tailor-stitching-sofa-fabric.jpg","Stitching sofa fabric"],
    ["/img/gen/stacked-seasoned-sheesham-wood-p.jpg","Seasoned sheesham stock"],
    ["/img/gen/delivery-men-carrying-sofa.jpg","Delivery team"],
    ["/img/gen/flexifurni-store-front-evening-l.jpg","Our store, evening"],
    ["/img/gen/flexifurni-team-photo-at-store.jpg","Our team"],
    ["/img/gen/store-owner-crossing-arms.jpg","Irfan Shah, founder"],
  ];
  return <div className="container section">
    <div className="sec-head"><div><h2>Photo gallery — real work</h2><p>Factory, custom builds, deliveries & store. All photos are our own work.</p></div></div>
    <div className="grid-3">
      <img src="/poster-bedroom.jpg" alt="FlexiFurni custom bedroom" style={{borderRadius:16,border:"1px solid #e9e4d8"}} />
      <img src="/poster-appliances.jpg" alt="Rent Buy Sell appliances" style={{borderRadius:16,border:"1px solid #e9e4d8"}} />
      {PRODUCTS.slice(0,7).map(p=><img key={p.id} src={p.img} alt={p.name} style={{borderRadius:16,height:260,objectFit:"cover",width:"100%"}} />)}
      {craft.map(([s,a])=><div key={s} style={{position:"relative"}}><img src={s} alt={a} style={{borderRadius:16,height:260,objectFit:"cover",width:"100%"}} /><span style={{position:"absolute",left:12,bottom:12,background:"rgba(10,28,64,.85)",color:"#fff",fontSize:12,padding:"5px 10px",borderRadius:6}}>{a}</span></div>)}
    </div>
  </div>;
}

export default Gallery;
