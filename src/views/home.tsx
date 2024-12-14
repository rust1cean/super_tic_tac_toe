import { Button } from "@/components/ui/button";

export function Home({ OnPlaying }: { OnPlaying: () => any }) {
  return (
    <div className="size-full gap-6 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-black">Super Tic-Tac-Toe🎮</h1>
      <div className="flex gap-6">
        <Button size="lg" onClick={OnPlaying}>
          Play vs bot
        </Button>
        <Button size="lg" variant="secondary" onClick={OnPlaying}>
          Play 1v1
        </Button>
      </div>
    </div>
  );
}
