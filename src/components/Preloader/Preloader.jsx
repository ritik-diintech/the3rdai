import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

export default function Preloader({ onComplete }) {
    const [isDone, setIsDone] = useState(false);
    const [showStatus, setShowStatus] = useState(false);

    // Using refs directly attached to DOM elements completely bypasses React's
    // rendering cycle, ensuring perfectly 60fps/120fps hardware-synced smooth movement.
    const counterRef = useRef(null);
    const revealerRef = useRef(null);
    const beamRef = useRef(null);
    const scanlineRef = useRef(null);
    const progressBarRef = useRef(null);

    useEffect(() => {
        let startTime;
        let isLoaded = document.readyState === 'complete';
        let duration = isLoaded ? 2000 : 4000; // Slightly slower default durations
        let animationFrame;
        let finished = false;

        // If page loads while preloader is running, we can fast-forward
        const handleLoad = () => {
            isLoaded = true;
            // No need to change duration mid-flight, but we could if we wanted to be super aggressive
        };
        window.addEventListener('load', handleLoad);

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            // If loaded, we can speed up the progress
            const effectiveDuration = isLoaded ? Math.min(duration, 2500) : duration;
            let t = Math.min(elapsed / effectiveDuration, 1);

            // Premium smooth easeInOutCubic curve mapping
            let easeT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

            const currentVW = easeT * 100;

            // PRECISE EYE ORIGIN: Hardcoded estimate of the Eye's location in the logo image
            const eyeX = `50vw`;
            const eyeY = `46vh`;

            // Direct DOM mutations to bypass any lag
            if (counterRef.current) {
                counterRef.current.innerText = Math.floor(currentVW).toString();
            }
            if (revealerRef.current) {
                revealerRef.current.style.width = `${currentVW}vw`;
            }
            if (beamRef.current) {
                beamRef.current.style.clipPath = `polygon(${eyeX} ${eyeY}, ${currentVW - 1.5}vw -10vh, ${currentVW}vw -10vh, ${currentVW}vw 110vh, ${currentVW - 1.5}vw 110vh)`;
            }
            if (scanlineRef.current) {
                scanlineRef.current.style.left = `${currentVW}vw`;
            }
            if (progressBarRef.current) {
                progressBarRef.current.style.width = `${currentVW}%`;
            }

            if (t < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else if (!finished) {
                finished = true;
                setShowStatus(true);

                // Keep text visible for longer so user can read it clearly
                const finishDelay = 2200; // Force it to stay for 2.2 seconds before disappearing
                setTimeout(() => {
                    setIsDone(true);
                    if (onComplete) {
                        // Let the 1.2s exit animation mostly finish before unmounting to ensure a smooth crossfade
                        setTimeout(onComplete, 1000);
                    }
                }, finishDelay);
            }
        };

        // Reduce initial wait
        const startTimeout = setTimeout(() => {
            animationFrame = requestAnimationFrame(animate);
        }, 100);

        return () => {
            window.removeEventListener('load', handleLoad);
            clearTimeout(startTimeout);
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isDone && (
                <motion.div
                    className="preloader-container"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1.2, ease: 'easeInOut' } }}
                >
                    <div className="preloader-haze"></div>

                    {/* Left half reveal layer */}
                    <div className="preloader-scanned-revealer" ref={revealerRef} style={{ width: '0vw' }}>
                        <div className="preloader-revealed-content">
                            <div className="revealed-grid"></div>
                            <div className="revealed-hud"></div>
                            <div className="revealed-mapping"></div>
                        </div>
                    </div>

                    {/* Volumetric scanner beam overlay - Sharp Triangular */}
                    <div className="preloader-beam-volume">
                        <div className="beam-sharp-core" ref={beamRef}></div>
                    </div>

                    {/* Sharp precise laser scanline */}
                    <div className="preloader-scanline" ref={scanlineRef} style={{ left: '0vw' }}></div>

                    {/* Top Centered Text */}
                    <div className="preloader-top-text">
                        CONVERSATIONAL INTELLIGENCE
                    </div>

                    {/* Center content container rests above light beams conceptually */}
                    <div className="preloader-content">
                        <div className="preloader-logo-container">
                            <img src="/the3rdAiLogo.jpeg" alt="The3rdAI Logo" className="preloader-logo-original" />
                        </div>
                    </div>

                    {/* Bottom Progress UI */}
                    <div className="preloader-footer-new">
                        <div className="footer-content">
                            <div className="footer-left">
                                <div className="loading-label">{showStatus ? "SYSTEM STATUS" : "INITIALIZING"}</div>
                                {showStatus ? (
                                    <motion.div
                                        initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
                                        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                                        transition={{ duration: 0.6, ease: 'easeOut' }}
                                        className="loading-text-clear"
                                    >
                                        INTELLIGENCE CORE — ONLINE
                                    </motion.div>
                                ) : (
                                    <div className="loading-number" ref={counterRef}>0</div>
                                )}
                            </div>
                            <div className="footer-right">
                                <div className="copyright">© 2026 THE3RDAI</div>
                            </div>
                        </div>
                        <div className="footer-progress-bar">
                            <div className="footer-progress-fill" ref={progressBarRef}></div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
