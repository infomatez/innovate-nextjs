import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useEffect, useRef } from 'react';
import CanvasLoader from './CanvasLoader';

const Earth = () => {
  const earth = useGLTF('/planet/scene.gltf');

  return <primitive object={earth.scene} scale={3.5} position-y={0} rotation-y={0} />;
};

const EarthCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const { clientWidth, clientHeight } = canvas.parentElement;
        canvas.style.width = `${clientWidth}px`;
        canvas.style.height = `${clientHeight}px`;
        canvas.width = clientWidth;
        canvas.height = clientHeight;
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    } 
    handleResize();


    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return (
    <Canvas
      ref={canvasRef}
      shadows
      //   onCreated={({ gl }) => {
      //     gl.setClearColor('#000000'); // Set background color if needed
      //   }}
      className="canvas-main-area"
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls autoRotate enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
        <Earth canvasRef />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
