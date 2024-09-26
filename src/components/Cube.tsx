interface Props {
  position: [number, number, number];
  size: number;
}

const Cube = ({ position, size }: Props) => {

  return (
    <mesh position={position}>
      <boxGeometry args={[size, size, size]} />
      {/* <meshPhysicalMaterial
        clearcoat={0}  // Shiny surface effect
        transmission={0}  // Fully transparent
        opacity={1}  // Fully opaque but will be transparent due to transmission
        // transparent={true}  // Enable transparency
        roughness={0}  // Smooth like glass
        reflectivity={0}  // Adjust reflection intensity
        metalness={1}  // Glass is non-metallic
        ior={1.45}  // Typical for glass (Index of Refraction)
        thickness={0.000001}  // Controls the refraction and look of thickness
        // attenuationColor="#ffffff"  // The color of the glass when light passes through
        attenuationDistance={2.5}  // Distance at which the glass becomes less transparent
        envMapIntensity={0}  // Control the strength of the reflections
        color='#040404'
      /> */}
      <meshStandardMaterial
        color={'#000000'}
        roughness={0.5}
        metalness={0.5}
      />
    </mesh>
  );
};

export default Cube;