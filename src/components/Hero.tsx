import { heroContent } from '../data/projects'
import styles from './Hero.module.css'

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.grid} />
      <div className={styles.noise} />

      <div className={styles.shapes}>
        <div className={`${styles.shape} ${styles.rect}`} />
        <div className={`${styles.shape} ${styles.circle}`} />
        <div className={`${styles.shape} ${styles.diamond}`} />
      </div>

      <div className={styles.content}>
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

      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>scroll</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot} />
        </div>
      </div>
    </section>
  )
}

export default Hero
