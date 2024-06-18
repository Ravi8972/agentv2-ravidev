import { Card, px } from "@mantine/core";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  scales,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { addCommasToNumber } from "../../helpers/helper_functions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartCard = ({ title, label, dataset, isNegative }) => {
  const options = {
    responsive: true,

    scales: {
      y: {
        stacked: false,
        beginAtZero: true,
        ticks: {
          // stepSize: 1,
          callback: function (value) {
            if (isNegative) {
              if (value == 0) {
                return addCommasToNumber(value);
              } else {
                return addCommasToNumber(value);
              }
            } else {
              return addCommasToNumber(value);
            }
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        position: "top",
        align: "start",
        text: title,
        color: "#153850",
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 25,
        },
        font: {
          size: 16,
        },
      },
    },
  };

  const data = {
    labels: label,
    datasets: dataset,
  };

  return (
    <Card>
      <Bar options={options} data={data} />
    </Card>
  );
};

export default ChartCard;
