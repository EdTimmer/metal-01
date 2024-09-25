import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Mesh } from 'three';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

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
  }; // Material props passed from parent
}

const LogoText = forwardRef<Mesh, Props>(({ position, rotation, text, color, size, depth, materialProps }, ref) => {
  const [font, setFont] = useState<Font | null>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null); // Ref for material

  useEffect(() => {
    const loader = new FontLoader();
    loader.load('/fonts/poppins_semibold_regular.typeface.json', (loadedFont) => {
      setFont(loadedFont);
    });
  }, []);

  const textGeometry = useMemo(() => {
    if (!font) return null;

    const textOptions = {
      font,
      size,
      depth,
      curveSegments: 12,
      bevelEnabled: true,
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
        clearcoat={materialProps.clearcoat}
        transmission={materialProps.transmission}
        roughness={materialProps.roughness}
        metalness={materialProps.metalness}
        reflectivity={materialProps.reflectivity}
        ior={materialProps.ior}
        thickness={materialProps.thickness}
        // transparent={true}
        attenuationDistance={materialProps.attenuationDistance}
        attenuationColor={materialProps.attenuationColor}
        envMapIntensity={materialProps.envMapIntensity}
        color={color}
      />
    </mesh>
  );
});

export default LogoText;
