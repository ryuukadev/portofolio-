// @ts-nocheck
/* eslint-disable react/no-unknown-property */
"use client";
import { Suspense, useEffect, useMemo, useRef, useState, Component, ReactNode } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox, useGLTF, useTexture } from "@react-three/drei";
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import "./Lanyard.css";

extend({ MeshLineGeometry, MeshLineMaterial } as any);

const BLANK_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };
const CARD_GLB = "/lanyard/card.glb";
const LANYARD_PNG = "/lanyard/lanyard.png";

class Boundary extends Component<{ children: ReactNode; fallback: ReactNode }, { err: boolean }> {
  state = { err: false };
  static getDerivedStateFromError() { return { err: true }; }
  render() { return this.state.err ? this.props.fallback : this.props.children; }
}

// guard: pastikan vektor valid (finite) sebelum dipakai untuk geometry.
// CatmullRomCurve3 chordal membagi dengan jarak antar titik, jadi satu titik
// NaN/duplikat saja membuat getPoints() -> NaN -> computeBoundingSphere error.
const isFiniteVec3 = (v: any) =>
  !!v && Number.isFinite(v?.x) && Number.isFinite(v?.y) && Number.isFinite(v?.z);

const safeTranslation = (ref: any) => {
  try {
    const t = ref?.current?.translation?.();
    return isFiniteVec3(t) ? t : null;
  } catch {
    return null;
  }
};

// fallback card tanpa glb — premium, tali nyambung, gede
function BandFallback({
  isMobile = false,
  frontImage = null as string | null,
  lanyardImage = null as string | null,
  lanyardWidth = 1.4,
  maxSpeed = 50,
  minSpeed = 0,
  isLoaded = false,
}: any) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);
  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  // batas drag fallback — LUAS BANGET biar nggak hilang saat ditarik jauh
  const dragLimit = useMemo(() => ({ x: 25, y: 20, z: 15 }), []);
  const seg: any = { type: "dynamic", canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const bandTex = useTexture(lanyardImage || BLANK_PIXEL);
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  useEffect(() => { [bandTex, frontTex].forEach((t: any) => { if (t) { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; } }); }, [bandTex, frontTex]);
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);
  useRopeJoint(fixed as any, j1 as any, [[0, 0, 0], [0, 0, 0], 1] as any);
  useRopeJoint(j1 as any, j2 as any, [[0, 0, 0], [0, 0, 0], 1] as any);
  useRopeJoint(j2 as any, j3 as any, [[0, 0, 0], [0, 0, 0], 1] as any);
  useSphericalJoint(j3 as any, card as any, [[0, 0, 0], [0, 1.5, 0]] as any);
  useEffect(() => { if (hovered) { document.body.style.cursor = dragged ? "grabbing" : "grab"; return () => { document.body.style.cursor = "auto"; }; } }, [hovered, dragged]);

  // animasi jatuh dari atas saat load
  useFrame((state, delta) => {
    const dt = Math.min(delta || 0, 1 / 30);
    if (!isLoaded && card.current) {
      const t = safeTranslation(card);
      if (t) {
        const targetY = -1.5;
        const currentY = t.y;
        if (currentY > targetY) {
          card.current.setNextKinematicTranslation({
            x: t.x,
            y: currentY - dt * 8,
            z: t.z
          });
          [card, j1, j2, j3, fixed].forEach((r: any) => r.current?.wakeUp?.());
        }
      }
    }
    if (dragged && card.current) {
      const ct = safeTranslation(card);
      if (ct) {
        vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
        dir.copy(vec).sub(state.camera.position).normalize();
        if (isFiniteVec3(dir)) {
          vec.add(dir.multiplyScalar(state.camera.position.length()));
          if (isFiniteVec3(vec)) {
            const targetX = vec.x - dragged.x;
            const targetY = vec.y - dragged.y;
            const targetZ = vec.z - dragged.z;
            if (Number.isFinite(targetX) && Number.isFinite(targetY) && Number.isFinite(targetZ)) {
              // clamp supaya kartu tetap kelihatan saat di-drag
              const clampedX = Math.max(-dragLimit.x, Math.min(dragLimit.x, targetX));
              const clampedY = Math.max(-dragLimit.y, Math.min(dragLimit.y, targetY));
              const clampedZ = Math.max(-dragLimit.z, Math.min(dragLimit.z, targetZ));
              [card, j1, j2, j3, fixed].forEach((r: any) => r.current?.wakeUp?.());
              card.current.setNextKinematicTranslation({ x: clampedX, y: clampedY, z: clampedZ });
            }
          }
        }
      }
    }
    if (fixed.current && j1.current && j2.current && j3.current && band.current) {
      seedBandGeometry(band.current.geometry, isMobile ? 20 : 40);
      const t1 = safeTranslation(j1);
      const t2 = safeTranslation(j2);
      const t3 = safeTranslation(j3);
      const tf = safeTranslation(fixed);
      if (!t1 || !t2 || !t3 || !tf) return; // fisika belum siap -> skip frame, geometry seed tetap valid
      [j1, j2].forEach((r: any) => {
        const t = safeTranslation(r);
        if (!t) return;
        if (!isFiniteVec3(r.current.lerped)) r.current.lerped = new THREE.Vector3().copy(t);
        const d = Math.max(0.1, Math.min(1, r.current.lerped.distanceTo(t)));
        if (!Number.isFinite(d)) return;
        r.current.lerped.lerp(t, dt * (minSpeed + d * (maxSpeed - minSpeed)));
      });
      if (!isFiniteVec3(j1.current.lerped) || !isFiniteVec3(j2.current.lerped)) return;
      curve.points[0].copy(t3);
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(tf);
      const SEGMENTS = isMobile ? 20 : 40;
      updateBand(band.current, curve, SEGMENTS);
      if (card.current) {
        try {
          ang.copy(card.current.angvel()); rot.copy(card.current.rotation());
          if (isFiniteVec3(ang) && isFiniteVec3(rot)) card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
        } catch { /* abaikan */ }
      }
    }
  });
  (curve as any).curveType = "chordal";
  (bandTex as any).wrapS = (bandTex as any).wrapT = THREE.RepeatWrapping;
  // PERBESAR KARTU: SCALE 1.95 -> 2.3, GROUP_Y -1.12 -> -0.95 (naik biar foto kebawah)
  const W = 1.74, H = 2.44, SCALE = 2.3, GROUP_Y = -0.95;
  const CLAMP_Y = (1.5 - GROUP_Y) / SCALE + 0.02;
  return (
    <>
      <group position={[0, 2.5, 0]}>
        <RigidBody ref={fixed} {...seg} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...seg}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...seg}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...seg}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...seg} type={dragged ? "kinematicPosition" : "dynamic"}>
          <CuboidCollider args={[0.84, 1.2, 0.02]} />
          <group scale={SCALE} position={[0, GROUP_Y, -0.05]} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} onPointerUp={(e: any) => (e.target.releasePointerCapture(e.pointerId), drag(false))} onPointerDown={(e: any) => { const t = safeTranslation(card); if (!t || !isFiniteVec3(e.point)) return; e.target.setPointerCapture(e.pointerId); drag(new THREE.Vector3().copy(e.point).sub(t)); }}>
            <RoundedBox args={[W, H, 0.076]} radius={0.15} smoothness={8} castShadow receiveShadow>
              <meshPhysicalMaterial color="#fcfcfc" roughness={0.34} metalness={0.02} clearcoat={isMobile ? 0 : 1} clearcoatRoughness={0.16} />
            </RoundedBox>
            <mesh position={[0, 0.25, 0.041]}><planeGeometry args={[W - 0.13, H - 0.3]} /><meshBasicMaterial map={frontImage ? (frontTex as any) : undefined} color={frontImage ? "white" : "#0a0a0a"} transparent /></mesh>
            <mesh position={[0, 0.14, 0.04]}><planeGeometry args={[W - 0.11, H - 0.5]} /><meshBasicMaterial color="black" transparent opacity={0.05} side={THREE.DoubleSide} /></mesh>
            <mesh position={[0, 0, -0.041]} rotation={[0, Math.PI, 0]}><planeGeometry args={[W, H]} /><meshStandardMaterial color="#111113" roughness={0.9} /></mesh>
            <mesh position={[0, -0.8, 0.042]}><planeGeometry args={[W - 0.15, 0.28]} /><meshBasicMaterial color="#0a0a0a" /></mesh>
            <mesh position={[0, CLAMP_Y, 0.015]} castShadow><boxGeometry args={[0.64, 0.16, 0.095]} /><meshStandardMaterial color="#e8e8e8" metalness={0.92} roughness={0.18} /></mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band as any}><meshLineGeometry /><meshLineMaterial color={lanyardImage ? "white" : "#0f0f0f"} depthTest={false} resolution={isMobile ? [1000, 2000] : [1200, 1200]} useMap={!!lanyardImage} map={bandTex as any} repeat={[-4, 1]} lineWidth={lanyardWidth} /></mesh>
    </>
  );
}

export default function Lanyard({
  position = [0, 0, 30] as [number, number, number],
  gravity = [0, -40, 0] as [number, number, number],
  fov = 20,
  transparent = true,
  frontImage = null as string | null,
  backImage = null as string | null,
  imageFit = "cover" as "cover" | "contain",
  lanyardImage = null as string | null,
  lanyardWidth = 1,
}: any) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => { const onResize = () => setIsMobile(window.innerWidth < 768); window.addEventListener("resize", onResize); return () => window.removeEventListener("resize", onResize); }, []);
  useEffect(() => { const t = setTimeout(() => setIsLoaded(true), 300); return () => clearTimeout(t); }, []);
  const [webglFailed, setWebglFailed] = useState(false);
  useEffect(() => {
    const onError = (e: ErrorEvent) => {
      // three.js melempar via console.error juga — tangkap pesan NaN radius
      // supaya canvas rusak tidak bikin overlay error menutupi halaman.
      if (String((e as any)?.message || e).includes("Computed radius is NaN")) {
        e.preventDefault();
        setWebglFailed(true);
      }
    };
    window.addEventListener("error", onError);
    return () => window.removeEventListener("error", onError);
  }, []);
  if (webglFailed) return <div className="lanyard-wrapper" />;
  return (
    <div className="lanyard-wrapper">
      <Canvas camera={{ position, fov }} dpr={[1, isMobile ? 1.5 : 2]} gl={{ alpha: transparent, antialias: true, powerPreference: "high-performance", failIfMajorPerformanceCaveat: false }} onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)} style={{ background: "transparent" }} shadows frameloop="always" flat={false}>
        <ambientLight intensity={Math.PI} />
        <directionalLight position={[4, 6, 5]} intensity={1.15} castShadow />
        <directionalLight position={[-4, 3, 2]} intensity={0.55} color="#c7a7ff" />
        <Suspense fallback={null}>
          <Boundary
            fallback={
              <BandFallback isMobile={isMobile} frontImage={frontImage} lanyardImage={lanyardImage} lanyardWidth={Math.max(1.6, lanyardWidth * 1.6)} isLoaded={isLoaded} />
            }
          >
            <Physics gravity={gravity as any} timeStep={isMobile ? 1 / 30 : 1 / 60}>
              <Band isMobile={isMobile} frontImage={frontImage} backImage={backImage} imageFit={imageFit} lanyardImage={lanyardImage} lanyardWidth={lanyardWidth} isLoaded={isLoaded} />
            </Physics>
          </Boundary>
        </Suspense>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
        <ContactShadows position={[0, -2.2, 0]} opacity={0.28} scale={9} blur={2.6} far={3.2} color="#000000" />
      </Canvas>
    </div>
  );
}

// Pre-seed geometry dengan garis lurus valid supaya frame pertama tidak pernah
// memanggil setPoints dengan titik (0,0,0) yang berimpit.
function seedBandGeometry(geometry: any, segmentCount: number) {
  try {
    if (!geometry) return;
    const pos = geometry.attributes?.position;
    // MeshLineGeometry.setPoints pernah dipanggil dengan data valid -> biarkan.
    if (pos && pos.count > 0) {
      const arr = pos.array as ArrayLike<number>;
      let ok = true;
      for (let i = 0; i < Math.min(arr.length, 12); i++) {
        if (!Number.isFinite(arr[i])) { ok = false; break; }
      }
      if (ok) return;
    }
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= segmentCount; i++) {
      const t = i / segmentCount;
      pts.push(new THREE.Vector3(1.5 - t * 1.5, -t * 0.5, 0));
    }
    geometry.setPoints(pts);
  } catch { /* abaikan — frame berikutnya akan mencoba lagi */ }
}

function updateBand(band: any, curve: THREE.CatmullRomCurve3, segmentCount: number) {
  // chordal CatmullRom membagi dengan jarak antar titik — titik yang
  // berimpit (jarak ~0) menghasilkan NaN. Jaga jarak minimum.
  for (let i = 1; i < curve.points.length; i++) {
    if (curve.points[i].distanceToSquared(curve.points[i - 1]) < 1e-8) {
      curve.points[i].x += 1e-4 * i;
    }
  }
  const pts = curve.getPoints(segmentCount);
  if (!Array.isArray(pts) || pts.length === 0 || !pts.every(isFiniteVec3)) return; // skip frame korup
  if (!band?.geometry) return;
  try {
    band.geometry.setPoints(pts);
  } catch { /* abaikan satu frame korup */ }
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, frontImage = null as string | null, backImage = null as string | null, imageFit = "cover" as "cover" | "contain", lanyardImage = null as string | null, lanyardWidth = 1 }: any) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const segmentProps: any = { type: "dynamic", canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const { nodes, materials } = useGLTF(CARD_GLB) as any;
  const texture = useTexture(lanyardImage || LANYARD_PNG);
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  // batas drag supaya kartu tetap kelihatan — luasin area
  const dragLimit = useMemo(() => ({ x: 3.5, y: 2.8, z: 1.5 }), []);

  const cardMap = useMemo(() => {
    const baseMap = materials?.base?.map;
    if (!baseMap?.image) return baseMap;
    if (!frontImage && !backImage) return baseMap;
    const baseImg: HTMLImageElement = baseMap.image;
    if (!baseImg.width || !baseImg.height) return baseMap;
    const W = baseImg.width, H = baseImg.height;
    const canvas = document.createElement("canvas");
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return baseMap;
    ctx.drawImage(baseImg, 0, 0, W, H);
    const drawFitted = (img: HTMLImageElement, rect: typeof FRONT_UV_RECT) => {
      const rx = rect.x * W, ry = rect.y * H, rw = rect.w * W, rh = rect.h * H;
      const pick = imageFit === "contain" ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale, dh = img.height * scale;
      const dx = rx + (rw - dw) / 2, dy = ry + (rh - dh) / 2;
      ctx.save(); ctx.beginPath(); ctx.rect(rx, ry, rw, rh); ctx.clip(); ctx.drawImage(img, dx, dy, dw, dh); ctx.restore();
    };
    if (frontImage && (frontTex as any).image?.width) drawFitted((frontTex as any).image, FRONT_UV_RECT);
    if (backImage && (backTex as any).image?.width) drawFitted((backTex as any).image, BACK_UV_RECT);
    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace; composite.flipY = baseMap.flipY; composite.anisotropy = 16; composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials?.base?.map]);
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);
  useRopeJoint(fixed as any, j1 as any, [[0, 0, 0], [0, 0, 0], 1] as any);
  useRopeJoint(j1 as any, j2 as any, [[0, 0, 0], [0, 0, 0], 1] as any);
  useRopeJoint(j2 as any, j3 as any, [[0, 0, 0], [0, 0, 0], 1] as any);
  useSphericalJoint(j3 as any, card as any, [[0, 0, 0], [0, 1.5, 0]] as any);
  useEffect(() => { if (hovered) { document.body.style.cursor = dragged ? "grabbing" : "grab"; return () => { document.body.style.cursor = "auto"; }; } }, [hovered, dragged]);
  useFrame((state, delta) => {
    const dt = Math.min(delta || 0, 1 / 30);
    if (dragged) {
      const ct = safeTranslation(card);
      if (ct) {
        vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
        dir.copy(vec).sub(state.camera.position).normalize();
        if (isFiniteVec3(dir)) {
          vec.add(dir.multiplyScalar(state.camera.position.length()));
          if (isFiniteVec3(vec)) {
            const targetX = vec.x - dragged.x;
            const targetY = vec.y - dragged.y;
            const targetZ = vec.z - dragged.z;
            if (Number.isFinite(targetX) && Number.isFinite(targetY) && Number.isFinite(targetZ)) {
              // clamp supaya kartu tetap kelihatan saat di-drag
              const clampedX = Math.max(-dragLimit.x, Math.min(dragLimit.x, targetX));
              const clampedY = Math.max(-dragLimit.y, Math.min(dragLimit.y, targetY));
              const clampedZ = Math.max(-dragLimit.z, Math.min(dragLimit.z, targetZ));
              [card, j1, j2, j3, fixed].forEach((ref: any) => ref.current?.wakeUp?.());
              card.current?.setNextKinematicTranslation({ x: clampedX, y: clampedY, z: clampedZ });
            }
          }
        }
      }
    }
    if (fixed.current) {
      if (band.current) seedBandGeometry(band.current.geometry, isMobile ? 16 : 32);
      const t1 = j1.current ? safeTranslation(j1) : null;
      const t2 = j2.current ? safeTranslation(j2) : null;
      const t3 = j3.current ? safeTranslation(j3) : null;
      const tf = safeTranslation(fixed);
      const tc = card.current ? safeTranslation(card) : null;
      if (!t1 || !t2 || !t3 || !tf || !tc) return; // fisika belum siap -> skip frame, geometry seed tetap valid
      [j1, j2].forEach((ref: any) => {
        const t = safeTranslation(ref);
        if (!t) return;
        if (!isFiniteVec3(ref.current.lerped)) ref.current.lerped = new THREE.Vector3().copy(t);
        const d = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(t)));
        if (!Number.isFinite(d)) return;
        ref.current.lerped.lerp(t, dt * (minSpeed + d * (maxSpeed - minSpeed)));
      });
      if (!isFiniteVec3(j1.current?.lerped) || !isFiniteVec3(j2.current?.lerped)) return;
      curve.points[0].copy(t3);
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(tf);
      const SEGMENTS = isMobile ? 16 : 32;
      if (band.current && card.current) updateBand(band.current, curve, SEGMENTS);
      try {
        ang.copy(card.current.angvel()); rot.copy(card.current.rotation());
        if (isFiniteVec3(ang) && isFiniteVec3(rot)) card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
      } catch { /* abaikan */ }
    }
  });
  (curve as any).curveType = "chordal";
  (texture as any).wrapS = (texture as any).wrapT = THREE.RepeatWrapping;
  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? "kinematicPosition" : "dynamic"}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group scale={2.25} position={[0, -1.2, -0.05]} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} onPointerUp={(e: any) => (e.target.releasePointerCapture(e.pointerId), drag(false))} onPointerDown={(e: any) => { const t = safeTranslation(card); if (!t || !isFiniteVec3(e.point)) return; e.target.setPointerCapture(e.pointerId); drag(new THREE.Vector3().copy(e.point).sub(t)); }}>
            <mesh geometry={nodes.card.geometry}><meshPhysicalMaterial map={cardMap} map-anisotropy={16} clearcoat={isMobile ? 0 : 1} clearcoatRoughness={0.15} roughness={0.9} metalness={0.8} /></mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}><meshLineGeometry /><meshLineMaterial color="white" depthTest={false} resolution={isMobile ? [1000, 2000] : [1000, 1000]} useMap map={texture as any} repeat={[-4, 1]} lineWidth={lanyardWidth} /></mesh>
    </>
  );
}
useGLTF.preload(CARD_GLB);
