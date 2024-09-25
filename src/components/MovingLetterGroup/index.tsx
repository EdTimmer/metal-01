import * as THREE from 'three';
import SphereStationary from './SphereStationary';
import Letter from './Letter';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface Props {
  position: [number, number, number];
  dotsColor: string;
  sphereMaterialProps: any;
  letterRef: any;
  color: string;
  materialProps: any;
  isAnimated: boolean;
  // setIsAnimated: any;
  pauseDuration: number;
  rotationSpeed: number;
  animationControllersRef: any;
  // initialIsAnimated: boolean;
}

function MovingLetterGroup({ 
  position,
  dotsColor,
  sphereMaterialProps,
  letterRef,
  color,
  materialProps,  
  pauseDuration, 
  rotationSpeed, 
  isAnimated,
}: Props) {
  const movingLetterGroupRef = useRef<Group>(null);
  const [rotating, setRotating] = useState(true);

  const fullRotation = Math.PI * 2;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  let angle = Math.PI / 2;
  const radius = 1.125 // The distance from the origin

  useFrame((_, delta) => {    
    if (isAnimated && rotating && movingLetterGroupRef.current) {
      // Multiply delta by rotationSpeed to control the speed
      angle -= delta * rotationSpeed; // Decrement the angle for clockwise motion
  
      if (angle <= -fullRotation + Math.PI / 2) {
        // Stop the rotation after one full circle
        angle = Math.PI / 2; // Reset the angle to the 12 o'clock position
        setRotating(false); // Stop rotating further
      } else {
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
  
        movingLetterGroupRef.current.position.set(x, y, 0);
  
        const rotationAngle = Math.atan2(y, x);
  
        movingLetterGroupRef.current.rotation.set(0, 0, rotationAngle + Math.PI / 2);
      }
    }
  });

  useEffect(() => {
    if (!rotating || !isAnimated) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setRotating(true);
      }, pauseDuration * 1000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [rotating, pauseDuration, isAnimated]);

  return (
    <group position={position} scale={[1, 1, 1]} rotation={new THREE.Euler(0, 0, 0)}>
      <group ref={movingLetterGroupRef} position={[0, 1.125, 0]}>
        <SphereStationary size={0.19} position={[-0.3, 0, 0]} color={dotsColor} materialProps={sphereMaterialProps} />
        <SphereStationary size={0.19} position={[0.3, 0, 0]} color={dotsColor} materialProps={sphereMaterialProps} />
      </group>      

      <Letter
          letterRef={(el: any) => (letterRef.current[4] = el)}
          text={'O'}
          position={[0, 0, 0]}
          rotation={new THREE.Euler(0, 0, 0)}
          color={color}
          size={1.6}
          depth={0.4}
          materialProps={materialProps}
        />
    </group>    
  );
}

export default MovingLetterGroup;