//! # Example on tic-tac-toe
//!
//! We are going to find one of these patterns:
//!
//! ```
//! by horizontally
//! X X X
//! _ _ _
//! _ _ _
//!
//! by vertically
//! X _ _
//! X _ _
//! X _ _
//!
//! by diagonally from the left
//! X _ _
//! _ X _
//! _ _ X
//!
//! by diagonally from the right
//! _ _ X
//! _ X _
//! X _ _
//! ```
//!
//! ```
//! use pattern_finder::prelude::*;
//!
//! enum Mark {
//!     X,
//!     O
//! }
//!
//! use Mark::*;
//!
//! let board = [
//!     [X, X, O],
//!     [O, X, O],
//!     [X, X, X]
//! ];
//!
//! // сonvert `board` to a one-dimensional array
//! let board = board.iter().flatten().collect::<Vec<_>>();
//!
//! let horizontal_pattern = PatternConstructor::new()
//!     .chunk(3)
//!     .pairs(|prev, curr| prev == curr);
//!
//! // by calling the `transposed` method
//! // we will iterate over the columns as if they were rows,
//! // and over the rows as if they were columns
//! let vertical_pattern = PatternConstructor::new()
//!     .chunk(3)
//!     .transposed()
//!     .pairs(|prev, curr| prev == curr);
//!
//! // offset at each iteration step,
//! // iterate simultaneously from both sides
//! let diagonal_pattern = PatternConstructor::new()
//!     .chunk(3)
//!     .offset_by(|i| i)
//!     .pairs(|prev, curr| prev == curr)
//!     .iterate_on_both_sides();
//!
//! let pattern_finder = PatternFinder::new()
//!     .add_pattern(horizontal_pattern)
//!     .add_pattern(vertical_pattern)
//!     .add_pattern(diagonal_pattern)
//!     .find(&board[..]);
//! ```

pub struct PatternFinder<Item, const N: usize>
where
    Item: Sync + Send + Sized + 'static,
{
    patterns: Vec<Pattern<Item>>,
}

impl<Item, const N: usize> Default for PatternFinder<Item, N>
where
    Item: Sync + Send + Sized + 'static,
{
    fn default() -> Self {
        Self { patterns: vec![] }
    }
}

impl<Item, const N: usize> PatternFinder<Item, N>
where
    Item: Sync + Send + Sized + 'static,
{
    pub fn new() -> Self {
        Self::default()
    }

    pub fn add_pattern(&mut self, pattern: PatternConstructor<Item>) -> &mut Self {
        self.patterns.push(pattern.build());
        self
    }

    pub fn find(self, items: &Vec<Item>) -> bool {
        self.patterns.iter().any(|pattern| !pattern.call(items))
    }
}

#[derive(Clone)]
pub struct Pattern<Item: Sync + Send + Sized + 'static> {
    chunk: usize,
    on_both_sides: bool,
    offset_fn: &'static dyn Fn(usize) -> usize,
    pairs_fn: &'static dyn Fn(&[Item]) -> bool,
}

impl<Item> Pattern<Item>
where
    Item: Sync + Send + Sized + 'static,
{
    pub fn call(&self, items: &Vec<Item>) -> bool {
        for chunk in items.chunks(self.chunk) {
            for pair in chunk.chunks(2) {
                if (*self.pairs_fn)(pair) {
                    return true;
                }
            }
        }
        false
    }
}

#[derive(Clone)]
pub struct PatternConstructor<Item>
where
    Item: Sync + Send + Sized + 'static,
{
    chunk: usize,
    on_both_sides: bool,
    offset_fn: Option<&'static dyn Fn(usize) -> usize>,
    pairs_fn: Option<&'static dyn Fn(&[Item]) -> bool>,
}

impl<Item> Default for PatternConstructor<Item>
where
    Item: Sync + Send + Sized + 'static,
{
    fn default() -> Self {
        Self {
            chunk: 1,
            on_both_sides: false,
            offset_fn: None,
            pairs_fn: None,
        }
    }
}

impl<Item> PatternConstructor<Item>
where
    Item: Sync + Send + Sized + 'static,
{
    pub fn offset_by(&mut self, offset_fn: &'static dyn Fn(usize) -> usize) -> &mut Self {
        self.offset_fn = Some(offset_fn);
        self
    }

    pub fn chunk(&mut self, chunk: usize) -> &mut Self {
        self.chunk = chunk;
        self
    }

    pub fn build(self) -> Pattern<Item> {
        Pattern {
            chunk: self.chunk,
            on_both_sides: self.on_both_sides,
            offset_fn: self.offset_fn.unwrap(),
            pairs_fn: self.pairs_fn.unwrap(),
        }
    }
}
