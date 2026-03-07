import React, { useState, useEffect, useRef, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, Target, Activity, ShieldAlert, Cpu, Radio, ShieldCheck } from 'lucide-react'
import './AlertEngine.css'

const feedData = [
    {
        id: 'T-881',
        type: 'critical',
        source: 'PERIMETER B-7',
        message: 'UNAUTHORIZED THERMAL SIGNATURE DETECTED. AUTO-LOCKDOWN ENGAGED.',
        time: 'LIVE',
        icon: ShieldAlert,
        color: '#ff0033'
    },
    {
        id: 'T-882',
        type: 'warning',
        source: 'LOBBY CAM-04',
        message: 'UNKNOWN INDIVIDUAL IDENTIFIED. FACIAL MATCH PENDING IN NEURAL DB.',
        time: '-12s',
        icon: Target,
        color: '#ffaa00'
    },
    {
        id: 'T-883',
        type: 'nominal',
        source: 'SYS-CORE',
        message: 'HOURLY THREAT ASSESSMENT COMPLETE. ZERO ACTIVE VULNERABILITIES.',
        time: '-45s',
        icon: Activity,
        color: '#00ff88'
    },
    {
        id: 'T-884',
        type: 'critical',
        source: 'PARKING SEC-9',
        message: 'VEHICULAR TRAJECTORY DIVERGENCE. INTERCEPT PROTOCOL READY.',
        time: '-1m',
        icon: AlertCircle,
        color: '#ff0033'
    },
]
const allMobileNotifications = [
    { title: 'Theft Alert', message: 'Suspicious handling detected in Retail Sector 4.', time: 'Now', color: '#ffaa00' },
    { title: 'Fire Detected', message: 'Thermal anomalies exceeding limit in Server Room B.', time: 'Now', color: '#ff0033' },
    { title: 'Glass Break', message: 'Acoustic sensor triggered at Ground Floor Entrance.', time: 'Now', color: '#00e5ff' },
    { title: 'Perimeter Breach', message: 'Unauthorized crossing at Fence Zone 2.', time: 'Now', color: '#ff0033' },
    { title: 'Unknown Intrusion', message: 'Facial recognition failed. Unregistered biological entity.', time: 'Now', color: '#ff0033' },
    { title: 'Weapon Detected', message: 'Visual match for concealed firearm at Gate A.', time: 'Now', color: '#ff0033' },
    { title: 'Unusual Activity', message: 'Multiple individuals lingering near restricted Area.', time: 'Now', color: '#ffaa00' },
    { title: 'Camera Disconnected', message: 'Video feed lost at Maintenance Tunnel 3.', time: 'Now', color: '#ffaa00' }
]

const ScrambleText = memo(({ text, start }) => {
    const [display, setDisplay] = useState(start ? "" : text)
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"

    useEffect(() => {
        if (!start) return
        let iter = 0
        const interval = setInterval(() => {
            setDisplay(text.split("").map((lettr, idx) => {
                if (idx < iter) return lettr
                return chars[Math.floor(Math.random() * chars.length)]
            }).join(""))
            if (iter >= text.length) clearInterval(interval)
            iter += 1 / 3
        }, 30)
        return () => clearInterval(interval)
    }, [text, start])

    return <span>{display}</span>
})

ScrambleText.displayName = 'ScrambleText'

const AlertEngine = memo(() => {
    const [inView, setInView] = useState(false)
    const [activeNotifs, setActiveNotifs] = useState([])
    const sectionRef = useRef(null)
    const timerRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setInView(entry.isIntersecting)
        }, { threshold: 0 })

        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!inView) return;
        let startTime = Date.now();
        let rafId;

        const updateTimer = () => {
            const now = Date.now();
            const diff = now - startTime;

            const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
            const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
            const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');

            if (timerRef.current) {
                timerRef.current.innerText = `${h}:${m}:${s}`;
            }
            rafId = requestAnimationFrame(updateTimer);
        }

        rafId = requestAnimationFrame(updateTimer);
        return () => cancelAnimationFrame(rafId);
    }, [inView]);

    useEffect(() => {
        if (!inView) return;
        let isRunning = true;
        let counter = 0;

        const runCycle = async () => {
            while (isRunning) {
                // Wait a bit before starting cycle
                await new Promise(r => setTimeout(r, 1000));

                // Add 3 notifications one by one
                for (let i = 0; i < 3; i++) {
                    if (!isRunning) return;
                    await new Promise(r => setTimeout(r, 1200)); // wait 1.2s before next
                    if (!isRunning) return;

                    const notiTemplate = allMobileNotifications[counter % allMobileNotifications.length];
                    const newNoti = { ...notiTemplate, uniqueId: `noti-${counter}` };
                    setActiveNotifs(prev => [...prev, newNoti]);
                    counter++;
                }

                // Wait 3 seconds viewing them
                if (!isRunning) return;
                await new Promise(r => setTimeout(r, 3000));

                // Clear screen
                if (!isRunning) return;
                setActiveNotifs([]);
            }
        };

        runCycle();

        return () => { isRunning = false; setActiveNotifs([]); };
    }, [inView]);

    return (
        <section
            className="ae-section"
            ref={sectionRef}
        >
            {/* Background elements */}
            <div className="ae-bg-scanline" />
            <div className="ae-bg-grid" />
            <div className="ae-ambient-glow" />

            <div className="ae-container">
                <div className="ae-header-wrapper">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="ae-badge"
                    >
                        <Radio size={14} className="ae-badge-icon" />
                        GLOBAL THREAT FEED
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                        viewport={{ once: true }}
                        className="ae-heading"
                    >
                        Intelligent <span className="ae-text-glow">Alert System</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="ae-subtext"
                    >
                        Real-time anomaly detection streaming directly into the command terminal. No cards. Just raw, prioritized intelligence.
                    </motion.p>
                </div>

                <div className="ae-hud-layout">
                    {/* Left: Mobile Screen Mockup */}
                    <div className="ae-mobile-mockup-wrapper">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="ae-mobile-frame"
                        >
                            <div className="ae-mobile-notch">
                                <div className="ae-mobile-camera"></div>
                            </div>
                            <div className="ae-mobile-screen">
                                <div className="ae-mobile-status-bar">
                                    <span>9:41</span>
                                    <div className="ae-mobile-status-icons">
                                        <Activity size={12} color="currentColor" />
                                        <Radio size={12} color="currentColor" />
                                    </div>
                                </div>
                                <div className="ae-mobile-notifications">
                                    <AnimatePresence>
                                        {activeNotifs.map((noti) => (
                                            <motion.div
                                                key={noti.uniqueId}
                                                className="ae-mobile-notification"
                                                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                                transition={{ type: "spring", stiffness: 100 }}
                                                style={{ borderLeft: `3px solid ${noti.color}` }}
                                            >
                                                <div className="ae-notif-header">
                                                    <div className="ae-notif-app">
                                                        <img src="/the3rdAiLogo.jpeg" alt="Logo" className="ae-notif-logo" />
                                                        <span className="ae-notif-appname">The3rdAI</span>
                                                    </div>
                                                    <span className="ae-notif-time">{noti.time}</span>
                                                </div>
                                                <div className="ae-notif-body">
                                                    <div className="ae-notif-title" style={{ color: noti.color }}>{noti.title}</div>
                                                    <div className="ae-notif-message">{noti.message}</div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Data Terminal Interface */}
                    <div className="ae-terminal">
                        <div className="ae-terminal-header">
                            <div className="ae-term-title">
                                <Cpu size={16} /> SEC_LOGS // TERMINAL OMEGA
                            </div>
                            <div className="ae-term-status">
                                <span className="ae-blink-text">REC</span>
                                <span className="ae-timer" ref={timerRef}>00:00:00</span>
                            </div>
                        </div>

                        <div className="ae-feed-list">
                            {feedData.map((feed, i) => {
                                const Icon = feed.icon
                                return (
                                    <motion.div
                                        key={feed.id}
                                        className="ae-feed-row"
                                        initial={{ opacity: 0, x: 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
                                        style={{ '--feed-color': feed.color }}
                                    >
                                        <div className="ae-feed-indicator" />
                                        <div className="ae-feed-content">
                                            <div className="ae-feed-top">
                                                <div className="ae-feed-meta">
                                                    <span className="ae-feed-id">[{feed.id}]</span>
                                                    <span className="ae-feed-source">{feed.source}</span>
                                                </div>
                                                <div className="ae-feed-time">{feed.time}</div>
                                            </div>
                                            <div className="ae-feed-message">
                                                <Icon size={16} className="ae-feed-icon" />
                                                <ScrambleText text={feed.message} start={true} />
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                        <div className="ae-terminal-footer">
                            <ShieldCheck size={14} className="ae-footer-icon" />
                            AWAITING NEW ENCRYPTED COMMUNICATIONS... <span className="ae-cursor">_</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
})

AlertEngine.displayName = 'AlertEngine'

export default AlertEngine
