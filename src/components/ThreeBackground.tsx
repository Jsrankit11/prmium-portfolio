import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;

    let renderer: THREE.WebGLRenderer | null = null;
    let particleGeometry: THREE.BufferGeometry | null = null;
    let particleMaterial: THREE.PointsMaterial | null = null;
    let torusKnotGeometry: THREE.TorusKnotGeometry | null = null;
    let torusKnotMaterial: THREE.MeshBasicMaterial | null = null;
    let animationFrameId: number;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      if (camera) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
      if (renderer) {
        renderer.setSize(width, height);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - width / 2) / (width / 2);
      mouseY = (e.clientY - height / 2) / (height / 2);
    };

    let camera: THREE.PerspectiveCamera | null = null;
    let mouseX = 0;
    let mouseY = 0;

    try {
      // Scene
      const scene = new THREE.Scene();

      // Camera
      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
      camera.position.z = 15;

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);

      // Objects
      // 1. Particle Cloud
      const particleCount = 280;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      
      const colorCyan = new THREE.Color('#00E5FF');
      const colorBlue = new THREE.Color('#3b82f6');
      const colorIndigo = new THREE.Color('#6366f1');

      for (let i = 0; i < particleCount; i++) {
        const r = Math.random() * 20 + 5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);

        const rand = Math.random();
        const mixedColor = rand < 0.33 ? colorCyan : rand < 0.66 ? colorBlue : colorIndigo;
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
      }

      particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const canvasTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
          grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(8, 8, 8, 0, Math.PI * 2);
          ctx.fill();
        }
        return new THREE.CanvasTexture(canvas);
      };

      particleMaterial = new THREE.PointsMaterial({
        size: 0.16,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        map: canvasTexture(),
        depthWrite: false
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      // 2. Wireframe Torus Knot in the background
      torusKnotGeometry = new THREE.TorusKnotGeometry(4.5, 1.2, 120, 10, 3, 4);
      torusKnotMaterial = new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        wireframe: true,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending
      });
      const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
      scene.add(torusKnot);

      // Ambient Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      let targetX = 0;
      let targetY = 0;

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);

      const clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        particles.rotation.y = elapsedTime * 0.03;
        particles.rotation.x = elapsedTime * 0.01;

        torusKnot.rotation.x = elapsedTime * 0.05;
        torusKnot.rotation.y = elapsedTime * 0.03;

        targetX += (mouseX - targetX) * 0.08;
        targetY += (mouseY - targetY) * 0.08;

        scene.rotation.y = targetX * 0.35;
        scene.rotation.x = targetY * 0.35;

        const isLightMode = document.documentElement.classList.contains('light-mode');
        if (isLightMode) {
          torusKnotMaterial.color.setHex(0x007c91);
          torusKnotMaterial.opacity = 0.06;
          particleMaterial.opacity = 0.55;
          particleMaterial.blending = THREE.NormalBlending;
          torusKnotMaterial.blending = THREE.NormalBlending;
        } else {
          torusKnotMaterial.color.setHex(0x00e5ff);
          torusKnotMaterial.opacity = 0.08;
          particleMaterial.opacity = 0.85;
          particleMaterial.blending = THREE.AdditiveBlending;
          torusKnotMaterial.blending = THREE.AdditiveBlending;
        }

        renderer.render(scene, camera!);
      };

      animate();
    } catch (err) {
      console.warn('WebGL is not supported or failed to initialize Three.js:', err);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && renderer && renderer.domElement) {
        try {
          containerRef.current.removeChild(renderer.domElement);
        } catch (e) {}
      }

      if (particleGeometry) particleGeometry.dispose();
      if (particleMaterial) particleMaterial.dispose();
      if (torusKnotGeometry) torusKnotGeometry.dispose();
      if (torusKnotMaterial) torusKnotMaterial.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="canvas-container opacity-40 dark:opacity-60" 
      style={{ pointerEvents: 'none' }}
    />
  );
}
