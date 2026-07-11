import React, { useEffect, useRef, useMemo, memo, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const sharedPlaneGeom = new THREE.PlaneGeometry(1, 1);
const sharedEdgesGeom = new THREE.EdgesGeometry(sharedPlaneGeom);

// High-Fidelity 3D Surveillance Array & Tactical Radar Background
const DefenseArchitectureBg = memo(() => {
    const radarRef = useRef();
    const mapGridRef = useRef();
    const arrayRef = useRef();

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;
        if (radarRef.current) radarRef.current.rotation.z = -t * 1.5;
        if (mapGridRef.current) mapGridRef.current.rotation.z = t * 0.05;
        if (arrayRef.current) arrayRef.current.rotation.y = t * 0.02; // Pan the camera wall
    });

    const targetBlips = useMemo(() => {
        const blips = [];
        for (let i = 0; i < 30; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 4 + Math.random() * 10;
            blips.push({ pos: [Math.cos(angle) * radius, Math.sin(angle) * radius, 0] });
        }
        return blips;
    }, []);

    const panels = useMemo(() => {
        const arr = [];
        const count = 35;
        for (let i = 0; i < count; i++) {
            // Distribute on a cylinder around the viewpoint
            const angle = (i / count) * Math.PI * 2 + (Math.random() * 0.4);
            const radius = 10 + Math.random() * 2;
            const y = (Math.random() - 0.5) * 8 + 2; // Keep them higher up watching over
            const isAlert = Math.random() > 0.85; // Simulate threat detections

            arr.push({
                pos: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
                rot: [0, -angle + Math.PI / 2, 0],
                isAlert,
                width: 2.2 + Math.random(),
                height: 1.2 + (Math.random() * 0.5)
            });
        }
        return arr;
    }, []);

    return (
        <group>
            {/* TACTICAL RADAR FLOOR - Represents Global Tracking */}
            <group rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -3.5, -6]}>
                {/* Massive Floor Grid */}
                <gridHelper args={[60, 60, '#0088ff', '#001122']} rotation={[Math.PI / 2, 0, 0]} />

                <group ref={mapGridRef}>
                    {/* Tactical concentric Rings */}
                    <mesh>
                        <ringGeometry args={[4.95, 5, 64]} />
                        <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} side={THREE.DoubleSide} />
                    </mesh>
                    <mesh>
                        <ringGeometry args={[9.95, 10, 64]} />
                        <meshBasicMaterial color="#00e5ff" transparent opacity={0.3} side={THREE.DoubleSide} />
                    </mesh>
                    <mesh>
                        <ringGeometry args={[14.95, 15, 64]} />
                        <meshBasicMaterial color="#00e5ff" transparent opacity={0.1} side={THREE.DoubleSide} />
                    </mesh>

                    {/* Tracking Blips Array representing edge devices */}
                    {targetBlips.map((b, i) => (
                        <group key={i} position={b.pos}>
                            <mesh>
                                <circleGeometry args={[0.08, 16]} />
                                <meshBasicMaterial color={i % 5 === 0 ? "#ff0044" : "#00f0ff"} />
                            </mesh>
                            <mesh>
                                <ringGeometry args={[0.2, 0.25, 16]} />
                                <meshBasicMaterial color={i % 5 === 0 ? "#ff0044" : "#00f0ff"} transparent opacity={0.4} side={THREE.DoubleSide} />
                            </mesh>
                            {/* Vertical target elevation line */}
                            <mesh position={[0, 0, 1]} rotation={[Math.PI / 2, 0, 0]}>
                                <cylinderGeometry args={[0.01, 0.01, 2]} />
                                <meshBasicMaterial color={i % 5 === 0 ? "#ff0044" : "#00f0ff"} transparent opacity={0.3} />
                            </mesh>
                        </group>
                    ))}
                </group>

                {/* High Speed Rotating Radar Scan Volume */}
                <mesh ref={radarRef} position={[0, 0, 0.01]}>
                    <circleGeometry args={[16, 32, 0, Math.PI / 4]} />
                    <meshBasicMaterial color="#00e5ff" transparent opacity={0.15} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
                </mesh>
            </group>

            {/* SURVEILLANCE CAMERA PANELS ARRAY - Massive wall of floating feeds */}
            <group ref={arrayRef} position={[0, -1, -6]}>
                {panels.map((p, i) => (
                    <group key={i} position={p.pos} rotation={p.rot}>
                        {/* Screen Bounding Lines */}
                        <lineSegments scale={[p.width, p.height, 1]} geometry={sharedEdgesGeom}>
                            <lineBasicMaterial color={p.isAlert ? "#ff0044" : "#00f0ff"} transparent opacity={p.isAlert ? 0.7 : 0.25} />
                        </lineSegments>
                        {/* Feed Background */}
                        <mesh scale={[p.width, p.height, 1]} geometry={sharedPlaneGeom}>
                            <meshBasicMaterial color={p.isAlert ? "#ff0044" : "#00f0ff"} transparent opacity={p.isAlert ? 0.15 : 0.03} side={THREE.DoubleSide} />
                        </mesh>
                        {/* Alert Status bar on top of screen if alert */}
                        {p.isAlert && (
                            <mesh position={[0, p.height / 2 - 0.1, 0]}>
                                <planeGeometry args={[p.width * 0.9, 0.05]} />
                                <meshBasicMaterial color="#ff0044" transparent opacity={0.5} />
                            </mesh>
                        )}
                        {/* Tactical Crosshair detail for regular screens */}
                        {!p.isAlert && i % 4 === 0 && (
                            <mesh>
                                <ringGeometry args={[0.3, 0.32, 32]} />
                                <meshBasicMaterial color="#00f0ff" transparent opacity={0.2} side={THREE.DoubleSide} />
                            </mesh>
                        )}
                    </group>
                ))}
            </group>
        </group>
    );
})

DefenseArchitectureBg.displayName = 'DefenseArchitectureBg'

const nodes = [
    {
        title: 'Edge Devices',
        desc: 'Autonomous nodes deployed at the perimeter for instant multi-modal data capture and immediate local threat neutralization.',
        tag: 'LAYER 01 : EDGE',
        color: '#00f0ff',
        glow: 'rgba(0, 240, 255, 0.4)',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Z" fill="currentColor" fillOpacity="0.1" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" opacity="0.5" />
                <path d="M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12M19.07 19.07l-2.12-2.12M7.05 7.05L4.93 4.93" stroke="currentColor" opacity="0.5" />
                <circle cx="12" cy="12" r="7" strokeDasharray="3 3" />
            </svg>
        ),
    },
    {
        title: 'AI Processing Core',
        desc: 'Neural engine running real-time inference at scale. Analyzing millions of parameters across the network simultaneously.',
        tag: 'LAYER 02 : CORE',
        color: '#3b82f6',
        glow: 'rgba(59, 130, 246, 0.4)',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="5" width="14" height="14" rx="2" fill="currentColor" fillOpacity="0.1" />
                <path d="M2 12h3M19 12h3M12 2v3M12 19v3" />
                <path d="M5.5 5.5l2 2M16.5 16.5l2 2M18.5 5.5l-2 2M5.5 18.5l2-2" opacity="0.6" />
                <rect x="9" y="9" width="6" height="6" stroke="currentColor" />
                <circle cx="12" cy="12" r="1" fill="currentColor" />
            </svg>
        ),
    },
    {
        title: 'Cloud Intelligence',
        desc: 'Distributed cloud analytics for deep anomaly detection, pattern recognition, and federated learning model updates.',
        tag: 'LAYER 03 : CLOUD',
        color: '#8b5cf6',
        glow: 'rgba(139, 92, 246, 0.4)',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" fill="currentColor" fillOpacity="0.1" />
                <path d="M12 12l-3 3h6l-3-3z" stroke="currentColor" />
                <circle cx="12" cy="12" r="8" strokeDasharray="1 3" opacity="0.6" />
                <path d="M12 4v2M12 18v2M4 12h2M18 12h2" opacity="0.4" />
            </svg>
        ),
    },
    {
        title: 'Command Center',
        desc: 'Global unified operations dashboard. Provides actionable intelligence and automated defensive protocol execution.',
        tag: 'LAYER 04 : LUMINATOR',
        color: '#10b981',
        glow: 'rgba(16, 185, 129, 0.4)',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="14" rx="2" fill="currentColor" fillOpacity="0.1" />
                <path d="M2 9h20" strokeDasharray="3 3" opacity="0.5" />
                <path d="M7 14h2M11 14h3M7 10h10" strokeWidth="1.5" />
                <circle cx="16" cy="14" r="1" fill="currentColor" />
                <path d="M8 22h8M12 18v4" />
            </svg>
        ),
    },
];

const Architecture = memo(() => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting)
        }, { threshold: 0 })

        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.arch-pipeline',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });

            tl.fromTo('.arch-pipeline-node',
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15,
                    ease: 'expo.out'
                }
            ).fromTo('.arch-flow-connector',
                { opacity: 0, width: 0 },
                {
                    opacity: 1, width: '60px', duration: 0.6, stagger: 0.15,
                    ease: 'power3.inOut',
                },
                "-=0.6"
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // SVG Corner brackets component for HUD feel
    const HUDCorners = ({ color }) => (
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
            {/* Top Left */}
            <svg width="15" height="15" style={{ position: 'absolute', top: 0, left: 0 }}>
                <path d="M 0 15 L 0 0 L 15 0" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
            </svg>
            {/* Top Right */}
            <svg width="15" height="15" style={{ position: 'absolute', top: 0, right: 0 }}>
                <path d="M 0 0 L 15 0 L 15 15" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
            </svg>
            {/* Bottom Left */}
            <svg width="15" height="15" style={{ position: 'absolute', bottom: 0, left: 0 }}>
                <path d="M 0 0 L 0 15 L 15 15" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
            </svg>
            {/* Bottom Right */}
            <svg width="15" height="15" style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <path d="M 0 15 L 15 15 L 15 0" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
            </svg>
        </div>
    );

    return (
        <section className="architecture" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden', padding: '140px 0', background: '#020305' }}>

            {/* Dynamic CSS Core Flare behind everything */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '60vw', height: '60vw',
                background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, rgba(59,130,246,0.03) 40%, transparent 70%)',
                zIndex: 0, pointerEvents: 'none', filter: 'blur(40px)'
            }} />

            {/* Tactical Grid Background overlay */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 0,
                backgroundImage: `linear-gradient(rgba(0, 229, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.04) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                backgroundPosition: 'center',
                maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 80%)'
            }} />

            {/* 3D Canvas Background mapped to new topology */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, opacity: 0.9, pointerEvents: 'none' }}>
                <Canvas frameloop={isVisible ? 'always' : 'never'} camera={{ position: [0, 0, 11], fov: 45 }}>
                    <DefenseArchitectureBg />
                </Canvas>
            </div>

            {/* Gradients to blend sections */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #020305 0%, transparent 20%, transparent 80%, #020305 100%)', zIndex: 2, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 30%, #020305 100%)', zIndex: 2, pointerEvents: 'none', opacity: 0.9 }} />

            <div className="container" style={{ position: 'relative', zIndex: 3 }}>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="architecture-header"
                    style={{ textAlign: 'center', marginBottom: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '6px 12px', background: 'rgba(0, 229, 255, 0.05)',
                        border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '20px',
                        marginBottom: '20px'
                    }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00E5FF', boxShadow: '0 0 10px #00E5FF' }}></div>
                        <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#00E5FF', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Network Topology</span>
                    </div>

                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 600, letterSpacing: '-0.02em', margin: 0, color: '#fff' }}>
                        Intelligence <span style={{ background: 'linear-gradient(90deg, #00E5FF, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Architecture</span>
                    </h2>

                    <p style={{ maxWidth: '650px', margin: '24px auto 0', color: 'rgba(200, 230, 255, 0.7)', fontSize: '1.1rem', lineHeight: 1.6, fontWeight: 300 }}>
                        A seamlessly connected neural ecosystem from the physical edge to the distributed cloud, delivering sub-millisecond automated threat neutralization globally.
                    </p>
                </motion.div>

                {/* Pipeline Flow Layout */}
                <div className="arch-pipeline" style={{ display: 'flex', alignItems: 'stretch', gap: '0px', maxWidth: '1400px', margin: '0 auto', flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '40px', padding: '20px' }}>
                    {nodes.map((node, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center' }}>

                            {/* Node Card - Glassmorphism + Premium HUD style */}
                            <div className="arch-pipeline-node-wrapper" style={{ position: 'relative', width: '280px', flexShrink: 0 }}>
                                <motion.div
                                    className="arch-pipeline-node"
                                    style={{
                                        position: 'relative',
                                        height: '100%',
                                        background: 'rgba(5, 10, 20, 0.65)',
                                        border: '1px solid rgba(255, 255, 255, 0.05)',
                                        padding: '36px 28px',
                                        backdropFilter: 'blur(16px)',
                                        WebkitBackdropFilter: 'blur(16px)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        overflow: 'hidden'
                                    }}
                                    whileHover={{
                                        y: -8,
                                        borderColor: `rgba(255,255,255,0.15)`,
                                        boxShadow: `0 20px 40px -10px rgba(0,0,0,0.8), 0 0 40px -10px ${node.glow}`,
                                        background: 'rgba(8, 15, 30, 0.85)',
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                >
                                    <HUDCorners color={node.color} />

                                    {/* Scanline effect going down on hover */}
                                    <motion.div
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: `linear-gradient(90deg, transparent, ${node.color}, transparent)`, opacity: 0, zIndex: 5, boxShadow: `0 0 10px ${node.color}` }}
                                        whileHover={{ opacity: 0.8, top: '100%' }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    />

                                    {/* Background ambient glow matching node color */}
                                    <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: `radial-gradient(circle, ${node.glow} 0%, transparent 70%)`, opacity: 0.3, pointerEvents: 'none' }} />

                                    <div className="arch-node-inner" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>

                                        {/* Layer tag */}
                                        <div className="arch-node-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                                            <div style={{
                                                fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em',
                                                color: node.color, padding: '4px 8px',
                                                background: `rgba(255,255,255,0.03)`, border: `1px solid rgba(255,255,255,0.08)`, borderRadius: '2px', fontWeight: 500
                                            }}>
                                                {node.tag}
                                            </div>
                                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.2)', fontWeight: 300 }}>
                                                0{i + 1}
                                            </div>
                                        </div>

                                        {/* Icon Container block with subtle glowing ring */}
                                        <div style={{ position: 'relative', width: '56px', height: '56px', marginBottom: '28px' }}>
                                            <div style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: `1px solid ${node.color}`, opacity: 0.2, borderStyle: 'dashed' }} />
                                            <motion.div
                                                className="arch-icon-container"
                                                style={{
                                                    width: '100%', height: '100%',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: node.color,
                                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2))',
                                                    borderRadius: '50%',
                                                    border: '1px solid rgba(255,255,255,0.05)',
                                                    boxShadow: `inset 0 0 15px ${node.glow}`
                                                }}
                                                whileHover={{ scale: 1.1, rotate: 5, boxShadow: `inset 0 0 20px ${node.glow}, 0 0 15px ${node.glow}` }}
                                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                            >
                                                <div style={{ width: '28px', height: '28px' }}>
                                                    {node.icon}
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* Content */}
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#fff', marginBottom: '12px', letterSpacing: '0.02em' }}>
                                            {node.title}
                                        </h3>
                                        <p style={{ fontSize: '0.85rem', color: 'rgba(200, 230, 255, 0.6)', lineHeight: 1.7, marginBottom: '32px', fontWeight: 300 }}>
                                            {node.desc}
                                        </p>

                                        {/* Advanced Status bar */}
                                        <div style={{ marginTop: 'auto' }}>
                                            <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.05)', overflow: 'hidden', marginBottom: '10px' }}>
                                                <motion.div
                                                    style={{ height: '100%', width: '0%', background: `linear-gradient(90deg, transparent, ${node.color})`, boxShadow: `0 0 8px ${node.glow}` }}
                                                    whileInView={{ width: '100%' }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.5, delay: 0.5 + (i * 0.2), ease: "easeInOut" }}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>STATUS:</span>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.1em', color: node.color }}>ONLINE_</span>
                                                    <motion.div
                                                        style={{ width: '4px', height: '4px', borderRadius: '50%', background: node.color, boxShadow: `0 0 8px ${node.color}` }}
                                                        animate={{ opacity: [1, 0.2, 1] }}
                                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Futuristic Multi-line Data Connector */}
                            {i < nodes.length - 1 && (
                                <div className="arch-flow-connector" style={{ position: 'relative', width: '60px', height: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, gap: '6px' }}>
                                    {/* Data Line 1 */}
                                    <div style={{ position: 'relative', width: '100%', height: '1px', background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                                        <motion.div
                                            style={{ position: 'absolute', top: 0, left: '-100%', width: '100%', height: '100%', background: `linear-gradient(90deg, transparent, ${nodes[i].color}, transparent)` }}
                                            animate={{ left: '100%' }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
                                        />
                                    </div>
                                    {/* Center Node dot */}
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', border: `1px solid rgba(255,255,255,0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div style={{ width: '2px', height: '2px', borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }} />
                                    </div>
                                    {/* Data Line 2 */}
                                    <div style={{ position: 'relative', width: '100%', height: '1px', background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                                        <motion.div
                                            style={{ position: 'absolute', top: 0, left: '-100%', width: '100%', height: '100%', background: `linear-gradient(90deg, transparent, ${nodes[i + 1].color}, transparent)` }}
                                            animate={{ left: '100%' }}
                                            transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
})

Architecture.displayName = 'Architecture'

export default Architecture
