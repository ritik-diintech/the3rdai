import { useState, useEffect, useRef, memo } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import contactBgVideo from '../../assets/videos/storeCamra.mp4'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
}

const faqs = [
    { q: 'What infrastructure is required for deployment?', a: 'The3rdAI works with any IP camera system. Our software-defined vision layer deploys without hardware changes — on-premise, cloud, or hybrid.' },
    { q: 'How long does deployment take?', a: 'Standard deployments complete in 2-4 weeks. Our AI begins learning your environment from day one and reaches optimal accuracy within 72 hours.' },
    { q: 'What about data privacy and compliance?', a: 'All data is encrypted end-to-end with AES-256. We are compliant with GDPR, SOC 2, and FIPS-140-2. Air-gapped deployments available for classified environments.' },
    { q: 'Can it integrate with existing security systems?', a: 'Yes. Our Open API integrates with all major VMS, access control, and alarm systems. Custom integrations available through our developer SDK.' },
]

const Contact = memo(() => {
    const pageRef = useRef(null)
    const [formData, setFormData] = useState({
        name: '', email: '', company: '', phone: '', service: '', message: ''
    })
    const [openFaq, setOpenFaq] = useState(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.contact-form-card',
                { opacity: 0, y: 60, scale: 0.97 },
                { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
            )

            gsap.fromTo('.contact-info-block',
                { opacity: 0, x: -40 },
                { opacity: 1, x: 0, duration: 0.8, delay: 0.2 }
            )

            gsap.fromTo('.faq-item',
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0, duration: 0.5, stagger: 0.1,
                    scrollTrigger: { trigger: '.faq-section', start: 'top 75%', toggleActions: 'play none none reverse' }
                }
            )
        }, pageRef)

        return () => ctx.revert()
    }, [])

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Thank you for your inquiry. Our intelligence team will reach out within 24 hours.')
    }

    return (
        <motion.main className="contact-page" ref={pageRef} variants={pageVariants} initial="initial" animate="animate" exit="exit">

            {/* Video Background */}
            <div className="contact-bg">
                <video autoPlay loop muted playsInline className="contact-bg-video">
                    <source src={contactBgVideo} type="video/mp4" />
                </video>
                <div className="contact-bg-overlay" />
                <div className="grid-bg" />
            </div>

            {/* Main Contact Section */}
            <section className="contact-section">
                <div className="container">
                    <div className="contact-content">
                        <div className="contact-info contact-info-block">
                            <div className="section-label">Contact</div>
                            <h1 className="heading-xl">
                                Secure Your{' '}
                                <span className="gradient-text">Infrastructure Today</span>
                            </h1>
                            <p className="text-body" style={{ marginTop: '20px', maxWidth: '480px' }}>
                                Connect with our intelligence team for deployment consultation, live demonstrations, and custom security architecture planning.
                            </p>

                            <div className="contact-details">
                                <div className="contact-detail">
                                    <span className="contact-detail-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="premium-icon">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                    </span>
                                    <div>
                                        <span className="contact-detail-label">Headquarters</span>
                                        <span className="contact-detail-value">C-116, Sector-2, Noida,<br />Uttar Pradesh – 201301, India</span>
                                    </div>
                                </div>
                                <div className="contact-detail">
                                    <span className="contact-detail-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="premium-icon">
                                            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                        </svg>
                                    </span>
                                    <div>
                                        <span className="contact-detail-label">Intelligence Desk</span>
                                        <span className="contact-detail-value">contact@diintech.com</span>
                                    </div>
                                </div>
                                <div className="contact-detail">
                                    <span className="contact-detail-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="premium-icon">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                        </svg>
                                    </span>
                                    <div>
                                        <span className="contact-detail-label">Secure Line</span>
                                        <span className="contact-detail-value">+91 81475 40362</span>
                                    </div>
                                </div>
                                <div className="contact-detail">
                                    <span className="contact-detail-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="premium-icon">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                                            <rect width="8" height="6" x="8" y="10" rx="1"></rect>
                                            <path d="M12 10v-2a2 2 0 1 0-4 0v2"></path>
                                        </svg>
                                    </span>
                                    <div>
                                        <span className="contact-detail-label">Encrypted Channel</span>
                                        <span className="contact-detail-value">Secure form available</span>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-trust">
                                <div className="contact-trust-item">
                                    <span className="contact-trust-val">24h</span>
                                    <span className="contact-trust-lbl">Response Time</span>
                                </div>
                                <div className="contact-trust-item">
                                    <span className="contact-trust-val">AES-256</span>
                                    <span className="contact-trust-lbl">Encrypted</span>
                                </div>
                                <div className="contact-trust-item">
                                    <span className="contact-trust-val">NDA</span>
                                    <span className="contact-trust-lbl">Available</span>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-card">
                            <div className="contact-form-glow" />
                            <div className="contact-form-header">
                                <h2 className="heading-md">Initiate Secure Channel</h2>
                                <p className="text-sm" style={{ marginTop: '8px' }}>All communications are encrypted end-to-end</p>
                            </div>
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="contact-name">Full Name *</label>
                                        <input id="contact-name" className="form-input" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
                                        <div className="form-input-line" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="contact-email">Email *</label>
                                        <input id="contact-email" className="form-input" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
                                        <div className="form-input-line" />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="contact-company">Organization</label>
                                        <input id="contact-company" className="form-input" type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company name" />
                                        <div className="form-input-line" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="contact-phone">Phone</label>
                                        <input id="contact-phone" className="form-input" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 00000 00000" />
                                        <div className="form-input-line" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="contact-service">Service Interest</label>
                                    <select id="contact-service" className="form-input form-select" name="service" value={formData.service} onChange={handleChange}>
                                        <option value="">Select a service</option>
                                        <option value="theft-detection">AI Theft Detection</option>
                                        <option value="smart-cctv">Smart CCTV Monitoring</option>
                                        <option value="alert-intelligence">Alert Intelligence</option>
                                        <option value="behavioral">Behavioral Recognition</option>
                                        <option value="command-center">24/7 Command Center</option>
                                        <option value="custom">Custom Solution</option>
                                    </select>
                                    <div className="form-input-line" />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="contact-message">Intelligence Brief *</label>
                                    <textarea id="contact-message" className="form-input form-textarea" name="message" value={formData.message} onChange={handleChange} placeholder="Describe your security requirements, infrastructure, and deployment timeline..." rows="5" required />
                                    <div className="form-input-line" />
                                </div>

                                <button type="submit" className="btn-primary contact-submit">
                                    <span>Initiate Secure Channel</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="contact-section faq-section">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <div className="section-label" style={{ justifyContent: 'center' }}>FAQ</div>
                        <h2 className="heading-lg">Frequently Asked <span className="gradient-text">Questions</span></h2>
                    </div>
                    <div className="faq-list">
                        {faqs.map((faq, i) => (
                            <div className={`faq-item ${openFaq === i ? 'faq-open' : ''}`} key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <div className="faq-question">
                                    <span>{faq.q}</span>
                                    <span className="faq-toggle">{openFaq === i ? '−' : '+'}</span>
                                </div>
                                {openFaq === i && (
                                    <div className="faq-answer">
                                        <p className="text-body">{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Global Presence */}
            <section className="contact-section contact-presence">
                <div className="container" style={{ textAlign: 'center' }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>Global Presence</div>
                    <h2 className="heading-xl">Intelligence <span className="gradient-text">Everywhere.</span></h2>
                    <p className="text-body" style={{ maxWidth: '520px', margin: '16px auto 48px' }}>
                        Deployed across 8 countries with 24/7 support teams in every major timezone.
                    </p>
                    <div className="presence-stats">
                        <div className="presence-stat">
                            <span className="presence-stat-val gradient-text">24/7</span>
                            <span className="presence-stat-lbl">Global Support</span>
                        </div>
                        <div className="presence-stat">
                            <span className="presence-stat-val gradient-text">8</span>
                            <span className="presence-stat-lbl">Countries</span>
                        </div>
                        <div className="presence-stat">
                            <span className="presence-stat-val gradient-text">50+</span>
                            <span className="presence-stat-lbl">Cities</span>
                        </div>
                        <div className="presence-stat">
                            <span className="presence-stat-val gradient-text">99.99%</span>
                            <span className="presence-stat-lbl">SLA</span>
                        </div>
                    </div>
                </div>
            </section>
        </motion.main>
    )
})

Contact.displayName = 'Contact'

export default Contact
