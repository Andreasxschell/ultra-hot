import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

// Procedural animation layers: gait, breathing, head tracking, limb counter-swing,
// shoulder recoil, and independent tendril motion.
export function animateCreature(e,dt,playerPosition){
  const t=e.phase, parts=e;
  const p=parts.group.position;
  const moving=true;
  const gait=t*5.2;
  parts.group.position.y=Math.abs(Math.sin(gait))*0.055+Math.sin(t*2.1)*.025;
  parts.torso.scale.y=1+Math.sin(t*2.4)*.035;
  parts.torso.rotation.z=Math.sin(t*1.7)*.035;
  parts.head.rotation.y=Math.sin(t*1.3)*.16;
  parts.head.rotation.x=Math.sin(t*2.3)*.06;
  parts.jaw.scale.y=.8+Math.abs(Math.sin(t*4.1))*.55;
  for(let i=0;i<parts.legs.length;i++){
    const leg=parts.legs[i],s=leg.side,phase=gait+(s>0?Math.PI:0);
    leg.upper.rotation.x=Math.sin(phase)*.48;
    leg.upper.rotation.z=s*.035;
    leg.lower.rotation.x=Math.max(0,Math.sin(phase+1.1))*.8;
  }
  for(const arm of parts.arms){
    const s=arm.side;
    arm.upper.rotation.x=Math.sin(gait+(s<0?Math.PI:0)+Math.PI)*.3-.18;
    arm.upper.rotation.z=s*(.18+Math.sin(t*1.9)*.07);
    arm.lower.rotation.x=-.35+Math.sin(t*3+s)*.22;
    arm.lower.rotation.z=s*.14;
  }
  for(let i=0;i<parts.spines.length;i++){parts.spines[i].rotation.x=Math.sin(t*2+i*.7)*.08;parts.spines[i].rotation.z=Math.sin(t*1.6+i)*.09}
  for(let i=0;i<parts.tendrils.length;i++){const q=parts.tendrils[i];q.rotation.x=Math.sin(t*2.8+i*1.9)*.38;q.rotation.z=Math.sin(t*2.2+i*2.3)*.28}
  if(playerPosition){const dx=playerPosition.x-p.x,dz=playerPosition.z-p.z;parts.group.rotation.y=Math.atan2(dx,dz)}
}