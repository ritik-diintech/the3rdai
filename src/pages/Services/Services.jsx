import { useEffect, useRef, memo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import storeTheftVideo from '../../assets/videos/StoreTheft.mp4'
import roofCamVideo from '../../assets/videos/roofCamaraActiviy.mp4'
import shopGridVideo from '../../assets/videos/shopingGrid.mp4'
import trafficGridVideo from '../../assets/videos/traficGrid.mp4'
import heroImg from '../../assets/images/service_bg.jpg'
import cctvImg from '../../assets/images/cctv.jpg'
import monitorImg from '../../assets/images/monitorScreen.jpg'
import './Services.css'

gsap.registerPlugin(ScrollTrigger)

const services = [
    {
        title: 'AI Theft Detection System',
        desc: 'Advanced computer vision models trained on millions of retail scenarios. Detects concealment, unusual handling patterns, and suspicious behavior in real-time with automated alert dispatch.',
        longDesc: 'Our theft detection AI analyzes body language, hand movements, and object interactions to identify shoplifting patterns. The system is trained on diverse retail environments and adapts to each store\'s specific layout and risk zones.',
        video: storeTheftVideo,
        stats: { accuracy: '99.4%', speed: '<50ms', coverage: '360°' },
        features: ['Real-time concealment detection', 'Behavioral baseline learning', 'Automated security dispatch', 'Court-ready evidence capture'],
    },
    {
        title: 'Smart CCTV Monitoring',
        desc: 'Transform existing camera infrastructure into intelligent vision systems. Our AI overlay adds object detection, path tracking, and behavioral analysis to any camera feed.',
        longDesc: 'No hardware replacement needed. Our software-defined vision layer integrates with any IP camera system, adding enterprise-grade AI capabilities through a simple software deployment.',
        image: cctvImg,
        stats: { cameras: '∞ Scale', fps: '60 FPS', uptime: '99.99%' },
        features: ['Zero hardware change required', 'Universal camera compatibility', 'Multi-stream processing', 'Cloud or on-premise deployment'],
    },
    {
        title: 'Automated Alert Intelligence',
        desc: 'Context-aware alert system that understands severity, eliminates false positives, and routes notifications based on configurable protocols.',
        longDesc: 'Priority-ranked for zero alert fatigue. Our AI classifies every event across 5 severity tiers and routes alerts through configurable channels — push, SMS, email, webhook, or API integration.',
        video: roofCamVideo,
        stats: { alerts: 'Smart', false_rate: '0.001%', delivery: '<1s' },
        features: ['5-tier severity classification', 'Multi-channel routing', 'Custom escalation rules', 'Historical pattern analysis'],
    },
    {
        title: 'Behavioral Recognition',
        desc: 'Deep neural networks analyze human behavioral patterns to predict intent. From crowd dynamics to individual trajectory analysis.',
        longDesc: 'Predict threats before they become incidents. Our behavioral AI creates dynamic baselines for every monitored space and flags deviations instantly — from loitering to aggressive postures to unauthorized access patterns.',
        video: shopGridVideo,
        stats: { patterns: '500+', prediction: '15min', learning: 'Continuous' },
        features: ['Loitering detection', 'Crowd density monitoring', 'Aggression recognition', 'Pattern anomaly flagging'],
    },
    {
        title: '24/7 AI Command Center',
        desc: 'A fully autonomous operation center powered by AI. Real-time dashboards, threat heatmaps, timeline replay, and predictive analytics.',
        longDesc: 'All managed by intelligent automation with human oversight. The command center provides a single pane of glass for all security operations — from a single building to an entire city.',
        image: monitorImg,
        stats: { monitoring: '24/7', zones: '∞', response: 'Auto' },
        features: ['Unified security dashboard', 'Threat heatmap visualization', 'Timeline replay & scrubbing', 'Predictive threat forecasting'],
    },
    {
        title: 'Vehicle Tracking Intelligence',
        desc: 'Advanced license plate recognition, vehicle classification, and trajectory tracking across multi-camera networks with parking analytics.',
        longDesc: 'Track vehicles from entry to exit across any property. Our system identifies make, model, color, and license plates with high accuracy, maintaining persistent tracking across camera boundaries.',
        video: trafficGridVideo,
        stats: { lpr_accuracy: '98.7%', tracking: 'Persistent', coverage: 'Multi-cam' },
        features: ['License plate recognition', 'Vehicle classification', 'Trajectory prediction', 'Parking analytics'],
    },
]

const processSteps = [
    { num: '01', title: 'Assessment', desc: 'Our engineers evaluate risk zones and design a custom deployment.' },
    { num: '02', title: 'Integration', desc: 'Seamless integration with existing cameras. Zero hardware changes.' },
    { num: '03', title: 'Training', desc: 'The AI learns your normal patterns and operational rhythms.' },
    { num: '04', title: 'Deployment', desc: 'Go live with autonomous monitoring and real-time threat detection.' },
    { num: '05', title: 'Optimization', desc: 'Continuous model refinement for increasing accuracy every day.' },
]

const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
}

const Services = memo(() => {
    const pageRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.layout-reveal').forEach((item) => {
                gsap.fromTo(item,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                        scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none reverse' }
                    }
                )
            })

            gsap.utils.toArray('.media-reveal').forEach((media) => {
                gsap.fromTo(media,
                    { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
                    {
                        opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: "power3.out",
                        scrollTrigger: { trigger: media, start: 'top 80%', toggleActions: 'play none none reverse' }
                    }
                )
            })

            gsap.utils.toArray('.stat-reveal').forEach((stat, i) => {
                gsap.fromTo(stat,
                    { opacity: 0, x: -20 },
                    {
                        opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
                        scrollTrigger: { trigger: stat, start: 'top 90%', toggleActions: 'play none none reverse' }
                    }
                )
            })

            gsap.fromTo('.process-step',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: '.process-grid', start: 'top 75%', toggleActions: 'play none none reverse' }
                }
            )

        }, pageRef)

        return () => ctx.revert()
    }, [])

    const renderMedia = (src, isImage) => {
        if (isImage) {
            return <img src={src} alt="Service Visual" className="service-media-elem" loading="lazy" />
        }
        return (
            <video autoPlay loop muted playsInline preload="none" className="service-media-elem">
                <source src={src} type="video/mp4" />
            </video>
        )
    }

    return (
        <motion.main className="services-page" ref={pageRef} variants={pageVariants} initial="initial" animate="animate" exit="exit">

            {/* Hero Section */}
            <section className="services-hero">
                <div className="services-hero-bg" style={{ backgroundImage: `url(${heroImg})` }} />
                <div className="services-hero-gradient" />
                <div className="container" style={{ position: 'relative' }}>
                    <div className="section-label layout-reveal">Our Intelligence Capabilities</div>
                    <h1 className="heading-xl layout-reveal" style={{ marginTop: '20px' }}>
                        Architecting{' '}
                        <span className="gradient-text">Assurance.</span>
                    </h1>
                    <p className="text-body layout-reveal" style={{ maxWidth: '600px', marginTop: '24px', fontSize: '1.2rem' }}>
                        Each module is a paradigm shift in autonomous surveillance. Built for absolute precision, engineered to predict, designed to protect.
                    </p>
                </div>
            </section>

            {/* Layout 1: The Targeter */}
            <section className="layout-1 service-wrapper" id="service-0">
                <div className="container l1-container">
                    <div className="l1-media media-reveal">
                        <div className="l1-video-wrap">
                            {renderMedia(services[0].video, false)}
                            <div className="l1-overlay-scanner"></div>
                            <div className="scan-corners"></div>
                        </div>
                    </div>
                    <div className="l1-content layout-reveal">
                        <h2 className="heading-lg">{services[0].title}</h2>
                        <p className="text-body highlight-desc">{services[0].desc}</p>
                        <p className="text-body muted-desc">{services[0].longDesc}</p>

                        <div className="l1-stats-grid">
                            {Object.entries(services[0].stats).map(([k, v], i) => (
                                <div className="cyber-stat stat-reveal" key={i}>
                                    <div className="cyber-value">{v}</div>
                                    <div className="cyber-label">{k.replace('_', ' ')}</div>
                                </div>
                            ))}
                        </div>

                        <ul className="feature-list">
                            {services[0].features.map((f, i) => (
                                <li key={i} className="stat-reveal"><span className="dot"></span>{f}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Layout 2: Immersive Glass */}
            <section className="layout-2 service-wrapper" id="service-1">
                <div className="l2-bg media-reveal">
                    {renderMedia(services[1].image, true)}
                </div>
                <div className="l2-overlay"></div>
                <div className="container l2-container">
                    <div className="l2-content layout-reveal">
                        <div className="counter-badge">INTELLIGENCE_02</div>
                        <h2 className="heading-lg">{services[1].title}</h2>
                        <p className="text-body l2-desc">{services[1].desc}</p>
                        <div className="l2-divider"></div>

                        <div className="l2-features-grid">
                            {services[1].features.map((f, i) => (
                                <div className="l2-feature-chip stat-reveal" key={i}>{f}</div>
                            ))}
                        </div>

                        <div className="l2-stats">
                            {Object.entries(services[1].stats).map(([k, v], i) => (
                                <div className="l2-stat-item stat-reveal" key={i}>
                                    <span className="l2-v">{v}</span>
                                    <span className="l2-k">{k}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Layout 3: Core Hub */}
            <section className="layout-3 service-wrapper" id="service-2">
                <div className="container">
                    <div className="l3-header layout-reveal">
                        <h2 className="heading-lg gradient-text" style={{ textAlign: 'center' }}>{services[2].title}</h2>
                        <p className="text-body" style={{ textAlign: 'center', maxWidth: '700px', margin: '20px auto 0' }}>{services[2].longDesc}</p>
                    </div>

                    <div className="l3-hub media-reveal">
                        <div className="l3-media">
                            {renderMedia(services[2].video, false)}
                            <div className="l3-glow"></div>
                        </div>

                        <div className="l3-stats">
                            {Object.entries(services[2].stats).map(([k, v], i) => (
                                <div className="l3-stat-card stat-reveal" key={i}>
                                    <div className="l3-card-border"></div>
                                    <div className="l3-v">{v}</div>
                                    <div className="l3-k">{k.replace('_', ' ')}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Layout 4: Overlap Grid */}
            <section className="layout-4 service-wrapper" id="service-3">
                <div className="container l4-grid">
                    <div className="l4-content layout-reveal">
                        <h2 className="heading-lg">{services[3].title}</h2>
                        <p className="text-body" style={{ marginTop: '20px' }}>{services[3].desc}</p>

                        <div className="l4-features mt-6">
                            {services[3].features.map((f, i) => (
                                <div className="l4-f-item stat-reveal" key={i}>
                                    <div className="l4-f-icon">✦</div>
                                    <span>{f}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="l4-media media-reveal">
                        {renderMedia(services[3].video, false)}
                        <div className="l4-media-overlay"></div>
                    </div>
                    <div className="l4-stats-bar layout-reveal">
                        {Object.entries(services[3].stats).map(([k, v], i) => (
                            <div className="l4-stat-pill" key={i}>
                                <strong>{v}</strong> {k}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Layout 5: Dashboard Command Interface */}
            <section className="layout-5 service-wrapper" id="service-4">
                <div className="container">
                    <div className="l5-header layout-reveal">
                        <h2 className="heading-lg">{services[4].title}</h2>
                        <p className="text-body">{services[4].desc}</p>
                    </div>

                    <div className="l5-dash media-reveal">
                        <div className="l5-sidebar">
                            <div className="l5-panel-title">LIVE TELEMETRY</div>
                            {Object.entries(services[4].stats).map(([k, v], i) => (
                                <div className="l5-stat-panel stat-reveal" key={i}>
                                    <div className="l5-sl">{k}</div>
                                    <div className="l5-sv gradient-text">{v}</div>
                                </div>
                            ))}
                        </div>

                        <div className="l5-center">
                            <div className="l5-media-box">
                                {renderMedia(services[4].image, true)}
                                <div className="l5-hud-lines"></div>
                            </div>
                            <div className="l5-bottom-bar">SYSTEM ONLINE // STATUS: OPTIMAL</div>
                        </div>

                        <div className="l5-sidebar">
                            <div className="l5-panel-title">CAPABILITIES</div>
                            {services[4].features.map((f, i) => (
                                <div className="l5-feature-panel stat-reveal" key={i}>
                                    <div className="l5-f-dot"></div>
                                    <div className="l5-f-text">{f}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Layout 6: Wide Data Stream */}
            <section className="layout-6 service-wrapper" id="service-5">
                <div className="l6-header container layout-reveal">
                    <h2 className="heading-xl">{services[5].title}</h2>
                    <p className="text-body" style={{ maxWidth: '600px', marginTop: '16px' }}>{services[5].desc}</p>
                </div>

                <div className="l6-media-wrap media-reveal">
                    {renderMedia(services[5].video, false)}
                    <div className="l6-gradient-overlay"></div>
                    <div className="l6-content-box layout-reveal">
                        <h3 className="heading-sm" style={{ color: 'var(--cyan)' }}>Omni-Track Intelligence</h3>
                        <p className="text-body" style={{ marginTop: '10px' }}>{services[5].longDesc}</p>
                        <div className="l6-features">
                            {services[5].features.map((f, i) => <span key={i} className="l6-f-tag">{f}</span>)}
                        </div>
                    </div>
                </div>

                <div className="l6-stats-bar layout-reveal">
                    <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                        {Object.entries(services[5].stats).map(([k, v], i) => (
                            <div className="l6-stat-item stat-reveal" key={i}>
                                <div className="l6-sv">{v}</div>
                                <div className="l6-sk">{k.replace('_', ' ')}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Deployment Process */}
            <section className="deployment-process-section" style={{ padding: '160px 0', background: 'var(--bg-void)', position: 'relative', overflow: 'hidden' }}>
                <div className="dp-grid-bg"></div>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="layout-reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <div className="section-label" style={{ justifyContent: 'center' }}>Integration Protocol</div>
                        <h2 className="heading-xl mt-4">Seamless <span className="gradient-text">Deployment Architecture</span></h2>
                    </div>

                    <div className="deployment-roadmap">
                        <div className="dr-track">
                            <div className="dr-track-beam"></div>
                            <div className="dr-track-progress"></div>
                        </div>

                        <div className="process-grid">
                            {processSteps.map((step, i) => (
                                <div className="process-step" key={i}>
                                    <div className="ps-node">
                                        <div className="ps-node-inner"></div>
                                        <div className="ps-node-pulse"></div>
                                    </div>
                                    <div className={`ps-card ${i % 2 !== 0 ? 'ps-card-bottom' : 'ps-card-top'}`}>
                                        <div className="ps-card-glow"></div>
                                        <div className="ps-num">
                                            {step.num}
                                            <span className="ps-num-bg">{step.num}</span>
                                        </div>
                                        <h3 className="heading-sm mt-4" style={{ color: '#fff' }}>{step.title}</h3>
                                        <p className="text-body mt-2" style={{ fontSize: '0.9rem' }}>{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="service-cta">
                <div className="cta-glow"></div>
                <div className="container layout-reveal" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>Initialize</div>
                    <h2 className="heading-xl mt-4">
                        Secure Your{' '}<span className="gradient-text">Infrastructure.</span>
                    </h2>
                    <p className="text-body" style={{ maxWidth: '520px', margin: '20px auto 40px' }}>
                        Command center deployment available for enterprise integration within 48 hours.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                        <Link to="/contact" className="btn-primary"><span>Deploy Intelligence</span></Link>
                    </div>
                </div>
            </section>
        </motion.main>
    )
})

Services.displayName = 'Services'

export default Services
