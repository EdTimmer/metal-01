import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Mesh, TextureLoader } from 'three';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { useLoader } from '@react-three/fiber';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js'; // For loading .exr files


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


  // Load textures
  // const texture = useLoader(THREE.TextureLoader, '/textures/asphalt/asphalt_pit_lane_diff_2k.jpg'); // Diffuse texture
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


  useEffect(() => {
    const loader = new FontLoader();
    loader.load('/fonts/alata_regular.typeface.json', (loadedFont) => { //'/fonts/mate_sc_regular.typeface.json'
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
        // transparent={true}
        attenuationDistance={materialProps.attenuationDistance}
        attenuationColor={materialProps.attenuationColor}
        envMapIntensity={materialProps.envMapIntensity}
        color={color}
        
        transparent={false} // Allow transparency for transmission effects

      />
      {/* <meshStandardMaterial
        map={texture}
        displacementMap={displacementMap} // Displacement map
        displacementScale={0.1} // Adjust depth based on displacement
        normalMap={normalMap} // Normal map for surface details
        roughnessMap={roughnessMap} // Roughness map for surface shininess

        // clearcoat={materialProps.clearcoat}
        // transmission = {materialProps.transmission}
        roughness = {materialProps.roughness}
        metalness = {materialProps.metalness}
        // reflectivity = {materialProps.reflectivity}
        // ior = {materialProps.ior}
        // thickness = {materialProps.thickness}
        // transparent={true}
        // attenuationDistance = {materialProps.attenuationDistance}
        // attenuationColor = {materialProps.attenuationColor}
        envMapIntensity = {materialProps.envMapIntensity}
        color = {color}
      /> */}
    </mesh>
  );
});

export default LogoText;
