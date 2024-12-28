use rand::seq::SliceRandom;
use rand::Rng;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum Mark {
    X,
    O,
}

impl Mark {
    pub const COUNT: usize = 2;
    pub const ALL: [Self; Self::COUNT] = Self::all();

    pub const fn all() -> [Self; Self::COUNT] {
        use Mark::*;
        [X, O]
    }

    pub fn random() -> Self {
        let mut rng = rand::thread_rng();
        Self::ALL[rng.gen_range(0..Self::ALL.len())]
    }

    pub fn random_marks() -> [Self; Self::COUNT] {
        let mut rng = rand::thread_rng();
        let mut marks = Self::ALL.clone();

        marks.shuffle(&mut rng);
        marks
    }
}
