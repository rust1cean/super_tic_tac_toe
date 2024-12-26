use crate::{mark::Mark, simple_cel::SimpleCell, ultimate_cell::UltimateCell};

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Cell {
    Simple(SimpleCell),
    Ultimate(UltimateCell),
}

impl Cell {
    pub fn new_simple(id: usize) -> Self {
        Self::Simple(SimpleCell::new(id))
    }

    pub fn get_mark(&self) -> Option<Mark> {
        match self {
            Self::Simple(simple) => todo!(),
            Self::Ultimate(ultimate) => todo!(),
        }
    }

    pub fn is_simple(cell: &Self) -> bool {
        matches!(cell, Self::Simple(_))
    }

    pub fn is_ultimate(cell: &Self) -> bool {
        matches!(cell, Self::Ultimate(_))
    }
}

#[cfg(test)]
mod cell_tests {
    use super::*;
}
