'use client';

import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uHover;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    float idleWaveX = sin(uv.y * 10.0 + uTime * 1.5) * 0.003;
    float idleWaveY = cos(uv.x * 10.0 + uTime * 1.5) * 0.003;
    vec2 idleDistortion = vec2(idleWaveX, idleWaveY);

    float dist = distance(uv, uMouse);
    float rippleArea = smoothstep(0.4, 0.0, dist) * uHover;
    float hoverWave = sin(dist * 30.0 - uTime * 4.0) * 0.015 * rippleArea;
    vec2 hoverDistortion = normalize(uv - uMouse) * hoverWave;
    
    vec2 distortedUv = uv + idleDistortion + hoverDistortion;
    
    vec4 tex = texture2D(uTexture, distortedUv);
    gl_FragColor = tex;
  }
`;

export default function LiquidLogo({ imageUrl }: { imageUrl: string }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(imageUrl);
  const [hovered, setHover] = useState(false);
  
  const mouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

  // useThree gives us the exact dimensions of the 3D viewport
  const { viewport } = useThree();

  // The base width of your logo is 10 units. 
  // We want to ensure it never takes up more than 90% of the screen width (0.9 padding).
  // Math.min(1, ...) ensures it doesn't scale UP larger than its original size on big desktops.
  const scaleFactor = Math.min(1, (viewport.width * 0.9) / 10);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        hovered ? 1.0 : 0.0,
        0.05
      );

      mouseRef.current.lerp(targetMouse.current, 0.1);
      materialRef.current.uniforms.uMouse.value = mouseRef.current;
    }
  });

  return (
    <mesh
      // We apply the dynamic scale here to the mesh. 
      // It perfectly shrinks the width and height together on smaller screens!
      scale={[scaleFactor, scaleFactor, 1]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onPointerMove={(e) => {
        if (e.uv) {
          targetMouse.current.set(e.uv.x, e.uv.y);
        }
      }}
    >
      {/* We keep the original desktop geometry size constant */}
      <planeGeometry args={[10, 1.2, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTexture: { value: texture },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uTime: { value: 0.0 },
          uHover: { value: 0.0 },
        }}
        transparent={true}
      />
    </mesh>
  );
}