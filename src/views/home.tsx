import { Button } from "@/components/ui/button";
import { mainViewState } from "@/state/main-view.state";

export default function Home() {
  return (
    <div className="relative size-full gap-6 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-black">Super Tic-Tac-Toe🎮</h1>
      <div className="flex gap-6">
        <Button size="lg" onClick={() => mainViewState.playVsBot()}>
          Play vs bot
        </Button>
        <Button
          size="lg"
          variant="secondary"
          onClick={() => mainViewState.playVsHuman()}
        >
          ⚔️ Play 1 vs 1
        </Button>
      </div>
    </div>
  );
}
