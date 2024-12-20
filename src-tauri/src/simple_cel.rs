use crate::mark::Mark;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct SimpleCell {
    id: usize,
    marked_as: Option<Mark>,
}

impl SimpleCell {
    pub fn new(id: usize) -> Self {
        Self {
            id,
            marked_as: None,
        }
    }

    pub fn get_mark(&self) -> Option<Mark> {
        self.marked_as
    }

    pub fn reset(&mut self) -> &mut Self {
        *self = Self::new(self.id);
        self
    }

    pub fn mark(&mut self, mark_as: Mark) -> &mut Self {
        self.marked_as = Some(mark_as);
        self
    }

    pub fn is_marked(cell: &Self) -> bool {
        matches!(cell.marked_as, Some(_))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn create_empty_cell() {
        let cell = SimpleCell::new(0);
        assert_eq!(cell.get_mark(), None);
    }

    #[test]
    fn mark_cell() {
        let mut cell = SimpleCell::new(0);
        cell.mark(Mark::X);
        assert_eq!(cell.get_mark(), Some(Mark::X));
    }
}
