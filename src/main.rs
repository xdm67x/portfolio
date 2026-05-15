mod components;
mod hooks;

use components::{Hero, ProjectsGrid};
use leptos::prelude::*;
use serde::Deserialize;
use std::sync::LazyLock;

#[derive(Clone, PartialEq, Eq, Deserialize)]
pub struct Project {
    id: String,
    title: String,
    description: String,
    tech_stack: Vec<String>,
    color: String,
    github_url: String,
    is_contributor: bool,
}

static PROJECTS: LazyLock<Vec<Project>> = LazyLock::new(|| {
    let json = include_str!("./projects.json");
    serde_json::from_str::<Vec<Project>>(json).unwrap_or_default()
});

fn main() {
    console_error_panic_hook::set_once();

    mount_to_body(App)
}

#[component]
fn App() -> impl IntoView {
    view! {
        <Hero />
        <ProjectsGrid projects={PROJECTS.clone()} />
    }
}
