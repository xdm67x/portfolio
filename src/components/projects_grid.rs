use crate::Project;
use crate::components::project_card::ProjectCard;
use leptos::prelude::*;
use stylance::import_crate_style;

import_crate_style!(style, "src/components/projects_grid.module.css");

#[component]
pub fn ProjectsGrid(projects: Vec<Project>) -> impl IntoView {
    view! {
        <section class=style::section id="projects">
            <div class=style::container>
                <div class=style::header>
                    <span class=style::headerLabel>"// QUEST LOG"</span>
                    <h2 class=style::title>"Projects"</h2>
                    <div class=style::line />
                </div>
                <div class=style::grid>
                    {
                        projects.iter().enumerate().map(|(idx, project)| {
                            view! {
                                <ProjectCard project={project.clone()} index={idx} />
                            }
                        }).collect::<Vec<_>>()
                    }
                </div>
            </div>
        </section>
    }
}
