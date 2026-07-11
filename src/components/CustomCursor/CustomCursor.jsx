import { useEffect, useRef, memo } from 'react'
import './CustomCursor.css'

const CustomCursor = memo(() => {
    const cursorRef = useRef(null)
    const glowRef = useRef(null)
    const coordsRef = useRef(null)

    useEffect(() => {
        const isMobile = window.matchMedia('(max-width: 768px)').matches
        if (isMobile) return

        const cursor = cursorRef.current
        const glow = glowRef.current
        const coords = coordsRef.current
        if (!cursor || !glow) return

        let mouseX = -100, mouseY = -100
        let cursorX = -100, cursorY = -100
        let glowX = -100, glowY = -100
        let rafId
        let hovering = false
        let coordFrame = 0

        const onMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY

            // Hover detection — check only on move
            const interactive = e.target.closest('a, button, input, textarea, select, [data-cursor], [role="button"]')
            if (interactive && !hovering) {
                hovering = true
                cursor.classList.add('cursor-hover')
                glow.classList.add('glow-hover')
            } else if (!interactive && hovering) {
                hovering = false
                cursor.classList.remove('cursor-hover')
                glow.classList.remove('glow-hover')
            }
        }

        const onDown = () => cursor.classList.add('cursor-click')
        const onUp = () => cursor.classList.remove('cursor-click')
        const onLeave = () => { cursor.style.opacity = '0'; glow.style.opacity = '0' }
        const onEnter = () => { cursor.style.opacity = '1'; glow.style.opacity = '1' }

        function tick() {
            // Lerp — fast for cursor, slower for glow
            cursorX += (mouseX - cursorX) * 0.2
            cursorY += (mouseY - cursorY) * 0.2
            glowX += (mouseX - glowX) * 0.08
            glowY += (mouseY - glowY) * 0.08

            cursor.style.transform = `translate3d(${cursorX}px,${cursorY}px,0)`
            glow.style.transform = `translate3d(${glowX}px,${glowY}px,0)`

            // Update coords every 4th frame to reduce text layout thrash
            if (coords && (coordFrame++ & 3) === 0) {
                coords.textContent = `X:${String(mouseX | 0).padStart(4, '0')} Y:${String(mouseY | 0).padStart(4, '0')}`
            }

            rafId = requestAnimationFrame(tick)
        }

        rafId = requestAnimationFrame(tick)

        window.addEventListener('mousemove', onMove, { passive: true })
        window.addEventListener('mousedown', onDown, { passive: true })
        window.addEventListener('mouseup', onUp, { passive: true })
        document.documentElement.addEventListener('mouseleave', onLeave)
        document.documentElement.addEventListener('mouseenter', onEnter)

        return () => {
            cancelAnimationFrame(rafId)
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mousedown', onDown)
            window.removeEventListener('mouseup', onUp)
            document.documentElement.removeEventListener('mouseleave', onLeave)
            document.documentElement.removeEventListener('mouseenter', onEnter)
        }
    }, [])

    return (
        <>
            {/* Main Cursor — AI Targeting Reticle */}
            <div ref={cursorRef} className="ai-cursor">
                <div className="cursor-core" />

                {/* Crosshair */}
                <div className="crosshair-line top" />
                <div className="crosshair-line bottom" />
                <div className="crosshair-line left" />
                <div className="crosshair-line right" />

                {/* Rotating reticle */}
                <div className="cursor-reticle">
                    <div className="reticle-seg" />
                    <div className="reticle-seg" />
                    <div className="reticle-seg" />
                    <div className="reticle-seg" />
                </div>

                {/* Outer dashed ring */}
                <div className="cursor-scan-ring" />

                {/* HUD brackets */}
                <div className="cursor-bracket tl" />
                <div className="cursor-bracket tr" />
                <div className="cursor-bracket bl" />
                <div className="cursor-bracket br" />

                {/* Coordinate readout */}
                <span ref={coordsRef} className="cursor-coords">X:0000 Y:0000</span>
            </div>

            {/* Trailing Glow */}
            <div ref={glowRef} className="cursor-trail-glow" />
        </>
    )
})

CustomCursor.displayName = 'CustomCursor'

export default CustomCursor
