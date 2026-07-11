import React, { useEffect, useRef, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, CodeSquare, Eye, Server, RadioReceiver, Database, ShieldAlert } from 'lucide-react';
import monitorBg from '../../../assets/images/multpipleMonitoreScreen.jpg';
import './Analytics.css';

gsap.registerPlugin(ScrollTrigger);

const techStats = [
    { id: 'S1', label: 'ACTIVE NODES', value: '12,847', unit: 'CAM', type: 'positive', icon: Eye, desc: 'Global surveillance grid fully synced' },
    { id: 'S2', label: 'ATTEMPTS BLOCKED', value: '2,491', unit: 'REQ', type: 'negative', icon: CodeSquare, desc: 'Malicious injections neutralized' },
    { id: 'S3', label: 'NEURAL LAG', value: '0.3', unit: 'MS', type: 'positive', icon: Activity, desc: 'Sub-millisecond processing delay' },
    { id: 'S4', label: 'CORE UPTIME', value: '99.99', unit: '%', type: 'positive', icon: Server, desc: 'Uninterrupted intelligence matrix' },
];

const radarData = Array.from({ length: 48 }, () => Math.random() * 100);

// VISUALLY STUNNING HOLO-CORE MATRIX
const ApertureMatrix = memo(() => {
    return (
        <div className="anlt-aperture-wrap">
            {/* The Outer Containment Field */}
            <div className="aperture-outer-ring">
                <div className="ring-segment top"></div>
                <div className="ring-segment bottom"></div>
                <div className="ring-segment left"></div>
                <div className="ring-segment right"></div>
            </div>

            {/* Inner Rotating Tech Rings */}
            <div className="aperture-tech-ring ring-1"></div>
            <div className="aperture-tech-ring ring-2"></div>
            <div className="aperture-tech-ring ring-3"></div>

            {/* Crosshairs & Scanners */}
            <div className="aperture-crosshair horizontal"></div>
            <div className="aperture-crosshair vertical"></div>
            <div className="aperture-radar-sweep"></div>

            {/* Center Energy Orb */}
            <div className="aperture-energy-core">
                <div className="core-inner-flare"></div>
                <div className="core-pulse"></div>
            </div>

            {/* Floating Data Nodes around the Core */}
            <div className="holo-node node-tl">
                <span className="node-dot"></span>
                <span className="node-text">SYS.ON</span>
            </div>
            <div className="holo-node node-tr">
                <span className="node-dot"></span>
                <span className="node-text">SYNC</span>
            </div>
            <div className="holo-node node-bl">
                <span className="node-dot"></span>
                <span className="node-text">SECURE</span>
            </div>
            <div className="holo-node node-br">
                <span className="node-dot"></span>
                <span className="node-text">99.9%</span>
            </div>

            <div className="aperture-shadow-glow" />
        </div>
    );
})

ApertureMatrix.displayName = 'ApertureMatrix'

const PremiumCard = memo(({ stat, index }) => {
    const Icon = stat.icon;
    const isLeft = index % 2 === 0;
    const color = stat.type === 'positive' ? '#00e5ff' : '#ff0055';
    // Helper for RGB values to power the new glass effects
    const rgb = stat.type === 'positive' ? '0, 229, 255' : '255, 0, 85';

    return (
        <motion.div
            className="anlt-premium-card"
            initial={{ opacity: 0, x: isLeft ? -50 : 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
                '--card-color': color,
                '--card-color-rgb': rgb,
            }}
        >
            {/* Tech Decoration */}
            <div className="anlt-card-bracket tl" />
            <div className="anlt-card-bracket br" />
            <div className="anlt-card-accent" />

            <div className="anlt-card-header">
                <div className="anlt-card-icon-wrapper">
                    <Icon size={22} strokeWidth={1.5} />
                </div>
                <div className="anlt-card-label-box">
                    <span className="anlt-card-id">{stat.id} // SYS_DATA</span>
                    <span className="anlt-card-label">{stat.label}</span>
                </div>
            </div>

            <div className="anlt-card-body">
                <div className="anlt-card-value-wrapper">
                    <span className="anlt-card-value">{stat.value}</span>
                    <span className="anlt-card-unit">{stat.unit}</span>
                </div>
                <p className="anlt-card-desc">{stat.desc}</p>
            </div>

            {/* Industrial Data Wave Overlay */}
            <div className="anlt-card-wave">
                {[0.6, 0.4, 0.8, 0.5, 0.9, 0.3, 0.7, 0.5].map((h, i) => (
                    <div
                        key={i}
                        className="anlt-wave-bar"
                        style={{
                            height: `${h * 100}%`,
                            animationDelay: `${i * 0.1}s`,
                            background: color,
                            willChange: 'transform'
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
})

PremiumCard.displayName = 'PremiumCard'

const Analytics = memo(() => {
    const sectionRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.anlt-title-reveal',
                { opacity: 0, filter: 'blur(10px)', y: 30 },
                { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
            );

            gsap.fromTo('.anlt-radar-bar',
                { scaleY: 0 },
                {
                    scaleY: 1,
                    duration: 0.8,
                    stagger: 0.02,
                    ease: "expo.out",
                    scrollTrigger: { trigger: chartRef.current, start: 'top 85%' }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className="anlt-section" ref={sectionRef}>
            {/* Tactical Monitor Backdrop */}
            <div className="anlt-section-bg" style={{ backgroundImage: `url(${monitorBg})` }} />

            {/* Deep Atmosphere Glow */}
            <div className="anlt-bg-glow" />

            <div className="anlt-container">
                <div className="anlt-header">
                    <div className="anlt-title-reveal anlt-epic-badge">
                        <div className="anlt-epic-pulse"></div>
                        <Database size={14} /> LIVE TELEMETRY
                    </div>
                    <h2 className="anlt-title-reveal anlt-heading">
                        Command <span className="anlt-glow-text">Core.</span>
                    </h2>
                    <p className="anlt-title-reveal anlt-subtitle">
                        Real-time monitoring of global surveillance feeds and threat neutralization algorithms.
                    </p>
                </div>

                <div className="anlt-nexus-layout">
                    {/* Left Stats */}
                    <div className="anlt-stats-col anlt-stats-left">
                        <PremiumCard stat={techStats[0]} index={0} />
                        <PremiumCard stat={techStats[1]} index={2} />
                    </div>

                    {/* NEW: Stunning Holographic Core */}
                    <div className="anlt-core-center-module">
                        <ApertureMatrix />

                        {/* Connecting Beams to Side Panels */}
                        <div className="core-connection-beam left-beam-top"></div>
                        <div className="core-connection-beam left-beam-bottom"></div>
                        <div className="core-connection-beam right-beam-top"></div>
                        <div className="core-connection-beam right-beam-bottom"></div>
                    </div>

                    {/* Right Stats */}
                    <div className="anlt-stats-col anlt-stats-right">
                        <PremiumCard stat={techStats[2]} index={1} />
                        <PremiumCard stat={techStats[3]} index={3} />
                    </div>
                </div>

                {/* Bottom Elite Radar Dashboard */}
                <div className="anlt-radar-dashboard" ref={chartRef}>
                    <div className="anlt-radar-header">
                        <div className="anlt-radar-title">
                            <ShieldAlert size={16} color="#00e5ff" />
                            GLOBAL THREAT FREQUENCY
                        </div>
                        <div className="anlt-radar-metrics">
                            <span className="anlt-metric">PEAK LOAD: <span className="anlt-metric-val">842 THz</span></span>
                            <span className="anlt-metric">SYSTEM STATUS: <span className="anlt-metric-val" style={{ color: '#00e5ff', textShadow: '0 0 10px #00e5ff' }}>SECURE</span></span>
                        </div>
                    </div>
                    <div className="anlt-radar-display">
                        <div className="anlt-radar-grid" />
                        {radarData.map((val, i) => {
                            const isHigh = val > 85;
                            return (
                                <div className="anlt-radar-col" key={i}>
                                    <div
                                        className="anlt-radar-bar"
                                        style={{
                                            height: `${Math.max(10, val)}%`,
                                            background: isHigh ? `linear-gradient(to top, #ff0055, #ff4c4c)` : `linear-gradient(to top, rgba(0,229,255,0.4), #00e5ff)`,
                                            boxShadow: isHigh ? '0 0 12px #ff0055' : '0 0 5px #00e5ff',
                                            willChange: 'transform, height'
                                        }}
                                    />
                                    <div
                                        className="anlt-radar-reflection"
                                        style={{
                                            height: `${Math.max(10, val) * 0.2}%`,
                                            background: isHigh ? '#ff0055' : '#00e5ff',
                                            opacity: isHigh ? 0.4 : 0.2
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
})

Analytics.displayName = 'Analytics'

export default Analytics
