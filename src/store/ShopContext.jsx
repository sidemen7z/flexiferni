import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ShopCtx = createContext(null);
export const useShop = () => useContext(ShopCtx);

export function ShopProvider({ children }){
  const [cart, setCart] = useState(()=>{ try{return JSON.parse(localStorage.getItem("ff_cart")||"[]")}catch{return []} });
  const [wish, setWish] = useState(()=>{ try{return JSON.parse(localStorage.getItem("ff_wish")||"[]")}catch{return []} });
  const [toast, setToast] = useState("");
  const [tenure, setTenure] = useState("12 mo");
  const [cartOpen, setCartOpen] = useState(false);
  const [area, setArea] = useState(()=>{ try{return localStorage.getItem("ff_area")||"NIBM"}catch{return "NIBM"} });

  useEffect(()=>localStorage.setItem("ff_cart", JSON.stringify(cart)),[cart]);
  useEffect(()=>localStorage.setItem("ff_wish", JSON.stringify(wish)),[wish]);
  useEffect(()=>{ try{localStorage.setItem("ff_area", area)}catch{} },[area]);

  const say = (m)=>{ setToast(m); setTimeout(()=>setToast(""),2200); };

  const addCart = (p, mode="rent", qty=1, meta={})=>{
    setCart(c=>{
      const key = p.id+"|"+mode+"|"+(meta.color||"")+"|"+(meta.L||"");
      const ex = c.find(x=>x.key===key);
      if(ex) return c.map(x=>x.key===key?{...x,qty:x.qty+qty}:x);
      return [...c,{key,id:p.id,name:p.name,img:p.img,mode,qty,rent:p.rent,buy:p.buy,meta}];
    });
    say(`${p.name} added (${mode})`);
    setCartOpen(true);
  };
  const updateQty = (key,d)=>setCart(c=>c.map(x=>x.key===key?{...x,qty:Math.max(1,x.qty+d)}:x));
  const removeLine = (key)=>setCart(c=>c.filter(x=>x.key!==key));
  const clearCart = ()=>setCart([]);
  const toggleWish = (id)=>{
    setWish(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);
  };

  const val = useMemo(()=>({cart,wish,toast,say,addCart,updateQty,removeLine,clearCart,toggleWish,tenure,setTenure,area,setArea,cartOpen,setCartOpen}),[cart,wish,toast,tenure,area,cartOpen]);
  return <ShopCtx.Provider value={val}>{children}{toast && <div className="toast">{toast}</div>}</ShopCtx.Provider>;
}
