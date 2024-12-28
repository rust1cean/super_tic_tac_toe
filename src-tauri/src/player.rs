use serde::{Deserialize, Serialize};

use crate::mark::Mark;

#[derive(Debug, Copy, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Player {
    mark: Mark,
}

impl Player {
    pub fn new(mark: Mark) -> Self {
        Self { mark }
    }
}
