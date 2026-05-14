import { heroContent } from '../data/projects'
import { useScrollProgress } from '../hooks/useScrollProgress'
import styles from './Hero.module.css'

function Hero() {
  // Use 0 to default to viewport height — transition spans exactly one full screen of scroll
  const progress = useScrollProgress(0)

  // Content fades and scales down as you scroll
  const opacity = Math.max(0, 1 - progress * 1.8)
  const scale = 1 - progress * 0.15
  const translateY = -progress * 60

  // Decorative elements fade faster
  const decorOpacity = Math.max(0, 1 - progress * 2.5)

  return (
    <section className={styles.hero}>
      <div className={styles.grid} style={{ opacity: decorOpacity * 0.5 }} />
      <div className={styles.noise} style={{ opacity: decorOpacity * 0.03 }} />

      <div className={styles.shapes} style={{ opacity: decorOpacity * 0.15 }}>
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
        style={{ opacity: Math.max(0, 1 - progress * 5) }}
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
