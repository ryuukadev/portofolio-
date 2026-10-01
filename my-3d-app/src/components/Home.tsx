import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  RoundedBox,
  Text,
  Environment,
  ContactShadows,
  Float,
} from "@react-three/drei";
import { useEffect } from 'react';
import './Home.css';

function Chip() {
  return (
    <RoundedBox
      args={[0.56, 0.42, 0.02]}
      radius={0.04}
      smoothness={4}
      position={[-1.4, 0.16, 0.07]}
    >
      <meshStandardMaterial color="#e8c36a" metalness={0.85} roughness={0.3} />
    </RoundedBox>
  );
}

function CardFace() {
  return (
    <group>
      {/* base kartu - scaled up ~1.33x */}
      <RoundedBox args={[4.5, 2.7, 0.1]} radius={0.22} smoothness={8}>
        <meshPhysicalMaterial
          color="#0f1115"
          roughness={0.35}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.18}
          emissive="#1a1a22"
          emissiveIntensity={0.15}
        />
      </RoundedBox>

      {/* garis aksen atas */}
      <mesh position={[0, 1.08, 0.055]}>
        <planeGeometry args={[4.5, 0.05]} />
        <meshStandardMaterial
          color="#aa3bff"
          emissive="#aa3bff"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* chip */}
      <Chip />
      <mesh position={[-1.4, 0.16, 0.078]}>
        <planeGeometry args={[0.35, 0.02]} />
        <meshStandardMaterial color="#c9a84c" />
      </mesh>
      <mesh position={[-1.4, 0.16, 0.078]} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[0.3, 0.02]} />
        <meshStandardMaterial color="#c9a84c" />
      </mesh>

      {/* TEXT */}
      <Text
        position={[-2.1, 0.82, 0.055]}
        fontSize={0.15}
        color="#9aa0b2"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.14}
      >
        PORTFOLIO — 2026
      </Text>

      <Text
        position={[-2.1, -0.24, 0.055]}
        fontSize={0.32}
        color="white"
        anchorX="left"
        anchorY="middle"
        fontWeight={700}
        letterSpacing={-0.03}
      >
        CLAUDE.DEV
      </Text>

      <Text
        position={[-2.1, -0.58, 0.055]}
        fontSize={0.15}
        color="#9aa0b2"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.06}
      >
        CREATIVE DEVELOPER • 3D / WEB
      </Text>

      <Text
        position={[2.1, -1.03, 0.055]}
        fontSize={0.12}
        color="#6b7280"
        anchorX="right"
        anchorY="middle"
        letterSpacing={0.08}
      >
        HOVER • DRAG TO ROTATE
      </Text>

      {/* bulatan dekor kanan atas */}
      <mesh position={[1.4, 0.63, 0.055]}>
        <circleGeometry args={[0.24, 32]} />
        <meshStandardMaterial
          color="#ff3b6e"
          emissive="#ff3b6e"
          emissiveIntensity={0.6}
          transparent
          opacity={0.95}
        />
      </mesh>
      <mesh position={[1.76, 0.63, 0.054]}>
        <circleGeometry args={[0.24, 32]} />
        <meshStandardMaterial
          color="#ffca3a"
          emissive="#ffca3a"
          emissiveIntensity={0.45}
          transparent
          opacity={0.95}
        />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 4, 6]} intensity={1.8} castShadow />
      <directionalLight position={[-4, -2, -3]} intensity={0.6} color="#aa3bff" />

      <Float
        speed={1.6}
        rotationIntensity={0.18}
        floatIntensity={0.35}
        floatingRange={[-0.08, 0.08]}
      >
        <group rotation={[0.18, -0.35, 0]}>
          <CardFace />
        </group>
      </Float>

      <ContactShadows
        position={[0, -1.25, 0]}
        opacity={0.55}
        scale={7}
        blur={2.6}
        far={2.2}
      />

      <Environment preset="city" />
    </>
  );
}

export const Home: React.FC = () => {
  useEffect(() => {
    // Trigger hero entrance animation
    const timer = setTimeout(() => {
      document.body.classList.add('home-loaded');
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-wrap">
      <Canvas
        shadows
        camera={{ position: [0, 0.15, 5.5], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI / 1.85}
          minAzimuthAngle={-0.7}
          maxAzimuthAngle={0.7}
          rotateSpeed={0.55}
          dampingFactor={0.08}
          enableDamping
        />
      </Canvas>

      <div className="overlay">
        <p className="eyebrow">MY 3D APP — INTERACTIVE CARD</p>
        <h1>
          Kartu 3D <span>Premium</span>
        </h1>
        <p className="desc">
          Drag untuk rotasi · scroll hint dimatikan biar fokus ke interaksi. Dibuat
          dengan <code>RoundedBox</code> + <code>meshPhysicalMaterial</code> +{" "}
          <code>Float</code> + <code>Environment</code>.
        </p>
      </div>

      <div className="hint">◯ drag · auto float</div>
    </div>
  );
};