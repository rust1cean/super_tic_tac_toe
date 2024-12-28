import type { Mark } from "@/state/game.state";

export default function CellBelongs({
  index,
  markedAs = null,
  className = "",
  textClassName = "",
}: {
  index: number;
  markedAs: Mark;
  className?: string;
  textClassName?: string;
}) {
  return (
    <div
      className={`size-full flex items-center text-accent-foreground/90 justify-center duration-150 ${!markedAs && "opacity-0 hover:opacity-100"
        } ${className}`}
    >
      <strong className={`text-xl font-thin ${textClassName}`}>
        {markedAs?.toUpperCase() || index}
      </strong>
    </div>
  );
}
