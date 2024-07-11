export default function CardSkelton() {
  return (
    <div className="flex w-64 flex-col gap-4 border p-6 rounded-lg">
      <div className="skeleton h-56 w-full"></div>
      <div className="skeleton h-8 w-28"></div>
      <div className="flex justify-between">
        <div className="skeleton h-4 w-[20%]"></div>
        <div className="skeleton h-4 w-[20%]"></div>
      </div>
    </div>
  );
}
