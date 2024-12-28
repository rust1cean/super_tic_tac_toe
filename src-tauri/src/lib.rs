use std::sync::Mutex;

use bot::Bot;
use player::Player;
use serde::{Deserialize, Serialize};

pub mod board;
pub mod bot;
pub mod cell;
pub mod commands;
pub mod mark;
pub mod player;
pub mod utils;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(Mutex::new(state::GameState::default()))
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::play_vs_bot,
            commands::mark_cell,
            commands::reset,
            commands::try_determine_winner,
            commands::determine_winner
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[derive(Clone, Serialize, Deserialize)]
pub enum PlayerKind {
    Human(Player),
    Bot(Bot),
}

pub mod state {
    use serde::Serialize;

    use crate::{
        board::Board,
        bot::Bot,
        cell::prelude::{SimpleCell, UltimateCell},
        mark::Mark,
        player::Player,
        PlayerKind,
    };

    pub type StandardBoard = Board<UltimateCell<SimpleCell>>;

    #[derive(Clone, Default, Serialize)]
    pub struct GameState {
        pub(crate) turn: Option<Mark>,
        pub(crate) me: Option<PlayerKind>,
        pub(crate) enemy: Option<PlayerKind>,
        pub(crate) board: Option<StandardBoard>,
    }

    impl GameState {
        pub fn new_vs_bot() -> Self {
            let [f_mark, s_mark] = Mark::random_marks();

            Self {
                me: Some(PlayerKind::Human(Player::new(f_mark))),
                enemy: Some(PlayerKind::Bot(Bot::new(s_mark))),
                turn: Some(Mark::random()),
                board: Some(StandardBoard::default()),
            }
        }

        pub fn switch_turn(&mut self) -> Mark {
            self.turn = match self.turn {
                Some(Mark::O) => Some(Mark::X),
                Some(Mark::X) => Some(Mark::O),
                _ => Some(Mark::random()),
            };
            self.turn.unwrap()
        }
    }
}
