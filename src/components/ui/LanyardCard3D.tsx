"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useTexture,
  Environment,
  ContactShadows,
  RoundedBox,
  PresentationControls,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

// ─── kartu ────────────────────────────────────────────────
function CardMesh({
  frontSrc = "/wahyu.png",
  auto = false,
  interactive = true,
}: {
  frontSrc?: string;
  auto?: boolean;
  interactive?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // texture foto — kalau gagal load, drei otomatis fallback
  const tex = useTexture(frontSrc);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

  useFrame((state, delta) => {
    if (!group.current) return;

    // auto mode: muter pelan kalau interactive mati atau auto=true dan lagi nggak di-hover/drag
    if (auto && !interactive) {
      const t = state.clock.elapsedTime;
      group.current.rotation.y += delta * 0.45;
      group.current.rotation.x = Math.sin(t * 0.45) * 0.12;
      group.current.rotation.z = Math.sin(t * 0.3) * 0.06;
      group.current.position.y = Math.sin(t * 0.85) * 0.18;
    } else if (auto && interactive && !hovered) {
      // auto tapi interactive: muter halus cuma kalau nggak di-hover
      group.current.rotation.y += delta * 0.22;
    }

    // hover scale — lerp halus
    const target = hovered ? 1.04 : 1;
    group.current.scale.lerp(
      new THREE.Vector3(target, target, target),
      0.12
    );
  });

  return (
    <group
      ref={group}
      onPointerEnter={() => {
        setHovered(true);
        document.body.style.cursor = interactive ? "grab" : "auto";
      }}
      onPointerLeave={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onPointerDown={() => {
        if (interactive) document.body.style.cursor = "grabbing";
      }}
      onPointerUp={() => {
        if (interactive) document.body.style.cursor = "grab";
      }}
    >
      {/* clamp / penjepit atas */}
      <mesh position={[0, 1.35, 0]}>
        <boxGeometry args={[0.45, 0.12, 0.06]} />
        <meshStandardMaterial color="#e5e5e5" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* lanyard strap — 2 tali */}
      <mesh position={[-0.14, 1.95, 0]} rotation={[0, 0, 0.18]}>
        <boxGeometry args={[0.08, 1.2, 0.02]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>
      <mesh position={[0.14, 1.95, 0]} rotation={[0, 0, -0.18]}>
        <boxGeometry args={[0.08, 1.2, 0.02]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>

      {/* kartu — RoundedBox */}
      <RoundedBox args={[1.75, 2.45, 0.08]} radius={0.12} smoothness={8}>
        <meshPhysicalMaterial
          color="white"
          roughness={0.35}
          metalness={0.05}
          clearcoat={0.6}
          clearcoatRoughness={0.25}
        />
      </RoundedBox>

      {/* foto depan */}
      <mesh position={[0, 0.18, 0.055]}>
        <planeGeometry args={[1.55, 1.55]} />
        <meshBasicMaterial map={tex} transparent side={THREE.FrontSide} />
      </mesh>
      {/* border foto halus */}
      <mesh position={[0, 0.18, 0.05]}>
        <planeGeometry args={[1.58, 1.58]} />
        <meshBasicMaterial
          color="black"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* strip hitam bawah — tempat teks HTML numpang, tapi kita kasih mesh juga biar realistic */}
      <group position={[0, -0.78, 0.055]}>
        <mesh position={[0, 0.14, 0]}>
          <planeGeometry args={[1.4, 0.22]} />
          <meshBasicMaterial color="#0a0a0a" />
        </mesh>
      </group>

      {/* back face */}
      <mesh position={[0, 0, -0.045]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.75, 2.45]} />
        <meshStandardMaterial color="#111111" roughness={0.8} />
      </mesh>
    </group>
  );
}

// ─── wrapper dipakai di Hero ─────────────────────────────
export function LanyardCard3D({
  auto = false,
  interactive = true,
  frontImage = "/wahyu.png",
  className = "",
}: {
  auto?: boolean;
  interactive?: boolean;
  frontImage?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative shrink-0 select-none ${className}`}
      style={{ width: 360, height: 420 }}
    >
      {/* glow */}
      <div className="absolute inset-0 -z-10 blur-[50px] opacity-20 scale-90 rounded-[40px] bg-white pointer-events-none" />

      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.6, 5.2], fov: 34 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 6, 5]} intensity={1.1} />
        <directionalLight position={[-4, 3, 2]} intensity={0.6} />
        <Environment preset="city" />

        <Suspense fallback={null}>
          {interactive ? (
            <PresentationControls
              global
              snap
              rotation={[0.1, 0, 0]}
              polar={[-0.35, 0.35]}
              azimuth={[-0.9, 0.9]}
            >
              <Float
                speed={1.2}
                rotationIntensity={0.15}
                floatIntensity={0.3}
                floatingRange={[-0.06, 0.06]}
              >
                <CardMesh
                  frontSrc={frontImage}
                  auto={auto}
                  interactive={interactive}
                />
              </Float>
            </PresentationControls>
          ) : (
            <Float
              speed={1.6}
              rotationIntensity={0.2}
              floatIntensity={0.35}
              floatingRange={[-0.08, 0.08]}
            >
              <CardMesh
                frontSrc={frontImage}
                auto={auto}
                interactive={false}
              />
            </Float>
          )}
        </Suspense>

        <ContactShadows
          position={[0, -1.75, 0]}
          opacity={0.28}
          scale={8}
          blur={2.4}
          far={3}
          color="#000000"
        />
      </Canvas>

      {/* label HTML — tajam */}
      <div className="pointer-events-none absolute bottom-[46px] left-1/2 -translate-x-1/2 w-[210px] text-center">
        <p className="text-[11px] font-black tracking-[0.18em] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
          I KADEK WAHYU A.P
        </p>
        <p className="text-[10px] font-bold tracking-[0.14em] text-white/70">
          11 RPL • FRONTEND DEV
        </p>
      </div>

      <p className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] tracking-widest font-bold text-white/30 whitespace-nowrap">
        {interactive ? "DRAG TO ROTATE • HOVER TO SCALE" : auto ? "AUTO MODE • HOVER TO PAUSE" : "DRAG TO ROTATE"}
      </p>
    </div>
  );
}

export default LanyardCard3D;
