import { BigCell } from "@/components/cell";

export function Game() {
  return (
    <div className="size-full flex items-center justify-center flex-col gap-6 p-24">
      <div className="size-full grid grid-cols-3 grid-rows-3 gap-2">
        <BigCell />
        <BigCell />
        <BigCell />

        <BigCell />
        <BigCell />
        <BigCell />

        <BigCell />
        <BigCell />
        <BigCell />
      </div>
    </div>
  );
}
