import Image from "next/image";

export default function BarChart() {
  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full max-w-xs h-60 rounded-xl overflow-hidden shadow-md border border-gray-200">
        <Image
          src="/chart_placeholder.png"
          alt="Spending chart"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}