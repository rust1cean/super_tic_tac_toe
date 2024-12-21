import { Button } from "@/components/ui/button";
import { gameState, type PlayerTurn } from "@/state/game.state";
import { mainViewState } from "@/state/main-view.state";
import { autorun, set } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

export default function Header() {
  const [turn, setTurn] = useState(gameState.turn);
  const Turn = observer(({ turn }: { turn: PlayerTurn }) => <strong className="text-2xl">Turn: {turn.toUpperCase()}</strong>)

  autorun(() => {
    setTurn(gameState.turn)
  }, { delay: 250 })

  return (
    <header className="w-full fixed t-0 l-0 z-50 h-[8vh] bg-transparent backdrop-blur flex justify justify-between items-center px-8 py-10 gap-4">
      <Button variant="outline" onClick={() => mainViewState.goHome()}>
        <FaHome />
        Home
      </Button>

      {mainViewState.isGame && <Turn turn={turn} />}

      <a target="_blank" href="https://github.com/rust1cean/super_tic_tac_toe">
        <label className="flex gap-4 items-center cursor-pointer">
          <strong>@rust1cean</strong>
          <FaGithub size="32" />
        </label>
      </a>
    </header>
  );
}
