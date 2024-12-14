import { Board } from "@/widgets/Board";

export function Game() {
  return (
    <div className="size-full select-none flex items-center justify-center flex-col p-[5vmax]">
      <Board />
    </div>
  );
}
