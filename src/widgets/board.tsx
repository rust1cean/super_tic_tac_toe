import BoardCell from "@/components/board-cell";
import { range } from "@/lib/utils";

export default function Board() {
  return (
    <div className="size-full grid grid-cols-3 grid-rows-3 gap-2">
      {range(1, 9).map((idx) => (
        <BoardCell index={idx} />
      ))}
    </div>
  );
}
