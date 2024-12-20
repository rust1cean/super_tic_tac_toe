use crate::board::Board;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct UltimateCell {
    id: usize,
    board: Board,
}
