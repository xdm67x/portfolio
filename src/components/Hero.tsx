import { heroContent } from '../data/projects'
import styles from './Hero.module.css'

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.pixelGrid} />
        <div className={styles.pixel} />
        <div className={styles.pixel} />
        <div className={styles.pixel} />
        <div className={styles.pixel} />
        <div className={styles.pixel} />
        <div className={styles.pixel} />
        <div className={styles.pixel} />
        <div className={styles.pixel} />
      </div>
      <div className={styles.content}>
        <p className={styles.blink}>PLAYER 1 READY</p>
        <h1 className={styles.name}>{heroContent.name}</h1>
        <h2 className={styles.subtitle}>{heroContent.title}</h2>
        <p className={styles.bio}>{heroContent.bio}</p>
      </div>
    </section>
  )
}

export default Hero
