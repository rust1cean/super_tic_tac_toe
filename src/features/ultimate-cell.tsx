import { invoke } from "@tauri-apps/api/core";
import Cell from "@/components/cell";
import MarkedCell from "@/components/marked-cell";
import { gameState, type Id, type IUltimateCell, type Mark } from "@/state/game.state";
import { useMemo } from "react";

export const UltimateCell = ({
  ultimateCell,
  marked,
  onSelect,
  className
}: {
  ultimateCell: IUltimateCell
  marked: Mark,
  onSelect: (ultimateCellId: Id) => any;
  className?: string;
}) => {
  const ultimateCellId = ultimateCell.id;
  const isCurrentCell = useMemo(() => gameState.currentUltimateCellId == null || ultimateCellId == gameState.currentUltimateCellId, [gameState.currentUltimateCellId])

  const handleSelect = (cellId: Id) => {
    if (!isCurrentCell || marked) return;

    invoke('mark_cell', {
      args: {
        ultimate_cell_id: ultimateCellId,
        cell_id: cellId
      }
    }).then((res: any) => {
      gameState.markCell(ultimateCellId, cellId, gameState.turn)
      gameState.setTurn(res.turn)
      gameState.setCurrentUltimateCellId(res.next_ultimate_cell_id)
    })

    if (ultimateCell.board.marked_cells.length > 2) {
      invoke('try_determine_winner', { ultimateCellId: ultimateCellId })
        .then((res: any) => {
          if (res) {
            gameState.tryDetermineWinner({
              winner: res.winner,
              ultimateCellId: res.ultimate_cell_id
            })
          }
        })
    }

    onSelect(ultimateCellId)
  }

  const Cells = ({ board }: {
    board: IUltimateCell['board']
  }) => {
    return (
      <div className="smallBoard size-full grid grid-cols-3 gap-2 grid-rows-3 ease-out duration-150 scale-95 ease-in-out opacity-20">
        {board.cells.map((_, idx) => (
          <Cell
            onSelect={handleSelect}
            marked={board.marked_cells[idx]}
            key={idx} index={idx} />
        ))}
      </div>
    );
  };

  return (
    <div
      className={`relative [&>.smallBoard]:hover:scale-100 [&>.smallBoard]:hover:opacity-100 [&>.boardIndex]:hover:opacity-0 [&>.boardIndex]:hover:scale-0 flex items-center justify-center rounded-[5vmax] border-[1px] border-border/20 p-[3.2vmax] ${isCurrentCell && 'border-border/80'} ${className}`}
    >
      <MarkedCell
        index={ultimateCell.id}
        className={`boardIndex absolute z-10 pointer-events-none duration-150 flex items-center justify-center size-full`}
        textClassName="text-[16vmax] opacity-90"
        markedAs={marked}
      />
      <Cells board={ultimateCell.board} />
    </div>
  );
}
