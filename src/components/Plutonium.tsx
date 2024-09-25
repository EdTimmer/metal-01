import { useRef, useEffect } from "react";
import { Mesh } from "three";
import { shaderMaterial } from '@react-three/drei';
import { useFrame, extend, ReactThreeFiber } from '@react-three/fiber'
import * as THREE from 'three';
import plutoniumFragmentShader from '../assets/shaders/plutonium/fragment.glsl?raw';
import plutoniumVertexShader from '../assets/shaders/plutonium/vertex.glsl?raw';
// import plutoniumFragmentShader from '../assets/shaders/perlin/fragment.glsl?raw';
// import plutoniumVertexShader from '../assets/shaders/perlin/vertex.glsl?raw';


const PlutoniumMaterial = shaderMaterial(
  {
    uTime: 0,
    wireframe: false,
  },
  plutoniumVertexShader,
  plutoniumFragmentShader
)

// Make shader material available in JSX
extend({ PlutoniumMaterial });

/**
 * Global declaration to let TypeScript know about plutoniumMaterial.
 * Can place this in the same file or a separate *.d.ts file.
 */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      plutoniumMaterial: ReactThreeFiber.Object3DNode<THREE.ShaderMaterial, typeof PlutoniumMaterial>;
    }
  }
}

interface PlutoniumProps {
  position: [number, number, number];
  rotation: THREE.Euler;
  size: number;
}

const Plutonium = ({ position, rotation, size }: PlutoniumProps) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<THREE.ShaderMaterial>(null!)

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.updateMatrix() // Ensure matrix update happens
    }
  }, [])

  // Update the time in the shader on each frame
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
    // rotate the mesh
    meshRef.current.rotation.y += 0.001
    meshRef.current.rotation.x += 0.001
    meshRef.current.rotation.z -= 0.001
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={[1, 1, 1]}>
      <sphereGeometry args={[size, 32, 32]} />
      <plutoniumMaterial ref={materialRef} attach="material" />
    </mesh>
  )
}

export default Plutonium;
