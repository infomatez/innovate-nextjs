'use client'

import { MeshDistortMaterial, OrbitControls, Sphere } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import CanvasLoader from './CanvasLoader';

export default function SphereEffect() {
  return (
    <Canvas>
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={1} />
      <directionalLight position={[3, 2, 1]} />
      <Suspense fallback={<CanvasLoader />}>
        <Sphere args={[1, 100, 200]} scale={2}>
          <MeshDistortMaterial color="#3d1c56" attach="material" distort={0.5} speed={2} />
        </Sphere>
      </Suspense>
    </Canvas>
  );
}
  