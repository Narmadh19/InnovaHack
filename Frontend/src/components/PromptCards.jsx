import { Plane, Mountain, Palmtree, Cherry } from "lucide-react";

const prompts = [
  {
    icon: <Palmtree className="text-cyan-400" />,
    title: "Goa Weekend",
    desc: "3 Days • ₹30,000",
  },
  {
    icon: <Cherry className="text-pink-400" />,
    title: "Japan Spring",
    desc: "7 Days • Cherry Blossom",
  },
  {
    icon: <Mountain className="text-green-400" />,
    title: "Himachal",
    desc: "Adventure Trip",
  },
  {
    icon: <Plane className="text-yellow-400" />,
    title: "Dubai Luxury",
    desc: "5 Days • Premium",
  },
];

function PromptCards() {
  return (
    <div className="mt-16 w-full max-w-6xl px-6">
      <h2 className="text-white text-2xl font-bold mb-6">
        ✨ Popular AI Prompts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {prompts.map((item, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <div className="mb-4">{item.icon}</div>

            <h3 className="text-white font-semibold">{item.title}</h3>

            <p className="text-gray-400 text-sm mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PromptCards;