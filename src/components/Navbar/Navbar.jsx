import { useState, useEffect, memo, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const navLinks = [
    { path: '/', label: 'Home', component: () => import('../../pages/Home/Home') },
    { path: '/about', label: 'About', component: () => import('../../pages/About/About') },
    { path: '/security', label: 'Security', component: () => import('../../pages/Security/Security') },
    { path: '/services', label: 'Services', component: () => import('../../pages/Services/Services') },
    { path: '/control-center', label: 'Control Center', component: () => import('../../pages/ControlCenter/ControlCenter') },
    { path: '/contact', label: 'Contact', component: () => import('../../pages/Contact/Contact') },
]

const Navbar = memo(() => {
    const location = useLocation()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setMenuOpen(false)
    }, [location.pathname])

    const prefetchRoute = useCallback((importFunc) => {
        if (importFunc) importFunc();
    }, []);

    return (
        <>
            <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
                <div className="navbar-inner">
                    <Link to="/" className="navbar-logo" aria-label="3rdAI Home" onMouseEnter={() => prefetchRoute(navLinks[0].component)}>
                        <img src="/3rdAiLogo.jpeg" alt="3rdAI" className="navbar-logo-img" />
                        <div className="navbar-logo-text">
                            <span className="logo-name">3RD<span className="logo-ai">AI</span></span>
                        </div>
                    </Link>

                    <div className="navbar-links">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`nav-link ${location.pathname === link.path ? 'nav-link-active' : ''}`}
                                onMouseEnter={() => prefetchRoute(link.component)}
                            >
                                <span className="nav-link-text">{link.label}</span>
                                {location.pathname === link.path && (
                                    <motion.div
                                        className="nav-link-indicator"
                                        layoutId="navIndicator"
                                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    <Link to="/contact" className="navbar-cta" onMouseEnter={() => prefetchRoute(navLinks[navLinks.length - 1].component)}>
                        <span>Deploy AI</span>
                        <div className="cta-pulse" />
                    </Link>

                    <button
                        className={`navbar-hamburger ${menuOpen ? 'hamburger-open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
                        animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
                        exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="mobile-menu-inner">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.06 }}
                                >
                                    <Link
                                        to={link.path}
                                        className={`mobile-link ${location.pathname === link.path ? 'mobile-link-active' : ''}`}
                                        onMouseEnter={() => prefetchRoute(link.component)}
                                    >
                                        <span className="mobile-link-index">0{i + 1}</span>
                                        <span className="mobile-link-label">{link.label}</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                        <div className="mobile-menu-footer">
                            <Link to="/contact" className="btn-primary" onMouseEnter={() => prefetchRoute(navLinks[navLinks.length - 1].component)}>
                                <span>Deploy Intelligence</span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
})

Navbar.displayName = 'Navbar'

export default Navbar
