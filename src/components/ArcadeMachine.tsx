import { useState, useEffect, useCallback } from 'react'
import { projects, heroContent } from '../data/projects'
import styles from './ArcadeMachine.module.css'

function ArcadeMachine() {
  const [gameState, setGameState] = useState<'title' | 'select' | 'details'>('title')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isInsertingCoin, setIsInsertingCoin] = useState(false)

  const playSound = useCallback((type: 'coin' | 'select' | 'start') => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
      if (audioCtx.state === 'suspended') {
        audioCtx.resume()
      }
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
    } catch (e) {
      console.warn('Audio failed to play', e)
    }
  }, [])

  const handleInsertCoin = () => {
    if (isInsertingCoin || gameState !== 'title') return
    setIsInsertingCoin(true)
    playSound('coin')
    
    const timeout = setTimeout(() => {
      setGameState('select')
      playSound('start')
      setIsInsertingCoin(false)
    }, 1200)

    return () => clearTimeout(timeout)
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

  const currentProject = projects[selectedIndex] || { title: 'ERROR', description: 'NO DATA', image: '', longDescription: '', techStack: [] }

  return (
    <div className={styles.screenWrapper}>
      <div className={`${styles.screen} ${gameState !== 'title' ? styles.powerOn : ''}`}>
        <div className={styles.crtOverlay} />
        <div className={styles.scanlines} />
        <div className={styles.vignette} />
        
        {isInsertingCoin && <div className={styles.coin} />}
        
        {gameState === 'title' && (
          <div className={styles.titleScreen}>
            <div className={styles.titleContent}>
              <p className={styles.blink}>PLAYER 1 READY</p>
              <h1 className={styles.glitchText}>{heroContent.name}</h1>
              <h2 className={styles.subtitle}>{heroContent.title}</h2>
              <button className={styles.startBtn} onClick={handleInsertCoin} disabled={isInsertingCoin}>
                {isInsertingCoin ? 'INITIALIZING...' : 'PRESS START'}
              </button>
            </div>
          </div>
        )}

        {gameState === 'select' && (
          <div className={styles.selectScreen}>
            <header className={styles.selectHeader}>
              <h3>SELECT MISSION</h3>
            </header>

            <div className={styles.carousel}>
              <button className={styles.navBtn} onClick={handlePrev}>{'<'}</button>
              <div className={styles.projectCard}>
                <div className={styles.pixelBorder}>
                  <img src={currentProject.image} alt={currentProject.title} className={styles.projectImage} />
                </div>
                <div className={styles.projectInfo}>
                  <h2 className={styles.projectTitle}>{currentProject.title}</h2>
                  <p className={styles.projectDesc}>{currentProject.description}</p>
                </div>
              </div>
              <button className={styles.navBtn} onClick={handleNext}>{'>'}</button>
            </div>

            <div className={styles.selectionFooter}>
              <button className={styles.actionBtn} onClick={() => setGameState('details')}>LAUNCH PROJECT SPECS</button>
            </div>
          </div>
        )}

        {gameState === 'details' && (
          <div className={styles.detailsScreen}>
            <button className={styles.backBtn} onClick={() => setGameState('select')}>{'<'} RETURN TO MENU</button>
            <div className={styles.detailsLayout}>
              <div className={styles.detailsText}>
                <h2 className={styles.detailTitle}>{currentProject.title}</h2>
                <div className={styles.detailBody}>
                  <p className={styles.longDesc}>{currentProject.longDescription}</p>
                  <div className={styles.techStack}>
                    {currentProject.techStack.map(tech => (
                      <span key={tech} className={styles.badge}>{tech}</span>
                    ))}
                  </div>
                  <div className={styles.links}>
                    {currentProject.githubUrl && <a href={currentProject.githubUrl} target="_blank" rel="noreferrer">[{'>'} VIEW SOURCE]</a>}
                    {currentProject.liveUrl && <a href={currentProject.liveUrl} target="_blank" rel="noreferrer">[{'>'} LAUNCH DEMO]</a>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ArcadeMachine
