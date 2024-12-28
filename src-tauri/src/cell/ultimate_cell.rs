use serde::Serialize;

use crate::{board::Board, cell::LikeCell, mark::Mark, utils::Id};

#[derive(Debug, Clone, PartialEq, Eq, Serialize)]
pub struct UltimateCell<LC>
where
    LC: LikeCell + Serialize,
{
    id: Id,
    board: Board<LC>,
}

impl<LC> LikeCell for UltimateCell<LC>
where
    LC: LikeCell + Serialize,
{
    fn new(id: Id) -> Self {
        Self {
            id,
            board: Board::default(),
        }
    }

    fn id(&self) -> usize {
        self.id
    }
}

impl<LC> UltimateCell<LC>
where
    LC: LikeCell + Serialize,
{
    pub fn try_determine_mark(&mut self) -> Option<Mark> {
        self.board
            .try_determine_winner()
            .and_then(|winner| Some(winner.unwrap()))
    }

    pub fn mark_cell(&mut self, cell_id: Id, mark_as: Mark) -> &mut Self {
        self.board.mark_cell(cell_id, mark_as);
        self
    }

    pub fn cells_count(&self) -> usize {
        self.board.cells_count()
    }

    pub fn marked_cells_count(&self) -> usize {
        self.board.marked_cells_count()
    }

    pub fn unmarked_cells_count(&self) -> usize {
        self.board.unmarked_cells_count()
    }
}
