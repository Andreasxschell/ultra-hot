import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';
import {createRevolver} from '../modelos/revolver.js';
export function buildPreludio(w){
 const {scene,box,cyl,mat,materials:m,addLight,levelObjects}=w;
 const add=o=>(levelObjects.push(o),o);
 // Brutalist tunnel with dark red industrial accents, ceiling aperture above the drop-in.
 add(box(9,.5,53,m.concrete,0,-.35,-10.5)); // corredor inicial
 add(box(18,.5,36,m.concrete,0,-.35,-55)); // arena
 add(box(18,.5,5,m.concrete,0,-.35,-74.5)); // plataforma antes do poço
 // Poço final aberto: sem piso entre z=-77 e z=-88
 add(box(9,.4,100,m.dark,0,5.7,-34));
 add(box(9,.3,12,m.dark,0,5.45,10)); // lip around ceiling hole; aperture is behind the player
 add(box(4.1,.3,7,m.dark,-2.45,5.45,5)); add(box(4.1,.3,7,m.dark,2.45,5.45,5));
 add(box(.45,5.8,100,m.concrete,-4.4,2.45,-34));add(box(.45,5.8,100,m.concrete,4.4,2.45,-34));
 for(let z=13;z>-76;z-=4){
  add(box(9,.22,.32,m.metal,0,5.2,z));add(box(.16,5.3,.18,m.dark,-4,2.2,z));add(box(.16,5.3,.18,m.dark,4,2.2,z));
  if(z%8===1){add(box(.12,.025,2,m.red,-3.95,.01,z));add(box(.12,.025,2,m.red,3.95,.01,z))}
  if(z%12===1){const l=addLight(0,4.5,z,0x7b0c20,.25,9);add(box(.7,.07,.2,m.metal,0,4.78,z))}
 }
 for(let side of [-1,1])for(let z=8;z>-70;z-=7){add(box(.2,1.5,1.3,m.dark,side*3.9,1,z));add(box(.08,1.1,.8,m.metal,side*3.78,1,z));add(cyl(.055,.055,2.5,m.metal,side*3.5,3,z));}
 // Door frame and arena throat.
 add(box(8,4.8,.35,m.dark,0,2.3,-12));add(box(.14,4.2,.14,m.glow,-3.8,2.2,-12));add(box(.14,4.2,.14,m.glow,3.8,2.2,-12));
 add(box(18,.5,36,m.dark,0,6.5,-55));add(box(.5,6.5,36,m.concrete,-9,2.7,-55));add(box(.5,6.5,36,m.concrete,9,2.7,-55));
 for(let z=-35;z>-74;z-=8){for(let x of [-6,-3,0,3,6])add(box(.5,.07,.4,m.red,x,.05,z));addLight(0,4,z,0xff142a,0,16)}
 for(let i=0;i<36;i++){let x=(Math.random()-.5)*7,z=3-Math.random()*68,s=.1+Math.random()*.28;let r=add(box(s,s*.5,s,i%3?m.dark:m.concrete,x,s*.25,z));r.rotation.y=Math.random()*3}
 // Pedestal and physical pickup model.
 add(cyl(.68,.78,.24,m.metal,0,.12,-3.5,scene,16));add(cyl(.5,.58,.2,m.dark,0,.32,-3.5,scene,16));add(box(.76,.08,.5,m.metal,0,.46,-3.5));add(box(.14,.42,.14,m.metal,0,.7,-3.5));add(box(.52,.06,.45,m.red,0,.94,-3.5));
 const pickup=createRevolver();pickup.position.set(0,1.22,-3.5);pickup.rotation.set(.04,Math.PI,0);scene.add(pickup);add(pickup);
 const halo=add(new THREE.Mesh(new THREE.TorusGeometry(.44,.025,6,32),new THREE.MeshBasicMaterial({color:0xff2538})));halo.rotation.x=Math.PI/2;halo.position.set(0,1.15,-3.5);
 const pl=addLight(0,1.8,-3.5,0xa90d25,.6,5);scene.userData.pickupModel=pickup;
 // Ambient accent strips and practical lights.
 for(let z=7;z>-76;z-=8){add(box(.12,.04,3,m.red,-3.8,.02,z));add(box(.12,.04,3,m.red,3.8,.02,z));addLight(0,3.7,z,0xffd1d6,.8,13)}
 // Arena cover, pillars, hazard markings and a readable final drop.
 for(let z=-39;z>-69;z-=10){for(let x of [-7,7]){add(box(.8,3,.8,m.metal,x,1.25,z));add(box(1.1,.15,1.1,m.red,x,2.85,z))}}
 for(let x=-6;x<=6;x+=2){add(box(1,.06,.35,m.red,x,.01,-72.2));}
 add(box(18,.35,.25,m.red,0,5.8,-77));addLight(0,1.5,-77,0xff001f,2.5,15);
 // extra industrial lights keep enemies and geometry readable
 for(let z=-20;z>-73;z-=9){addLight(-3.2,3.2,z,0xffa4ac,.55,10);addLight(3.2,3.2,z,0xb5caff,.5,10)}
}