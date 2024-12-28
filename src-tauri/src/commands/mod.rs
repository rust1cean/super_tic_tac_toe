use std::sync::Mutex;

use serde::{Deserialize, Serialize};

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

#[tauri::command]
pub fn mark_cell(
    state: tauri::State<'_, Mutex<GameState>>,
    args: MarkCellArgs,
) -> Option<MarkCellOutput> {
    let mut state = state.lock().unwrap();
    let turn = state.turn;

    if let Some(board) = &mut state.board {
        board.mark_nested(args.ultimate_cell_id, args.cell_id, turn.unwrap());

        return Some(MarkCellOutput {
            next_ultimate_cell_id: args.cell_id,
            turn: state.switch_turn(),
        });
    }

    None
}

#[derive(Deserialize, PartialEq, Eq, Debug)]
pub struct MarkCellArgs {
    ultimate_cell_id: Id,
    cell_id: Id,
}

#[derive(Serialize, PartialEq, Eq, Debug)]
pub struct MarkCellOutput {
    turn: Mark,
    next_ultimate_cell_id: Id,
}

#[tauri::command]
pub fn try_determine_winner(
    state: tauri::State<'_, Mutex<GameState>>,
    ultimate_cell_id: Id,
) -> Option<TryDetermineWinnerOutput> {
    let mut state = state.lock().unwrap();

    if let Some(board) = &mut state.board {
        return board
            .get_cell(ultimate_cell_id)
            .and_then(|mut ultimate| ultimate.try_determine_mark())
            .and_then(|winner| {
                Some(TryDetermineWinnerOutput {
                    winner,
                    ultimate_cell_id,
                })
            });
    }
    None
}

#[derive(Serialize, PartialEq, Eq, Debug)]
pub struct TryDetermineWinnerOutput {
    ultimate_cell_id: Id,
    winner: Mark,
}

#[tauri::command]
pub fn determine_winner(
    state: tauri::State<'_, Mutex<GameState>>,
) -> Option<DetermineWinnerOutput> {
    let mut state = state.lock().unwrap();

    if let Some(board) = &mut state.board {
        return board.try_determine_winner().and_then(|winner| {
            Some(DetermineWinnerOutput {
                winner: winner.unwrap(),
            })
        });
    }
    None
}

#[derive(Serialize, PartialEq, Eq, Debug)]
pub struct DetermineWinnerOutput {
    winner: Mark,
}
