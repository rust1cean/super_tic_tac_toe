use std::sync::Mutex;

use serde::Deserialize;

use crate::{mark::Mark, state::GameState, utils::Id};

#[tauri::command]
pub fn reset(state: tauri::State<'_, Mutex<GameState>>) {
    let mut state = state.lock().unwrap();
    *state = GameState::default();
}

#[tauri::command]
pub fn play_vs_bot(state: tauri::State<'_, Mutex<GameState>>) -> GameState {
    let mut state = state.lock().unwrap();
    *state = GameState::new_vs_bot();
    state.clone()
}

#[derive(Deserialize, PartialEq, Eq, Debug)]
pub struct MarkCellArgs {
    ultimate_cell_id: Id,
    cell_id: Id,
}

#[tauri::command]
pub fn mark_cell(state: tauri::State<'_, Mutex<GameState>>, args: MarkCellArgs) -> Option<Mark> {
    let mut state = state.lock().unwrap();
    let turn = state.turn;

    if let Some(board) = &mut state.board {
        board.mark_nested(args.ultimate_cell_id, args.cell_id, turn.unwrap());

        return Some(state.switch_turn());
    }

    None
}
