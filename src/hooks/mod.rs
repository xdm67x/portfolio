use leptos::html::Div;
use leptos::prelude::*;
use leptos_use::{use_element_visibility, use_window_scroll};

/// Hook qui retourne la progression du scroll (0.0 à 1.0).
/// Si `distance` vaut 0, utilise la hauteur du viewport.
pub fn use_scroll_progress(distance: f64) -> Signal<f64> {
    let (_x, y) = use_window_scroll();

    let viewport_height = web_sys::window()
        .unwrap()
        .inner_height()
        .ok()
        .and_then(|v| v.as_f64())
        .unwrap_or(800.0);

    let scroll_distance = if distance == 0.0 { viewport_height } else { distance };

    Signal::derive(move || {
        (y.get() / scroll_distance).min(1.0).max(0.0)
    })
}

/// Hook qui observe la visibilité d'un élément dans le viewport.
/// Retourne un `NodeRef` à attacher à un élément `<div>` et un signal
/// indiquant si l'élément est visible.
pub fn use_in_view() -> (NodeRef<Div>, Signal<bool>) {
    let node_ref = NodeRef::new();
    let is_visible = use_element_visibility(node_ref);
    (node_ref, is_visible)
}