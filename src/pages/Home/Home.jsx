import { motion } from 'framer-motion'
import HeroSection from './sections/HeroSection'
import ScanDemo from './sections/ScanDemo'
import ThreatEngine from './sections/ThreatEngine'
import Architecture from './sections/Architecture'
import Industries from './sections/Industries'
import AlertEngine from './sections/AlertEngine'
import Analytics from './sections/Analytics'
import WhyThe3rdAI from './sections/WhyThe3rdAI'
import GlobalImpact from './sections/GlobalImpact'
import CommandFooter from './sections/CommandFooter'
import './Home.css'

const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
}

export default function Home() {
    return (
        <motion.main
            className="home-page"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <HeroSection />
            <ScanDemo />
            <ThreatEngine />
            <Architecture />
            <Industries />
            <AlertEngine />
            <Analytics />
            <WhyThe3rdAI />
            <GlobalImpact />
            <CommandFooter />
        </motion.main>
    )
}
