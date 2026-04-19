import { motion } from 'framer-motion'
import { reasons } from '../data/content'
import { useEffect, useRef } from 'react'

export default function Reasons({ onFinished }) {
    const bottomRef = useRef(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <motion.div
            style={styles.container}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 2 } }}
            variants={{ visible: { transition: { staggerChildren: 1.4 } } }}
        >
            <motion.p
                style={styles.heading}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                transition={{ duration: 1 }}
            >
                And a few reasons why...
            </motion.p>

            {reasons.map((reason, i) => (
                <motion.p
                    key={i}
                    style={styles.reason}
                    variants={{
                        hidden: { opacity: 0, y: 16 },
                        visible: { opacity: 1, y: 0, transition: { duration: 1.4 } }
                    }}
                    onAnimationStart={() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })}
                >
                    {i + 1}. {reason}
                </motion.p>
            ))}

            <motion.div
                style={styles.closing}
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 2, delay: reasons.length * 1.4 } }
                }}
                onAnimationStart={() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })}
                onAnimationComplete={onFinished}
            >
                <p style={styles.closingLine}>Enjoy your day my love 🤍</p>

            </motion.div>

            <div ref={bottomRef} style={{ height: '10px' }} />
        </motion.div>
    )
}

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(2rem, 6vw, 4rem) clamp(1rem, 5vw, 2rem)',
        maxWidth: '680px',
        margin: '0 auto',
        gap: 'clamp(1rem, 4vw, 2rem)',
    },
    heading: {
        fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)',
        letterSpacing: '0.1em',
        color: '#c9728a',
        marginBottom: '1rem',
        textTransform: 'uppercase',
    },
    reason: {
        fontSize: 'clamp(1rem, 4vw, 1.2rem)',
        lineHeight: 1.9,
        color: '#4a2030',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    closing: {
        marginTop: 'clamp(2rem, 5vw, 4rem)',
        paddingTop: 'clamp(2rem, 5vw, 3rem)',
        borderTop: '1px solid rgba(74, 32, 48, 0.15)',
        textAlign: 'center',
        paddingBottom: 'clamp(3rem, 8vw, 6rem)',
    },
    closingLine: {
        fontSize: 'clamp(1.1rem, 4.5vw, 1.4rem)',
        fontStyle: 'italic',
        color: '#4a2030',
        marginBottom: '1rem',
    },
    closingName: {
        fontSize: 'clamp(0.85rem, 3vw, 1rem)',
        color: '#c9728a',
        letterSpacing: '0.1em',
    }
}