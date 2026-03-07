import { useEffect, useRef, memo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GlobalImpact = memo(() => {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.global-impact-content > *',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.2,
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'play none none reverse' }
                }
            )

            // Animate counter numbers
            const counters = document.querySelectorAll('.impact-stat-value')
            counters.forEach((counter) => {
                const target = counter.textContent
                const numMatch = target.match(/[\d.]+/)
                if (numMatch) {
                    const num = parseFloat(numMatch[0])
                    const suffix = target.replace(numMatch[0], '')
                    gsap.fromTo(counter,
                        { textContent: '0' },
                        {
                            duration: 2,
                            ease: 'power2.out',
                            scrollTrigger: { trigger: counter, start: 'top 85%', toggleActions: 'play none none reverse' },
                            onUpdate: function () {
                                const progress = this.progress()
                                const current = Math.round(num * progress)
                                counter.textContent = current + suffix
                            },
                            onComplete: function () {
                                counter.textContent = target
                            }
                        }
                    )
                }
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="global-impact" ref={sectionRef}>
            <div className="global-impact-bg" />
            <div className="global-impact-content">
                <div className="section-label" style={{ justifyContent: 'center' }}>Global Impact</div>
                <h2 className="heading-xl">
                    Protecting the World,{' '}
                    <span className="gradient-text">One Frame at a Time.</span>
                </h2>
                <p className="text-body" style={{ maxWidth: '560px', margin: '20px auto 0' }}>
                    From smart cities to critical infrastructure, The3rdAI delivers intelligence at scale.
                </p>

                <div className="impact-stat-row">
                    <div className="impact-stat">
                        <div className="impact-stat-value">50+</div>
                        <div className="impact-stat-label">Cities Secured</div>
                    </div>
                    <div className="impact-stat">
                        <div className="impact-stat-value">12K+</div>
                        <div className="impact-stat-label">Active Cameras</div>
                    </div>
                    <div className="impact-stat">
                        <div className="impact-stat-value">99.9%</div>
                        <div className="impact-stat-label">Uptime SLA</div>
                    </div>
                    <div className="impact-stat">
                        <div className="impact-stat-value">0.3ms</div>
                        <div className="impact-stat-label">Response Time</div>
                    </div>
                </div>
            </div>
        </section>
    )
})

GlobalImpact.displayName = 'GlobalImpact'

export default GlobalImpact
