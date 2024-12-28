import { invoke } from "@tauri-apps/api/core";
import { observer } from "mobx-react-lite";
import { UltimateCell } from "@/features/ultimate-cell";
import { gameState, GameState, type Id, type IUltimateCell } from "@/state/game.state";

export const Board = () => {
  const RenderCells = observer(({ gameState }: { gameState: GameState }) => {
    const board = gameState.board
    const cells = gameState.board.cells
    const marked_cells = gameState.board.marked_cells

    if (!cells) return;

    const handleSelect = (_: Id) => {
      if (board.marked_cells.length > 2) {
        invoke('determine_winner')
          .then((res: any) => {
            if (res) {
              gameState.determineWinner({
                winner: res.winner
              })
            }
          })
      }
    }

    return (
      cells.map((ultimateCell: IUltimateCell, idx: number) => (
        <UltimateCell onSelect={handleSelect} key={idx} marked={marked_cells[idx]} ultimateCell={ultimateCell} />
      ))
    )
  })

  return (
    <div className="size-full grid grid-cols-3 grid-rows-3 gap-2">
      <RenderCells gameState={gameState} />
    </div>
  )
}
