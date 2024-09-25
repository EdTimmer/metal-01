import { useEffect, useRef, useState } from 'react';
import { Group } from 'three';
import { GUI } from 'lil-gui';
import LogoText from './LogoText';
import * as THREE from 'three';
import MovingLetterGroup from '../MovingLetterGroup';

interface Props {
  pauseDuration: number;
  rotationSpeed: number;
  textColor: string;
  dotsColor: string;
  isAnimated: boolean;
}

function MarloLogoGroupTwo({ pauseDuration: initialPauseDuration, rotationSpeed: initialRotationSpeed, textColor, dotsColor, isAnimated: initialIsAnimated = false }: Props) {
  const marloLogoOneRef = useRef<Group>(null);
  const logoTextRefs = useRef<Array<THREE.Mesh | null>>(Array(5).fill(null));
  const [currentTextColor, setCurrentTextColor] = useState(textColor);
  const [currentDotsColor, setCurrentDotsColor] = useState(dotsColor);
  const [pauseDuration, setPauseDuration] = useState(initialPauseDuration);
  const [rotationSpeed, setRotationSpeed] = useState(initialRotationSpeed);
  const [isAnimated, setIsAnimated] = useState(initialIsAnimated);
  
  // Separate material properties for text and spheres
  const [materialProps, setMaterialProps] = useState({
    metalness: 0,
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
    metalness: 0,
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

  // const fullRotation = Math.PI * 2;
  // const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textFolderRef = useRef<any>(null);
  const sphereFolderRef = useRef<any>(null);
  const animationFolderRef = useRef<any>(null);
  const textControllersRef = useRef<any>({});
  const sphereControllersRef = useRef<any>({});
  const animationControllersRef = useRef<any>({});

  useEffect(() => {
    const guiB = new GUI({ width: 380 });

    // Position the GUI
    guiB.domElement.style.position = 'absolute'; // Customize the position
    guiB.domElement.style.right = '0'; // Move this panel to the left side of the screen
    guiB.domElement.style.top = '0'; // Move it down slightly

    // Text material controls
    const textFolder = guiB.addFolder('Text Bottom');
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
    const spheresFolder = guiB.addFolder('Dots Bottom');
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
    const animationFolder = guiB.addFolder('Animation Bottom');
    animationFolderRef.current = animationFolder;
    const animationDebugObject = { isAnimated, rotationSpeed, pauseDuration };

    animationControllersRef.current.isAnimatedController = animationFolder.add(animationDebugObject, 'isAnimated').onChange((value: boolean) => {
      setIsAnimated(value);
    });

    animationControllersRef.current.rotationSpeedController = animationFolder.add(animationDebugObject, 'rotationSpeed', 0, 15.0, 1).onChange((value: number) => {
      setRotationSpeed(value);
    });

    animationControllersRef.current.pauseDurationController = animationFolder.add(animationDebugObject, 'pauseDuration', 0, 10, 1).onChange((value: number) => {
      setPauseDuration(value);
    });

    animationFolder.open();

    return () => {
      guiB.destroy();
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

  return (
    <group ref={marloLogoOneRef} position={[0, 0, 0]} scale={[1, 1, 1]} rotation={new THREE.Euler(0, -0.35, 0)}>
      <>
        <LogoText
          ref={(el) => (logoTextRefs.current[0] = el)}
          text={'M'}
          position={[-4.1, 0, 0]}
          rotation={new THREE.Euler(0, 0, 0)}
          color={currentTextColor}
          size={1.6}
          depth={0.4}
          materialProps={materialProps} // Pass shared materialProps
        />
        <LogoText
          ref={(el) => (logoTextRefs.current[1] = el)}
          text={'A'}
          position={[-1.9, 0, 0]}
          rotation={new THREE.Euler(0, 0, 0)}
          color={currentTextColor}
          size={1.6}
          depth={0.4}
          materialProps={materialProps}
        />
        <LogoText
          ref={(el) => (logoTextRefs.current[2] = el)}
          text={'R'}
          position={[0, 0, 0]}
          rotation={new THREE.Euler(0, 0, 0)}
          color={currentTextColor}
          size={1.6}
          depth={0.4}
          materialProps={materialProps}
        />
        <LogoText
          ref={(el) => (logoTextRefs.current[3] = el)}
          text={'L'}
          position={[1.7, 0, 0]}
          rotation={new THREE.Euler(0, 0, 0)}
          color={currentTextColor}
          size={1.6}
          depth={0.4}
          materialProps={materialProps}
        />

        <MovingLetterGroup 
          letterRef={(el: any) => (logoTextRefs.current[4] = el)}
          color={currentTextColor}
          materialProps={materialProps}
          position={[3.4, 0, 0]}
          dotsColor={currentDotsColor}
          sphereMaterialProps={sphereMaterialProps}
          isAnimated={isAnimated}
          pauseDuration={pauseDuration}
          rotationSpeed={rotationSpeed}
          animationControllersRef={animationControllersRef}
          // setIsAnimated={setIsAnimated}
        />
        {/* <LogoText
          ref={(el) => (logoTextRefs.current[4] = el)}
          text={'O'}
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

export default MarloLogoGroupTwo;
