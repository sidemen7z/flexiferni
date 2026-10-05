# FlexiFurni — All Images Needed (Numbered Generation Prompts)

Branding locked: navy blue #12295E, orange #F2620F, white. Clean modern marketplace photo style (IKEA / Pepperfry / Furlenco feel — bright, real-home, no AI-plastic look). All rooms: warm Pune apartment daylight, wooden floor, plants. No text inside generated photos (text is added in code).

Already USED from your uploads (in /public):
- 0A. logo.png — FlexiFurni glossy logo (keep as-is, do NOT regenerate)
- 0B. poster-bedroom.jpg — custom bedroom poster
- 0C. poster-appliances.jpg — rent/buy/sell appliances poster

Generate these (square/landscape, photorealistic):

## HOME HERO + TRUST (replace Unsplash later)
1. Hero living room, beige 3-seater fabric sofa + round wooden coffee table + arc floor lamp + wood-slat wall + sheer curtains, morning sun, wide 16:9, empty right side for headline text
2. Close-up sofa fabric texture, beige linen weave, soft daylight, macro
3. "Furniture that fits your life" handwritten sticky-note on wall, cozy living room blurred behind (for hero sticker overlay)

## CATEGORY TILES (6)
4. Living room set: fabric sofa + TV unit + coffee table, bright flat-lay room view
5. Bedroom: solid-wood king bed grey bedding + side tables + wardrobe, warm lamps
6. Dining: 6-seater oak dining table + chairs, sunlit dining nook
7. Home office: wooden desk + ergonomic black chair + shelf + plant
8. Appliances: steel double-door fridge + front-load washing machine, studio white bg
9. Custom-made: carpenter factory — half-built wardrobe + wood planks + tools, real workshop Pune

## PRODUCTS (rent + buy cards; front 3/4 view, white/room bg, no people)
10. Grey 3-seater sofa front view, wooden legs, living room
11. Tan leatherette 3-seater sofa, teal studio background (Furlenco-style banner)
12. Sheesham king bed with box storage, bedroom scene
13. Linen queen bed with tall headboard, minimal bedroom
14. Oak 6-seater dining set, top-down + side angle
15. Compact 4-seater dining for 1BHK
16. Office desk + ergonomic chair combo, home corner
17. Sliding wardrobe with mirror, bedroom wall
18. Nordic TV unit + coffee table set
19. Double-door refrigerator, studio
20. Front-load washing machine, studio
21. Full 1BHK combo flat-lay: sofa + bed + dining + fridge icons in one room render
22. L-shape sectional sofa, custom fabric swatches beside it
23. Loft wardrobe floor-to-ceiling, wood + backlight LEDs
24. Student loft bed with study table below

## CONFIGURATOR / ROOM-VIEW HELPERS
25. Sofa PNG cutout on transparent/checker background, straight front, for AR overlay (beige fabric)
26. Same sofa cutout, charcoal grey version
27. Same sofa cutout, navy blue version
28. Fabric swatch flat-lay: 8 folded fabrics (beige, grey, navy, terracotta, olive, mustard, blush, teal), top view
29. Wooden leg options close-up: tapered wood / black metal / plinth base, trio on white
30. Empty Indian living room + bedroom + study corner (3 photos), clean walls/floor, for "view in your room" demo fallback

## TRUST / STORE / SOCIAL
31. Delivery team carrying sofa into Pune apartment, smiling, branded navy t-shirt (no logo text distortion)
32. Factory craftsman polishing solid-wood bed frame, sawdust, warm light
33. Happy family on new sofa + dog, lived-in feel, daylight
34. Store front: "FlexiFurni NIBM Road" board, glass display with sofa + bed (evening)
35. Irfan Shah portrait: friendly store owner in navy shirt, arms crossed, store blurred behind (for About + digital card)
36. 50%-value-back circular badge isolated on white (orange arrows, navy text) — UI asset

## HOW TO USE
- Generate 1–36, save as /public/img/01-hero.jpg … /public/img/36-badge.png
- Then in src/data/site.js replace the Unsplash `u("photo-…")` URLs with `/img/xx-….jpg`. No code change needed otherwise.
- Keep faces natural, avoid extra fingers / warped text. Prefer real-photo models (Midjourney --style raw / Flux photo).
