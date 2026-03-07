import { useEffect, useRef, useMemo, useState, memo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './WhyThe3rdAI.css'

gsap.registerPlugin(ScrollTrigger)

const statements = [
    {
        sysId: 'SYS.REQ//01',
        title: 'Autonomous Intelligence',
        desc: 'No human-in-the-loop required. Our AI operates independently, making split-second decisions with smart AI precision.',
        coords: 'LAT. 34.0522 N / LONG. 118.2437 W'
    },
    {
        sysId: 'SYS.REQ//02',
        title: 'Zero-Latency Architecture',
        desc: 'Edge-first processing ensures threats are detected and classified before data even reaches the cloud.',
        coords: 'LAT. 40.7128 N / LONG. 74.0060 W'
    },
    {
        sysId: 'SYS.REQ//03',
        title: 'Adaptive Neural Core',
        desc: 'Self-learning models that evolve with your environment, becoming more accurate with every frame processed.',
        coords: 'LAT. 51.5074 N / LONG. 0.1278 W'
    },
    {
        sysId: 'SYS.REQ//04',
        title: 'Powerful AI Security',
        desc: 'End-to-end encryption, air-gapped processing options, and compliance with government security standards.',
        coords: 'LAT. 38.8951 N / LONG. 77.0364 W'
    },
]

// Draws a thin connective line from the fixed core position to the 3D mouse point
const ThinConnectingLine = memo(({ corePosition }) => {
    const lineRef = useRef()
    const { pointer, viewport, camera } = useThree()

    useFrame(() => {
        if (lineRef.current) {
            // Unproject pointer to find a 3D position in the scene
            const vector = new THREE.Vector3(pointer.x, pointer.y, 0.5)
            vector.unproject(camera)
            const dir = vector.sub(camera.position).normalize()
            const distance = Math.abs((corePosition[2] - camera.position.z) / dir.z)
            const pos = camera.position.clone().add(dir.multiplyScalar(distance))

            const positions = lineRef.current.geometry.attributes.position.array

            // start point
            positions[0] = corePosition[0]
            positions[1] = corePosition[1]
            positions[2] = corePosition[2]

            // end point (mouse position)
            positions[3] = pos.x
            positions[4] = pos.y
            positions[5] = pos.z

            lineRef.current.geometry.attributes.position.needsUpdate = true
        }
    })

    const geom = useMemo(() => {
        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3))
        return geo
    }, [])

    return (
        <line ref={lineRef} geometry={geom}>
            <lineBasicMaterial color="#00e5ff" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
        </line>
    )
})

ThinConnectingLine.displayName = 'ThinConnectingLine'

const CentralNeuralArray = memo(() => {
    const groupRef = useRef()
    const { pointer } = useThree()

    const nodeCount = 800
    const arraySize = 5.5

    const { positions, colors } = useMemo(() => {
        const pos = new Float32Array(nodeCount * 3)
        const col = new Float32Array(nodeCount * 3)
        for (let i = 0; i < nodeCount; i++) {
            // Cubic volume distribution for matrix feel
            pos[i * 3] = (Math.random() - 0.5) * arraySize
            pos[i * 3 + 1] = (Math.random() - 0.5) * arraySize
            pos[i * 3 + 2] = (Math.random() - 0.5) * arraySize

            const rand = Math.random()
            let color = new THREE.Color("#00e5ff") // Cyan
            if (rand > 0.95) color = new THREE.Color("#f59e0b") // Amber Alert
            else if (rand > 0.8) color = new THREE.Color("#6366f1") // Indigo processing
            else if (rand > 0.6) color = new THREE.Color("#ffffff") // White high-speed

            col[i * 3] = color.r
            col[i * 3 + 1] = color.g
            col[i * 3 + 2] = color.b
        }
        return { positions: pos, colors: col }
    }, [])

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime

        if (groupRef.current) {
            // Smooth mouse parallax
            const targetX = -pointer.y * 0.3
            const targetY = pointer.x * 0.3
            groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05
            groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05

            // Continuous matrix spin
            groupRef.current.rotation.y += delta * 0.12
            groupRef.current.rotation.z += delta * 0.05
        }
    })

    return (
        <group position={[4.5, 0, -2]}>
            <group ref={groupRef}>

                {/* Outer Matrix Box Wireframe */}
                <lineSegments>
                    <edgesGeometry args={[new THREE.BoxGeometry(arraySize, arraySize, arraySize)]} />
                    <lineBasicMaterial color="#00e5ff" transparent opacity={0.12} blending={THREE.AdditiveBlending} />
                </lineSegments>

                {/* Inner Matrix Box */}
                <lineSegments>
                    <edgesGeometry args={[new THREE.BoxGeometry(arraySize * 0.5, arraySize * 0.5, arraySize * 0.5)]} />
                    <lineBasicMaterial color="#6366f1" transparent opacity={0.25} blending={THREE.AdditiveBlending} />
                </lineSegments>

                {/* Central Processing Octahedron */}
                <mesh>
                    <octahedronGeometry args={[1.2, 0]} />
                    <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.4} blending={THREE.AdditiveBlending} />
                </mesh>
                <mesh>
                    <octahedronGeometry args={[1, 0]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
                </mesh>

                {/* Central Energy Glow */}
                <mesh>
                    <sphereGeometry args={[0.5, 32, 32]} />
                    <meshBasicMaterial color="#00e5ff" transparent opacity={0.4} blending={THREE.AdditiveBlending} blur />
                </mesh>

                {/* Data Nodes */}
                <points>
                    <bufferGeometry>
                        <bufferAttribute attach="attributes-position" count={nodeCount} array={positions} itemSize={3} />
                        <bufferAttribute attach="attributes-color" count={nodeCount} array={colors} itemSize={3} />
                    </bufferGeometry>
                    <pointsMaterial size={0.06} vertexColors transparent opacity={0.9} blending={THREE.AdditiveBlending} sizeAttenuation depthWrite={false} />
                </points>

                {/* Orbiting Scanner Rings */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[3.2, 3.25, 64]} />
                    <meshBasicMaterial color="#00e5ff" transparent opacity={0.6} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
                </mesh>
                <mesh rotation={[Math.PI / 2.5, Math.PI / 4, 0]}>
                    <ringGeometry args={[3.6, 3.62, 64]} />
                    <meshBasicMaterial color="#6366f1" transparent opacity={0.3} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
                </mesh>
                <mesh rotation={[0, Math.PI / 2, Math.PI / 4]}>
                    <ringGeometry args={[3.8, 3.82, 64]} />
                    <meshBasicMaterial color="#f59e0b" transparent opacity={0.2} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
                </mesh>
            </group>
        </group>
    )
})

CentralNeuralArray.displayName = 'CentralNeuralArray'

const HUDOverlay = memo(() => {
    const mouseX = useMotionValue(-1000)
    const mouseY = useMotionValue(-1000)

    // Smooth springs for even better feel
    const springX = useSpring(mouseX, { stiffness: 500, damping: 50 })
    const springY = useSpring(mouseY, { stiffness: 500, damping: 50 })

    const [visible, setVisible] = useState(false)
    const [scanData, setScanData] = useState({ lat: 0, lng: 0 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
            if (!visible) setVisible(true)

            // Randomize Lat/Lng slowly based on mouse for real-time feel
            // Only update state occasionally to reduce re-renders
            if (Math.random() > 0.95) {
                setScanData({
                    lat: (25 + (e.clientY / window.innerHeight) * 10).toFixed(4),
                    lng: (-80 + (e.clientX / window.innerWidth) * 10).toFixed(4)
                })
            }
        }
        const handleMouseLeave = () => setVisible(false)
        const handleMouseEnter = () => setVisible(true)

        const section = document.querySelector('.why-section-cinematic')
        if (section) {
            section.addEventListener('mousemove', handleMouseMove, { passive: true })
            section.addEventListener('mouseleave', handleMouseLeave)
            section.addEventListener('mouseenter', handleMouseEnter)
            return () => {
                section.removeEventListener('mousemove', handleMouseMove)
                section.removeEventListener('mouseleave', handleMouseLeave)
                section.removeEventListener('mouseenter', handleMouseEnter)
            }
        }
    }, [visible, mouseX, mouseY])

    return (
        <motion.div
            className={`hud-cursor-overlay ${visible ? 'visible' : ''}`}
            style={{ x: springX, y: springY }}
        >
            {/* The physical brackets matching cursor */}
            <div className="hud-cursor-crosshair">
                <div className="bracket topleft"></div>
                <div className="bracket topright"></div>
                <div className="bracket botleft"></div>
                <div className="bracket botright"></div>
                <div className="hud-center-dot"></div>
            </div>

            {/* Floating Data Readout */}
            <div className="hud-cursor-data">
                <div className="hud-data-row">Lat: {scanData.lat}</div>
                <div className="hud-data-row">Scan: <span style={{ color: '#10b981' }}>Active</span></div>
                <div className="hud-data-row">Threat Level: <span style={{ color: '#00e5ff' }}>Low</span></div>
                <div className="hud-data-row">Tracking: <span style={{ color: '#f59e0b' }}>On</span></div>
            </div>
        </motion.div>
    )
})

HUDOverlay.displayName = 'HUDOverlay'

const WhyThe3rdAI = memo(() => {
    const sectionRef = useRef(null)
    const textsRef = useRef([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=400%',
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                }
            })

            textsRef.current.forEach((text, i) => {
                if (!text) return
                if (i === 0) {
                    gsap.set(text, { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)' })
                } else {
                    gsap.set(text, { autoAlpha: 0, y: 80, scale: 0.95, filter: 'blur(12px)' })
                }
            })

            textsRef.current.forEach((text, i) => {
                if (!text) return

                if (i > 0) {
                    tl.to(text, {
                        autoAlpha: 1,
                        y: 0,
                        scale: 1,
                        filter: 'blur(0px)',
                        duration: 1,
                        ease: 'power2.out'
                    }, `step${i}`)
                }

                if (i < textsRef.current.length - 1) {
                    tl.to(text, {
                        autoAlpha: 0,
                        y: -80,
                        scale: 1.05,
                        filter: 'blur(12px)',
                        duration: 1,
                        ease: 'power2.in'
                    }, `step${i + 1}`)
                }
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="why-section-cinematic" ref={sectionRef}>

            {/* Interactive Cursor Overlay */}
            <HUDOverlay />

            {/* Cinematic 3D Background */}
            <div className="why-cinematic-bg">
                <div className="global-core-container" style={{ width: '100%', height: '100%' }}>
                    {/* Canvas captures mouse internally */}
                    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                        <CentralNeuralArray />
                        <ThinConnectingLine corePosition={[4.5, 0, -2]} />
                        <Stars radius={60} depth={40} count={2000} factor={3} saturation={0} fade speed={1.5} />

                        {/* Background Subtle Grid Effect representing tracking layer */}
                        <gridHelper args={[60, 60, '#3b82f6', '#00e5ff']} position={[0, -5, -8]} rotation={[-Math.PI / 1.8, 0, 0]} material-opacity={0.08} material-transparent />
                    </Canvas>
                </div>
                <div className="why-bg-gradient-overlay" />
            </div>

            {/* Pinned Cinematic Overlay */}
            <div className="why-cinematic-overlay">

                {/* HUD Decorative Borders */}
                <div className="why-hud-borders">
                    <div className="hud-corner top-left" />
                    <div className="hud-corner top-right" />
                    <div className="hud-corner bottom-left" />
                    <div className="hud-corner bottom-right" />
                    <div className="hud-scanning-line" />
                </div>

                <div className="why-cinematic-content">
                    {/* Header Top Left */}
                    <div className="why-section-header">
                        <h2>WHY <span className="text-glow">THE3RDAI</span></h2>
                        <div className="header-line"></div>
                        <p>GLOBAL THREAT NEUTRALIZATION INFRASTRUCTURE</p>
                    </div>

                    {/* Sequential Revealing Statements */}
                    <div className="why-statements-container">
                        {statements.map((s, i) => (
                            <div
                                className="why-cinematic-statement"
                                key={i}
                                ref={el => textsRef.current[i] = el}
                            >
                                <div className="statement-sys-badge">
                                    <span className="blink-dot-alert"></span>
                                    {s.sysId}
                                </div>

                                <h3 className="statement-title">
                                    <span>{s.title}</span>
                                </h3>

                                <div className="statement-decoration">
                                    <div className="stat-dec-dot" />
                                    <div className="stat-dec-line" />
                                    <div className="stat-dec-dot" style={{ opacity: 0.5, boxShadow: 'none' }} />
                                </div>

                                <div className="statement-desc-box">
                                    <p className="statement-desc">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* HUD Footer Information */}
                    <div className="why-footer-hud">
                        <div className="hud-coord">
                            SYSTEM_STATUS: <span style={{ color: '#10b981' }}>OPTIMAL</span>
                        </div>
                        <div className="hud-coord">
                            ACTIVE_NODE: <span>{statements[0].coords}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
})

WhyThe3rdAI.displayName = 'WhyThe3rdAI'

export default WhyThe3rdAI
