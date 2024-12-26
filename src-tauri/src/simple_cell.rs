pub trait LikeCell: Sized + Send + Sync {
    fn new(id: usize) -> Self;
    fn id(&self) -> usize;
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct SimpleCell {
    pub(crate) id: usize,
}

impl LikeCell for SimpleCell {
    fn new(id: usize) -> Self {
        Self { id }
    }

    fn id(&self) -> usize {
        self.id
    }
}
