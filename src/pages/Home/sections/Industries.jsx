import { useRef, useMemo, memo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Building2, Warehouse, Network, Briefcase, Store, ShieldAlert } from 'lucide-react'
import './Industries.css'

gsap.registerPlugin(ScrollTrigger)

const industries = [
    { id: '01', label: 'Gated Societies', desc: 'Autonomous multi-perimeter tracking with biometric access verification.', detail: 'RESIDENTIAL INFRA', color: '#00e5ff', icon: Building2 },
    { id: '02', label: 'Logistics Hubs', desc: 'Real-time inventory mapping and predictive threat detection.', detail: 'SUPPLY CHAIN', color: '#0066ff', icon: Warehouse },
    { id: '03', label: 'Smart Cities', desc: 'Grid-wide surveillance networks for crowd anomaly detection.', detail: 'CIVIC SURVEILLANCE', color: '#00ffaa', icon: Network },
    { id: '04', label: 'Enterprise Nodes', desc: 'Continuous facial tracking and secure-zone breach prevention.', detail: 'CORPORATE HQ', color: '#ff0055', icon: Briefcase },
    { id: '05', label: 'Retail Complexes', desc: 'Advanced behavior pattern matching to neutralize shrinkage.', detail: 'COMMERCIAL SECTOR', color: '#ffaa00', icon: Store },
    { id: '06', label: 'Critical Sites', desc: 'Advanced perimeter security for high-value assets.', detail: 'HIGH-SECURITY ZONES', color: '#b066ff', icon: ShieldAlert },
]

const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
};

const ParticleNetwork = memo(() => {
    const pointsRef = useRef()
    const [positions, colors] = useMemo(() => {
        const count = 3000;
        const pos = new Float32Array(count * 3)
        const col = new Float32Array(count * 3)
        const cObj = new THREE.Color()
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 2 * Math.PI, p = Math.acos((Math.random() * 2) - 1)
            const r = 10 + (Math.random() - 0.5) * 0.5
            pos[i * 3] = r * Math.sin(p) * Math.cos(t); pos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t); pos[i * 3 + 2] = r * Math.cos(p)
            cObj.set(Math.random() > 0.8 ? '#00e5ff' : '#002244')
            col[i * 3] = cObj.r; col[i * 3 + 1] = cObj.g; col[i * 3 + 2] = cObj.b
        }
        return [pos, col]
    }, [])

    useFrame((st) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = st.clock.elapsedTime * 0.05
            pointsRef.current.rotation.z = Math.sin(st.clock.elapsedTime * 0.02) * 0.1
        }
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
                <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.05} vertexColors transparent opacity={0.6} sizeAttenuation blending={THREE.AdditiveBlending} />
        </points>
    )
})

ParticleNetwork.displayName = 'ParticleNetwork'

const TiltCard = memo(({ data }) => {
    const Icon = data.icon
    return (
        <motion.div
            className="indus-card-wrapper"
            style={{
                '--theme-color': data.color,
                '--theme-color-rgb': hexToRgb(data.color)
            }}
        >
            <div className="indus-card">
                {/* Background Layers */}
                <div className="indus-card-bg-grid" />
                <div className="indus-noise-overlay" />
                <div className="indus-hologram-glow" />
                <div className="indus-scan-line" />

                {/* Cyberpunk Corners */}
                <div className="indus-corner indus-corner-tl" />
                <div className="indus-corner indus-corner-tr" />
                <div className="indus-corner indus-corner-bl" />
                <div className="indus-corner indus-corner-br" />

                <div className="indus-card-content">
                    <div className="indus-card-top">
                        <div className="indus-id-label">{data.id} // SECURED</div>
                        <div className="indus-icon-box"><Icon size={24} strokeWidth={1} /></div>
                    </div>
                    <div className="indus-card-body">
                        <div className="indus-detail-label">{data.detail}</div>
                        <h3 className="indus-title">{data.label}</h3>
                        <p className="indus-desc">{data.desc}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
})

TiltCard.displayName = 'TiltCard'

const Industries = memo(() => {
    const sectionRef = useRef(null), headerRef = useRef(null), gridRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting)
        }, { threshold: 0 })

        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    useGSAP(() => {
        gsap.fromTo(".indus-anim-blur",
            { filter: "blur(20px)", opacity: 0, scale: 0.95 },
            { filter: "blur(0px)", opacity: 1, scale: 1, duration: 1.5, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: headerRef.current, start: "top 75%" } }
        )
        gsap.fromTo(".indus-anim-sweep",
            { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0 },
            { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1, duration: 1.5, delay: 0.4, ease: "power2.inOut", scrollTrigger: { trigger: headerRef.current, start: "top 75%" } }
        )
        gsap.fromTo(".indus-card-wrapper",
            { opacity: 0, y: 80, rotateX: 20 },
            { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: gridRef.current, start: "top 80%" } }
        )
    }, { scope: sectionRef })

    return (
        <section className="indus-section" ref={sectionRef}>
            <div className="indus-canvas-container">
                <Canvas frameloop={isVisible ? 'always' : 'never'} camera={{ position: [0, 0, 20], fov: 45 }}><ParticleNetwork /></Canvas>
                <div className="indus-canvas-overlay" />
            </div>
            <div className="indus-container">
                <div className="indus-header" ref={headerRef}>
                    <div className="indus-anim-blur indus-badge"><span className="indus-badge-dot" />GLOBAL SURVEILLANCE INFRASTRUCTURE</div>
                    <h2 className="indus-anim-blur indus-heading">Enterprise-Grade <span className="indus-gradient-text">Protection.</span></h2>
                    <div className="indus-subtitle-wrapper"><p className="indus-anim-sweep indus-subtitle">Deploying advanced AI surveillance networks. Our decentralized neural algorithms provide autonomous threat mitigation for multi-billion dollar enterprise operations.</p></div>
                </div>
                <div className="indus-grid" ref={gridRef}>{industries.map(ind => <TiltCard key={ind.id} data={ind} />)}</div>
            </div>
            <div className="indus-gradient-floor" />
        </section>
    )
})

Industries.displayName = 'Industries'

export default Industries
