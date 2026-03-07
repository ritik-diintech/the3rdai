import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import Navbar from './components/Navbar/Navbar'
import CustomCursor from './components/CustomCursor/CustomCursor'
import NoiseOverlay from './components/NoiseOverlay/NoiseOverlay'
import Footer from './components/Footer/Footer'
import Preloader from './components/Preloader/Preloader'
import './App.css'

import Home from './pages/Home/Home'
import About from './pages/About/About'
import Security from './pages/Security/Security'
import Services from './pages/Services/Services'
import ControlCenter from './pages/ControlCenter/ControlCenter'
import Contact from './pages/Contact/Contact'

// Removed PageLoader as per user request to remove "INITIALIZING INTELLIGENCE" preloader


function App() {
  const location = useLocation()
  const lenisRef = useRef(null)
  const [loadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })
    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (lenisRef.current) {
      if (!loadingComplete) {
        lenisRef.current.stop()
      } else {
        lenisRef.current.start()
      }
    }
  }, [loadingComplete])

  useEffect(() => {
    if (lenisRef.current && loadingComplete) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
    window.scrollTo(0, 0)
  }, [location.pathname, loadingComplete])

  return (
    <div className={`app ${!loadingComplete ? 'loading' : ''}`}>
      {!loadingComplete && <Preloader onComplete={() => setLoadingComplete(true)} />}

      <CustomCursor />
      <NoiseOverlay />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/security" element={<Security />} />
          <Route path="/services" element={<Services />} />
          <Route path="/control-center" element={<ControlCenter />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default App
