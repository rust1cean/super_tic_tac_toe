use crate::{
    board::Board,
    simple_cell::{LikeCell, SimpleCell},
};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct UltimateCell {
    id: usize,
    board: Board<SimpleCell>,
}

impl LikeCell for UltimateCell {
    fn new(id: usize) -> Self {
        Self {
            id,
            board: Board::default(),
        }
    }

    fn id(&self) -> usize {
        self.id
    }
}
