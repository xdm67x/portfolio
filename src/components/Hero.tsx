import { heroContent } from '../data/projects'
import { useScrollProgress } from '../hooks/useScrollProgress'
import styles from './Hero.module.css'

function Hero() {
  const progress = useScrollProgress(600)

  const bgOpacity = Math.max(0, 1 - progress * 1.7)
  const decorOpacity = Math.max(0, 1 - progress * 2.5)
  const contentOpacity = Math.max(0, 1 - progress * 2.5)
  const contentScale = 1 - progress * 0.12
  const contentTranslateY = -progress * 3
  const scrollOpacity = Math.max(0, 1 - progress * 5)
  const barRawProgress = Math.max(0, Math.min(1, (progress - 0.3) / 0.4))
  const barOpacity = barRawProgress
  const barTranslateY = -(1 - barRawProgress) * 20

  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} style={{ opacity: bgOpacity }} />
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
          opacity: contentOpacity,
          transform: `scale(${contentScale}) translateY(${contentTranslateY}vh)`,
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
        style={{ opacity: scrollOpacity }}
      >
        <span className={styles.scrollText}>scroll</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot} />
        </div>
      </div>

      <div
        className={styles.bar}
        style={{
          opacity: barOpacity,
          transform: `translateY(${barTranslateY}px)`,
        }}
      >
        <span className={styles.barLabel}>{'<PLAYER 1>'}</span>
        <span className={styles.barName}>{heroContent.name}</span>
      </div>
    </section>
  )
}

export default Hero
