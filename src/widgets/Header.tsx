import { observer } from "mobx-react-lite";
import { FaGithub } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { gameState, type GameState } from "@/state/game.state";
import { viewState, type ViewState } from "@/state/view.state";
import { invoke } from "@tauri-apps/api/core";

export default function Header() {
  const Turn = observer(({ gameState, viewState }: {
    gameState: GameState,
    viewState: ViewState
  }) => {
    if (!viewState.isGame || !gameState.turn) return;

    return (
      <strong className="text-2xl">
        Turn: {gameState.turn.toUpperCase()}
      </strong>
    )
  })

  const goHome = () => {
    gameState.reset()
    viewState.goHome()
    invoke('reset')
  }

  return (
    <header className="w-full fixed t-0 l-0 z-50 h-[8vh] bg-transparent backdrop-blur flex justify justify-between items-center px-8 py-10 gap-4">
      <Button variant="outline" onClick={goHome}>
        <FaHome />
        Home
      </Button>

      <Turn gameState={gameState} viewState={viewState} />

      <a target="_blank" href="https://github.com/rust1cean/tic_tac_toe_ultimate">
        <label className="flex gap-4 items-center cursor-pointer">
          <strong>@rust1cean</strong>
          <FaGithub size="32" />
        </label>
      </a>
    </header>
  );
}
