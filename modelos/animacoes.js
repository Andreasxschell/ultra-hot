import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

// Locomotion is driven by actual movement speed; the attack pose has a clear wind-up and strike.
export function animateCreature(e,dt,playerPosition){
  e.phase += dt * (e.moving ? 8.5 : 2.4);
  const t=e.phase, p=e.group.position, moving=!!e.moving, attacking=(e.attackWindup||0)>0;
  const gait=t, stride=moving?1:0.12;
  e.group.position.y=Math.abs(Math.sin(gait))*0.075*stride+Math.sin(t*2.1)*.018;
  e.torso.scale.y=1+Math.sin(t*2.4)*.025;
  e.torso.rotation.z=Math.sin(t*1.7)*.025;
  if(playerPosition){const dx=playerPosition.x-p.x,dz=playerPosition.z-p.z;e.group.rotation.y=Math.atan2(dx,dz)}
  e.head.rotation.y=Math.sin(t*1.3)*.08;
  e.head.rotation.x=attacking?-.28+Math.sin(t*8)*.08:Math.sin(t*2.3)*.035;
  e.jaw.scale.y=.8+Math.abs(Math.sin(t*4.1))*.55;
  for(const leg of e.legs){const phase=gait+(leg.side>0?Math.PI:0);leg.upper.rotation.x=Math.sin(phase)*.62*stride;leg.upper.rotation.z=leg.side*.035;leg.lower.rotation.x=Math.max(0,Math.sin(phase+1.1))*.95*stride;}
  for(const arm of e.arms){const s=arm.side;if(attacking){arm.upper.rotation.x=-1.15+(s>0?.22:0);arm.upper.rotation.z=s*(.32+Math.sin(t*10)*.06);arm.lower.rotation.x=-.9;}else{arm.upper.rotation.x=Math.sin(gait+(s<0?Math.PI:0)+Math.PI)*.42*stride-.12;arm.upper.rotation.z=s*(.18+Math.sin(t*1.9)*.05);arm.lower.rotation.x=-.35+Math.sin(t*3+s)*.22;arm.lower.rotation.z=s*.14;}}
  for(let i=0;i<e.spines.length;i++){e.spines[i].rotation.x=Math.sin(t*2+i*.7)*.08;e.spines[i].rotation.z=Math.sin(t*1.6+i)*.09;}
  for(let i=0;i<e.tendrils.length;i++){const q=e.tendrils[i];q.rotation.x=Math.sin(t*2.8+i*1.9)*.38;q.rotation.z=Math.sin(t*2.2+i*2.3)*.28;}
}
