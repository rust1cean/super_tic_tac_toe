import BigCell from "@/features/ultimate-cell";
import { gameState } from "@/state/game.state";

export default function Board() {
  let board = gameState.board;

  return (
    <div className="size-full grid grid-cols-3 grid-rows-3 gap-2">
      {Object.values(board).map((ultimateCell) => (
        <BigCell key={ultimateCell.index} ultimateCell={ultimateCell} />
      ))}
    </div>
  );
}
