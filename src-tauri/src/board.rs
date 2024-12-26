use crate::{mark::Mark, simple_cell::LikeCell, utils::create_array};

// TODO: Impl From<T> for Board struct.
// TODO: Add offset for LikeSquareIndexedTable

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Board<LC, const LEN: usize = 9, const SEP: usize = 3>
where
    LC: LikeCell,
{
    cells: [LC; LEN],
    marked_cells: [Option<Mark>; LEN],
    winner: Option<Winner<Mark>>,
}

impl<LC, const LEN: usize, const SEP: usize> Default for Board<LC, LEN, SEP>
where
    LC: LikeCell,
{
    fn default() -> Self {
        Self {
            cells: create_array(|id| LC::new(id)),
            marked_cells: [None; LEN],
            winner: None,
        }
    }
}

impl<LC, const LEN: usize, const SEP: usize> Board<LC, LEN, SEP>
where
    LC: LikeCell,
{
    pub fn mark_cell(&mut self, cell_id: usize, mark_as: Mark) -> &mut Self {
        self.marked_cells[cell_id] = Some(mark_as);
        self
    }

    pub fn determine_winner(&mut self) -> Option<Winner<Mark>> {
        if let None = self.winner {
            self.winner = self.choose_winner();
        }

        self.get_winner()
    }

    pub fn get_winner(&self) -> Option<Winner<Mark>> {
        self.winner.clone()
    }

    pub fn choose_winner(&self) -> Option<Winner<Mark>> {
        let row = self.try_find_row_by_pattern();
        let col = self.try_find_column_by_pattern();
        let dgl = self.try_find_diagonal_by_pattern();

        [row, col, dgl].into_iter().find_map(|maybe_marks| {
            maybe_marks.and_then(|winner| match winner {
                Winner::ByRow(marks) => Some(Winner::ByRow(marks[0])),
                Winner::ByColumn(marks) => Some(Winner::ByColumn(marks[0])),
                Winner::ByDiagonal(marks) => Some(Winner::ByDiagonal(marks[0])),
            })
        })
    }

    /// **Search for a row pattern**
    ///
    /// |   |   |   |
    /// |---|---|---|
    /// | O | O | X |
    /// | X | X | X |
    /// | O | X | O |
    pub fn try_find_row_by_pattern(&self) -> Option<Winner<Vec<Mark>>> {
        let indices = LikeSquareIndexedTable::<LEN, SEP>.as_row_indices();

        Vec2DIndices::indices_to_values(indices, &self.marked_cells)
            .into_iter()
            .find_map(Self::is_all_eq)
            .and_then(|marks| Some(Winner::ByRow(marks)))
    }

    /// **Search for a column pattern**
    ///
    /// |   |   |   |
    /// |---|---|---|
    /// | O | X | X |
    /// | X | X | O |
    /// | O | X | O |
    pub fn try_find_column_by_pattern(&self) -> Option<Winner<Vec<Mark>>> {
        let indices = LikeSquareIndexedTable::<LEN, SEP>.as_column_indices();

        Vec2DIndices::indices_to_values(indices, &self.marked_cells)
            .into_iter()
            .find_map(Self::is_all_eq)
            .and_then(|marks| Some(Winner::ByColumn(marks)))
    }

    /// **Search for a diagonal pattern**
    ///
    /// Main diaogonal
    ///
    /// |   |   |   |
    /// |---|---|---|
    /// | X | O | O |
    /// | O | X | O |
    /// | O | O | X |
    ///
    /// Secondary diagonal
    ///
    /// |   |   |   |
    /// |---|---|---|
    /// | O | O | X |
    /// | O | X | O |
    /// | X | O | O |
    pub fn try_find_diagonal_by_pattern(&self) -> Option<Winner<Vec<Mark>>> {
        let indices = LikeSquareIndexedTable::<LEN, SEP>.as_diagonal_indices();

        Vec2DIndices::indices_to_values(indices, &self.marked_cells)
            .into_iter()
            .find_map(Self::is_all_eq)
            .and_then(|marks| Some(Winner::ByDiagonal(marks)))
    }

    pub fn is_all_eq(marks: Vec<Option<Mark>>) -> Option<Vec<Mark>> {
        marks
            .iter()
            .cloned()
            .collect::<Option<Vec<_>>>()
            .into_iter()
            .find(|marks| {
                let first = marks[0];
                marks.eq(&[first.clone(); SEP])
            })
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Winner<T>
where
    T: Sized + core::fmt::Debug,
{
    ByRow(T),
    ByColumn(T),
    ByDiagonal(T),
}

#[cfg(test)]
mod board_tests {
    use super::*;
    use Mark::*;

    mod choose_winner {
        use super::*;
        use crate::simple_cell::SimpleCell;

        #[test]
        fn there_is_no_winner() {
            let mut board = Board::<SimpleCell, 9, 3>::default();

            board
                .mark_cell(0, Mark::O)
                .mark_cell(1, Mark::X)
                .mark_cell(2, Mark::O);

            board
                .mark_cell(3, Mark::X)
                .mark_cell(4, Mark::O)
                .mark_cell(5, Mark::X);

            board
                .mark_cell(6, Mark::X)
                .mark_cell(7, Mark::O)
                .mark_cell(8, Mark::X);

            assert_eq!(None, board.choose_winner());
        }

        #[test]
        fn winner_by_row() {
            let mut board = Board::<SimpleCell, 9, 3>::default();

            board
                .mark_cell(0, Mark::O)
                .mark_cell(1, Mark::X)
                .mark_cell(2, Mark::X);

            board
                .mark_cell(3, Mark::O)
                .mark_cell(4, Mark::O)
                .mark_cell(5, Mark::O);

            board
                .mark_cell(6, Mark::X)
                .mark_cell(7, Mark::O)
                .mark_cell(8, Mark::X);

            assert_eq!(Some(Winner::ByRow(O)), board.choose_winner());
        }

        #[test]
        fn winner_by_column() {
            let mut board = Board::<SimpleCell, 9, 3>::default();

            board
                .mark_cell(0, Mark::O)
                .mark_cell(1, Mark::X)
                .mark_cell(2, Mark::X);

            board
                .mark_cell(3, Mark::O)
                .mark_cell(4, Mark::X)
                .mark_cell(5, Mark::O);

            board
                .mark_cell(6, Mark::O)
                .mark_cell(7, Mark::O)
                .mark_cell(8, Mark::X);

            assert_eq!(Some(Winner::ByColumn(O)), board.choose_winner());
        }

        #[test]
        fn winner_by_main_diagonal() {
            let mut board = Board::<SimpleCell, 9, 3>::default();

            board
                .mark_cell(0, Mark::O)
                .mark_cell(1, Mark::X)
                .mark_cell(2, Mark::X);

            board
                .mark_cell(3, Mark::X)
                .mark_cell(4, Mark::O)
                .mark_cell(5, Mark::X);

            board
                .mark_cell(6, Mark::X)
                .mark_cell(7, Mark::X)
                .mark_cell(8, Mark::O);

            assert_eq!(Some(Winner::ByDiagonal(O)), board.choose_winner());
        }

        #[test]
        fn winner_by_secondary_diagonal() {
            let mut board = Board::<SimpleCell, 9, 3>::default();

            board
                .mark_cell(0, Mark::X)
                .mark_cell(1, Mark::X)
                .mark_cell(2, Mark::O);

            board
                .mark_cell(3, Mark::X)
                .mark_cell(4, Mark::O)
                .mark_cell(5, Mark::X);

            board
                .mark_cell(6, Mark::O)
                .mark_cell(7, Mark::X)
                .mark_cell(8, Mark::X);

            assert_eq!(Some(Winner::ByDiagonal(O)), board.choose_winner());
        }
    }
}

/// Represents an array of indices as a two-dimensional square table
pub struct LikeSquareIndexedTable<const LEN: usize, const SEP: usize>;

impl<const LEN: usize, const SEP: usize> LikeSquareIndexedTable<LEN, SEP> {
    /// Example of a 3x3 table where the indices are sorted by rows
    ///
    /// ```
    /// use tic_tac_toe_ultimate_lib::board::LikeSquareIndexedTable;
    ///
    /// let row_indices = LikeSquareIndexedTable::<9, 3>.as_row_indices();
    ///
    /// assert_eq!(
    ///     Vec::from([
    ///         vec![0, 1, 2],
    ///         vec![3, 4, 5],
    ///         vec![6, 7, 8],
    ///     ]),
    ///     row_indices
    /// );
    /// ```
    ///
    /// |   |   |   |
    /// |---|---|---|
    /// | 0 | 1 | 2 |
    /// | 3 | 4 | 5 |
    /// | 6 | 7 | 8 |
    pub fn as_row_indices(&self) -> Vec<Vec<usize>> {
        (0..SEP)
            .into_iter()
            .map(|i| {
                (0..SEP)
                    .into_iter()
                    .map(move |j| i * SEP + j)
                    .collect::<Vec<_>>()
            })
            .collect::<Vec<_>>()
    }

    /// Example of a 3x3 table where the indices are sorted by columns
    ///
    /// ```
    /// use tic_tac_toe_ultimate_lib::board::LikeSquareIndexedTable;
    ///
    /// let column_indices = LikeSquareIndexedTable::<9, 3>.as_column_indices();
    ///
    /// assert_eq!(
    ///     Vec::from([
    ///         vec![0, 3, 6],
    ///         vec![1, 4, 7],
    ///         vec![2, 5, 8],
    ///     ]),
    ///     column_indices
    /// );
    /// ```
    ///
    /// |   |   |   |
    /// |---|---|---|
    /// | 0 | 3 | 6 |
    /// | 1 | 4 | 7 |
    /// | 2 | 5 | 8 |
    pub fn as_column_indices(&self) -> Vec<Vec<usize>> {
        (0..SEP)
            .into_iter()
            .map(|i| (i..LEN).into_iter().step_by(SEP).collect::<Vec<_>>())
            .collect::<Vec<_>>()
    }

    /// Example of a 3x3 table where the indices are sorted by diagonals
    ///
    /// ```
    /// use tic_tac_toe_ultimate_lib::board::LikeSquareIndexedTable;
    ///
    /// let diagonal_indices = LikeSquareIndexedTable::<9, 3>.as_diagonal_indices();
    ///
    /// assert_eq!(
    ///     Vec::from([
    ///         vec![0, 4, 8],
    ///         vec![2, 4, 6]
    ///     ]),
    ///     diagonal_indices
    /// );
    /// ```
    ///
    /// Main diagonal
    ///
    /// |   |   |   |
    /// |---|---|---|
    /// | 0 | - | - |
    /// | - | 4 | - |
    /// | - | - | 8 |
    ///
    /// Secondary diagonal
    ///
    /// |   |   |   |
    /// |---|---|---|
    /// | - | - | 2 |
    /// | - | 4 | - |
    /// | 6 | - | - |
    pub fn as_diagonal_indices(&self) -> Vec<Vec<usize>> {
        let (main_diagonal, second_diagonal): (Vec<_>, Vec<_>) = (0..LEN)
            .into_iter()
            .step_by(SEP)
            .enumerate()
            .map(|(j, i)| {
                let l = i + j;
                let r = SEP + i - (j + 1);
                (l, r)
            })
            .collect::<Vec<_>>()
            .into_iter()
            .unzip();

        vec![main_diagonal, second_diagonal]
    }
}

#[cfg(test)]
mod like_square_indexed_table_tests {
    use super::*;

    #[test]
    fn check_row_indices() {
        let expected_output = Vec::from([
            Vec::from([0, 1, 2]),
            Vec::from([3, 4, 5]),
            Vec::from([6, 7, 8]),
        ]);

        assert_eq!(
            expected_output,
            LikeSquareIndexedTable::<9, 3>.as_row_indices()
        )
    }

    #[test]
    fn check_column_indices() {
        let expected_output = Vec::from([
            Vec::from([0, 3, 6]),
            Vec::from([1, 4, 7]),
            Vec::from([2, 5, 8]),
        ]);

        assert_eq!(
            expected_output,
            LikeSquareIndexedTable::<9, 3>.as_column_indices()
        )
    }

    #[test]
    fn check_diagonal_indices() {
        let expected_main_diagonal = Vec::from([0, 4, 8]);
        let expected_secondary_diagonal = Vec::from([2, 4, 6]);

        let expected_output = Vec::from([expected_main_diagonal, expected_secondary_diagonal]);

        assert_eq!(
            expected_output,
            LikeSquareIndexedTable::<9, 3>.as_diagonal_indices()
        )
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Default)]
pub struct Vec2DIndices;

impl Vec2DIndices {
    /// # Safety
    ///
    /// The caller must ensure that all indices correspond to array fields,
    /// otherwise the index will be outside the range of values ​​accepted by the array.
    pub fn indices_to_values<'a, T: Clone + Copy>(
        indices: Vec<Vec<usize>>,
        array: &'a [T],
    ) -> Vec<Vec<T>> {
        indices
            .into_iter()
            .map(|indices| {
                indices
                    .into_iter()
                    .map(move |i| array[i])
                    .collect::<Vec<_>>()
            })
            .collect::<Vec<_>>()
    }
}
