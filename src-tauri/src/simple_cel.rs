#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct SimpleCell {
    pub(crate) id: usize,
}

impl SimpleCell {
    pub fn new(id: usize) -> Self {
        Self { id }
    }
}
