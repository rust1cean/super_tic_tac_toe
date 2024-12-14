import CellIndex from "./cell-index";

export default function Cell({
  index,
  className = "",
}: {
  index: number;
  className?: string;
}) {
  return (
    <button
      className={`size-full active:scale-95 relative rounded-3xl flex items-center justify-center border-2 border-border/60 hover:bg-muted/40 backdrop-blur ${className}`}
    >
      <CellIndex
        index={index}
        selected={Math.random() > 0.5 ? "" : Math.random() > 0.5 ? "o" : "x"}
      />
    </button>
  );
}
