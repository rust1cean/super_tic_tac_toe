import { UltimateCell } from "@/features/ultimate-cell";
import { gameState, GameState, type IUltimateCell } from "@/state/game.state";
import { observer } from "mobx-react-lite";

export const Board = () => {
  const RenderCells = observer(({ gameState }: { gameState: GameState }) => {
    const cells = gameState.board.cells

    if (!cells) return;

    return (
      cells.map((ultimateCell: IUltimateCell, idx: number) => (
        <UltimateCell key={idx} ultimateCell={ultimateCell} />
      ))
    )
  })

  return (
    <div className="size-full grid grid-cols-3 grid-rows-3 gap-2">
      <RenderCells gameState={gameState} />
    </div>
  )
}
