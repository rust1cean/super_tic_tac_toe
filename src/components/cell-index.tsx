export default function CellIndex({
  index,
  selected = "",
  className = "",
  textClassName = "",
}: {
  index: number;
  selected?: "o" | "x" | "O" | "X" | "";
  className?: string;
  textClassName?: string;
}) {
  return (
    <div
      className={`size-full flex items-center text-accent-foreground/90 justify-center duration-150 ${
        !selected && "opacity-0 hover:opacity-100"
      } ${className}`}
    >
      <strong className={`text-xl font-thin ${textClassName}`}>
        {selected.toUpperCase() || index}
      </strong>
    </div>
  );
}
