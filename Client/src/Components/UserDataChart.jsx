import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const UserDataChart = () => {
  const data = {
    labels: ["13-Nov-25","15-Nov-25","16-Nov-25","17-Nov-25","18-Nov-25"],
    datasets: [
      {
        label: "Users Data",
        data: [4,6,8,2,9],
        borderColor: "rgba(15, 217, 133, 1)",
        tension: 0.1,
      }
    ]
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      User Interaction
      <Line data={data} />
    </div>
  );
};

export default UserDataChart;
