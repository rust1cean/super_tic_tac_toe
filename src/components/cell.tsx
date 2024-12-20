import MarkedCell, { type MarkedAs } from "./marked-cell";

export default function Cell({
  index,
  markedAs,
  className = "",
}: {
  index: number;
  markedAs: MarkedAs;
  className?: string;
}) {
  return (
    <button
      className={`size-full active:scale-95 relative rounded-3xl flex items-center justify-center border-2 border-border hover:bg-muted/40 backdrop-blur ${className}`}
    >
      <MarkedCell index={index} markedAs={markedAs} />
    </button>
  );
}
