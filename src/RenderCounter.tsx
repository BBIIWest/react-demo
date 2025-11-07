import { useRef } from "react";

interface RenderCounterProps {
  name: string;
  color?: string;
}

const RenderCounter = ({ name, color = "blue" }: RenderCounterProps) => {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const colorClasses = {
    blue: "bg-blue-100 text-blue-800 border-blue-300",
    red: "bg-red-100 text-red-800 border-red-300",
    green: "bg-green-100 text-green-800 border-green-300",
    purple: "bg-purple-100 text-purple-800 border-purple-300",
    orange: "bg-orange-100 text-orange-800 border-orange-300",
    teal: "bg-teal-100 text-teal-800 border-teal-300",
    pink: "bg-pink-100 text-pink-800 border-pink-300",
    indigo: "bg-indigo-100 text-indigo-800 border-indigo-300",
    cyan: "bg-cyan-100 text-cyan-800 border-cyan-300",
    violet: "bg-violet-100 text-violet-800 border-violet-300",
    gray: "bg-gray-100 text-gray-800 border-gray-300",
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 text-sm font-medium ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}`}>
      <span className="font-semibold">{name} |</span>
      <span>Render Count: {renderCount.current}</span>
    </div>
  );
};

export default RenderCounter;
