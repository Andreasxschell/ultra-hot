import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

export function createCreature(){
  const group=new THREE.Group();
  const skin=new THREE.MeshStandardMaterial({color:0x21191d,roughness:.78,metalness:.12});
  const armor=new THREE.MeshStandardMaterial({color:0x414047,roughness:.43,metalness:.62});
  const flesh=new THREE.MeshStandardMaterial({color:0x641a24,roughness:.48,metalness:.12,emissive:0x220006,emissiveIntensity:.35});
  const glow=new THREE.MeshStandardMaterial({color:0xff2337,emissive:0xff001a,emissiveIntensity:3,roughness:.2});
  const bone=new THREE.MeshStandardMaterial({color:0x9d9290,roughness:.8});
  const parts={group,legs:[],arms:[],hands:[],feet:[],eyes:[],spines:[],head:null,torso:null,jaw:null};
  function sphere(parent,scale,material,pos){const o=new THREE.Mesh(new THREE.SphereGeometry(1,12,10),material);o.scale.set(...scale);o.position.set(...pos);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
  function capsule(parent,r,len,material,pos){const o=new THREE.Mesh(new THREE.CapsuleGeometry(r,len,4,8),material);o.position.set(...pos);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
  function joint(parent,r,material,pos){return sphere(parent,[r,r,r],material,pos)}
  // The torso is asymmetrical and layered to avoid a rigid toy-like silhouette.
  parts.torso=sphere(group,[.39,.65,.25],skin,[0,1.45,0]);
  sphere(group,[.43,.31,.28],armor,[0,1.76,-.01]);
  sphere(group,[.24,.42,.27],flesh,[0,1.37,.16]);
  parts.head=new THREE.Group();parts.head.position.set(0,2.08,0);group.add(parts.head);
  sphere(parts.head,[.29,.34,.27],skin,[0,0,0]);
  sphere(parts.head,[.22,.16,.25],bone,[0,-.13,.12]);
  parts.jaw=sphere(parts.head,[.18,.08,.16],flesh,[0,-.24,.18]);
  sphere(parts.head,[.08,.08,.06],glow,[-.13,.04,.23]);sphere(parts.head,[.08,.08,.06],glow,[.13,.04,.23]);
  for(let i=0;i<5;i++){const s=capsule(group,.055,.25,armor,[(i-2)*.13,1.9,-.2]);s.rotation.z=(i-2)*-.18;parts.spines.push(s)}
  // Limbs are articulated groups with pivots, elbows/knees, and long digit-like claws.
  for(const side of [-1,1]){
    const shoulder=new THREE.Group();shoulder.position.set(side*.36,1.78,0);group.add(shoulder);
    capsule(shoulder,.13,.36,skin,[0,-.24,0]);
    joint(shoulder,.13,armor,[0,-.43,0]);
    const fore=new THREE.Group();fore.position.set(0,-.43,0);shoulder.add(fore);
    capsule(fore,.09,.34,flesh,[0,-.22,.02]);
    const hand=sphere(fore,[.12,.14,.1],armor,[0,-.43,.06]);
    for(let c=-1;c<=1;c++){const claw=capsule(fore,.025,.11,bone,[c*.065,-.53,.11]);claw.rotation.x=-.4}
    parts.arms.push({upper:shoulder,lower:fore,side});
    const hip=new THREE.Group();hip.position.set(side*.19,1.02,0);group.add(hip);
    capsule(hip,.15,.36,skin,[0,-.24,0]);
    joint(hip,.13,armor,[0,-.43,0]);
    const shin=new THREE.Group();shin.position.set(0,-.43,0);hip.add(shin);
    capsule(shin,.09,.36,skin,[0,-.22,.01]);
    const foot=sphere(shin,[.14,.08,.22],armor,[0,-.43,.08]);
    for(let c=-1;c<=1;c++){const talon=capsule(shin,.022,.1,bone,[c*.07,-.45,.23]);talon.rotation.x=-Math.PI/2}
    parts.legs.push({upper:hip,lower:shin,side});parts.feet.push(foot);
  }
  // Organic tendrils sway independently from the back.
  for(let i=0;i<3;i++){const t=new THREE.Group();t.position.set((i-1)*.16,1.65,-.2);group.add(t);capsule(t,.035,.38,flesh,[0,-.22,-.08]);sphere(t,[.055,.07,.06],bone,[0,-.43,-.08]);parts.tendrils??=[];parts.tendrils.push(t)}
  return parts;
}