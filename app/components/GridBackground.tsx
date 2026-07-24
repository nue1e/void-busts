'use client';

import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

const vertexShader = `
  varying vec2 vUv;
  uniform vec2 uScale;
  
  void main() {
    // We multiply the uv by uScale to fix the squishing and increase the size
    vUv = uv * uScale; 
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    // 1. INFINITE PANNING
    vec2 panningUv = vUv + vec2(uTime * 0.05, uTime * 0.03);
    
    // 2. MOUSE WARP
    float dist = distance(fract(vUv), uMouse);
    float warpEffect = smoothstep(0.6, 0.0, dist) * 0.05;
    vec2 mouseWarp = (fract(vUv) - uMouse) * warpEffect;

    vec2 finalUv = fract(panningUv + mouseWarp);
    vec4 texColor = texture2D(uTexture, finalUv);
    
    // 3. DIM THE VOID
    vec3 tint = vec3(0.25, 0.25, 0.25); 
    
    gl_FragColor = vec4(texColor.rgb * tint, 1.0);
  }
`;

export default function GridBackground() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  
  const texture = useTexture('/assets/grid_1111.png') as THREE.Texture;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const currentMouse = useRef(new THREE.Vector2(0.5, 0.5));

  // This calculates the correct scale to keep the grid perfectly square
  const scale = useMemo(() => {
    // ZOOM CONTROL: Decrease this number to make the arts LARGER. 
    // Increase it to make them smaller. (1.2 is a solid starting point)
    const zoomLevel = 1.2; 
    
    return new THREE.Vector2(
      (viewport.width / viewport.height) * zoomLevel, 
      1.0 * zoomLevel
    );
  }, [viewport.width, viewport.height]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      currentMouse.current.lerp(targetMouse.current, 0.05);
      materialRef.current.uniforms.uMouse.value = currentMouse.current;
    }
  });

  return (
    <mesh 
      position={[0, 0, -2]} 
      onPointerMove={(e) => {
        if (e.uv) {
          targetMouse.current.set(e.uv.x, e.uv.y);
        }
      }}
    >
      {/* Increased the geometry size slightly to ensure the corners don't clip while panning */}
      <planeGeometry args={[viewport.width * 2, viewport.height * 2, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTexture: { value: texture },
          uTime: { value: 0.0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uScale: { value: scale } // Passing our square aspect ratio fix to the shader
        }}
        depthWrite={false}
      />
    </mesh>
  );
}