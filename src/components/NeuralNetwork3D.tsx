import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface MousePosition {
  x: number;
  y: number;
}

function InteractiveBrain({ mousePosition }: { mousePosition: MousePosition }) {
  const brainRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const innerGlowRef = useRef<THREE.Points>(null);
  
  const { positions, connections, synapsePositions } = useMemo(() => {
    const nodeCount = 200;
    const pos = new Float32Array(nodeCount * 3);
    const conn: number[] = [];
    const synapse = new Float32Array(80 * 3);
    
    // Create nodes in a brain-like ellipsoid shape
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      // Brain-like asymmetric shape
      const rx = 2.2 + Math.random() * 0.8;
      const ry = 1.8 + Math.random() * 0.6;
      const rz = 2.0 + Math.random() * 0.7;
      
      pos[i * 3] = rx * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = ry * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = rz * Math.cos(phi);
    }
    
    // Create neural connections between nearby nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (dist < 1.0 && Math.random() > 0.6) {
          conn.push(
            pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
            pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
          );
        }
      }
    }
    
    // Glowing synapses (bright points)
    for (let i = 0; i < 80; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 1.2;
      
      synapse[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      synapse[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.8;
      synapse[i * 3 + 2] = r * Math.cos(phi);
    }
    
    return { 
      positions: pos, 
      connections: new Float32Array(conn),
      synapsePositions: synapse
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (brainRef.current) {
      // Gentle continuous rotation
      brainRef.current.rotation.y = time * 0.08;
      brainRef.current.rotation.x = Math.sin(time * 0.15) * 0.1;
      
      // Interactive mouse response - tilt toward cursor
      const targetRotationX = mousePosition.y * 0.3;
      const targetRotationZ = -mousePosition.x * 0.2;
      
      brainRef.current.rotation.x += (targetRotationX - brainRef.current.rotation.x) * 0.05;
      brainRef.current.rotation.z += (targetRotationZ - brainRef.current.rotation.z) * 0.05;
      
      // Subtle zoom effect based on mouse proximity to center
      const mouseDistance = Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2);
      const targetScale = 1 + (1 - Math.min(mouseDistance, 1)) * 0.1;
      brainRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
    }
    
    // Pulsing glow effect on synapses
    if (innerGlowRef.current) {
      const material = innerGlowRef.current.material as THREE.PointsMaterial;
      material.size = 0.12 + Math.sin(time * 3) * 0.03;
      material.opacity = 0.7 + Math.sin(time * 2) * 0.2;
    }
    
    // Animate neural pathway opacity
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.25 + Math.sin(time * 1.5) * 0.1;
    }
  });

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(connections, 3));
    return geometry;
  }, [connections]);

  return (
    <group ref={brainRef}>
      {/* Main neural nodes */}
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00BFFF"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.8}
        />
      </Points>
      
      {/* Glowing synapses - brighter accent points */}
      <Points ref={innerGlowRef} positions={synapsePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.12}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.9}
        />
      </Points>
      
      {/* Purple accent synapses */}
      <Points positions={synapsePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8A2BE2"
          size={0.18}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.4}
        />
      </Points>
      
      {/* Neural pathways (connections) */}
      <lineSegments ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#00BFFF"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      
      {/* Purple pathway overlay */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#8A2BE2"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

function FloatingParticles({ mousePosition }: { mousePosition: MousePosition }) {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = mousePosition.y * 0.1;
      
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < 600; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.002;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00BFFF"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.5}
      />
    </Points>
  );
}

function NeuralGlow() {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05);
      const material = ref.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.08 + Math.sin(state.clock.elapsedTime) * 0.03;
    }
  });

  return (
    <>
      <mesh ref={ref}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial
          color="#00BFFF"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshBasicMaterial
          color="#8A2BE2"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
}

function Scene({ mousePosition }: { mousePosition: MousePosition }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#00BFFF" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#8A2BE2" />
      <pointLight position={[0, 0, 5]} intensity={0.3} color="#ffffff" />
      
      <NeuralGlow />
      <InteractiveBrain mousePosition={mousePosition} />
      <FloatingParticles mousePosition={mousePosition} />
    </>
  );
}

export default function NeuralNetwork3D() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        setMousePosition({ x, y });
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (containerRef.current && event.touches[0]) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((event.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.touches[0].clientY - rect.top) / rect.height) * 2 + 1;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}