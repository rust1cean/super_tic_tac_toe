#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Mark {
    X,
    O,
}

impl Mark {
    pub fn all() -> [Self; 2] {
        use Mark::*;
        [X, O]
    }
}
