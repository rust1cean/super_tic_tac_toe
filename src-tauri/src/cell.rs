use crate::{mark::Mark, simple_cell::LikeCell, ultimate_cell::UltimateCell};

pub struct Cell<LC: LikeCell> {
    lc: LC,
}

impl<LC: LikeCell> Cell<LC> {
    pub fn new(id: usize) -> Self {
        Self { lc: LC::new(id) }
    }

    pub fn id(&self) -> usize {
        self.lc.id()
    }
}

impl Cell<UltimateCell> {
    pub fn get_mark(&self) -> Option<Mark> {
        todo!()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
}
