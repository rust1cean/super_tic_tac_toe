import { invoke } from "@tauri-apps/api/core";
import Cell from "@/components/cell";
import MarkedCell from "@/components/marked-cell";
import { gameState, type Id, type IUltimateCell, type Mark } from "@/state/game.state";

export const UltimateCell = ({
  ultimateCell,
  className
}: {
  ultimateCell: IUltimateCell
  className?: string;
}) => {
  const onSelect = (cellId: Id) => {
    const ultimateCellId = ultimateCell.id;
    invoke('mark_cell', {
      args: {
        ultimate_cell_id: ultimateCellId,
        cell_id: cellId
      }
    }).then((mark) => {
      gameState.setTurn(mark as Mark)
      gameState.markCell(ultimateCellId, cellId, mark as Mark)
    })
  }

  const Cells = ({ board }: {
    board: IUltimateCell['board']
  }) => {
    return (
      <div className="smallBoard size-full grid grid-cols-3 gap-2 grid-rows-3 ease-out duration-150 scale-95 ease-in-out opacity-20">
        {board.cells.map((_, idx) => (
          <Cell
            onSelect={onSelect}
            marked={board.marked_cells.find(({ id }) => id === idx)?.mark}
            key={idx} index={idx} />
        ))}
      </div>
    );
  };

  return (
    <div
      className={`relative [&>.smallBoard]:hover:scale-100 [&>.smallBoard]:hover:opacity-100 [&>.boardIndex]:hover:opacity-0 [&>.boardIndex]:hover:scale-0 flex items-center justify-center rounded-[5vmax] border-[1px] border-border/20 p-[3.2vmax] ${className}`}
    >
      <MarkedCell
        index={ultimateCell.id}
        className={`boardIndex absolute z-10 pointer-events-none duration-150 flex items-center justify-center size-full`}
        textClassName="text-[10vmax]"
        markedAs={ultimateCell.board.winner}
      />
      <Cells board={ultimateCell.board} />
    </div>
  );
}
