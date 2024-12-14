import { range } from "@/lib/utils";

export function BigCell({
  position,
  className,
}: {
  position: number;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-3 grid-rows-3 gap-2 border-[1px] border-secondary/40 p-4 rounded-3xl ${className}`}
    >
      {range(9, 1).map((key) => (
        <SmallCell key={key} position={key} />
      ))}
    </div>
  );
}

export function SmallCell({
  position,
  className = "",
}: {
  position: number;
  className?: string;
}) {
  return (
    <button
      className={`size-full relative rounded-2xl flex items-center justify-center border-2 text-3xl font-semibold border-secondary/60 duration-150 hover:bg-secondary/20 backdrop-blur-sm ${className}`}
    >
      <strong className="absolute text-muted/90">{position}</strong>
    </button>
  );
}
