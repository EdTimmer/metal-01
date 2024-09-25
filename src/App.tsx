import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';

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
  GreenStripe,
  Footer,
} from './App.styles'
import MarloLogoGroupOne from './components/MarloLogoGroupOne';
import MarloLogoGroupTwo from './components/MarloLogoGroupTwo';


function App() {
  return (
    <AppContainer>
      <RowOne>
        <HeaderContainer>
          <Header>Below are two examples of Marlo logos made with 3D graphics for the web. Each logo could be grabbed and rotated by clicking and dragging. This feature is optional and could be disabled.</Header>
          <Header>Top logo is shown without projection - parts that are closer do not appear larger than parts that are further away.
          Bottom logo is shown with projection - parts that are closer appear larger.</Header>
          <Header>Each logo could be modified with the controllers on the right. This allows designers to modify original styling but please note that the styles will not be saved on reload. Therefore, 
            please record the values for the properties that should be changed. Further changes to animations, sizes, and shapes can be made on request.</Header>
        </HeaderContainer>
      </RowOne>

      <LogoRow>
        <GreenStripe />
        <YellowStripe />

        <MeshContainer>
          <LogoContainer>
            <Canvas gl={{ antialias: true }}>
              {/* <PerspectiveCamera makeDefault fov={20} position={[0, 0, 20]} /> */}
              <OrthographicCamera makeDefault position={[0, 0, 20]} zoom={45} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[0, 0, 10]} />
              {/* <directionalLight position={[0, 10, 10]} />
              <directionalLight position={[0, -10, 10]} /> */}
              <OrbitControls enableDamping enableZoom={false} />
              <MarloLogoGroupOne 
                textColor={'#4b5460'}
                dotsColor={"#FFE200"}
                isAnimated={true}
                pauseDuration={2}
                rotationSpeed={0.015}            
              />
              <Environment preset="warehouse" />
              {/* <primitive object={new THREE.AxesHelper(5)} /> */}
            </Canvas>
          </LogoContainer>
        </MeshContainer>
        <YellowStripe />
        <RightSide />
      </LogoRow>

      <LogoRow>
        <GreenStripe />
        <YellowStripe />

        <MeshContainer>
          <LogoContainer>
            <Canvas gl={{ antialias: true }}>
              <PerspectiveCamera makeDefault fov={20} position={[0, 0, 20]} />
              {/* <OrthographicCamera makeDefault position={[0, 0, 20]} zoom={45} /> */}
              <ambientLight intensity={0.5} />
              {/* <directionalLight position={[0, 0, 10]} />
              <directionalLight position={[0, 10, 10]} />
              <directionalLight position={[0, -10, 10]} /> */}
              <directionalLight position={[10, 0, 10]} />
              <directionalLight position={[10, 0, 0]} />
              <OrbitControls enableDamping enableZoom={false} />
              <MarloLogoGroupTwo 
                textColor={"#FF40FF"}
                dotsColor={"#00FA92"}
                isAnimated={true}
                pauseDuration={2}
                rotationSpeed={5}            
              />
              <Environment preset="warehouse" />
            </Canvas>
          </LogoContainer>
        </MeshContainer>
        <YellowStripe />
        <RightSide />
      </LogoRow>

      <Footer>
        <HeaderContainer>
            <Header>Created by Edward Timmer, Deloitte Digital</Header>
          </HeaderContainer>
      </Footer>

    </AppContainer>
  )
}

export default App
