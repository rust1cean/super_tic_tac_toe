import { Button } from "@/components/ui/button";
import { viewState } from "@/state/view.state";

export default function Home() {
  return (
    <div className="relative size-full gap-6 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-black">Tic-Tac-Toe ULTIMATE🎮</h1>
      <div className="flex gap-6">
        <Button size="lg" onClick={() => viewState.playVsBot()}>
          Play vs bot
        </Button>
        <Button
          size="lg"
          variant="secondary"
          onClick={() => viewState.playVsHuman()}
        >
          ⚔️ Play 1 vs 1
        </Button>
      </div>
    </div>
  );
}
