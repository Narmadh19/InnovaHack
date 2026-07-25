import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Flights", value: 6500 },
  { name: "Hotels", value: 12800 },
  { name: "Food", value: 5000 },
  { name: "Transport", value: 2000 },
];

const COLORS = ["#06b6d4", "#3b82f6", "#8b5cf6", "#10b981"];

function BudgetChart() {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 mt-10">

      <h2 className="text-2xl font-bold text-white mb-6">
        💰 Budget Analytics
      </h2>

      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={120}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default BudgetChart;