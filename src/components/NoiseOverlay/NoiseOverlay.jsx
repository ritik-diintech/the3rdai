import { memo } from 'react'
import './NoiseOverlay.css'

const NoiseOverlay = memo(() => {
    return <div className="noise-overlay" aria-hidden="true" />
})

NoiseOverlay.displayName = 'NoiseOverlay'

export default NoiseOverlay
