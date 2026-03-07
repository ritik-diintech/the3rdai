import { useEffect, useRef, useState, memo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import cctvVideo from '../../../assets/videos/cctv cameraVideo.mp4'
import storeTheftVideo from '../../../assets/videos/StoreTheft.mp4'
import parkingVideo from '../../../assets/videos/parkingLotActiviy.mp4'
import storeVideo from '../../../assets/videos/storeCamra.mp4'

gsap.registerPlugin(ScrollTrigger)

const threats = [
    {
        id: 1,
        name: 'Theft Detection',
        desc: 'AI-powered real-time detection of suspicious handling, concealment patterns, and unauthorized removal of assets across retail and warehouse environments.',
        stats: [
            { value: '99.4%', label: 'Accuracy' },
            { value: '<50ms', label: 'Response' },
        ],
        video: storeTheftVideo,
        color: '#ff0044',
        tagline: 'ASSET PROTECTION',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
            </svg>
        ),
    },
    {
        id: 2,
        name: 'Intrusion Detection',
        desc: 'Perimeter breach identification using multi-layer vision analysis with zone-based alerting and automated lockdown protocols.',
        stats: [
            { value: '24/7', label: 'Monitoring' },
            { value: '0.001%', label: 'False Positive' },
        ],
        video: cctvVideo,
        color: '#00f0ff',
        tagline: 'PERIMETER SECURITY',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
            </svg>
        ),
    },
    {
        id: 3,
        name: 'Motion Anomaly',
        desc: 'Advanced anomaly detection engine identifies unusual movement patterns, crowd formations, and trajectory deviations in real-time.',
        stats: [
            { value: '500+', label: 'Targets/Frame' },
            { value: '3D', label: 'Mapping' },
        ],
        video: parkingVideo,
        color: '#00ff88',
        tagline: 'PATTERN ANALYSIS',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
        ),
    },
    {
        id: 4,
        name: 'Behavioral Prediction',
        desc: 'Deep neural networks analyze behavioral signatures to predict threats before they materialize, enabling proactive security responses.',
        stats: [
            { value: '15min', label: 'Prediction' },
            { value: '94.8%', label: 'Precision' },
        ],
        video: storeVideo,
        color: '#0066ff',
        tagline: 'THREAT FORECASTING',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.5 2A5.5 5.5 0 004 7.5c0 1.58.67 3 1.74 4.01L4 22l4-2 4 2-1.74-10.49A5.49 5.49 0 0015 7.5 5.5 5.5 0 009.5 2z" />
                <path d="M14.5 2A5.5 5.5 0 0120 7.5c0 1.58-.67 3-1.74 4.01L20 22l-4-2-4 2" />
            </svg>
        ),
    },
]

const ThreatEngine = memo(() => {
    const sectionRef = useRef(null)
    const sliderRef = useRef(null)
    const progressFillRef = useRef(null)
    const counterRef = useRef(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                setIsVisible(entry.isIntersecting)
            })
        }, { threshold: 0 })

        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const videos = document.querySelectorAll('.threat-visual video')
        videos.forEach((v, i) => {
            if (isVisible && i === activeIndex) {
                v.play().catch(() => { })
            } else {
                v.pause()
            }
        })
    }, [isVisible, activeIndex])

    useEffect(() => {
        const ctx = gsap.context(() => {
            const slides = gsap.utils.toArray('.threat-slide')
            if (slides.length <= 1) return

            const totalWidth = slides.length * window.innerWidth
            let lastIdx = 0

            gsap.to(sliderRef.current, {
                x: -(totalWidth - window.innerWidth),
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: () => `+=${totalWidth}`,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        // 1. Direct DOM update for progress fill
                        if (progressFillRef.current) {
                            progressFillRef.current.style.width = `${self.progress * 100}%`
                        }

                        // 2. Efficient index update
                        const currentIdx = Math.min(Math.floor(self.progress * (slides.length)), slides.length - 1)
                        if (currentIdx !== lastIdx) {
                            lastIdx = currentIdx
                            setActiveIndex(currentIdx)

                            // 3. Selective video playback logic depends on activeIndex and isVisible
                            // So we just update the activeIndex state, and the useEffect handles play/pause.

                            // 4. Update counter DOM directly if possible
                            if (counterRef.current) {
                                counterRef.current.innerText = String(currentIdx + 1).padStart(2, '0')
                            }
                        }
                    }
                }
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="threat-engine" ref={sectionRef}>
            {/* Background grid + ambient effects */}
            <div className="te-bg-grid" />
            <div className="te-bg-glow" />

            <div className="threat-engine-pin">
                {/* Top header bar */}
                <div className="threat-engine-header">
                    <div className="te-header-left">
                        <div className="section-label">Threat Detection Engine</div>
                    </div>
                    <div className="te-header-right">
                        <div className="te-slide-counter">
                            <span className="te-counter-current" ref={counterRef}>{String(activeIndex + 1).padStart(2, '0')}</span>
                            <span className="te-counter-sep">/</span>
                            <span className="te-counter-total">{String(threats.length).padStart(2, '0')}</span>
                        </div>
                    </div>
                </div>

                <div className="threat-slides-wrapper" ref={sliderRef}>
                    {threats.map((threat, i) => (
                        <div className="threat-slide" key={threat.id}>
                            <div className="threat-slide-inner">
                                {/* Video Panel */}
                                <div className="threat-visual" style={{ '--threat-color': threat.color }}>
                                    <video loop muted playsInline preload="auto">
                                        <source src={threat.video} type="video/mp4" />
                                    </video>
                                    <div className="threat-visual-overlay" />
                                    <div className="threat-visual-scanline" />

                                    {/* HUD corners with glow */}
                                    <div className="te-hud-corner te-hud-tl" />
                                    <div className="te-hud-corner te-hud-tr" />
                                    <div className="te-hud-corner te-hud-bl" />
                                    <div className="te-hud-corner te-hud-br" />

                                    {/* Floating HUD tag */}
                                    <div className="te-hud-tag">
                                        <span className="te-hud-dot" />
                                        <span>ANALYZING</span>
                                    </div>

                                    {/* Bottom threat level bar */}
                                    <div className="te-threat-level">
                                        <div className="te-threat-level-bar">
                                            <div className="te-threat-level-fill" />
                                        </div>
                                        <span className="te-threat-level-text">THREAT LEVEL: MONITORING</span>
                                    </div>
                                </div>

                                {/* Content Panel */}
                                <div className="threat-content" style={{ '--threat-color': threat.color }}>
                                    {/* Number + tagline */}
                                    <div className="te-content-header">
                                        <div className="threat-number">0{i + 1}</div>
                                        <span className="te-tagline">{threat.tagline}</span>
                                    </div>

                                    {/* Icon */}
                                    <div className="te-icon-wrap">
                                        <div className="te-icon">{threat.icon}</div>
                                        <div className="te-icon-ring" />
                                    </div>

                                    <h3 className="threat-name">{threat.name}</h3>
                                    <p className="threat-desc">{threat.desc}</p>

                                    {/* Stats with animated bars */}
                                    <div className="threat-stat">
                                        {threat.stats.map((stat, j) => (
                                            <div className="threat-stat-item" key={j}>
                                                <span className="threat-stat-value">{stat.value}</span>
                                                <span className="threat-stat-label">{stat.label}</span>
                                                <div className="te-stat-bar">
                                                    <div className="te-stat-bar-fill" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Status line */}
                                    <div className="te-status-line">
                                        <span className="te-status-dot" />
                                        <span className="te-status-text">SYSTEM ACTIVE — NEURAL NET v4.2</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Progress bar with markers */}
                <div className="threat-progress-container">
                    <div className="threat-progress-markers">
                        {threats.map((t, i) => (
                            <div className={`te-marker ${i === activeIndex ? 'te-marker-active' : ''}`} key={t.id}>
                                <span className="te-marker-num">0{i + 1}</span>
                                <span className="te-marker-name">{t.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="threat-progress-bar">
                        <div className="threat-progress-fill" ref={progressFillRef} style={{ width: '0%' }} />
                    </div>
                </div>
            </div>
        </section>
    )
})

ThreatEngine.displayName = 'ThreatEngine'

export default ThreatEngine
