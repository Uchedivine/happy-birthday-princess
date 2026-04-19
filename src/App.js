import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import SplashScreen from './components/SplashScreen'
import LoveLetter from './components/LoveLetter'
import Reasons from './components/Reasons'
import Celebration from './components/Celebration'

export default function App() {
  const [phase, setPhase] = useState('splash')

  return (
    <AnimatePresence mode="wait">
      {phase === 'splash' && (
        <SplashScreen key="splash" onComplete={() => setPhase('letter')} />
      )}
      {phase === 'letter' && (
        <LoveLetter key="letter" onFinished={() => setTimeout(() => setPhase('reasons'), 2000)} />
      )}
      {phase === 'reasons' && (
        <Reasons key="reasons" onFinished={() => setTimeout(() => setPhase('celebration'), 500)} />
      )}
      {phase === 'celebration' && (
        <Celebration key="celebration" />
      )}
    </AnimatePresence>
  )
}