import { useEffect, useRef, memo } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroImg from '../../assets/images/about-Bg.jpg'
import eyeImg from '../../assets/images/the3eyeImage.jpg'
import monitorImg from '../../assets/images/monitorScreen.jpg'
import cctvImg from '../../assets/images/cctv.jpg'
import tollVideo from '../../assets/videos/tollCamra.mp4'
import mallVideo from '../../assets/videos/mallCamra.mp4'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
    { year: '2021', title: 'Project: Genesis', phase: 'EVL-01', status: 'SYNCHRONIZED', desc: 'The3rdAI founded with a primary directive: redefine autonomous surveillance intelligence. The first neural seed was planted in an isolated sandbox environment.' },
    { year: '2022', title: 'Neural Core v1', phase: 'EVL-02', status: 'OPERATIONAL', desc: 'First-generation AI engine deployed globally. Real-time threat detection benchmarks reaching 30fps with a 99.2% accuracy rating in urban environments.' },
    { year: '2023', title: 'Edge Integration', phase: 'EVL-03', status: 'OPTIMIZED', desc: 'Transition to full Edge Computing. Sub-millisecond on-device processing achieved, eliminating cloud latency and ensuring secure, zero-lag intelligence.' },
    { year: '2024', title: 'City-Scale Matrix', phase: 'EVL-04', status: 'SCALING', desc: 'Architecture scaled to planetary proportions. Protecting entire smart city districts with 10,000+ cameras integrated into a unified hive-mind neural grid.' },
    { year: '2025', title: 'Predictive Behavior', phase: 'EVL-05', status: 'EVOLVING', desc: 'Deployment of Temporal Modeling. The system now detects potential threats 15 minutes before they materialize by analyzing subtle atmospheric behavioral patterns.' },
    { year: '2026', title: 'Global Hegemony', phase: 'EVL-06', status: 'EXPANDING', desc: 'Intercontinental expansion. High-security enterprise contracts signed for 75+ smart city centers. Total vision dominance across secure sectors.' },
]

const teamValues = [
    {
        id: "01",
        title: 'Precision Vision',
        tag: 'ACCURACY',
        desc: 'Every algorithm is optimized for 99.9% detection accuracy. We see what others miss.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            </svg>
        )
    },
    {
        id: "02",
        title: 'Neural Defense',
        tag: 'PROTECTION',
        desc: 'Military-grade encryption integrated into the core neural architecture. Security by design.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 8v4M12 16h.01" />
            </svg>
        )
    },
    {
        id: "03",
        title: 'Quantum Response',
        tag: 'VELOCITY',
        desc: 'Sub-millisecond latency for real-time threat neutralization across global networks.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
        )
    },
    {
        id: "04",
        title: 'Global Sentinel',
        tag: 'SCALABILITY',
        desc: 'Architecture designed to scale from single cameras to planetary surveillance grids.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 010 20 15.3 15.3 0 010-20" />
            </svg>
        )
    },
]

const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
}

const About = memo(() => {
    const pageRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax text layers
            gsap.fromTo('.about-hero-title',
                { y: 0 },
                { y: -60, scrollTrigger: { trigger: '.about-hero', start: 'top top', end: 'bottom top', scrub: 1 } }
            )

            // Temporal Nexus Progress Spine
            gsap.fromTo('.spine-progress-fill',
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.temporal-nexus-section',
                        start: 'top 30%',
                        end: 'bottom 80%',
                        scrub: 1,
                    }
                }
            )

            // Reveal sections
            gsap.utils.toArray('.about-reveal').forEach((el) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1, y: 0, duration: 0.8,
                        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' }
                    }
                )
            })

            // Video sections
            gsap.utils.toArray('.about-video-block').forEach((block, i) => {
                const dir = i % 2 === 0 ? -60 : 60
                gsap.fromTo(block,
                    { opacity: 0, x: dir },
                    {
                        opacity: 1, x: 0, duration: 0.9,
                        scrollTrigger: { trigger: block, start: 'top 75%', toggleActions: 'play none none reverse' }
                    }
                )
            })

            // Team values stagger
            gsap.fromTo('.value-card',
                { opacity: 0, y: 40, scale: 0.95 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12,
                    scrollTrigger: { trigger: '.values-grid', start: 'top 75%', toggleActions: 'play none none reverse' }
                }
            )

            // Mask text reveal
            gsap.fromTo('.about-manifesto-text',
                { clipPath: 'inset(0 100% 0 0)' },
                {
                    clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: 'power3.inOut',
                    scrollTrigger: { trigger: '.about-manifesto', start: 'top 60%', toggleActions: 'play none none reverse' }
                }
            )

        }, pageRef)

        return () => ctx.revert()
    }, [])

    return (
        <motion.main className="about-page" ref={pageRef} variants={pageVariants} initial="initial" animate="animate" exit="exit">

            {/* Section 1: Hero */}
            <section className="about-hero">
                <div className="about-hero-bg" style={{ backgroundImage: `url(${heroImg})` }} />
                <div className="about-hero-grid" />
                <div className="about-hero-scanline" />
                <div className="about-hero-gradient" />
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="about-hero-content">
                        {/* High-tech decorative line */}
                        <motion.div
                            className="about-hero-deco-line"
                            initial={{ height: 0 }}
                            animate={{ height: '100%' }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                        />

                        <motion.div
                            className="about-hero-status"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="status-dot-blink" /> INTELLIGENCE ARCHITECTURE ONLINE
                        </motion.div>

                        <motion.h1
                            className="about-hero-title heading-xl"
                            initial={{ opacity: 0, filter: 'blur(10px)', x: -20 }}
                            animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            The Future of <br className="hide-mobile" />
                            <span className="gradient-text">Autonomous Vision</span>
                        </motion.h1>

                        <motion.p
                            className="about-hero-sub text-body"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                        >
                            We are building the neural infrastructure for a world where intelligent vision systems protect, predict, and prevail seamlessly.
                        </motion.p>

                        {/* Scroll Indicator */}
                        <motion.div
                            className="about-scroll-indicator"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                        >
                            <div className="scroll-mouse">
                                <span className="scroll-wheel"></span>
                            </div>
                            <span className="scroll-text">SYSTEM DEPLOYMENT</span>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section 2: The Birth — Video + Story */}
            <section className="about-section">
                <div className="container">
                    <div className="about-video-block about-split">
                        <div className="about-video-panel">
                            <video autoPlay loop muted playsInline preload="none">
                                <source src={mallVideo} type="video/mp4" />
                            </video>
                            <div className="about-video-overlay" />
                            <div className="about-video-hud">
                                <div className="scan-hud-corner top-left" />
                                <div className="scan-hud-corner top-right" />
                                <div className="scan-hud-corner bottom-left" />
                                <div className="scan-hud-corner bottom-right" />
                            </div>
                        </div>
                        <div>
                            <div className="section-label">The Birth</div>
                            <h2 className="heading-lg">From Concept to<br /><span className="gradient-text">Command Authority</span></h2>
                            <p className="text-body" style={{ marginTop: '20px' }}>
                                The3rdAI was born from a single observation: traditional surveillance captures footage, but never truly <em>sees</em>. We set out to build a system that doesn't just record — it understands, predicts, and acts.
                            </p>
                            <p className="text-body" style={{ marginTop: '16px' }}>
                                Our founders, veterans in AI research and advanced security technology, envisioned a platform where every camera becomes an intelligent sentinel, every frame a data point in a vast neural network of autonomous security.
                            </p>
                            <p className="text-body" style={{ marginTop: '16px' }}>
                                After years of research in neural architecture, computer vision, and edge computing, The3rdAI emerged as the synthesis of cutting-edge AI and real-world security operations — a platform built for the threats of tomorrow.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Intelligence Philosophy */}
            <section className="about-section about-section-alt">
                <div className="container">
                    <div className="about-video-block about-split about-split-reverse">
                        <div>
                            <div className="section-label">Intelligence Philosophy</div>
                            <h2 className="heading-lg">See Everything.{' '}<span className="gradient-text">Understand Everything.</span></h2>
                            <p className="text-body" style={{ marginTop: '20px' }}>
                                Intelligence is not about watching. It's about understanding context, predicting intent, and automating response before harm materializes. The3rdAI doesn't just detect — it comprehends the full situational landscape.
                            </p>
                            <p className="text-body" style={{ marginTop: '16px' }}>
                                Our neural architecture processes visual data through multiple cognitive layers — from raw pixel analysis to contextual understanding to behavioral prediction — mirroring the way a trained security expert would analyze a scene, but at machine speed and scale.
                            </p>
                            <div className="about-stat-row">
                                <div className="about-stat-inline">
                                    <span className="about-stat-val gradient-text">200+</span>
                                    <span className="about-stat-lbl">Object Categories</span>
                                </div>
                                <div className="about-stat-inline">
                                    <span className="about-stat-val gradient-text">500+</span>
                                    <span className="about-stat-lbl">Behavioral Patterns</span>
                                </div>
                                <div className="about-stat-inline">
                                    <span className="about-stat-val gradient-text">15min</span>
                                    <span className="about-stat-lbl">Threat Prediction</span>
                                </div>
                            </div>
                        </div>
                        <div className="about-video-panel">
                            <video autoPlay loop muted playsInline preload="none">
                                <source src={tollVideo} type="video/mp4" />
                            </video>
                            <div className="about-video-overlay" />
                            <div className="about-video-hud">
                                <div className="scan-hud-corner top-left" />
                                <div className="scan-hud-corner top-right" />
                                <div className="scan-hud-corner bottom-left" />
                                <div className="scan-hud-corner bottom-right" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: Mission/Vision/Philosophy Cards */}
            <section className="about-section about-purpose-vision">
                <div className="container">
                    <div className="about-center-header about-reveal">
                        <div className="section-label" style={{ justifyContent: 'center' }}>Our Purpose</div>
                        <h2 className="heading-lg" style={{ textAlign: 'center' }}>Built on <span className="gradient-text">Conviction</span></h2>
                    </div>

                    <div className="purpose-unique-layout about-reveal">
                        {/* THE NEURAL BRAIN BACKGROUND */}
                        <div className="purpose-neural-brain">
                            <div className="brain-core-glow" />
                            <div className="brain-pulse-ring" />
                            <div className="brain-ripple" />
                        </div>

                        {/* CONNECTION LINES (Dynamic SVGs) */}
                        <svg className="purpose-connections-svg" viewBox="0 0 1000 500">
                            <line x1="500" y1="250" x2="200" y2="100" className="conn-line l1" />
                            <line x1="500" y1="250" x2="800" y2="250" className="conn-line l2" />
                            <line x1="500" y1="250" x2="200" y2="400" className="conn-line l3" />
                            <circle cx="200" cy="100" r="4" className="conn-dot" />
                            <circle cx="800" cy="250" r="4" className="conn-dot" />
                            <circle cx="200" cy="400" r="4" className="conn-dot" />
                        </svg>

                        <div className="purpose-logo-center">
                            <div className="logo-premium-outer-ring" />
                            <div className="logo-premium-wrapper">
                                <img src="/the3rdAiLogo.jpeg" alt="Premium Brand Logo" className="logo-premium" loading="lazy" />
                                <div className="logo-scanner-line" />
                            </div>
                        </div>

                        <div className="purpose-items">
                            <motion.div
                                className="purpose-item mission"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="purpose-item-content">
                                    <div className="purpose-item-tag">CORE MISSION</div>
                                    <h3 className="heading-sm gradient-text">Eliminate Blind Spots</h3>
                                    <p className="text-body">
                                        Building autonomous AI vision that makes every space safer and smarter.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="purpose-item vision"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="purpose-item-content text-right">
                                    <div className="purpose-item-tag">FUTURE VISION</div>
                                    <h3 className="heading-sm gradient-text">Speed of Thought</h3>
                                    <p className="text-body">
                                        Predicting threats and protecting lives across every connected global space.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="purpose-item philosophy"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="purpose-item-content">
                                    <div className="purpose-item-tag">DNA PHILOSOPHY</div>
                                    <h3 className="heading-sm gradient-text">Invisible Security</h3>
                                    <p className="text-body">
                                        True security is omnipresent, automated, and always ahead of the threat.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 5: Core Values */}
            <section className="about-section about-section-alt">
                <div className="container">
                    <div className="about-center-header about-reveal">
                        <div className="section-label" style={{ justifyContent: 'center' }}>Core Values</div>
                        <h2 className="heading-lg" style={{ textAlign: 'center' }}>The Pillars of <span className="gradient-text">Our Architecture</span></h2>
                        <p className="text-body" style={{ textAlign: 'center', maxWidth: '600px', margin: '16px auto 0' }}>
                            Every decision we make, every model we train, every system we deploy is guided by these immovable principles.
                        </p>
                    </div>
                    <div className="pillars-architecture-premium">
                        {teamValues.map((val, i) => (
                            <motion.div
                                className="pillar-premium-card"
                                key={i}
                                initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                                transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
                                viewport={{ once: true }}
                            >
                                <div className="pillar-glass-container">
                                    <div className="pillar-scanner" />

                                    <div className="pillar-top-info">
                                        <span className="pillar-serial">{val.id}</span>
                                        <div className="pillar-pulse-node">
                                            <span className="pulse-dot" />
                                            LINKED
                                        </div>
                                    </div>

                                    <div className="pillar-main-icon">
                                        <div className="icon-orbital-ring" />
                                        <div className="icon-orbital-ring delay-1" />
                                        <div className="icon-svg-wrap">{val.icon}</div>
                                    </div>

                                    <div className="pillar-text-content">
                                        <div className="pillar-category-tag">{val.tag}</div>
                                        <h3 className="pillar-title">{val.title}</h3>
                                        <div className="pillar-divider" />
                                        <p className="pillar-desc">{val.desc}</p>
                                    </div>

                                    {/* Tech corners */}
                                    <div className="pillar-corner tl" />
                                    <div className="pillar-corner tr" />
                                    <div className="pillar-corner bl" />
                                    <div className="pillar-corner br" />

                                    {/* Geometric BG details */}
                                    <div className="pillar-bg-grid" />
                                </div>
                                <div className="pillar-core-glow-bottom" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 6: Manifesto */}
            <section className="about-section about-manifesto">
                <div className="container" style={{ textAlign: 'center' }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>Manifesto</div>
                    <div className="about-manifesto-text">
                        <h2 className="heading-xl" style={{ maxWidth: '900px', margin: '0 auto' }}>
                            We don't build cameras.{' '}
                            <span className="gradient-text">We build consciousness.</span>
                        </h2>
                    </div>
                    <p className="text-body" style={{ maxWidth: '640px', margin: '24px auto 0' }}>
                        Every frame is a decision. Every pixel is intelligence. Every second, our neural networks process millions of visual signals to protect what matters most — people, assets, and peace of mind.
                    </p>
                </div>
            </section>

            {/* Section 7: Technology Evolution — TEMPORAL NEXUS */}
            <section className="temporal-nexus-section">
                <div className="nexus-bg-parallax" />
                <div className="nexus-grid-overlay" />

                <div className="container">
                    <div className="nexus-center-header about-reveal">
                        <div className="section-label" style={{ justifyContent: 'center' }}>Temporal Chronology</div>
                        <h2 className="heading-xl" style={{ textAlign: 'center' }}>
                            Technology <span className="gradient-text">Evolution</span>
                        </h2>
                        <div className="nexus-status-indicator">
                            <span className="status-bit">CORE_SYNC: ONLINE</span>
                            <span className="status-bit">NODES: 06/06</span>
                            <span className="status-bit">SECURITY: VANTAGE</span>
                        </div>
                    </div>

                    <div className="nexus-timeline-container">
                        {/* The Central Neural Spine */}
                        <div className="nexus-spine">
                            <div className="spine-base" />
                            <div className="spine-progress-fill" />
                            <div className="spine-glimmer" />
                        </div>

                        <div className="nexus-nodes-grid">
                            {timeline.map((item, i) => (
                                <div className={`nexus-node-wrap ${i % 2 === 0 ? 'left' : 'right'}`} key={i}>
                                    {/* Central Marker */}
                                    <div className="nexus-marker">
                                        <div className="marker-ring" />
                                        <div className="marker-core" />
                                        <div className="marker-year">{item.year}</div>
                                    </div>

                                    {/* Content Card */}
                                    <div className="nexus-card-track">
                                        <motion.div
                                            className="nexus-card-premium"
                                            style={{ "--rotate-y": i % 2 === 0 ? "2deg" : "-2deg" }}
                                            initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100, scale: 0.9, rotateY: i % 2 === 0 ? 10 : -10 }}
                                            whileInView={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                            viewport={{ once: true, margin: "-100px" }}
                                        >
                                            <div className="nexus-card-content">
                                                <div className="card-top-info">
                                                    <span className="tag-nexus-index">MODULE_{item.phase}</span>
                                                    <div className="tag-nexus-status">
                                                        <span className="pulse-dot-small" /> {item.status}
                                                    </div>
                                                </div>

                                                <h3 className="nexus-card-title">{item.title}</h3>
                                                <div className="nexus-card-divider" />
                                                <p className="nexus-card-desc">{item.desc}</p>

                                                <div className="nexus-card-footer">
                                                    <div className="footer-code">THRD_CHRONO_{item.year}_v04</div>
                                                    <div className="footer-scan-line" />
                                                </div>
                                            </div>

                                            {/* Tech accents */}
                                            <div className="nexus-card-bracket tl" />
                                            <div className="nexus-card-bracket br" />
                                            <div className="nexus-card-scanner" />
                                        </motion.div>
                                    </div>

                                    {/* Connector Beam */}
                                    <div className="nexus-connector-beam" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 8: Video Showcase — Operations */}
            <section className="about-section about-section-alt">
                <div className="container">
                    <div className="about-video-block about-split">
                        <div className="about-video-panel about-video-large">
                            <img src={eyeImg} alt="The3rdAI Vision" loading="lazy" />
                            <div className="about-video-overlay" />
                        </div>
                        <div>
                            <div className="section-label">Operational Excellence</div>
                            <h2 className="heading-lg">Where AI Meets <span className="gradient-text">Real-World Impact</span></h2>
                            <p className="text-body" style={{ marginTop: '20px' }}>
                                From concept to deployment, our systems are battle-tested in the most demanding environments. Airports, government facilities, smart city networks, and critical infrastructure around the world rely on The3rdAI.
                            </p>
                            <div className="about-metrics">
                                <div className="about-metric">
                                    <span className="about-metric-val">99.99%</span>
                                    <span className="about-metric-lbl">System Uptime</span>
                                </div>
                                <div className="about-metric">
                                    <span className="about-metric-val">1B+</span>
                                    <span className="about-metric-lbl">Frames/Day</span>
                                </div>
                                <div className="about-metric">
                                    <span className="about-metric-val">0.3ms</span>
                                    <span className="about-metric-lbl">Avg Response</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 9: Global Expansion */}
            <section className="about-section about-global about-reveal">
                <div className="container" style={{ textAlign: 'center' }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>Global Expansion</div>
                    <h2 className="heading-xl">
                        Intelligence Without{' '}
                        <span className="gradient-text">Borders.</span>
                    </h2>
                    <p className="text-body" style={{ maxWidth: '600px', margin: '20px auto 60px' }}>
                        Expanding across continents with powerful CCTV deployments. From gated communities to enterprise infrastructure, The3rdAI scales without compromise.
                    </p>
                    <div className="about-global-stats">
                        <div className="about-global-stat">
                            <span className="about-stat-num gradient-text">50+</span>
                            <span className="about-stat-label">Cities</span>
                        </div>
                        <div className="about-global-stat">
                            <span className="about-stat-num gradient-text">12K+</span>
                            <span className="about-stat-label">Devices</span>
                        </div>
                        <div className="about-global-stat">
                            <span className="about-stat-num gradient-text">8</span>
                            <span className="about-stat-label">Countries</span>
                        </div>
                        <div className="about-global-stat">
                            <span className="about-stat-num gradient-text">1B+</span>
                            <span className="about-stat-label">Frames/Day</span>
                        </div>
                    </div>
                </div>
            </section>
        </motion.main>
    )
})

About.displayName = 'About'

export default About
