import { range } from "@/lib/utils";
import Cell from "./cell";
import CellIndex from "./cell-index";

export default function BoardCell({
  index,
  className,
}: {
  index: number;
  className?: string;
}) {
  const SmallBoard = () => {
    return (
      <div className="smallBoard size-full grid grid-cols-3 gap-2 grid-rows-3 ease-out duration-150 scale-75 opacity-40">
        {range(1, 9).map((key) => (
          <Cell key={key} index={key} />
        ))}
      </div>
    );
  };

  return (
    <div
      className={`relative [&>.smallBoard]:hover:scale-100 [&>.smallBoard]:hover:opacity-100 [&>.boardIndex]:hover:opacity-0 [&>.boardIndex]:hover:scale-0 flex items-center justify-center rounded-[5vmax] border-[1px] border-border/80 p-[3.2vmax] ${className}`}
    >
      <CellIndex
        index={index}
        className="boardIndex absolute z-10 pointer-events-none duration-150 flex items-center justify-center size-full"
        textClassName="text-[10vmax]"
      />
      <SmallBoard />
    </div>
  );
}
