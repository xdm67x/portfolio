import { heroContent } from '../data/projects'
import { useScrollProgress } from '../hooks/useScrollProgress'
import styles from './Hero.module.css'

function Hero() {
  const progress = useScrollProgress(400)

  const opacity = Math.max(0, 1 - progress * 2)
  const scale = 1 - progress * 0.08
  const translateY = -progress * 40

  return (
    <section className={styles.hero}>
      <div className={styles.grid} />
      <div className={styles.noise} />

      <div className={styles.shapes}>
        <div className={`${styles.shape} ${styles.rect}`} />
        <div className={`${styles.shape} ${styles.circle}`} />
        <div className={`${styles.shape} ${styles.diamond}`} />
      </div>

      <div
        className={styles.content}
        style={{
          opacity,
          transform: `scale(${scale}) translateY(${translateY}px)`,
        }}
      >
        <span className={styles.label}>{'<PLAYER 1 READY>'}</span>
        <h1 className={styles.name} data-text={heroContent.name}>
          {heroContent.name}
        </h1>
        <p className={styles.subtitle}>
          <span className={styles.subtitleAccent}>PIXEL ARCHITECT</span>
          <span className={styles.subtitleDot}> • </span>
          <span>LVL 99 WIZARD</span>
        </p>
        <p className={styles.bio}>{heroContent.bio}</p>
      </div>

      <div
        className={styles.scrollIndicator}
        style={{ opacity: Math.max(0, 1 - progress * 4) }}
      >
        <span className={styles.scrollText}>scroll</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot} />
        </div>
      </div>
    </section>
  )
}

export default Hero
