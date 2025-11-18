import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const ProductSaleData = () => {
  const data = {
    labels: [
      "Smartphones & Accessories",
      "Laptops & Computers",
      "Audio (Headphones & Speakers)",
      "Televisions & Home Theater",
      "Gaming",
      "Wearable Technology",
      "Cameras & Photography",
      "Office & Connectivity"
    ],
    datasets: [
      {
        label: "Number of Products Sold",
        data: [120, 80, 60, 40, 30, 50, 20, 70],
        backgroundColor: [
          "rgba(75, 192, 192, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(99, 255, 132, 0.7)",
          "rgba(217, 15, 133, 0.7)"
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(99, 255, 132, 1)",
          "rgba(217, 15, 133, 1)"
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      tooltip: {
        enabled: true
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold mb-2">This Month's Sales - November</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProductSaleData;
