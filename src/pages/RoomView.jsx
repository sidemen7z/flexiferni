import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import * as THREE from "three";
import { buildSofa, buildBed, buildWardrobe, buildDining, buildChair, disposeGroup, MODEL_BASE } from "../three/models";
import { FABRICS, PRODUCTS, WHATSAPP_MAIN, waLink } from "../data/site";
import { useShop } from "../store/ShopContext";

const MODELS = [["sofa","Sofa"],["bed","Bed"],["wardrobe","Wardrobe"],["dining","Dining Set"],["chair","Armchair"]];
const MODEL_LABEL = (m)=> (MODELS.find(x=>x[0]===m)||[m,m])[1];
const USES_FABRIC = { sofa:true, bed:true, dining:true, chair:true, wardrobe:false };

// Real 3D preview: parametric sofa/bed rendered with Three.js over live
// rear-camera (or an uploaded room photo), with:
//  - automatic room-light detection (samples camera brightness, adjusts 3D lights)
//  - real soft shadows on an invisible ground plane
//  - drag to move, pinch/slider to scale, rotate, fabric colours from customizer
//  - snapshot (photo + 3D merged) download + send on WhatsApp

function luminance(video){
  try{
    const c = document.createElement("canvas"); c.width = 32; c.height = 32;
    const x = c.getContext("2d", { willReadFrequently:true });
    x.drawImage(video, 0, 0, 32, 32);
    const d = x.getImageData(0,0,32,32).data;
    let s = 0; for(let i=0;i<d.length;i+=4) s += (0.2126*d[i]+0.7152*d[i+1]+0.0722*d[i+2])/255;
    return s/(d.length/4);
  }catch{ return 0.55; }
}

export default function RoomView(){
  const [sp] = useSearchParams();
  const { say } = useShop();
  const [tab,setTab] = useState("camera");           // camera | photo
  const [model,setModel] = useState("sofa");
  const [seats,setSeats] = useState(3);
  const [color,setColor] = useState(()=>FABRICS.find(f=>f.hex.toLowerCase()===(sp.get("color")||"").toLowerCase()) || FABRICS[1]);
  const [scale,setScale] = useState(1);
  const [rot,setRot] = useState(-12);
  const [light,setLight] = useState("Normal");
  const [on,setOn] = useState(false);
  const [err,setErr] = useState("");
  const [photoURL,setPhotoURL] = useState("");

  const viewRef = useRef(null), videoRef = useRef(null), imgRef = useRef(null);
  const T = useRef({});   // three objects

  // ---- init three once ----
  useEffect(()=>{
    const el = viewRef.current;
    const W = el.clientWidth, H = el.clientHeight || 480;
    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true, preserveDrawingBuffer:true });
    renderer.setSize(W,H); renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "position:absolute;inset:0;touch-action:none;z-index:1;";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W/H, 0.1, 50);
    camera.position.set(0, 1.55, 3.4); camera.lookAt(0, 0.55, 0);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x8a7a63, 0.9); scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xfff2e0, 1.4);
    dir.position.set(2.2, 3.4, 2.4); dir.castShadow = true;
    dir.shadow.mapSize.set(1024,1024);
    dir.shadow.camera.left=-3; dir.shadow.camera.right=3; dir.shadow.camera.top=3; dir.shadow.camera.bottom=-2;
    scene.add(dir);

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(20,20), new THREE.ShadowMaterial({ opacity:0.32 }));
    ground.rotation.x = -Math.PI/2; ground.position.y = 0; ground.receiveShadow = true;
    scene.add(ground);

    const group = new THREE.Group(); group.position.set(0.85,0,0); scene.add(group);
    Object.assign(T.current, { renderer, scene, camera, hemi, dir, group });

    // drag to move
    const ptrs = new Map(); let pinchD = 0;
    const cv = renderer.domElement;
    const wpp = ()=> (2*3.4*Math.tan(THREE.MathUtils.degToRad(21)))/H;
    cv.addEventListener("pointerdown", e=>{ cv.setPointerCapture(e.pointerId); ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY}); if(ptrs.size===2){ const p=[...ptrs.values()]; pinchD=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);} });
    cv.addEventListener("pointermove", e=>{
      if(!ptrs.has(e.pointerId)) return;
      const prev = ptrs.get(e.pointerId); ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(ptrs.size===1){
        const k = wpp();
        group.position.x = THREE.MathUtils.clamp(group.position.x + (e.clientX-prev.x)*k, -1.6, 1.6);
        group.position.y = THREE.MathUtils.clamp(group.position.y - (e.clientY-prev.y)*k, -0.6, 1.0);
      }else if(ptrs.size===2){
        const p=[...ptrs.values()]; const d=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);
        if(pinchD>0) setScale(s=>THREE.MathUtils.clamp(s*(d/pinchD),0.55,1.8));
        pinchD=d;
      }
    });
    const up = e=>{ ptrs.delete(e.pointerId); pinchD=0; };
    cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up);

    let raf = 0;
    const loop = ()=>{ raf = requestAnimationFrame(loop); renderer.render(scene,camera); };
    loop();

    // room-light detection every 800ms
    const timer = setInterval(()=>{
      const v = videoRef.current;
      if(tab==="camera" && v && v.videoWidth){
        const L = luminance(v);
        T.current.hemi.intensity = 0.35 + L*1.0;
        T.current.dir.intensity = 0.4 + L*1.6;
        setLight(L>0.62?"Bright":L>0.38?"Normal":"Dim");
      }else{
        T.current.hemi.intensity = 0.9; T.current.dir.intensity = 1.4; setLight("Normal");
      }
    }, 800);

    const onR = ()=>{
      const w = el.clientWidth, h = el.clientHeight || 480;
      renderer.setSize(w,h); camera.aspect = w/h; camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onR);
    return ()=>{ cancelAnimationFrame(timer); clearInterval(timer); window.removeEventListener("resize", onR);
      try{ renderer.dispose(); el.removeChild(renderer.domElement); }catch{} };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // ---- rebuild model on change ----
  useEffect(()=>{
    const { scene, group } = T.current;
    if(!scene || !group) return;
    disposeGroup(group);
    const built = model==="sofa" ? buildSofa(color.hex, seats)
      : model==="bed" ? buildBed(color.hex)
      : model==="wardrobe" ? buildWardrobe()
      : model==="dining" ? buildDining(color.hex)
      : buildChair(color.hex);
    group.add(built);
    group.scale.setScalar(scale*(MODEL_BASE[model]||1));
    group.rotation.y = THREE.MathUtils.degToRad(rot);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[model, color, seats]);

  useEffect(()=>{
    const g = T.current.group; if(!g) return;
    g.scale.setScalar(scale*(MODEL_BASE[model]||1)); g.rotation.y = THREE.MathUtils.degToRad(rot);
  },[scale, rot, model]);

  const start = async ()=>{
    setErr("");
    try{
      const s = await navigator.mediaDevices.getUserMedia({ video:{ facingMode:{ ideal:"environment" } }, audio:false });
      videoRef.current.srcObject = s; await videoRef.current.play(); setOn(true);
    }catch{ setErr("Camera blocked. Allow camera permission, or use Upload photo mode."); }
  };
  const stop = ()=>{ videoRef.current?.srcObject?.getTracks().forEach(t=>t.stop()); setOn(false); };
  const onFile = (e)=>{
    const f = e.target.files?.[0]; if(!f) return;
    setPhotoURL(URL.createObjectURL(f)); setTab("photo"); stop();
  };

  const snapshot = ()=>{
    const el = viewRef.current, { renderer, scene, camera } = T.current;
    const W = el.clientWidth, H = el.clientHeight || 480;
    const bg = tab==="camera" ? videoRef.current : imgRef.current;
    if(!bg || (tab==="camera" && !on)){ say("Start camera or upload a room photo first."); return; }
    const vw = bg.videoWidth || bg.naturalWidth, vh = bg.videoHeight || bg.naturalHeight;
    if(!vw){ say("Wait for the background to load."); return; }
    const c = document.createElement("canvas"); c.width = W; c.height = H;
    const x = c.getContext("2d");
    const s = Math.max(W/vw, H/vh), dw = vw*s, dh = vh*s;
    x.drawImage(bg, (W-dw)/2, (H-dh)/2, dw, dh);
    renderer.render(scene,camera);
    x.drawImage(renderer.domElement, 0, 0, W, H);
    const a = document.createElement("a");
    a.download = `flexifurni-room-${model}.png`; a.href = c.toDataURL("image/png"); a.click();
    say("Room preview saved — attach it in WhatsApp chat.");
  };

  const modelDesc = model==='sofa' ? seats+'-seater sofa' : MODEL_LABEL(model).toLowerCase();
  const wa = waLink(WHATSAPP_MAIN, `Hi FlexiFurni! I previewed this in my room with your 3D view:\nModel: ${modelDesc}\nColour: ${USES_FABRIC[model]?color.name:"sheesham wood"}\nSize on screen: ${Math.round(scale*100)}%\nPlease share price + options.`);

  return <div className="container section">
    <div className="sec-head"><div>
      <p className="eyebrow">3D ROOM PREVIEW</p>
      <h2>See it in your room — for real.</h2>
      <p>Point your camera at your home. A real 3D {modelDesc} in <b>{USES_FABRIC[model]?color.name:"sheesham wood"}</b> appears with true shadows, and auto-adjusts to your room light. Drag it, resize it, then send us the photo.</p>
    </div></div>

    <div className="tabs" style={{marginBottom:12}}>
      <button className={tab==="camera"?"on":""} onClick={()=>setTab("camera")}>Live camera</button>
      <button className={tab==="photo"?"on":""} onClick={()=>setTab("photo")}>Upload room photo</button>
    </div>

    <div className="detail">
      <div>
        <div ref={viewRef} className="roomview" style={{position:"relative",height:480,borderRadius:18,overflow:"hidden",background:"#0b1c44"}}>
          {tab==="camera" && <>
            {!on && <div style={{position:"absolute",inset:0,zIndex:2,display:"grid",placeItems:"center",color:"#fff",textAlign:"center",padding:20,pointerEvents:"none"}}>
              <p style={{fontSize:17,margin:0}}>Rear camera preview — see furniture at real size in your room. Tap the button below to start.</p>
            </div>}
            <video ref={videoRef} playsInline muted style={{display:on?"block":"none",position:"absolute",inset:0,zIndex:0,width:"100%",height:"100%",objectFit:"cover"}} />
          </>}
          {tab==="photo" && <>
            {!photoURL && <div style={{position:"absolute",inset:0,zIndex:2,display:"grid",placeItems:"center",color:"#fff",textAlign:"center",padding:20,pointerEvents:"none"}}>
              <p style={{fontSize:17,margin:0}}>Upload a photo of your room (works on laptop too). Tap the button below.</p>
            </div>}
            {photoURL && <img ref={imgRef} src={photoURL} alt="your room" style={{position:"absolute",inset:0,zIndex:0,width:"100%",height:"100%",objectFit:"cover"}} />}
          </>}
          <div style={{position:"absolute",zIndex:3,left:12,top:12,background:"rgba(10,28,64,.82)",color:"#fff",fontSize:12.5,padding:"7px 12px",borderRadius:8,pointerEvents:"none"}}>
            Room light: {light} · auto-adjusted
          </div>
          <div style={{position:"absolute",zIndex:3,right:12,bottom:12,background:"rgba(10,28,64,.82)",color:"#fff",fontSize:12.5,padding:"7px 12px",borderRadius:8,pointerEvents:"none"}}>
            Drag model to move · pinch or slider to resize
          </div>
        </div>
        <div style={{display:"flex",gap:10,marginTop:12,flexWrap:"wrap"}}>
          {tab==="camera" && !on && <button className="btn btn-orange" onClick={start}>Enable camera</button>}
          {tab==="camera" && on && <button className="btn btn-ghost btn-sm" onClick={stop}>Stop camera</button>}
          {tab==="photo" && <label className="btn btn-orange">{photoURL?"Change photo":"Upload photo"}<input type="file" accept="image/*" onChange={onFile} style={{display:"none"}} /></label>}
        </div>
        {err&&<div className="note" style={{marginTop:10}}>{err}</div>}
      </div>

      <div className="panel">
        <b style={{fontSize:13,letterSpacing:"1.5px",color:"var(--muted)"}}>MODEL</b>
        <div className="tenure" style={{marginTop:8}}>
          {MODELS.map(([k,l])=><button key={k} className={model===k?"on":""} onClick={()=>setModel(k)}>{l}</button>)}
        </div>

        {model==="sofa"&&<><div style={{marginTop:14}}><b style={{fontSize:13,letterSpacing:"1.5px",color:"var(--muted)"}}>SEATS</b></div>
        <div className="tenure" style={{marginTop:8}}>{[2,3].map(n=><button key={n} className={seats===n?"on":""} onClick={()=>setSeats(n)}>{n}-seater</button>)}</div></>}

        {USES_FABRIC[model] ? <>
          <div style={{marginTop:14}}><b style={{fontSize:13,letterSpacing:"1.5px",color:"var(--muted)"}}>FABRIC — {color.name.toUpperCase()}</b></div>
          <div className="swatches">{FABRICS.map(f=><button key={f.name} title={f.name} className={"sw"+(color.name===f.name?" on":"")} style={{background:f.hex}} onClick={()=>setColor(f)} />)}</div>
        </> : <div className="note" style={{marginTop:14}}>Solid seasoned sheesham — factory wood finish.</div>}

        <label style={{fontSize:13,fontWeight:700}}>Size on screen: {Math.round(scale*100)}%</label>
        <input type="range" min="0.55" max="1.8" step="0.05" value={scale} onChange={e=>setScale(+e.target.value)} style={{width:"100%"}} />
        <label style={{fontSize:13,fontWeight:700}}>Rotate: {rot}°</label>
        <input type="range" min="-45" max="45" value={rot} onChange={e=>setRot(+e.target.value)} style={{width:"100%"}} />

        <div className="note" style={{margin:"12px 0"}}>Same colours as the customizer — what you design is what you preview.</div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button className="btn btn-navy" onClick={snapshot}>Save room photo</button>
          <a className="btn btn-wa" target="_blank" rel="noreferrer" href={wa}>Send on WhatsApp</a>
        </div>
        <div style={{marginTop:10}}><Link to="/customize" style={{fontSize:13.5,fontWeight:700,color:"var(--orange)"}}>Back to customizer →</Link></div>
      </div>
    </div>
  </div>;
}

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
