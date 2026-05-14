import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import styles from './ProjectsGrid.module.css'

function ProjectsGrid() {
  return (
    <section className={styles.section} id="projects">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.headerLabel}>{'// QUEST LOG'}</span>
          <h2 className={styles.title}>Projects</h2>
          <div className={styles.line} />
        </div>
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsGrid
