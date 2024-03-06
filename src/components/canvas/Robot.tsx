import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../layout/Loader";

const Robots: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const robot = useGLTF("./biomech_1/Biomech_Mutant_Skin_1.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={8.5} groundColor="#473080 " />
      {/* <spotLight
        position={[-10, 0, 10]}
        angle={0.12} 
        penumbra={1}
        intensity={10}
        castShadow
        shadow-mapSize={1024}
        color="black"
      /> */}
      <pointLight intensity={10} position={[0, 0, -4]} />
      <primitive
        object={robot.scene}
        scale={isMobile ? 5.39 : 4.4}
        position={isMobile ? [0, -9.5, -0.9] : [0, -6.86, -1.9]}
        rotation={isMobile ? [-0.01, 0.5, -0.01] : [-0.01, 0.3, -0.02]}
      />
    </mesh>
  );
};

const RobotsCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 450px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <>
      <Canvas
        frameloop="demand"
        shadows
        dpr={[1, 2]}
        camera={{ position: [20, 5, 5], fov: 10 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Robots isMobile={isMobile} />
        </Suspense>
        <Preload all />
      </Canvas>
    </>
  );
};

export default RobotsCanvas;
