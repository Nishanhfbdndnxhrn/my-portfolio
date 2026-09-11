import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Float,
  MeshDistortMaterial,
  PerspectiveCamera,
  Text,
  Environment,
  ContactShadows,
  OrbitControls
} from '@react-three/drei';
import * as THREE from 'three';

// --- 3D Background Elements ---
function BackgroundShapes() {
  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-2, 1, -2]}>
          <sphereGeometry args={[0.8, 64, 64]} />
          <MeshDistortMaterial color="#e0231c" speed={3} distort={0.4} radius={1} />
        </mesh>
      </Float>
      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[2, -1, -3]}>
          <torusGeometry args={[0.6, 0.2, 16, 100]} />
          <meshStandardMaterial color="#444" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>
      <ContactShadows opacity={0.4} scale={10} blur={2} far={4.5} />
      <Environment preset="city" />
    </>
  );
}

// --- Interactive Scroll-based Text ---
function SceneText() {
  const { viewport } = useThree();
  return (
    <Text
      fontSize={0.5}
      color="#fff"
      font="/fonts/onest.ttf" // Placeholder for the bold font
      position={[0, 0, 0]}
      maxWidth={viewport.width}
      textAlign="center"
    >
      NISHANTH KUMAR
    </Text>
  );
}

// --- UI Components ---
const Section = ({ children, className = "" }) => (
  <section className={`min-h-screen w-full flex flex-col justify-center px-8 md:px-20 relative z-10 ${className}`}>
    {children}
  </section>
);

export default function Portfolio() {
  return (
    <div className="bg-zinc-950 text-white font-sans selection:bg-red-500">
      {/* Three.js Canvas - Fixed Background */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />

          <BackgroundShapes />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* HTML Content Overlay */}
      <main className="relative z-10">

        {/* HERO SECTION */}
        <Section className="items-center text-center">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none animate-fade-in">
            NISHANTH<br />
            <span className="text-red-600">KUMAR</span>
          </h1>
          <p className="mt-6 text-zinc-400 text-lg md:text-2xl max-w-2xl font-light tracking-wide">
            Creative Developer & UI Engineer building the next generation of
            <span className="text-white font-medium"> immersive web experiences.</span>
          </p>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-zinc-500">
            <p className="text-xs uppercase tracking-widest">Scroll to explore</p>
            <div className="w-px h-12 bg-zinc-700 mx-auto mt-2"></div>
          </div>
        </Section>

        {/* ABOUT / VISION SECTION */}
        <Section className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Driven by <br />
              <span className="text-red-600">Curiosity.</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              I don't just write code; I architect digital emotions. Currently obsessing over
              the intersection of 3D graphics, shaders, and seamless user interfaces.
              While my project gallery is currently under construction, my commitment
              to technical excellence is already live.
            </p>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl backdrop-blur-sm">
              <h3 className="text-red-500 font-bold mb-2">CORE FOCUS</h3>
              <p className="text-zinc-300">Immersive 3D Interfaces, React Ecosystem, High-Performance Animation.</p>
            </div>
            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl backdrop-blur-sm">
              <h3 className="text-red-500 font-bold mb-2">PHILOSOPHY</h3>
              <p className="text-zinc-300">Minimalism in design, maximalism in performance.</p>
            </div>
          </div>
        </Section>

        {/* SKILLS SECTION */}
        <Section className="items-center text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-16 tracking-tight">The Arsenal</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
            {['React', 'Three.js', 'TypeScript', 'Tailwind', 'GLSL', 'Framer Motion', 'Node.js', 'Next.js'].map((skill) => (
              <div key={skill} className="py-8 px-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-red-600 transition-colors group cursor-default">
                <span className="text-xl font-medium text-zinc-500 group-hover:text-white transition-colors">{skill}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* CONTACT SECTION */}
        <Section className="items-center text-center pb-20">
          <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter">
            LET'S <span className="text-red-600">BUILD.</span>
          </h2>
          <a
            href="mailto:your-email@example.com"
            className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-red-600 hover:text-white transition-all transform hover:scale-110 active:scale-95"
          >
            Get in Touch
          </a>
          <footer className="mt-32 text-zinc-600 text-sm tracking-widest uppercase">
            © {new Date().getFullYear()} Nishanth Kumar — All Rights Reserved
          </footer>
        </Section>

      </main>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

