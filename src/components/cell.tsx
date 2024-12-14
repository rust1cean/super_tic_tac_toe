import { range } from "@/lib/utils";

export function BoardCell({
  position,
  className,
}: {
  position: number;
  className?: string;
}) {
  const SmallBoard = () => {
    return (
      <div className="smallBoard size-full grid grid-cols-3 gap-2 grid-rows-3 ease-out duration-150 scale-75 opacity-20 hover:opacity-100">
        {range(9, 1).map((key) => (
          <Cell key={key} position={key} />
        ))}
      </div>
    );
  };

  return (
    <div
      className={`relative [&>.smallBoard]:hover:scale-100 [&>.boardCell]:hover:opacity-0 flex items-center justify-center rounded-[5vmax] border-[1px] border-border/40 p-[3.2vmax] ${className}`}
    >
      <CellIndex
        className="boardCell absolute z-10 pointer-events-none duration-150 flex items-center justify-center size-full"
        textClassName="text-[10vmax]"
        selected={Math.random() > 0.5 ? "O" : Math.random() > 0.2 ? "X" : ""}
      />
      <SmallBoard />
    </div>
  );
}

export function Cell({
  position,
  className = "",
}: {
  position: number;
  className?: string;
}) {
  return (
    <button
      className={`size-full active:scale-95 relative rounded-3xl flex items-center justify-center border-2 border-border/40 hover:bg-muted/40 backdrop-blur ${className}`}
    >
      <CellIndex index={position} selected={Math.random() > 0.5 ? "o" : "x"} />
    </button>
  );
}

export function CellIndex({
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
