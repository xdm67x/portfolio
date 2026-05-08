import { useCallback, useEffect, useState } from 'react'
import { heroContent, projects } from '../data/projects'
import styles from './ArcadeMachine.module.css'

function ArcadeMachine() {
  const [gameState, setGameState] = useState<'title' | 'select'>('title')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isInsertingCoin, setIsInsertingCoin] = useState(false)

  const playSound = useCallback((type: 'coin' | 'select' | 'start') => {
    try {
      const audioCtx = new (
        window.AudioContext ||
        // biome-ignore lint/suspicious/noExplicitAny: needed for legacy webkitAudioContext support
        (window as any).webkitAudioContext
      )()
      if (audioCtx.state === 'suspended') {
        audioCtx.resume()
      }
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()

      if (type === 'coin') {
        osc.type = 'square'
        osc.frequency.setValueAtTime(987.77, audioCtx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(
          1318.51,
          audioCtx.currentTime + 0.1,
        )
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
        osc.frequency.setValueAtTime(1046.5, audioCtx.currentTime + 0.3)
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

  const handleInsertCoin = useCallback(() => {
    if (isInsertingCoin || gameState !== 'title') return
    setIsInsertingCoin(true)
    playSound('coin')

    const timeout = setTimeout(() => {
      setGameState('select')
      playSound('start')
      setIsInsertingCoin(false)
    }, 1200)

    return () => clearTimeout(timeout)
  }, [isInsertingCoin, gameState, playSound])

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % projects.length)
    playSound('select')
  }, [playSound])

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + projects.length) % projects.length)
    playSound('select')
  }, [playSound])

  const goHome = useCallback(() => {
    setGameState('title')
    playSound('select')
  }, [playSound])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === 'title') {
        if (e.key === 'Enter' || e.key === ' ') handleInsertCoin()
      } else if (gameState === 'select') {
        if (e.key === 'ArrowRight') handleNext()
        if (e.key === 'ArrowLeft') handlePrev()
        if (e.key === 'Escape') goHome()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState, handleInsertCoin, handleNext, handlePrev, goHome])

  const currentProject = projects[selectedIndex] || {
    title: 'ERROR',
    description: 'NO DATA',
    image: '',
    longDescription: '',
    techStack: [],
  }

  return (
    <div className={styles.screenWrapper}>
      <div
        className={`${styles.screen} ${gameState !== 'title' ? styles.powerOn : ''}`}
      >
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
              <div className={styles.homeBio}>{heroContent.bio}</div>
              <button
                type="button"
                className={styles.startBtn}
                onClick={handleInsertCoin}
                disabled={isInsertingCoin}
              >
                {isInsertingCoin ? 'INITIALIZING...' : 'PRESS START'}
              </button>
            </div>
          </div>
        )}

        {gameState === 'select' && (
          <div className={styles.selectScreen}>
            <header className={styles.selectHeader}>
              <button type="button" className={styles.homeBtn} onClick={goHome}>
                [ HOME ]
              </button>
              <h3>MISSION SELECT</h3>
            </header>

            <div className={styles.carousel}>
              <button
                type="button"
                className={styles.navBtn}
                onClick={handlePrev}
              >
                {'<'}
              </button>
              <div className={styles.projectCard}>
                <div className={styles.pixelBorder}>
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className={styles.projectImage}
                  />
                </div>
                <div className={styles.projectInfo}>
                  <h2 className={styles.projectTitle}>
                    {currentProject.title}
                  </h2>
                  <p className={styles.projectLongDesc}>
                    {currentProject.longDescription}
                  </p>

                  <div className={styles.techStack}>
                    {currentProject.techStack.map((tech) => (
                      <span key={tech} className={styles.badge}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className={styles.links}>
                    {currentProject.githubUrl && (
                      <a
                        href={currentProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        [{'>'} SOURCE]
                      </a>
                    )}
                    {currentProject.liveUrl && (
                      <a
                        href={currentProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        [{'>'} DEMO]
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className={styles.navBtn}
                onClick={handleNext}
              >
                {'>'}
              </button>
            </div>

            <div className={styles.selectionFooter}>
              <p className={styles.hint}>
                USE ARROWS TO NAVIGATE • ESC FOR HOME
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ArcadeMachine
