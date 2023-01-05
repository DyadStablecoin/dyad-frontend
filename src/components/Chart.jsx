import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { COLORS } from "../consts/colors";

export default function Chart({ data, dataKey }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={"100%"} height={"100%"} data={data}>
        <Line type="monotone" dataKey={dataKey} stroke={COLORS.Purple} />
        {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
        <XAxis dataKey="name" />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
