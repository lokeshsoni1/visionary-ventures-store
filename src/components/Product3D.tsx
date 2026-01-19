import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import productLabel from '@/assets/product-label.png';

function DropperBottle() {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const liquidRef = useRef<THREE.Mesh>(null);
  
  // Load the product label texture
  const labelTexture = useLoader(TextureLoader, productLabel);
  
  // Configure texture for proper display
  labelTexture.wrapS = THREE.ClampToEdgeWrapping;
  labelTexture.wrapT = THREE.ClampToEdgeWrapping;
  labelTexture.flipY = true;
  labelTexture.colorSpace = THREE.SRGBColorSpace;
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (groupRef.current) {
      // Continuous slow 360° rotation
      groupRef.current.rotation.y += 0.004;
    }
    
    if (glowRef.current) {
      // Pulsing aura effect
      glowRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.08);
      const material = glowRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.1 + Math.sin(time * 1.5) * 0.04;
    }
    
    // Subtle liquid shimmer
    if (liquidRef.current) {
      liquidRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.8}>
      <group ref={groupRef}>
        {/* Outer mysterious glow aura */}
        <mesh ref={glowRef} position={[0, 0, -0.5]}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshBasicMaterial
            color="#00BFFF"
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </mesh>
        
        {/* Secondary purple aura */}
        <mesh position={[0, 0.2, -0.3]}>
          <sphereGeometry args={[2.8, 32, 32]} />
          <meshBasicMaterial
            color="#8A2BE2"
            transparent
            opacity={0.06}
            side={THREE.BackSide}
          />
        </mesh>
        
        {/* Main bottle body - glossy dark glass */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.75, 0.85, 3.2, 64]} />
          <meshPhysicalMaterial
            color="#0a1628"
            metalness={0.15}
            roughness={0.02}
            transparent
            opacity={0.85}
            transmission={0.4}
            thickness={1}
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </mesh>
        
        {/* White label wrap around bottle */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.78, 0.88, 2.4, 64]} />
          <meshStandardMaterial
            color="#f8f8f8"
            metalness={0}
            roughness={0.3}
            emissive="#ffffff"
            emissiveIntensity={0.05}
          />
        </mesh>
        
        {/* Front product label with uploaded image */}
        <mesh position={[0, -0.1, 0.82]} rotation={[0, 0, 0]}>
          <planeGeometry args={[1.5, 2.3]} />
          <meshStandardMaterial
            map={labelTexture}
            transparent
            alphaTest={0.01}
            side={THREE.FrontSide}
            emissive="#ffffff"
            emissiveIntensity={0.08}
            metalness={0.1}
            roughness={0.4}
          />
        </mesh>
        
        {/* Label glow behind */}
        <mesh position={[0, -0.1, 0.78]}>
          <planeGeometry args={[1.6, 2.4]} />
          <meshBasicMaterial
            color="#00BFFF"
            transparent
            opacity={0.08}
          />
        </mesh>
        
        {/* Bottle bottom curve */}
        <mesh position={[0, -1.8, 0]}>
          <sphereGeometry args={[0.85, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial
            color="#0a1628"
            metalness={0.15}
            roughness={0.02}
            transparent
            opacity={0.85}
            transmission={0.4}
            thickness={1}
            clearcoat={1}
          />
        </mesh>
        
        {/* Liquid inside bottle */}
        <mesh ref={liquidRef} position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.6, 0.65, 2, 32]} />
          <meshPhysicalMaterial
            color="#2a1f4a"
            metalness={0.3}
            roughness={0.1}
            transparent
            opacity={0.6}
            transmission={0.8}
            thickness={0.5}
          />
        </mesh>
        
        {/* Subtle bubbles in liquid */}
        <Sphere args={[0.04, 16, 16]} position={[0.2, -0.8, 0.1]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
        </Sphere>
        <Sphere args={[0.03, 16, 16]} position={[-0.15, -0.4, 0.2]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </Sphere>
        <Sphere args={[0.025, 16, 16]} position={[0.1, -0.1, -0.15]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.35} />
        </Sphere>
        
        {/* Bottle neck */}
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.35, 0.5, 0.6, 32]} />
          <meshPhysicalMaterial
            color="#0a1628"
            metalness={0.15}
            roughness={0.02}
            transparent
            opacity={0.9}
            clearcoat={1}
          />
        </mesh>
        
        {/* Metallic gold cap/collar */}
        <mesh position={[0, 1.85, 0]}>
          <cylinderGeometry args={[0.38, 0.42, 0.4, 32]} />
          <meshStandardMaterial
            color="#C9A227"
            metalness={0.95}
            roughness={0.15}
            envMapIntensity={1.5}
          />
        </mesh>
        
        {/* Dropper rubber bulb base */}
        <mesh position={[0, 2.15, 0]}>
          <cylinderGeometry args={[0.32, 0.35, 0.3, 32]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.1}
            roughness={0.9}
          />
        </mesh>
        
        {/* Dropper squeeze bulb */}
        <mesh position={[0, 2.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#0f0f0f"
            metalness={0.05}
            roughness={0.95}
          />
        </mesh>
        
        {/* Glass dropper tube */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 2.2, 16]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.25}
            metalness={0}
            roughness={0}
            transmission={0.95}
          />
        </mesh>
        
        {/* Glowing energy ring - mystery effect */}
        <mesh position={[0, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.025, 16, 100]} />
          <meshBasicMaterial color="#00BFFF" transparent opacity={0.7} />
        </mesh>
        
        {/* Second energy ring */}
        <mesh position={[0, -1.2, 0]} rotation={[Math.PI / 2.3, 0, 0]}>
          <torusGeometry args={[1.1, 0.02, 16, 100]} />
          <meshBasicMaterial color="#8A2BE2" transparent opacity={0.5} />
        </mesh>

        {/* Top highlight ring */}
        <mesh position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.55, 0.015, 16, 100]} />
          <meshBasicMaterial color="#00BFFF" transparent opacity={0.6} />
        </mesh>
        
        {/* Reflective highlights on bottle */}
        <mesh position={[0.5, 0, 0.5]} rotation={[0, -0.8, 0]}>
          <planeGeometry args={[0.1, 2.5]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
        </mesh>
      </group>
    </Float>
  );
}

function GlowOrbs() {
  return (
    <>
      {/* Mysterious floating orbs */}
      <Sphere args={[0.15, 32, 32]} position={[2.2, 1.4, 0.5]}>
        <MeshDistortMaterial
          color="#00BFFF"
          attach="material"
          distort={0.5}
          speed={3}
          transparent
          opacity={0.7}
        />
      </Sphere>
      <Sphere args={[0.1, 32, 32]} position={[-2, -0.5, 0.8]}>
        <MeshDistortMaterial
          color="#8A2BE2"
          attach="material"
          distort={0.4}
          speed={4}
          transparent
          opacity={0.6}
        />
      </Sphere>
      <Sphere args={[0.12, 32, 32]} position={[1.6, -1.5, -0.3]}>
        <MeshDistortMaterial
          color="#00BFFF"
          attach="material"
          distort={0.45}
          speed={2.5}
          transparent
          opacity={0.5}
        />
      </Sphere>
      <Sphere args={[0.08, 32, 32]} position={[-1.6, 1.5, -0.5]}>
        <MeshDistortMaterial
          color="#8A2BE2"
          attach="material"
          distort={0.35}
          speed={3.5}
          transparent
          opacity={0.55}
        />
      </Sphere>
      {/* Small energy particles */}
      <Sphere args={[0.04, 16, 16]} position={[1.1, 0.8, 1.3]}>
        <meshBasicMaterial color="#00BFFF" transparent opacity={0.9} />
      </Sphere>
      <Sphere args={[0.035, 16, 16]} position={[-0.9, -1.2, 1.1]}>
        <meshBasicMaterial color="#8A2BE2" transparent opacity={0.8} />
      </Sphere>
      <Sphere args={[0.03, 16, 16]} position={[0.5, 1.8, 0.8]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
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
    <div className="w-full h-[550px] md:h-[650px]">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.5} />
          <spotLight
            position={[6, 6, 6]}
            angle={0.25}
            penumbra={1}
            intensity={3}
            color="#ffffff"
            castShadow
          />
          <spotLight
            position={[-6, 4, 6]}
            angle={0.3}
            penumbra={1}
            intensity={2}
            color="#00BFFF"
          />
          <spotLight
            position={[0, -4, 4]}
            angle={0.4}
            penumbra={1}
            intensity={1.5}
            color="#8A2BE2"
          />
          <pointLight position={[0, 3, 3]} intensity={1} color="#ffffff" />
          <pointLight position={[3, 0, 3]} intensity={0.6} color="#00BFFF" />
          
          <DropperBottle />
          <GlowOrbs />
          
          <ContactShadows
            position={[0, -3, 0]}
            opacity={0.5}
            scale={14}
            blur={3}
            far={5}
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
            rotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}