import { motion } from 'framer-motion'

export default function SplashScreen({ onComplete }) {
    return (
        <motion.div
            style={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            onAnimationComplete={() => setTimeout(onComplete, 2500)}
        >
            <motion.p
                style={styles.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1.2 }}
            >
                Happy Birthday, my Princess 🤍
            </motion.p>
        </motion.div>
    )
}

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 'clamp(1.5rem, 6vw, 2rem)',
        letterSpacing: '0.05em',
        color: '#4a2030',
        fontStyle: 'italic',
        padding: '0 1rem',
        textAlign: 'center',
    }
}