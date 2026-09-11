import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useAnimations, useGLTF, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/runner.glb";

const TARGET_HEIGHT = 1.7;

function Runner() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(MODEL_URL);
  const { cloned, scale, yOffset } = useMemo(() => {
    const s = scene.clone(true);
    s.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = true;
        m.receiveShadow = true;
      }
    });
    s.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(s);
    const size = new THREE.Vector3();
    box.getSize(size);
    const k = size.y > 0 ? TARGET_HEIGHT / size.y : 1;
    return { cloned: s, scale: k, yOffset: -box.min.y * k };
  }, [scene]);
  const { actions } = useAnimations(animations, group);

  useFrame((state) => {
    const action =
      actions["sprint"] ?? actions["run"] ?? actions["walk"] ?? Object.values(actions)[0];
    if (action && !action.isRunning()) {
      action.reset().setEffectiveTimeScale(1.35).fadeIn(0.3).play();
    }
    if (group.current) {
      group.current.position.y = 0.16 + yOffset + Math.sin(state.clock.elapsedTime * 9) * 0.02;
    }
  });

  return (
    <group
      ref={group}
      position={[0, 0.16 + yOffset, -0.1]}
      rotation={[0, Math.PI, 0]}
      scale={scale}
    >
      <primitive object={cloned} />
    </group>
  );
}

function Treadmill() {
  const beltRef = useRef<THREE.Mesh>(null);

  const beltTexture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 64;
    c.height = 128;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#0d0d0f";
    ctx.fillRect(0, 0, 64, 128);
    ctx.fillStyle = "#1c1c21";
    for (let y = 0; y < 128; y += 8) ctx.fillRect(0, y, 64, 3);
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 4);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame((_, delta) => {
    beltTexture.offset.y -= delta * 1.6;
  });

  const dark = "#131317";
  const metal = "#2a2a31";

  return (
    <group>
      {/* deck base */}
      <mesh position={[0, 0.07, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.15, 0.14, 2.5]} />
        <meshStandardMaterial color={dark} metalness={0.6} roughness={0.45} />
      </mesh>
      {/* belt */}
      <mesh ref={beltRef} position={[0, 0.145, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[0.85, 2.3]} />
        <meshStandardMaterial map={beltTexture} roughness={0.9} metalness={0.1} />
      </mesh>
      {/* side rails */}
      {[-0.52, 0.52].map((x) => (
        <mesh key={x} position={[x, 0.17, 0]} castShadow>
          <boxGeometry args={[0.16, 0.07, 2.5]} />
          <meshStandardMaterial color={metal} metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      {/* uprights */}
      {[-0.5, 0.5].map((x) => (
        <mesh key={x} position={[x, 0.75, -1.05]} rotation={[0.16, 0, 0]} castShadow>
          <boxGeometry args={[0.09, 1.35, 0.09]} />
          <meshStandardMaterial color={metal} metalness={0.85} roughness={0.25} />
        </mesh>
      ))}
      {/* handlebar */}
      <mesh position={[0, 1.0, -0.78]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.045, 0.045, 1.05, 16]} />
        <meshStandardMaterial color="#3a3a42" metalness={0.9} roughness={0.2} />
      </mesh>
      {[-0.52, 0.52].map((x) => (
        <mesh key={x} position={[x, 0.98, -0.62]} rotation={[Math.PI / 2 - 0.35, 0, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.42, 12]} />
          <meshStandardMaterial color="#b3261e" metalness={0.4} roughness={0.5} />
        </mesh>
      ))}
      {/* console */}
      <group position={[0, 1.42, -1.18]} rotation={[0.45, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.05, 0.62, 0.09]} />
          <meshStandardMaterial color="#17171c" metalness={0.7} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.05, 0.055]}>
          <planeGeometry args={[0.8, 0.36]} />
          <meshStandardMaterial color="#e0332a" emissive="#e0332a" emissiveIntensity={1.6} toneMapped={false} />
        </mesh>
        {[-0.28, 0, 0.28].map((x) => (
          <mesh key={x} position={[x, -0.22, 0.055]}>
            <planeGeometry args={[0.18, 0.07]} />
            <meshStandardMaterial color="#5a5a63" />
          </mesh>
        ))}
      </group>
      {/* rear motor cover */}
      <mesh position={[0, 0.2, 1.24]} castShadow>
        <boxGeometry args={[1.15, 0.26, 0.35]} />
        <meshStandardMaterial color="#1c1c22" metalness={0.7} roughness={0.4} />
      </mesh>
    </group>
  );
}

function Rig() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = -0.25 + Math.sin(t * 0.25) * 0.18;
  });
  return (
    <group ref={group} position={[0, -1.15, 0]}>
      <Treadmill />
      <Runner />
      <ContactShadows position={[0, 0.01, 0]} opacity={0.6} scale={7} blur={2.6} far={4} />
    </group>
  );
}

export default function HeroTreadmill() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [4.5, 1.45, -1.7], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.6}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-3, 1.5, -2]} intensity={18} color="#ff3b30" distance={12} />
      <pointLight position={[2.5, 0.8, 2.5]} intensity={8} color="#8fb6ff" distance={12} />
      <Suspense fallback={null}>
        <Rig />
        <Environment>
          <Lightformer intensity={2.2} position={[0, 5, 1]} scale={[8, 8, 1]} />
          <Lightformer
            intensity={1.4}
            color="#ff4d3d"
            position={[-5, 1, -1]}
            rotation-y={Math.PI / 2}
            scale={[14, 2, 1]}
          />
          <Lightformer
            intensity={0.8}
            color="#9db8ff"
            position={[5, 2, 1]}
            rotation-y={-Math.PI / 2}
            scale={[14, 2, 1]}
          />
        </Environment>
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);
