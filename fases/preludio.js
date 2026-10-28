import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';
import {createRevolver} from '../modelos/revolver.js';

// PRELÚDIO: sequência linear de espaços legíveis, com variação de escala e ritmo.
export function buildPreludio(w){
 const {scene,box,cyl,mat,materials:m,addLight,levelObjects}=w;
 const add=o=>(levelObjects.push(o),o);
 const floor=(x,z,width,depth,material=m.concrete)=>add(box(width,.55,depth,material,x,-.28,z));
 const wall=(x,z,height,depth=8,material=m.concrete,width=.45)=>add(box(width,height,depth,material,x,height/2-.05,z));
 const stripe=(x,z,width=1.4)=>add(box(width,.025,.16,m.red,x,.015,z));
 const lamp=(x,z,color=0xffd0c7)=>{addLight(x,4.7,z,color,1.7,15);add(box(.8,.12,.35,m.metal,x,5.05,z));add(box(.55,.06,.22,new THREE.MeshBasicMaterial({color:0xffe9dc}),x,4.96,z))};
 // Section 1 — entry / weapon acquisition. Open ceiling and clear silhouette.
 floor(0,1,18,24); wall(-9,1,6,24); wall(9,1,6,24);
 floor(0,-16,18,12); wall(-9,-16,6,12); wall(9,-16,6,12);
 for(let z=9;z>-22;z-=6){lamp(-5.8,z);lamp(5.8,z,0xff354c);stripe(-7.7,z,1.3);stripe(7.7,z,1.3)}
 // Weapon pedestal and readable pickup.
 add(cyl(.82,.96,.25,m.metal,0,.12,-3.5,scene,16));add(cyl(.58,.72,.22,m.dark,0,.34,-3.5,scene,16));add(box(.85,.09,.55,m.metal,0,.49,-3.5));add(box(.16,.38,.16,m.metal,0,.72,-3.5));add(box(.62,.06,.5,m.red,0,.94,-3.5));
 const pickup=createRevolver();pickup.position.set(0,1.23,-3.5);pickup.rotation.set(.04,Math.PI,0);scene.add(pickup);add(pickup);scene.userData.pickupModel=pickup;
 const halo=add(new THREE.Mesh(new THREE.TorusGeometry(.48,.025,6,32),new THREE.MeshBasicMaterial({color:0xff2538})));halo.rotation.x=Math.PI/2;halo.position.set(0,1.15,-3.5);addLight(0,1.8,-3.5,0xff1735,1.4,7);
 // Section 2 — armory / staggered cover, not a single narrow corridor.
 floor(0,-30,22,18);wall(-11,-30,6,18);wall(11,-30,6,18);
 for(const x of [-7,7]){add(box(1.25,3.5,1.25,m.metal,x,1.5,-25));add(box(1.55,.16,1.55,m.red,x,3.32,-25));add(box(1.25,3.5,1.25,m.metal,x,1.5,-34));}
 for(const x of [-8,8]){add(box(2.5,1.2,1.2,m.dark,x, .55,-29));add(box(2.5,.08,1.2,m.metal,x,.2,-29));}
 for(const z of [-24,-30,-36]){lamp(-4,z,0xffb5bd);lamp(4,z,0xd2dcff);}
 // Transition vestibule with a visible frame and side alcoves.
 floor(0,-43,16,10);wall(-8,-43,6,10);wall(8,-43,6,10);
 for(const x of [-6.5,6.5]){add(box(.5,5,.5,m.dark,x,2.4,-43));add(box(.12,4.5,.12,m.glow,x,2.4,-43));}
 add(box(13,.15,.35,m.metal,0,4.9,-43));lamp(0,-43,0xff263d);
 // Section 3 — machine hall, wider and taller, with visible pillars and side machinery.
 floor(0,-57,26,20);wall(-13,-57,7,20);wall(13,-57,7,20);
 for(const z of [-50,-57,-64])for(const x of [-9,9]){
  add(box(1.25,4.4,1.25,m.metal,x,2.1,z));add(box(1.65,.18,1.65,m.red,x,4.3,z));
  add(box(.22,2.2,.22,m.glow,x,1.4,z));
 }
 for(const x of [-11,11])for(const z of [-51,-59,-67]){add(box(1.3,2.3,1.1,m.dark,x,.95,z));add(box(1.4,.12,1.2,m.metal,x,2.1,z));}
 for(const z of [-49,-57,-65]){lamp(-4,z,0xffc3c9);lamp(4,z,0xb9d3ff);for(let x=-8;x<=8;x+=2)stripe(x,z,1.1)}
 // Section 4 — bridge and boss arena, broad sightlines; no overlapping hidden walls.
 floor(0,-74,22,14);wall(-11,-74,7,14);wall(11,-74,7,14);
 floor(0,-87,28,18);wall(-14,-87,8,18);wall(14,-87,8,18);
 // Boss plinth and arena markings.
 add(cyl(3.2,3.6,.5,m.dark,0,.15,-83,scene,24));add(cyl(2.7,3.1,.18,m.red,0,.48,-83,scene,24));
 for(let x=-10;x<=10;x+=2)stripe(x,-91,1.25);
 for(const x of [-9,9]){add(box(1.1,5,1.1,m.metal,x,2.35,-82));add(box(1.4,.16,1.4,m.red,x,4.85,-82));lamp(x,-82,x<0?0xff263d:0xffc4ca)}
 addLight(0,5,-82,0xff142a,3.2,24);
 // Exit ledge. The missing floor from z=-98 to -108 is the actual drop.
 floor(0,-97,18,6);wall(-9,-97,5,6);wall(9,-97,5,6);
 add(box(18,.2,.25,m.red,0,5.1,-99));addLight(0,1.5,-99,0xff001f,2.8,18);
 // Industrial ceiling sections stop before each room, so beams/pillars remain visible.
 for(const [z,width,depth] of [[1,18,22],[-16,18,10],[-30,22,16],[-43,16,8],[-57,26,18],[-74,22,12],[-87,28,16]]){
  add(box(width,.35,depth,m.dark,0,6.7,z));
  for(const x of [-width/2+1,width/2-1])add(box(.18,.18,depth,m.metal,x,6.48,z));
 }
 // Exposed conduits and floor debris add scale without blocking the player or hiding pillars.
 for(const side of [-1,1])for(let z=5;z>-94;z-=7){
  const x=side*(z<-45?11.7:z<-25?9.8:7.8);
  add(box(.14,.14,3.4,m.metal,x,4.85,z));add(box(.18,.55,.18,m.red,x,4.45,z));
 }
 for(let i=0;i<42;i++){const z=4-Math.random()*96;const width=z<-75?12:z<-45?11:z<-23?9:7;const x=(Math.random()*2-1)*width;const s=.12+Math.random()*.24;const debris=add(box(s,s*.45,s,m.dark,x,s*.23,z));debris.rotation.y=Math.random()*Math.PI;}
}
