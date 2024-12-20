use crate::{mark::Mark, simple_cel::SimpleCell, utils::create_array};

pub struct Board {
    cells: [SimpleCell; 9],
}

impl Board {
    pub fn new() -> Self {
        Self {
            cells: create_array(|id| SimpleCell::new(id)),
        }
    }

    pub fn mark_cell(&mut self, cell_id: usize, mark_as: Mark) -> &mut Self {
        if cell_id < self.cells.len() {
            self.cells[cell_id].mark(mark_as);
        }
        self
    }

    pub fn choose_winner(&self) -> Option<Mark> {
        todo!()
    }
}
