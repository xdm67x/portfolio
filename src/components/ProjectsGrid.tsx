import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import styles from './ProjectsGrid.module.css'

function ProjectsGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Projects</h2>
        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsGrid
