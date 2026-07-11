import { useEffect, useRef, memo } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CommandFooter = memo(() => {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.command-footer-box',
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1, scale: 1, duration: 1,
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="command-footer" ref={sectionRef}>
            <div className="grid-bg" />
            <div className="container">
                <div className="command-footer-box">
                    <div className="section-label" style={{ justifyContent: 'center' }}>Take Command</div>
                    <h2 className="command-footer-title">
                        Ready to Deploy <span className="gradient-text">Autonomous Intelligence?</span>
                    </h2>
                    <p className="command-footer-desc">
                        Join the next generation of security. Deploy 3rdAI across your infrastructure today.
                    </p>
                    <div className="command-footer-buttons">
                        <Link to="/contact" className="btn-primary">
                            <span>Deploy Intelligence</span>
                        </Link>
                        <Link to="/contact" className="btn-outline">
                            <span>Schedule Briefing</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
})

CommandFooter.displayName = 'CommandFooter'

export default CommandFooter
