use serde::{Deserialize, Serialize};

use crate::utils::Id;

use super::LikeCell;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub struct SimpleCell {
    pub(crate) id: Id,
}

impl LikeCell for SimpleCell {
    fn new(id: Id) -> Self {
        Self { id }
    }

    fn id(&self) -> Id {
        self.id
    }
}
