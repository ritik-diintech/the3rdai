import { useEffect, useRef, useState, memo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import cam1Video from '../../assets/videos/biketheft.mp4'
import cam2Video from '../../assets/videos/CCTV footage. shopping h264.mp4'
import cam3Video from '../../assets/videos/cctv cameraVideo.mp4'
import cam4Video from '../../assets/videos/mutlicamRoadCamra.mp4'
import heroImg from '../../assets/images/commondCenter_bg.jpg'
import multiMonitorImg from '../../assets/images/multpipleMonitoreScreen.jpg'

// Search Images
import blueMan1 from '../../assets/controlCenterImages/SerchingImage/blueShirtMan.jpg'
import blueMan2 from '../../assets/controlCenterImages/SerchingImage/BlueShirtman2.jpg'
import blueMan3 from '../../assets/controlCenterImages/SerchingImage/blueShirtMan3.jpg'
import bag1 from '../../assets/controlCenterImages/SerchingImage/SuppisusBag.jpg'
import bag2 from '../../assets/controlCenterImages/SerchingImage/suppisusBag2.jpg'
import bag3 from '../../assets/controlCenterImages/SerchingImage/SuppisusBag3.jpg'
import van1 from '../../assets/controlCenterImages/SerchingImage/whiteVAn.jpg'
import van2 from '../../assets/controlCenterImages/SerchingImage/whiteVan2.jpg'
import van3 from '../../assets/controlCenterImages/SerchingImage/whiteVan3.jpg'
import door1 from '../../assets/controlCenterImages/SerchingImage/atttamOpenDor1.jpg'
import door2 from '../../assets/controlCenterImages/SerchingImage/attampDorOpen2.jpg'
import door3 from '../../assets/controlCenterImages/SerchingImage/attampOpenDor3.jpg'

import './ControlCenter.css'

gsap.registerPlugin(ScrollTrigger)

const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
}

const heatmapCells = Array.from({ length: 120 }, () => Math.random())

const eventLogs = [
    { time: '15:42:03', type: 'ALERT', zone: 'Zone B-7', event: 'Perimeter breach detected', level: 'critical' },
    { time: '15:41:58', type: 'DETECT', zone: 'Lobby A', event: 'Unknown individual identified', level: 'warning' },
    { time: '15:41:45', type: 'SYSTEM', zone: 'Global', event: 'Neural core model update v4.2.1 deployed', level: 'info' },
    { time: '15:41:30', type: 'CLEAR', zone: 'Zone C-3', event: 'Motion anomaly resolved — authorized personnel', level: 'success' },
    { time: '15:41:22', type: 'ALERT', zone: 'Parking L2', event: 'Vehicle trajectory divergence flagged', level: 'warning' },
    { time: '15:41:15', type: 'DETECT', zone: 'Zone A-1', event: 'Crowd density threshold exceeded', level: 'warning' },
    { time: '15:41:02', type: 'SYSTEM', zone: 'Edge Node 47', event: 'Health check passed — all systems nominal', level: 'info' },
    { time: '15:40:55', type: 'CLEAR', zone: 'Zone D-2', event: 'Behavioral anomaly cleared', level: 'success' },
]

const networkNodes = [
    { label: 'Core AI', x: 50, y: 30, primary: true },
    { label: 'Edge N-01', x: 20, y: 15 },
    { label: 'Edge N-02', x: 80, y: 15 },
    { label: 'Edge N-03', x: 15, y: 55 },
    { label: 'Edge N-04', x: 85, y: 55 },
    { label: 'Cloud', x: 50, y: 75 },
    { label: 'Gateway', x: 30, y: 45 },
    { label: 'Gateway', x: 70, y: 45 },
]

const feedLabels = [
    { label: 'CAM-01 Entrance', video: cam4Video },
    { label: 'CAM-02 Parking L1', video: cam3Video },
    { label: 'CAM-03 Lobby', video: cam2Video },
    { label: 'CAM-04 Perimeter', video: cam1Video },
]

const searchScenarios = [
    {
        query: "Man in blue shirt in aisle 4",
        images: [blueMan1, blueMan2, blueMan3],
        stats: "4 matches found across 14 cameras - 48h scanned in 2.1s"
    },
    {
        query: "Unidentified van stationary near loading dock",
        images: [van1, van2, van3],
        stats: "3 matches found across 8 cameras - 48h scanned in 3.2s"
    },
    {
        query: "Unauthorized access attempt at secondary gate",
        images: [door1, door2, door3],
        stats: "3 matches found across 22 cameras - 48h scanned in 1.8s"
    },
    {
        query: "Suspicious bag left unattended",
        images: [bag1, bag2, bag3],
        stats: "3 matches found across 10 cameras - 24h scanned in 1.2s"
    }
]

const AiSearchSection = memo(() => {
    const [scenarioIdx, setScenarioIdx] = useState(0);
    const [textLen, setTextLen] = useState(0);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        let timeout;
        const currentScenario = searchScenarios[scenarioIdx];
        if (!showResults && textLen < currentScenario.query.length) {
            timeout = setTimeout(() => {
                setTextLen(prev => prev + 1);
            }, 40 + Math.random() * 40);
        } else if (!showResults && textLen === currentScenario.query.length) {
            timeout = setTimeout(() => {
                setShowResults(true);
            }, 600);
        } else if (showResults) {
            timeout = setTimeout(() => {
                setShowResults(false);
                setTextLen(0);
                setScenarioIdx(prev => (prev + 1) % searchScenarios.length);
            }, 4000); // Wait 4 seconds to view results before moving to next
        }
        return () => clearTimeout(timeout);
    }, [textLen, showResults, scenarioIdx]);

    const currentScenario = searchScenarios[scenarioIdx];
    const displayedText = currentScenario.query.substring(0, textLen);

    return (
        <section className="cc-ai-search-section">
            <div className="container cc-ai-search-container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="ai-search-left layout-reveal">

                    <div className="ai-powered-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        COGNITIVE RECONNAISSANCE
                    </div>
                    <h2 className="heading-xl mt-4">
                        Pinpoint Anomalies <span className="gradient-text">Instantly.</span>
                    </h2>
                    <p className="text-body mt-4 ai-search-desc">
                        Bypass manual video scrubbing. Simply command the system: "Man in blue shirt in aisle 4," "Unidentified van near dock," or "Unauthorized access attempt." Lexius AI parses millions of frames across your entire network in literal seconds.
                    </p>
                </div>

                <div className="ai-search-right layout-reveal">
                    <div className="ai-search-glass-panel">
                        <div className="glass-panel-header">
                            <span className="gph-dot"></span>
                            <span className="gph-dot"></span>
                            <span className="gph-dot"></span>
                            <div className="gph-title">NLP_SEARCH_QUERY.EXE</div>
                        </div>

                        <div className="ai-search-input-wrapper">
                            <span className="ai-search-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="4 7 4 4 20 4 20 7"></polyline>
                                    <line x1="9" y1="20" x2="15" y2="20"></line>
                                    <line x1="12" y1="4" x2="12" y2="20"></line>
                                </svg>
                            </span>
                            <div className="ai-search-text">
                                {displayedText}<span className="ai-search-cursor">|</span>
                            </div>
                        </div>

                        <div className="ai-search-viewfinder">
                            <div className="vf-corner top-left"></div>
                            <div className="vf-corner top-right"></div>
                            <div className="vf-corner bottom-left"></div>
                            <div className="vf-corner bottom-right"></div>

                            <div className={`vf-scanning-line ${!showResults && textLen > 0 ? 'active' : ''}`}></div>

                            <div className="ai-search-results">
                                {searchScenarios[scenarioIdx].images.map((imgSrc, i) => (
                                    <div className="ai-result-card" key={i}>
                                        <div className="ai-result-cam-badge">FEED 0{i + 2} / {Math.floor(Math.random() * 99) + 10}ms</div>
                                        <div className="ai-result-img-wrapper" style={{
                                            opacity: showResults ? 1 : 0,
                                            transform: showResults ? 'scale(1)' : 'scale(1.1)',
                                            transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`
                                        }}>
                                            <img src={imgSrc} alt="Result Match" loading="lazy" />
                                            <div className="result-crosshair"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="ai-search-stats" style={{ opacity: showResults ? 1 : 0 }}>
                            <div className="stats-pulse"></div>
                            {currentScenario.stats}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
})


const ControlCenter = memo(() => {
    const pageRef = useRef(null)
    const timeRef = useRef(null)

    useEffect(() => {
        const update = () => {
            if (timeRef.current) {
                const now = new Date()
                timeRef.current.innerText = now.toLocaleTimeString('en-US', { hour12: false }) + ' UTC'
            }
        }
        update()
        const interval = setInterval(update, 1000)

        const ctx = gsap.context(() => {
            gsap.utils.toArray('.cc-panel').forEach((panel, i) => {
                gsap.fromTo(panel,
                    { opacity: 0, y: 40, scale: 0.97 },
                    {
                        opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.08,
                        scrollTrigger: { trigger: panel, start: 'top 85%', toggleActions: 'play none none reverse' }
                    }
                )
            })

            gsap.fromTo('.cc-feed-item',
                { opacity: 0, scale: 0.9 },
                {
                    opacity: 1, scale: 1, duration: 0.5, stagger: 0.1,
                    scrollTrigger: { trigger: '.cc-feeds-grid', start: 'top 75%', toggleActions: 'play none none reverse' }
                }
            )
        }, pageRef)

        return () => {
            clearInterval(interval)
            ctx.revert()
        }
    }, [])

    return (
        <motion.main className="cc-page" ref={pageRef} variants={pageVariants} initial="initial" animate="animate" exit="exit">

            {/* Hero */}
            <section className="cc-hero">
                <div className="cc-hero-bg" style={{ backgroundImage: `url(${heroImg})` }} />
                <div className="cc-hero-gradient" />
                <div className="container" style={{ position: 'relative' }}>
                    <div className="section-label">Command Interface</div>
                    <h1 className="heading-xl">
                        Control{' '}
                        <span className="gradient-text">Center</span>
                    </h1>
                    <p className="text-body" style={{ maxWidth: '560px', marginTop: '20px' }}>
                        The nerve center of autonomous security. Real-time intelligence, threat visualization, and system command — all in one interface.
                    </p>
                </div>
            </section>


            {/* Live Camera Feeds */}
            <section className="cc-feeds-section">
                <div className="container">
                    <div style={{ marginBottom: '40px' }}>
                        <div className="section-label">Live Camera Feeds</div>
                        <h2 className="heading-lg">Real-Time <span className="gradient-text">Surveillance Grid</span></h2>
                    </div>
                    <div className="cc-feeds-grid">
                        {feedLabels.map((feed, i) => (
                            <div className="cc-feed-item" key={i}>
                                <video autoPlay loop muted playsInline>
                                    <source src={feed.video} type="video/mp4" />
                                </video>
                                <div className="cc-feed-overlay" />
                                <div className="cc-feed-hud">
                                    <div className="scan-hud-corner top-left" />
                                    <div className="scan-hud-corner top-right" />
                                    <div className="scan-hud-corner bottom-left" />
                                    <div className="scan-hud-corner bottom-right" />
                                </div>
                                <div className="cc-feed-info">
                                    <span className="cc-feed-status"><span className="scan-status-dot" /> LIVE</span>
                                    <span className="cc-feed-label">{feed.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Powered Search Section */}
            <AiSearchSection />

            {/* Dashboard */}
            <section className="cc-dashboard-section">
                <div className="container">
                    <div style={{ marginBottom: '24px' }}>
                        <div className="section-label">Intelligence Dashboard</div>
                        <h2 className="heading-lg">System <span className="gradient-text">Overview</span></h2>
                    </div>

                    {/* System Bar */}
                    <div className="cc-system-bar">
                        <div className="cc-system-left">
                            <span className="cc-system-dot" />
                            <span className="cc-system-label">THE3RDAI COMMAND CENTER</span>
                            <span className="cc-system-version">v4.2.1</span>
                        </div>
                        <div className="cc-system-right">
                            <span className="cc-system-time" ref={timeRef}></span>
                            <span className="cc-system-status">ALL SYSTEMS NOMINAL</span>
                        </div>
                    </div>

                    {/* Main Grid */}
                    <div className="cc-grid">
                        {/* Threat Heatmap */}
                        <div className="cc-panel cc-heatmap">
                            <div className="cc-panel-header">
                                <span className="cc-panel-title">THREAT HEATMAP</span>
                                <span className="cc-panel-live">● LIVE</span>
                            </div>
                            <div className="cc-heatmap-grid">
                                {heatmapCells.map((intensity, i) => (
                                    <div className="heatmap-cell" key={i}
                                        style={{
                                            background: intensity > 0.8
                                                ? `rgba(255, 122, 0, ${intensity * 0.8})`
                                                : intensity > 0.5
                                                    ? `rgba(0, 240, 255, ${intensity * 0.4})`
                                                    : `rgba(0, 240, 255, ${intensity * 0.1})`,
                                        }}
                                    />
                                ))}
                            </div>
                            <div className="cc-heatmap-legend">
                                <span>Low</span>
                                <div className="cc-heatmap-gradient" />
                                <span>Critical</span>
                            </div>
                        </div>

                        {/* Detection Analytics */}
                        <div className="cc-panel cc-analytics-panel">
                            <div className="cc-panel-header">
                                <span className="cc-panel-title">DETECTION ANALYTICS</span>
                            </div>
                            <div className="cc-analytics-stats">
                                <div className="cc-stat-big">
                                    <span className="cc-stat-big-value">2,491</span>
                                    <span className="cc-stat-big-label">Detections Today</span>
                                </div>
                                <div className="cc-stat-row">
                                    <div className="cc-stat-mini">
                                        <span className="cc-stat-mini-value positive">↑ 18.2%</span>
                                        <span className="cc-stat-mini-label">vs Yesterday</span>
                                    </div>
                                    <div className="cc-stat-mini">
                                        <span className="cc-stat-mini-value">47</span>
                                        <span className="cc-stat-mini-label">Active Alerts</span>
                                    </div>
                                    <div className="cc-stat-mini">
                                        <span className="cc-stat-mini-value positive">99.99%</span>
                                        <span className="cc-stat-mini-label">Uptime</span>
                                    </div>
                                </div>
                            </div>
                            <div className="cc-mini-chart">
                                {Array.from({ length: 24 }, (_, i) => (
                                    <div className="cc-mini-bar" key={i} style={{ height: `${15 + Math.random() * 85}%` }} />
                                ))}
                            </div>
                        </div>

                        {/* Event Logs */}
                        <div className="cc-panel cc-events">
                            <div className="cc-panel-header">
                                <span className="cc-panel-title">EVENT LOG</span>
                                <span className="cc-panel-count">{eventLogs.length} events</span>
                            </div>
                            <div className="cc-event-list">
                                {eventLogs.map((log, i) => (
                                    <div className={`cc-event-item cc-event-${log.level}`} key={i}>
                                        <span className="cc-event-time">{log.time}</span>
                                        <span className={`cc-event-type cc-type-${log.level}`}>{log.type}</span>
                                        <span className="cc-event-zone">{log.zone}</span>
                                        <span className="cc-event-text">{log.event}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* System Health */}
                        <div className="cc-panel cc-health">
                            <div className="cc-panel-header">
                                <span className="cc-panel-title">SYSTEM HEALTH</span>
                            </div>
                            <div className="cc-health-items">
                                {[
                                    { name: 'Neural Core', status: 'Operational', load: 34 },
                                    { name: 'Edge Network', status: 'Operational', load: 56 },
                                    { name: 'Cloud Sync', status: 'Operational', load: 22 },
                                    { name: 'Alert Pipeline', status: 'Operational', load: 41 },
                                    { name: 'Data Encryption', status: 'Operational', load: 18 },
                                ].map((item, i) => (
                                    <div className="cc-health-item" key={i}>
                                        <div className="cc-health-info">
                                            <span className="cc-health-name">{item.name}</span>
                                            <span className="cc-health-status">{item.status}</span>
                                        </div>
                                        <div className="cc-health-bar-track">
                                            <div className="cc-health-bar-fill" style={{ width: `${item.load}%` }} />
                                        </div>
                                        <span className="cc-health-load">{item.load}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Timeline Replay */}
                        <div className="cc-panel cc-timeline-replay">
                            <div className="cc-panel-header">
                                <span className="cc-panel-title">TIMELINE REPLAY</span>
                            </div>
                            <div className="cc-timeline-bar">
                                <div className="cc-timeline-progress" />
                                <div className="cc-timeline-markers">
                                    {[0, 20, 40, 55, 72, 88].map((pos, i) => (
                                        <div className={`cc-timeline-marker ${i === 3 || i === 0 ? 'marker-alert' : ''}`} key={i} style={{ left: `${pos}%` }} />
                                    ))}
                                </div>
                            </div>
                            <div className="cc-timeline-labels">
                                <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:59</span>
                            </div>
                        </div>

                        {/* Network Topology */}
                        <div className="cc-panel cc-topology">
                            <div className="cc-panel-header">
                                <span className="cc-panel-title">NETWORK TOPOLOGY</span>
                                <span className="cc-panel-live">● LIVE</span>
                            </div>
                            <div className="cc-topology-map">
                                <svg className="cc-topology-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <line x1="50" y1="30" x2="20" y2="15" stroke="rgba(0,240,255,0.15)" strokeWidth="0.3" />
                                    <line x1="50" y1="30" x2="80" y2="15" stroke="rgba(0,240,255,0.15)" strokeWidth="0.3" />
                                    <line x1="50" y1="30" x2="30" y2="45" stroke="rgba(0,240,255,0.2)" strokeWidth="0.3" />
                                    <line x1="50" y1="30" x2="70" y2="45" stroke="rgba(0,240,255,0.2)" strokeWidth="0.3" />
                                    <line x1="30" y1="45" x2="15" y2="55" stroke="rgba(0,240,255,0.15)" strokeWidth="0.3" />
                                    <line x1="70" y1="45" x2="85" y2="55" stroke="rgba(0,240,255,0.15)" strokeWidth="0.3" />
                                    <line x1="50" y1="30" x2="50" y2="75" stroke="rgba(0,102,255,0.2)" strokeWidth="0.3" />
                                </svg>
                                {networkNodes.map((node, i) => (
                                    <div className={`cc-topology-node ${node.primary ? 'cc-topology-primary' : ''}`} key={i}
                                        style={{ left: `${node.x}%`, top: `${node.y}%` }}>
                                        <div className="cc-topology-dot" />
                                        <span className="cc-topology-label">{node.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Full-Screen Image Section */}
            <section className="cc-video-section">
                <img src={multiMonitorImg} alt="AI Monitoring Center" className="cc-video-bg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="cc-video-overlay" />
                <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>AI in Action</div>
                    <h2 className="heading-xl">
                        Autonomous <span className="gradient-text">Monitoring</span>
                    </h2>
                    <p className="text-body" style={{ maxWidth: '560px', margin: '16px auto 0' }}>
                        Our AI vision system tracks, classifies, and responds to real-world threats in real-time.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="cc-cta-section">
                <div className="grid-bg" />
                <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>Take Command</div>
                    <h2 className="heading-xl">
                        Your Command Center{' '}<span className="gradient-text">Awaits.</span>
                    </h2>
                    <p className="text-body" style={{ maxWidth: '520px', margin: '20px auto 40px' }}>
                        Deploy The3rdAI's command center across your infrastructure and experience autonomous security firsthand.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                        <Link to="/contact" className="btn-primary"><span>Request Access</span></Link>
                        <Link to="/contact" className="btn-outline"><span>Live Demo</span></Link>
                    </div>
                </div>
            </section>
        </motion.main>
    )
})

ControlCenter.displayName = 'ControlCenter'

export default ControlCenter
