import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

export function createRevolver(){
  const root=new THREE.Group();
  const steel=new THREE.MeshStandardMaterial({color:0x343943,metalness:.88,roughness:.24});
  const dark=new THREE.MeshStandardMaterial({color:0x111216,metalness:.48,roughness:.42});
  const brass=new THREE.MeshStandardMaterial({color:0x8e5a27,metalness:.8,roughness:.3});
  const grip=new THREE.MeshStandardMaterial({color:0x3a1718,roughness:.75});
  function box(w,h,d,m,x,y,z){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;root.add(o);return o}
  function cyl(rt,rb,h,m,x,y,z,seg=12){const o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,seg),m);o.position.set(x,y,z);o.rotation.x=Math.PI/2;o.castShadow=true;root.add(o);return o}
  // Compact stylized revolver, separate mechanical pieces.
  box(.22,.18,.46,steel,0,0,-.08);
  box(.18,.12,.28,dark,0,.01,-.38);
  cyl(.064,.064,.55,steel,0,.025,-.62,16);
  cyl(.083,.083,.12,dark,0,.025,-.35,16);
  cyl(.075,.075,.18,brass,0,.025,-.28,10);
  box(.12,.23,.18,grip,0,-.18,.02).rotation.x=-.18;
  box(.15,.05,.13,steel,0,-.08,.01);
  // Cylinder chamber with six visible cartridge rims.
  const drum=new THREE.Mesh(new THREE.CylinderGeometry(.105,.105,.18,12),steel);drum.rotation.x=Math.PI/2;drum.position.set(0,-.005,-.08);root.add(drum);
  for(let i=0;i<6;i++){const a=i*Math.PI/3;const c=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,.19,8),brass);c.rotation.x=Math.PI/2;c.position.set(Math.cos(a)*.065,Math.sin(a)*.065,-.08);root.add(c)}
  box(.035,.035,.08,brass,0,.11,-.61);
  box(.045,.035,.09,dark,0,.11,-.15);
  return root;
}