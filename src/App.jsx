import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ShopProvider } from "./store/ShopContext";
import { Navbar, Footer, WhatsFloat, CartDrawer, BottomNav } from "./components/ui";
import Home from "./pages/Home";
import { Rent, Buy, Categories, CategoryView, SearchView, SubView } from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Sell from "./pages/Sell";
import Repair from "./pages/Repair";
import Customize from "./pages/Customize";
import RoomView, { Gallery } from "./pages/RoomView";
import { About, Contact, Cart, Wishlist, Account } from "./pages/Info";

function Shell(){
  const loc = useLocation();
  const home = loc.pathname==="/";
  useEffect(()=>{ window.scrollTo(0,0); },[loc.pathname]);
  return <>
    <Navbar/>
    <div key={loc.pathname} className={home?"routefade":"page routefade"}>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/rent" element={<Rent/>} />
        <Route path="/buy" element={<Buy/>} />
        <Route path="/combo" element={<Rent/>} />
        <Route path="/sell" element={<Sell/>} />
        <Route path="/repair" element={<Repair/>} />
        <Route path="/customize" element={<Customize/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/category/:slug" element={<CategoryView/>} />
        <Route path="/sub/:slug" element={<SubView/>} />
        <Route path="/search" element={<SearchView/>} />
        <Route path="/product/:id" element={<ProductDetail/>} />
        <Route path="/room-view" element={<RoomView/>} />
        <Route path="/gallery" element={<Gallery/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
    <Footer/><WhatsFloat/><CartDrawer/><BottomNav/>
  </>;
}

export default function App(){
  return <HashRouter>
    <ShopProvider>
      <Shell/>
    </ShopProvider>
  </HashRouter>;
}
