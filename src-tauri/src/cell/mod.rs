use crate::utils::Id;

pub mod marked_cell;
pub mod simple_cell;
pub mod ultimate_cell;

pub mod prelude {
    use super::*;

    pub use marked_cell::MarkedCell;
    pub use simple_cell::SimpleCell;
    pub use ultimate_cell::UltimateCell;
}

pub trait LikeCell {
    fn new(id: Id) -> Self;
    fn id(&self) -> Id;
}
