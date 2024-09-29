import { Html, useProgress } from '@react-three/drei';

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ height: '40rem', width: '80rem', color: 'white', fontSize: '36px', zIndex: '20' }}>
        <p>Loading... {progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
};

export default Loader;
