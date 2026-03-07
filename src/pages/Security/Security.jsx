import { useEffect, useRef, memo } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import cctvVideo from '../../assets/videos/cctv cameraVideo.mp4'
import storeVideo from '../../assets/videos/Suspicious_Behavior_Detected_CCTV_Footage.mp4'
import parkingVideo from '../../assets/videos/wareHouseCamra.mp4'
import tollVideo from '../../assets/videos/tollCamra.mp4'
import shopGridVideo from '../../assets/videos/shopingGrid.mp4'
import trafficGridVideo from '../../assets/videos/traficGrid.mp4'
import trafficStopLine1 from '../../assets/traficReltedImage/StopLineCross.jpg'
import trafficStopLine2 from '../../assets/traficReltedImage/StopLineCross2.jpg'
import trafficTripling1 from '../../assets/traficReltedImage/TriplingBike.jpg'
import trafficTripling2 from '../../assets/traficReltedImage/triplingBike2.jpg'
import trafficTripling3 from '../../assets/traficReltedImage/TriplingBike3.jpg'
import trafficZebra from '../../assets/traficReltedImage/zebraCrosingViolation.jpg'
import monitorScreen from '../../assets/traficReltedImage/monitorScreen.jpg'
import trackImg from '../../assets/images/traackingScreen.jpg'
import multiMonitorImg from '../../assets/images/multpipleMonitoreScreen.jpg'
import heroImg from '../../assets/images/security_bg.jpg'
import './Security.css'

gsap.registerPlugin(ScrollTrigger)

const trafficViolations = [
    { title: 'Stop Line Violation', type: 'ENFORCEMENT', msg: 'ACCURACY: 99.8%', id: 'TL-01', img: trafficStopLine1, color: '#ff3b3b' },
    { title: 'Triple Riding Detection', type: 'BEHAVIORAL', msg: 'DETECTED: 3 TARGETS', id: 'TR-42', img: trafficTripling1, color: '#ffb800' },
    { title: 'Zebra Crossing Invasion', type: 'SAFETY', msg: 'PEDESTRIAN RISK: HIGH', id: 'ZC-09', img: trafficZebra, color: '#00f0ff' },
    { title: 'Multiple Violation Sync', type: 'TRACKING', msg: 'SYNCED: GEO-CORE', id: 'MV-88', img: trafficStopLine2, color: '#7000ff' },
    { title: 'Helmet Detection Lock', type: 'ENFORCEMENT', msg: 'STATUS: NON-COMPLIANT', id: 'HD-13', img: trafficTripling2, color: '#ff3b3b' },
    { title: 'Complex Scene Analysis', type: 'NEURAL', msg: 'DEPTH: 47 LAYERS', id: 'CS-05', img: trafficTripling3, color: '#00f0ff' },
]

const techSections = [
    {
        id: 'vision-core', label: 'CORE ENGINE', title: 'Vision AI Core', icon: '👁️',
        desc: 'A multi-layered neural architecture processing millions of frames per second. Our proprietary vision engine uses transformer-based models fine-tuned on security-specific datasets, delivering unmatched accuracy in real-world conditions.',
        detail: 'The Vision AI Core employs a hierarchical attention mechanism that processes visual data through 47 neural layers. Each layer specializes in different aspects — from edge detection to semantic understanding to temporal pattern recognition.',
        specs: [{ label: 'Processing', value: '2M+ FPS' }, { label: 'Accuracy', value: '99.4%' }, { label: 'Latency', value: '<0.3ms' }],
        video: cctvVideo,
    },
    {
        id: 'behavior', label: 'BEHAVIORAL AI', title: 'Behavioral Pattern Analysis', icon: '🧠',
        desc: 'Beyond simple detection — our behavioral engine analyzes movement patterns, group dynamics, and contextual anomalies. It learns the normal rhythm of any environment and instantly identifies deviations.',
        detail: 'Trained on 100M+ hours of surveillance footage, the behavioral engine creates dynamic baseline models for every monitored space. It understands crowd patterns, individual trajectories, and group formations.',
        specs: [{ label: 'Patterns', value: '500+' }, { label: 'Learning', value: 'Real-time' }, { label: 'Prediction', value: '15min' }],
        video: storeVideo,
    },
    {
        id: 'threat-prediction', label: 'PREDICTION MODEL', title: 'Threat Prediction Model', icon: '⚡',
        desc: 'Anticipate before it happens. Our predictive model uses temporal analysis, trajectory forecasting, and intent classification to identify threats before they materialize.',
        detail: 'The prediction engine uses a custom recurrent transformer architecture that maintains temporal context across thousands of frames, identifying patterns invisible to human observers.',
        specs: [{ label: 'Forecast', value: '15min+' }, { label: 'Confidence', value: '94.8%' }, { label: 'False Rate', value: '0.001%' }],
        video: parkingVideo,
    },
    {
        id: 'neural-mapping', label: 'NEURAL MAP', title: 'AI Neural Mapping', icon: '🗺️',
        desc: 'Comprehensive 3D spatial awareness built from camera feeds. Our neural mapping system creates a living digital twin of any environment, enabling precise location tracking and spatial analytics.',
        detail: 'Using multi-camera triangulation and depth estimation networks, the system constructs a real-time 3D model accurate to within 2cm. This enables precise zone-based alerting and path prediction.',
        specs: [{ label: 'Dimensions', value: '3D' }, { label: 'Update', value: '60Hz' }, { label: 'Accuracy', value: '±2cm' }],
        image: multiMonitorImg,
    },
    {
        id: 'encryption', label: 'DATA SECURITY', title: 'Data Encryption Architecture', icon: '🔐',
        desc: 'Advanced data protection at every layer. AES-256 encryption in transit and at rest, hardware security modules, zero-trust architecture, and air-gapped processing options.',
        detail: 'All data streams are encrypted using AES-256-GCM with rotating keys managed by HSM clusters. The zero-trust architecture validates every request against multi-factor identity verification.',
        specs: [{ label: 'Encryption', value: 'AES-256' }, { label: 'Standard', value: 'FIPS-140-2' }, { label: 'Auth', value: 'Zero-Trust' }],
        image: trackImg,
    },
    {
        id: 'edge-cloud', label: 'HYBRID SYSTEM', title: 'Edge + Cloud Hybrid', icon: '☁️',
        desc: 'On-device AI for instant response combined with cloud-based deep analytics. Critical decisions happen at the edge in microseconds while the cloud handles pattern learning.',
        detail: 'Our edge devices run optimized TensorRT models achieving 2ms inference time. Cloud sync happens asynchronously, enabling cross-site learning and federated model improvements.',
        specs: [{ label: 'Edge', value: '<1ms' }, { label: 'Cloud', value: 'Unlimited' }, { label: 'Sync', value: 'Real-time' }],
        video: tollVideo,
    },
    {
        id: 'response', label: 'AUTOMATION', title: 'Response Automation Engine', icon: '🤖',
        desc: 'From detection to action in milliseconds. Configurable response protocols automate lockdowns, alert dispatch, recording activation, and third-party integrations.',
        detail: 'The automation engine supports 200+ pre-built response protocols and a visual workflow builder for custom sequences. Each protocol chains detection → classification → decision → action flows.',
        specs: [{ label: 'Response', value: '<50ms' }, { label: 'Protocols', value: '200+' }, { label: 'Integrations', value: 'Open API' }],
        video: shopGridVideo,
    },
]

const capabilities = [
    { title: 'Multi-Object Tracking', desc: 'Track 500+ objects simultaneously across multiple camera feeds with persistent ID assignment.' },
    { title: 'Scene Understanding', desc: 'Contextual analysis of environments including weather, lighting, occupancy and spatial relationships.' },
    { title: 'Anomaly Detection', desc: 'Detect deviations from learned baselines — unauthorized access, unusual times, abnormal behaviors.' },
    { title: 'Cross-Camera Handoff', desc: 'Seamless target tracking across camera boundaries with re-identification accuracy of 97.3%.' },
    { title: 'Temporal Analysis', desc: 'Process historical patterns to predict future events with up to 15-minute prediction windows.' },
    { title: 'Real-Time Classification', desc: 'Classify 200+ object categories with sub-millisecond inference on edge devices.' },
]

const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
}

const Security = memo(() => {
    const pageRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.security-block').forEach((block, i) => {
                const dir = i % 2 === 0 ? -60 : 60
                gsap.fromTo(block,
                    { opacity: 0, x: dir },
                    {
                        opacity: 1, x: 0, duration: 0.8,
                        scrollTrigger: { trigger: block, start: 'top 75%', toggleActions: 'play none none reverse' }
                    }
                )
            })

            gsap.fromTo('.blueprint-line',
                { scaleX: 0 },
                {
                    scaleX: 1, duration: 1, stagger: 0.1, transformOrigin: 'left center',
                    scrollTrigger: { trigger: '.security-hero', start: 'top 80%', toggleActions: 'play none none reverse' }
                }
            )

            gsap.fromTo('.capability-item',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.5, stagger: 0.08,
                    scrollTrigger: { trigger: '.capabilities-grid', start: 'top 75%', toggleActions: 'play none none reverse' }
                }
            )

            gsap.fromTo('.security-cta-box',
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1, scale: 1, duration: 1,
                    scrollTrigger: { trigger: '.security-cta', start: 'top 70%', toggleActions: 'play none none reverse' }
                }
            )
        }, pageRef)

        return () => ctx.revert()
    }, [])

    return (
        <motion.main className="security-page" ref={pageRef} variants={pageVariants} initial="initial" animate="animate" exit="exit">

            {/* Hero */}
            <section className="security-hero">
                <div className="security-hero-bg" style={{ backgroundImage: `url(${heroImg})` }} />
                <div className="security-hero-gradient" />
                <div className="blueprint-bg">
                    {[...Array(8)].map((_, i) => (
                        <div className="blueprint-line" key={i} style={{ top: `${12 + i * 12}%` }} />
                    ))}
                </div>
                <div className="container" style={{ position: 'relative' }}>
                    <div className="section-label">Security Technology</div>
                    <h1 className="heading-xl">
                        Powerful AI{' '}
                        <span className="gradient-text">CCTV Detection</span>
                    </h1>
                    <p className="text-body" style={{ maxWidth: '600px', marginTop: '20px' }}>
                        Seven layers of cutting-edge AI technology form the backbone of an impenetrable security infrastructure.
                    </p>
                    <div className="security-hero-stats">
                        <div className="sec-hero-stat">
                            <span className="sec-hero-stat-val">7</span>
                            <span className="sec-hero-stat-lbl">AI Layers</span>
                        </div>
                        <div className="sec-hero-stat">
                            <span className="sec-hero-stat-val">47</span>
                            <span className="sec-hero-stat-lbl">Neural Layers</span>
                        </div>
                        <div className="sec-hero-stat">
                            <span className="sec-hero-stat-val">2M+</span>
                            <span className="sec-hero-stat-lbl">FPS Capacity</span>
                        </div>
                    </div>
                </div>
            </section>


            {/* 1. Vision AI Core - IMMERSIVE SCANNER */}
            <section className="vision-core-section">
                <div className="vision-scanner-bg">
                    <video autoPlay loop muted playsInline className="vision-video" preload="none">
                        <source src={cctvVideo} type="video/mp4" />
                    </video>
                    <div className="vision-scanner-overlay" />
                    <div className="vision-laser-line" />
                </div>
                <div className="container">
                    <div className="vision-content-grid">
                        <div className="vision-info-card">
                            <div className="section-label">CORE ENGINE</div>
                            <h2 className="heading-lg">Vision AI Core</h2>
                            <p className="text-body">{techSections[0].desc}</p>
                            <div className="vision-specs-minimal">
                                {techSections[0].specs.map((spec, j) => (
                                    <div className="v-spec" key={j}>
                                        <div className="v-spec-val">{spec.value}</div>
                                        <div className="v-spec-lbl">{spec.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="vision-hud-elements">
                            <div className="hud-aim-box">
                                <span className="hud-corner tl" />
                                <span className="hud-corner tr" />
                                <span className="hud-corner bl" />
                                <span className="hud-corner br" />
                                <div className="hud-scan-text">TARGET_LOCK: ACTIVE</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Behavioral AI - KINETIC SPLIT */}
            <section className="behavioral-kinetic-section">
                <div className="container">
                    <div className="kinetic-grid">
                        <div className="kinetic-visual">
                            <div className="kinetic-card-wrapper">
                                <video autoPlay loop muted playsInline className="kinetic-video" preload="none">
                                    <source src={storeVideo} type="video/mp4" />
                                </video>
                                <div className="kinetic-trails-overlay" />
                                <div className="kinetic-node n1" />
                                <div className="kinetic-node n2" />
                            </div>
                        </div>
                        <div className="kinetic-info">
                            <div className="section-label">BEHAVIORAL AI</div>
                            <h2 className="heading-lg">Behavioral Pattern Analysis</h2>
                            <p className="text-body">{techSections[1].desc}</p>
                            <p className="text-body detail">{techSections[1].detail}</p>
                            <div className="kinetic-stats-row">
                                {techSections[1].specs.map((spec, j) => (
                                    <div className="k-stat" key={j}>
                                        <div className="k-stat-val">{spec.value}</div>
                                        <div className="k-stat-lbl">{spec.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Threat Prediction - COMMAND DECK */}
            <section className="threat-prediction-section">
                <div className="prediction-grid-bg" />
                <div className="container">
                    <div className="prediction-header">
                        <div className="section-label" style={{ justifyContent: 'center' }}>PREDICTION MODEL</div>
                        <h2 className="heading-xl">Threat Prediction <span className="gradient-text">Telemetry</span></h2>
                    </div>
                    <div className="prediction-deck">
                        <div className="prediction-main-feed">
                            <video autoPlay loop muted playsInline preload="none">
                                <source src={parkingVideo} type="video/mp4" />
                            </video>
                            <div className="feed-scan-glow" />
                        </div>
                        <div className="prediction-cards-cluster">
                            <div className="p-card alert">
                                <div className="p-card-icon">⚠️</div>
                                <h4>Proactive Detection</h4>
                                <p>Anticipate threats before they materialize with 15-minute windows.</p>
                            </div>
                            <div className="p-card latency">
                                <div className="p-card-tag">LATENCY</div>
                                <div className="p-card-val">0.3ms</div>
                                <div className="p-card-graph" />
                            </div>
                            <div className="p-card confidence">
                                <div className="p-card-tag">CONFIDENCE</div>
                                <div className="p-card-val">94.8%</div>
                                <div className="p-card-bar"><div className="fill" style={{ width: '94.8%' }} /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Neural Mapping - DIGITAL TWIN VIEWPORT */}
            <section className="neural-mapping-viewport">
                <div className="viewport-container">
                    <img src={multiMonitorImg} alt="Neural Mapping" className="viewport-img" loading="lazy" />
                    <div className="viewport-overlay">
                        <div className="viewport-scanner-ring" />
                        <div className="viewport-data-stream">
                            {[...Array(5)].map((_, i) => (
                                <div className="data-bit" key={i} style={{ animationDelay: `${i * 0.5}s` }}>LIDAR_POINT_{842 + i}_SYNCED</div>
                            ))}
                        </div>
                    </div>
                    <div className="viewport-info-overlay">
                        <div className="container">
                            <div className="viewport-glass-card">
                                <div className="section-label">NEURAL MAP</div>
                                <h2 className="heading-lg">AI Neural Mapping</h2>
                                <p className="text-body">{techSections[3].desc}</p>
                                <div className="v-specs-grid">
                                    {techSections[3].specs.map((spec, j) => (
                                        <div className="v-mini-spec" key={j}>
                                            <span className="v-lbl">{spec.label}:</span>
                                            <span className="v-val">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Data Encryption - HEX SHIELD */}
            <section className="encryption-shield-section">
                <div className="hex-grid-container">
                    <div className="hex-grid" />
                </div>
                <div className="container">
                    <div className="shield-flex">
                        <div className="shield-visual">
                            <div className="shield-core">
                                <div className="shield-rings">
                                    <div className="ring r1" />
                                    <div className="ring r2" />
                                    <div className="ring r3" />
                                </div>
                                <img src={trackImg} alt="Encryption" className="shield-img" loading="lazy" />
                                <div className="shield-lock-icon">🔐</div>
                            </div>
                        </div>
                        <div className="shield-info">
                            <div className="section-label">DATA SECURITY</div>
                            <h2 className="heading-lg">Encryption <span className="blue-gradient-text">Architecture</span></h2>
                            <p className="text-body">{techSections[4].desc}</p>
                            <div className="encryption-features">
                                <div className="e-feat">AES-256-GCM</div>
                                <div className="e-feat">Zero-Trust</div>
                                <div className="e-feat">Hardware HSM</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Edge + Cloud - HYBRID DYNAMICS */}
            <section className="hybrid-dynamics-section">
                <div className="container">
                    <div className="hybrid-header">
                        <div className="section-label" style={{ justifyContent: 'center' }}>HYBRID SYSTEM</div>
                        <h2 className="heading-lg">Edge + Cloud <span className="gradient-text">Intelligence Flow</span></h2>
                    </div>
                    <div className="hybrid-visual-flow">
                        <div className="hybrid-node edge">
                            <div className="node-icon">📡</div>
                            <h3>EDGE DEVICE</h3>
                            <p>Instant Inference</p>
                            <div className="node-stat">{"<"}1ms</div>
                        </div>
                        <div className="hybrid-conduit">
                            <div className="data-beams">
                                {[...Array(3)].map((_, i) => (
                                    <div className="beam" key={i} style={{ animationDelay: `${i * 1}s` }} />
                                ))}
                            </div>
                            <div className="conduit-label">NEURAL SYNCHRONIZATION</div>
                        </div>
                        <div className="hybrid-node cloud">
                            <div className="node-icon">☁️</div>
                            <h3>AI CLOUD</h3>
                            <p>Deep Learning</p>
                            <div className="node-stat">UNLIMITED</div>
                        </div>
                    </div>
                    <div className="hybrid-video-preview">
                        <video autoPlay loop muted playsInline preload="none">
                            <source src={tollVideo} type="video/mp4" />
                        </video>
                        <div className="video-overlay-text">REAL-TIME TRAFFIC EDGE PROCESSING</div>
                    </div>
                </div>
            </section>

            {/* 7. Response Automation - LOGIC FLOW */}
            <section className="response-automation-section">
                <div className="automation-lines-bg" />
                <div className="container">
                    <div className="automation-grid">
                        <div className="automation-info">
                            <div className="section-label">AUTOMATION</div>
                            <h2 className="heading-lg">Response Engine</h2>
                            <p className="text-body">{techSections[6].desc}</p>
                            <div className="automation-steps">
                                <div className="auto-step">
                                    <span className="step-num">01.</span>
                                    <span>DETECTION_TRIGGER</span>
                                </div>
                                <div className="auto-step">
                                    <span className="step-num">02.</span>
                                    <span>AI_CLASSIFICATION</span>
                                </div>
                                <div className="auto-step">
                                    <span className="step-num">03.</span>
                                    <span>PROTOCOL_EXECUTION</span>
                                </div>
                            </div>
                        </div>
                        <div className="automation-visual">
                            <div className="response-video-card">
                                <video autoPlay loop muted playsInline preload="none">
                                    <source src={shopGridVideo} type="video/mp4" />
                                </video>
                                <div className="response-hud">
                                    <div className="hud-alert-box">ACTION: ALERT_DISPATCHED</div>
                                    <div className="hud-line-anim" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Traffic Enforcement - DIVERSE INTELLIGENCE MODES */}
            <section className="traffic-diverse-section">
                <div className="container">
                    <div className="traffic-section-header">
                        <div className="section-label glow-text">INTELLIGENT ENFORCEMENT</div>
                        <h2 className="heading-xl">City-Scale <span className="gradient-text">Traffic Autonomy</span></h2>
                    </div>

                    <div className="diverse-showcase">
                        {/* 1. Stop Line Violation - SPLIT SCREEN MODE */}
                        <div className="diverse-block split-mode">
                            <div className="diverse-visual">
                                <img src={trafficStopLine1} alt="Stop Line" loading="lazy" />
                                <div className="visual-scan-sweep" />
                                <div className="visual-tag top-left">ENFORCEMENT_CORE</div>
                            </div>
                            <div className="diverse-content">
                                <div className="content-meta">MODE: THERMAL_DETECTION</div>
                                <h3 className="diverse-title">Stop Line <span className="cyan-text">Precision</span></h3>
                                <p className="diverse-desc">Our neural engine isolates the violation event from complex urban clutter with 99.8% accuracy. The system automatically logs the event and prepares the protocol response.</p>
                                <div className="diverse-stats-row">
                                    <div className="d-stat"><span className="val">0.3ms</span><span className="lbl">LATENCY</span></div>
                                    <div className="d-stat"><span className="val">99.8%</span><span className="lbl">ACCURACY</span></div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Triple Riding - DATA GLASS MODE */}
                        <div className="diverse-block glass-mode">
                            <div className="glass-container">
                                <img src={trafficTripling1} alt="Triple Riding" className="glass-img" loading="lazy" />
                                <div className="glass-overlay" />
                                <div className="glass-content">
                                    <div className="glass-label">BEHAVIORAL_AI</div>
                                    <h3 className="glass-title">Triple Rider <span className="gold-text">Identification</span></h3>
                                    <p className="glass-desc">Beyond simple detection — our behavioral engine analyzes movement patterns and contextual anomalies.</p>
                                    <div className="glass-hud">
                                        <div className="hud-metric">TARGETS: 03</div>
                                        <div className="hud-progress"><div className="fill" style={{ width: '88%' }} /></div>
                                    </div>
                                </div>
                                <div className="glass-id">ID: B-AI_TR42</div>
                            </div>
                        </div>

                        {/* 3. Zebra Crossing - TACTICAL CORNER MODE */}
                        <div className="diverse-block tactical-mode">
                            <div className="tactical-grid">
                                <div className="tactical-info">
                                    <div className="section-label" style={{ margin: 0 }}>SAFETY_PROTOCOL</div>
                                    <h3 className="diverse-title">Zebra Crossing <span className="cyan-text">Invasion</span></h3>
                                    <div className="tactical-points">
                                        <div className="t-point"><span></span>PEDESTRIAN_RISK: HIGH</div>
                                        <div className="t-point"><span></span>SYNCED: GEO-CORE</div>
                                    </div>
                                    <p className="diverse-desc">Spatial understanding of road markers and traffic signals for logic enforcement.</p>
                                </div>
                                <div className="tactical-visual">
                                    <div className="tactical-frame">
                                        <img src={trafficZebra} alt="Zebra Crossing" loading="lazy" />
                                        <div className="frame-corners" />
                                        <div className="frame-scanner" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4. Helmet Detection - ANALYSIS MODE */}
                        <div className="diverse-block analysis-mode">
                            <div className="analysis-visual-wrap">
                                <img src={trafficTripling2} alt="Helmet Detection" loading="lazy" />
                                <div className="analysis-target-box" />
                                <div className="analysis-scanner-line" />
                            </div>
                            <div className="analysis-sidebar">
                                <div className="analysis-header">
                                    <div className="analysis-label">OBJECT_ANALYSIS</div>
                                    <h3 className="analysis-title">Helmet Detection <span className="cyan-text">Lock</span></h3>
                                </div>
                                <div className="analysis-data-grid">
                                    <div className="analysis-stat">
                                        <span className="label">TARGET_TYPE</span>
                                        <span className="value">RIDER_HEAD</span>
                                    </div>
                                    <div className="analysis-stat">
                                        <span className="label">DETECTION</span>
                                        <span className="value alert">NEGATIVE</span>
                                    </div>
                                    <div className="analysis-stat">
                                        <span className="label">CONFIDENCE</span>
                                        <span className="value">99.2%</span>
                                    </div>
                                    <div className="analysis-stat">
                                        <span className="label">PROTOCOL</span>
                                        <span className="value">LOG_EVENT</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 5. Multiple Violation Sync - RADAR SCROLL MODE */}
                        <div className="diverse-block radar-mode">
                            <div className="radar-grid">
                                <div className="radar-visual">
                                    <div className="radar-dish">
                                        <img src={trafficStopLine2} alt="Multi Violation" loading="lazy" />
                                        <div className="radar-rings" />
                                        <div className="radar-sweep" />
                                        <div className="target-marker tm1" />
                                        <div className="target-marker tm2" />
                                    </div>
                                </div>
                                <div className="radar-info">
                                    <div className="radar-label">GEO_SYNCHRONIZED</div>
                                    <h3 className="diverse-title">Multi-Violation <span className="purple-text">Sync</span></h3>
                                    <p className="diverse-desc">Cross-referencing multiple telemetry sources to identify compound violations in high-density urban corridors.</p>
                                    <div className="radar-stats">
                                        <div className="rs-item"><span></span>NODES: 32</div>
                                        <div className="rs-item"><span></span>PING: 12ms</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 6. Complex Scene Analysis - PROJECTION DEPTH MODE */}
                        <div className="diverse-block projection-mode">
                            <div className="proj-container">
                                <img src={trafficTripling3} alt="Scene Analysis" className="proj-bg" loading="lazy" />
                                <div className="proj-overlay" />
                                <div className="proj-hud">
                                    <div className="proj-label">DEEP_NEURAL_MESH</div>
                                    <h3 className="diverse-title">Complex Scene <span className="cyan-text">Synthesis</span></h3>
                                    <div className="proj-data-strip">
                                        <div className="strip-item">LAYER_DEPTH: 47</div>
                                        <div className="strip-item">OBJECT_COUNT: 142</div>
                                    </div>
                                </div>
                                <div className="proj-wireframe" />
                                <div className="proj-corner tr" /><div className="proj-corner bl" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>




            {/* 7. Neural Hub - REDESIGNED */}
            <section className="neural-hub-section">
                <div className="hub-atmosphere">
                    <div className="hub-data-beams" />
                    <div className="hub-binary-overlay" />
                </div>
                <div className="container">
                    <div className="hub-layout">
                        <div className="hub-content">
                            <div className="section-label neon-label">Advanced Intelligence</div>
                            <h2 className="heading-lg">Neural <span className="blue-gradient-text">Pattern Synthesis</span></h2>
                            <p className="hub-subtitle">Translating raw visual streams into actionable cognitive maps.</p>

                            <div className="hub-features">
                                <div className="hub-card">
                                    <div className="hub-card-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    </div>
                                    <div className="hub-card-text">
                                        <h4>Multi-Vehicle Re-ID</h4>
                                        <p>Global persistence for individual targets across disconnected network nodes.</p>
                                    </div>
                                </div>

                                <div className="hub-card">
                                    <div className="hub-card-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2">
                                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                            <polyline points="3.29 7 12 12 20.71 7" />
                                            <line x1="12" y1="22" x2="12" y2="12" />
                                        </svg>
                                    </div>
                                    <div className="hub-card-text">
                                        <h4>Intersection Awareness</h4>
                                        <p>Context-aware logic mapping for complex multi-lane maneuver detection.</p>
                                    </div>
                                </div>

                                <div className="hub-card">
                                    <div className="hub-card-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2">
                                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                        </svg>
                                    </div>
                                    <div className="hub-card-text">
                                        <h4>Flow Analytics</h4>
                                        <p>Predictive density forecasting through deep-temporal behavioral modeling.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hub-visualization">
                            <div className="monitor-frame">
                                <div className="monitor-header">
                                    <div className="header-dots">
                                        <span className="dot" /><span className="dot" /><span className="dot" />
                                    </div>
                                    <span className="title">GEO_NODE: TRAFFIC_MATRIX_04</span>
                                </div>
                                <div className="monitor-screen">
                                    <img src={monitorScreen} alt="Neural Pattern Analysis" loading="lazy" />
                                    <div className="neural-overlay-active" />
                                    <div className="monitor-scan" />

                                    <div className="hud-callouts">
                                        <div className="h-callout top-left">
                                            <div className="c-line" />
                                            <div className="c-box">LAT: 28.6139</div>
                                        </div>
                                        <div className="h-callout bottom-right">
                                            <div className="c-line" />
                                            <div className="c-box">CONG_DETECTED: TRUE</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="monitor-footer">
                                    <div className="f-stat">NODE_ID: 8821</div>
                                    <div className="f-stat">UPTIME: 99.98%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Intelligence Specifications - ASYMMETRIC REDESIGN */}
            <section className="spec-mosaic-section">
                <div className="container">
                    <div className="matrix-header">
                        <div className="section-label glow-text">Core Capabilities</div>
                        <h2 className="heading-xl">Intelligence <span className="gradient-text">Specifications</span></h2>
                    </div>

                    <div className="mosaic-grid">
                        {capabilities.map((cap, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className={`mosaic-blade b${i + 1}`}
                            >
                                <div className="blade-inner">
                                    <div className="blade-number">0{i + 1}</div>
                                    <div className="blade-tag">SPEC_LOG</div>
                                    <h3 className="blade-title">{cap.title}</h3>
                                    <p className="blade-desc">{cap.desc}</p>

                                    <div className="blade-glitch" />
                                    <div className="blade-scanner" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Showcase Banner */}
            <section className="security-video-banner">
                <video autoPlay loop muted playsInline className="security-banner-video" preload="none">
                    <source src={trafficGridVideo} type="video/mp4" />
                </video>
                <div className="security-banner-overlay" />
                <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>Live Intelligence</div>
                    <h2 className="heading-xl">
                        Every Frame.{' '}
                        <span className="gradient-text">Every Threat.</span>
                    </h2>
                    <p className="text-body" style={{ maxWidth: '560px', margin: '16px auto 0' }}>
                        Processing millions of video streams simultaneously with advanced AI neural architecture.
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="security-section security-cta">
                <div className="grid-bg" />
                <div className="container">
                    <div className="security-cta-box">
                        <div className="section-label" style={{ justifyContent: 'center' }}>Ready to Deploy</div>
                        <h2 className="heading-lg" style={{ textAlign: 'center' }}>
                            Secure Your Infrastructure with{' '}<span className="gradient-text">Advanced AI CCTV</span>
                        </h2>
                        <p className="text-body" style={{ textAlign: 'center', maxWidth: '520px', margin: '16px auto 32px' }}>
                            Contact our intelligence team for a classified technology briefing and deployment assessment.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                            <a href="/contact" className="btn-primary"><span>Request Briefing</span></a>
                            <a href="/contact" className="btn-outline"><span>View Demo</span></a>
                        </div>
                    </div>
                </div>
            </section>
        </motion.main>
    )
})

Security.displayName = 'Security'

export default Security
