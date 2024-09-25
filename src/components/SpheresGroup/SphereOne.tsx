import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface Props {
  position: [number, number, number];
  size: number;
  color: string;
  pauseDuration?: number;
  dotsSpeed?: number;
  startOffset?: number;
}

const SphereOne = ({ position, size, color, pauseDuration = 1, dotsSpeed = 0.5, startOffset = 0 }: Props) => {
  const sphereOneRef = useRef<Mesh>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseTime, setPauseTime] = useState(0);
  const [pauseOffset, setPauseOffset] = useState(0);  // Tracks total time paused
  const [baseTime] = useState(() => performance.now() / 1000);  // Start reference

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    // Manage pause timing, using pauseOffset to keep track of total time paused
    if (isPaused) {
      if (elapsedTime - pauseTime >= pauseDuration) {
        setIsPaused(false);
        setPauseOffset(pauseOffset + (elapsedTime - pauseTime));  // Update total pause time
      }
      return;  // Skip animation during pause
    }

    // Adjust elapsed time by subtracting baseTime and pauseOffset, and apply startOffset
    let adjustedTime = elapsedTime - (baseTime + pauseOffset) - startOffset;

    // Ensure the sphere doesn't start before its startOffset
    if (adjustedTime < 0) adjustedTime = 0;

    if (sphereOneRef.current) {
      // Smooth up-and-down motion using a sine wave
      const sineValue = Math.sin(adjustedTime * dotsSpeed);

      // Apply the y position using the sine value
      sphereOneRef.current.position.y = sineValue * 0.2 + 1.3;

      // Pause both spheres at the lowest point of the sine wave
      if (sineValue <= -0.99 && !isPaused) {
        setIsPaused(true);
        setPauseTime(elapsedTime);  // Record the time the pause starts
      }
    }
  });

  return (
    <mesh ref={sphereOneRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshPhysicalMaterial
        clearcoat={1}
        transmission={0}
        opacity={0.2}
        roughness={0.5}
        reflectivity={0.5}
        metalness={0}
        ior={1.45}
        thickness={1.0}
        attenuationDistance={2.5}
        envMapIntensity={0.1}
        color={color}
      />
    </mesh>
  );
};

export default SphereOne;
