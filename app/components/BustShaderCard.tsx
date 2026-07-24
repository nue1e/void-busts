'use client';

import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
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
  uniform float uHoverState;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Create a glitch/liquid wave effect based on hover state and time
    float wave = sin(uv.y * 20.0 + uTime * 5.0) * 0.02 * uHoverState;
    uv.x += wave;
    uv.y += wave;

    vec4 color = texture2D(uTexture, uv);
    
    // Add a slight RGB shift for that cryptographic feel
    float r = texture2D(uTexture, uv + vec2(0.01 * uHoverState, 0.0)).r;
    float b = texture2D(uTexture, uv - vec2(0.01 * uHoverState, 0.0)).b;
    
    gl_FragColor = vec4(r, color.g, b, color.a);
  }
`;

export default function BustShaderCard({ imageUrl }: { imageUrl: string }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Load the image into WebGL
  const texture = useTexture(imageUrl);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (materialRef.current) {
      // Pass the passage of time into the shader for the wave animation
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Smoothly interpolate the hover state (0.0 to 1.0)
      materialRef.current.uniforms.uHoverState.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHoverState.value,
        hovered ? 1.0 : 0.0,
        0.1
      );
    }
  });

  return (
    <mesh
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[2.5, 2.5, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTexture: { value: texture },
          uHoverState: { value: 0.0 },
          uTime: { value: 0.0 },
        }}
        transparent={true}
      />
    </mesh>
  );
}