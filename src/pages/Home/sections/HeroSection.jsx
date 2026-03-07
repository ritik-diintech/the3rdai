import { useEffect, useRef, useState, memo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import heroBg from '../../../assets/images/hero_bgImage.jpg'

const HeroSection = memo(() => {
    const heroRef = useRef(null)
    const particlesRef = useRef(null)
    const timerRef = useRef(null)

    const [pageLoaded, setPageLoaded] = useState(false)
    const [scannerTriggered, setScannerTriggered] = useState(false)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting)
        }, { threshold: 0 })

        if (heroRef.current) observer.observe(heroRef.current)
        return () => observer.disconnect()
    }, [])

    // Wait for full page load before showing scanner
    useEffect(() => {
        const onLoad = () => setPageLoaded(true)
        if (document.readyState === 'complete') {
            setPageLoaded(true)
        } else {
            window.addEventListener('load', onLoad)
            return () => window.removeEventListener('load', onLoad)
        }
    }, [])

    // Live REC Timer
    useEffect(() => {
        if (!isVisible) return;
        let startTime = Date.now()
        let animationId;

        const updateTimer = () => {
            const now = Date.now()
            const diff = now - startTime

            // Format diff into HH:MM:SS:MS
            const hours = Math.floor(diff / 3600000).toString().padStart(2, '0')
            const minutes = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0')
            const seconds = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0')
            const ms = Math.floor((diff % 1000) / 10).toString().padStart(2, '0')

            if (timerRef.current) {
                timerRef.current.innerText = `${hours}:${minutes}:${seconds}:${ms}`
            }
            animationId = requestAnimationFrame(updateTimer)
        }

        animationId = requestAnimationFrame(updateTimer)
        return () => cancelAnimationFrame(animationId)
    }, [isVisible])

    useEffect(() => {
        // Generate AI target tracking and data streams
        const container = particlesRef.current
        if (!container) return

        // 2. Data Processing Blocks (Micro glitches) - Reduced count for "normal" style
        for (let i = 0; i < 6; i++) {
            const block = document.createElement('div')
            block.className = 'hero-data-block'
            block.style.left = `${Math.random() * 100}%`
            block.style.top = `${Math.random() * 100}%`
            block.style.width = `${Math.random() * 30 + 10}px`
            block.style.height = `${Math.random() * 3 + 2}px`
            block.style.animationDelay = `${Math.random() * 5}s`
            container.appendChild(block)
        }

        // 3. AI Target Locks (simulated object detection) - Reduced count for "normal" style
        for (let i = 0; i < 5; i++) {
            const target = document.createElement('div')
            target.className = 'hero-target-lock'
            target.style.left = `${Math.random() * 90 + 5}%`
            target.style.top = `${Math.random() * 80 + 10}%`
            target.style.animationDelay = `${Math.random() * 8}s`

            const size = 30 + Math.random() * 40
            target.style.width = `${size}px`
            target.style.height = `${size}px`

            const label = document.createElement('span')
            label.className = 'target-label'
            const ids = ['TRK', 'OBJ', 'FACE']
            label.innerText = `${ids[Math.floor(Math.random() * ids.length)]}_${Math.floor(Math.random() * 999)}`
            target.appendChild(label)

            container.appendChild(target)
        }

        let tl;

        // We ensure Hero animations only start AFTER preloader has fully faded out and removed .loading class on .app
        const startHeroAnimation = () => {
            tl = gsap.timeline({
                delay: 0.1, // Start almost immediately once preloader is gone
                onComplete: () => setScannerTriggered(true) // Start scanner after content is loaded
            })
            tl.fromTo('.hero-brand-line-left', { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' })
                .fromTo('.hero-brand-line-right', { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, '-=0.6')
                .fromTo('.hero-title-line', { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1, stagger: 0.15, ease: 'power4.out' }, '-=0.3')
                .fromTo('.hero-divider', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4')
                .fromTo('.hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
                .fromTo('.hero-stats-row', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
                .fromTo('.hero-buttons', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
                .fromTo('.hero-scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.2')
        };

        const checkPreloader = setInterval(() => {
            const app = document.querySelector('.app');
            if (app && !app.classList.contains('loading')) {
                clearInterval(checkPreloader);
                startHeroAnimation();
            }
        }, 50);

        return () => {
            clearInterval(checkPreloader);
            if (tl) tl.kill();
        }
    }, [])

    // Mouse reactive light
    useEffect(() => {
        const hero = heroRef.current
        if (!hero) return

        const handleMouseMove = (e) => {
            const rect = hero.getBoundingClientRect()
            const x = ((e.clientX - rect.left) / rect.width) * 100
            const y = ((e.clientY - rect.top) / rect.height) * 100
            hero.style.setProperty('--mouse-x', `${x}%`)
            hero.style.setProperty('--mouse-y', `${y}%`)
        }

        hero.addEventListener('mousemove', handleMouseMove)
        return () => hero.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <section className="hero" ref={heroRef}>
            {/* One-time Cinematic Scanner */}
            <div className={`hero-initial-scanner ${scannerTriggered ? 'scanner-active' : ''}`}>
                <div className="scanner-glow-line" />
                <div className="scanner-trail" />
                <div className="scanner-edge-flare scanner-flare-left" />
                <div className="scanner-edge-flare scanner-flare-right" />
                <div className="scanner-flash" />
            </div>

            <div className="hero-bg">
                <div className="hero-bg-image" style={{ backgroundImage: `url(${heroBg})` }} />
                <div className="hero-bg-gradient" />
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 240, 255, 0.06), transparent 60%)',
                        pointerEvents: 'none',
                    }}
                />
            </div>

            <div ref={particlesRef} className="hero-particles" />
            <div className="hero-scan-beam" />

            {/* Decorative grid corners */}
            <div className="hero-corner hero-corner-tl" />
            <div className="hero-corner hero-corner-tr" />
            <div className="hero-corner hero-corner-bl" />
            <div className="hero-corner hero-corner-br" />

            {/* Camera Recording indicator (Bottom Left) */}
            <div className="hero-rec-indicator">
                <span className="rec-dot" />
                <span className="rec-text">3RD.AI_ACTIVE</span>
                <span className="rec-timer" ref={timerRef}>00:00:00:00</span>
            </div>

            {/* Orbital rings */}
            <div className="hero-orbital hero-orbital-1" />
            <div className="hero-orbital hero-orbital-2" />
            <div className="hero-orbital hero-orbital-3" />

            <div className="hero-content">

                {/* Brand name with lines */}
                <div className="hero-brand">
                    <span className="hero-brand-line-left" />
                    <span className="hero-brand-name">The3rd<span className="hero-brand-ai">AI</span></span>
                    <span className="hero-brand-line-right" />
                </div>

                {/* Main title — split into animated lines */}
                {/* intelligence beyond vision */}
                <h1 className="hero-title">
                    <span className="hero-title-line">
                        Intelligence <span className="hero-title-outline">Beyond</span>
                    </span>
                    <span className="hero-title-line hero-title-line-glow">
                        Vision<span className="hero-title-dot">.</span>
                    </span>
                </h1>

                {/* Divider */}
                <div className="hero-divider" />

                <p className="hero-sub">
                    Powerful AI CCTV vision systems powered by next-generation neural architecture.
                    Protecting what matters — seamlessly, relentlessly, intelligently.
                </p>

                <div className="hero-buttons">
                    <Link to="/contact" className="btn-primary">
                        <span>Deploy Intelligence</span>
                    </Link>
                    <Link to="/contact" className="btn-outline">
                        <span>Request Live Demo</span>
                    </Link>
                </div>

                {/* Stats row — below buttons */}
                <div className="hero-stats-row">
                    <div className="hero-stat-item">
                        <span className="hero-stat-value">99.7%</span>
                        <span className="hero-stat-label">Detection Rate</span>
                    </div>
                    <span className="hero-stat-dot" />
                    <div className="hero-stat-item">
                        <span className="hero-stat-value">&lt;0.3s</span>
                        <span className="hero-stat-label">Response Time</span>
                    </div>
                    <span className="hero-stat-dot" />
                    <div className="hero-stat-item">
                        <span className="hero-stat-value">24/7</span>
                        <span className="hero-stat-label">Active Watch</span>
                    </div>
                </div>
            </div>

            <div className="hero-scroll-indicator">
                <div className="scroll-line" />
                <span className="scroll-text">Scroll</span>
            </div>

            {/* Bottom edge glow */}
            <div className="hero-bottom-glow" />
        </section>
    )
})

HeroSection.displayName = 'HeroSection'

export default HeroSection
