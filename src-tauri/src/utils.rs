pub type Id = usize;

pub fn create_array<const N: usize, T, F>(create_fn: F) -> [T; N]
where
    F: FnMut(usize) -> T,
{
    core::array::from_fn::<_, N, _>(create_fn)
}
