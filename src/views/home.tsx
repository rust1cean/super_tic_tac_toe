import { Button } from "@/components/ui/button";

export function Home({ OnPlaying }: { OnPlaying: () => any }) {
  return (
    <div className="size-full gap-4 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-black">Super Tic-Tac-Toe🎮</h1>
      <Button size="lg" onClick={OnPlaying}>
        Play
      </Button>
    </div>
  );
}
