import { Suspense } from 'react';
import { Loader } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
// import Loader from './components/Loader';

import { 
  AppContainer,
  MeshContainer,
  LogoContainer,
  HeaderContainer,
  Text,
  Footer,
} from './App.styles'
import OrionLogo from './components/OrionLogo';

function App() {
  return (
    <AppContainer>
      <MeshContainer>
        <LogoContainer>
          <Canvas gl={{ antialias: true }}>
            <Suspense fallback={null}>              
              {/* <OrthographicCamera makeDefault position={[0, 0, 20]} zoom={45} /> */}
              <PerspectiveCamera makeDefault fov={20} position={[0, 0, 80]} />
              <ambientLight intensity={10.0} />
              <directionalLight position={[10, 10, 10]} />
              <directionalLight position={[-10, 0, 10]} />
              <directionalLight position={[0, 0, 10]} intensity={1.5} />
              <directionalLight position={[-2, 0, 5]} intensity={1.5} />
              <directionalLight position={[2, 0, 5]} intensity={1.5} />

              <directionalLight position={[0, 10, 10]} intensity={10} />
              <directionalLight position={[-3, 10, 10]} intensity={10} />
              <directionalLight position={[3, 10, 10]} intensity={10} />

              <OrbitControls enableDamping enableZoom={false} />
              <OrionLogo 
                textColor={'#1f1f1f'}           
              />
              {/* <Environment preset="lobby" /> */}
                <Environment files="/images/misty_pines_2k.hdr" environmentIntensity={2}/>
                {/* <Environment files="/images/sunflowers_puresky_2k.hdr" environmentIntensity={2}/> */}
                
              {/* <primitive object={new THREE.AxesHelper(5)} /> */}
            </Suspense>
          </Canvas>
          <Loader
            containerStyles={{ backgroundColor: 'rgba(1, 1, 1, 0.8)', width: '100vw', height: '100vh', zIndex: '100' }} // Style of the loader container
            innerStyles={{ color: 'white', fontSize: '36px' }} // Style of the inner loading text
            dataStyles={{ color: 'white', fontSize: '36px' }} // Style of the loading percentage text
            dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`} // Customize text
          />
        </LogoContainer>
      </MeshContainer>


      
      <Footer>
        <HeaderContainer>
          <Text>Created by Edward Timmer</Text>
        </HeaderContainer>
      </Footer>

    </AppContainer>
  )
}

export default App
