export const WHATSAPP_MAIN = "919975075425";
export const WHATSAPP_ALT = "919822871537";
export const WHATSAPP_DECOR = "917709048937";
export const PHONE_DISPLAY_1 = "+91 99750 75425";
export const PHONE_DISPLAY_2 = "+91 98228 71537";
export const PHONE_DISPLAY_3 = "+91 77090 48937";
export const INSTA = "@shah_enterprises_nibm";
export const ADDRESS = "Shop no 7, Surya Building, Opposite Sunshree Kangan, NIBM Road, Pune";
// DEMO MODE for client presentation: hides cart + wishlist everywhere.
// Set to false to bring the full shop back.
export const DEMO_HIDE_COMMERCE = true;
// DEMO MODE: hide all interactive selectors + customizer for demo.
// Hides: colour/fabric selectors, Design Your Room customizer,
// tenure/size/add-on selectors, catalog filters.
// Set to false to bring all interactive selectors back.
export const DEMO_HIDE_INTERACTIVE = true;
export const ADDRESS_SHORT = "Shah Enterprises — NIBM, Kondhwa, Pune";
export const OFFER = { code:"FLEXI10", title:"10% OFF your first rental order", sub:"Use code at checkout on WhatsApp • Limited period" };
export const AREAS = ["NIBM","Kondhwa","Undri","Hadapsar","Magarpatta","Katraj","Wanwadi","Camp","Kothrud","Baner"];
export const waLink = (phone, text) => `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
export const waCheckout = (cart, tenure) => {
  const lines = cart.map(c=>`${c.name} [${c.mode}${c.mode==="rent"?" "+tenure:""}${c.meta?.color?" "+c.meta.color:""}${c.meta?.addon&&c.meta.addon!=="Only product (no add-on)"?" + "+c.meta.addon:""}] x${c.qty}`).join("\n");
  const rent = cart.filter(c=>c.mode==="rent").reduce((a,c)=>a+c.rent*c.qty,0);
  const buy = cart.filter(c=>c.mode==="buy").reduce((a,c)=>a+c.buy*c.qty,0);
  return waLink(WHATSAPP_MAIN, `Hi FlexiFurni! I want to order:\n${lines}\n---\nRent total: Rs.${rent}/mo | Buy total: Rs.${buy}\nName:\nAddress in Pune:\nDelivery date:`);
};

// All product photos stored locally in /public/img/ (no internet needed).
// To use your own real photos later: replace these files keeping the same names.
const LOCAL = {
  "photo-1555041469-a586c61ea9bc": "/img/gen/grey-fabric-3-seater-sofa.jpg",
  "photo-1540574163026-643ea20ade25": "/img/gen/tan-leatherette-3-seater-sofa.jpg",
  "photo-1493663284031-b7e3aefcae8e": "/img/gen/wooden-tv-unit-and-decor.jpg",
  "photo-1505693416388-ac5ce068fe85": "/img/gen/solid-wood-king-bed-storage.jpg",
  "photo-1540518614846-7eded433c457": "/img/gen/queen-bed-with-upholstered-headb.jpg",
  "photo-1577140917170-285929fb55b7": "/img/gen/solid-wood-dining-table-set.jpg",
  "photo-1595428774223-ef52624120d2": "/img/gen/4-seater-dining-set.jpg",
  "photo-1524758631624-e2822e304c36": "/img/gen/office-furniture-setup-in-daylight.jpg",
  "photo-1571175443880-49e1d25b2bc5": "/img/gen/double-door-refrigerator-front-view.jpg",
  "photo-1626806787461-102c1bfaaea1": "/img/gen/white-front-load-washing-machine.jpg",
  "photo-1560448204-e02f11c3d0e2": "/img/gen/1bhk-furniture-set-flat-lay.jpg",
  "photo-1538688525198-9b88f6f53126": "/img/gen/loft-wardrobe-with-backlight-leds.jpg",
  "photo-1493150134366-cacb0bdc03fe": "/img/gen/modular-sofa-with-material-swatches.jpg",
  "photo-1519710164239-da123dc03ef4": "/img/gen/loft-bed-with-study-table.jpg",
  "photo-1497366216548-37526070297c": "/img/gen/office-workstation-row-furniture.jpg",
  "photo-1556911220-bff31c812dba": "/img/gen/appliance-trio-on-wood-floor.jpg",
  "photo-1594620302200-9a762244a156": "/img/gen/sheesham-bookshelf-full-of-books.jpg",
  "photo-1518455027359-f3f8164ba6bd": "/img/gen/solid-wood-study-table-and.jpg",
  "photo-1618220179428-22790b461013": "/img/gen/sideboard-console-with-vases.jpg",
  "photo-1533090481720-856c6e3c1fdc": "/img/gen/white-dining-table-and-chairs.jpg",
  "photo-1616486338812-3dadae4b4ace": "/img/gen/grey-l-shape-sectional-sofa.jpg",
  "photo-1600166898405-da9535204843": "/img/gen/red-kashmiri-hand-knotted-carpet.jpg",
  "photo-1558904541-efa843a96f01": "/img/gen/artificial-grass-roll-unrolled.jpg",
  "photo-1567016432779-094069958ea5": "/img/gen/mustard-two-seater-sofa.jpg",
};
const u = (id) => LOCAL[id] || `https://images.unsplash.com/${id}?q=80&w=900&auto=format&fit=crop`;

export const CATEGORIES = [
  { slug: "living-room", name: "Living Room", img: "/img/gen/bright-living-room-with-sofa.jpg" },
  { slug: "bedroom", name: "Bedroom", img: "/img/gen/bedroom-furniture-with-solid-woo.jpg" },
  { slug: "dining", name: "Dining", img: "/img/gen/wooden-dining-set-in-room.jpg" },
  { slug: "home-office", name: "Home Office", img: "/img/gen/office-furniture-setup-in-daylight.jpg" },
  { slug: "appliances", name: "Appliances", img: "/img/gen/appliance-trio-on-wood-floor.jpg" },
  { slug: "wooden-work", name: "Wooden Work", img: "/img/gen/sheesham-bookshelf-full-of-books.jpg" },
  { slug: "decor", name: "Carpets & Grass", img: "/img/gen/turkish-carpet-in-living-room.jpg" },
  { slug: "custom-made", name: "Custom Made", img: "/img/gen/modular-sofa-with-material-swatches.jpg" },
];

export const PRODUCTS = [
  { id:"sofa-aurora-3s", sub:"Sofas", name:"Aurora 3-Seater Fabric Sofa", category:"living-room", type:"both", img:"/img/gen/grey-fabric-3-seater-sofa.jpg", gallery:["/img/gen/grey-fabric-3-seater-sofa.jpg","/img/gen/grey-3-seater-sofa-front.jpg","/img/gen/grey-fabric-sofa-living-corner.jpg"], rent:1499, buy:32999, mrp:42999, rating:4.7, reviews:212, dims:{L:210,W:90,H:85}, desc:"Deep-seat comfort sofa with solid wood frame. Perfect for renting or owning.", tags:["bestseller","fabric"] },
  { id:"sofa-leather-nova", sub:"Sofas", name:"Nova Leatherette Recliner Sofa", category:"living-room", type:"both", img:"/img/gen/tan-leatherette-3-seater-sofa.jpg", gallery:["/img/gen/tan-leatherette-3-seater-sofa.jpg","/img/gen/sofa-leather-tan-jpg-tan-leatherette-3-seater.jpg","/img/gen/black-leather-sofa.jpg"], rent:1999, buy:45999, mrp:54999, rating:4.6, reviews:98, dims:{L:205,W:92,H:88}, desc:"Premium leatherette finish, easy-clean. Looks rich in living rooms.", tags:["premium"] },
  { id:"bed-king-woods", sub:"King Beds", name:"Solid Sheesham King Bed with Storage", category:"bedroom", type:"both", img:"/img/gen/solid-wood-king-bed-storage.jpg", gallery:["/img/gen/solid-wood-king-bed-storage.jpg","/img/gen/solid-wood-king-bed.jpg","/img/gen/bedroom-furniture-with-solid-woo.jpg"], rent:1299, buy:38999, mrp:48999, rating:4.8, reviews:301, dims:{L:200,W:180,H:110}, desc:"Factory-made solid wood king bed. Made to your space.", tags:["wooden","storage"] },
  { id:"bed-queen-linen", sub:"Queen Beds", name:"Linen Upholstered Queen Bed", category:"bedroom", type:"both", img:"/img/gen/queen-bed-with-upholstered-headb.jpg", gallery:["/img/gen/queen-bed-with-upholstered-headb.jpg","/img/gen/green-velvet-queen-bed.jpg","/img/gen/upholstered-queen-bed-on-floor.jpg"], rent:1099, buy:29999, mrp:36999, rating:4.5, reviews:140, dims:{L:200,W:160,H:105}, desc:"Soft upholstered headboard, premium quality built to last.", tags:["fabric"] },
  { id:"dining-6s-oak", sub:"Dining Sets", name:"6-Seater Oak Dining Set", category:"dining", type:"both", img:"/img/gen/solid-wood-dining-table-set.jpg", gallery:["/img/gen/solid-wood-dining-table-set.jpg","/img/gen/wooden-dining-set-in-room.jpg","/img/gen/set-of-four-wooden-chairs.jpg"], rent:1399, buy:34999, mrp:41999, rating:4.6, reviews:88, dims:{L:180,W:90,H:75}, desc:"Family dining set in seasoned wood. Hassle-free delivery.", tags:["wooden"] },
  { id:"dining-4s-compact", sub:"Dining Sets", name:"Compact 4-Seater Dining", category:"dining", type:"rent", img:"/img/gen/4-seater-dining-set.jpg", gallery:["/img/gen/4-seater-dining-set.jpg","/img/gen/4-seater-dining-straight-front.jpg","/img/gen/wooden-dining-set-on-floor.jpg"], rent:899, buy:18999, mrp:22999, rating:4.4, reviews:64, dims:{L:120,W:75,H:75}, desc:"Perfect fit for 1BHK flats and compact homes.", tags:["compact"] },
  { id:"workstation-ergo", sub:"Study Tables", name:"Ergonomic Home Office Desk + Chair", category:"home-office", type:"both", img:"/img/gen/office-furniture-setup-in-daylight.jpg", gallery:["/img/gen/office-furniture-setup-in-daylight.jpg","/img/gen/computer-desk-with-monitor.jpg","/img/gen/black-ergonomic-office-chair.jpg"], rent:799, buy:15999, mrp:19999, rating:4.7, reviews:175, dims:{L:120,W:60,H:75}, desc:"WFH combo with ergonomic chair. Flexible rental plans.", tags:["combo","wfh"] },
  { id:"wardrobe-sliding", sub:"Wardrobes", name:"Sliding Wardrobe with Mirror", category:"bedroom", type:"both", img:"/img/gen/sliding-door-wardrobe-with-full.jpg", gallery:["/img/gen/sliding-door-wardrobe-with-full.jpg","/img/gen/wardrobe-straight-front-view.jpg","/img/gen/walnut-3-door-hinged-wardrobe.jpg"], rent:999, buy:27999, mrp:33999, rating:4.5, reviews:77, dims:{L:180,W:60,H:200}, desc:"Custom made to your wall size. Factory-direct price.", tags:["custom","wooden"] },
  { id:"tv-unit-nordic", sub:"TV Units", name:"Nordic TV Unit + Coffee Table", category:"living-room", type:"buy", img:"/img/gen/wooden-tv-unit-and-decor.jpg", gallery:["/img/gen/wooden-tv-unit-and-decor.jpg","/img/gen/compact-tv-unit-in-room.jpg","/img/gen/smart-led-tv-on-unit.jpg"], rent:699, buy:14999, mrp:18999, rating:4.4, reviews:52, dims:{L:160,W:40,H:50}, desc:"Minimal TV unit, custom polish options.", tags:["wooden"] },
  { id:"fridge-double", sub:"Refrigerators", name:"Double-Door Refrigerator", category:"appliances", type:"rent", img:"/img/gen/double-door-refrigerator-front-view.jpg", gallery:["/img/gen/double-door-refrigerator-front-view.jpg","/img/gen/double-door-refrigerator-steel-f.jpg","/img/gen/refrigerator-in-kitchen.jpg"], rent:1199, buy:28999, mrp:32999, rating:4.5, reviews:110, dims:{L:70,W:70,H:170}, desc:"Appliances on rent with free service.", tags:["appliance"] },
  { id:"washing-auto", sub:"Washing Machines", name:"Front-Load Washing Machine", category:"appliances", type:"rent", img:"/img/gen/white-front-load-washing-machine.jpg", gallery:["/img/gen/white-front-load-washing-machine.jpg","/img/gen/top-load-washing-machine-in-laundry.jpg","/img/gen/appliances-displayed-on-wood-floor.jpg"], rent:899, buy:22999, mrp:26999, rating:4.6, reviews:93, dims:{L:60,W:60,H:85}, desc:"Zero-deposit appliance rental in Pune.", tags:["appliance"] },
  { id:"combo-bhk1", sub:"Combos", name:"Full 1BHK Rental Combo", category:"living-room", type:"rent", img:"/img/gen/1bhk-furniture-set-flat-lay.jpg", gallery:["/img/gen/1bhk-furniture-set-flat-lay.jpg","/img/gen/living-room-furniture-package-di.jpg","/img/gen/bedroom-furniture-package-displayed.jpg"], rent:3999, buy:99999, mrp:129999, rating:4.9, reviews:240, dims:{L:0,W:0,H:0}, desc:"Bed + sofa + dining + appliances. Live easy from day 1.", tags:["combo","bestseller"] },
  { id:"custom-wardrobe-loft", sub:"Wardrobes", name:"Custom Loft Wardrobe (Made to Measure)", category:"custom-made", type:"custom", img:"/img/gen/loft-wardrobe-with-backlight-leds.jpg", gallery:["/img/gen/loft-wardrobe-with-backlight-leds.jpg","/img/gen/loft-wardrobe-with-leds.jpg","/img/gen/corner-l-shape-wardrobe-in-bedroom.jpg"], rent:0, buy:45000, mrp:55000, rating:5.0, reviews:41, dims:{L:240,W:60,H:220}, desc:"Made directly from our factory. Any wood, any size.", tags:["custom","wooden"] },
  { id:"custom-sofa-l", sub:"Sofas", name:"L-Shape Custom Sofa (Choose Fabric)", category:"custom-made", type:"custom", img:"/img/gen/modular-sofa-with-material-swatches.jpg", gallery:["/img/gen/modular-sofa-with-material-swatches.jpg","/img/gen/beige-sectional-and-coffee-table.jpg","/img/gen/grey-l-shape-sectional-sofa.jpg"], rent:0, buy:52999, mrp:64999, rating:4.9, reviews:37, dims:{L:260,W:160,H:85}, desc:"Pick fabric, colour, length. We build it in 10-14 days.", tags:["custom","fabric"] },
  { id:"study-loft-bed", sub:"Single Beds", name:"Study + Loft Bed for Students", category:"bedroom", type:"rent", img:u("photo-1519710164239-da123dc03ef4"), gallery:[u("photo-1519710164239-da123dc03ef4")], rent:1099, buy:24999, mrp:29999, rating:4.5, reviews:68, dims:{L:200,W:90,H:170}, desc:"Ideal for students near NIBM, Undri, Kondhwa.", tags:["students"] },
  { id:"office-4pack", sub:"Office Chairs", name:"4-Seater Office Workstation Pack", category:"home-office", type:"rent", img:"/img/gen/office-workstation-row-furniture.jpg", gallery:["/img/gen/office-workstation-row-furniture.jpg","/img/gen/meeting-chair-pair-in-office.jpg","/img/gen/startup-team-in-rented-office.jpg"], rent:2499, buy:59999, mrp:74999, rating:4.6, reviews:45, dims:{L:240,W:120,H:75}, desc:"Startup offices: rent full setups monthly.", tags:["office","combo"] },
  { id:"wood-bookshelf", sub:"Bookshelves", name:"Sheesham Wall Bookshelf — 5 Tier", category:"wooden-work", type:"both", img:"/img/gen/sheesham-bookshelf-full-of-books.jpg", gallery:["/img/gen/sheesham-bookshelf-full-of-books.jpg","/img/gen/sheesham-bookshelf-filled-with-b.jpg","/img/gen/small-bookshelf-in-study-corner.jpg"], rent:799, buy:18999, mrp:23999, rating:4.7, reviews:63, dims:{L:180,W:35,H:200}, desc:"Solid-wood bookshelf, factory finish. Made to your wall width.", tags:["wooden","custom"] },
  { id:"wood-study-table", sub:"Study Tables", name:"Solid Wood Study Table", category:"wooden-work", type:"both", img:"/img/gen/solid-wood-study-table-and.jpg", gallery:["/img/gen/solid-wood-study-table-and.jpg","/img/gen/foldable-study-table-in-room.jpg","/img/gen/wooden-study-chair-with-cushion.jpg"], rent:499, buy:9499, mrp:11999, rating:4.6, reviews:81, dims:{L:110,W:55,H:75}, desc:"Sturdy study/work table in seasoned wood. Student favourite.", tags:["wooden","study"] },
  { id:"wood-sideboard", sub:"Chest of Drawers", name:"Cane & Wood Sideboard Console", category:"wooden-work", type:"both", img:"/img/gen/sideboard-console-with-vases.jpg", gallery:["/img/gen/sideboard-console-with-vases.jpg","/img/gen/wooden-chest-of-drawers.jpg","/img/gen/wooden-coffee-table-in-room.jpg"], rent:899, buy:21999, mrp:26999, rating:4.8, reviews:47, dims:{L:140,W:40,H:80}, desc:"Handcrafted cane + solid wood console. Designer look, factory price.", tags:["wooden","premium"] },
  { id:"dining-round-2s", sub:"Dining Tables", name:"Round 2-Seater Dining Table", category:"dining", type:"both", img:"/img/gen/white-dining-table-and-chairs.jpg", gallery:["/img/gen/white-dining-table-and-chairs.jpg","/img/gen/white-dining-table-and-chairs-2.jpg","/img/gen/glass-top-dining-table-photography.jpg"], rent:649, buy:12999, mrp:15999, rating:4.5, reviews:59, dims:{L:90,W:90,H:75}, desc:"Compact round dining for couples & small kitchens.", tags:["compact"] },
  { id:"sofa-sectional-l", sub:"Sofas", name:"L-Shape Sectional Sofa + Coffee Table", category:"living-room", type:"both", img:"/img/gen/grey-l-shape-sectional-sofa.jpg", gallery:["/img/gen/grey-l-shape-sectional-sofa.jpg","/img/gen/beige-sectional-and-coffee-table.jpg","/img/gen/furniture-in-modern-living-room.jpg"], rent:2199, buy:54999, mrp:67999, rating:4.8, reviews:112, dims:{L:280,W:170,H:85}, desc:"Big family sectional with wooden coffee table. Full living set.", tags:["bestseller","fabric"] },
  { id:"sofa-terracotta-2s", sub:"Sofas", name:"Mustard 2-Seater Compact Sofa", category:"living-room", type:"both", img:"/img/gen/mustard-two-seater-sofa.jpg", gallery:["/img/gen/mustard-two-seater-sofa.jpg","/img/gen/green-2-seater-sofa.jpg","/img/gen/navy-blue-fabric-sofa.jpg"], rent:999, buy:24999, mrp:29999, rating:4.7, reviews:74, dims:{L:150,W:85,H:80}, desc:"Warm mustard fabric, solid wood legs. Perfect pop for small living rooms.", tags:["fabric","compact"] },
  { id:"carpet-kashmiri-turkish", sub:"Carpets", name:"Kashmiri & Turkish Premium Carpets", category:"decor", type:"buy", img:"/img/gen/red-kashmiri-hand-knotted-carpet.jpg", gallery:["/img/gen/red-kashmiri-hand-knotted-carpet.jpg","/img/gen/rolled-kashmiri-carpet-on-floor.jpg","/img/gen/turkish-carpet-in-living-room.jpg"], rent:0, buy:7999, mrp:12999, rating:4.9, reviews:58, dims:{L:180,W:120,H:2}, desc:"Authentic Kashmiri craftsmanship + rich Turkish patterns. Neutral tones & bold motifs for living rooms, bedrooms & offices. Sizes 5×7, 6×9, 8×11. Handpicked at best price in Pune.", tags:["premium","decor"] },
  { id:"grass-turf-roll", sub:"Artificial Grass", name:"Artificial Grass Roll + Installation", category:"decor", type:"buy", img:"/img/gen/artificial-grass-roll-unrolled.jpg", gallery:["/img/gen/artificial-grass-roll-unrolled.jpg","/img/gen/artificial-grass-roll-unrolling.jpg","/img/gen/balcony-covered-with-artificial.jpg"], rent:0, buy:3499, mrp:4999, rating:4.8, reviews:132, dims:{L:300,W:180,H:4}, desc:"Premium soft realistic turf. Zero maintenance, weather-resistant, custom sizes cut to fit. Balconies, terraces, offices, events & backdrops. Trusted by hundreds in Pune.", tags:["decor","outdoor"] },
];

export const FABRICS = [
  { name:"Beige Linen", hex:"#d9c7a7" },
  { name:"Charcoal Grey", hex:"#4b5563" },
  { name:"Navy Blue", hex:"#1e3a8a" },
  { name:"Terracotta", hex:"#c2571b" },
  { name:"Olive Green", hex:"#5b6b3a" },
  { name:"Mustard", hex:"#d9a21b" },
  { name:"Blush Pink", hex:"#e8b4a0" },
  { name:"Teal", hex:"#0f766e" },
];

export function priceFor(p, mode, tenure){
  if(mode==="rent"){
    const mult = tenure==="3 mo"?1.25:tenure==="6 mo"?1.1:tenure==="12 mo"?1:0.85;
    return Math.round(p.rent*mult);
  }
  return p.buy;
}

export const MENU = [
  { title:"Living Room", links:["Sofas","Recliners","Ottomans","Center Tables","TV Units","Loungers"] },
  { title:"Bedroom", links:["Queen Beds","King Beds","Storage Beds","Single Beds","Bedside Tables","Wardrobes","Mattresses"] },
  { title:"Storage", links:["Chest of Drawers","TV Units","Shoe Racks","Wardrobes"] },
  { title:"Study & Office", links:["Study Tables","Office Chairs","Bookshelves"] },
  { title:"Dining", links:["Dining Tables","Dining Chairs","Dining Sets"] },
  { title:"More", links:["Kids Beds","Refrigerators","Washing Machines","Carpets","Artificial Grass","Combos","Best Deals"] },
];

export const ADDONS = [
  { name:"Only product (no add-on)", add:0 },
  { name:"Mattress 6-inch", add:4500 },
  { name:"Pillow set (2 pcs)", add:999 },
  { name:"Express installation", add:499 },
];

export const subSlug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g,"-");
export const subName = (slug) => {
  const all = [...new Set(MENU.flatMap(m=>m.links))];
  return all.find(l=>subSlug(l)===slug) || slug;
};

// Before/after makeover sliders. Drop matching photo pairs in public/img/
// and add an entry here — the "Real makeovers" section appears automatically.
// Example: { title:"Tired wood out. Solid comfort in.", tag:"BED RENEWAL", before:"/img/make-bed-before.jpg", after:"/img/make-bed-after.jpg" },
export const MAKEOVERS = [
  { title:"Tired wood out. Solid comfort in.", tag:"BED RENEWAL", before:"/img/gen/fixed-bed-on-wood-floor.jpg", after:"/img/gen/old-sagging-bed-in-bedroom.jpg" },
];
