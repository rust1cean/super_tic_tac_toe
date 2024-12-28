use serde::{Deserialize, Serialize};

use crate::{mark::Mark, utils::Id};

use super::LikeCell;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub struct MarkedCell {
    pub(crate) id: Id,
    pub(crate) marked_as: Option<Mark>,
}

impl LikeCell for MarkedCell {
    fn new(id: Id) -> Self {
        Self {
            id,
            marked_as: None,
        }
    }

    fn id(&self) -> usize {
        self.id
    }
}

impl MarkedCell {
    pub fn new_marked(id: Id, marked_as: Mark) -> Self {
        Self {
            id,
            marked_as: Some(marked_as),
        }
    }

    pub fn get_mark(&self) -> Option<Mark> {
        self.marked_as
    }

    /// # Safety
    ///
    /// The caller must ensure that the cell is marked
    /// otherwise panic will occur!
    pub fn get_mark_unwrapped(&self) -> Mark {
        self.marked_as.unwrap()
    }

    pub fn mark_as(&mut self, mark_as: Mark) -> &mut Self {
        self.marked_as = Some(mark_as);
        self
    }
}
