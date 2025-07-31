import React  from "react";
import ReactDOM from 'react-dom/client';
import BarChart from './barChartPretty'
import BarChartFlex from './barChartPrettyFlex'

const testData = [
  { x: 'Jan', y: 430 },
  { x: 'Feb', y: 870 },
  { x: 'Mar', y: 290 },
  { x: 'Apr', y: 720 },
  { x: 'May', y: 910 },
  { x: 'Jun', y: 380 },
  { x: 'Jul', y: 640 },
  { x: 'Aug', y: 560 },
  { x: 'Sep', y: 810 },
  { x: 'Oct', y: 470 },
  { x: 'Nov', y: 930 },
  { x: 'Dec', y: 350 }
];

const App = () => {
  const useFlexLayout = true; // Switch between legacy (false) and flexbox (true) layout
  
  const ChartComponent = useFlexLayout ? BarChartFlex : BarChart;

  // Remove default body margin
  React.useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#E8C4B8', minHeight: '100vh' }}>
       <h1 style={{ fontFamily: 'Chillax', color: '#E8C4B8' }}>My Bar Chart Test {useFlexLayout ? '(Flexbox)' : '(Legacy)'}</h1>
      <ChartComponent data={testData} fontFamily="Chillax"/>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);