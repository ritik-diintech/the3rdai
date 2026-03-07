import { useEffect, useRef, useState, useCallback, memo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import surveillanceVideo from '../../../assets/videos/Surveillance CCTV camera with Face Recognition.mp4'

gsap.registerPlugin(ScrollTrigger)

/* ── Capability data ── */
const capabilities = [
    {
        id: 'detect',
        title: 'Object Detection',
        stat: '99.2%',
        statLabel: 'ACCURACY',
        desc: 'Real-time classification of 200+ object categories with powerful AI neural networks.',
        color: '#00f0ff',
        angle: 0,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
            </svg>
        ),
    },
    {
        id: 'track',
        title: 'Path Tracking',
        stat: '150+',
        statLabel: 'TARGETS/FRAME',
        desc: 'Multi-target trajectory prediction and anomaly detection across concurrent feeds.',
        color: '#0066ff',
        angle: 90,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
        ),
    },
    {
        id: 'alert',
        title: 'Threat Response',
        stat: '<0.3s',
        statLabel: 'LATENCY',
        desc: 'Sub-millisecond threat classification with automated response triggers and alerts.',
        color: '#ff0044',
        angle: 180,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
        ),
    },
    {
        id: 'brain',
        title: 'Behavioral AI',
        stat: '24/7',
        statLabel: 'VIGILANCE',
        desc: 'Deep learning models detect suspicious patterns and predict hostile intent autonomously.',
        color: '#00ff88',
        angle: 270,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.5 2A5.5 5.5 0 004 7.5c0 1.58.67 3 1.74 4.01L4 22l4-2 4 2-1.74-10.49A5.49 5.49 0 0015 7.5 5.5 5.5 0 009.5 2z" />
                <path d="M14.5 2A5.5 5.5 0 0120 7.5c0 1.58-.67 3-1.74 4.01L20 22l-4-2-4 2" />
            </svg>
        ),
    },
]

/* ── Simulated live log feed ── */
const logTemplates = [
    { type: 'info', text: 'Neural net inference completed — 847 FPS' },
    { type: 'success', text: 'Object classified: VEHICLE_AUTHORIZED — 99.7% conf' },
    { type: 'warning', text: 'Anomaly detected in sector 7 — behavioral analysis initiated' },
    { type: 'info', text: 'Perimeter scan complete — 0 intrusions detected' },
    { type: 'success', text: 'Face recognition match: ID verified — gate access granted' },
    { type: 'alert', text: 'Threat level elevated — deploying countermeasures' },
    { type: 'info', text: 'Satellite uplink established — 12ms latency' },
    { type: 'success', text: 'Deep learning model v4.2 synchronized across 12 nodes' },
    { type: 'warning', text: 'Unusual movement pattern detected — tracking subject #47' },
    { type: 'info', text: 'Thermal imaging overlay active — IR spectrum analysis' },
]

const ScanDemo = memo(() => {
    const sectionRef = useRef(null)
    const [activeNode, setActiveNode] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const [logs, setLogs] = useState([])
    const logIndexRef = useRef(0)
    const logIdCounter = useRef(0)

    const timestampRef = useRef(null)
    const feedTsRef = useRef(null)

    /* ── Video in-view playback ── */
    useEffect(() => {
        const video = sectionRef.current?.querySelector('video')
        if (!video) return

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    video.play().catch(() => { })
                } else {
                    setIsVisible(false)
                    video.pause()
                }
            })
        }, { threshold: 0.1 })

        observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    /* ── Live timestamp ── */
    useEffect(() => {
        if (!isVisible) return;
        let rafId;
        const updateTime = () => {
            const now = new Date()
            const tsString = now.toLocaleTimeString('en-US', { hour12: false }) + ':' + String(now.getMilliseconds()).padStart(3, '0')

            if (timestampRef.current) {
                timestampRef.current.innerText = tsString
            }
            if (feedTsRef.current) {
                feedTsRef.current.innerText = tsString
            }
            rafId = requestAnimationFrame(updateTime)
        }
        rafId = requestAnimationFrame(updateTime)
        return () => cancelAnimationFrame(rafId)
    }, [isVisible])

    const logListRef = useRef(null)

    /* ── Simulated log feed ── */
    useEffect(() => {
        const createLogElement = (log) => {
            const entry = document.createElement('div')
            entry.className = `sd-feed-entry sd-feed-${log.type}`
            entry.innerHTML = `
                <span class="sd-feed-entry-ts">${log.ts}</span>
                <span class="sd-feed-entry-badge sd-badge-${log.type}">
                    ${log.type === 'info' ? 'INF' : log.type === 'success' ? 'OK' : log.type === 'warning' ? 'WRN' : 'ALT'}
                </span>
                <span class="sd-feed-entry-text">${log.text}</span>
            `
            return entry
        }

        const addLog = () => {
            const template = logTemplates[logIndexRef.current % logTemplates.length]
            const now = new Date()
            const ts = now.toLocaleTimeString('en-US', { hour12: false })
            const logItem = { ...template, ts, id: `log-${Date.now()}-${logIdCounter.current++}` }

            if (logListRef.current) {
                const newLogEl = createLogElement(logItem)
                logListRef.current.prepend(newLogEl)

                // Limit count
                if (logListRef.current.children.length > 6) {
                    logListRef.current.removeChild(logListRef.current.lastChild)
                }
            }
            logIndexRef.current++
        }

        // Initial logs only if empty
        if (logListRef.current && logListRef.current.children.length === 0) {
            for (let i = 0; i < 3; i++) addLog()
        }

        if (!isVisible) return;
        const interval = setInterval(addLog, 3000)
        return () => clearInterval(interval)
    }, [isVisible])

    /* ── GSAP animations ── */
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.sd-header',
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' }
                }
            )

            gsap.fromTo('.sd-monitor',
                { opacity: 0, y: 60, scale: 0.96 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out',
                    scrollTrigger: { trigger: '.sd-monitor', start: 'top 80%', toggleActions: 'play none none reverse' }
                }
            )

            gsap.fromTo('.sd-matrix-container',
                { opacity: 0, y: 60 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: '.sd-matrix-container', start: 'top 85%', toggleActions: 'play none none reverse' }
                }
            )

            gsap.fromTo('.sd-nerve-node',
                { opacity: 0, scale: 0.5 },
                {
                    opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.7)',
                    scrollTrigger: { trigger: '.sd-matrix-container', start: 'top 80%', toggleActions: 'play none none reverse' }
                }
            )

            gsap.fromTo('.sd-live-feed',
                { opacity: 0, x: 30 },
                {
                    opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: '.sd-live-feed', start: 'top 85%', toggleActions: 'play none none reverse' }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const handleNodeHover = useCallback((id) => {
        setActiveNode(id)
    }, [])

    const handleNodeLeave = useCallback(() => {
        setActiveNode(null)
    }, [])

    return (
        <section className="sd-section" ref={sectionRef}>
            {/* Background FX */}
            <div className="sd-bg-lines" />
            <div className="sd-bg-glow" />
            <div className="sd-bg-particles" />

            <div className="container">
                {/* Header */}
                <div className="sd-header">
                    <div className="section-label">Real-Time Tracking</div>
                    <h2 className="sd-title">
                        Track Everything <span className="gradient-text">Live</span>
                        <br />in Milliseconds
                    </h2>
                    <p className="text-body sd-desc">
                        Advanced AI vision that processes every frame, identifies objects
                        before they materialize, and tracks them seamlessly.
                    </p>
                </div>

                {/* Main Monitor */}
                <div className="sd-monitor">
                    <div className="sd-monitor-frame">
                        {/* Top bar */}
                        <div className="sd-monitor-topbar">
                            <div className="sd-topbar-left">
                                <span className="sd-status-dot" />
                                <span className="sd-status-text">LIVE FEED — CAM_017</span>
                            </div>
                            <div className="sd-topbar-center">
                                <span className="sd-topbar-tag">NEURAL NET v4.2</span>
                                <span className="sd-topbar-divider">|</span>
                                <span className="sd-topbar-tag">THREAT LEVEL: LOW</span>
                            </div>
                            <div className="sd-topbar-right">
                                <span className="sd-timestamp" ref={timestampRef}>00:00:00:000</span>
                            </div>
                        </div>

                        {/* Video container */}
                        <div className="sd-video-wrap">
                            <video autoPlay loop muted playsInline loading="lazy">
                                <source src={surveillanceVideo} type="video/mp4" />
                            </video>
                            <div className="sd-video-overlay" />
                            <div className="sd-scan-line" />

                            {/* Corner brackets */}
                            <div className="sd-bracket sd-bracket-tl" />
                            <div className="sd-bracket sd-bracket-tr" />
                            <div className="sd-bracket sd-bracket-bl" />
                            <div className="sd-bracket sd-bracket-br" />
                        </div>

                        {/* Bottom stats bar */}
                        <div className="sd-monitor-stats">
                            <div className="sd-stat-cell">
                                <span className="sd-stat-val">99.7%</span>
                                <span className="sd-stat-lbl">DETECTION RATE</span>
                                <div className="sd-stat-bar"><div className="sd-stat-fill" style={{ width: '99.7%' }} /></div>
                            </div>
                            <div className="sd-stat-cell">
                                <span className="sd-stat-val sd-stat-green">0.23ms</span>
                                <span className="sd-stat-lbl">RESPONSE TIME</span>
                                <div className="sd-stat-bar"><div className="sd-stat-fill sd-fill-green" style={{ width: '12%' }} /></div>
                            </div>
                            <div className="sd-stat-cell">
                                <span className="sd-stat-val">847</span>
                                <span className="sd-stat-lbl">FPS PROCESSED</span>
                                <div className="sd-stat-bar"><div className="sd-stat-fill sd-fill-blue" style={{ width: '85%' }} /></div>
                            </div>
                            <div className="sd-stat-cell">
                                <span className="sd-stat-val">12</span>
                                <span className="sd-stat-lbl">ACTIVE FEEDS</span>
                                <div className="sd-stat-bar"><div className="sd-stat-fill" style={{ width: '60%' }} /></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══ NEURAL SCANNING MATRIX ═══ */}
                <div className="sd-matrix-container">
                    {/* Central radar / neural hub */}
                    <div className="sd-matrix-core">
                        {/* Animated radar rings */}
                        <div className="sd-radar">
                            <div className="sd-radar-ring sd-radar-ring-1" />
                            <div className="sd-radar-ring sd-radar-ring-2" />
                            <div className="sd-radar-ring sd-radar-ring-3" />
                            <div className="sd-radar-sweep" />
                            <div className="sd-radar-center">
                                <div className="sd-radar-core-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                        <path d="M2 17l10 5 10-5" />
                                        <path d="M2 12l10 5 10-5" />
                                    </svg>
                                </div>
                                <span className="sd-radar-label">AI CORE</span>
                            </div>
                        </div>

                        {/* Connection lines SVG */}
                        <svg className="sd-connection-lines" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
                            {/* Dynamic pulse lines from center to nodes */}
                            <line x1="400" y1="250" x2="100" y2="100" className="sd-conn-line sd-conn-1" />
                            <line x1="400" y1="250" x2="700" y2="100" className="sd-conn-line sd-conn-2" />
                            <line x1="400" y1="250" x2="100" y2="400" className="sd-conn-line sd-conn-3" />
                            <line x1="400" y1="250" x2="700" y2="400" className="sd-conn-line sd-conn-4" />
                            {/* Cross connections */}
                            <line x1="100" y1="100" x2="700" y2="100" className="sd-conn-line sd-conn-cross" />
                            <line x1="100" y1="400" x2="700" y2="400" className="sd-conn-line sd-conn-cross" />
                            <line x1="100" y1="100" x2="100" y2="400" className="sd-conn-line sd-conn-cross" />
                            <line x1="700" y1="100" x2="700" y2="400" className="sd-conn-line sd-conn-cross" />
                            {/* Traveling signal pulses */}
                            <circle r="3" className="sd-signal-pulse sd-signal-1">
                                <animateMotion dur="3s" repeatCount="indefinite" path="M400,250 L100,100" />
                            </circle>
                            <circle r="3" className="sd-signal-pulse sd-signal-2">
                                <animateMotion dur="2.5s" repeatCount="indefinite" path="M400,250 L700,100" />
                            </circle>
                            <circle r="3" className="sd-signal-pulse sd-signal-3">
                                <animateMotion dur="3.2s" repeatCount="indefinite" path="M400,250 L100,400" />
                            </circle>
                            <circle r="3" className="sd-signal-pulse sd-signal-4">
                                <animateMotion dur="2.8s" repeatCount="indefinite" path="M400,250 L700,400" />
                            </circle>
                        </svg>

                        {/* Capability Nodes — positioned around the radar */}
                        {capabilities.map((cap, i) => (
                            <div
                                className={`sd-nerve-node sd-nerve-${cap.id} ${activeNode === cap.id ? 'sd-nerve-active' : ''}`}
                                key={cap.id}
                                onMouseEnter={() => handleNodeHover(cap.id)}
                                onMouseLeave={handleNodeLeave}
                                style={{ '--node-color': cap.color }}
                            >
                                {/* Pulsing border ring */}
                                <div className="sd-nerve-ring" />
                                <div className="sd-nerve-ring sd-nerve-ring-outer" />

                                <div className="sd-nerve-content">
                                    {/* Hexagonal icon container */}
                                    <div className="sd-nerve-icon-hex">
                                        <div className="sd-nerve-icon">{cap.icon}</div>
                                        <div className="sd-nerve-icon-glow" />
                                    </div>

                                    {/* Node info */}
                                    <div className="sd-nerve-info">
                                        <div className="sd-nerve-id">NODE_{String(i + 1).padStart(2, '0')}</div>
                                        <h4 className="sd-nerve-title">{cap.title}</h4>
                                        <div className="sd-nerve-stat-row">
                                            <span className="sd-nerve-stat-value">{cap.stat}</span>
                                            <span className="sd-nerve-stat-label">{cap.statLabel}</span>
                                        </div>
                                    </div>

                                    {/* Expandable detail */}
                                    <div className="sd-nerve-detail">
                                        <p>{cap.desc}</p>
                                        <div className="sd-nerve-status-bar">
                                            <div className="sd-nerve-status-fill" style={{ width: cap.stat.includes('%') ? cap.stat : '100%' }} />
                                        </div>
                                        <span className="sd-nerve-status-text">● ONLINE — OPERATIONAL</span>
                                    </div>
                                </div>

                                {/* Corner decorations */}
                                <div className="sd-nerve-corner sd-nerve-corner-tl" />
                                <div className="sd-nerve-corner sd-nerve-corner-br" />
                            </div>
                        ))}
                    </div>

                    {/* Live System Feed */}
                    <div className="sd-live-feed">
                        <div className="sd-feed-header">
                            <span className="sd-feed-dot" />
                            <span className="sd-feed-title">SYSTEM LOG</span>
                            <span className="sd-feed-ts" ref={feedTsRef}>00:00:00:000</span>
                        </div>
                        <div className="sd-feed-list" ref={logListRef}>
                            {/* Logs added via direct DOM manipulation for performance */}
                        </div>
                        <div className="sd-feed-scanline" />
                    </div>
                </div>
            </div>
        </section>
    )
})

ScanDemo.displayName = 'ScanDemo'

export default ScanDemo
