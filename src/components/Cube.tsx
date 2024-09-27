interface Props {
  position: [number, number, number];
  size: number;
}

const Cube = ({ position, size }: Props) => {

  return (
    <mesh position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial
        color={'#000000'}
        roughness={0.5}
        metalness={0.5}
      />
    </mesh>
  );
};

export default Cube;