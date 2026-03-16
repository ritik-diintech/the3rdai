import { Link } from 'react-router-dom'
import { memo } from 'react'
import './Footer.css'

const Footer = memo(() => {
    return (
        <footer className="footer">
            <div className="footer-glow-line" />
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <img src="/3rdAiLogo.jpeg" alt="3rdAI" className="footer-logo-img" />
                            <div>
                                <h3 className="footer-logo-name">3RD<span className="logo-ai">AI</span></h3>
                                <p className="footer-tagline">Vision Beyond Surveillance</p>
                            </div>
                        </div>
                        <p className="footer-desc text-body">
                            Autonomous AI intelligence platform delivering advanced AI vision security for the modern world.
                        </p>
                    </div>

                    <div className="footer-nav-group">
                        <h4 className="footer-nav-title">Platform</h4>
                        <Link to="/security" className="footer-link">Security Technology</Link>
                        <Link to="/services" className="footer-link">Services</Link>
                        <Link to="/control-center" className="footer-link">Control Center</Link>
                    </div>

                    <div className="footer-nav-group">
                        <h4 className="footer-nav-title">Company</h4>
                        <Link to="/about" className="footer-link">About</Link>
                        <Link to="/contact" className="footer-link">Contact</Link>
                        <Link to="/pp" className="footer-link">Privacy Policy</Link>
                    </div>

                    <div className="footer-nav-group">
                        <h4 className="footer-nav-title">Intelligence</h4>
                        <span className="footer-link">Threat Detection</span>
                        <span className="footer-link">Neural Mapping</span>
                        <span className="footer-link">Edge Computing</span>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {new Date().getFullYear()} 3rdAI. All systems monitored.
                    </p>
                    <div className="footer-status">
                        <span className="status-dot" />
                        <span className="status-text">All Systems Operational</span>
                    </div>
                </div>
            </div>
        </footer>
    )
})

Footer.displayName = 'Footer'

export default Footer
