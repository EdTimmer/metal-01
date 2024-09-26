import { useEffect, useRef, useState } from 'react';
import { Group } from 'three';
import { GUI } from 'lil-gui';
import LogoText from './LogoText';
import SpheresGroup from '../SpheresGroup';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import SphereStationary from '../SpheresGroup/SphereStationary';
import Plutonium from '../Plutonium';
import GlassCover from '../GlassCover';
import Sphere from '../Sphere';
import Cube from '../Cube';
import Hemisphere from '../Hemisphere';

interface Props {
  pauseDuration: number;
  rotationSpeed: number;
  textColor: string;
  dotsColor: string;
  isAnimated?: boolean;
}

function OrionLogo({ pauseDuration: initialPauseDuration, rotationSpeed: initialRotationSpeed, textColor, dotsColor, isAnimated: initialIsAnimated = false }: Props) {
  const logoRef = useRef<Group>(null);
  const logoTextRefs = useRef<Array<THREE.Mesh | null>>(Array(5).fill(null));
  const [currentTextColor, setCurrentTextColor] = useState(textColor);
  const [currentDotsColor, setCurrentDotsColor] = useState(dotsColor);
  const [rotating, setRotating] = useState(true);
  const [pauseDuration, setPauseDuration] = useState(initialPauseDuration);
  const [rotationSpeed, setRotationSpeed] = useState(initialRotationSpeed);
  const [isAnimated, setIsAnimated] = useState(initialIsAnimated);
  
  // Separate material properties for text and spheres
  const [materialProps, setMaterialProps] = useState({
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
  }); 

  const [sphereMaterialProps, setSphereMaterialProps] = useState({
    metalness: 1,
    roughness: 0.15,
    clearcoat: 0,
    reflectivity: 0.5,
    transmission: 0,
    ior: 1.45,
    thickness: 0.5,
    attenuationDistance: 2.5,
    attenuationColor: '#ffffff',
    envMapIntensity: 1,
  });

  const fullRotation = Math.PI * 2;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textFolderRef = useRef<any>(null);
  const sphereFolderRef = useRef<any>(null);
  const animationFolderRef = useRef<any>(null);
  const textControllersRef = useRef<any>({});
  const sphereControllersRef = useRef<any>({});
  const animationControllersRef = useRef<any>({});

  useFrame(() => {
    if (isAnimated && rotating && logoRef.current) {
      logoRef.current.rotation.y -= rotationSpeed;

      if (logoRef.current.rotation.y <= -fullRotation) {
        logoRef.current.rotation.y = 0;
        setRotating(false);
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

  useEffect(() => {
    const guiA = new GUI({ width: 380 });

    // Position the GUI
    guiA.domElement.style.position = 'absolute'; // Customize the position
    guiA.domElement.style.right = '0'; // Move this panel to the left side of the screen
    guiA.domElement.style.top = '0'; // Move it down slightly

    // Text material controls
    const textFolder = guiA.addFolder('Text Top');
    textFolderRef.current = textFolder;
    const textDebugObject = { ...materialProps, color: currentTextColor };

    textControllersRef.current.colorController = textFolder.addColor(textDebugObject, 'color').onChange((value: string) => {
      setCurrentTextColor(value);
      logoTextRefs.current.forEach((ref) => {
        if (ref && ref.material instanceof THREE.MeshPhysicalMaterial) {
          ref.material.color.set(value);
        }
      });
    });

    textControllersRef.current.metalnessController = textFolder.add(textDebugObject, 'metalness', 0, 1).onChange((value: number) => {
      setMaterialProps((prev) => ({ ...prev, metalness: value }));
    });

    textControllersRef.current.roughnessController = textFolder.add(textDebugObject, 'roughness', 0, 1).onChange((value: number) => {
      setMaterialProps((prev) => ({ ...prev, roughness: value }));
    });

    textControllersRef.current.clearcoatController = textFolder.add(textDebugObject, 'clearcoat', 0, 1).onChange((value: number) => {
      setMaterialProps((prev) => ({ ...prev, clearcoat: value }));
    });

    textControllersRef.current.reflectivityController = textFolder.add(textDebugObject, 'reflectivity', 0, 1).onChange((value: number) => {
      setMaterialProps((prev) => ({ ...prev, reflectivity: value }));
    });

    textControllersRef.current.transmissionController = textFolder.add(textDebugObject, 'transmission', 0, 1).onChange((value: number) => {
      setMaterialProps((prev) => ({ ...prev, transmission: value }));
    });

    textControllersRef.current.iorController = textFolder.add(textDebugObject, 'ior', 1.3, 2).onChange((value: number) => {
      setMaterialProps((prev) => ({ ...prev, ior: value }));
    });

    textControllersRef.current.thicknessController = textFolder.add(textDebugObject, 'thickness', 0.1, 1).onChange((value: number) => {
      setMaterialProps((prev) => ({ ...prev, thickness: value }));
    });

    textControllersRef.current.attenuationDistanceController = textFolder.add(textDebugObject, 'attenuationDistance', 0.1, 5).onChange((value: number) => {
      setMaterialProps((prev) => ({ ...prev, attenuationDistance: value }));
    });

    textControllersRef.current.attenuationColorController = textFolder.addColor(textDebugObject, 'attenuationColor').onChange((value: string) => {
      setMaterialProps((prev) => ({ ...prev, attenuationColor: value }));
    });

    textControllersRef.current.envMapIntensityController = textFolder.add(textDebugObject, 'envMapIntensity', 0, 1).onChange((value: number) => {
      setMaterialProps((prev) => ({ ...prev, envMapIntensity: value }));
    });

    textFolder.open();

    // Spheres material controls
    const spheresFolder = guiA.addFolder('Dots Top');
    sphereFolderRef.current = spheresFolder;
    const sphereDebugObject = { ...sphereMaterialProps, dotsColor: currentDotsColor };

    sphereControllersRef.current.dotsColorController = spheresFolder.addColor(sphereDebugObject, 'dotsColor').onChange((value: string) => {
      setCurrentDotsColor(value);
    });

    sphereControllersRef.current.metalnessController = spheresFolder.add(sphereDebugObject, 'metalness', 0, 1).onChange((value: number) => {
      setSphereMaterialProps((prev) => ({ ...prev, metalness: value }));
    });

    sphereControllersRef.current.roughnessController = spheresFolder.add(sphereDebugObject, 'roughness', 0, 1).onChange((value: number) => {
      setSphereMaterialProps((prev) => ({ ...prev, roughness: value }));
    });

    sphereControllersRef.current.clearcoatController = spheresFolder.add(sphereDebugObject, 'clearcoat', 0, 1).onChange((value: number) => {
      setSphereMaterialProps((prev) => ({ ...prev, clearcoat: value }));
    });

    sphereControllersRef.current.reflectivityController = spheresFolder.add(sphereDebugObject, 'reflectivity', 0, 1).onChange((value: number) => {
      setSphereMaterialProps((prev) => ({ ...prev, reflectivity: value }));
    });

    sphereControllersRef.current.transmissionController = spheresFolder.add(sphereDebugObject, 'transmission', 0, 1).onChange((value: number) => {
      setSphereMaterialProps((prev) => ({ ...prev, transmission: value }));
    });

    sphereControllersRef.current.iorController = spheresFolder.add(sphereDebugObject, 'ior', 1.3, 2).onChange((value: number) => {
      setSphereMaterialProps((prev) => ({ ...prev, ior: value }));
    });

    sphereControllersRef.current.thicknessController = spheresFolder.add(sphereDebugObject, 'thickness', 0.1, 1).onChange((value: number) => {
      setSphereMaterialProps((prev) => ({ ...prev, thickness: value }));
    });

    sphereControllersRef.current.attenuationDistanceController = spheresFolder.add(sphereDebugObject, 'attenuationDistance', 0.1, 5).onChange((value: number) => {
      setSphereMaterialProps((prev) => ({ ...prev, attenuationDistance: value }));
    });

    sphereControllersRef.current.attenuationColorController = spheresFolder.addColor(sphereDebugObject, 'attenuationColor').onChange((value: string) => {
      setSphereMaterialProps((prev) => ({ ...prev, attenuationColor: value }));
    });

    sphereControllersRef.current.envMapIntensityController = spheresFolder.add(sphereDebugObject, 'envMapIntensity', 0, 1).onChange((value: number) => {
      setSphereMaterialProps((prev) => ({ ...prev, envMapIntensity: value }));
    });

    spheresFolder.open();

    // Animation controls
    const animationFolder = guiA.addFolder('Animation Top');
    animationFolderRef.current = animationFolder;
    const animationDebugObject = { isAnimated, rotationSpeed, pauseDuration };

    animationControllersRef.current.isAnimatedController = animationFolder.add(animationDebugObject, 'isAnimated').onChange((value: boolean) => {
      setIsAnimated(value);
    });

    animationControllersRef.current.rotationSpeedController = animationFolder.add(animationDebugObject, 'rotationSpeed', 0.001, 0.1, 0.002).onChange((value: number) => {
      setRotationSpeed(value);
    });

    animationControllersRef.current.pauseDurationController = animationFolder.add(animationDebugObject, 'pauseDuration', 0, 10, 1).onChange((value: number) => {
      setPauseDuration(value);
    });

    animationFolder.open();

    return () => {
      guiA.destroy();
    };
  }, [currentTextColor, currentDotsColor, pauseDuration, rotationSpeed, isAnimated]);

  // Separate useEffect to handle updates to Text GUI display
  useEffect(() => {
    if (textControllersRef.current) {
      Object.values(textControllersRef.current).forEach((controller: any) => {
        controller.updateDisplay();
      });
    }
  }, [materialProps]);

  // Separate useEffect to handle updates to Spheres GUI display
  useEffect(() => {
    if (sphereControllersRef.current) {
      Object.values(sphereControllersRef.current).forEach((controller: any) => {
        controller.updateDisplay();
      });
    }
  }, [sphereMaterialProps]);

  // Separate useEffect to handle updates to Animation GUI display
  useEffect(() => {
    if (animationControllersRef.current) {
      Object.values(animationControllersRef.current).forEach((controller: any) => {
        controller.updateDisplay();
      });
    }
  }, [isAnimated, rotationSpeed, pauseDuration]);

  // rotation={new THREE.Euler(0.4, 0.9, 0)}
  return (
    <group ref={logoRef} position={[-13, -2, 0]} scale={[3, 3, 3]} rotation={new THREE.Euler(0, 0, 0)}>
      <>
        {/* <LogoText
          ref={(el) => (logoTextRefs.current[0] = el)}
          text={'O'}
          position={[0, 2, 0]}
          rotation={new THREE.Euler(0, 0, 0)}
          color={currentTextColor}
          size={2}
          depth={0.4}
          materialProps={materialProps} // Pass shared materialProps
        /> */}

          {/* <SphereStationary size={0.3} position={[0, 3.5, 0]} color={currentDotsColor} materialProps={sphereMaterialProps} /> */}
          
        {/* <Plutonium position={[0, 2, 0]} rotation={new THREE.Euler(0, -Math.PI / 2, 0)} size={0.85} /> */}
        <GlassCover position={[0, 2, 0]} size={1.07} />
        <Sphere size={0.95} position={[0, 2, 0]} />

        <LogoText
          ref={(el) => (logoTextRefs.current[0] = el)}
          text={'RION'}
          position={[4.5, 2, 0]}
          rotation={new THREE.Euler(0, 0, 0)}
          color={currentTextColor}
          size={2}
          depth={0.6}
          materialProps={materialProps} // Pass shared materialProps
        />


        <LogoText
          ref={(el) => (logoTextRefs.current[0] = el)}
          text={'crypto Vault'}
          position={[5.5, -0.3, 0]}
          rotation={new THREE.Euler(0, 0, 0)}
          color={currentTextColor}
          size={1.6}
          depth={0.25}
          materialProps={materialProps} // Pass shared materialProps
        />

        <Hemisphere size={1.1} position={[0, 2, 0]} rotation={new THREE.Euler(-Math.PI / 2, 0, 0)} />
        {/* <Cube position={[5.5, -0.3, 0]} size={1.6} /> */}
        {/* <LogoText
          ref={(el) => (logoTextRefs.current[0] = el)}
          text={'o'}
          position={[5, -0.15, 0]}
          rotation={new THREE.Euler(0, 0, 0)}
          color={currentTextColor}
          size={1.6}
          depth={0.4}
          materialProps={materialProps} // Pass shared materialProps
        /> */}
        
        {/* <SphereStationary size={0.26} position={[-0.62, 0.07, 0]} color={currentDotsColor} materialProps={sphereMaterialProps} /> */}

        {/* <SphereStationary size={0.262} position={[6.4, 0.07, 0]} color={currentDotsColor} materialProps={sphereMaterialProps} /> */}

        {/* <LogoText
          ref={(el) => (logoTextRefs.current[4] = el)}
          text={'|'}
          position={[3.4, 0, 0]}
          rotation={new THREE.Euler(0, 0, 0)}
          color={currentTextColor}
          size={1.6}
          depth={0.4}
          materialProps={materialProps}
        /> */}
      </>
      {/* <SpheresGroup dotsColor={currentDotsColor} sphereMaterialProps={sphereMaterialProps} position={[3.4, 1.125, 0]} /> */}
    </group>
  );
}

export default OrionLogo;
