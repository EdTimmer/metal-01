import { forwardRef, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Mesh, TextureLoader } from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { useLoader } from '@react-three/fiber';

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  text: string;
  color: string;
  size: number;
  depth: number;
  materialProps: {
    metalness: number;
    roughness: number;
    clearcoat: number;
    reflectivity: number;
    transmission: number;
    ior: number;
    thickness: number;
    attenuationDistance: number;
    attenuationColor: string;
    envMapIntensity: number;
  };
}

const LogoText = forwardRef<Mesh, Props>(({ position, rotation, text, color, size, depth, materialProps }, ref) => {
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  // Load font and textures using useLoader
  const font = useLoader(FontLoader, '/fonts/alata_regular.typeface.json');
  const texture = useLoader(THREE.TextureLoader, '/textures/hangar/hangar_concrete_floor_diff_2k.jpg');
  const displacementMap = useLoader(TextureLoader, '/textures/hangar/hangar_concrete_floor_disp_2k.png');
  const normalMap = useLoader(TextureLoader, '/textures/hangar/hangar_concrete_floor_nor_gl_2k.png');
  const roughnessMap = useLoader(TextureLoader, '/textures/hangar/hangar_concrete_floor_rough_2k.png');

  // Memoize texture settings to ensure they are only applied once
  useMemo(() => {
    if (texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.magFilter = THREE.LinearFilter;
    }
    if (displacementMap) {
      displacementMap.wrapS = THREE.RepeatWrapping;
      displacementMap.wrapT = THREE.RepeatWrapping;
      displacementMap.magFilter = THREE.LinearFilter;
    }
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
  }, [texture, displacementMap, normalMap, roughnessMap]);

  // Create text geometry once the font is loaded
  const textGeometry = useMemo(() => {
    if (!font) return null;

    const textOptions = {
      font,
      size,
      depth,
      curveSegments: 12,
      bevelEnabled: false,
      bevelThickness: 0.1,
      bevelSize: 0.01,
      bevelOffset: 0,
      bevelSegments: 5,
    };

    const geometry = new TextGeometry(text, textOptions);
    geometry.computeBoundingBox();
    geometry.center(); // Center the text at the origin

    return geometry;
  }, [font, text, size, depth]);

  if (!font || !textGeometry) return null;

  return (
    <mesh ref={ref} geometry={textGeometry} rotation={rotation} position={position}>
      <meshPhysicalMaterial
        ref={materialRef} // Attach the material to the ref

        map={texture}
        displacementMap={displacementMap} // Displacement map
        displacementScale={0} // Adjust depth based on displacement
        normalMap={normalMap} // Normal map for surface details
        roughnessMap={roughnessMap} // Roughness map for surface shininess
        clearcoat={materialProps.clearcoat}
        transmission={materialProps.transmission}
        roughness={materialProps.roughness}
        metalness={materialProps.metalness}
        reflectivity={materialProps.reflectivity}
        ior={materialProps.ior}
        thickness={materialProps.thickness}
        attenuationDistance={materialProps.attenuationDistance}
        attenuationColor={materialProps.attenuationColor}
        envMapIntensity={materialProps.envMapIntensity}
        color={color}
        transparent={false} // Allow transparency for transmission effects
      />
    </mesh>
  );
});

export default LogoText;
