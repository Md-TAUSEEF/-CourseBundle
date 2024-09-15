import React from "react";
import Sidebar from "./Sidebar";
import { LineChart,Doughnutgraph } from './Graph/LineChart';

import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import "./Dashboards.css";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ title, data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: title,
        data: data.map((item) => item.value),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} options={options} />;
};

const DashboardWidget = ({ title, qty, qtyPercentage, profit }) => (
  <div className="dashboarddw">
    <div className="dashboard_mid">
      <p>{title}</p>
    </div>
    <div className="dashboard_mid1">
      <p>{qty}</p>
      <h1>{`${qtyPercentage}%`}</h1>
      {profit ? (
        <RiArrowUpLine color="green" />
      ) : (
        <RiArrowDownLine color="red" />
      )}
    </div>
    <p>Since Last Month</p>
  </div>
);

export default function Dashboard() {
  const barData = [
    { label: "Views", value: 30, profit: true },
    { label: "Users", value: 78, profit: true },
    { label: "Subscription", value: 0, profit: false },
  ];

  return (
    <div className="Dashboard_cnt">
      <div className="dashboard_cnt1">
        <h3>Last change was on {String(new Date()).split("G")[0]}</h3>
      </div>
      <div className="dashboard_cnt8">
        <div className="cttn">
          <h1>Dashboard</h1>
        </div>

        <div className="dashboard_cnt3">
          <DashboardWidget
            title="Views"
            qty={123}
            qtyPercentage={30}
            profit={true}
          />
          <DashboardWidget
            title="User"
            qty={23}
            qtyPercentage={78}
            profit={true}
          />
          <DashboardWidget
            title="Subscription"
            qty={12}
            qtyPercentage={30}
            profit={false}
          />
        </div>
      </div>

      <div className="dashboard_cnt4">
        <div className="dashboard_cnt5">
          <h1>View Graph</h1>
        </div>

        <div className="graphbar">
          <h1>Progress Bar</h1>
        </div>

        <div className="graphbar_mid1">
          <BarChart title="Progress Bar" data={barData} />
        </div>


        <LineChart/>

        <Doughnutgraph/>
      </div>

      <div className="dashboard_mid">
        <Sidebar />
      </div>
    </div>
  );
}
