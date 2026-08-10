// @ts-nocheck
import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';

function Model({ mode = 'lens' }) {
  const meshRef = useRef();

  // Fallback geometries since we don't have the .glb files in the sandbox
  const geometry = useMemo(() => {
    if (mode === 'lens') return new THREE.TorusGeometry(1, 0.4, 32, 100);
    if (mode === 'bar') return new THREE.BoxGeometry(2, 0.2, 0.2);
    return new THREE.BoxGeometry(1.2, 1.2, 1.2);
  }, [mode]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} geometry={geometry}>
        <MeshTransmissionMaterial
          backside
          backsideThickness={0.5}
          thickness={1}
          chromaticAberration={0.06}
          anisotropicBlur={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
          color="#ffffff"
          ior={1.5}
          transparent
        />
      </mesh>
    </Float>
  );
}

const FluidGlass = ({ mode = 'lens', className = '', style }) => {
  return (
    <div className={`fluid-glass-container ${className}`} style={{ width: '100%', height: '300px', ...style }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Model mode={mode} />
      </Canvas>
    </div>
  );
};

export default FluidGlass;
