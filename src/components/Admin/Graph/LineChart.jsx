import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

export const LineChart = () => {
  const labels = getListYearMonth();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Yearly View",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Views",
        data: [1, 2, 3, 4, 5],
        borderColor: "rgba(107,70,193,0.5)",
        backgroundColor: "black",
      }
    ]
  };

  return <Line options={options} data={data} />;
};

// donar graph
export const Doughnutgraph = () =>{
  const data = {
    labels:["Subscribe","NotSubscribe"],

    datasets:[{
      label:"Views",
      data:[3,20],
      borderColor:['rgba(62,12,171,1)','rgba(214,43,129,1)'],
      backgroundColor:['rgba(62,12,171,0.3)','rgba(214,43,129,0.3)'],
      borderWidth:1,
      
    },
    ],
  };

  return <Doughnut data={data}/>
}

function getListYearMonth(){
  const labels=[]
 
  const months = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"
  ];

  const currentMonth = new Date().getMonth();

  const remain = 11-currentMonth;

  for(let i = currentMonth; i<months.length; i--){
    const element = months[i];
    labels.unshift(element);
    if(i === 0){
      break;
    } 
  }

  for(let i=11;i>remain;i--){
    if(i === currentMonth) break;
    const element = months[i];
    labels.unshift(element);
    if(i === currentMonth) break;
  }

  return labels

}
