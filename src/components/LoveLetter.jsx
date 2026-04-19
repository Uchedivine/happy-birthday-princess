import { useTypewriter } from '../hooks/useTypewriter'
import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { letter } from '../data/content'

const starTypes = ['✦', '✧', '⋆', '★', '✩', '·']

function FallingStars() {
    const [stars, setStars] = useState([])

    useEffect(() => {
        const items = Array.from({ length: 40 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 6,
            duration: 4 + Math.random() * 5,
            symbol: starTypes[Math.floor(Math.random() * starTypes.length)],
            size: 10 + Math.random() * 16,
            opacity: 0.3 + Math.random() * 0.6,
        }))
        setStars(items)
    }, [])

    return (
        <div style={styles.starsContainer}>
            {stars.map(s => (
                <motion.span
                    key={s.id}
                    style={{
                        position: 'absolute',
                        left: `${s.x}%`,
                        top: '-30px',
                        fontSize: `${s.size}px`,
                        color: '#c9728a',
                        opacity: s.opacity,
                        pointerEvents: 'none',
                    }}
                    animate={{
                        y: ['0vh', '105vh'],
                        opacity: [0, s.opacity, s.opacity, 0],
                        rotate: [0, 180],
                    }}
                    transition={{
                        delay: s.delay,
                        duration: s.duration,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    {s.symbol}
                </motion.span>
            ))}
        </div>
    )
}

export default function LoveLetter({ onFinished }) {
    const bottomRef = useRef(null)
    const { displayed, done } = useTypewriter(letter, {
        speed: 75,
        humanize: true,
        onFinished,
    })

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, [displayed])

    return (
        <motion.div
            style={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 2 } }}
            transition={{ duration: 1.5 }}
        >
            <FallingStars />

            <p style={styles.text}>
                {displayed.split('\n').map((line, i) => (
                    <span key={i}>
                        {line}
                        <br />
                    </span>
                ))}
                {!done && <span className="cursor" />}
                <span ref={bottomRef} style={{ display: 'inline-block', width: '0' }} />
            </p>
        </motion.div>
    )
}

const styles = {
    starsContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
    },
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(2rem, 6vw, 4rem) clamp(1rem, 5vw, 2rem)',
        maxWidth: '680px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
    },
    text: {
        fontSize: 'clamp(1rem, 4vw, 1.3rem)',
        lineHeight: 2.2,
        color: '#4a2030',
        fontStyle: 'italic',
        position: 'relative',
        zIndex: 1,
    }
}