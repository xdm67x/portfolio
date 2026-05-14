mod components;
mod hooks;

use components::{Hero, ProjectsGrid};
use leptos::prelude::*;
use std::borrow::ToOwned;
use std::sync::LazyLock;

#[derive(Clone, PartialEq, Eq)]
pub struct Project {
    id: String,
    title: String,
    description: String,
    tech_stack: Vec<String>,
    color: String,
    github_url: String,
}

static PROJECTS: LazyLock<Vec<Project>> = LazyLock::new(|| {
    vec![
        Project {
            id: "rtk".to_owned(),
            title: "RTK (Rust Token Killer)".to_owned(),
            description: "CLI proxy that reduces LLM token consumption by 60-90%".to_owned(),
            tech_stack: vec!["Rust".to_owned(), "LLM".to_owned(), "CLI".to_owned()],
            color: "#DEA584".to_owned(),
            github_url: "https://github.com/rtk-ai/rtk".to_owned(),
        },
        Project {
            id: "simple-agent".to_owned(),
            title: "simple-agent".to_owned(),
            description: "An interactive AI coding agent that runs locally on your computer".to_owned(),
            tech_stack: vec!["Go".to_owned(), "Ollama".to_owned(), "Coding Agent".to_owned()],
            color: "#22d3ee".to_owned(),
            github_url: "https://github.com/xdm67x/simple-agent".to_owned(),
        },
        Project {
            id: "cargo-feature-guard".to_owned(),
            title: "cargo-feature-guard".to_owned(),
            description: "Validate Cargo feature propagation across a workspace".to_owned(),
            tech_stack: vec!["Rust".to_owned(), "Cargo".to_owned()],
            color: "#CE422B".to_owned(),
            github_url: "https://github.com/xdm67x/cargo-feature-guard".to_owned(),
        },
        Project {
            id: "quick-xml".to_owned(),
            title: "quick-xml".to_owned(),
            description: "Rust high performance xml reader and writer".to_owned(),
            tech_stack: vec!["Rust".to_owned()],
            color: "#DEA584".to_owned(),
            github_url: "https://github.com/xdm67x/quick-xml".to_owned(),
        },
        Project {
            id: "electrotest".to_owned(),
            title: "electrotest".to_owned(),
            description: "CLI automation tool for testing Electron apps using Gherkin and CDP".to_owned(),
            tech_stack: vec!["Rust".to_owned(), "Tokio".to_owned(), "CDP".to_owned()],
            color: "#47848F".to_owned(),
            github_url: "https://github.com/xdm67x/electrotest".to_owned(),
        },
        Project {
            id: "soft-delight".to_owned(),
            title: "Soft Delight".to_owned(),
            description: "A comfortable, eye-friendly VS Code theme for developers".to_owned(),
            tech_stack: vec!["TypeScript".to_owned(), "JSON".to_owned(), "VS Code".to_owned()],
            color: "#6B5B95".to_owned(),
            github_url: "https://github.com/xdm67x/soft-delight".to_owned(),
        },
        Project {
            id: "chip8".to_owned(),
            title: "chip8".to_owned(),
            description: "Chip8 emulator written in C++".to_owned(),
            tech_stack: vec!["C++".to_owned(), "CMake".to_owned()],
            color: "#4A90D9".to_owned(),
            github_url: "https://github.com/dm67x/chip8".to_owned(),
        },
        Project {
            id: "portfolio".to_owned(),
            title: "This website".to_owned(),
            description: "Personal portfolio website built with Leptos and Rust".to_owned(),
            tech_stack: vec!["Rust".to_owned(), "Leptos".to_owned(), "WASM".to_owned()],
            color: "#F74C00".to_owned(),
            github_url: "https://github.com/xdm67x/xdm67x.github.io".to_owned(),
        },
    ]
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
