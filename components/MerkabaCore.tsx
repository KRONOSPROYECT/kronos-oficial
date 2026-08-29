"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function MerkabaCore() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(300, 300);
    mountRef.current.appendChild(renderer.domElement);

    // Crear el Merkaba (dos tetraedros entrelazados)
    const geometry = new THREE.OctahedronGeometry(1.5);
    const material = new THREE.MeshStandardMaterial({
      color: 0xB88A2D,
      emissive: 0x442200,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.85,
    });
    const merkaba = new THREE.Mesh(geometry, material);
    scene.add(merkaba);

    // Luz
    const light = new THREE.PointLight(0xFFD700, 2, 10);
    light.position.set(2, 2, 2);
    scene.add(light);
    const ambient = new THREE.AmbientLight(0x404040);
    scene.add(ambient);

    camera.position.z = 4;

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      merkaba.rotation.x += 0.01;
      merkaba.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-[300px] h-[300px]" />;
}