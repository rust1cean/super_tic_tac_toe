use serde::{Deserialize, Serialize};

use crate::{mark::Mark, player::Player};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub struct Bot(pub(crate) Player);

impl Bot {
    pub fn new(mark: Mark) -> Self {
        Self(Player::new(mark))
    }
}
