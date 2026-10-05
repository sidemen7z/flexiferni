import { useEffect, useRef } from "react";
import * as THREE from "three";
import { buildSofa, disposeGroup } from "../three/models";

// Studio-quality 3D sofa preview for the customizer.
// Props: hex (fabric colour), seats, lshape, leg ('wood'|'metal'|'plinth'), widthScale, height
export default function SofaPreview({ hex, seats = 3, lshape = false, leg = "wood", widthScale = 1, height = 320 }){
  const mount = useRef(null);
  const T = useRef({});

  useEffect(()=>{
    const el = mount.current;
    const W = el.clientWidth || 600, H = height;
    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, W/H, 0.1, 50);
    camera.position.set(2.35, 1.75, 3.1);
    camera.lookAt(0, 0.5, 0);

    scene.add(new THREE.HemisphereLight(0xfff6ea, 0x9a8d76, 1.0));
    const key = new THREE.DirectionalLight(0xfff1dd, 2.0);
    key.position.set(2.4, 3.6, 2.6); key.castShadow = true;
    key.shadow.mapSize.set(1024,1024);
    key.shadow.camera.left=-3; key.shadow.camera.right=3; key.shadow.camera.top=3; key.shadow.camera.bottom=-2;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xdfe8ff, 0.55);
    fill.position.set(-2.6, 1.6, -1.4); scene.add(fill);

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(24,24), new THREE.ShadowMaterial({ opacity:0.28 }));
    ground.rotation.x = -Math.PI/2; ground.receiveShadow = true;
    scene.add(ground);

    const group = new THREE.Group(); scene.add(group);
    Object.assign(T.current, { renderer, scene, camera, group });

    let raf = 0;
    const loop = ()=>{ raf = requestAnimationFrame(loop); renderer.render(scene, camera); };
    loop();
    const onR = ()=>{
      const w = el.clientWidth || 600;
      renderer.setSize(w, H); camera.aspect = w/H; camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onR);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize", onR);
      try{ renderer.dispose(); el.removeChild(renderer.domElement); }catch{} };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    const { scene, group } = T.current;
    if(!scene || !group) return;
    disposeGroup(group);
    const m = buildSofa(hex, seats, { lshape, leg });
    m.scale.x = widthScale;
    group.add(m);
  },[hex, seats, lshape, leg, widthScale]);

  return <div ref={mount} style={{
    width:"100%", height,
    background:"radial-gradient(120% 90% at 50% 20%, #ffffff 0%, #f3efe4 55%, #e7dfcd 100%)",
    borderRadius:12, overflow:"hidden",
  }} />;
}
