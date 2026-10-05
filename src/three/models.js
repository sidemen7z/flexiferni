import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

// Shared parametric furniture models (used by customizer previews + 3D room view)

export const WOOD = 0x5a3d24;
const METAL = 0x3a3f45;

export function fabricMat(hex, rough = 0.92){
  return new THREE.MeshStandardMaterial({ color:new THREE.Color(hex), roughness:rough, metalness:0.02 });
}
function part(geo, mat, x=0, y=0, z=0, rx=0, ry=0, rz=0){
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x,y,z); m.rotation.set(rx,ry,rz);
  m.castShadow = true; m.receiveShadow = true;
  return m;
}
const rb = (w,h,d,r=0.07)=>new RoundedBoxGeometry(w,h,d,3,r);

function legs(g, W, D, kind){
  if(kind==="plinth"){
    const m = new THREE.MeshStandardMaterial({ color:0x1c1c1e, roughness:0.7 });
    g.add(part(new THREE.BoxGeometry(W-0.24, 0.1, D-0.24), m, 0, 0.05, 0));
    return 0.10;
  }
  const legM = new THREE.MeshStandardMaterial({ color:kind==="metal"?METAL:WOOD, roughness:kind==="metal"?0.35:0.6, metalness:kind==="metal"?0.7:0 });
  const legG = new THREE.CylinderGeometry(0.035,0.028,0.13,10);
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sz])=>g.add(part(legG, legM, sx*(W/2-0.12), 0.065, sz*(D/2-0.12))));
  return 0.13;
}

export function buildSofa(hex, seats = 3, opts = {}){
  const { lshape = false, leg = "wood" } = opts;
  const g = new THREE.Group();
  const mat = fabricMat(hex);
  const cushion = fabricMat(new THREE.Color(hex).offsetHSL(0, 0.01, 0.05).getHex());
  const dark = fabricMat(new THREE.Color(hex).offsetHSL(0, 0, -0.06).getHex());
  const sw = 0.64, armW = 0.22, W = seats*sw + armW*2, D = 0.95, seatH = 0.44;

  g.add(part(rb(W, 0.26, D, 0.09), dark, 0, seatH-0.15, 0));                 // base
  g.add(part(rb(armW, 0.66, D, 0.09), mat, -W/2+armW/2, seatH+0.16, 0));    // arms
  g.add(part(rb(armW, 0.66, D, 0.09), mat,  W/2-armW/2, seatH+0.16, 0));
  g.add(part(rb(armW+0.06, 0.1, D+0.04, 0.045), cushion, -W/2+armW/2, seatH+0.52, 0)); // arm caps
  g.add(part(rb(armW+0.06, 0.1, D+0.04, 0.045), cushion,  W/2-armW/2, seatH+0.52, 0));
  g.add(part(rb(W, 0.68, 0.24, 0.1), mat, 0, seatH+0.36, -D/2+0.12, -0.1)); // backrest
  for(let i=0;i<seats;i++){
    const cx = -W/2 + armW + sw/2 + i*sw;
    g.add(part(rb(sw-0.05, 0.17, D-0.3, 0.07), cushion, cx, seatH+0.07, 0.05));       // seat cushions
    g.add(part(rb(sw-0.05, 0.46, 0.17, 0.07), cushion, cx, seatH+0.42, -D/2+0.26, -0.13)); // back cushions
  }
  if(lshape){ // chaise extension, front-right
    const cx0 = W/2 - armW - sw/2;
    g.add(part(rb(sw+0.1, 0.24, 0.85, 0.09), dark, cx0, seatH-0.16, D/2+0.32));
    g.add(part(rb(sw+0.02, 0.16, 0.78, 0.07), cushion, cx0, seatH+0.04, D/2+0.32));
  }
  const lift = legs(g, W, D, leg);
  g.position.y = lift;
  return g;
}

export const MODEL_BASE = { sofa:1, bed:1, wardrobe:0.72, dining:0.85, chair:1 };

export function buildWardrobe(){
  const g = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color:0x6b4a2b, roughness:0.55 });
  const door = new THREE.MeshStandardMaterial({ color:0x7d5a36, roughness:0.5 });
  const brass = new THREE.MeshStandardMaterial({ color:0xc9a227, roughness:0.3, metalness:0.8 });
  const W = 1.7, H = 2.0, D = 0.62;
  g.add(part(rb(W,H,D,0.02), wood, 0, H/2+0.1, 0));                        // body
  g.add(part(rb(W+0.08,0.09,D+0.08,0.02), wood, 0, H+0.12, 0));            // cornice
  g.add(part(rb(W-0.2,0.1,D-0.2), wood, 0, 0.05, 0));                      // plinth
  g.add(part(rb(W/2-0.05,H-0.24,0.05,0.015), door, -(W/4-0.005), H/2+0.08, D/2+0.015)); // doors
  g.add(part(rb(W/2-0.05,H-0.24,0.05,0.015), door,  (W/4-0.005), H/2+0.08, D/2+0.015));
  const hg = new THREE.CylinderGeometry(0.022,0.022,0.34,10);
  g.add(part(hg, brass, -0.09, H/2+0.1, D/2+0.07));
  g.add(part(hg, brass,  0.09, H/2+0.1, D/2+0.07));
  g.position.y = 0.1;
  return g;
}

export function buildDining(hex){
  const g = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color:0x6b4a2b, roughness:0.55 });
  const seatM = fabricMat(hex, 0.9);
  const top = new THREE.CylinderGeometry(0.58,0.58,0.07,28);
  g.add(part(top, wood, 0, 0.74, 0));
  g.add(part(new THREE.CylinderGeometry(0.07,0.07,0.68,12), wood, 0, 0.37, 0));
  g.add(part(new THREE.CylinderGeometry(0.3,0.34,0.06,20), wood, 0, 0.03, 0));
  for(let k=0;k<4;k++){
    const a = k*Math.PI/2 + Math.PI/4;
    const cx = Math.cos(a)*0.98, cz = Math.sin(a)*0.98;
    const c = new THREE.Group();
    c.add(part(rb(0.44,0.08,0.44,0.03), wood, 0, 0.46, 0));
    c.add(part(rb(0.4,0.06,0.4,0.03), seatM, 0, 0.52, 0));
    c.add(part(rb(0.44,0.52,0.07,0.03), wood, 0, 0.76, -0.2));
    const lg = new THREE.CylinderGeometry(0.025,0.02,0.46,8);
    [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sz])=>c.add(part(lg, wood, sx*0.18, 0.23, sz*0.18)));
    c.position.set(cx, 0, cz);
    c.rotation.y = -a + Math.PI/2 + Math.PI; // face table (approx)
    c.children.forEach(o=>{ o.castShadow = true; });
    g.add(c);
  }
  g.position.y = 0.05;
  return g;
}

export function buildChair(hex){
  const g = new THREE.Group();
  const mat = fabricMat(hex);
  const cushion = fabricMat(new THREE.Color(hex).offsetHSL(0, 0.01, 0.05).getHex());
  const legM = new THREE.MeshStandardMaterial({ color:WOOD, roughness:0.6 });
  const W = 0.72, D = 0.7, seatH = 0.44;
  g.add(part(rb(W,0.2,D,0.08), mat, 0, seatH-0.1, 0));
  g.add(part(rb(0.16,0.6,D,0.07), mat, -W/2+0.08, seatH+0.18, 0));
  g.add(part(rb(0.16,0.6,D,0.07), mat,  W/2-0.08, seatH+0.18, 0));
  g.add(part(rb(W,0.66,0.18,0.08), mat, 0, seatH+0.4, -D/2+0.09, -0.1));
  g.add(part(rb(W-0.3,0.14,D-0.24,0.06), cushion, 0, seatH+0.06, 0.04));
  const legG = new THREE.CylinderGeometry(0.032,0.026,0.14,10);
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sz])=>g.add(part(legG, legM, sx*(W/2-0.1), 0.07, sz*(D/2-0.1))));
  g.position.y = 0.12;
  return g;
}

export function buildBed(hex){
  const g = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color:0x6b4a2b, roughness:0.55 });
  const fabric = fabricMat(hex, 0.95);
  const white = new THREE.MeshStandardMaterial({ color:0xf2efe9, roughness:0.9 });
  g.add(part(rb(1.7,0.3,2.1,0.05), wood, 0, 0.3, 0));
  g.add(part(rb(1.7,0.95,0.16,0.06), fabric, 0, 0.78, -1.05, -0.06));
  g.add(part(rb(1.6,0.22,2.0,0.08), white, 0, 0.56, 0.02));
  g.add(part(rb(1.5,0.07,1.9,0.03), new THREE.MeshStandardMaterial({ color:0xd9d2c4, roughness:0.95 }), 0, 0.7, 0.02));
  g.add(part(rb(0.65,0.15,0.42,0.06), white, -0.4, 0.8, -0.68, 0, 0, 0.05));
  g.add(part(rb(0.65,0.15,0.42,0.06), white,  0.4, 0.8, -0.68, 0, 0, -0.05));
  const legG = new THREE.CylinderGeometry(0.04,0.032,0.16,10);
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sz])=>g.add(part(legG, wood, sx*0.75, 0.08, sz*0.95)));
  g.position.y = 0.16;
  return g;
}

export function disposeGroup(group){
  [...group.children].forEach(ch=>{
    ch.traverse?.(o=>{ o.geometry?.dispose?.(); const m=o.material; if(m && !m._shared){ Array.isArray(m)?m.forEach(x=>x.dispose?.()):m.dispose?.(); } });
    group.remove(ch);
  });
}
