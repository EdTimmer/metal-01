import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import { 
  AppContainer,
  MeshContainer,
  LogoContainer,
  LogoRow,
  YellowStripe,
  RightSide,
  RowOne,
  HeaderContainer,
  Header,
  Text,
  GreenStripe,
  Footer,
} from './App.styles'
import OrionLogo from './components/OrionLogo';
import MarloLogoGroupTwo from './components/MarloLogoGroupTwo';
import { useRef } from 'react';
import { Group } from 'three';


function App() {
  const environmentRef = useRef<Group>(null);

  return (
    <AppContainer>
      <MeshContainer>
        <LogoContainer>
          <Canvas gl={{ antialias: true }}>
            {/* <OrthographicCamera makeDefault position={[0, 0, 20]} zoom={45} /> */}
            <PerspectiveCamera makeDefault fov={20} position={[0, 0, 80]} />
            <ambientLight intensity={10.0} />
            <directionalLight position={[10, 10, 10]} />
            <directionalLight position={[-10, 0, 10]} />
            <directionalLight position={[0, 0, 10]} intensity={1.5} />
            <directionalLight position={[-2, 0, 5]} intensity={1.5} />
            <directionalLight position={[2, 0, 5]} intensity={1.5} />
            <OrbitControls enableDamping enableZoom={false} />
            <OrionLogo 
              textColor={'#1f1f1f'}
              dotsColor={"#000000"}
              isAnimated={false}
              pauseDuration={0}
              rotationSpeed={0.015}            
            />
            {/* <Environment preset="lobby" /> */}
            {/* <group ref={environmentRef} rotation={[0, Math.PI, 0]}> */}
              <Environment files="/images/misty_pines_2k.hdr" environmentIntensity={1}/>
            {/* </group> */}
            <primitive object={new THREE.AxesHelper(5)} />
          </Canvas>
        </LogoContainer>
      </MeshContainer>


      
      <Footer>
        <HeaderContainer>
          <Text>Created by Edward Timmer, Deloitte Digital</Text>
        </HeaderContainer>
      </Footer>

    </AppContainer>
  )
}

export default App
