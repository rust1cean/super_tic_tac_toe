import Cell from "@/components/cell";
import MarkedCell from "@/components/marked-cell";
import { gameState, type IUtlimateCell } from "@/state/game.state";
import { useState } from "react";

export default function BigCell({
  ultimateCell,
  className
}: {
  ultimateCell: IUtlimateCell
  className?: string;
}) {
  const [cells, setCells] = useState(Object.values(ultimateCell.children))

  const onSelect = (cellIndex: number) => {
    gameState.tryMarkCell(cellIndex, ultimateCell.index)
    setCells(Object.values(ultimateCell.children))
  }

  const Cells = () => {
    return (
      <div className="smallBoard size-full grid grid-cols-3 gap-2 grid-rows-3 ease-out duration-150 scale-95 ease-in-out opacity-20">
        {cells.map((cell) => (
          <Cell
            onSelect={onSelect}
            marked={cell.marked}
            key={cell.index} index={cell.index} />
        ))}
      </div>
    );
  };

  return (
    <div
      className={`relative [&>.smallBoard]:hover:scale-100 [&>.smallBoard]:hover:opacity-100 [&>.boardIndex]:hover:opacity-0 [&>.boardIndex]:hover:scale-0 flex items-center justify-center rounded-[5vmax] border-[1px] border-border/20 p-[3.2vmax] ${className}`}
    >
      <MarkedCell
        index={ultimateCell.index}
        className={`boardIndex absolute z-10 pointer-events-none duration-150 flex items-center justify-center size-full`}
        textClassName="text-[10vmax]"
        markedAs={ultimateCell.marked}
      />
      <Cells />
    </div>
  );
}
