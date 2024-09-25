import { useRef } from "react";
import { Mesh } from "three";

interface Props {
  position: [number, number, number];
  size: number;
  color: string;
  materialProps: any;
}

const SphereStationary = ({ position, size, color, materialProps }: Props) => {
  const sphereOneRef = useRef<Mesh>(null);

  return (
    <mesh ref={sphereOneRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshPhysicalMaterial
        clearcoat={materialProps.clearcoat}
        transmission={materialProps.transmission}
        opacity={0.2}
        roughness={materialProps.roughness}
        reflectivity={materialProps.reflectivity}
        metalness={materialProps.metalness}
        ior={materialProps.ior}
        thickness={materialProps.thickness}
        attenuationDistance={materialProps.attenuationDistance}
        attenuationColor={materialProps.attenuationColor}
        envMapIntensity={materialProps.envMapIntensity}
        color={color}
      />
    </mesh>
  );
};

export default SphereStationary;
