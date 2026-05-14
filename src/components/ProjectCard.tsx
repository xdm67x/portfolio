import type { Project } from '../data/projects'
import { useInView } from '../hooks/useInView'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: Project
  index: number
  featured?: boolean
}

function ProjectCard({ project, index, featured }: ProjectCardProps) {
  const { ref, isInView } = useInView(0.1)

  return (
    <article
      ref={ref}
      className={`${styles.card} ${featured ? styles.featured : ''} ${isInView ? styles.revealed : ''}`}
      style={
        {
          '--project-color': project.color,
          '--reveal-delay': `${index * 0.1}s`,
        } as React.CSSProperties
      }
    >
      <div className={styles.imageContainer}>
        <img
          src={project.image}
          alt={project.title}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.overlay}>
          <div className={styles.links}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                <span className={styles.linkBracket}>[</span>
                SOURCE
                <span className={styles.linkBracket}>]</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                <span className={styles.linkBracket}>[</span>
                DEMO
                <span className={styles.linkBracket}>]</span>
              </a>
            )}
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.index}>{String(index + 1).padStart(2, '0')}</div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.techStack}>
          {project.techStack.map((tech) => (
            <span key={tech} className={styles.badge}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
