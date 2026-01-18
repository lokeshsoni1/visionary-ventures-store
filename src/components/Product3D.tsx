import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import productImage from '@/assets/product-bottle.png';

function ProductBottle() {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  // Load the product image as texture
  const texture = useLoader(TextureLoader, productImage);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1.2}>
      <group ref={groupRef}>
        {/* Outer glow aura - mysterious premium effect */}
        <mesh ref={glowRef} position={[0, 0, -0.5]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshBasicMaterial
            color="#00BFFF"
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </mesh>
        
        {/* Secondary purple glow */}
        <mesh position={[0, 0.2, -0.3]}>
          <sphereGeometry args={[1.8, 32, 32]} />
          <meshBasicMaterial
            color="#8A2BE2"
            transparent
            opacity={0.06}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Product image plane - the actual product */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[2.5, 3.5]} />
          <meshStandardMaterial
            map={texture}
            transparent
            alphaTest={0.1}
            emissive="#00BFFF"
            emissiveIntensity={0.15}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
        
        {/* Back plane for depth */}
        <mesh position={[0, 0, -0.02]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[2.5, 3.5]} />
          <meshStandardMaterial
            map={texture}
            transparent
            alphaTest={0.1}
            emissive="#8A2BE2"
            emissiveIntensity={0.1}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
        
        {/* Glowing ring around product - mysterious effect */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.6, 0.02, 16, 100]} />
          <meshBasicMaterial color="#00BFFF" transparent opacity={0.6} />
        </mesh>
        
        {/* Second ring - offset for depth */}
        <mesh position={[0, -0.5, 0]} rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[1.4, 0.015, 16, 100]} />
          <meshBasicMaterial color="#8A2BE2" transparent opacity={0.4} />
        </mesh>

        {/* Top highlight ring */}
        <mesh position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.8, 0.01, 16, 100]} />
          <meshBasicMaterial color="#00BFFF" transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

function GlowOrbs() {
  return (
    <>
      {/* Mysterious floating orbs around the product */}
      <Sphere args={[0.12, 32, 32]} position={[1.8, 1.2, 0.5]}>
        <MeshDistortMaterial
          color="#00BFFF"
          attach="material"
          distort={0.6}
          speed={3}
          transparent
          opacity={0.7}
        />
      </Sphere>
      <Sphere args={[0.08, 32, 32]} position={[-1.6, -0.3, 0.8]}>
        <MeshDistortMaterial
          color="#8A2BE2"
          attach="material"
          distort={0.4}
          speed={4}
          transparent
          opacity={0.6}
        />
      </Sphere>
      <Sphere args={[0.1, 32, 32]} position={[1.2, -1.2, -0.3]}>
        <MeshDistortMaterial
          color="#00BFFF"
          attach="material"
          distort={0.5}
          speed={2.5}
          transparent
          opacity={0.5}
        />
      </Sphere>
      <Sphere args={[0.06, 32, 32]} position={[-1.2, 1, -0.5]}>
        <MeshDistortMaterial
          color="#8A2BE2"
          attach="material"
          distort={0.3}
          speed={3.5}
          transparent
          opacity={0.5}
        />
      </Sphere>
      {/* Additional mystery particles */}
      <Sphere args={[0.04, 16, 16]} position={[0.8, 0.5, 1]}>
        <meshBasicMaterial color="#00BFFF" transparent opacity={0.8} />
      </Sphere>
      <Sphere args={[0.03, 16, 16]} position={[-0.6, -0.8, 0.8]}>
        <meshBasicMaterial color="#8A2BE2" transparent opacity={0.7} />
      </Sphere>
    </>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#00BFFF" wireframe />
    </mesh>
  );
}

export default function Product3D() {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.4} />
          <spotLight
            position={[5, 5, 5]}
            angle={0.3}
            penumbra={1}
            intensity={2.5}
            color="#00BFFF"
            castShadow
          />
          <spotLight
            position={[-5, 3, 5]}
            angle={0.3}
            penumbra={1}
            intensity={1.5}
            color="#8A2BE2"
          />
          <pointLight position={[0, -3, 2]} intensity={0.8} color="#00BFFF" />
          <pointLight position={[2, 2, 3]} intensity={0.5} color="#8A2BE2" />
          
          <ProductBottle />
          <GlowOrbs />
          
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.4}
            scale={12}
            blur={2.5}
            far={4}
            color="#00BFFF"
          />
          
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}
