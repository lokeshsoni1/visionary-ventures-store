import { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import productImage from '@/assets/product-bottle.png';

function DropperBottle() {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const bottleRef = useRef<THREE.Mesh>(null);
  
  // Load the product image as texture
  const texture = useLoader(TextureLoader, productImage);
  
  // Configure texture for better wrapping
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.flipY = true;
  
  useFrame((state) => {
    if (groupRef.current) {
      // Continuous slow 360° rotation
      groupRef.current.rotation.y += 0.003;
    }
    if (glowRef.current) {
      // Pulsing glow effect
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
      <group ref={groupRef}>
        {/* Outer glow aura - mysterious premium effect */}
        <mesh ref={glowRef} position={[0, 0, -0.5]}>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshBasicMaterial
            color="#00BFFF"
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </mesh>
        
        {/* Secondary purple glow */}
        <mesh position={[0, 0.2, -0.3]}>
          <sphereGeometry args={[2.2, 32, 32]} />
          <meshBasicMaterial
            color="#8A2BE2"
            transparent
            opacity={0.06}
            side={THREE.BackSide}
          />
        </mesh>
        
        {/* Glossy glass bottle body */}
        <mesh ref={bottleRef} position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.7, 0.8, 2.8, 32]} />
          <meshPhysicalMaterial
            color="#1a1a2e"
            metalness={0.1}
            roughness={0.05}
            transparent
            opacity={0.7}
            transmission={0.6}
            thickness={0.5}
            envMapIntensity={1}
          />
        </mesh>
        
        {/* Bottle bottom curve */}
        <mesh position={[0, -1.7, 0]}>
          <sphereGeometry args={[0.8, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial
            color="#1a1a2e"
            metalness={0.1}
            roughness={0.05}
            transparent
            opacity={0.7}
            transmission={0.6}
            thickness={0.5}
          />
        </mesh>
        
        {/* Product label on front - using uploaded image */}
        <mesh position={[0, -0.1, 0.75]}>
          <planeGeometry args={[1.4, 2.2]} />
          <meshStandardMaterial
            map={texture}
            transparent
            alphaTest={0.1}
            emissive="#00BFFF"
            emissiveIntensity={0.1}
            metalness={0.2}
            roughness={0.3}
          />
        </mesh>
        
        {/* Label back glow */}
        <mesh position={[0, -0.1, 0.7]}>
          <planeGeometry args={[1.5, 2.3]} />
          <meshBasicMaterial
            color="#00BFFF"
            transparent
            opacity={0.1}
          />
        </mesh>
        
        {/* Metallic cap/neck */}
        <mesh position={[0, 1.3, 0]}>
          <cylinderGeometry args={[0.35, 0.45, 0.5, 32]} />
          <meshStandardMaterial
            color="#B8860B"
            metalness={0.9}
            roughness={0.2}
            emissive="#B8860B"
            emissiveIntensity={0.1}
          />
        </mesh>
        
        {/* Dropper rubber top */}
        <mesh position={[0, 1.8, 0]}>
          <sphereGeometry args={[0.35, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.3}
            roughness={0.8}
          />
        </mesh>
        
        {/* Dropper squeeze bulb */}
        <mesh position={[0, 2.1, 0]}>
          <sphereGeometry args={[0.28, 32, 32]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.2}
            roughness={0.9}
          />
        </mesh>
        
        {/* Glass dropper tube inside */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 2, 16]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.3}
            metalness={0}
            roughness={0}
            transmission={0.9}
          />
        </mesh>
        
        {/* Glowing ring around bottle - mysterious effect */}
        <mesh position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.1, 0.02, 16, 100]} />
          <meshBasicMaterial color="#00BFFF" transparent opacity={0.6} />
        </mesh>
        
        {/* Second ring - offset for depth */}
        <mesh position={[0, -1, 0]} rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[1, 0.015, 16, 100]} />
          <meshBasicMaterial color="#8A2BE2" transparent opacity={0.4} />
        </mesh>

        {/* Top highlight ring */}
        <mesh position={[0, 1, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.5, 0.01, 16, 100]} />
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
      <Sphere args={[0.12, 32, 32]} position={[2, 1.2, 0.5]}>
        <MeshDistortMaterial
          color="#00BFFF"
          attach="material"
          distort={0.6}
          speed={3}
          transparent
          opacity={0.7}
        />
      </Sphere>
      <Sphere args={[0.08, 32, 32]} position={[-1.8, -0.3, 0.8]}>
        <MeshDistortMaterial
          color="#8A2BE2"
          attach="material"
          distort={0.4}
          speed={4}
          transparent
          opacity={0.6}
        />
      </Sphere>
      <Sphere args={[0.1, 32, 32]} position={[1.4, -1.2, -0.3]}>
        <MeshDistortMaterial
          color="#00BFFF"
          attach="material"
          distort={0.5}
          speed={2.5}
          transparent
          opacity={0.5}
        />
      </Sphere>
      <Sphere args={[0.06, 32, 32]} position={[-1.4, 1.2, -0.5]}>
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
      <Sphere args={[0.04, 16, 16]} position={[0.9, 0.6, 1.2]}>
        <meshBasicMaterial color="#00BFFF" transparent opacity={0.8} />
      </Sphere>
      <Sphere args={[0.03, 16, 16]} position={[-0.7, -1, 0.9]}>
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
          
          <DropperBottle />
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
          
          {/* Interactive drag-to-spin control */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
