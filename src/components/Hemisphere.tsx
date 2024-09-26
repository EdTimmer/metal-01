import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { TextureLoader } from 'three';

interface Props {
  position: [number, number, number];
  size: number;
  rotation: THREE.Euler;
}

const Hemisphere = ({ position, size, rotation }: Props) => {
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  const texture = useLoader(THREE.TextureLoader, '/textures/hangar/hangar_concrete_floor_diff_2k.jpg');
  // const texture = useLoader(THREE.TextureLoader, '/textures/plaster/rough_plasterbrick_05_diff_2k.jpg');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.LinearFilter;
  
  // const envMap = useLoader(RGBELoader, '/textures/environment_map.exr'); // Environment map
  // const displacementMap = useLoader(TextureLoader, '/textures/asphalt/asphalt_pit_lane_disp_2k.png');
  const displacementMap = useLoader(TextureLoader, '/textures/hangar/hangar_concrete_floor_disp_2k.png');
  // const displacementMap = useLoader(TextureLoader, '/textures/plaster/rough_plasterbrick_05_disp_2k.png');
  displacementMap.wrapS = THREE.RepeatWrapping;
  displacementMap.wrapT = THREE.RepeatWrapping;
  displacementMap.magFilter = THREE.LinearFilter;

  // Load .exr normal and roughness maps using EXRLoader
  // const normalMap = useLoader(TextureLoader, '/textures/asphalt/asphalt_pit_lane_nor_gl_2k.png');
  const normalMap = useLoader(TextureLoader, '/textures/hangar/hangar_concrete_floor_nor_gl_2k.png');
  // const normalMap = useLoader(TextureLoader, '/textures/plaster/rough_plasterbrick_05_nor_gl_2k.png');
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.magFilter = THREE.LinearFilter;

  // const roughnessMap = useLoader(TextureLoader, '/textures/asphalt/asphalt_pit_lane_rough_2k.png');
  const roughnessMap = useLoader(TextureLoader, '/textures/hangar/hangar_concrete_floor_rough_2k.png');
  // const roughnessMap = useLoader(TextureLoader, '/textures/plaster/rough_plasterbrick_05_rough_2k.png');
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.magFilter = THREE.LinearFilter;


  return (
    <mesh position={position} rotation={rotation}>
      <sphereGeometry args={[size, 32, 32, 0, 3.14]} />
      <meshPhysicalMaterial
        ref={materialRef}    
        map={texture}
        displacementMap={displacementMap} // Displacement map
        displacementScale={0} // Adjust depth based on displacement
        normalMap={normalMap} // Normal map for surface details
        roughnessMap={roughnessMap} // Roughness map for surface shininess
        roughness={0.5}   
        metalness={0.16}        
        color='#040404'
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Hemisphere;