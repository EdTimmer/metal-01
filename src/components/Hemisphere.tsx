import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { useRef, useMemo, useEffect, useState } from 'react';
import { TextureLoader } from 'three';

interface Props {
  position: [number, number, number];
  size: number;
  rotation: [number, number, number];
  onLoadComplete: () => void; // Callback to notify parent when loading is complete
}

const Hemisphere = ({ position, size, rotation, onLoadComplete }: Props) => {
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const [isLoaded, setIsLoaded] = useState(false); // State to track if assets are fully loaded
  const [shouldRotate, setShouldRotate] = useState(false); // State to track rotation start

  const targetRotation = new THREE.Euler(-Math.PI, 0, 0); // Target rotation (x, y, z)

  // Load textures using useLoader
  const texture = useLoader(THREE.TextureLoader, '/textures/hangar/hangar_concrete_floor_diff_2k.jpg');
  // const displacementMap = useLoader(TextureLoader, '/textures/hangar/hangar_concrete_floor_disp_2k.png');
  const normalMap = useLoader(TextureLoader, '/textures/hangar/hangar_concrete_floor_nor_gl_2k.png');
  const roughnessMap = useLoader(TextureLoader, '/textures/hangar/hangar_concrete_floor_rough_2k.png');

  // Memoize texture settings to ensure they are only applied once
  useMemo(() => {
    if (texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.magFilter = THREE.LinearFilter;
    }
    // if (displacementMap) {
    //   displacementMap.wrapS = THREE.RepeatWrapping;
    //   displacementMap.wrapT = THREE.RepeatWrapping;
    //   displacementMap.magFilter = THREE.LinearFilter;
    // }
    if (normalMap) {
      normalMap.wrapS = THREE.RepeatWrapping;
      normalMap.wrapT = THREE.RepeatWrapping;
      normalMap.magFilter = THREE.LinearFilter;
    }
    if (roughnessMap) {
      roughnessMap.wrapS = THREE.RepeatWrapping;
      roughnessMap.wrapT = THREE.RepeatWrapping;
      roughnessMap.magFilter = THREE.LinearFilter;
    }
  }, [texture, normalMap, roughnessMap]);

  // Notify parent that assets are loaded and update local state
  useEffect(() => {
    if (texture && normalMap && roughnessMap) {
      setIsLoaded(true);
      onLoadComplete(); // Notify parent that loading is complete
    }
  }, [texture, normalMap, roughnessMap, onLoadComplete]);

  // Start rotation after loading is complete
  useEffect(() => {
    if (isLoaded) {
      // Start rotation 7 seconds after loading is complete
      const timeoutId = setTimeout(() => {
        setShouldRotate(true); // Enable rotation
      }, 7000);

      return () => clearTimeout(timeoutId); // Clear timeout if component is unmounted
    }
  }, [isLoaded]);

  // Frame loop for controlling the rotation
  useFrame(() => {
    if (!meshRef.current || !shouldRotate) return; // Skip rotation if assets are not loaded or rotation not started

    const currentRotation = meshRef.current.rotation;
    const rotationSpeed = 0.01; // Adjust this value to control the rotation speed

    // Increment rotation towards the target rotation
    if (Math.abs(currentRotation.x - targetRotation.x) > 0.01) {
      currentRotation.x += (targetRotation.x - currentRotation.x) * rotationSpeed;
    }
    if (Math.abs(currentRotation.y - targetRotation.y) > 0.01) {
      currentRotation.y += (targetRotation.y - currentRotation.y) * rotationSpeed;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <sphereGeometry args={[size, 32, 32, 0, 3.14]} />
      <meshPhysicalMaterial
        ref={materialRef}
        map={texture}
        // displacementMap={displacementMap}
        // displacementScale={0} // Adjust depth based on displacement
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
