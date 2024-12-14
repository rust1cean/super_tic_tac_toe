import BoardCell from "@/components/board-cell";

export default function Board() {
  return (
    <div className="size-full grid grid-cols-3 grid-rows-3 gap-2">
      <BoardCell />
      <BoardCell />
      <BoardCell />

      <BoardCell />
      <BoardCell />
      <BoardCell />

      <BoardCell />
      <BoardCell />
      <BoardCell />
    </div>
  );
}
