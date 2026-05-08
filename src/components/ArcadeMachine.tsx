import { useState, useEffect, useCallback } from 'react'
import { projects, heroContent } from '../data/projects'
import styles from './ArcadeMachine.module.css'

function ArcadeMachine() {
  const [gameState, setGameState] = useState<'title' | 'select' | 'details'>('title')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isInsertingCoin, setIsInsertingCoin] = useState(false)

  const playSound = useCallback((type: 'coin' | 'select' | 'start') => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    
    if (type === 'coin') {
      osc.type = 'square'
      osc.frequency.setValueAtTime(987.77, audioCtx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(1318.51, audioCtx.currentTime + 0.1)
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4)
      osc.stop(audioCtx.currentTime + 0.4)
    } else if (type === 'select') {
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(440, audioCtx.currentTime)
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1)
      osc.stop(audioCtx.currentTime + 0.1)
    } else if (type === 'start') {
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime)
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1)
      osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2)
      osc.frequency.setValueAtTime(1046.50, audioCtx.currentTime + 0.3)
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8)
      osc.stop(audioCtx.currentTime + 0.8)
    }

    osc.connect(gain)
    gain.connect(audioCtx.destination)
    osc.start()
  }, [])

  const handleInsertCoin = () => {
    if (isInsertingCoin) return
    setIsInsertingCoin(true)
    playSound('coin')
    setTimeout(() => {
      setGameState('select')
      playSound('start')
      setIsInsertingCoin(false)
    }, 1000)
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % projects.length)
    playSound('select')
  }

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + projects.length) % projects.length)
    playSound('select')
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === 'title') {
        if (e.key === 'Enter' || e.key === ' ') handleInsertCoin()
      } else if (gameState === 'select') {
        if (e.key === 'ArrowRight') handleNext()
        if (e.key === 'ArrowLeft') handlePrev()
        if (e.key === 'Enter') setGameState('details')
      } else if (gameState === 'details') {
        if (e.key === 'Escape' || e.key === 'Backspace') setGameState('select')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState])

  const currentProject = projects[selectedIndex]

  return (
    <div className={styles.machineFrame}>
      <div className={styles.cabinet}>
        {/* Screen Area */}
        <div className={styles.screenContainer}>
          <div className={styles.screen}>
            <div className={styles.crtOverlay} />
            
            {gameState === 'title' && (
              <div className={styles.titleScreen}>
                <p className={styles.blink}>INSERT COIN</p>
                <h1 className={styles.glitchText}>{heroContent.name}</h1>
                <h2 className={styles.subtitle}>{heroContent.title}</h2>
                <button className={styles.startBtn} onClick={handleInsertCoin} disabled={isInsertingCoin}>
                  {isInsertingCoin ? 'LOADING...' : 'PRESS START'}
                </button>
              </div>
            )}

            {gameState === 'select' && (
              <div className={styles.selectScreen}>
                <header className={styles.selectHeader}>
                  <h3>SELECT MISSION</h3>
                  <div className={styles.stats}>
                    <span>SCORE: 000{selectedIndex}00</span>
                    <span>LIVES: 3</span>
                  </div>
                </header>

                <div className={styles.carousel}>
                  <button className={styles.navBtn} onClick={handlePrev}>{'<'}</button>
                  <div className={styles.projectCard}>
                    <div className={styles.pixelBorder}>
                      <img src={currentProject.image} alt={currentProject.title} className={styles.projectImage} />
                    </div>
                    <h2 className={styles.projectTitle}>{currentProject.title}</h2>
                    <p className={styles.projectDesc}>{currentProject.description}</p>
                  </div>
                  <button className={styles.navBtn} onClick={handleNext}>{'>'}</button>
                </div>

                <div className={styles.selectionFooter}>
                  <button className={styles.actionBtn} onClick={() => setGameState('details')}>VIEW SPECS</button>
                </div>
              </div>
            )}

            {gameState === 'details' && (
              <div className={styles.detailsScreen}>
                <button className={styles.backBtn} onClick={() => setGameState('select')}>BACK</button>
                <div className={styles.detailsLayout}>
                  <div className={styles.detailsText}>
                    <h2>{currentProject.title}</h2>
                    <p className={styles.longDesc}>{currentProject.longDescription}</p>
                    <div className={styles.techStack}>
                      {currentProject.techStack.map(tech => (
                        <span key={tech} className={styles.badge}>{tech}</span>
                      ))}
                    </div>
                    <div className={styles.links}>
                      {currentProject.githubUrl && <a href={currentProject.githubUrl} target="_blank" rel="noreferrer">SOURCE CODE</a>}
                      {currentProject.liveUrl && <a href={currentProject.liveUrl} target="_blank" rel="noreferrer">LAUNCH DEMO</a>}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Arcade Controls */}
        <div className={styles.controlPanel}>
          <div className={styles.joystickContainer}>
            <div className={styles.joystickBase}>
              <div className={`${styles.joystickStick} ${gameState === 'select' ? styles.stickMove : ''}`} />
            </div>
          </div>
          <div className={styles.buttonsContainer}>
            <div className={styles.actionButton} onClick={() => gameState === 'select' && setGameState('details')} />
            <div className={`${styles.actionButton} ${styles.blue}`} onClick={handleInsertCoin} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArcadeMachine
