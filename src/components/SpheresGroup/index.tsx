import * as THREE from 'three';
import SphereStationary from './SphereStationary';

interface Props {
  position: [number, number, number];
  dotsColor: string;
  sphereMaterialProps: any;
}

function SpheresGroup({ position, dotsColor, sphereMaterialProps }: Props) {
  return (
    <group position={position} scale={[1, 1, 1]} rotation={new THREE.Euler(0, 0, 0)}>
      <SphereStationary size={0.19} position={[-0.3, 0, 0]} color={dotsColor} materialProps={sphereMaterialProps} />
      <SphereStationary size={0.19} position={[0.3, 0, 0]} color={dotsColor} materialProps={sphereMaterialProps} />
    </group>    
  );
}

export default SpheresGroup;