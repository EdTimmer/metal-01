import { useRef, useState, useEffect } from 'react';
import { Group } from 'three';
import LogoText from './LogoText';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import GlassCover from '../GlassCover';
import Sphere from '../Sphere';
import Hemisphere from '../Hemisphere';

interface Props {
  textColor: string;
};

function OrionLogo({ textColor }: Props) {
  const logoRef = useRef<Group>(null);
  const logoTextRefs = useRef<Array<THREE.Mesh | null>>(Array(5).fill(null));
  const vRef = useRef<THREE.Group | null>(null);

  // const [isAllAssetsLoaded, setIsAllAssetsLoaded] = useState(false); // Track loading of all assets
  const [loadedInstances, setLoadedInstances] = useState(0); // Track how many LogoText instances have loaded
  const totalInstances = 5; // Total number of LogoText instances
  const [isHemisphereLoaded, setIsHemisphereLoaded] = useState(false); // Track Hemisphere loading
  const [isAllAssetsLoaded, setIsAllAssetsLoaded] = useState(false); // Track if all assets are loaded

  // Increment loadedInstances only once per LogoText instance
  const handleLogoTextLoad = () => {
    setLoadedInstances((prev) => {
      if (prev < totalInstances) {
        return prev + 1;
      }
      return prev; // Prevent further increments
    });
  };
  
  // Check if all assets are loaded (LogoText and Hemisphere)
  useEffect(() => {
    if (loadedInstances === totalInstances && isHemisphereLoaded) {
      setIsAllAssetsLoaded(true); // All assets are now loaded
    }
  }, [loadedInstances, isHemisphereLoaded]);

  const currentTextColor = textColor;

  // Rotation control
  const [isRotating, setIsRotating] = useState(false);
  const [isRotatingV, setIsRotatingV] = useState(false);
  const targetRotation = new THREE.Euler(-0.55, 0.35, 0.18);
  const targetRotationV = new THREE.Euler(0.35, -Math.PI / 2, 0.18);
  const targetPositionV = [0.25, -0.16, 0];

  const rotationSpeedLogo = 0.01;
  const rotationSpeedV = 0.025;
  
  const materialProps ={
    metalness: 0.16,
    roughness: 0.5,
    clearcoat: 0,
    reflectivity: 0.5,
    transmission: 0,
    ior: 1.45,
    thickness: 0.5,
    attenuationDistance: 2.5,
    attenuationColor: '#ffffff',
    envMapIntensity: 1,
  }; 

  useFrame(() => {
    if (isAllAssetsLoaded) {
      setTimeout(() => {
        setIsRotating(true);
      }, 1000);

      if (isRotating && logoRef.current) {
        const currentRotation = logoRef.current.rotation;

        if (Math.abs(currentRotation.x - targetRotation.x) > 0.01) {
          currentRotation.x += (targetRotation.x - currentRotation.x) * rotationSpeedLogo;
        }
        if (Math.abs(currentRotation.y - targetRotation.y) > 0.01) {
          currentRotation.y += (targetRotation.y - currentRotation.y) * rotationSpeedLogo;
        }
        if (Math.abs(currentRotation.z - targetRotation.z) > 0.01) {
          currentRotation.z += (targetRotation.z - currentRotation.z) * rotationSpeedLogo;
        }

        if (
          Math.abs(currentRotation.x - targetRotation.x) < 0.01 &&
          Math.abs(currentRotation.y - targetRotation.y) < 0.01 &&
          Math.abs(currentRotation.z - targetRotation.z) < 0.01
        ) {
          setIsRotating(false);
        }
      }
    }
  });

  useFrame(() => {
    if (isAllAssetsLoaded) {
      setTimeout(() => {
        setIsRotatingV(true);
      }, 5000);

      if (isRotatingV && vRef.current) {
        const currentRotation = vRef.current.rotation;
        const currentPosition = vRef.current.position;

        if (Math.abs(currentRotation.y - targetRotationV.y) > 0.01) {
          currentRotation.y += (targetRotationV.y - currentRotation.y) * rotationSpeedV;
        }
        if (Math.abs(currentPosition.z - targetPositionV[2]) > 0.01) {
          currentPosition.z += (targetPositionV[2] - currentPosition.z) * rotationSpeedV;
        }

        if (
          Math.abs(currentRotation.y - targetRotationV.y) < 0.01 &&
          Math.abs(currentPosition.z - targetPositionV[2]) < 0.01
        ) {
          setIsRotating(false);
        }
      }
    }
  });

  return (
    <group ref={logoRef} position={[-3, 0, 0]} scale={[3, 3, 3]} rotation={[0.25, 0.335, 0]}>
      <GlassCover position={[-4.5, 2, 0]} size={1.07} />
      <Sphere size={0.95} position={[-4.5, 2, 0]} />
        <LogoText
          ref={(el) => (logoTextRefs.current[0] = el)}
          text={'RION'}
          position={[0, 2, 0]}
          rotation={new THREE.Euler(0, 0, 0)}
          color={currentTextColor}
          size={2}
          depth={0.6}
          materialProps={materialProps}
          onLoadComplete={handleLogoTextLoad} // Track loading completion
        />

        <LogoText
          ref={(el) => (logoTextRefs.current[1] = el)}  // Ensure different ref index
          text={'cr'}
          position={[-5.4, -0.3, 0]}
          rotation={new THREE.Euler(0, 0, 0)}
          color={currentTextColor}
          size={1.4}
          depth={0.25}
          materialProps={materialProps}
          onLoadComplete={handleLogoTextLoad} // Track loading completion
        />

        <LogoText
          ref={(el) => (logoTextRefs.current[2] = el)}  // Ensure different ref index
          text={'ypto'}
          position={[-2.6, -0.3, 0]}
          rotation={new THREE.Euler(0, 0, 0)}
          color={currentTextColor}
          size={1.4}
          depth={0.25}
          materialProps={materialProps}
          onLoadComplete={handleLogoTextLoad} // Track loading completion
        />

        <group ref={vRef} position={[0.25, -0.16, -1.2]}>
          <LogoText
            ref={(el) => (logoTextRefs.current[3] = el)}  // Ensure different ref index
            text={'V'}
            position={[0, 0, 0]}
            rotation={new THREE.Euler(0, Math.PI / 2, 0)}
            color={currentTextColor}
            size={2}
            depth={0.6}
            materialProps={materialProps}
            onLoadComplete={handleLogoTextLoad} // Track loading completion
          />
        </group>

        <LogoText
          ref={(el) => (logoTextRefs.current[4] = el)}  // Ensure different ref index
          text={'ault'}
          position={[3.37, -0.16, 0]}
          rotation={new THREE.Euler(0, 0, 0)}
          color={currentTextColor}
          size={2}
          depth={0.6}
          materialProps={materialProps}
          onLoadComplete={handleLogoTextLoad} // Track loading completion
        />

      <Hemisphere 
        size={1.1}
        position={[-4.5, 2, 0]}
        rotation={[0.3, 0, Math.PI / 2]}
        onLoadComplete={() => setIsHemisphereLoaded(true)} // Track Hemisphere loading completion
      />
    </group>    
  );
}

export default OrionLogo;
