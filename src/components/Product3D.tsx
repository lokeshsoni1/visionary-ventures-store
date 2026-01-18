import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function ProductBottle() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef}>
        {/* Bottle Body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.6, 0.7, 2, 32]} />
          <meshPhysicalMaterial
            color="#0a0a1a"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={2}
          />
        </mesh>
        
        {/* Bottle Cap */}
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.45, 0.5, 0.4, 32]} />
          <meshPhysicalMaterial
            color="#00BFFF"
            metalness={0.8}
            roughness={0.2}
            emissive="#00BFFF"
            emissiveIntensity={0.3}
          />
        </mesh>
        
        {/* Glowing Ring */}
        <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.65, 0.03, 16, 100]} />
          <meshBasicMaterial color="#00BFFF" transparent opacity={0.8} />
        </mesh>
        
        {/* Label Glow */}
        <mesh position={[0, -0.2, 0.71]}>
          <planeGeometry args={[0.8, 0.6]} />
          <meshBasicMaterial
            color="#8A2BE2"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
}

function GlowOrbs() {
  return (
    <>
      <Sphere args={[0.15, 32, 32]} position={[1.5, 1, 0]}>
        <MeshDistortMaterial
          color="#00BFFF"
          attach="material"
          distort={0.5}
          speed={2}
          transparent
          opacity={0.6}
        />
      </Sphere>
      <Sphere args={[0.1, 32, 32]} position={[-1.5, -0.5, 0.5]}>
        <MeshDistortMaterial
          color="#8A2BE2"
          attach="material"
          distort={0.3}
          speed={3}
          transparent
          opacity={0.5}
        />
      </Sphere>
      <Sphere args={[0.08, 32, 32]} position={[1, -1, -0.5]}>
        <MeshDistortMaterial
          color="#00BFFF"
          attach="material"
          distort={0.4}
          speed={2.5}
          transparent
          opacity={0.4}
        />
      </Sphere>
    </>
  );
}

export default function Product3D() {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <spotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          color="#00BFFF"
          castShadow
        />
        <spotLight
          position={[-5, 3, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#8A2BE2"
        />
        <pointLight position={[0, -3, 0]} intensity={0.5} color="#00BFFF" />
        
        <ProductBottle />
        <GlowOrbs />
        
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={4}
          color="#00BFFF"
        />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
