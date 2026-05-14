import type { Project } from '../data/projects'
import { useInView } from '../hooks/useInView'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: Project
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const { ref, isInView } = useInView(0.1)

  return (
    <article
      ref={ref}
      className={`${styles.card} ${isInView ? styles.revealed : ''}`}
      style={
        {
          '--project-color': project.color,
          '--reveal-delay': `${index * 0.08}s`,
        } as React.CSSProperties
      }
    >
      <div className={styles.top}>
        <div className={styles.dot} />
        <div className={styles.index}>{String(index + 1).padStart(2, '0')}</div>
        <h3 className={styles.title}>{project.title}</h3>
      </div>
      <p className={styles.description}>{project.description}</p>
      <div className={styles.techStack}>
        {project.techStack.map((tech) => (
          <span key={tech} className={styles.badge}>
            {tech}
          </span>
        ))}
      </div>
      <div className={styles.links}>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            [SOURCE]
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            [DEMO]
          </a>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
