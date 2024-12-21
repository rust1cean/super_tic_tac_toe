import MarkedCell, { type MarkedAs } from "./marked-cell";

export default function Cell({
  index,
  marked,
  onSelect,
  className = "",
}: {
  index: number;
  marked: MarkedAs;
  onSelect: (index: number) => any;
  className?: string;
}) {
  const onClick = () => {
    onSelect(index)
  }

  return (
    <button
      onClick={onClick}
      className={`size-full active:scale-95 relative rounded-2xl flex items-center justify-center border-[2px] border-border hover:bg-muted/40 backdrop-blur ${className}`}
    >
      <MarkedCell index={index} markedAs={marked} />
    </button>
  );
}
